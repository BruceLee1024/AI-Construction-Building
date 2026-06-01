import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import useScene, { clearSceneHistory } from '@pascal-app/core'
import type { AnyNode } from '@pascal-app/core'
import { executeToolCall } from '../../packages/editor/src/lib/agent/executor'
import {
  parseAgentSceneProgress,
  buildBlockedToolResult,
  buildInvalidToolArgumentsResult,
  buildToolReadinessFailureResult,
  createAgentTraceEntry,
  getAgentToolContract,
  resolveAgentRunPolicy,
  selectAgentToolsForPolicy,
  stagedDeferralForTool,
  validateToolReadiness,
  validateToolArguments,
} from '../../packages/editor/src/store/use-agent'
import {
  assertHarnessCase,
  getByPath,
  isRecord,
  nodesByType,
  type AssertionResult,
  type CaseResult,
  type CountExpectation,
  type FieldMatch,
  type HarnessAssertion,
  type HarnessCase,
  type HarnessReport,
  type JsonValue,
  type StepResult,
} from './schema'

type CliOptions = {
  caseFilter?: string
  reportPath: string
  verbose: boolean
}

const rootDir = process.cwd()
const casesDir = path.join(rootDir, 'tooling/agent-harness/cases')
const defaultReportPath = path.join(rootDir, 'artifacts/agent-harness/latest.json')

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    return setTimeout(() => callback(Date.now()), 0) as unknown as number
  }) as typeof globalThis.requestAnimationFrame
}

if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = ((handle: number) => {
    clearTimeout(handle)
  }) as typeof globalThis.cancelAnimationFrame
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const cases = await loadCases(options.caseFilter)
  const results: CaseResult[] = []

  for (const testCase of cases) {
    const result = await runCase(testCase, options.verbose)
    results.push(result)
    printCaseResult(result, options.verbose)
  }

  const passed = results.filter((result) => result.pass).length
  const failed = results.length - passed
  const report: HarnessReport = {
    generatedAt: new Date().toISOString(),
    totals: {
      cases: results.length,
      passed,
      failed,
      assertions: results.reduce((sum, result) => sum + result.assertions.length, 0),
    },
    cases: results,
  }

  await mkdir(path.dirname(options.reportPath), { recursive: true })
  await writeFile(options.reportPath, `${JSON.stringify(report, null, 2)}\n`)

  console.log('')
  console.log(`Agent harness: ${passed}/${results.length} cases passed, ${failed} failed`)
  console.log(`Report: ${path.relative(rootDir, options.reportPath)}`)

  if (failed > 0) process.exitCode = 1
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    reportPath: defaultReportPath,
    verbose: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--case') {
      options.caseFilter = requiredValue(args, ++i, '--case')
    } else if (arg === '--report') {
      options.reportPath = path.resolve(rootDir, requiredValue(args, ++i, '--report'))
    } else if (arg === '--verbose') {
      options.verbose = true
    } else if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return options
}

function requiredValue(args: string[], index: number, flag: string): string {
  const value = args[index]
  if (!value) throw new Error(`${flag} requires a value`)
  return value
}

function printHelp() {
  console.log(`Usage: npm run agent:harness -- [--case <name-or-file>] [--report <path>] [--verbose]`)
}

async function loadCases(caseFilter?: string): Promise<HarnessCase[]> {
  const files = await resolveCaseFiles(caseFilter)
  const cases: HarnessCase[] = []

  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const parsed = JSON.parse(raw)
    assertHarnessCase(parsed, file)
    cases.push(parsed)
  }

  return cases
}

async function resolveCaseFiles(caseFilter?: string): Promise<string[]> {
  if (caseFilter) {
    const directPath = path.resolve(rootDir, caseFilter)
    if (caseFilter.endsWith('.json')) return [directPath]

    const entries = await readdir(casesDir)
    const matches = entries
      .filter((entry) => entry.endsWith('.json'))
      .filter((entry) => entry === `${caseFilter}.json` || entry.includes(caseFilter))
      .map((entry) => path.join(casesDir, entry))

    if (matches.length === 0) {
      throw new Error(`No harness case matched "${caseFilter}"`)
    }
    return matches.sort()
  }

  const entries = await readdir(casesDir)
  return entries
    .filter((entry) => entry.endsWith('.json'))
    .sort()
    .map((entry) => path.join(casesDir, entry))
}

async function runCase(testCase: HarnessCase, verbose: boolean): Promise<CaseResult> {
  const startedAt = performance.now()
  const stepResults: StepResult[] = []
  let validation: unknown = null
  const assertions: AssertionResult[] = []

  try {
    resetScene()

    for (let index = 0; index < testCase.steps.length; index++) {
      const step = testCase.steps[index]!
      const args = resolveStepArgs(step.args ?? {}, stepResults)
      const raw = executeHarnessStep(step.tool, args)
      const parsed = parseToolResult(raw)
      stepResults.push({ index, tool: step.tool, args, raw, parsed })
      if (verbose) console.log(`  step ${index}: ${step.tool} -> ${summarizeResult(parsed)}`)
    }

    validation = parseToolResult(executeToolCall('validate_scene', testCase.validationArgs ?? {}))

    for (const assertion of testCase.assertions) {
      assertions.push(evaluateAssertion(assertion, stepResults, validation))
    }
  } catch (error) {
    assertions.push({
      pass: false,
      type: 'case.error',
      message: error instanceof Error ? error.message : String(error),
    })
  }

  const durationMs = Math.round(performance.now() - startedAt)
  return {
    name: testCase.name,
    description: testCase.description,
    pass: assertions.every((assertion) => assertion.pass),
    durationMs,
    steps: stepResults,
    validation,
    assertions,
    ...(assertions.some((assertion) => !assertion.pass)
      ? { error: assertions.find((assertion) => !assertion.pass)?.message }
      : {}),
  }
}

function resolveStepArgs(
  args: Record<string, unknown>,
  steps: StepResult[],
): Record<string, JsonValue> {
  const resolved: Record<string, JsonValue> = {}
  for (const [key, value] of Object.entries(args)) {
    resolved[key] = resolveStepArgValue(value, steps) as JsonValue
  }
  return resolved
}

