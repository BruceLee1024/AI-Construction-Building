#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const event = process.env.CODEX_HOOK_EVENT || process.argv[2] || "Unknown";
const now = new Date();
const input = readStdin();
const payload = parseJson(input);
const repoRoot = git(["rev-parse", "--show-toplevel"]) || process.cwd();
const logDir = path.join(repoRoot, ".codex", "devlog");
const date = localDate(now);
const jsonlPath = path.join(logDir, `${date}.jsonl`);
const markdownPath = path.join(logDir, `${date}.md`);
const statePath = path.join(logDir, ".session-state.json");

fs.mkdirSync(logDir, { recursive: true });

const record = sanitizeRecord(buildRecord());
appendJsonl(jsonlPath, record);

if (["Stop", "PreCompact", "PostCompact"].includes(event)) {
  const records = readRecords(jsonlPath);
  writeMarkdown(markdownPath, records);
}

if (["SessionStart", "PreCompact", "PostCompact", "Stop"].includes(event)) {
  writeState(statePath, record);
}

function buildRecord() {
  const toolName = firstString(
    payload.toolName,
    payload.tool_name,
    payload.name,
    payload.tool?.name,
  );
  const status = firstString(
    payload.status,
    payload.result?.status,
    payload.toolResponse?.status,
    payload.response?.status,
  );
  const branch = git(["branch", "--show-current"]) || "detached";
  const head = git(["rev-parse", "--short", "HEAD"]) || "unknown";
  const changedFiles = changedFileSummary();
  const facts = [];
  const experienceNotes = [];
  const nextStepAdvice = [];

  switch (event) {
    case "SessionStart":
      facts.push(`Session opened on branch ${branch} at ${now.toISOString()}.`);
      facts.push(`Starting HEAD: ${head}.`);
      facts.push(changedFiles.fact);
      experienceNotes.push(
        "Keep objective events in facts; save interpretation for end-of-session synthesis.",
      );
      nextStepAdvice.push(
        "At Stop, review changed files and command outcomes before choosing the next smallest task.",
      );
      break;
    case "PostToolUse":
      facts.push(`Tool used: ${toolName || "unknown"}.`);
      if (status) facts.push(`Tool status: ${status}.`);
      const toolFact = summarizeToolUse(toolName, payload);
      if (toolFact) facts.push(toolFact);
      facts.push(changedFiles.fact);
      break;
    case "PreCompact":
      facts.push("Context compaction is about to run.");
      facts.push(changedFiles.fact);
      experienceNotes.push(
        "Only durable facts should be trusted after compaction; keep unresolved assumptions explicit.",
      );
      nextStepAdvice.push(
        "After compaction, compare the preserved state with current git status before continuing.",
      );
      break;
    case "PostCompact":
      facts.push("Context compaction completed.");
      facts.push(changedFiles.fact);
      experienceNotes.push(
        "Compacted context may omit exploratory dead ends; rely on local files and tests for evidence.",
      );
      nextStepAdvice.push(
        "Re-open the latest markdown handoff and verify any pending advice against the current tree.",
      );
      break;
    case "Stop":
      facts.push(`Session stopped on branch ${branch}.`);
      facts.push(`Ending HEAD: ${head}.`);
      facts.push(changedFiles.fact);
      experienceNotes.push(
        "Convert repeated tool observations into lessons only when the record contains supporting facts.",
      );
      nextStepAdvice.push(
        "Start the next session from the open risks, failed checks, or smallest unverified change.",
      );
      break;
    default:
      facts.push(`Hook event observed: ${event}.`);
      facts.push(changedFiles.fact);
  }

  return {
    ts: now.toISOString(),
    event,
    branch,
    head,
    facts,
    experienceNotes,
    nextStepAdvice,
    meta: {
      toolName: toolName || null,
      status: status || null,
      changedFiles: changedFiles.files,
      changedFileCount: changedFiles.files.length,
    },
  };
}

