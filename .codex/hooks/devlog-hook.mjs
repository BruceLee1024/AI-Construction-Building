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
  const notes = collect(recent, "experienceNotes");
  const advice = collect(recent, "nextStepAdvice");
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
