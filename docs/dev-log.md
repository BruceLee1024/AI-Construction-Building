# Development Log

## 2026-06-01 11:57 CST

### Completed

- Landed the furnishing solver line across commits `a1e76b4`, `9158fc8`, `a8ad3e2`, and `e2f0ad5`, adding layout suggestions, solved furniture placement, tighter spatial constraints, and door-clearance repair guidance for the editor agent workflow.
- Hardened agent execution in commits `9926cca` and `4b7e55d` so tool use is gated by scene phase rather than prompt drift alone. Hidden tools now return structured blocked results with allowed follow-up tools, validation rule IDs, repair hints, and explicit next actions.
- Added schema-based tool argument validation in [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts) and mirrored that behavior in the harness so malformed calls fail deterministically before scene mutation.
- Expanded harness coverage in [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts), and the new cases `agent-tool-gate-blocked.json` and `agent-tool-args-validation.json` to assert runtime gating and argument validation as behavior contracts.
- Improved the development-log hook in [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/.codex/hooks/devlog-hook.mjs`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/.codex/hooks/devlog-hook.mjs) so stop-time summaries synthesize changed files, command classes, and hook/artifact risks instead of echoing raw tool events.
- Current uncommitted work also updates [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts) to return structured failures for unknown tools and runtime exceptions, keeping agent retries on the staged-tool path.

### Lessons Learned

- Furniture automation became more reliable once placement moved from generic `place_furniture` calls to a dedicated solved-placement path with stricter spatial constraints and repair-aware follow-ups.
- Agent safety needs two independent guards: exposure control decides whether a tool is legal in the current phase, and schema validation decides whether the supplied arguments are executable.
- Harness assertions are most valuable when they check user-visible orchestration behavior such as blocked phases, allowed next tools, and actionable argument errors, not only scene geometry outputs.
- Development logging quality improved once synthesis used changed-file context and stop-time analysis; raw tool records alone were not enough to produce useful lessons or follow-up advice.

### Risks And Follow-Ups

- The working tree still contains uncommitted changes in the hook, executor, agent store, harness source, generated bundle, and two new harness fixtures; this work should be validated and committed as one orchestration-focused unit.
- [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs) changed alongside source files, so the generated artifact needs an explicit keep-or-regenerate decision before review.
- Schema validation currently supports the JSON-schema features used by the present tool set; adding richer schemas later will require extending the local validator to avoid false confidence.
- The new blocked-result and invalid-argument payloads should be covered by a focused harness run before they are treated as stable agent contracts.

### Source

- Recent commits reviewed: `4b7e55d` "Restrict agent tool exposure by scene phase", `9926cca` "Harden agent tool orchestration and harness cases", `e2f0ad5` "Enhance furniture spatial solver and constraints", `e5d7098` "Add repair hint coverage for door clearance", `a8ad3e2` "Implement furniture placement solver and integrate it into furnishing", `9158fc8` "Prioritize furniture solver tools in agent prompt", `a1e76b4` "Add furniture layout solver and placement suggestions".
- Current uncommitted files reviewed: [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/.codex/hooks/devlog-hook.mjs`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/.codex/hooks/devlog-hook.mjs), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/cases/agent-tool-args-validation.json`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/cases/agent-tool-args-validation.json), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/cases/agent-tool-gate-blocked.json`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/cases/agent-tool-gate-blocked.json), and [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs).

## 2026-05-31 23:56 CST

### Completed

