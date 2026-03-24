import { create } from 'zustand'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { SYSTEM_PROMPT } from '../lib/agent/system-prompt'
import { agentTools } from '../lib/agent/tools'
import { executeToolCall } from '../lib/agent/executor'

// Tools that modify the scene and should trigger auto-validation
const SCENE_MODIFYING_TOOLS = new Set([
  'create_walls', 'create_slab', 'create_door', 'create_window', 'create_room',
  'create_ceiling', 'create_zone', 'create_roof', 'create_apartment',
  'create_l_shaped_room', 'create_polygon_room', 'create_hallway',
  'create_building_shell', 'create_furnished_apartment', 'mirror_room',
  'place_furniture', 'furnish_room', 'move_nodes', 'modify_node',
  'batch_modify_nodes', 'add_door_to_wall', 'add_window_to_wall',
  'place_wall_item', 'place_ceiling_item', 'duplicate_level',
])

export type AIProvider = 'openai' | 'deepseek'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  toolCalls?: Array<{
    id: string
    name: string
    arguments: string
  }>
  toolCallId?: string
  isLoading?: boolean
}

interface AgentSettings {
  provider: AIProvider
  apiKey: string
  model: string
}

interface AgentState {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  settings: AgentSettings
  showSettings: boolean
  setSettings: (settings: Partial<AgentSettings>) => void
  setShowSettings: (show: boolean) => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const STORAGE_KEY = 'pascal-agent-settings'

function loadSettings(): AgentSettings {
  const defaults: AgentSettings = { provider: 'deepseek', apiKey: '', model: '' }
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {}
  return defaults
}

function saveSettings(settings: AgentSettings) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {}
}

let messageCounter = 0
function genId() {
  return `msg_${++messageCounter}_${Date.now()}`
}

export const useAgent = create<AgentState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  settings: loadSettings(),
  showSettings: false,

  setSettings: (partial) => {
    const current = get().settings
    const next = { ...current, ...partial }
    saveSettings(next)
    set({ settings: next })
  },

  setShowSettings: (show) => set({ showSettings: show }),

  clearMessages: () => {
    set({ messages: [], error: null })
  },

  sendMessage: async (content: string) => {
    const { settings } = get()
    if (!settings.apiKey) {
      set({ error: '请先在设置中填入 API Key', showSettings: true })
      return
    }

    const userMsg: ChatMessage = {
      id: genId(),
      role: 'user',
      content,
    }

    set((s) => ({
      messages: [...s.messages, userMsg],
      isLoading: true,
      error: null,
    }))

    try {
      await runAgentLoop(content, get, set)
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      set({ error: errMsg, isLoading: false })
    }
  },
}))

interface StreamToolCallDelta {
  id: string
  name: string
  arguments: string
}

async function runAgentLoop(
  _userContent: string,
  get: () => AgentState,
  set: (partial: Partial<AgentState> | ((s: AgentState) => Partial<AgentState>)) => void,
) {
  const MAX_ITERATIONS = 10
  let iteration = 0

  while (iteration < MAX_ITERATIONS) {
    iteration++

    // Auto-inject current scene context so the AI always knows what exists
    const sceneContext = executeToolCall('get_scene_info', {})
    const systemWithContext = `${SYSTEM_PROMPT}\n\n## Current Scene State\n${sceneContext}`

    // Build messages for API
    const apiMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemWithContext },
      ...get().messages.map(msgToChatParam),
    ]

    // Call streaming API
    const { settings } = get()
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: apiMessages,
        tools: agentTools,
        provider: settings.provider,
        apiKey: settings.apiKey,
        model: settings.model || undefined,
        stream: true,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'API request failed' }))
      throw new Error(err.error || `API error: ${res.status}`)
    }

    // Parse streaming response
    const { content, toolCalls } = await parseStreamResponse(res, get, set)

    // If tool calls present, execute them
    if (toolCalls.length > 0) {
      // Update the streaming assistant message to finalized state with tool calls
      const assistantMsg: ChatMessage = {
        id: genId(),
        role: 'assistant',
        content,
        toolCalls,
      }

      // Replace the streaming placeholder with final message
      set((s) => {
        const msgs = [...s.messages]
        // Remove the streaming placeholder if it exists
        const lastMsg = msgs[msgs.length - 1]
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isLoading) {
          msgs.pop()
        }
        return { messages: [...msgs, assistantMsg] }
      })

      // Execute each tool call
      let hasSceneModification = false
      for (const tc of toolCalls) {
        const toolArgs = JSON.parse(tc.arguments)
        const result = executeToolCall(tc.name, toolArgs)
        if (SCENE_MODIFYING_TOOLS.has(tc.name)) hasSceneModification = true

        const toolMsg: ChatMessage = {
          id: genId(),
          role: 'tool',
          content: result,
          toolCallId: tc.id,
        }

        set((s) => ({
          messages: [...s.messages, toolMsg],
        }))
      }

      // Auto-validate after scene modifications
      if (hasSceneModification) {
        const validationResult = executeToolCall('validate_scene', {})
        try {
          const parsed = JSON.parse(validationResult)
          if (parsed.fixedCount > 0 || parsed.warningCount > 0) {
            // Inject validation report as a system-level context message
            const validationMsg: ChatMessage = {
              id: genId(),
              role: 'system',
              content: `[Auto-Validation] ${parsed.fixedCount} issue(s) auto-fixed, ${parsed.warningCount} warning(s). Details: ${validationResult}`,
            }
            set((s) => ({
              messages: [...s.messages, validationMsg],
            }))
          }
        } catch {
          // Validation parsing failed — silently continue
        }
      }

      // Continue — model needs to see tool results
      continue
    }

    // No tool calls — finalize the streamed assistant message
    set((s) => {
      const msgs = [...s.messages]
      const lastMsg = msgs[msgs.length - 1]
      if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isLoading) {
        msgs[msgs.length - 1] = { ...lastMsg, isLoading: false }
      }
      return { messages: msgs, isLoading: false }
    })
    return
  }

  // Max iterations reached
  set({ isLoading: false })
}

