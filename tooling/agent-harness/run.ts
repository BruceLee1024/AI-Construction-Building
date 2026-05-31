import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import useScene, { clearSceneHistory } from '@pascal-app/core'
import type { AnyNode } from '@pascal-app/core'
import { executeToolCall } from '../../packages/editor/src/lib/agent/executor'
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

const rootDir = path.resolve(fileURLToPath(new URL('../..', import.meta.url)))
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
      const args = step.args ?? {}
      const raw = executeToolCall(step.tool, args)
      const parsed = parseToolResult(raw)
      stepResults.push({ index, tool: step.tool, args, raw, parsed })
      if (verbose) console.log(`  step ${index}: ${step.tool} -> ${summarizeResult(parsed)}`)
    }

    validation = parseToolResult(executeToolCall('validate_scene', {}))

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
    case 'node.count':
      return assertNodeCount(assertion)
    case 'node.exists':
      return assertNodeExists(assertion)
    case 'geometry.closedWalls':
      return assertClosedWalls(assertion.tolerance ?? 0.001)
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

  return {
    pass: failures.length === 0,
    type: 'validation',
    message: failures.length === 0 ? 'validation matched expectations' : failures.join('; '),
  }
}

function matchesWhere(node: AnyNode, where: Record<string, JsonValue | FieldMatch>): boolean {
  for (const [fieldPath, expectation] of Object.entries(where)) {
    const actual = getByPath(node, fieldPath)
    if (isFieldMatch(expectation)) {
      if (expectation.exists !== undefined && (actual !== undefined) !== expectation.exists) return false
      if (expectation.notNull && actual == null) return false
      if (expectation.equals !== undefined && !deepEqual(actual, expectation.equals)) return false
      if (expectation.approx !== undefined) {
        if (typeof actual !== 'number') return false
        if (Math.abs(actual - expectation.approx) > (expectation.tolerance ?? 0.001)) return false
      }
    } else if (!deepEqual(actual, expectation)) {
      return false
    }
  }
  return true
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