- Landed China residential validation coverage in [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts) through commits `02770c5` and `5c466bd`, including daylight, ventilation, opening spacing, fall-protection, and room-type-aware checks.
- Extended the agent harness in commit `3d9e2d9` to validate building-constraint outcomes, adding new assertions and regression cases in [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts) and [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts).
- Added committed China-specific harness fixtures under [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/cases`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/cases), including `china-residential-compliant.json` and multiple negative validation cases from commit `5c466bd`.
- Current uncommitted work expands agent feedback and gating: [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts) now returns `createdNodeIds`, `createdByType`, spatial context, candidate walls, and `suggestedNextTools`; [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts) adds structured `repairHints`; and new harness cases cover apartment context, China policy routing, and repair-based deferral.

### Lessons Learned

- Validation logic is shifting from a final audit to a staged control surface: the latest diffs tie blocking rule IDs and repair hints directly to agent deferral paths instead of treating warnings as passive output.
- Harness value increased once it started asserting behavior contracts such as policy selection, suggested next tools, and repair guidance, not just node counts or geometry existence.
- Room metadata is now central to code-profile behavior; the committed China rules and pending zone/scene introspection changes both depend on carrying `roomType` and spatial context through the agent loop.

### Risks And Follow-Ups

- The working tree is ahead of `HEAD` in seven tracked files plus three new harness cases; none of the pending changes are committed yet, so the new structured outputs and repair-hint flows still need a commit boundary and verification run.
- [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/artifacts/agent-harness/.bundle/run.mjs) is modified alongside source changes. Rebuild or re-sync the bundle before relying on harness output.
- The pending deferral logic depends on manual rule-to-tool mappings in `repairHintForIssue`; adding new validator rule IDs without updating that mapping will weaken the agent’s suggested remediation path.

### Source

- Recent commits reviewed: `5c466bd` "Add China residential validation guards", `02770c5` "Add china residential code constraints", `3d9e2d9` "Enhance agent harness with building constraint validation", plus `43200ff`, `722ad38`, `85263d2`, `3566c24`.
- Current uncommitted files reviewed: [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/executor.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/spatial-validator.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/tools.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/lib/agent/tools.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/packages/editor/src/store/use-agent.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/run.ts), [`/Volumes/Bruce/AI Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts`](/Volumes/Bruce/AI%20Dev/Projects_2026/editor-main/tooling/agent-harness/schema.ts), and the new case files `agent-apartment-context-suggestions.json`, `agent-policy-china-residential.json`, `agent-repair-deferral-hints.json`.

## 2026-05-31 23:46 CST

### Completed

- Added and iterated on staged validation for agent-generated scenes, including validation gates before post-layout work.
- Added China residential validation support and policy routing so Chinese residential prompts select a dedicated code profile.
- Expanded the agent harness with building-constraint assertions, policy assertions, deferral assertions, suggested-next-tool checks, and repair-hint validation.
- Improved agent tool outputs with created node IDs, created-by-type groupings, spatial context, usable bounds, candidate walls, and suggested follow-up tools.
- Enhanced scene introspection with architectural summaries, room metadata, opening counts, exterior wall candidates, and code-sensitive next-tool suggestions.
- Added repair hints to validation reports so blocking warnings can be turned into concrete next actions and preferred tools.

### Lessons Learned

- Agent tools need structured return payloads, not just success flags. Created IDs, spatial bounds, candidate walls, and suggested next tools give the next agent step enough context to avoid guessing.
- Validation works better as a staged control loop than as a final audit. Blocking warnings should directly affect the allowed tool set for the next generation phase.
- Building-code support needs policy detection close to the agent loop. Prompt-level signals such as Chinese residential terms, furnishing intent, complexity, and rapid-concept language are useful for choosing code profile and phase.
- Repair guidance should be machine-readable. Rule IDs plus preferred tools make it easier for the agent harness and the live agent to share the same remediation model.
- Harness coverage is most valuable when it checks behavior contracts, not only geometry counts. Policy selection, deferral decisions, and suggested actions are part of the agent's observable behavior.

### Risks And Follow-Ups

- The current working tree still has uncommitted changes in agent executor, validation, agent store, and harness files; run the focused harness cases before committing.
- Policy detection is regex-based and may need false-positive/false-negative tuning as prompt coverage grows.
- Repair hints currently map common validation rules manually; keep the hint table aligned with any new validation rule IDs.
- Confirm that structured validation messages remain concise enough for model context while still preserving the actionable fields needed by later phases.

### Source

- Git commits from the last 24 hours: `3566c24`, `85263d2`, `722ad38`, `43200ff`, `f7550ac`, `3d9e2d9`, `02770c5`, `5c466bd`.
- Uncommitted files reviewed: `packages/editor/src/lib/agent/executor.ts`, `packages/editor/src/lib/agent/spatial-validator.ts`, `packages/editor/src/lib/agent/tools.ts`, `packages/editor/src/store/use-agent.ts`, `tooling/agent-harness/run.ts`, `tooling/agent-harness/schema.ts`, `tooling/agent-harness/cases/agent-policy-china-residential.json`.
