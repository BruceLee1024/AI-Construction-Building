import OpenAI from 'openai'
import fs from 'fs'
import http from 'node:http'
import https from 'node:https'
import { Readable } from 'node:stream'
import tls from 'node:tls'

const REQUEST_TIMEOUT_MS = 45_000
const CONNECT_TIMEOUT_MS = 10_000

const PROVIDER_CONFIG: Record<string, { baseURL: string; defaultModel: string }> = {
  openai: {
    baseURL: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
  },
  deepseek: {
    baseURL: 'https://api.deepseek.com',
    defaultModel: 'deepseek-chat',
  },
  xiaomi: {
    baseURL: 'https://token-plan-cn.xiaomimimo.com/v1',
    defaultModel: 'mimo-v2.5-pro',
  },
}

type PreparedRequest = {
  body?: Buffer
  headers: Headers
  method: string
  url: URL
}

function getProxyCandidates(proxyURL?: string) {
  return [
    proxyURL,
    process.env.HTTPS_PROXY,
    process.env.HTTP_PROXY,
    process.env.ALL_PROXY,
    process.env.https_proxy,
    process.env.http_proxy,
    process.env.all_proxy,
  ]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .filter((value, index, values) => values.indexOf(value) === index)
}

function getProxyAuthHeader(proxy: URL) {
  if (!proxy.username) {
    return undefined
  }

  const credentials = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`
  return `Basic ${Buffer.from(credentials).toString('base64')}`
}

function tunnelThroughProxy(proxyURL: string, target: URL): Promise<tls.TLSSocket> {
  const proxy = new URL(proxyURL)
  const proxyPort = Number(proxy.port || (proxy.protocol === 'https:' ? 443 : 80))
  const targetPort = Number(target.port || 443)
  const proxyRequest = proxy.protocol === 'https:' ? https.request : http.request
  const proxyAuth = getProxyAuthHeader(proxy)

  return new Promise((resolve, reject) => {
    const req = proxyRequest({
      headers: {
        Host: `${target.hostname}:${targetPort}`,
        ...(proxyAuth ? { 'Proxy-Authorization': proxyAuth } : {}),
      },
      host: proxy.hostname,
      method: 'CONNECT',
      path: `${target.hostname}:${targetPort}`,
      port: proxyPort,
      timeout: CONNECT_TIMEOUT_MS,
    })

    req.once('connect', (res, socket, head) => {
      if (res.statusCode !== 200) {
        socket.destroy()
        reject(new Error(`Proxy CONNECT failed with ${res.statusCode || 'unknown status'}`))
        return
      }

      if (head.length > 0) {
        socket.unshift(head)
      }

      const secureSocket = tls.connect({
        servername: target.hostname,
        socket,
      })

      secureSocket.once('secureConnect', () => resolve(secureSocket))
      secureSocket.once('error', reject)
      secureSocket.setTimeout(REQUEST_TIMEOUT_MS, () => {
        secureSocket.destroy(new Error('Proxy tunnel timed out'))
      })
    })

    req.once('error', reject)
    req.once('timeout', () => {
      req.destroy(new Error('Proxy connection timed out'))
    })
    req.end()
  })
}

async function prepareRequest(input: string | URL | Request, init?: RequestInit): Promise<PreparedRequest> {
  const request = input instanceof Request ? input : new Request(input, init)
  const method = request.method.toUpperCase()
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : Buffer.from(await request.arrayBuffer())

  return {
    body,
    headers: request.headers,
    method,
    url: new URL(request.url),
  }
}

function headersToObject(headers: Headers, body?: Buffer) {
  const result: Record<string, string> = {}

  headers.forEach((value, key) => {
    const normalized = key.toLowerCase()
    if (
      normalized === 'connection' ||
      normalized === 'content-length' ||
      normalized === 'host' ||
      normalized === 'transfer-encoding'
    ) {
      return
    }
    result[key] = value
  })

  result.Connection = 'close'
  result['Accept-Encoding'] = 'identity'

  if (body) {
    result['Content-Length'] = String(body.byteLength)
  }

  return result
}

function fetchPreparedDirect(request: PreparedRequest) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const body = request.body ? new Uint8Array(request.body) : undefined

  return fetch(request.url, {
    body,
    headers: request.headers,
    method: request.method,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout))
}

function fetchPreparedViaProxy(request: PreparedRequest, proxyURL: string): Promise<Response> {
  if (request.url.protocol !== 'https:') {
    throw new Error(`Proxy fetch only supports HTTPS targets, got ${request.url.protocol}`)
  }

  return new Promise((resolve, reject) => {
    const agent = new https.Agent({ keepAlive: false })
    agent.createConnection = (_options, callback) => {
      tunnelThroughProxy(proxyURL, request.url)
        .then((socket) => callback?.(null, socket))
        .catch((err) => callback?.(err, undefined as any))
      return null as any
    }

    const req = https.request(
      {
        agent,
        headers: headersToObject(request.headers, request.body),
        hostname: request.url.hostname,
        method: request.method,
        path: `${request.url.pathname}${request.url.search}`,
        port: Number(request.url.port || 443),
        timeout: REQUEST_TIMEOUT_MS,
      },
      (res) => {
        const headers = new Headers()
        for (const [key, value] of Object.entries(res.headers)) {
          if (Array.isArray(value)) {
            headers.set(key, value.join(', '))
          } else if (value !== undefined) {
            headers.set(key, String(value))
          }
        }

        const body = Readable.toWeb(res) as ReadableStream<Uint8Array>
        resolve(
          new Response(body, {
            headers,
            status: res.statusCode || 500,
            statusText: res.statusMessage,
          }),
        )
      },
    )

    req.once('error', reject)
    req.once('timeout', () => {
      req.destroy(new Error('Request timed out'))
    })

    if (request.body) {
      req.write(request.body)
    }
    req.end()
  })
}

function createProxyAwareFetch(proxyCandidates: string[]): typeof fetch {
  return async (input, init) => {
    const request = await prepareRequest(input, init)
    const errors: string[] = []

    for (const proxyURL of proxyCandidates) {
      try {
        return await fetchPreparedViaProxy(request, proxyURL)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        errors.push(`${proxyURL}: ${message}`)
      }
    }

    try {
      return await fetchPreparedDirect(request)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      throw new Error(`Request failed. Proxy attempts: ${errors.join(' | ')}. Direct: ${message}`)
    }
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const { messages, tools, provider, apiKey, model, stream, baseURL, proxyURL } = body as {
    messages: OpenAI.ChatCompletionMessageParam[]
    tools: OpenAI.ChatCompletionTool[]
    provider?: string
    apiKey?: string
    model?: string
    stream?: boolean
    baseURL?: string
    proxyURL?: string
  }

  const resolvedProvider = provider || 'openai'
  const config = PROVIDER_CONFIG[resolvedProvider] || PROVIDER_CONFIG.openai!

  const resolvedBaseURL = baseURL || config.baseURL

  const resolvedKey =
    apiKey ||
    (resolvedProvider === 'xiaomi'
      ? (process.env.XIAOMI_API_KEY || process.env.MIMO_API_KEY)
      : resolvedProvider === 'deepseek'
      ? process.env.DEEPSEEK_API_KEY
      : process.env.OPENAI_API_KEY)

  if (!resolvedKey) {
    const providerName =
      resolvedProvider === 'xiaomi'
        ? 'Xiaomi MiMo'
        : resolvedProvider === 'deepseek'
        ? 'DeepSeek'
        : 'OpenAI'
    return Response.json(
      { error: `API Key 未配置。请在 Agent 设置中填入 ${providerName} API Key。` },
      { status: 401 },
    )
  }

  const resolvedModel = model || config.defaultModel

  const maskedKey = resolvedKey ? `${resolvedKey.slice(0, 6)}...${resolvedKey.slice(-4)}` : 'undefined'
  const proxyCandidates = getProxyCandidates(proxyURL)
  const logMsg = `[AI Request] Provider: ${resolvedProvider} | Model: ${resolvedModel} | BaseURL: ${resolvedBaseURL} | APIKey: ${maskedKey} | Stream: ${stream}${proxyCandidates.length > 0 ? ` | Proxy candidates: ${proxyCandidates.join(', ')}` : ''}`
  console.log(logMsg)
  fs.appendFileSync('/Volumes/Bruce/AI Dev/Projects_2026/editor-main/ai-error.log', new Date().toISOString() + ': ' + logMsg + '\n')

  const client = new OpenAI({
    apiKey: resolvedKey,
    baseURL: resolvedBaseURL,
    ...(proxyCandidates.length > 0 ? { fetch: createProxyAwareFetch(proxyCandidates) } : {}),
  })

  // DeepSeek V4 models default to thinking mode which requires reasoning_content
  // passback. Disable it for function-calling agent to avoid 400 errors.
  // When using OpenAI JS/TS SDK, custom parameters must be wrapped in extra_body.
  const isDeepSeek = resolvedProvider === 'deepseek'
  const extraParams = isDeepSeek ? { extra_body: { thinking: { type: 'disabled' as const } } } : {}

  const hasTools = tools && tools.length > 0

  try {
    if (stream) {
      const chatParams: any = {
        model: resolvedModel,
        messages,
        temperature: 0.3,
        stream: true,
        ...extraParams,
      }
      if (hasTools) {
        chatParams.tools = tools
        chatParams.tool_choice = 'auto'
      }

      const streamResponse = await client.chat.completions.create(chatParams)

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamResponse as any) {
              const data = JSON.stringify(chunk)
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch (err) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`),
            )
            controller.close()
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }

    // Non-streaming fallback
    const chatParams: any = {
      model: resolvedModel,
      messages,
      temperature: 0.3,
      ...extraParams,
    }
    if (hasTools) {
      chatParams.tools = tools
      chatParams.tool_choice = 'auto'
    }

    const response = await client.chat.completions.create(chatParams)

    return Response.json(response)
  } catch (err: unknown) {
    console.error('[AI API Route Error]', err)
    fs.appendFileSync('/Volumes/Bruce/AI Dev/Projects_2026/editor-main/ai-error.log', new Date().toISOString() + ': ' + String(err) + '\n')
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}
