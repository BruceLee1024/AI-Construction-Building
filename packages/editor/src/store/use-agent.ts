import { create } from 'zustand'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { SYSTEM_PROMPT } from '../lib/agent/system-prompt'
import { agentTools } from '../lib/agent/tools'
import { executeToolCall } from '../lib/agent/executor'

type CodeProfileName = 'residential_default' | 'china_residential'
type AgentPhase = 'layout' | 'openings' | 'validation_repair' | 'furnishing' | 'roof_detail'

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

export interface ValidationSnapshot {
  valid: boolean
  blocking: boolean
  fixedCount: number
  warningCount: number
  issues: Array<{
    severity: string
    type: string
    ruleId?: string
    message: string
    nodeId: string
  }>
  nextAction?: string
  issueSummary?: Record<string, number>
  ruleSummary?: Record<string, number>
  blockingRuleIds?: string[]
  repairHints?: RepairHint[]
}

export interface RepairHint {
  ruleId: string
  nodeId: string
  preferredTools: string[]
  suggestedAction: string
  targetMetrics?: Record<string, number | string>
}

export interface AgentRunPolicy {
  codeProfile: CodeProfileName
  phase: AgentPhase
  isComplex: boolean
  isResidential: boolean
  isMultiLevel: boolean
  includesFurnishing: boolean
  allowsRapidConcept: boolean
  allowedNextTools: string[]
  deferredTools: string[]
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

export function resolveAgentRunPolicy(
  userContent: string,
  lastValidation: ValidationSnapshot | null = null,
): AgentRunPolicy {
  const normalized = userContent.toLowerCase()
  const isChineseResidential = /中文|中国|国标|住宅|公寓|户型|两居|三居|卧室|客厅|厨房|卫生间|阳台/.test(userContent)
  const isResidential = isChineseResidential || /residential|apartment|house|home|bedroom|living|kitchen|bathroom/.test(normalized)
  const isMultiLevel = /多层|楼层|加层|二层|三层|multi-story|multistory|floor|level|second floor|third floor/.test(normalized)
  const includesFurnishing = /家具|软装|装修|摆放|沙发|床|furnish|furniture|sofa|bed|decor/.test(normalized)
  const includesRoofOrDetail = /屋顶|屋面|roof|detail|decoration|装饰/.test(normalized)
  const rapid = allowsRapidConcept(userContent)
  const isComplex = isComplexGenerationRequest(userContent)

  let phase: AgentPhase = 'layout'
  if (lastValidation?.blocking) {
    phase = 'validation_repair'
  } else if (isComplex && !rapid) {
    phase = 'layout'
  } else if (includesRoofOrDetail) {
    phase = 'roof_detail'
  } else if (includesFurnishing) {
    phase = 'furnishing'
  } else if (isResidential || isComplex) {
    phase = 'openings'
  }

  const repairTools = ['modify_node', 'move_nodes', 'batch_modify_nodes', 'add_door_to_wall', 'add_window_to_wall', 'auto_align_windows', 'delete_node', 'validate_scene']
  const layoutTools = ['create_room', 'create_apartment', 'create_polygon_room', 'create_l_shaped_room', 'create_hallway', 'create_walls', 'create_slab', 'create_zone', 'validate_scene']
  const openingTools = ['create_door', 'create_window', 'add_door_to_wall', 'add_window_to_wall', 'auto_align_windows', 'create_zone', 'validate_scene']
  const furnishingTools = ['place_furniture', 'place_in_room', 'place_against_wall', 'furnish_room', 'place_wall_item', 'place_ceiling_item', 'validate_scene']
  const roofTools = ['create_roof', 'create_ceiling', 'place_wall_item', 'place_ceiling_item', 'validate_scene']

  const allowedNextTools =
    phase === 'validation_repair' ? repairTools
    : phase === 'furnishing' ? furnishingTools
    : phase === 'roof_detail' ? roofTools
    : phase === 'openings' ? [...openingTools, ...layoutTools]
    : layoutTools

  return {
    codeProfile: isChineseResidential ? 'china_residential' : 'residential_default',
    phase,
    isComplex,
    isResidential,
    isMultiLevel,
    includesFurnishing,
    allowsRapidConcept: rapid,
    allowedNextTools,
    deferredTools: phase === 'validation_repair' ? Array.from(POST_LAYOUT_TOOLS) : [],
  }
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
      ruleSummary: parsed.ruleSummary,
      blockingRuleIds: parsed.blockingRuleIds,
      repairHints: Array.isArray(parsed.repairHints) ? parsed.repairHints : [],
    }
  } catch {
    return null
  }
}

