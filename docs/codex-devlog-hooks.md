# Codex Development Log Hooks

This repo-local workflow turns Codex sessions into a local development log with
three stable categories:

- Facts: objective events such as the branch, HEAD, files changed, tools used,
  command class, and compaction events.
- Experience notes: lessons learned, tradeoffs, and constraints that should
  influence future work.
- Next-step advice: small follow-up tasks, verification reminders, and handoff
  recommendations.

The generated logs live under `.codex/devlog/` and are ignored by git. Commit
the hook configuration and runner, but keep generated session records local
unless a human reviews and intentionally publishes a sanitized summary.

## Hook Mapping

| Event | Responsibility | Output |
| --- | --- | --- |
| `SessionStart` | Open or create the day's log; record branch, HEAD, timestamp, and starting working-tree state. | JSONL record plus `.session-state.json`. |
| `PostToolUse` | Append factual observations after edits, searches, commands, and tests. | JSONL record with sanitized tool facts. |
| `Stop` | Synthesize the local handoff into facts, experience notes, and next-step advice. | JSONL record plus `YYYY-MM-DD.md`. |
| `PreCompact` | Preserve compact session state before context reduction. | JSONL record, markdown handoff, and `.session-state.json`. |
| `PostCompact` | Record what survived compaction and remind the next session to verify against local files. | JSONL record, markdown handoff, and `.session-state.json`. |

## Files

- `.codex/hooks.json`: Codex hook configuration.
- `.codex/hooks/devlog-hook.mjs`: deterministic local runner shared by all
  hook events.
- `.codex/devlog/YYYY-MM-DD.jsonl`: raw sanitized event stream, ignored by git.
- `.codex/devlog/YYYY-MM-DD.md`: generated handoff, ignored by git.
- `.codex/devlog/.session-state.json`: compact local state, ignored by git.

## Privacy Defaults

The runner avoids storing raw prompts, raw shell commands, command output, URLs,
email addresses, obvious tokens, API keys, passwords, and absolute repository
paths. For shell commands it stores a command class such as `test`, `git`,
`search`, `inspect`, or `format-or-lint` instead of the command itself.

Generated files are local by default via `.codex/devlog/.gitignore`. If your
repository already tracks `.codex/`, keep this ignore file or add equivalent
rules to the root `.gitignore`.

## Adaptation

1. Copy `.codex/hooks.json` and `.codex/hooks/devlog-hook.mjs` into a repository.
2. Adjust the `PostToolUse.matcher` list if your Codex tool names differ.
3. Add project-specific redaction rules in `sanitizeString`.
4. Run Codex from any subdirectory; the commands resolve hook paths through
   `git rev-parse --show-toplevel`.
5. Review and trust hooks with `/hooks` before relying on them.

Codex hook configuration follows the documented three-level shape: event,
matcher group, and command handler. See the official hooks docs:
https://developers.openai.com/codex/hooks
