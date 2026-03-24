import OpenAI from 'openai'

const PROVIDER_CONFIG: Record<string, { baseURL: string; defaultModel: string }> = {
  openai: {
    baseURL: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
  },
  deepseek: {
    baseURL: 'https://api.deepseek.com',
    defaultModel: 'deepseek-chat',
  },
}

export async function POST(req: Request) {
  const body = await req.json()
  const { messages, tools, provider, apiKey, model, stream } = body as {
    messages: OpenAI.ChatCompletionMessageParam[]
    tools: OpenAI.ChatCompletionTool[]
    provider?: string
    apiKey?: string
    model?: string
    stream?: boolean
  }

  const resolvedProvider = provider || 'openai'
  const config = PROVIDER_CONFIG[resolvedProvider] || PROVIDER_CONFIG.openai!

  const resolvedKey =
    apiKey ||
    (resolvedProvider === 'deepseek'
      ? process.env.DEEPSEEK_API_KEY
      : process.env.OPENAI_API_KEY)

  if (!resolvedKey) {
    return Response.json(
      { error: `API Key 未配置。请在 Agent 设置中填入 ${resolvedProvider === 'deepseek' ? 'DeepSeek' : 'OpenAI'} API Key。` },
      { status: 401 },
    )
  }

  const resolvedModel = model || config.defaultModel

  const client = new OpenAI({
    apiKey: resolvedKey,
    baseURL: config.baseURL,
  })

  try {
    if (stream) {
      const streamResponse = await client.chat.completions.create({
        model: resolvedModel,
        messages,
        tools,
        tool_choice: 'auto',
        temperature: 0.3,
        stream: true,
      })

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamResponse) {
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
    const response = await client.chat.completions.create({
      model: resolvedModel,
      messages,
      tools,
      tool_choice: 'auto',
      temperature: 0.3,
    })

    return Response.json(response)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}
