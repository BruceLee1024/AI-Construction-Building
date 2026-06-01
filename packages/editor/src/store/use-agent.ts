import { create } from 'zustand'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { useScene } from '@pascal-app/core'
import { SYSTEM_PROMPT } from '../lib/agent/system-prompt'
import { agentTools } from '../lib/agent/tools'
import { executeToolCall } from '../lib/agent/executor'

type CodeProfileName = 'residential_default' | 'china_residential'
type AgentPhase = 'layout' | 'openings' | 'validation_repair' | 'furnishing' | 'roof_detail'
type AgentToolPhase = AgentPhase | 'diagnostic'
type ToolFailureKind =
  | 'invalid_json'
  | 'schema'
  | 'reference'
  | 'phase'
  | 'missing_scene_prerequisite'
  | 'blocked_validation'

// Tools that modify the scene and should trigger auto-validation
const SCENE_MODIFYING_TOOLS = new Set([
  'create_walls', 'create_slab', 'create_door', 'create_window', 'create_room',
  'create_ceiling', 'create_zone', 'create_roof', 'create_apartment',
  'create_l_shaped_room', 'create_polygon_room', 'create_hallway',
  'create_building_shell', 'create_furnished_apartment', 'mirror_room',
  'place_furniture', 'place_in_room', 'place_against_wall', 'place_furniture_solved', 'furnish_room', 'move_nodes', 'modify_node',
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
  'place_furniture_solved',
  'furnish_room',
  'place_wall_item',
  'place_ceiling_item',
  'create_furnished_apartment',
])

const AGENT_TOOL_CONTRACTS: Record<string, AgentToolContract> = {
  get_scene_info: {
    name: 'get_scene_info',
    phases: ['diagnostic'],
    recoveryAction: 'Inspect current scene progress, candidate slab IDs, candidate wall IDs, and last validation.',
  },
  validate_scene: {
    name: 'validate_scene',
    phases: ['diagnostic', 'layout', 'openings', 'validation_repair', 'furnishing', 'roof_detail'],
    recoveryAction: 'Run validation with the current codeProfile before moving to post-layout work.',
  },
  create_room: {
    name: 'create_room',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Create a bounded room first, then add zone, openings, validation, and furniture.',
  },
  create_apartment: {
    name: 'create_apartment',
    phases: ['layout'],
    modifiesScene: true,
    highRisk: true,
    recoveryAction: 'Use for staged apartment layout only; validate before adding furniture or roof details.',
  },
  create_polygon_room: {
    name: 'create_polygon_room',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Use when room geometry is non-rectangular; validate closure and openings after creation.',
  },
  create_l_shaped_room: {
    name: 'create_l_shaped_room',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Use for L-shaped layout, then validate slab/wall closure.',
  },
  create_hallway: {
    name: 'create_hallway',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Use for corridor geometry, then validate corridor width.',
  },
  create_walls: {
    name: 'create_walls',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Create closed wall loops; add slab/zone after wall creation.',
  },
  create_slab: {
    name: 'create_slab',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Create floor slab for an existing room boundary.',
  },
  create_zone: {
    name: 'create_zone',
    phases: ['layout', 'openings'],
    modifiesScene: true,
    requiresLayout: true,
    recoveryAction: 'Attach semantic roomType to a slab polygon so validation can apply room-specific rules.',
  },
  create_door: {
    name: 'create_door',
    phases: ['openings'],
    modifiesScene: true,
    requiresLayout: true,
    recoveryAction: 'Prefer add_door_to_wall when specific wall IDs are available.',
  },
  create_window: {
    name: 'create_window',
    phases: ['openings'],
    modifiesScene: true,
    requiresLayout: true,
    recoveryAction: 'Prefer add_window_to_wall or auto_align_windows when specific wall IDs are available.',
  },
  add_door_to_wall: {
    name: 'add_door_to_wall',
    phases: ['openings', 'validation_repair'],
    modifiesScene: true,
    requiresLayout: true,
    requiresWallId: true,
    recoveryAction: 'Use candidate wall IDs from get_scene_info.architecturalSummary.exteriorWallCandidates.',
  },
  add_window_to_wall: {
    name: 'add_window_to_wall',
    phases: ['openings', 'validation_repair'],
    modifiesScene: true,
    requiresLayout: true,
    requiresWallId: true,
    recoveryAction: 'Use candidate exterior wall IDs from get_scene_info before adding windows.',
  },
  auto_align_windows: {
    name: 'auto_align_windows',
    phases: ['openings', 'validation_repair'],
    modifiesScene: true,
    requiresLayout: true,
    requiresWallId: true,
    recoveryAction: 'Use wallIds from exterior wall candidates when daylight or ventilation is missing.',
  },
  modify_node: {
    name: 'modify_node',
    phases: ['validation_repair'],
    modifiesScene: true,
    requiresNodeId: true,
    recoveryAction: 'Use nodeId from repairHints or candidateRefs.',
  },
  move_nodes: {
    name: 'move_nodes',
    phases: ['validation_repair'],
    modifiesScene: true,
    requiresNodeId: true,
    recoveryAction: 'Move problematic nodes from repairHints; validate again after moving.',
  },
  batch_modify_nodes: {
    name: 'batch_modify_nodes',
    phases: ['validation_repair'],
    modifiesScene: true,
    requiresNodeId: true,
    recoveryAction: 'Batch update IDs from repairHints only when all IDs are known.',
  },
  delete_node: {
    name: 'delete_node',
    phases: ['validation_repair'],
    modifiesScene: true,
    requiresNodeId: true,
    recoveryAction: 'Delete only a known problematic node from repairHints/candidateRefs.',
  },
  suggest_furniture_layout: {
    name: 'suggest_furniture_layout',
    phases: ['furnishing', 'validation_repair'],
    requiresLayout: true,
    requiresSlabId: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'place_furniture_solved',
    recoveryAction: 'Preview solved furniture placement for a slab before creating nodes.',
  },
  place_furniture_solved: {
    name: 'place_furniture_solved',
    phases: ['furnishing', 'validation_repair'],
    modifiesScene: true,
    requiresLayout: true,
    requiresSlabId: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'suggest_furniture_layout',
    recoveryAction: 'Use solver with slabId; it avoids doors, windows, collisions, and main paths.',
  },
  furnish_room: {
    name: 'furnish_room',
    phases: ['furnishing'],
    modifiesScene: true,
    requiresLayout: true,
    requiresSlabId: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'place_furniture_solved',
    recoveryAction: 'Prefer place_furniture_solved for deterministic layout; furnish_room remains semantic convenience.',
  },
  place_in_room: {
    name: 'place_in_room',
    phases: ['furnishing'],
    modifiesScene: true,
    requiresLayout: true,
    requiresSlabId: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'place_furniture_solved',
    recoveryAction: 'Use only for a single semantic placement after slabId is known.',
  },
  place_against_wall: {
    name: 'place_against_wall',
    phases: ['furnishing'],
    modifiesScene: true,
    requiresLayout: true,
    requiresWallId: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'place_furniture_solved',
    recoveryAction: 'Use only for single wall-backed item placement with a known wallId.',
  },
  place_furniture: {
    name: 'place_furniture',
    phases: ['furnishing'],
    modifiesScene: true,
    fallbackOnly: true,
    requiresNonBlockingValidation: true,
    recommendedTool: 'place_furniture_solved',
    recoveryAction: 'Raw coordinate fallback only; use solver unless user provided exact coordinates/debug request.',
  },
  place_wall_item: {
    name: 'place_wall_item',
    phases: ['furnishing', 'roof_detail'],
    modifiesScene: true,
    requiresLayout: true,
    requiresWallId: true,
    requiresNonBlockingValidation: true,
    recoveryAction: 'Use after layout/openings validation passes and wallId is known.',
  },
  place_ceiling_item: {
    name: 'place_ceiling_item',
    phases: ['furnishing', 'roof_detail'],
    modifiesScene: true,
    requiresLayout: true,
    requiresNonBlockingValidation: true,
    recoveryAction: 'Use after validated layout, usually for lights or ceiling-mounted assets.',
  },
  create_roof: {
    name: 'create_roof',
    phases: ['roof_detail'],
    modifiesScene: true,
    requiresLayout: true,
    requiresNonBlockingValidation: true,
    recoveryAction: 'Only add roof after layout/openings validation is non-blocking.',
  },
  create_ceiling: {
    name: 'create_ceiling',
    phases: ['roof_detail'],
    modifiesScene: true,
    requiresLayout: true,
    requiresNonBlockingValidation: true,
    recoveryAction: 'Create ceiling after validated room polygon exists.',
  },
  create_building_shell: {
    name: 'create_building_shell',
    phases: ['layout'],
    modifiesScene: true,
    highRisk: true,
    recoveryAction: 'One-shot shell is disabled for complex/code-sensitive requests unless rapid concept is requested.',
  },
  create_furnished_apartment: {
    name: 'create_furnished_apartment',
    phases: ['layout'],
    modifiesScene: true,
    highRisk: true,
    fallbackOnly: true,
    recoveryAction: 'Avoid one-shot furnished macro; use staged layout, openings, validation, then solver furnishing.',
  },
  mirror_room: {
    name: 'mirror_room',
    phases: ['layout'],
    modifiesScene: true,
    requiresLayout: true,
    recoveryAction: 'Mirror existing room only after source layout is valid.',
  },
  duplicate_level: {
    name: 'duplicate_level',
    phases: ['layout'],
    modifiesScene: true,
    recoveryAction: 'Use only when multi-level duplication is requested.',
  },
  build_staircase: {
    name: 'build_staircase',
    phases: ['layout'],
    modifiesScene: true,
    highRisk: true,
    recoveryAction: 'Use only when start/end level IDs are known.',
  },
}

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
  wantsExactCoordinates: boolean
  allowedNextTools: string[]
  deferredTools: string[]
  sceneProgress?: AgentSceneProgress
}