function resolveStepArgValue(value: unknown, steps: StepResult[]): unknown {
  if (isRecord(value) && typeof value.fromStep === 'number' && typeof value.path === 'string') {
    return getByPath(steps[value.fromStep]?.parsed, value.path)
  }
  if (Array.isArray(value)) return value.map((item) => resolveStepArgValue(item, steps))
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, resolveStepArgValue(child, steps)]))
  }
  return value
}

function resetScene() {
  clearSceneHistory()
  useScene.getState().unloadScene()
  useScene.getState().loadScene()
  clearSceneHistory()
}

function parseToolResult(raw: string): unknown {
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

function evaluateAssertion(
  assertion: HarnessAssertion,
  steps: StepResult[],
  validation: unknown,
): AssertionResult {
  switch (assertion.type) {
    case 'toolResult.success':
      return assertToolResultSuccess(assertion.step, assertion.expected ?? true, steps)
    case 'toolResult.field':
      return assertToolResultField(assertion, steps)
    case 'toolResult.includesSuggestions':
      return assertToolResultIncludesSuggestions(assertion, steps)
    case 'agent.policy':
      return assertAgentPolicy(assertion)
    case 'agent.deferral':
      return assertAgentDeferral(assertion)
    case 'agent.toolExposure':
      return assertAgentToolExposure(assertion)
    case 'agent.toolGate':
      return assertAgentToolGate(assertion)
    case 'agent.toolArgs':
      return assertAgentToolArgs(assertion)
    case 'agent.toolArgsFromStep':
      return assertAgentToolArgsFromStep(assertion, steps)
    case 'agent.toolContract':
      return assertAgentToolContract(assertion)
    case 'agent.toolReadiness':
      return assertAgentToolReadiness(assertion)
    case 'toolResult.failureShape':
      return assertToolResultFailureShape(assertion, steps)
    case 'toolResult.candidateRefs':
      return assertToolResultCandidateRefs(assertion, steps)
    case 'agent.trace':
      return assertAgentTrace(assertion, steps)
    case 'node.count':
      return assertNodeCount(assertion)
    case 'node.exists':
      return assertNodeExists(assertion)
    case 'geometry.closedWalls':
      return assertClosedWalls(assertion.tolerance ?? 0.001)
    case 'geometry.minClearance':
      return assertMinClearance(assertion)
    case 'geometry.noSlabOverlap':
      return assertNoSlabOverlap()
    case 'geometry.openingsFitWall':
      return assertOpeningsFitWall()
    case 'geometry.furnitureInsideSlabs':
      return assertFurnitureInsideSlabs()
    case 'geometry.noFurnitureOverlap':
      return assertNoFurnitureOverlap(assertion.clearance ?? 0)
    case 'validation.repairHints':
      return assertValidationRepairHints(assertion, validation)
    case 'validation':
      return assertValidation(assertion, validation)
    default:
      return {
        pass: false,
        type: (assertion as { type: string }).type,
        message: `Unknown assertion type: ${(assertion as { type: string }).type}`,
      }
  }
}

function executeHarnessStep(tool: string, args: Record<string, JsonValue>): string {
  if (tool === 'agent.staged_deferral') {
    return JSON.stringify(stagedDeferralForTool(
      String(args.toolName ?? ''),
      String(args.userContent ?? ''),
      isRecord(args.lastValidation) ? args.lastValidation as unknown as Parameters<typeof stagedDeferralForTool>[2] : null,
    ))
  }
  if (tool === 'agent.invalid_json') {
    const sceneContext = typeof args.sceneContext === 'string'
      ? args.sceneContext
      : isRecord(args.sceneContext)
      ? JSON.stringify(args.sceneContext)
      : null
    const sceneProgress = parseAgentSceneProgress(sceneContext)
    const policy = resolveAgentRunPolicy(String(args.userContent ?? ''), null, sceneProgress)
    const exposure = selectAgentToolsForPolicy(policy, null)
    return JSON.stringify({
      success: false,
      failureKind: 'invalid_json',
      error: 'Invalid tool arguments JSON',
      tool: String(args.toolName ?? ''),
      arguments: String(args.arguments ?? ''),
      candidateRefs: {},
      recommendedNextTool: String(args.toolName ?? ''),
      retryArgsHint: {},
      agentTrace: createAgentTraceEntry(policy, exposure, 'invalid_json', String(args.toolName ?? ''), {
        valid: false,
        failureKind: 'invalid_json',
        errors: ['Unexpected token'],
      }),
    })
  }
  if (tool === 'agent.tool_readiness') {
    const userContent = String(args.userContent ?? '')
    const lastValidation = isRecord(args.lastValidation)
      ? args.lastValidation as unknown as Parameters<typeof resolveAgentRunPolicy>[1]
      : null
    const sceneContext = typeof args.sceneContext === 'string'
      ? args.sceneContext
      : isRecord(args.sceneContext)
      ? JSON.stringify(args.sceneContext)
      : executeToolCall('get_scene_info', {})
    const sceneProgress = parseAgentSceneProgress(sceneContext)
    const policy = resolveAgentRunPolicy(userContent, lastValidation, sceneProgress)
    const toolArgs = isRecord(args.toolArgs) ? args.toolArgs as Record<string, unknown> : {}
    const readiness = validateToolReadiness(String(args.toolName ?? ''), toolArgs, policy, sceneProgress, lastValidation)
    return JSON.stringify(readiness.valid ? readiness : buildToolReadinessFailureResult(String(args.toolName ?? ''), readiness))
  }
  return executeToolCall(tool, args)
}

function assertToolResultSuccess(
  stepIndex: number,
  expected: boolean,
  steps: StepResult[],
): AssertionResult {
  const step = steps[stepIndex]
  const actual = isRecord(step?.parsed) ? step.parsed.success === true : false
  return {
    pass: actual === expected,
    type: 'toolResult.success',
    message: `step ${stepIndex} success expected ${expected}, received ${actual}`,
  }
}

function assertToolResultField(
  assertion: Extract<HarnessAssertion, { type: 'toolResult.field' }>,
  steps: StepResult[],
): AssertionResult {
  const step = steps[assertion.step]
  const actual = getByPath(step?.parsed, assertion.path)
  const pass = matchesExpectation(actual, assertion.expected)
  return {
    pass,
    type: 'toolResult.field',
    message: `step ${assertion.step} field ${assertion.path} expected ${JSON.stringify(assertion.expected)}, received ${JSON.stringify(actual)}`,
  }
}

function assertToolResultIncludesSuggestions(
  assertion: Extract<HarnessAssertion, { type: 'toolResult.includesSuggestions' }>,
  steps: StepResult[],
): AssertionResult {
  const step = steps[assertion.step]
  const suggestions = getByPath(step?.parsed, 'suggestedNextTools')
  const failures: string[] = []
  if (!Array.isArray(suggestions)) {
    failures.push('suggestedNextTools was not an array')
  } else {
    for (const tool of assertion.tools) {
      if (!suggestions.includes(tool)) failures.push(`missing suggested tool ${tool}`)
    }
  }
  return {
    pass: failures.length === 0,
    type: 'toolResult.includesSuggestions',
    message: failures.length === 0 ? 'suggested tools matched' : failures.join('; '),
  }
}

function assertAgentPolicy(
  assertion: Extract<HarnessAssertion, { type: 'agent.policy' }>,
): AssertionResult {
  const policy = resolveAgentRunPolicy(assertion.userContent)
  const failures: string[] = []
  if (assertion.codeProfile !== undefined && policy.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${policy.codeProfile}`)
  }
  if (assertion.phase !== undefined && policy.phase !== assertion.phase) {
    failures.push(`phase expected ${assertion.phase}, received ${policy.phase}`)
  }
  if (assertion.isComplex !== undefined && policy.isComplex !== assertion.isComplex) {
    failures.push(`isComplex expected ${assertion.isComplex}, received ${policy.isComplex}`)
  }
  if (assertion.includesFurnishing !== undefined && policy.includesFurnishing !== assertion.includesFurnishing) {
    failures.push(`includesFurnishing expected ${assertion.includesFurnishing}, received ${policy.includesFurnishing}`)
  }
  return {
    pass: failures.length === 0,
    type: 'agent.policy',
    message: failures.length === 0 ? 'agent policy matched' : failures.join('; '),
  }
}

function assertAgentDeferral(
  assertion: Extract<HarnessAssertion, { type: 'agent.deferral' }>,
): AssertionResult {
  const lastValidation = isRecord(assertion.lastValidation)
    ? assertion.lastValidation as unknown as Parameters<typeof stagedDeferralForTool>[2]
    : null
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation)
  const result = stagedDeferralForTool(assertion.toolName, assertion.userContent, lastValidation, policy)
  const failures: string[] = []
  const expectedDeferred = assertion.deferred ?? true
  if (Boolean(result?.deferred) !== expectedDeferred) {
    failures.push(`deferred expected ${expectedDeferred}, received ${Boolean(result?.deferred)}`)
  }
  if (assertion.phaseBlockedBy !== undefined && result?.phaseBlockedBy !== assertion.phaseBlockedBy) {
    failures.push(`phaseBlockedBy expected ${assertion.phaseBlockedBy}, received ${String(result?.phaseBlockedBy)}`)
  }
  const allowedTools = Array.isArray(result?.allowedNextTools) ? result.allowedNextTools : []
  for (const tool of assertion.mustIncludeAllowedTools ?? []) {
    if (!allowedTools.includes(tool)) failures.push(`allowedNextTools missing ${tool}`)
  }
  const requiredRuleFixes = Array.isArray(result?.requiredRuleFixes) ? result.requiredRuleFixes : []
  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!requiredRuleFixes.includes(ruleId)) failures.push(`requiredRuleFixes missing ${ruleId}`)
  }
  return {
    pass: failures.length === 0,
    type: 'agent.deferral',
    message: failures.length === 0 ? 'agent deferral matched' : failures.join('; '),
  }
}

function assertAgentToolExposure(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolExposure' }>,
): AssertionResult {
  const lastValidation = isRecord(assertion.lastValidation)
    ? assertion.lastValidation as unknown as Parameters<typeof resolveAgentRunPolicy>[1]
    : null
  const sceneContext = typeof assertion.sceneContext === 'string'
    ? assertion.sceneContext
    : isRecord(assertion.sceneContext)
    ? JSON.stringify(assertion.sceneContext)
    : null
  const sceneProgress = parseAgentSceneProgress(sceneContext)
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation, sceneProgress)
  const exposure = selectAgentToolsForPolicy(policy, lastValidation)
  const exposed = new Set(exposure.exposedToolNames)
  const failures: string[] = []

  if (assertion.phase !== undefined && policy.phase !== assertion.phase) {
    failures.push(`phase expected ${assertion.phase}, received ${policy.phase}`)
  }
  if (assertion.codeProfile !== undefined && policy.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${policy.codeProfile}`)
  }
  for (const tool of assertion.mustExpose ?? []) {
    if (!exposed.has(tool)) failures.push(`expected exposed tool ${tool}`)
  }
  for (const tool of assertion.mustHide ?? []) {
    if (exposed.has(tool)) failures.push(`expected hidden tool ${tool}`)
  }

  return {
    pass: failures.length === 0,
    type: 'agent.toolExposure',
    message: failures.length === 0
      ? `tool exposure matched (${exposure.exposedToolNames.join(', ')})`
      : failures.join('; '),
  }
}

