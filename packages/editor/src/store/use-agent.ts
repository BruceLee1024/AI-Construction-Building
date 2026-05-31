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
  'place_furniture', 'place_in_room', 'place_against_wall', 'furnish_room', 'move_nodes', 'modify_node',
  'batch_modify_nodes', 'add_door_to_wall', 'add_window_to_wall',
  'place_wall_item', 'place_ceiling_item', 'duplicate_level',
  'auto_align_windows', 'build_staircase',
])

const MAX_SCENE_MODIFYING_TOOLS_PER_ITERATION = 1

const ONE_SHOT_MACRO_TOOLS = new Set([
  'create_furnished_apartment',
  'create_building_shell',
])

const POST_LAYOUT_TOOLS = new Set([
  'create_roof',
  'place_furniture',
  'place_in_room',
  'place_against_wall',
  'furnish_room',
  'place_wall_item',
  'place_ceiling_item',
  'create_furnished_apartment',
])

interface ValidationSnapshot {
  valid: boolean
  blocking: boolean
  fixedCount: number
  warningCount: number
  issues: Array<{
    severity: string
    type: string
    message: string
    nodeId: string
  }>
  nextAction?: string
  issueSummary?: Record<string, number>
}

export type AIProvider = 'openai' | 'deepseek' | 'xiaomi'

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
  baseURL?: string
  proxyURL?: string
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
  const defaults: AgentSettings = { provider: 'deepseek', apiKey: '', model: '', baseURL: '', proxyURL: '' }
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Migrate invalid legacy model name to avoid failed requests
      if (parsed.model === 'deepseek-v4-pro') {
        parsed.model = 'deepseek-chat'
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
        } catch {}
      }
      return { ...defaults, ...parsed }
    }
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

function isComplexGenerationRequest(content: string): boolean {
  const normalized = content.toLowerCase()
  return /公寓|住宅|房子|别墅|办公室|酒店|多房|多层|整套|完整|家具|装修|模型|house|apartment|villa|office|hotel|multi|furnished|complete/.test(normalized)
}

function allowsRapidConcept(content: string): boolean {
  const normalized = content.toLowerCase()
  return /快速|草图|概念|随便|rough|quick|draft|concept/.test(normalized)
}

function parseValidationSnapshot(raw: string): ValidationSnapshot | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ValidationSnapshot>
    return {
      valid: Boolean(parsed.valid),
      blocking: Boolean(parsed.blocking ?? ((parsed.warningCount ?? 0) > 0)),
      fixedCount: parsed.fixedCount ?? 0,
      warningCount: parsed.warningCount ?? 0,
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      nextAction: parsed.nextAction,
      issueSummary: parsed.issueSummary,
    }
  } catch {
    return null
  }
}

function buildValidationMessage(snapshot: ValidationSnapshot): string {
  const lines: string[] = ['[Spatial Auto-Validation Report]']
  lines.push(`Status: ${snapshot.valid ? 'passed' : 'needs fixes'} | Auto-fixed: ${snapshot.fixedCount} | Warnings: ${snapshot.warningCount}`)

  if (snapshot.issueSummary && Object.keys(snapshot.issueSummary).length > 0) {
    lines.push(`Issue summary: ${Object.entries(snapshot.issueSummary).map(([type, count]) => `${type}=${count}`).join(', ')}`)
  }

  if (snapshot.issues.length > 0) {
    lines.push('')
    for (const issue of snapshot.issues.slice(0, 12)) {
      const icon = issue.severity === 'fixed' ? '🔧' : issue.type === 'code' ? '📐' : '⚠️'
      lines.push(`${icon} [${issue.type}] ${issue.message}`)
    }
    if (snapshot.issues.length > 12) {
      lines.push(`... ${snapshot.issues.length - 12} more issues omitted; use issueSummary and blockingIssues first.`)
    }
  }

  lines.push('')
  lines.push(snapshot.nextAction ?? (snapshot.blocking
    ? 'Next action: fix the warnings before moving to the next generation phase.'
    : 'Next action: validation passed; continue to the next staged phase.'))

  if (snapshot.issues.length > 0) {
    lines.push('')
    lines.push('Tips to avoid these issues:')
    if (snapshot.issues.some((i) => i.type === 'bounds')) {
      lines.push('- Furniture placement: ensure position is inside the room slab polygon. Use interiorBounds from createRoom result.')
    }
    if (snapshot.issues.some((i) => i.type === 'snap')) {
      lines.push('- Wall endpoints: adjacent walls should share exact coordinates. Use the same [x,z] for connected corners.')
    }
    if (snapshot.issues.some((i) => i.type === 'gap')) {
      lines.push('- Wall gaps detected: check that wall endpoints form a closed loop with no small gaps.')
    }
    if (snapshot.issues.some((i) => i.type === 'overlap')) {
      lines.push('- Overlaps: ensure doors/windows do not collide on the same wall, and furniture is spaced out to avoid collision.')
    }
    if (snapshot.issues.some((i) => i.type === 'info')) {
      lines.push('- Design advice: Check daylight ratios, large spans, structural support, and wet-room ventilation.')
    }
    if (snapshot.issues.some((i) => i.type === 'code')) {
      lines.push('- Building-code checks: Respect door/corridor clear widths, usable room proportions, daylight/ventilation, and upper-floor fall protection.')
      lines.push('- Do not continue to furniture or roof detailing until code warnings from the structural/layout phase are resolved.')
    }
  }

  return lines.join('\n')
}