async function parseStreamResponse(
  res: Response,
  get: () => AgentState,
  set: (partial: Partial<AgentState> | ((s: AgentState) => Partial<AgentState>)) => void,
): Promise<{ content: string; toolCalls: StreamToolCallDelta[] }> {
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()

  let content = ''
  const toolCallMap = new Map<number, StreamToolCallDelta>()
  const streamMsgId = genId()
  let buffer = ''

  // Insert a streaming placeholder message
  set((s) => ({
    messages: [
      ...s.messages,
      { id: streamMsgId, role: 'assistant', content: '', isLoading: true } as ChatMessage,
    ],
  }))

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // Process complete SSE lines
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // Keep incomplete line in buffer

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue

      const payload = trimmed.slice(6) // Remove "data: "
      if (payload === '[DONE]') continue

      try {
        const chunk = JSON.parse(payload)

        // Check for error
        if (chunk.error) {
          throw new Error(chunk.error)
        }

        const delta = chunk.choices?.[0]?.delta
        if (!delta) continue

        // Accumulate content
        if (delta.content) {
          content += delta.content

          // Update streaming message in-place
          set((s) => {
            const msgs = [...s.messages]
            const idx = msgs.findIndex((m) => m.id === streamMsgId)
            if (idx !== -1) {
              msgs[idx] = { ...msgs[idx]!, content, isLoading: true }
            }
            return { messages: msgs }
          })
        }

        // Accumulate tool call deltas
        if (delta.tool_calls) {
          for (const tc of delta.tool_calls as Array<{
            index: number
            id?: string
            function?: { name?: string; arguments?: string }
          }>) {
            const existing = toolCallMap.get(tc.index)
            if (!existing) {
              toolCallMap.set(tc.index, {
                id: tc.id || '',
                name: tc.function?.name || '',
                arguments: tc.function?.arguments || '',
              })
            } else {
              if (tc.id) existing.id = tc.id
              if (tc.function?.name) existing.name += tc.function.name
              if (tc.function?.arguments) existing.arguments += tc.function.arguments
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.message !== 'Unexpected end of JSON input') {
          throw err
        }
      }
    }
  }

  // Collect tool calls sorted by index
  const toolCalls: StreamToolCallDelta[] = []
  const sortedKeys = [...toolCallMap.keys()].sort((a, b) => a - b)
  for (const key of sortedKeys) {
    toolCalls.push(toolCallMap.get(key)!)
  }

  return { content, toolCalls }
}

function msgToChatParam(msg: ChatMessage): ChatCompletionMessageParam {
  if (msg.role === 'tool') {
    return {
      role: 'tool',
      content: msg.content,
      tool_call_id: msg.toolCallId || '',
    }
  }

  if (msg.role === 'assistant' && msg.toolCalls && msg.toolCalls.length > 0) {
    return {
      role: 'assistant',
      content: msg.content || null,
      tool_calls: msg.toolCalls.map((tc) => ({
        id: tc.id,
        type: 'function' as const,
        function: {
          name: tc.name,
          arguments: tc.arguments,
        },
      })),
    }
  }

  return {
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
  }
}