function assertAgentToolGate(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolGate' }>,
): AssertionResult {
  const lastValidation = isRecord(assertion.lastValidation)
    ? assertion.lastValidation as unknown as Parameters<typeof resolveAgentRunPolicy>[1]
    : null
  const sceneContext = typeof assertion.sceneContext === 'string'
    ? assertion.sceneContext
    : isRecord(assertion.sceneContext)
    ? JSON.stringify(assertion.sceneContext)
    : null
  const sceneProgress = parseAgentSceneProgress(sceneContext)
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation, sceneProgress)
  const exposure = selectAgentToolsForPolicy(policy, lastValidation)
  const exposed = exposure.exposedToolNames.includes(assertion.toolName)
  const result = exposed ? null : buildBlockedToolResult(assertion.toolName, policy, exposure, lastValidation)
  const failures: string[] = []
  const expectedBlocked = assertion.blocked ?? true

  if (Boolean(result?.blocked) !== expectedBlocked) {
    failures.push(`blocked expected ${expectedBlocked}, received ${Boolean(result?.blocked)}`)
  }
  if (assertion.phaseBlockedBy !== undefined && result?.phaseBlockedBy !== assertion.phaseBlockedBy) {
    failures.push(`phaseBlockedBy expected ${assertion.phaseBlockedBy}, received ${String(result?.phaseBlockedBy)}`)
  }
  const allowedTools = Array.isArray(result?.allowedNextTools) ? result.allowedNextTools : []
  for (const tool of assertion.mustIncludeAllowedTools ?? []) {
    if (!allowedTools.includes(tool)) failures.push(`allowedNextTools missing ${tool}`)
  }
  const requiredRuleFixes = Array.isArray(result?.requiredRuleFixes) ? result.requiredRuleFixes : []
  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!requiredRuleFixes.includes(ruleId)) failures.push(`requiredRuleFixes missing ${ruleId}`)
  }

  return {
    pass: failures.length === 0,
    type: 'agent.toolGate',
    message: failures.length === 0 ? 'agent tool gate matched' : failures.join('; '),
  }
}