export interface AgentSceneProgress {
  hasLayout: boolean
  hasZones: boolean
  hasDoors: boolean
  hasWindows: boolean
  hasFurniture: boolean
  hasRoof: boolean
  hasRoomsNeedingOpenings: boolean
}

export interface AgentToolExposure {
  tools: typeof agentTools
  exposedToolNames: string[]
  hiddenToolNames: string[]
  hiddenToolReasonSummary: string
  toolDecisionCards: AgentToolDecisionCard[]
}

export interface ToolArgumentValidationResult {
  valid: boolean
  errors: string[]
  required?: string[]
}

export interface AgentToolContract {
  name: string
  phases: AgentToolPhase[]
  modifiesScene?: boolean
  highRisk?: boolean
  fallbackOnly?: boolean
  requiresLayout?: boolean
  requiresSlabId?: boolean
  requiresWallId?: boolean
  requiresNodeId?: boolean
  requiresNonBlockingValidation?: boolean
  recommendedTool?: string
  recoveryAction?: string
}

export interface CandidateRefs {
  slabs?: Array<Record<string, unknown>>
  walls?: Array<Record<string, unknown>>
  nodes?: Array<Record<string, unknown>>
}

export interface AgentToolReadinessResult {
  valid: boolean
  failureKind?: ToolFailureKind
  errors: string[]
  required?: string[]
  missingInputs?: string[]
  candidateRefs?: CandidateRefs
  recommendedTool?: string
  recommendedNextTool?: string
  retryArgsHint?: Record<string, unknown>
}

export interface AgentToolDecisionCard {
  tool: string
  phases: AgentToolPhase[]
  requiredArguments: string[]
  prerequisites: string[]
  candidateRefs?: CandidateRefs
  nextAction: string
}