function buildValidationMessage(snapshot: ValidationSnapshot, policy: AgentRunPolicy): string {
  const payload = {
    type: 'spatial_validation',
    codeProfile: policy.codeProfile,
    phase: snapshot.blocking ? 'validation_repair' : policy.phase,
    valid: snapshot.valid,
    blocking: snapshot.blocking,
    fixedCount: snapshot.fixedCount,
    warningCount: snapshot.warningCount,
    blockingRuleIds: snapshot.blockingRuleIds ?? [],
    ruleSummary: snapshot.ruleSummary ?? {},
    repairHints: (snapshot.repairHints ?? []).slice(0, 8),
    allowedNextTools: snapshot.blocking ? policy.allowedNextTools : undefined,
    nextAction: snapshot.nextAction ?? (snapshot.blocking
      ? 'Use repairHints with the allowed repair tools, then validate again before furniture/roof/detail work.'
      : 'Validation passed; continue to the next staged generation phase.'),
  }

  return `[Spatial Auto-Validation JSON]\n${JSON.stringify(payload, null, 2)}`
}

export function stagedDeferralForTool(
  toolName: string,
  userContent: string,
  lastValidation: ValidationSnapshot | null,
  policy: AgentRunPolicy = resolveAgentRunPolicy(userContent, lastValidation),
): Record<string, unknown> | null {
  if (
    ONE_SHOT_MACRO_TOOLS.has(toolName) &&
    policy.isComplex &&
    !policy.allowsRapidConcept
  ) {
    return {
      deferred: true,
      tool: toolName,
      phaseBlockedBy: policy.phase,
      allowedNextTools: policy.allowedNextTools,
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
      phaseBlockedBy: 'validation_repair',
      allowedNextTools: policy.allowedNextTools,
      requiredRuleFixes: lastValidation.blockingRuleIds ?? [],
      repairHints: (lastValidation.repairHints ?? []).slice(0, 5),
      reason:
        'The previous validation report still has warnings. Post-layout work is blocked until those warnings are fixed.',
      blockingIssues: lastValidation.issues
        .filter((issue) => issue.severity === 'warning')
        .slice(0, 5)
        .map((issue) => ({
          type: issue.type,
          ruleId: issue.ruleId,
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
    const runPolicy = resolveAgentRunPolicy(userContent, lastValidation)

    // Auto-inject current scene context so the AI always knows what exists
    const sceneContext = executeToolCall('get_scene_info', {})
    const systemWithContext = `${SYSTEM_PROMPT}\n\n## Agent Run Policy\n${JSON.stringify(runPolicy, null, 2)}\n\n## Current Scene State\n${sceneContext}`

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
          ? stagedDeferralForTool(tc.name, userContent, lastValidation, runPolicy)
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
            phaseBlockedBy: runPolicy.phase,
            allowedNextTools: runPolicy.allowedNextTools,
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
        const validationResult = executeToolCall('validate_scene', { codeProfile: runPolicy.codeProfile })
        const snapshot = parseValidationSnapshot(validationResult)
        if (snapshot) {
          lastValidation = snapshot
          const validationMsg: ChatMessage = {
            id: genId(),
            role: 'system',
            content: buildValidationMessage(snapshot, resolveAgentRunPolicy(userContent, snapshot)),
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