function summarizeToolUse(toolName, value) {
  const name = String(toolName || "").toLowerCase();
  if (name.includes("bash")) {
    const command = firstString(
      value.command,
      value.input?.command,
      value.toolInput?.command,
      value.tool_input?.command,
    );
    return `Command class: ${classifyCommand(command)}.`;
  }
  const filePath = firstString(
    value.file_path,
    value.filePath,
    value.path,
    value.input?.file_path,
    value.input?.filePath,
    value.toolInput?.file_path,
    value.toolInput?.filePath,
  );
  if (filePath) {
    return `File touched or inspected: ${safeRelativePath(filePath)}.`;
  }
  const query = firstString(value.query, value.pattern, value.input?.query, value.input?.pattern);
  if (query) {
    return `Search-like operation ran with query category: ${classifyQuery(query)}.`;
  }
  return "";
}

function changedFileSummary() {
  const output = gitRaw(["status", "--short"]).trimEnd();
  const files = output
    ? output
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => parseStatusPath(line))
        .filter((file) => !file.startsWith(".codex/devlog/"))
        .slice(0, 30)
    : [];
  if (files.length === 0) {
    return { fact: "Working tree has no changed files visible to git.", files };
  }
  const extra = output.split("\n").filter(Boolean).length - files.length;
  const suffix = extra > 0 ? ` plus ${extra} more` : "";
  return {
    fact: `Working tree has ${files.length}${suffix} changed file(s): ${files.join(", ")}.`,
    files,
  };
}

function parseStatusPath(line) {
  const rawPath = line.length >= 4 ? line.slice(3).trim() : line.trim();
  const renamedPath = rawPath.includes(" -> ") ? rawPath.split(" -> ").at(-1) : rawPath;
  return safeRelativePath(renamedPath || rawPath || line);
}

function writeMarkdown(file, records) {
  const recent = records.slice(-80);
  const facts = collect(recent, "facts");
  const summary = analyzeSession(recent);
  const notes = mergeUnique(summary.experienceNotes, filterTemplateGuidance(collect(recent, "experienceNotes")));
  const advice = mergeUnique(summary.nextStepAdvice, filterTemplateGuidance(collect(recent, "nextStepAdvice")));
  const toolCounts = countBy(
    recent.map((record) => record.meta?.toolName).filter(Boolean),
  );
  const latest = recent.at(-1);
  const lines = [
    `# Codex Development Log - ${date}`,
    "",
    "Local, privacy-preserving handoff generated from Codex hook records.",
    "",
    "## Facts",
    ...bulletList([
      `Latest event: ${latest?.event || "unknown"} at ${latest?.ts || now.toISOString()}.`,
      latest?.branch ? `Branch: ${latest.branch}.` : "",
      latest?.head ? `HEAD: ${latest.head}.` : "",
      ...facts,
      Object.keys(toolCounts).length
        ? `Tool observations: ${Object.entries(toolCounts)
            .map(([name, count]) => `${name} x${count}`)
            .join(", ")}.`
        : "",
    ]),
    "",
    "## Experience Notes",
    ...bulletList(notes),
    "",
    "## Next-Step Advice",
    ...bulletList(advice),
    "",
    "## Local Files",
    ...bulletList([
      `Raw event stream: ${safeRelativePath(jsonlPath)}.`,
      `Compaction/session state: ${safeRelativePath(statePath)}.`,
    ]),
    "",
  ];
  fs.writeFileSync(file, lines.join("\n"));
}