export interface AgentTraceEntry {
  phase: AgentPhase
  codeProfile: CodeProfileName
  exposedToolNames: string[]
  hiddenToolNames: string[]
  toolCall?: string
  gateDecision: 'exposed' | 'blocked' | 'deferred' | 'invalid_arguments' | 'executed' | 'invalid_json'
  readinessFailure?: AgentToolReadinessResult
  validationBlockingRuleIds?: string[]
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

function wantsExactCoordinatePlacement(content: string): boolean {
  const normalized = content.toLowerCase()
  return /坐标|精确位置|指定位置|x\s*[:=]|z\s*[:=]|\[[\d\s.,-]+,\s*[\d\s.,-]+,\s*[\d\s.,-]+\]|exact coordinate|exact position|debug/.test(normalized)
}

function agentToolName(tool: (typeof agentTools)[number]): string | null {
  return tool.type === 'function' ? tool.function.name : null
}

function findAgentTool(toolName: string): (typeof agentTools)[number] | undefined {
  return agentTools.find((tool) => agentToolName(tool) === toolName)
}

export function getAgentToolContract(toolName: string): AgentToolContract | null {
  return AGENT_TOOL_CONTRACTS[toolName] ?? null
}

export function listAgentToolContracts(): AgentToolContract[] {
  const names = new Set(agentTools.map(agentToolName).filter((name): name is string => Boolean(name)))
  return Array.from(names).map((name) => AGENT_TOOL_CONTRACTS[name] ?? {
    name,
    phases: ['diagnostic'],
    recoveryAction: 'No explicit contract yet; use only when exposed by policy and schema arguments are complete.',
  })
}

export function validateToolArguments(
  toolName: string,
  args: Record<string, unknown>,
): ToolArgumentValidationResult {
  const tool = findAgentTool(toolName)
  if (!tool || tool.type !== 'function') {
    return { valid: false, errors: [`Unknown tool: ${toolName}`] }
  }
  const parameters = tool.function.parameters
  if (!isSchemaObject(parameters)) return { valid: true, errors: [] }

  const errors: string[] = []
  validateSchemaValue(parameters, args, 'arguments', errors)
  validateSceneReferences(toolName, args, errors)
  return {
    valid: errors.length === 0,
    errors,
    required: Array.isArray(parameters.required)
      ? parameters.required.filter((value): value is string => typeof value === 'string')
      : [],
  }
}

const TOOL_REFERENCE_RULES: Record<string, Array<{ field: string; nodeType?: string; array?: boolean }>> = {
  modify_node: [{ field: 'nodeId' }],
  delete_node: [{ field: 'nodeId' }],
  select_node: [{ field: 'nodeId' }],
  move_nodes: [{ field: 'nodeIds', array: true }],
  batch_modify_nodes: [{ field: 'nodeIds', array: true }],
  add_door_to_wall: [{ field: 'wallId', nodeType: 'wall' }],
  add_window_to_wall: [{ field: 'wallId', nodeType: 'wall' }],
  auto_align_windows: [{ field: 'wallIds', nodeType: 'wall', array: true }],
  place_against_wall: [{ field: 'wallId', nodeType: 'wall' }],
  place_wall_item: [{ field: 'wallId', nodeType: 'wall' }],
  suggest_furniture_layout: [{ field: 'slabId', nodeType: 'slab' }],
  place_furniture_solved: [{ field: 'slabId', nodeType: 'slab' }],
  place_in_room: [{ field: 'slabId', nodeType: 'slab' }],
  furnish_room: [{ field: 'slabId', nodeType: 'slab' }],
  build_staircase: [
    { field: 'startLevelId', nodeType: 'level' },
    { field: 'endLevelId', nodeType: 'level' },
  ],
}

function validateSceneReferences(
  toolName: string,
  args: Record<string, unknown>,
  errors: string[],
): void {
  const rules = TOOL_REFERENCE_RULES[toolName]
  if (!rules) return
  const nodes = useScene.getState().nodes

  for (const rule of rules) {
    const raw = args[rule.field]
    if (raw === undefined || raw === null || raw === '') continue
    const values = rule.array ? (Array.isArray(raw) ? raw : [raw]) : [raw]
    for (const value of values) {
      if (typeof value !== 'string') continue
      const node = nodes[value as keyof typeof nodes]
      if (!node) {
        errors.push(`arguments.${rule.field} references missing node ${value}`)
      } else if (rule.nodeType && node.type !== rule.nodeType) {
        errors.push(`arguments.${rule.field} expected ${rule.nodeType} node, received ${node.type} (${value})`)
      }
    }
  }
}

export function buildInvalidToolArgumentsResult(
  toolName: string,
  validation: ToolArgumentValidationResult,
): Record<string, unknown> {
  const candidateRefs = collectCandidateRefs()
  return {
    success: false,
    failureKind: classifyArgumentFailure(validation.errors),
    error: 'Invalid tool arguments',
    tool: toolName,
    argumentErrors: validation.errors,
    requiredArguments: validation.required ?? [],
    missingInputs: missingInputsForErrors(validation.errors),
    candidateRefs,
    recommendedNextTool: recommendedNextToolForInvalidArgs(toolName, validation.errors),
    retryArgsHint: retryArgsHintForTool(toolName, candidateRefs),
    nextAction:
      'Retry the same exposed tool with complete arguments that match its schema, or call get_scene_info if required IDs are missing.',
  }
}

function classifyArgumentFailure(errors: string[]): ToolFailureKind {
  if (errors.some((error) => /arguments\.(slabId|wallId|wallIds|nodeId|nodeIds).*(is required|references missing node|expected .* node)/.test(error))) {
    return /references missing node|expected .* node/.test(errors.join('\n')) ? 'reference' : 'missing_scene_prerequisite'
  }
  return errors.some((error) => /references missing node|expected .* node/.test(error)) ? 'reference' : 'schema'
}

function missingInputsForErrors(errors: string[]): string[] {
  const missing = new Set<string>()
  for (const error of errors) {
    const match = error.match(/arguments\.([A-Za-z0-9_]+)/)
    if (match?.[1]) missing.add(match[1])
  }
  return Array.from(missing)
}

function recommendedNextToolForInvalidArgs(toolName: string, errors: string[]): string {
  const contract = getAgentToolContract(toolName)
  if (errors.some((error) => /wallId|wallIds/.test(error))) return 'get_scene_info'
  if (errors.some((error) => /slabId/.test(error))) return 'get_scene_info'
  if (contract?.recommendedTool) return contract.recommendedTool
  return toolName
}

function retryArgsHintForTool(toolName: string, candidateRefs: CandidateRefs): Record<string, unknown> {
  const hint: Record<string, unknown> = {}
  const contract = getAgentToolContract(toolName)
  if (contract?.requiresSlabId && candidateRefs.slabs?.[0]?.slabId) hint.slabId = candidateRefs.slabs[0].slabId
  if (contract?.requiresWallId && candidateRefs.walls?.[0]?.wallId) {
    if (toolName === 'auto_align_windows') hint.wallIds = candidateRefs.walls.slice(0, 3).map((wall) => wall.wallId)
    else hint.wallId = candidateRefs.walls[0].wallId
  }
  if (contract?.requiresNodeId && candidateRefs.nodes?.[0]?.id) {
    if (toolName === 'move_nodes' || toolName === 'batch_modify_nodes') hint.nodeIds = [candidateRefs.nodes[0].id]
    else hint.nodeId = candidateRefs.nodes[0].id
  }
  if ((toolName === 'suggest_furniture_layout' || toolName === 'place_furniture_solved') && !hint.roomType) {
    const roomType = candidateRefs.slabs?.find((slab) => typeof slab.roomType === 'string')?.roomType
    hint.roomType = roomType ?? 'living'
  }
  return hint
}

type JsonSchemaLike = {
  type?: string
  properties?: Record<string, unknown>
  items?: unknown
  required?: unknown[]
  enum?: unknown[]
  minItems?: number
  maxItems?: number
}

function isSchemaObject(value: unknown): value is JsonSchemaLike {
  return Boolean(value && typeof value === 'object')
}

function validateSchemaValue(
  schema: JsonSchemaLike,
  value: unknown,
  path: string,
  errors: string[],
): void {
  if (schema.type && !matchesJsonSchemaType(schema.type, value)) {
    errors.push(`${path} expected ${schema.type}, received ${Array.isArray(value) ? 'array' : typeof value}`)
    return
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} expected one of ${schema.enum.map(String).join(', ')}`)
  }

  if (schema.type === 'object' && isPlainObject(value)) {
    for (const requiredKey of schema.required ?? []) {
      if (typeof requiredKey === 'string' && !(requiredKey in value)) {
        errors.push(`${path}.${requiredKey} is required`)
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value && isSchemaObject(childSchema)) {
        validateSchemaValue(childSchema, value[key], `${path}.${key}`, errors)
      }
    }
  }

  if (schema.type === 'array' && Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${path} expected at least ${schema.minItems} items`)
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      errors.push(`${path} expected at most ${schema.maxItems} items`)
    }
    if (isSchemaObject(schema.items)) {
      value.forEach((item, index) => validateSchemaValue(schema.items as JsonSchemaLike, item, `${path}[${index}]`, errors))
    }
  }
}

