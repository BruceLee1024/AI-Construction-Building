import type { AnyNode } from '@pascal-app/core'

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue }

export interface HarnessStep {
  tool: string
  args?: Record<string, JsonValue>
}

export type ToolResultSuccessAssertion = {
  type: 'toolResult.success'
  step: number
  expected?: boolean
}

export type ToolResultFieldAssertion = {
  type: 'toolResult.field'
  step: number
  path: string
  expected: JsonValue | FieldMatch
}

export type ToolResultIncludesSuggestionsAssertion = {
  type: 'toolResult.includesSuggestions'
  step: number
  tools: string[]
}

export type AgentPolicyAssertion = {
  type: 'agent.policy'
  userContent: string
  codeProfile?: string
  phase?: string
  isComplex?: boolean
  includesFurnishing?: boolean
}

export type AgentDeferralAssertion = {
  type: 'agent.deferral'
  toolName: string
  userContent: string
  lastValidation?: Record<string, JsonValue>
  deferred?: boolean
  phaseBlockedBy?: string
  mustIncludeAllowedTools?: string[]
  mustIncludeRuleIds?: string[]
}

export type AgentToolExposureAssertion = {
  type: 'agent.toolExposure'
  userContent: string
  lastValidation?: Record<string, JsonValue>
  sceneContext?: string | Record<string, JsonValue>
  mustExpose?: string[]
  mustHide?: string[]
  phase?: string
  codeProfile?: string
}

export type NodeCountAssertion = {
  type: 'node.count'
  nodeType: string
  exact?: number
  min?: number
  max?: number
}

export type NodeExistsAssertion = {
  type: 'node.exists'
  nodeType: string
  where?: Record<string, JsonValue | FieldMatch>
}

export type ClosedWallsAssertion = {
  type: 'geometry.closedWalls'
  nodeType?: 'wall'
  tolerance?: number
}

export type ValidationAssertion = {
  type: 'validation'
  valid?: boolean
  blocking?: boolean
  fixedCount?: CountExpectation
  warningCount?: CountExpectation
  blockingCount?: CountExpectation
  issueSummary?: Record<string, CountExpectation>
  ruleSummary?: Record<string, CountExpectation>
  mustIncludeRuleIds?: string[]
  mustExcludeRuleIds?: string[]
  codeProfile?: string
}

export type ValidationRepairHintsAssertion = {
  type: 'validation.repairHints'
  mustIncludeRuleIds: string[]
  mustIncludePreferredTools?: string[]
}

export type MinClearanceAssertion = {
  type: 'geometry.minClearance'
  from: 'doors'
  to: 'floorItems'
  min: number
}

export type NoSlabOverlapAssertion = {
  type: 'geometry.noSlabOverlap'
}

export type OpeningsFitWallAssertion = {
  type: 'geometry.openingsFitWall'
}

export type FurnitureInsideSlabsAssertion = {
  type: 'geometry.furnitureInsideSlabs'
}

export type NoFurnitureOverlapAssertion = {
  type: 'geometry.noFurnitureOverlap'
  clearance?: number
}

export type CountExpectation =
  | number
  | {
      exact?: number
      min?: number
      max?: number
    }

export type FieldMatch = {
  equals?: JsonValue
  approx?: number
  tolerance?: number
  exists?: boolean
  notNull?: boolean
}

export type HarnessAssertion =
  | ToolResultSuccessAssertion
  | ToolResultFieldAssertion
  | ToolResultIncludesSuggestionsAssertion
  | AgentPolicyAssertion
  | AgentDeferralAssertion
  | AgentToolExposureAssertion
  | NodeCountAssertion
  | NodeExistsAssertion
  | ClosedWallsAssertion
  | MinClearanceAssertion
  | NoSlabOverlapAssertion
  | OpeningsFitWallAssertion
  | FurnitureInsideSlabsAssertion
  | NoFurnitureOverlapAssertion
  | ValidationRepairHintsAssertion
  | ValidationAssertion

export interface HarnessCase {
  name: string
  description?: string
  validationArgs?: Record<string, JsonValue>
  steps: HarnessStep[]
  assertions: HarnessAssertion[]
}

export interface AssertionResult {
  pass: boolean
  type: string
  message: string
}

export interface StepResult {
  index: number
  tool: string
  args: Record<string, JsonValue>
  raw: string
  parsed: unknown
}

export interface CaseResult {
  name: string
  description?: string
  pass: boolean
  durationMs: number
  steps: StepResult[]
  validation: unknown
  assertions: AssertionResult[]
  error?: string
}

export interface HarnessReport {
  generatedAt: string
  totals: {
    cases: number
    passed: number
    failed: number
    assertions: number
  }
  cases: CaseResult[]
}

export function assertHarnessCase(value: unknown, filePath: string): asserts value is HarnessCase {
  if (!isRecord(value)) throw new Error(`${filePath}: case must be an object`)
  if (typeof value.name !== 'string' || value.name.trim() === '') {
    throw new Error(`${filePath}: name must be a non-empty string`)
  }
  if (!Array.isArray(value.steps) || value.steps.length === 0) {
    throw new Error(`${filePath}: steps must be a non-empty array`)
  }
  if (!Array.isArray(value.assertions) || value.assertions.length === 0) {
    throw new Error(`${filePath}: assertions must be a non-empty array`)
  }
  if (value.validationArgs != null && !isRecord(value.validationArgs)) {
    throw new Error(`${filePath}: validationArgs must be an object when provided`)
  }

  value.steps.forEach((step, index) => {
    if (!isRecord(step)) throw new Error(`${filePath}: steps[${index}] must be an object`)
    if (typeof step.tool !== 'string' || step.tool.trim() === '') {
      throw new Error(`${filePath}: steps[${index}].tool must be a non-empty string`)
    }
    if (step.args != null && !isRecord(step.args)) {
      throw new Error(`${filePath}: steps[${index}].args must be an object when provided`)
    }
  })

  value.assertions.forEach((assertion, index) => {
    if (!isRecord(assertion)) {
      throw new Error(`${filePath}: assertions[${index}] must be an object`)
    }
    if (typeof assertion.type !== 'string') {
      throw new Error(`${filePath}: assertions[${index}].type must be a string`)
    }
  })
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getByPath(source: unknown, path: string): unknown {
  if (path === '') return source
  return path.split('.').reduce<unknown>((current, part) => {
    if (Array.isArray(current)) {
      const index = Number(part)
      return Number.isInteger(index) ? current[index] : undefined
    }
    if (!isRecord(current)) return undefined
    return current[part]
  }, source)
}

export function nodesByType(nodes: Record<string, AnyNode>, type: string): AnyNode[] {
  return Object.values(nodes).filter((node) => node.type === type)
}