function analyzeSession(records) {
  const toolNames = records.map((record) => record.meta?.toolName).filter(Boolean);
  const toolCounts = countBy(toolNames);
  const commandClasses = collectCommandClasses(records);
  const files = latestChangedFiles(records);
  const fileGroups = groupFiles(files);
  const stopCount = records.filter((record) => record.event === "Stop").length;
  const notes = [];
  const advice = [];

  if (toolCounts.apply_patch || toolCounts.Edit || toolCounts.MultiEdit || toolCounts.Write) {
    notes.push(
      "This session involved code edits; the durable lesson should be tied to changed files and verification evidence, not only to tool activity.",
    );
  }
  if ((toolCounts.Bash || 0) >= 3 && commandClasses.includes("inspect")) {
    notes.push(
      "Repeated inspection commands indicate the useful context was in the existing repository structure; future sessions should start by reading the touched modules and nearby tests before editing.",
    );
  }
  if (commandClasses.includes("test")) {
    notes.push(
      "Tests or harness commands were part of the loop, so the strongest facts are the final changed-file set plus the last verification result recorded around the stop point.",
    );
  } else if (files.length > 0) {
    notes.push(
      "Changed files were recorded without a test-class command in the recent log window; treat the handoff as implementation progress until verification is run.",
    );
  }
  if (fileGroups.length > 1) {
    notes.push(
      `The work crossed ${fileGroups.length} areas (${fileGroups.join(", ")}), which raises integration risk compared with a single-file change.`,
    );
  }
  if (files.some((file) => file.includes("/cases/") || file.endsWith(".json"))) {
    notes.push(
      "Fixture or case-file changes appeared alongside source edits; keep those examples aligned with the behavior contract they are meant to prove.",
    );
  }
  if (files.some((file) => file.includes("artifacts/") || file.includes("[HIDDEN]"))) {
    notes.push(
      "Generated artifacts changed during the session; confirm whether they are expected outputs before committing them.",
    );
  }
  if (files.some((file) => file.startsWith(".codex/hooks/"))) {
    notes.push(
      "Hook workflow changes need verification at the generated handoff level, because a syntactically valid hook can still produce low-value summaries.",
    );
  }
  if (files.includes(".codex/hooks/devlog-hook.mjs")) {
    notes.push(
      "Development-log quality depends on the synthesis step, not just event capture; raw PostToolUse facts need a Stop-time analysis pass to become useful lessons.",
    );
  }
  if (stopCount > 1) {
    notes.push(
      "Multiple stop summaries occurred in one day, so the latest Markdown handoff should be read as an accumulated session log rather than a single atomic task summary.",
    );
  }

  if (files.length > 0) {
    advice.push(`Review the final changed-file set before the next edit: ${files.slice(0, 8).join(", ")}.`);
  }
  if (commandClasses.includes("test")) {
    advice.push(
      "Preserve the last successful test or harness command in the human handoff if the change is committed.",
    );
  } else {
    advice.push(
      "Run the smallest relevant test, typecheck, or harness command before treating this session as complete.",
    );
  }
  if (files.some((file) => file.includes("/cases/") || file.endsWith(".json"))) {
    advice.push(
      "When adding or changing fixtures, run the focused harness case that exercises each fixture before broad regression checks.",
    );
  }
  if (files.some((file) => file.includes("artifacts/"))) {
    advice.push(
      "Decide whether generated artifact changes should be committed, regenerated, or ignored before opening a PR.",
    );
  }
  if (fileGroups.includes("hooks")) {
    advice.push(
      "After changing Codex hooks, trigger a local lifecycle event and inspect `.codex/devlog/YYYY-MM-DD.md` for the expected three-section handoff.",
    );
  }

  return {
    experienceNotes: notes,
    nextStepAdvice: advice,
  };
}

function collectCommandClasses(records) {
  const classes = [];
  for (const fact of collect(records, "facts")) {
    const match = fact.match(/^Command class: ([^.]+)\./);
    if (match) classes.push(match[1]);
  }
  return [...new Set(classes)];
}

function latestChangedFiles(records) {
  for (const record of [...records].reverse()) {
    const files = record.meta?.changedFiles;
    if (Array.isArray(files) && files.length > 0) return files;
  }
  return [];
}

function groupFiles(files) {
  const groups = new Set();
  for (const file of files) {
    if (file.startsWith(".codex/")) groups.add("hooks");
    else if (file.startsWith("apps/")) groups.add("apps");
    else if (file.startsWith("packages/")) groups.add("packages");
    else if (file.startsWith("tooling/")) groups.add("tooling");
    else if (file.startsWith("artifacts/")) groups.add("artifacts");
    else if (file.startsWith("docs/")) groups.add("docs");
    else groups.add("root");
  }
  return [...groups];
}

function mergeUnique(...lists) {
  const seen = new Set();
  const merged = [];
  for (const list of lists) {
    for (const item of list || []) {
      const clean = String(item || "").trim();
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      merged.push(clean);
    }
  }
  return merged.slice(0, 18);
}