function assertAgentToolArgs(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolArgs' }>,
): AssertionResult {
  const validation = validateToolArguments(assertion.toolName, assertion.args as Record<string, unknown>)
  const result = validation.valid ? null : buildInvalidToolArgumentsResult(assertion.toolName, validation)
  const failures: string[] = []
  const expectedValid = assertion.valid ?? true
  if (validation.valid !== expectedValid) {
    failures.push(`valid expected ${expectedValid}, received ${validation.valid}`)
  }
  const errorText = [...validation.errors, ...(Array.isArray(result?.argumentErrors) ? result.argumentErrors.map(String) : [])].join('\n')
  for (const expected of assertion.mustIncludeErrors ?? []) {
    if (!errorText.includes(expected)) failures.push(`argument errors missing ${expected}`)
  }

  return {
    pass: failures.length === 0,
    type: 'agent.toolArgs',
    message: failures.length === 0 ? 'agent tool arguments matched' : failures.join('; '),
  }
}

function assertAgentToolArgsFromStep(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolArgsFromStep' }>,
  steps: StepResult[],
): AssertionResult {
  const resolvedArgs: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(assertion.args)) {
    if (isRecord(value) && typeof value.fromStep === 'number' && typeof value.path === 'string') {
      resolvedArgs[key] = getByPath(steps[value.fromStep]?.parsed, value.path)
    } else {
      resolvedArgs[key] = value
    }
  }
  const validation = validateToolArguments(assertion.toolName, resolvedArgs)
  const result = validation.valid ? null : buildInvalidToolArgumentsResult(assertion.toolName, validation)
  const failures: string[] = []
  const expectedValid = assertion.valid ?? true
  if (validation.valid !== expectedValid) {
    failures.push(`valid expected ${expectedValid}, received ${validation.valid}`)
  }
  const errorText = [...validation.errors, ...(Array.isArray(result?.argumentErrors) ? result.argumentErrors.map(String) : [])].join('\n')
  for (const expected of assertion.mustIncludeErrors ?? []) {
    if (!errorText.includes(expected)) failures.push(`argument errors missing ${expected}`)
  }

  return {
    pass: failures.length === 0,
    type: 'agent.toolArgsFromStep',
    message: failures.length === 0 ? 'agent tool arguments from step matched' : failures.join('; '),
  }
}

function assertAgentToolContract(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolContract' }>,
): AssertionResult {
  const contract = getAgentToolContract(assertion.toolName)
  const failures: string[] = []
  if (!contract) failures.push(`missing contract for ${assertion.toolName}`)
  if (contract) {
    for (const phase of assertion.phases ?? []) {
      if (!contract.phases.includes(phase as never)) failures.push(`contract phases missing ${phase}`)
    }
    if (assertion.modifiesScene !== undefined && Boolean(contract.modifiesScene) !== assertion.modifiesScene) {
      failures.push(`modifiesScene expected ${assertion.modifiesScene}, received ${Boolean(contract.modifiesScene)}`)
    }
    if (assertion.fallbackOnly !== undefined && Boolean(contract.fallbackOnly) !== assertion.fallbackOnly) {
      failures.push(`fallbackOnly expected ${assertion.fallbackOnly}, received ${Boolean(contract.fallbackOnly)}`)
    }
    if (assertion.requiresLayout !== undefined && Boolean(contract.requiresLayout) !== assertion.requiresLayout) {
      failures.push(`requiresLayout expected ${assertion.requiresLayout}, received ${Boolean(contract.requiresLayout)}`)
    }
    if (assertion.requiresSlabId !== undefined && Boolean(contract.requiresSlabId) !== assertion.requiresSlabId) {
      failures.push(`requiresSlabId expected ${assertion.requiresSlabId}, received ${Boolean(contract.requiresSlabId)}`)
    }
    if (assertion.requiresWallId !== undefined && Boolean(contract.requiresWallId) !== assertion.requiresWallId) {
      failures.push(`requiresWallId expected ${assertion.requiresWallId}, received ${Boolean(contract.requiresWallId)}`)
    }
    if (assertion.requiresNonBlockingValidation !== undefined && Boolean(contract.requiresNonBlockingValidation) !== assertion.requiresNonBlockingValidation) {
      failures.push(`requiresNonBlockingValidation expected ${assertion.requiresNonBlockingValidation}, received ${Boolean(contract.requiresNonBlockingValidation)}`)
    }
  }
  return {
    pass: failures.length === 0,
    type: 'agent.toolContract',
    message: failures.length === 0 ? 'agent tool contract matched' : failures.join('; '),
  }
}