function stagedDeferralForTool(
  toolName: string,
  userContent: string,
  lastValidation: ValidationSnapshot | null,
): Record<string, unknown> | null {
  if (
    ONE_SHOT_MACRO_TOOLS.has(toolName) &&
    isComplexGenerationRequest(userContent) &&
    !allowsRapidConcept(userContent)
  ) {
    return {
      deferred: true,
      tool: toolName,
      reason:
        'This request is complex/code-sensitive, so one-shot macro generation is disabled. Build layout first, validate, then add openings, furniture, and details in later phases.',
      nextAction:
        'Use create_apartment/create_room/create_polygon_room/create_hallway for the layout phase, then wait for validation feedback.',
    }
  }

  if (lastValidation?.blocking && POST_LAYOUT_TOOLS.has(toolName)) {
    return {
      deferred: true,
      tool: toolName,
      reason:
        'The previous validation report still has warnings. Post-layout work is blocked until those warnings are fixed.',
      blockingIssues: lastValidation.issues
        .filter((issue) => issue.severity === 'warning')
        .slice(0, 5)
        .map((issue) => ({
          type: issue.type,
          nodeId: issue.nodeId,
          message: issue.message,
        })),
      nextAction:
        'Fix layout/code/circulation warnings using modify_node, move_nodes, add_door_to_wall, add_window_to_wall, auto_align_windows, or delete/recreate problem geometry.',
    }
  }

  return null
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
  userContent: string,
  get: () => AgentState,
  set: (partial: Partial<AgentState> | ((s: AgentState) => Partial<AgentState>)) => void,
) {
  const MAX_ITERATIONS = 10
  let iteration = 0
  let lastValidation: ValidationSnapshot | null = null

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
        baseURL: settings.baseURL || undefined,
        proxyURL: settings.proxyURL || undefined,
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

      // Execute each tool call. Scene edits are deliberately staged so the
      // model can inspect validation feedback before committing the next phase.
      let hasSceneModification = false
      let sceneModificationCount = 0
      for (const tc of toolCalls) {
        const toolArgs = JSON.parse(tc.arguments)
        const isSceneModifyingTool = SCENE_MODIFYING_TOOLS.has(tc.name)
        let result: string
        const stagedDeferral = isSceneModifyingTool
          ? stagedDeferralForTool(tc.name, userContent, lastValidation)
          : null

        if (stagedDeferral) {
          result = JSON.stringify(stagedDeferral)
        } else if (
          isSceneModifyingTool &&
          sceneModificationCount >= MAX_SCENE_MODIFYING_TOOLS_PER_ITERATION
        ) {
          result = JSON.stringify({
            deferred: true,
            tool: tc.name,
            reason:
              'Scene generation is staged. Review the validation report from the previous modification, then call this tool again if it is still appropriate.',
            nextAction:
              'Continue with the next architectural phase only after spatial and building-code warnings are resolved.',
          })
        } else {
          result = executeToolCall(tc.name, toolArgs)
          if (isSceneModifyingTool) {
            hasSceneModification = true
            sceneModificationCount++
          }
        }

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
        const snapshot = parseValidationSnapshot(validationResult)
        if (snapshot) {
          lastValidation = snapshot
          const validationMsg: ChatMessage = {
            id: genId(),
            role: 'system',
            content: buildValidationMessage(snapshot),
          }
          set((s) => ({
            messages: [...s.messages, validationMsg],
          }))
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
