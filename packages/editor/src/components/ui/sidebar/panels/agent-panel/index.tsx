'use client'

import {
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  Send,
  Settings,
  Trash2,
  Wrench,
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useT } from '../../../../../lib/i18n'
import { useAgent, type AIProvider, type ChatMessage } from '../../../../../store/use-agent'

const PROVIDERS: { id: AIProvider; label: string; placeholder: string }[] = [
  { id: 'deepseek', label: 'DeepSeek', placeholder: 'sk-...' },
  { id: 'openai', label: 'OpenAI', placeholder: 'sk-...' },
]

const QUICK_SUGGESTIONS = [
  '创建一个5m x 4m的房间',
  '创建两室一厅公寓',
  '创建L形客厅',
  '查看当前场景',
]

const TOOL_LABELS: Record<string, string> = {
  create_walls: '创建墙体',
  create_slab: '创建楼板',
  create_door: '添加门',
  create_window: '添加窗',
  create_room: '创建房间',
  create_apartment: '创建公寓',
  create_l_shaped_room: '创建L形房间',
  create_ceiling: '创建天花板',
  create_zone: '创建区域',
  create_roof: '创建屋顶',
  create_polygon_room: '创建多边形房间',
  modify_node: '修改节点',
  batch_modify_nodes: '批量修改',
  move_nodes: '移动节点',
  delete_node: '删除节点',
  delete_all_on_level: '清空楼层',
  get_scene_info: '获取场景',
  select_node: '选中节点',
  add_door_to_wall: '添加门',
  add_window_to_wall: '添加窗',
  place_furniture: '放置家具',
  furnish_room: '一键布置',
  create_hallway: '创建走廊',
  list_furniture: '家具目录',
  create_building_shell: '创建建筑',
  create_furnished_apartment: '带家具公寓',
  mirror_room: '镜像房间',
  undo: '撤销',
  redo: '重做',
  add_level: '添加楼层',
  switch_level: '切换楼层',
  delete_level: '删除楼层',
  rename_level: '重命名楼层',
  duplicate_level: '复制楼层',
  list_levels: '楼层列表',
  place_wall_item: '墙面挂件',
  place_ceiling_item: '天花板灯具',
}

// ── Lightweight Markdown renderer ──

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!

    // Code block toggle
    if (line.trimStart().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLines = []
        continue
      } else {
        inCodeBlock = false
        result.push(
          <pre
            key={`code-${i}`}
            className="my-1.5 overflow-x-auto rounded-md bg-background/80 p-2 font-mono text-xs leading-relaxed"
          >
            <code>{codeLines.join('\n')}</code>
          </pre>,
        )
        continue
      }
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Headers
    if (line.startsWith('### ')) {
      result.push(
        <p key={i} className="mt-2 mb-0.5 font-semibold text-xs">
          {renderInline(line.slice(4))}
        </p>,
      )
      continue
    }
    if (line.startsWith('## ')) {
      result.push(
        <p key={i} className="mt-2 mb-0.5 font-semibold text-sm">
          {renderInline(line.slice(3))}
        </p>,
      )
      continue
    }
    if (line.startsWith('# ')) {
      result.push(
        <p key={i} className="mt-2 mb-1 font-bold text-sm">
          {renderInline(line.slice(2))}
        </p>,
      )
      continue
    }

    // Unordered list
    if (/^[-*] /.test(line.trimStart())) {
      const indent = line.length - line.trimStart().length
      result.push(
        <div key={i} className="flex gap-1.5" style={{ paddingLeft: indent * 4 }}>
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
          <span>{renderInline(line.trimStart().slice(2))}</span>
        </div>,
      )
      continue
    }

    // Ordered list
    const olMatch = line.trimStart().match(/^(\d+)\.\s(.*)/)
    if (olMatch) {
      result.push(
        <div key={i} className="flex gap-1.5">
          <span className="shrink-0 text-foreground/50">{olMatch[1]}.</span>
          <span>{renderInline(olMatch[2]!)}</span>
        </div>,
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      result.push(<div key={i} className="h-1.5" />)
      continue
    }

    // Normal paragraph
    result.push(
      <p key={i}>{renderInline(line)}</p>,
    )
  }

  return result
}