function assertAgentToolReadiness(
  assertion: Extract<HarnessAssertion, { type: 'agent.toolReadiness' }>,
): AssertionResult {
  const lastValidation = isRecord(assertion.lastValidation)
    ? assertion.lastValidation as unknown as Parameters<typeof resolveAgentRunPolicy>[1]
    : null
  const sceneContext = typeof assertion.sceneContext === 'string'
    ? assertion.sceneContext
    : isRecord(assertion.sceneContext)
    ? JSON.stringify(assertion.sceneContext)
    : null
  const sceneProgress = parseAgentSceneProgress(sceneContext)
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation, sceneProgress)
  const readiness = validateToolReadiness(assertion.toolName, assertion.args as Record<string, unknown>, policy, sceneProgress, lastValidation)
  const result = readiness.valid ? readiness : buildToolReadinessFailureResult(assertion.toolName, readiness)
  const failures: string[] = []
  const expectedValid = assertion.valid ?? true
  if (readiness.valid !== expectedValid) failures.push(`valid expected ${expectedValid}, received ${readiness.valid}`)
  if (assertion.failureKind !== undefined && readiness.failureKind !== assertion.failureKind) {
    failures.push(`failureKind expected ${assertion.failureKind}, received ${String(readiness.failureKind)}`)
  }
  const missingInputs = Array.isArray(result.missingInputs) ? result.missingInputs.map(String) : []
  for (const input of assertion.mustIncludeMissingInputs ?? []) {
    if (!missingInputs.includes(input)) failures.push(`missingInputs missing ${input}`)
  }
  const candidateRefs = isRecord(result.candidateRefs) ? result.candidateRefs : {}
  for (const key of assertion.mustIncludeCandidateRefs ?? []) {
    if (!Array.isArray(candidateRefs[key]) || candidateRefs[key].length === 0) failures.push(`candidateRefs missing ${key}`)
  }
  if (assertion.recommendedNextTool !== undefined && result.recommendedNextTool !== assertion.recommendedNextTool) {
    failures.push(`recommendedNextTool expected ${assertion.recommendedNextTool}, received ${String(result.recommendedNextTool)}`)
  }
  return {
    pass: failures.length === 0,
    type: 'agent.toolReadiness',
    message: failures.length === 0 ? 'agent tool readiness matched' : failures.join('; '),
  }
}

function assertToolResultFailureShape(
  assertion: Extract<HarnessAssertion, { type: 'toolResult.failureShape' }>,
  steps: StepResult[],
): AssertionResult {
  const parsed = steps[assertion.step]?.parsed
  if (!isRecord(parsed)) return { pass: false, type: 'toolResult.failureShape', message: 'step result was not an object' }
  const failures: string[] = []
  if (parsed.success !== false) failures.push(`success expected false, received ${String(parsed.success)}`)
  if (assertion.failureKind !== undefined && parsed.failureKind !== assertion.failureKind) {
    failures.push(`failureKind expected ${assertion.failureKind}, received ${String(parsed.failureKind)}`)
  }
  for (const field of assertion.mustIncludeFields ?? []) {
    if (getByPath(parsed, field) === undefined) failures.push(`missing field ${field}`)
  }
  return {
    pass: failures.length === 0,
    type: 'toolResult.failureShape',
    message: failures.length === 0 ? 'failure shape matched' : failures.join('; '),
  }
}

function assertToolResultCandidateRefs(
  assertion: Extract<HarnessAssertion, { type: 'toolResult.candidateRefs' }>,
  steps: StepResult[],
): AssertionResult {
  const parsed = steps[assertion.step]?.parsed
  const candidateRefs = isRecord(parsed) && isRecord(parsed.candidateRefs) ? parsed.candidateRefs : {}
  const failures: string[] = []
  for (const key of assertion.mustInclude ?? []) {
    if (!Array.isArray(candidateRefs[key]) || candidateRefs[key].length === 0) failures.push(`candidateRefs missing ${key}`)
  }
  return {
    pass: failures.length === 0,
    type: 'toolResult.candidateRefs',
    message: failures.length === 0 ? 'candidate refs matched' : failures.join('; '),
  }
}

function assertAgentTrace(
  assertion: Extract<HarnessAssertion, { type: 'agent.trace' }>,
  steps: StepResult[],
): AssertionResult {
  const trace = getByPath(steps[assertion.step]?.parsed, 'agentTrace')
  if (!isRecord(trace)) return { pass: false, type: 'agent.trace', message: 'agentTrace was not an object' }
  const failures: string[] = []
  if (assertion.phase !== undefined && trace.phase !== assertion.phase) failures.push(`phase expected ${assertion.phase}, received ${String(trace.phase)}`)
  if (assertion.gateDecision !== undefined && trace.gateDecision !== assertion.gateDecision) failures.push(`gateDecision expected ${assertion.gateDecision}, received ${String(trace.gateDecision)}`)
  if (assertion.toolCall !== undefined && trace.toolCall !== assertion.toolCall) failures.push(`toolCall expected ${assertion.toolCall}, received ${String(trace.toolCall)}`)
  const exposed = Array.isArray(trace.exposedToolNames) ? trace.exposedToolNames : []
  for (const tool of assertion.mustIncludeExposed ?? []) {
    if (!exposed.includes(tool)) failures.push(`exposedToolNames missing ${tool}`)
  }
  const hidden = Array.isArray(trace.hiddenToolNames) ? trace.hiddenToolNames : []
  for (const tool of assertion.mustIncludeHidden ?? []) {
    if (!hidden.includes(tool)) failures.push(`hiddenToolNames missing ${tool}`)
  }
  return {
    pass: failures.length === 0,
    type: 'agent.trace',
    message: failures.length === 0 ? 'agent trace matched' : failures.join('; '),
  }
}

function assertNodeCount(assertion: Extract<HarnessAssertion, { type: 'node.count' }>): AssertionResult {
  const count = nodesByType(useScene.getState().nodes, assertion.nodeType).length
  const pass = matchesCount(count, {
    exact: assertion.exact,
    min: assertion.min,
    max: assertion.max,
  })
  return {
    pass,
    type: 'node.count',
    message: `${assertion.nodeType} count expected ${formatCountExpectation(assertion)}, received ${count}`,
  }
}

function assertNodeExists(assertion: Extract<HarnessAssertion, { type: 'node.exists' }>): AssertionResult {
  const candidates = nodesByType(useScene.getState().nodes, assertion.nodeType)
  const match = candidates.find((node) => matchesWhere(node, assertion.where ?? {}))
  return {
    pass: Boolean(match),
    type: 'node.exists',
    message: `${assertion.nodeType} exists with ${JSON.stringify(assertion.where ?? {})}`,
  }
}