function filterTemplateGuidance(items) {
  const blocked = new Set([
    "Keep objective events in facts; save interpretation for end-of-session synthesis.",
    "Convert repeated tool observations into lessons only when the record contains supporting facts.",
    "At Stop, review changed files and command outcomes before choosing the next smallest task.",
    "Start the next session from the open risks, failed checks, or smallest unverified change.",
  ]);
  return items.filter((item) => !blocked.has(item));
}

function writeState(file, record) {
  const state = {
    updatedAt: now.toISOString(),
    latestEvent: record.event,
    branch: record.branch,
    head: record.head,
    facts: record.facts.slice(-8),
    experienceNotes: record.experienceNotes.slice(-8),
    nextStepAdvice: record.nextStepAdvice.slice(-8),
    changedFiles: record.meta.changedFiles,
  };
  fs.writeFileSync(file, `${JSON.stringify(state, null, 2)}\n`);
}

function appendJsonl(file, record) {
  fs.appendFileSync(file, `${JSON.stringify(record)}\n`);
}

function readRecords(file) {
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => parseJson(line))
    .filter((record) => record && typeof record === "object");
}

function collect(records, key) {
  const seen = new Set();
  const values = [];
  for (const record of records) {
    for (const value of record[key] || []) {
      const clean = String(value).trim();
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      values.push(clean);
    }
  }
  return values.slice(-18);
}

function bulletList(items) {
  const clean = items.map((item) => String(item || "").trim()).filter(Boolean);
  return clean.length ? clean.map((item) => `- ${item}`) : ["- No entries recorded yet."];
}

function countBy(values) {
  return values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function sanitizeRecord(record) {
  return JSON.parse(sanitizeString(JSON.stringify(record)));
}

function sanitizeString(text) {
  return String(text)
    .replace(/\b(sk|rk|pk|sess|ghp|github_pat|glpat)-[A-Za-z0-9_./+=-]{12,}\b/g, "[REDACTED_TOKEN]")
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "[REDACTED_EMAIL]")
    .replace(/https?:\/\/[^\s"')]+/g, "[REDACTED_URL]")
    .replace(/(api[_-]?key|token|secret|password|passwd|authorization)(["':=\s]+)[^"',\s}]+/gi, "$1$2[REDACTED_SECRET]")
    .replace(new RegExp(escapeRegex(repoRoot), "g"), "[REPO]");
}

function classifyCommand(command) {
  const clean = String(command || "").trim();
  if (!clean) return "unknown";
  const first = clean.split(/\s+/)[0];
  const groups = [
    ["test", /^(bun|npm|pnpm|yarn|turbo|vitest|jest|pytest|go|cargo|mvn|gradle|make)$/],
    ["git", /^git$/],
    ["search", /^(rg|grep|find|fd)$/],
    ["inspect", /^(sed|cat|less|head|tail|ls|pwd|wc|nl)$/],
    ["format-or-lint", /^(biome|eslint|prettier|ruff|black|deno)$/],
    ["runtime", /^(node|python3?|ruby|tsx|ts-node)$/],
  ];
  for (const [label, pattern] of groups) {
    if (pattern.test(first)) return label;
  }
  return "other";
}

function classifyQuery(query) {
  const clean = String(query || "");
  if (clean.length === 0) return "empty";
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(clean)) return "contains-redacted-email";
  if (/https?:\/\//i.test(clean)) return "contains-redacted-url";
  if (clean.length > 80) return "long-query";
  return "short-query";
}

function safeRelativePath(value) {
  const raw = sanitizeString(String(value || ""));
  const normalized = raw.replaceAll("\\", "/");
  if (normalized.includes("[REPO]")) return normalized.replace("[REPO]/", "");
  if (path.isAbsolute(normalized)) return "[ABSOLUTE_PATH]";
  if (/^\.[A-Za-z0-9._-]+$/.test(normalized)) return normalized;
  if (normalized.startsWith(".codex/")) return normalized;
  return normalized
    .replace(/(^|\/)\.[^/\s]+(?=\/)/g, "$1[HIDDEN]")
    .replace(/[^A-Za-z0-9._/\-[\] ?]/g, "_");
}

function git(args) {
  return gitRaw(args).trim();
}

function gitRaw(args) {
  const result = spawnSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (result.status !== 0) return "";
  return result.stdout;
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function parseJson(text) {
  if (!text || !String(text).trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function localDate(value) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