function matchesJsonSchemaType(type: string, value: unknown): boolean {
  if (type === 'array') return Array.isArray(value)
  if (type === 'object') return isPlainObject(value)
  if (type === 'number') return typeof value === 'number' && Number.isFinite(value)
  if (type === 'string') return typeof value === 'string'
  if (type === 'boolean') return typeof value === 'boolean'
  return true
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function parseSceneContext(sceneContextRaw: string | null | undefined): Record<string, unknown> | null {
  if (!sceneContextRaw) return null
  try {
    const parsed = JSON.parse(sceneContextRaw)
    return isPlainObject(parsed) ? parsed : null
  } catch {
    return null
  }
}

function getSceneContextSnapshot(): Record<string, unknown> | null {
  try {
    return parseSceneContext(executeToolCall('get_scene_info', {}))
  } catch {
    return null
  }
}

function collectCandidateRefs(sceneContext: Record<string, unknown> | null = getSceneContextSnapshot()): CandidateRefs {
  const refs: CandidateRefs = {}
  const architecturalSummary = isPlainObject(sceneContext?.architecturalSummary) ? sceneContext.architecturalSummary : {}
  const spaces = Array.isArray(architecturalSummary.spaces) ? architecturalSummary.spaces : []
  const roomSummaries = Array.isArray(sceneContext?.roomSummaries) ? sceneContext.roomSummaries : []
  const slabDetails = Array.isArray(sceneContext?.slabDetails) ? sceneContext.slabDetails : []
  const wallDetails = Array.isArray(sceneContext?.wallDetails) ? sceneContext.wallDetails : []
  const exteriorWallCandidates = Array.isArray(architecturalSummary.exteriorWallCandidates)
    ? architecturalSummary.exteriorWallCandidates
    : []

  const slabCandidates = new Map<string, Record<string, unknown>>()
  for (const value of [...spaces, ...roomSummaries, ...slabDetails]) {
    if (!isPlainObject(value)) continue
    const slabId = typeof value.slabId === 'string' ? value.slabId : typeof value.id === 'string' ? value.id : null
    if (!slabId) continue
    slabCandidates.set(slabId, {
      id: slabId,
      slabId,
      roomType: typeof value.roomType === 'string' ? value.roomType : undefined,
      zoneName: typeof value.zoneName === 'string' ? value.zoneName : undefined,
      area: typeof value.area === 'number' ? value.area : undefined,
      bounds: isPlainObject(value.bounds) ? value.bounds : undefined,
    })
  }
  if (slabCandidates.size > 0) refs.slabs = Array.from(slabCandidates.values()).slice(0, 8)

  const wallCandidates = new Map<string, Record<string, unknown>>()
  for (const value of [...exteriorWallCandidates, ...wallDetails]) {
    if (!isPlainObject(value)) continue
    const id = typeof value.id === 'string' ? value.id : typeof value.wallId === 'string' ? value.wallId : null
    if (!id) continue
    wallCandidates.set(id, {
      id,
      wallId: id,
      length: typeof value.length === 'number' ? value.length : undefined,
      start: Array.isArray(value.start) ? value.start : undefined,
      end: Array.isArray(value.end) ? value.end : undefined,
      suitableForOpening: typeof value.length === 'number' ? value.length >= 1.2 : undefined,
    })
  }
  if (wallCandidates.size > 0) refs.walls = Array.from(wallCandidates.values()).slice(0, 12)

  const nodes = useScene.getState().nodes
  refs.nodes = Object.values(nodes)
    .filter((node) => isPlainObject(node))
    .slice(0, 16)
    .map((node) => ({
      id: String(node.id ?? ''),
      type: String(node.type ?? ''),
      name: typeof node.name === 'string' ? node.name : undefined,
    }))
    .filter((node) => node.id)

  return refs
}

function hasCandidateRefs(refs: CandidateRefs | undefined): boolean {
  return Boolean((refs?.slabs?.length ?? 0) > 0 || (refs?.walls?.length ?? 0) > 0 || (refs?.nodes?.length ?? 0) > 0)
}

export function parseAgentSceneProgress(sceneContextRaw: string | null | undefined): AgentSceneProgress | null {
  const parsed = parseSceneContext(sceneContextRaw) as {
    summary?: Record<string, unknown>
    createdByType?: Record<string, unknown>
    architecturalSummary?: { spaces?: unknown[] }
    roomSummaries?: unknown[]
  } | null
  try {
    if (!parsed) return null
    const summary = parsed.summary ?? {}
    const createdByType = isPlainObject(parsed.createdByType) ? parsed.createdByType : {}
    const rooms = Array.isArray(parsed.architecturalSummary?.spaces)
      ? parsed.architecturalSummary.spaces
      : Array.isArray(parsed.roomSummaries)
      ? parsed.roomSummaries
      : []
    const createdCount = (key: string) => Array.isArray(createdByType[key]) ? createdByType[key].length : 0
    const numberValue = (key: string) => {
      const summaryValue = Number(summary[key] ?? 0)
      if (summaryValue > 0) return summaryValue
      if (key === 'walls') return createdCount('wall')
      if (key === 'slabs') return createdCount('slab')
      if (key === 'doors') return createdCount('door')
      if (key === 'windows') return createdCount('window')
      if (key === 'zones') return createdCount('zone')
      if (key === 'items') return createdCount('item')
      if (key === 'rooms') return createdCount('slab')
      return 0
    }
    const hasLayout = numberValue('walls') > 0 || numberValue('slabs') > 0 || numberValue('rooms') > 0
    const hasDoors = numberValue('doors') > 0
    const hasWindows = numberValue('windows') > 0
    const hasRoomsNeedingOpenings = rooms.some((room) => (
      room &&
      typeof room === 'object' &&
      'needsOpeningAttention' in room &&
      Boolean((room as { needsOpeningAttention?: unknown }).needsOpeningAttention)
    ))
    return {
      hasLayout,
      hasZones: numberValue('zones') > 0,
      hasDoors,
      hasWindows,
      hasFurniture: numberValue('items') > 0,
      hasRoof: numberValue('roofs') > 0,
      hasRoomsNeedingOpenings: hasLayout && (!hasDoors || !hasWindows || hasRoomsNeedingOpenings),
    }
  } catch {
    return null
  }
}

function toolContractPhaseMatches(contract: AgentToolContract, phase: AgentPhase): boolean {
  return contract.phases.includes('diagnostic') || contract.phases.includes(phase)
}

function toolNamesForPhase(phase: AgentPhase, wantsExactCoordinates: boolean): string[] {
  return listAgentToolContracts()
    .filter((contract) => {
      if (contract.fallbackOnly && contract.name === 'place_furniture' && !wantsExactCoordinates) return false
      if (phase === 'validation_repair') {
        return contract.phases.includes('validation_repair') || contract.phases.includes('diagnostic')
      }
      if (phase === 'openings' && contract.phases.includes('layout')) {
        return true
      }
      return toolContractPhaseMatches(contract, phase)
    })
    .map((contract) => contract.name)
}

export function resolveAgentRunPolicy(
  userContent: string,
  lastValidation: ValidationSnapshot | null = null,
  sceneProgress: AgentSceneProgress | null = null,
): AgentRunPolicy {
  const normalized = userContent.toLowerCase()
  const isChineseResidential = /中文|中国|国标|住宅|公寓|户型|两居|三居|卧室|客厅|厨房|卫生间|阳台/.test(userContent)
  const isResidential = isChineseResidential || /residential|apartment|house|home|bedroom|living|kitchen|bathroom/.test(normalized)
  const isMultiLevel = /多层|楼层|加层|二层|三层|multi-story|multistory|floor|level|second floor|third floor/.test(normalized)
  const includesFurnishing = /家具|软装|装修|摆放|沙发|床|furnish|furniture|sofa|bed|decor/.test(normalized)
  const includesRoofOrDetail = /屋顶|屋面|roof|detail|decoration|装饰/.test(normalized)
  const rapid = allowsRapidConcept(userContent)
  const isComplex = isComplexGenerationRequest(userContent)
  const wantsExactCoordinates = wantsExactCoordinatePlacement(userContent)

  let phase: AgentPhase = 'layout'
  if (lastValidation?.blocking) {
    phase = 'validation_repair'
  } else if (isComplex && !rapid && !sceneProgress?.hasLayout) {
    phase = 'layout'
  } else if (sceneProgress?.hasLayout && sceneProgress.hasRoomsNeedingOpenings && (isResidential || isComplex)) {
    phase = 'openings'
  } else if (includesFurnishing && sceneProgress?.hasLayout) {
    phase = 'furnishing'
  } else if (includesRoofOrDetail && sceneProgress?.hasLayout) {
    phase = 'roof_detail'
  } else if (sceneProgress?.hasLayout && (isResidential || isComplex)) {
    phase = 'openings'
  } else if (isComplex && !rapid) {
    phase = 'layout'
  } else if (includesRoofOrDetail) {
    phase = 'roof_detail'
  } else if (includesFurnishing) {
    phase = 'furnishing'
  } else if (isResidential || isComplex) {
    phase = 'openings'
  }

  const allowedNextTools = toolNamesForPhase(phase, wantsExactCoordinates)

  return {
    codeProfile: isChineseResidential ? 'china_residential' : 'residential_default',
    phase,
    isComplex,
    isResidential,
    isMultiLevel,
    includesFurnishing,
    allowsRapidConcept: rapid,
    wantsExactCoordinates,
    allowedNextTools,
    deferredTools: phase === 'validation_repair' ? Array.from(POST_LAYOUT_TOOLS) : [],
    sceneProgress: sceneProgress ?? undefined,
  }
}

export function selectAgentToolsForPolicy(
  policy: AgentRunPolicy,
  lastValidation: ValidationSnapshot | null = null,
): AgentToolExposure {
  const alwaysVisible = new Set(['get_scene_info', 'validate_scene'])
  const allowed = new Set([...policy.allowedNextTools, ...alwaysVisible])

  if (policy.phase === 'validation_repair' && lastValidation?.blocking) {
    const hintTools = new Set<string>()
    for (const hint of lastValidation.repairHints ?? []) {
      for (const tool of hint.preferredTools ?? []) hintTools.add(tool)
    }
    if (hintTools.size > 0) {
      allowed.clear()
      for (const tool of hintTools) allowed.add(tool)
      for (const tool of ['modify_node', 'move_nodes', 'batch_modify_nodes', 'delete_node']) allowed.add(tool)
      for (const tool of alwaysVisible) allowed.add(tool)
    }
  }

  if (!policy.wantsExactCoordinates) allowed.delete('place_furniture')

  const allToolNames = agentTools
    .map(agentToolName)
    .filter((name): name is string => Boolean(name))
  const exposedToolNames = allToolNames.filter((name) => allowed.has(name))
  const hiddenToolNames = allToolNames.filter((name) => !allowed.has(name))
  const tools = agentTools.filter((tool) => {
    const name = agentToolName(tool)
    return Boolean(name && allowed.has(name))
  })
  const hiddenCount = agentTools.length - tools.length
  const hiddenToolReasonSummary =
    hiddenCount === 0
      ? 'All tools are exposed for this agent turn.'
      : `${hiddenCount} tools are hidden because the current phase is ${policy.phase}; hidden tools should be used in a later stage or after validation repair.`

  return {
    tools,
    exposedToolNames,
    hiddenToolNames,
    hiddenToolReasonSummary,
    toolDecisionCards: buildToolDecisionCards(exposedToolNames, policy, lastValidation),
  }
}

function buildToolDecisionCards(
  toolNames: string[],
  policy: AgentRunPolicy,
  lastValidation: ValidationSnapshot | null,
): AgentToolDecisionCard[] {
  const candidateRefs = collectCandidateRefs()
  return toolNames
    .filter((tool) => tool !== 'get_scene_info')
    .slice(0, 12)
    .map((tool) => {
      const contract = getAgentToolContract(tool)
      const readinessCandidateRefs: CandidateRefs = {}
      if (contract?.requiresSlabId && candidateRefs.slabs?.length) readinessCandidateRefs.slabs = candidateRefs.slabs
      if (contract?.requiresWallId && candidateRefs.walls?.length) readinessCandidateRefs.walls = candidateRefs.walls
      if (contract?.requiresNodeId && candidateRefs.nodes?.length) readinessCandidateRefs.nodes = candidateRefs.nodes
      const schemaRequired = requiredArgumentsForTool(tool)
      const prerequisites = [
        contract?.requiresLayout ? 'layout_exists' : null,
        contract?.requiresSlabId ? 'slabId' : null,
        contract?.requiresWallId ? 'wallId' : null,
        contract?.requiresNodeId ? 'nodeId/nodeIds' : null,
        contract?.requiresNonBlockingValidation ? 'non_blocking_validation' : null,
      ].filter((value): value is string => Boolean(value))
      return {
        tool,
        phases: contract?.phases ?? ['diagnostic'],
        requiredArguments: schemaRequired,
        prerequisites,
        ...(hasCandidateRefs(readinessCandidateRefs) ? { candidateRefs: readinessCandidateRefs } : {}),
        nextAction: nextActionForTool(tool, contract, policy, lastValidation),
      }
    })
}

function requiredArgumentsForTool(toolName: string): string[] {
  const tool = findAgentTool(toolName)
  const parameters = tool?.type === 'function' ? tool.function.parameters : null
  if (!isSchemaObject(parameters) || !Array.isArray(parameters.required)) return []
  return parameters.required.filter((value): value is string => typeof value === 'string')
}

function nextActionForTool(
  toolName: string,
  contract: AgentToolContract | null,
  policy: AgentRunPolicy,
  lastValidation: ValidationSnapshot | null,
): string {
  if (policy.phase === 'validation_repair' && lastValidation?.blocking) {
    return `Fix blocking rules (${(lastValidation.blockingRuleIds ?? []).join(', ') || 'unknown'}), then run validate_scene.`
  }
  if (contract?.recoveryAction) return contract.recoveryAction
  if (toolName === 'validate_scene') return `Validate with ${policy.codeProfile}.`
  return 'Use this tool only with complete schema arguments and known scene IDs.'
}

export function buildBlockedToolResult(
  toolName: string,
  policy: AgentRunPolicy,
  exposure: Pick<AgentToolExposure, 'exposedToolNames' | 'hiddenToolReasonSummary'>,
  lastValidation: ValidationSnapshot | null = null,
): Record<string, unknown> {
  const contract = getAgentToolContract(toolName)
  const candidateRefs = collectCandidateRefs()
  return {
    success: false,
    failureKind: 'phase',
    blocked: true,
    tool: toolName,
    phaseBlockedBy: policy.phase,
    reason: `Tool ${toolName} is not exposed in the current agent phase.`,
    hiddenToolReasonSummary: exposure.hiddenToolReasonSummary,
    allowedNextTools: exposure.exposedToolNames,
    requiredRuleFixes: lastValidation?.blockingRuleIds ?? [],
    repairHints: lastValidation?.blocking ? (lastValidation.repairHints ?? []).slice(0, 5) : [],
    candidateRefs,
    recommendedNextTool: contract?.recommendedTool ?? exposure.exposedToolNames[0] ?? 'get_scene_info',
    retryArgsHint: retryArgsHintForTool(contract?.recommendedTool ?? exposure.exposedToolNames[0] ?? toolName, candidateRefs),
    nextAction:
      'Choose one of allowedNextTools for this turn. If the intended tool is hidden, complete the current validation/staging phase first.',
  }
}

export function buildInvalidJsonToolResult(
  toolName: string,
  rawArguments: string,
  message: string,
): Record<string, unknown> {
  return {
    success: false,
    failureKind: 'invalid_json',
    error: 'Invalid tool arguments JSON',
    tool: toolName,
    arguments: rawArguments,
    message,
    candidateRefs: collectCandidateRefs(),
    recommendedNextTool: toolName,
    retryArgsHint: {},
    nextAction: 'Call the same exposed tool again with complete valid JSON arguments that match the tool schema.',
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
    toolDecisionCards: snapshot.blocking
      ? buildToolDecisionCards(policy.allowedNextTools, policy, snapshot).slice(0, 8)
      : undefined,
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

export function validateToolReadiness(
  toolName: string,
  args: Record<string, unknown>,
  policy: AgentRunPolicy,
  sceneProgress: AgentSceneProgress | null = policy.sceneProgress ?? null,
  lastValidation: ValidationSnapshot | null = null,
): AgentToolReadinessResult {
  const candidateRefs = collectCandidateRefs()
  const contract = getAgentToolContract(toolName)
  const schemaValidation = validateToolArguments(toolName, args)
  if (!schemaValidation.valid) {
    return {
      valid: false,
      failureKind: classifyArgumentFailure(schemaValidation.errors),
      errors: schemaValidation.errors,
      required: schemaValidation.required,
      missingInputs: missingInputsForErrors(schemaValidation.errors),
      candidateRefs,
      recommendedTool: recommendedNextToolForInvalidArgs(toolName, schemaValidation.errors),
      recommendedNextTool: recommendedNextToolForInvalidArgs(toolName, schemaValidation.errors),
      retryArgsHint: retryArgsHintForTool(toolName, candidateRefs),
    }
  }

  const missingInputs: string[] = []
  const errors: string[] = []
  if (contract?.requiresLayout && !sceneProgress?.hasLayout) {
    missingInputs.push('layout')
    errors.push('layout is required before this tool can run')
  }
  if (contract?.requiresSlabId && !hasRoomBoundsArgs(args)) {
    missingInputs.push('slabId')
    errors.push('slabId or complete room bounds are required before this tool can run')
  }
  if (contract?.requiresWallId && !hasWallArgs(toolName, args)) {
    missingInputs.push(toolName === 'auto_align_windows' ? 'wallIds' : 'wallId')
    errors.push(`${toolName === 'auto_align_windows' ? 'wallIds' : 'wallId'} is required before this tool can run`)
  }
  if (contract?.requiresNodeId && !hasNodeArgs(toolName, args)) {
    missingInputs.push(toolName === 'move_nodes' || toolName === 'batch_modify_nodes' ? 'nodeIds' : 'nodeId')
    errors.push(`${toolName === 'move_nodes' || toolName === 'batch_modify_nodes' ? 'nodeIds' : 'nodeId'} is required before this tool can run`)
  }
  if (
    contract?.requiresNonBlockingValidation &&
    lastValidation?.blocking &&
    policy.phase !== 'validation_repair'
  ) {
    errors.push('non-blocking validation is required before this post-layout tool can run')
  }

  if (errors.length > 0) {
    return {
      valid: false,
      failureKind: lastValidation?.blocking && contract?.requiresNonBlockingValidation
        ? 'blocked_validation'
        : 'missing_scene_prerequisite',
      errors,
      required: requiredArgumentsForTool(toolName),
      missingInputs,
      candidateRefs,
      recommendedTool: contract?.recommendedTool ?? (missingInputs.includes('layout') ? 'create_room' : 'get_scene_info'),
      recommendedNextTool: contract?.recommendedTool ?? (missingInputs.includes('layout') ? 'create_room' : 'get_scene_info'),
      retryArgsHint: retryArgsHintForTool(toolName, candidateRefs),
    }
  }

  return { valid: true, errors: [], required: requiredArgumentsForTool(toolName) }
}

function hasRoomBoundsArgs(args: Record<string, unknown>): boolean {
  if (typeof args.slabId === 'string' && args.slabId.length > 0) return true
  return Array.isArray(args.roomOrigin) && typeof args.roomWidth === 'number' && typeof args.roomDepth === 'number'
}

function hasWallArgs(toolName: string, args: Record<string, unknown>): boolean {
  if (toolName === 'auto_align_windows') return Array.isArray(args.wallIds) && args.wallIds.length > 0
  return typeof args.wallId === 'string' && args.wallId.length > 0
}

function hasNodeArgs(toolName: string, args: Record<string, unknown>): boolean {
  if (toolName === 'move_nodes' || toolName === 'batch_modify_nodes') return Array.isArray(args.nodeIds) && args.nodeIds.length > 0
  return typeof args.nodeId === 'string' && args.nodeId.length > 0
}

export function buildToolReadinessFailureResult(
  toolName: string,
  readiness: AgentToolReadinessResult,
): Record<string, unknown> {
  return {
    success: false,
    failureKind: readiness.failureKind ?? 'missing_scene_prerequisite',
    error: 'Tool is not ready to execute',
    tool: toolName,
    argumentErrors: readiness.errors,
    requiredArguments: readiness.required ?? [],
    missingInputs: readiness.missingInputs ?? [],
    candidateRefs: readiness.candidateRefs ?? collectCandidateRefs(),
    recommendedTool: readiness.recommendedTool,
    recommendedNextTool: readiness.recommendedNextTool ?? readiness.recommendedTool ?? 'get_scene_info',
    retryArgsHint: readiness.retryArgsHint ?? {},
    nextAction: 'Use candidateRefs and retryArgsHint to call the recommended tool or retry this tool with complete IDs.',
  }
}

export function createAgentTraceEntry(
  policy: AgentRunPolicy,
  exposure: AgentToolExposure,
  gateDecision: AgentTraceEntry['gateDecision'],
  toolCall?: string,
  readinessFailure?: AgentToolReadinessResult,
  lastValidation: ValidationSnapshot | null = null,
): AgentTraceEntry {
  return {
    phase: policy.phase,
    codeProfile: policy.codeProfile,
    exposedToolNames: exposure.exposedToolNames,
    hiddenToolNames: exposure.hiddenToolNames,
    ...(toolCall ? { toolCall } : {}),
    gateDecision,
    ...(readinessFailure && !readinessFailure.valid ? { readinessFailure } : {}),
    validationBlockingRuleIds: lastValidation?.blockingRuleIds ?? [],
  }
}

function appendAgentTraceToToolResult(rawResult: string, agentTrace: AgentTraceEntry): string {
  try {
    const parsed = JSON.parse(rawResult)
    if (isPlainObject(parsed)) {
      return JSON.stringify({ ...parsed, agentTrace })
    }
  } catch {}
  return JSON.stringify({
    success: false,
    failureKind: 'schema',
    error: 'Tool returned non-JSON result',
    rawResult,
    agentTrace,
  })
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
  let lastPolicy: AgentRunPolicy | null = null

  while (iteration < MAX_ITERATIONS) {
    iteration++

    // Auto-inject current scene context so the AI always knows what exists
    const sceneContext = executeToolCall('get_scene_info', {})
    const sceneProgress = parseAgentSceneProgress(sceneContext)
    const runPolicy = resolveAgentRunPolicy(userContent, lastValidation, sceneProgress)
    lastPolicy = runPolicy
    const toolExposure = selectAgentToolsForPolicy(runPolicy, lastValidation)
    const toolContext = {
      exposedToolNames: toolExposure.exposedToolNames,
      hiddenToolNames: toolExposure.hiddenToolNames,
      hiddenToolReasonSummary: toolExposure.hiddenToolReasonSummary,
      toolDecisionCards: toolExposure.toolDecisionCards,
      instruction:
        'Only call tools listed in exposedToolNames this turn. Use toolDecisionCards for required IDs, candidateRefs, and next action. Tools not exposed are intentionally hidden for the current architectural phase.',
    }
    const systemWithContext = `${SYSTEM_PROMPT}\n\n## Agent Run Policy\n${JSON.stringify(runPolicy, null, 2)}\n\n## Tool Exposure\n${JSON.stringify(toolContext, null, 2)}\n\n## Current Scene State\n${sceneContext}`

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
        tools: toolExposure.tools,
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
        const isSceneModifyingTool = SCENE_MODIFYING_TOOLS.has(tc.name)
        const isExposedTool = toolExposure.exposedToolNames.includes(tc.name)
        let result: string
        let toolArgs: Record<string, unknown> = {}
        try {
          toolArgs = tc.arguments.trim() ? JSON.parse(tc.arguments) : {}
        } catch (err) {
          result = JSON.stringify({
            ...buildInvalidJsonToolResult(tc.name, tc.arguments, err instanceof Error ? err.message : String(err)),
            agentTrace: createAgentTraceEntry(runPolicy, toolExposure, 'invalid_json', tc.name, {
              valid: false,
              failureKind: 'invalid_json',
              errors: [err instanceof Error ? err.message : String(err)],
              candidateRefs: collectCandidateRefs(),
            }, lastValidation),
          })

          const toolMsg: ChatMessage = {
            id: genId(),
            role: 'tool',
            content: result,
            toolCallId: tc.id,
          }

          set((s) => ({
            messages: [...s.messages, toolMsg],
          }))
          continue
        }
        const stagedDeferral = isSceneModifyingTool
          ? stagedDeferralForTool(tc.name, userContent, lastValidation, runPolicy)
          : null
        const readiness = isExposedTool
          ? validateToolReadiness(tc.name, toolArgs, runPolicy, sceneProgress, lastValidation)
          : null

        if (!isExposedTool) {
          result = JSON.stringify({
            ...buildBlockedToolResult(tc.name, runPolicy, toolExposure, lastValidation),
            agentTrace: createAgentTraceEntry(runPolicy, toolExposure, 'blocked', tc.name, undefined, lastValidation),
          })
        } else if (readiness && !readiness.valid) {
          result = JSON.stringify({
            ...buildToolReadinessFailureResult(tc.name, readiness),
            agentTrace: createAgentTraceEntry(runPolicy, toolExposure, 'invalid_arguments', tc.name, readiness, lastValidation),
          })
        } else if (stagedDeferral) {
          result = JSON.stringify({
            ...stagedDeferral,
            agentTrace: createAgentTraceEntry(runPolicy, toolExposure, 'deferred', tc.name, undefined, lastValidation),
          })
        } else if (
          isSceneModifyingTool &&
          sceneModificationCount >= MAX_SCENE_MODIFYING_TOOLS_PER_ITERATION
        ) {
          result = JSON.stringify({
            success: false,
            failureKind: 'phase',
            deferred: true,
            tool: tc.name,
            phaseBlockedBy: runPolicy.phase,
            allowedNextTools: runPolicy.allowedNextTools,
            agentTrace: createAgentTraceEntry(runPolicy, toolExposure, 'deferred', tc.name, undefined, lastValidation),
            reason:
              'Scene generation is staged. Review the validation report from the previous modification, then call this tool again if it is still appropriate.',
            nextAction:
              'Continue with the next architectural phase only after spatial and building-code warnings are resolved.',
          })
        } else {
          const rawResult = executeToolCall(tc.name, toolArgs)
          result = appendAgentTraceToToolResult(rawResult, createAgentTraceEntry(runPolicy, toolExposure, 'executed', tc.name, undefined, lastValidation))
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
          const nextSceneProgress = parseAgentSceneProgress(executeToolCall('get_scene_info', {}))
          const validationMsg: ChatMessage = {
            id: genId(),
            role: 'system',
            content: buildValidationMessage(snapshot, resolveAgentRunPolicy(userContent, snapshot, nextSceneProgress)),
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
  set((s) => ({
    messages: [
      ...s.messages,
      {
        id: genId(),
        role: 'assistant',
        content:
          `工具调用已达到本轮最大迭代次数。当前阶段：${lastPolicy?.phase ?? 'unknown'}；最近阻塞规则：${lastValidation?.blockingRuleIds?.join(', ') || '无'}；建议下一步工具：${lastPolicy?.allowedNextTools.slice(0, 8).join(', ') || 'get_scene_info, validate_scene'}。当前场景已保留，请先查看最近一次 validation/tool result，再继续下一步修复或生成。`,
      },
    ],
    isLoading: false,
  }))
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
    const call = toolCallMap.get(key)!
    if (!call.name) continue
    toolCalls.push({
      ...call,
      id: call.id || `tool_${streamMsgId}_${key}`,
    })
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