function assertClosedWalls(tolerance: number): AssertionResult {
  const walls = nodesByType(useScene.getState().nodes, 'wall') as Array<
    AnyNode & { start?: [number, number]; end?: [number, number] }
  >
  const unmatched: string[] = []

  for (const wall of walls) {
    if (!(wall.start && wall.end)) {
      unmatched.push(`${wall.id}:missing-endpoints`)
      continue
    }
    const startMatches = walls.some((other) => other.id !== wall.id && other.end && dist2D(wall.start!, other.end) <= tolerance)
    const endMatches = walls.some((other) => other.id !== wall.id && other.start && dist2D(wall.end!, other.start) <= tolerance)
    if (!startMatches || !endMatches) unmatched.push(wall.id)
  }

  return {
    pass: walls.length > 0 && unmatched.length === 0,
    type: 'geometry.closedWalls',
    message: `closed wall loop expected, unmatched walls: ${unmatched.length ? unmatched.join(', ') : 'none'}`,
  }
}

function assertMinClearance(assertion: Extract<HarnessAssertion, { type: 'geometry.minClearance' }>): AssertionResult {
  const nodes = useScene.getState().nodes
  const walls = nodesByType(nodes, 'wall') as Array<
    AnyNode & { start?: [number, number]; end?: [number, number]; children?: string[] }
  >
  const items = nodesByType(nodes, 'item') as Array<
    AnyNode & { position?: [number, number, number]; asset?: { attachTo?: string; size?: [number, number, number] }; scale?: [number, number, number] }
  >
  const floorItems = items.filter((item) => {
    const attachTo = item.asset?.attachTo
    return attachTo !== 'wall' && attachTo !== 'wall-side' && attachTo !== 'ceiling'
  })
  const doors = collectDoorInfos(walls, nodes)
  const violations: string[] = []

  for (const door of doors) {
    for (const item of floorItems) {
      if (!item.position) continue
      const distance = dist2D([door.worldX, door.worldZ], [item.position[0], item.position[2]])
      const radius = itemRadius(item)
      const clearance = distance - door.width / 2 - radius
      if (clearance < assertion.min) {
        violations.push(`${door.id}->${item.id}:${clearance.toFixed(2)}m`)
      }
    }
  }

  return {
    pass: violations.length === 0,
    type: 'geometry.minClearance',
    message: `minimum clearance ${assertion.min.toFixed(2)}m expected, violations: ${violations.length ? violations.join(', ') : 'none'}`,
  }
}

function assertNoSlabOverlap(): AssertionResult {
  const slabs = nodesByType(useScene.getState().nodes, 'slab') as Array<
    AnyNode & { polygon?: [number, number][] }
  >
  const overlaps: string[] = []

  for (let i = 0; i < slabs.length; i++) {
    for (let j = i + 1; j < slabs.length; j++) {
      const a = slabs[i]!
      const b = slabs[j]!
      if (!a.polygon || !b.polygon) continue
      if (polygonsOverlap(a.polygon, b.polygon)) overlaps.push(`${a.id}<->${b.id}`)
    }
  }

  return {
    pass: overlaps.length === 0,
    type: 'geometry.noSlabOverlap',
    message: `no slab overlap expected, overlaps: ${overlaps.length ? overlaps.join(', ') : 'none'}`,
  }
}

function assertOpeningsFitWall(): AssertionResult {
  const nodes = useScene.getState().nodes
  const walls = nodesByType(nodes, 'wall') as Array<
    AnyNode & { start?: [number, number]; end?: [number, number]; children?: string[] }
  >
  const violations: string[] = []

  for (const wall of walls) {
    if (!wall.start || !wall.end) continue
    const wallLen = dist2D(wall.start, wall.end)
    const openings: Array<{ id: string; minX: number; maxX: number }> = []
    for (const childId of wall.children ?? []) {
      const child = nodes[childId]
      if (!isRecord(child) || (child.type !== 'door' && child.type !== 'window')) continue
      const position = child.position
      if (!Array.isArray(position) || typeof position[0] !== 'number') continue
      const width = typeof child.width === 'number' ? child.width : child.type === 'door' ? 0.9 : 1.5
      const minX = position[0] - width / 2
      const maxX = position[0] + width / 2
      if (minX < 0 || maxX > wallLen) violations.push(`${child.id}:out-of-wall`)
      openings.push({ id: String(child.id), minX, maxX })
    }

    for (let i = 0; i < openings.length; i++) {
      for (let j = i + 1; j < openings.length; j++) {
        const a = openings[i]!
        const b = openings[j]!
        if (a.maxX > b.minX && a.minX < b.maxX) violations.push(`${a.id}<->${b.id}:overlap`)
      }
    }
  }

  return {
    pass: violations.length === 0,
    type: 'geometry.openingsFitWall',
    message: `openings fit walls expected, violations: ${violations.length ? violations.join(', ') : 'none'}`,
  }
}

function assertFurnitureInsideSlabs(): AssertionResult {
  const nodes = useScene.getState().nodes
  const slabs = nodesByType(nodes, 'slab') as Array<AnyNode & { polygon?: [number, number][] }>
  const items = nodesByType(nodes, 'item') as Array<AnyNode & { position?: [number, number, number]; asset?: { attachTo?: string; dimensions?: [number, number, number] }; rotation?: [number, number, number] }>
  const violations: string[] = []
  for (const item of items) {
    const attachTo = item.asset?.attachTo
    if (attachTo === 'wall' || attachTo === 'wall-side' || attachTo === 'ceiling') continue
    if (!item.position || !item.asset?.dimensions) continue
    const rotationDeg = Math.round(((item.rotation?.[1] ?? 0) * 180) / Math.PI)
    const bbox = itemBboxForHarness(item.position, item.asset.dimensions, rotationDeg)
    const inside = slabs.some((slab) => slab.polygon && bboxCornersInsidePolygonForHarness(bbox, slab.polygon))
    if (!inside) violations.push(item.id)
  }
  return {
    pass: violations.length === 0,
    type: 'geometry.furnitureInsideSlabs',
    message: `all furniture bbox corners inside slabs expected, violations: ${violations.length ? violations.join(', ') : 'none'}`,
  }
}

