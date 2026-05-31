# Development Log

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