function renderInline(text: string): React.ReactNode {
  // Process inline markdown: **bold**, *italic*, `code`, ~~strikethrough~~
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/)
    if (boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1])
      parts.push(<strong key={key++}>{boldMatch[2]}</strong>)
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic *text*
    const italicMatch = remaining.match(/^(.*?)\*(.+?)\*/)
    if (italicMatch) {
      if (italicMatch[1]) parts.push(italicMatch[1])
      parts.push(<em key={key++}>{italicMatch[2]}</em>)
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code `text`
    const codeMatch = remaining.match(/^(.*?)`(.+?)`/)
    if (codeMatch) {
      if (codeMatch[1]) parts.push(codeMatch[1])
      parts.push(
        <code key={key++} className="rounded bg-background/80 px-1 py-0.5 font-mono text-[11px]">
          {codeMatch[2]}
        </code>,
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // No more matches — push the rest
    parts.push(remaining)
    break
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}

// ── Tool call display ──

function ToolCallGroup({
  toolCalls,
  toolResults,
}: {
  toolCalls: NonNullable<ChatMessage['toolCalls']>
  toolResults: Map<string, string>
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border/40 bg-background/40">
      <button
        className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        )}
        <div className="flex flex-wrap items-center gap-1">
          {toolCalls.map((tc) => (
            <span
              key={tc.id}
              className="inline-flex items-center gap-1 rounded bg-violet-500/15 px-1.5 py-0.5 font-mono text-[10px] text-violet-400"
            >
              <Wrench className="h-2.5 w-2.5" />
              {TOOL_LABELS[tc.name] || tc.name}
            </span>
          ))}
        </div>
      </button>
      {expanded && (
        <div className="space-y-1.5 border-border/30 border-t px-2 py-1.5">
          {toolCalls.map((tc) => {
            const result = toolResults.get(tc.id)
            let parsedResult: Record<string, unknown> | null = null
            try {
              if (result) parsedResult = JSON.parse(result)
            } catch {}
            const isSuccess = parsedResult?.success === true

            return (
              <div key={tc.id} className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-violet-400">{tc.name}</span>
                  {parsedResult && (
                    <span
                      className={`rounded-sm px-1 py-px text-[9px] font-medium ${
                        isSuccess
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : 'bg-destructive/15 text-destructive'
                      }`}
                    >
                      {isSuccess ? 'OK' : 'Error'}
                    </span>
                  )}
                </div>
                <pre className="overflow-x-auto rounded bg-background/60 p-1.5 font-mono text-[10px] leading-snug text-muted-foreground">
                  {formatToolArgs(tc.arguments)}
                </pre>
                {result && (
                  <pre className="overflow-x-auto rounded bg-background/60 p-1.5 font-mono text-[10px] leading-snug text-muted-foreground">
                    {formatToolResult(result)}
                  </pre>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function formatToolArgs(argsStr: string): string {
  try {
    const obj = JSON.parse(argsStr)
    return JSON.stringify(obj, null, 2)
  } catch {
    return argsStr
  }
}

function formatToolResult(resultStr: string): string {
  try {
    const obj = JSON.parse(resultStr)
    // Compact important fields
    const { success, error, ...rest } = obj
    if (error) return `Error: ${error}`
    const keys = Object.keys(rest)
    if (keys.length === 0) return success ? 'Done' : resultStr
    return JSON.stringify(rest, null, 2)
  } catch {
    return resultStr
  }
}

// ── Copy button ──

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  return (
    <button
      className="rounded p-0.5 text-muted-foreground/50 opacity-0 transition-all hover:text-foreground group-hover:opacity-100"
      onClick={handleCopy}
      title="复制"
      type="button"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}

// ── Message bubble ──

function MessageBubble({
  msg,
  toolResults,
}: {
  msg: ChatMessage
  toolResults: Map<string, string>
}) {
  if (msg.role === 'tool') return null

  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground text-sm">
          {msg.content}
        </div>
      </div>
    )
  }

  // Assistant
  const isStreaming = msg.isLoading && !msg.toolCalls?.length
  const hasContent = !!(msg.content || isStreaming)
  const hasToolCalls = !!(msg.toolCalls && msg.toolCalls.length > 0)

  return (
    <div className="group flex gap-2">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
        <Bot className="h-3.5 w-3.5 text-violet-400" />
      </div>
      <div className="min-w-0 max-w-[88%] space-y-1.5">
        {hasToolCalls && (
          <ToolCallGroup toolCalls={msg.toolCalls!} toolResults={toolResults} />
        )}
        {hasContent && (
          <div className="relative rounded-2xl rounded-bl-md bg-accent/60 px-3 py-2 text-sm leading-relaxed">
            <div className="agent-markdown space-y-0.5">
              {renderMarkdown(msg.content)}
            </div>
            {isStreaming && (
              <span className="inline-block h-4 w-0.5 animate-pulse bg-foreground/60 align-text-bottom" />
            )}
            {!isStreaming && msg.content && (
              <div className="absolute top-1 right-1">
                <CopyButton text={msg.content} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex gap-2">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
        <Bot className="h-3.5 w-3.5 text-violet-400" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-accent/60 px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
      </div>
    </div>
  )
}

const stopEditorCapture = {
  onKeyDown: (e: React.KeyboardEvent) => e.stopPropagation(),
  onKeyUp: (e: React.KeyboardEvent) => e.stopPropagation(),
  onPaste: (e: React.ClipboardEvent) => e.stopPropagation(),
  onCopy: (e: React.ClipboardEvent) => e.stopPropagation(),
  onCut: (e: React.ClipboardEvent) => e.stopPropagation(),
}

function SettingsPanel() {
  const settings = useAgent((s) => s.settings)
  const setSettings = useAgent((s) => s.setSettings)
  const [showKey, setShowKey] = useState(false)

  const currentProvider = PROVIDERS.find((p) => p.id === settings.provider) || PROVIDERS[0]!

  return (
    <div className="space-y-3 border-border/50 border-b px-3 py-3">
      {/* Provider selector */}
      <div className="space-y-1.5">
        <label className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
          AI 供应商
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none rounded-md border border-border bg-background px-2.5 py-1.5 pr-7 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={(e) => setSettings({ provider: e.target.value as AIProvider })}
            value={settings.provider}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* API Key */}
      <div className="space-y-1.5">
        <label className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
          API Key
        </label>
        <div className="relative">
          <input
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 pr-8 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={(e) => setSettings({ apiKey: e.target.value })}
            placeholder={currentProvider.placeholder}
            type={showKey ? 'text' : 'password'}
            value={settings.apiKey}
            {...stopEditorCapture}
          />
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowKey(!showKey)}
            tabIndex={-1}
            type="button"
          >
            {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Model override (optional) */}
      <div className="space-y-1.5">
        <label className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
          模型 <span className="normal-case tracking-normal opacity-60">(可选)</span>
        </label>
        <input
          className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          onChange={(e) => setSettings({ model: e.target.value })}
          placeholder={settings.provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o'}
          type="text"
          value={settings.model}
          {...stopEditorCapture}
        />
      </div>

      {settings.apiKey && (
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          已配置 — {currentProvider.label}
        </div>
      )}
    </div>
  )
}

export function AgentPanel() {
  const t = useT()
  const messages = useAgent((s) => s.messages)
  const isLoading = useAgent((s) => s.isLoading)
  const error = useAgent((s) => s.error)
  const sendMessage = useAgent((s) => s.sendMessage)
  const clearMessages = useAgent((s) => s.clearMessages)
  const showSettings = useAgent((s) => s.showSettings)
  const setShowSettings = useAgent((s) => s.setShowSettings)
  const settings = useAgent((s) => s.settings)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Build a map of toolCallId → tool result content
  const toolResults = useMemo(() => {
    const map = new Map<string, string>()
    for (const msg of messages) {
      if (msg.role === 'tool' && msg.toolCallId) {
        map.set(msg.toolCallId, msg.content)
      }
    }
    return map
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Auto-show settings if no API key on mount
  useEffect(() => {
    if (!settings.apiKey) {
      setShowSettings(true)
    }
  }, [])

  const handleSubmit = useCallback(
    (text?: string) => {
      const trimmed = (text || input).trim()
      if (!trimmed || isLoading) return
      setInput('')
      sendMessage(trimmed)
    },
    [input, isLoading, sendMessage],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Filter visible messages (hide tool messages)
  const visibleMessages = messages.filter((m) => m.role !== 'tool')

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-border/50 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-violet-400" />
          <span className="font-medium text-sm">AI Agent</span>
          {settings.apiKey && (
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-500">
              {PROVIDERS.find((p) => p.id === settings.provider)?.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            className={`rounded-md p-1 transition-colors ${
              showSettings
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
            onClick={() => setShowSettings(!showSettings)}
            title="设置"
            type="button"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>
          {messages.length > 0 && (
            <button
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={clearMessages}
              title={t('common.delete')}
              type="button"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && <SettingsPanel />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3" ref={scrollRef}>
        {visibleMessages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
              <Bot className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <p className="font-medium text-sm">AI 建筑助手</p>
              <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                描述你想创建的建筑，我会帮你建模。
              </p>
              {!settings.apiKey && (
                <p className="mt-2 text-amber-500 text-xs">
                  请先点击 ⚙ 设置按钮配置 API Key
                </p>
              )}
            </div>
            {settings.apiKey && (
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    onClick={() => handleSubmit(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {visibleMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} toolResults={toolResults} />
        ))}

        {isLoading && !visibleMessages.some((m) => m.role === 'assistant' && m.isLoading) && (
          <LoadingDots />
        )}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-border/50 border-t p-2">
        <div className="flex items-end gap-2">
          <textarea
            className="max-h-24 min-h-[40px] flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation()
              handleKeyDown(e)
            }}
            onKeyUp={(e) => e.stopPropagation()}
            onPaste={(e) => e.stopPropagation()}
            onCopy={(e) => e.stopPropagation()}
            onCut={(e) => e.stopPropagation()}
            placeholder="描述你想建造的..."
            ref={inputRef}
            rows={1}
            value={input}
          />
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            disabled={!input.trim() || isLoading}
            onClick={() => handleSubmit()}
            type="button"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