function assertNoFurnitureOverlap(clearance: number): AssertionResult {
  const nodes = useScene.getState().nodes
  const items = nodesByType(nodes, 'item') as Array<AnyNode & { position?: [number, number, number]; asset?: { attachTo?: string; dimensions?: [number, number, number] }; rotation?: [number, number, number] }>
  const floorItems = items.filter((item) => {
    const attachTo = item.asset?.attachTo
    return attachTo !== 'wall' && attachTo !== 'wall-side' && attachTo !== 'ceiling' && item.position && item.asset?.dimensions
  })
  const violations: string[] = []
  for (let i = 0; i < floorItems.length; i++) {
    for (let j = i + 1; j < floorItems.length; j++) {
      const a = floorItems[i]!
      const b = floorItems[j]!
      const aBox = expandBboxForHarness(itemBboxForHarness(a.position!, a.asset!.dimensions!, Math.round(((a.rotation?.[1] ?? 0) * 180) / Math.PI)), clearance)
      const bBox = itemBboxForHarness(b.position!, b.asset!.dimensions!, Math.round(((b.rotation?.[1] ?? 0) * 180) / Math.PI))
      if (bboxesOverlapForHarness(aBox, bBox)) violations.push(`${a.id}<->${b.id}`)
    }
  }
  return {
    pass: violations.length === 0,
    type: 'geometry.noFurnitureOverlap',
    message: `no furniture overlap expected, violations: ${violations.length ? violations.join(', ') : 'none'}`,
  }
}

function assertValidation(
  assertion: Extract<HarnessAssertion, { type: 'validation' }>,
  validation: unknown,
): AssertionResult {
  if (!isRecord(validation)) {
    return { pass: false, type: 'validation', message: 'validation result was not an object' }
  }

  const failures: string[] = []
  if (assertion.valid !== undefined && validation.valid !== assertion.valid) {
    failures.push(`valid expected ${assertion.valid}, received ${String(validation.valid)}`)
  }
  if (assertion.blocking !== undefined && validation.blocking !== assertion.blocking) {
    failures.push(`blocking expected ${assertion.blocking}, received ${String(validation.blocking)}`)
  }
  if (
    assertion.fixedCount !== undefined &&
    !matchesCount(Number(validation.fixedCount ?? 0), normalizeCountExpectation(assertion.fixedCount))
  ) {
    failures.push(`fixedCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.fixedCount))}, received ${String(validation.fixedCount)}`)
  }
  if (
    assertion.warningCount !== undefined &&
    !matchesCount(Number(validation.warningCount ?? 0), normalizeCountExpectation(assertion.warningCount))
  ) {
    failures.push(`warningCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.warningCount))}, received ${String(validation.warningCount)}`)
  }
  if (
    assertion.blockingCount !== undefined &&
    !matchesCount(Number(validation.blockingCount ?? 0), normalizeCountExpectation(assertion.blockingCount))
  ) {
    failures.push(`blockingCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.blockingCount))}, received ${String(validation.blockingCount)}`)
  }
  if (assertion.codeProfile !== undefined && validation.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${String(validation.codeProfile)}`)
  }
  assertSummary('issueSummary', assertion.issueSummary, validation.issueSummary, failures)
  assertSummary('ruleSummary', assertion.ruleSummary, validation.ruleSummary, failures)

  const ruleIds = new Set<string>()
  if (isRecord(validation.ruleSummary)) {
    for (const ruleId of Object.keys(validation.ruleSummary)) ruleIds.add(ruleId)
  }
  if (Array.isArray(validation.issues)) {
    for (const issue of validation.issues) {
      if (isRecord(issue) && typeof issue.ruleId === 'string') ruleIds.add(issue.ruleId)
    }
  }

  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!ruleIds.has(ruleId)) failures.push(`ruleId ${ruleId} was not present`)
  }
  for (const ruleId of assertion.mustExcludeRuleIds ?? []) {
    if (ruleIds.has(ruleId)) failures.push(`ruleId ${ruleId} was present`)
  }

  return {
    pass: failures.length === 0,
    type: 'validation',
    message: failures.length === 0 ? 'validation matched expectations' : failures.join('; '),
  }
}

function assertValidationRepairHints(
  assertion: Extract<HarnessAssertion, { type: 'validation.repairHints' }>,
  validation: unknown,
): AssertionResult {
  if (!isRecord(validation) || !Array.isArray(validation.repairHints)) {
    return { pass: false, type: 'validation.repairHints', message: 'validation.repairHints was not an array' }
  }

  const failures: string[] = []
  const hints = validation.repairHints.filter(isRecord)
  const ruleIds = new Set(hints.map((hint) => hint.ruleId).filter((ruleId): ruleId is string => typeof ruleId === 'string'))
  const preferredTools = new Set<string>()
  for (const hint of hints) {
    if (!Array.isArray(hint.preferredTools)) continue
    for (const tool of hint.preferredTools) {
      if (typeof tool === 'string') preferredTools.add(tool)
    }
  }

  for (const ruleId of assertion.mustIncludeRuleIds) {
    if (!ruleIds.has(ruleId)) failures.push(`repairHints missing ruleId ${ruleId}`)
  }
  for (const tool of assertion.mustIncludePreferredTools ?? []) {
    if (!preferredTools.has(tool)) failures.push(`repairHints missing preferred tool ${tool}`)
  }

  return {
    pass: failures.length === 0,
    type: 'validation.repairHints',
    message: failures.length === 0 ? 'repair hints matched expectations' : failures.join('; '),
  }
}

function assertSummary(
  label: string,
  expected: Record<string, CountExpectation> | undefined,
  actual: unknown,
  failures: string[],
): void {
  if (!expected) return
  if (!isRecord(actual)) {
    failures.push(`${label} expected object, received ${typeof actual}`)
    return
  }

  for (const [key, countExpectation] of Object.entries(expected)) {
    const actualValue = Number(actual[key] ?? 0)
    const normalized = normalizeCountExpectation(countExpectation)
    if (!matchesCount(actualValue, normalized)) {
      failures.push(`${label}.${key} expected ${formatCountExpectation(normalized)}, received ${actualValue}`)
    }
  }
}

function matchesWhere(node: AnyNode, where: Record<string, JsonValue | FieldMatch>): boolean {
  for (const [fieldPath, expectation] of Object.entries(where)) {
    const actual = getByPath(node, fieldPath)
    if (!matchesExpectation(actual, expectation)) return false
  }
  return true
}

function matchesExpectation(actual: unknown, expectation: JsonValue | FieldMatch): boolean {
  if (isFieldMatch(expectation)) {
    if (expectation.exists !== undefined && (actual !== undefined) !== expectation.exists) return false
    if (expectation.notNull && actual == null) return false
    if (expectation.equals !== undefined && !deepEqual(actual, expectation.equals)) return false
    if (expectation.approx !== undefined) {
      if (typeof actual !== 'number') return false
      if (Math.abs(actual - expectation.approx) > (expectation.tolerance ?? 0.001)) return false
    }
    return true
  }
  return deepEqual(actual, expectation)
}

function isFieldMatch(value: unknown): value is FieldMatch {
  if (!isRecord(value)) return false
  return 'equals' in value || 'approx' in value || 'exists' in value || 'notNull' in value
}

function normalizeCountExpectation(expectation: CountExpectation): {
  exact?: number
  min?: number
  max?: number
} {
  return typeof expectation === 'number' ? { exact: expectation } : expectation
}

function matchesCount(
  actual: number,
  expectation: { exact?: number; min?: number; max?: number },
): boolean {
  if (expectation.exact !== undefined && actual !== expectation.exact) return false
  if (expectation.min !== undefined && actual < expectation.min) return false
  if (expectation.max !== undefined && actual > expectation.max) return false
  return true
}

function formatCountExpectation(expectation: { exact?: number; min?: number; max?: number }): string {
  if (expectation.exact !== undefined) return `exact ${expectation.exact}`
  const parts: string[] = []
  if (expectation.min !== undefined) parts.push(`min ${expectation.min}`)
  if (expectation.max !== undefined) parts.push(`max ${expectation.max}`)
  return parts.join(', ') || 'any'
}

function dist2D(a: [number, number], b: [number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
}

function pointInPolygon(x: number, z: number, polygon: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i]!
    const [xj, zj] = polygon[j]!
    const intersects = zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

function polygonsOverlap(a: [number, number][], b: [number, number][]): boolean {
  return a.some((point) => pointInPolygon(point[0], point[1], b)) ||
    b.some((point) => pointInPolygon(point[0], point[1], a))
}

function itemBboxForHarness(
  position: [number, number, number],
  dimensions: [number, number, number],
  rotationDeg: number,
): { minX: number; minZ: number; maxX: number; maxZ: number } {
  const rot = ((rotationDeg % 360) + 360) % 360
  const rotated = rot === 90 || rot === 270
  const width = rotated ? dimensions[2] : dimensions[0]
  const depth = rotated ? dimensions[0] : dimensions[2]
  return {
    minX: position[0] - width / 2,
    minZ: position[2] - depth / 2,
    maxX: position[0] + width / 2,
    maxZ: position[2] + depth / 2,
  }
}

function expandBboxForHarness(
  bbox: { minX: number; minZ: number; maxX: number; maxZ: number },
  amount: number,
): { minX: number; minZ: number; maxX: number; maxZ: number } {
  return {
    minX: bbox.minX - amount,
    minZ: bbox.minZ - amount,
    maxX: bbox.maxX + amount,
    maxZ: bbox.maxZ + amount,
  }
}

function bboxesOverlapForHarness(
  a: { minX: number; minZ: number; maxX: number; maxZ: number },
  b: { minX: number; minZ: number; maxX: number; maxZ: number },
): boolean {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ
}

function bboxCornersInsidePolygonForHarness(
  bbox: { minX: number; minZ: number; maxX: number; maxZ: number },
  polygon: [number, number][],
): boolean {
  return [
    [bbox.minX, bbox.minZ],
    [bbox.maxX, bbox.minZ],
    [bbox.maxX, bbox.maxZ],
    [bbox.minX, bbox.maxZ],
  ].every(([x, z]) => pointInPolygon(x!, z!, polygon))
}

function collectDoorInfos(
  walls: Array<AnyNode & { start?: [number, number]; end?: [number, number]; children?: string[] }>,
  nodes: Record<string, AnyNode>,
): Array<{ id: string; worldX: number; worldZ: number; width: number }> {
  const doors: Array<{ id: string; worldX: number; worldZ: number; width: number }> = []
  for (const wall of walls) {
    if (!wall.start || !wall.end) continue
    const len = dist2D(wall.start, wall.end)
    if (len < 0.001) continue
    const dirX = (wall.end[0] - wall.start[0]) / len
    const dirZ = (wall.end[1] - wall.start[1]) / len

    for (const childId of wall.children ?? []) {
      const child = nodes[childId]
      if (!isRecord(child) || child.type !== 'door') continue
      const position = child.position
      if (!Array.isArray(position) || typeof position[0] !== 'number') continue
      const width = typeof child.width === 'number' ? child.width : 0.9
      doors.push({
        id: String(child.id),
        worldX: wall.start[0] + dirX * position[0],
        worldZ: wall.start[1] + dirZ * position[0],
        width,
      })
    }
  }
  return doors
}

function itemRadius(item: AnyNode & { asset?: { size?: [number, number, number] }; scale?: [number, number, number] }): number {
  const size = item.asset?.size ?? [1, 1, 1]
  const scale = item.scale ?? [1, 1, 1]
  return Math.max(size[0] * scale[0], size[2] * scale[2]) / 2
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function summarizeResult(result: unknown): string {
  if (!isRecord(result)) return String(result)
  if (result.success === true) return 'success'
  if (typeof result.error === 'string') return `error: ${result.error}`
  return JSON.stringify(result).slice(0, 120)
}

function printCaseResult(result: CaseResult, verbose: boolean) {
  const icon = result.pass ? 'PASS' : 'FAIL'
  console.log(`${icon} ${result.name} (${result.durationMs}ms)`)
  if (!result.pass || verbose) {
    for (const assertion of result.assertions) {
      const assertionIcon = assertion.pass ? '  ✓' : '  ✗'
      console.log(`${assertionIcon} ${assertion.type}: ${assertion.message}`)
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
