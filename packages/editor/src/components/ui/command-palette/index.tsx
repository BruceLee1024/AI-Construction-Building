'use client'

import type { AnyNodeId } from '@pascal-app/core'
import { emitter, LevelNode, useScene } from '@pascal-app/core'
import { useViewer } from '@pascal-app/viewer'
import { Command } from 'cmdk'
import {
  AppWindow,
  ArrowRight,
  Box,
  Building2,
  Camera,
  ChevronRight,
  Copy,
  DoorOpen,
  Eye,
  EyeOff,
  FileJson,
  Grid3X3,
  Hexagon,
  Layers,
  Map,
  Maximize2,
  Minimize2,
  Moon,
  MousePointer2,
  Package,
  PencilLine,
  Plus,
  Redo2,
  Search,
  Square,
  SquareStack,
  Sun,
  Trash2,
  Undo2,
  Video,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import { useT } from './../../../lib/i18n'
import { Dialog, DialogContent } from './../../../components/ui/primitives/dialog'
import type { StructureTool } from './../../../store/use-editor'
import useEditor from './../../../store/use-editor'

// ---------------------------------------------------------------------------
// Open-state store — imported by icon-rail to trigger the palette
// ---------------------------------------------------------------------------
interface CommandPaletteStore {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCommandPalette = create<CommandPaletteStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function Shortcut({ keys }: { keys: string[] }) {
  return (
    <span className="ml-auto flex shrink-0 items-center gap-0.5">
      {keys.map((k) => (
        <kbd
          className="flex min-w-4.5 items-center justify-center rounded border border-border/60 bg-muted/60 px-1 py-0.5 text-[10px] text-muted-foreground leading-none"
          key={k}
        >
          {k}
        </kbd>
      ))}
    </span>
  )
}

function Item({
  icon,
  label,
  onSelect,
  shortcut,
  disabled = false,
  keywords = [],
  badge,
  navigate = false,
}: {
  icon: React.ReactNode
  label: string
  onSelect: () => void
  shortcut?: string[]
  disabled?: boolean
  keywords?: string[]
  badge?: string
  navigate?: boolean
}) {
  return (
    <Command.Item
      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-foreground text-sm transition-colors data-[disabled=true]:cursor-not-allowed data-[selected=true]:bg-accent data-[disabled=true]:opacity-40"
      disabled={disabled}
      keywords={keywords}
      onSelect={onSelect}
      value={label}
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
          {badge}
        </span>
      )}
      {shortcut && <Shortcut keys={shortcut} />}
      {(badge || navigate) && <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
    </Command.Item>
  )
}

function OptionItem({
  label,
  isActive = false,
  onSelect,
  icon,
  disabled = false,
}: {
  label: string
  isActive?: boolean
  onSelect: () => void
  icon?: React.ReactNode
  disabled?: boolean
}) {
  return (
    <Command.Item
      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-foreground text-sm transition-colors data-[disabled=true]:cursor-not-allowed data-[selected=true]:bg-accent data-[disabled=true]:opacity-40"
      disabled={disabled}
      onSelect={onSelect}
      value={label}
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
        {isActive ? <div className="h-1.5 w-1.5 rounded-full bg-primary" /> : icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
    </Command.Item>
  )
}

// ---------------------------------------------------------------------------
// Sub-page label map
// ---------------------------------------------------------------------------
const PAGE_LABEL_KEY: Record<string, string> = {
  'wall-mode': 'cmd.wallMode',
  'level-mode': 'cmd.levelMode',
  'rename-level': 'cmd.renameLevel',
  'goto-level': 'cmd.goToLevel',
  'camera-view': 'cmd.cameraSnapshot',
  'camera-scope': '', // dynamic — overridden in breadcrumb
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function CommandPalette() {
  const { open, setOpen } = useCommandPalette()
  const [meta, setMeta] = useState('⌘')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pages, setPages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [cameraScope, setCameraScope] = useState<{ nodeId: string; label: string } | null>(null)

  const page = pages[pages.length - 1]

  const t = useT()
  const { setPhase, setMode, setTool, setStructureLayer, isPreviewMode, setPreviewMode } =
    useEditor()

  const cameraMode = useViewer((s) => s.cameraMode)
  const setCameraMode = useViewer((s) => s.setCameraMode)
  const levelMode = useViewer((s) => s.levelMode)
  const setLevelMode = useViewer((s) => s.setLevelMode)
  const wallMode = useViewer((s) => s.wallMode)
  const setWallMode = useViewer((s) => s.setWallMode)
  const theme = useViewer((s) => s.theme)
  const setTheme = useViewer((s) => s.setTheme)
  const selection = useViewer((s) => s.selection)
  const exportScene = useViewer((s) => s.exportScene)

  const activeLevelId = selection.levelId
  const activeLevelNode = useScene((s) => (activeLevelId ? s.nodes[activeLevelId] : null))
  const isLevelZero =
    activeLevelNode?.type === 'level' && (activeLevelNode as LevelNode).level === 0

  // Reactive snapshot status for the selected camera scope
  const cameraScopeNode = useScene((s) =>
    cameraScope ? s.nodes[cameraScope.nodeId as AnyNodeId] : null,
  )
  const hasScopeSnapshot = !!(cameraScopeNode as any)?.camera

  const allLevels = useScene(
    useShallow((s) =>
      (Object.values(s.nodes).filter((n) => n.type === 'level') as LevelNode[]).sort(
        (a, b) => a.level - b.level,
      ),
    ),
  )

  const hasSelection = selection.selectedIds.length > 0

  // Platform detection
  useEffect(() => {
    setMeta(/Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘' : 'Ctrl')
  }, [])

  // Fullscreen tracking
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Cmd/Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setOpen])

  // Reset sub-pages when palette closes
  useEffect(() => {
    if (!open) {
      setPages([])
      setInputValue('')
      setCameraScope(null)
    }
  }, [open])

  // ---------------------------------------------------------------------------
  // Navigation helpers
  // ---------------------------------------------------------------------------
  const goBack = () => {
    const leavingPage = pages[pages.length - 1]
    if (leavingPage === 'camera-scope') setCameraScope(null)
    setPages((p) => p.slice(0, -1))
    setInputValue('')
  }

  const navigateTo = (p: string) => {
    // Pre-fill the rename input with the current level name
    if (p === 'rename-level' && activeLevelId) {
      const level = useScene.getState().nodes[activeLevelId] as LevelNode
      setInputValue(level?.name ?? '')
    } else {
      setInputValue('')
    }
    setPages((prev) => [...prev, p])
  }

  const navigateToCameraScope = (nodeId: string, label: string) => {
    setCameraScope({ nodeId, label })
    setInputValue('')
    setPages((prev) => [...prev, 'camera-scope'])
  }

  // ---------------------------------------------------------------------------
  // Action helpers
  // ---------------------------------------------------------------------------
  const run = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  const activateTool = (tool: StructureTool) => {
    run(() => {
      setPhase('structure')
      setMode('build')
      if (tool === 'zone') setStructureLayer('zones')
      setTool(tool)
    })
  }

  const wallModeKeys: Record<'cutaway' | 'up' | 'down', string> = {
    cutaway: 'viewer.cutaway',
    up: 'viewer.up',
    down: 'viewer.down',
  }
  const levelModeKeys: Record<'manual' | 'stacked' | 'exploded' | 'solo', string> = {
    manual: 'viewer.manual',
    stacked: 'viewer.stacked',
    exploded: 'viewer.exploded',
    solo: 'viewer.solo',
  }

  const deleteSelection = () => {
    if (!hasSelection) return
    run(() => {
      useScene.getState().deleteNodes(selection.selectedIds as any[])
    })
  }

  // Level management
  const addLevel = () =>
    run(() => {
      const { nodes } = useScene.getState()
      const building = Object.values(nodes).find((n) => n.type === 'building')
      if (!building) return
      const newLevel = LevelNode.parse({
        level: building.children.length,
        children: [],
        parentId: building.id,
      })
      useScene.getState().createNode(newLevel, building.id)
      useViewer.getState().setSelection({ levelId: newLevel.id })
    })

  const deleteActiveLevel = () => {
    if (!activeLevelId || isLevelZero) return
    run(() => {
      useScene.getState().deleteNode(activeLevelId as AnyNodeId)
      const { nodes } = useScene.getState()
      const level0 = Object.values(nodes).find(
        (n) => n.type === 'level' && (n as LevelNode).level === 0,
      )
      if (level0) useViewer.getState().setSelection({ levelId: level0.id as `level_${string}` })
    })
  }

  const confirmRename = () => {
    if (!(activeLevelId && inputValue.trim())) return
    run(() => {
      useScene.getState().updateNode(activeLevelId as AnyNodeId, { name: inputValue.trim() } as any)
    })
  }

  // Camera snapshot (scoped to the currently selected camera scope)
  const takeSnapshot = () => {
    if (!cameraScope) return
    run(() => emitter.emit('camera-controls:capture', { nodeId: cameraScope.nodeId as AnyNodeId }))
  }

  const viewSnapshot = () => {
    if (!(cameraScope && hasScopeSnapshot)) return
    run(() => emitter.emit('camera-controls:view', { nodeId: cameraScope.nodeId as AnyNodeId }))
  }

  const clearSnapshot = () => {
    if (!(cameraScope && hasScopeSnapshot)) return
    run(() => {
      useScene.getState().updateNode(cameraScope.nodeId as AnyNodeId, { camera: undefined } as any)
    })
  }

  // Export helpers
  const exportJson = () =>
    run(() => {
      const { nodes, rootNodeIds } = useScene.getState()
      const blob = new Blob([JSON.stringify({ nodes, rootNodeIds }, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), {
        href: url,
        download: `scene_${new Date().toISOString().split('T')[0]}.json`,
      })
      a.click()
      URL.revokeObjectURL(url)
    })

  const copyShareLink = () =>
    run(() => {
      navigator.clipboard.writeText(window.location.href)
    })

  const takeScreenshot = () =>
    run(() => {
      const canvas = document.querySelector('canvas')
      if (!canvas) return
      const a = Object.assign(document.createElement('a'), {
        href: canvas.toDataURL('image/png'),
        download: `screenshot_${new Date().toISOString().split('T')[0]}.png`,
      })
      a.click()
    })

  const toggleFullscreen = () =>
    run(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen()
      }
    })

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0" showCloseButton={false}>
        <Command
          className="**:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider"
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !inputValue && pages.length > 0) {
              e.preventDefault()
              goBack()
            }
          }}
          shouldFilter={page !== 'rename-level'}
        >
          {/* Search bar */}
          <div className="flex items-center border-border/50 border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            {page && (
              <button
                className="mr-2 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted/70"
                onClick={goBack}
                type="button"
              >
                {page === 'camera-scope'
                  ? (cameraScope?.label ?? t('cmd.cameraSnapshot'))
                  : (PAGE_LABEL_KEY[page] ? t(PAGE_LABEL_KEY[page] as any) : page)}
              </button>
            )}
            <Command.Input
              className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onValueChange={setInputValue}
              placeholder={
                page === 'rename-level'
                  ? t('cmd.typeNewName')
                  : page
                    ? t('cmd.filterOptions')
                    : t('cmd.searchActions')
              }
              value={inputValue}
            />
          </div>

          <Command.List className="max-h-100 overflow-y-auto p-1.5">
            <Command.Empty className="py-8 text-center text-muted-foreground text-sm">
              {t('cmd.noCommandsFound')}
            </Command.Empty>

            {/* ── Root view ─────────────────────────────────────────────── */}
            {!page && (
              <>
                {/* Scene / Tools */}
                <Command.Group heading={t('cmd.scene')}>
                  <Item
                    icon={<Square className="h-4 w-4" />}
                    keywords={['draw', 'build', 'structure']}
                    label={`${t('node.wall')} ${t('tool.wall')}`}
                    onSelect={() => activateTool('wall')}
                  />
                  <Item
                    icon={<Layers className="h-4 w-4" />}
                    keywords={['floor', 'build']}
                    label={`${t('node.slab')} ${t('tool.slab')}`}
                    onSelect={() => activateTool('slab')}
                  />
                  <Item
                    icon={<Grid3X3 className="h-4 w-4" />}
                    keywords={['top', 'build']}
                    label={`${t('node.ceiling')} ${t('tool.ceiling')}`}
                    onSelect={() => activateTool('ceiling')}
                  />
                  <Item
                    icon={<DoorOpen className="h-4 w-4" />}
                    keywords={['opening', 'entrance']}
                    label={`${t('node.door')} ${t('tool.door')}`}
                    onSelect={() => activateTool('door')}
                  />
                  <Item
                    icon={<AppWindow className="h-4 w-4" />}
                    keywords={['opening', 'glass']}
                    label={`${t('node.window')} ${t('tool.window')}`}
                    onSelect={() => activateTool('window')}
                  />
                  <Item
                    icon={<Package className="h-4 w-4" />}
                    keywords={['furniture', 'object', 'asset', 'furnish']}
                    label={`${t('node.item')} ${t('tool.item')}`}
                    onSelect={() => activateTool('item')}
                  />
                  <Item
                    icon={<Hexagon className="h-4 w-4" />}
                    keywords={['area', 'room', 'space']}
                    label={`${t('node.zone')} ${t('tool.zone')}`}
                    onSelect={() => activateTool('zone')}
                  />
                  <Item
                    disabled={!hasSelection}
                    icon={<Trash2 className="h-4 w-4" />}
                    keywords={['remove', 'erase']}
                    label={t('cmd.deleteSelection')}
                    onSelect={deleteSelection}
                    shortcut={['⌫']}
                  />
                </Command.Group>

                {/* Levels */}
                <Command.Group heading={t('viewer.levels')}>
                  <Item
                    disabled={allLevels.length === 0}
                    icon={<ArrowRight className="h-4 w-4" />}
                    keywords={['level', 'floor', 'go', 'navigate', 'switch', 'select']}
                    label={t('cmd.goToLevel')}
                    navigate
                    onSelect={() => navigateTo('goto-level')}
                  />
                  <Item
                    icon={<Plus className="h-4 w-4" />}
                    keywords={['level', 'floor', 'add', 'create', 'new']}
                    label={t('cmd.addLevel')}
                    onSelect={addLevel}
                  />
                  <Item
                    disabled={!activeLevelId}
                    icon={<PencilLine className="h-4 w-4" />}
                    keywords={['level', 'floor', 'rename', 'name']}
                    label={t('cmd.renameLevel')}
                    navigate
                    onSelect={() => navigateTo('rename-level')}
                  />
                  <Item
                    disabled={!activeLevelId || isLevelZero}
                    icon={<Trash2 className="h-4 w-4" />}
                    keywords={['level', 'floor', 'delete', 'remove']}
                    label={t('cmd.deleteLevel')}
                    onSelect={deleteActiveLevel}
                  />
                </Command.Group>

                {/* Viewer Controls */}
                <Command.Group heading={t('cmd.viewerControls')}>
                  <Item
                    badge={t(wallModeKeys[wallMode] as any)}
                    icon={<Layers className="h-4 w-4" />}
                    keywords={['wall', 'cutaway', 'up', 'down', 'view']}
                    label={t('cmd.wallMode')}
                    onSelect={() => navigateTo('wall-mode')}
                  />
                  <Item
                    badge={t(levelModeKeys[levelMode] as any)}
                    icon={<SquareStack className="h-4 w-4" />}
                    keywords={['level', 'floor', 'exploded', 'stacked', 'solo']}
                    label={t('cmd.levelMode')}
                    onSelect={() => navigateTo('level-mode')}
                  />
                  <Item
                    icon={<Video className="h-4 w-4" />}
                    keywords={['camera', 'ortho', 'perspective', '2d', '3d', 'view']}
                    label={`${t('cmd.cameraSwitchTo')} ${cameraMode === 'perspective' ? t('viewer.orthographic') : t('viewer.perspective')}`}
                    onSelect={() =>
                      run(() =>
                        setCameraMode(
                          cameraMode === 'perspective' ? 'orthographic' : 'perspective',
                        ),
                      )
                    }
                  />
                  <Item
                    icon={
                      theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
                    }
                    keywords={['theme', 'dark', 'light', 'appearance', 'color']}
                    label={theme === 'dark' ? t('cmd.switchToLight') : t('cmd.switchToDark')}
                    onSelect={() => run(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                  />
                  <Item
                    icon={<Camera className="h-4 w-4" />}
                    keywords={['camera', 'snapshot', 'capture', 'save', 'view', 'bookmark']}
                    label={t('cmd.cameraSnapshot')}
                    navigate
                    onSelect={() => navigateTo('camera-view')}
                  />
                </Command.Group>

                {/* View / Mode */}
                <Command.Group heading={t('cmd.view')}>
                  <Item
                    icon={
                      isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />
                    }
                    keywords={['preview', 'view', 'read-only', 'present']}
                    label={isPreviewMode ? t('cmd.exitPreview') : t('cmd.enterPreview')}
                    onSelect={() => run(() => setPreviewMode(!isPreviewMode))}
                  />
                  <Item
                    icon={
                      isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )
                    }
                    keywords={['fullscreen', 'maximize', 'expand', 'window']}
                    label={isFullscreen ? t('cmd.exitFullscreen') : t('cmd.enterFullscreen')}
                    onSelect={toggleFullscreen}
                  />
                </Command.Group>

                {/* History */}
                <Command.Group heading={t('cmd.history')}>
                  <Item
                    icon={<Undo2 className="h-4 w-4" />}
                    keywords={['undo', 'revert', 'back']}
                    label={t('cmd.undo')}
                    onSelect={() => run(() => useScene.temporal.getState().undo())}
                    shortcut={[meta, 'Z']}
                  />
                  <Item
                    icon={<Redo2 className="h-4 w-4" />}
                    keywords={['redo', 'forward', 'repeat']}
                    label={t('cmd.redo')}
                    onSelect={() => run(() => useScene.temporal.getState().redo())}
                    shortcut={[meta, '⇧', 'Z']}
                  />
                </Command.Group>

                {/* Export / Share */}
                <Command.Group heading={t('cmd.exportShare')}>
                  <Item
                    icon={<FileJson className="h-4 w-4" />}
                    keywords={['export', 'download', 'json', 'save', 'data']}
                    label={t('cmd.exportJson')}
                    onSelect={exportJson}
                  />
                  {exportScene && (
                    <Item
                      icon={<Box className="h-4 w-4" />}
                      keywords={['export', 'glb', 'gltf', '3d', 'model', 'download']}
                      label={t('cmd.exportGlb')}
                      onSelect={() => run(() => exportScene())}
                    />
                  )}
                  <Item
                    icon={<Copy className="h-4 w-4" />}
                    keywords={['share', 'copy', 'url', 'link']}
                    label={t('cmd.copyShareLink')}
                    onSelect={copyShareLink}
                  />
                  <Item
                    icon={<Camera className="h-4 w-4" />}
                    keywords={['screenshot', 'capture', 'image', 'photo', 'png']}
                    label={t('cmd.takeScreenshot')}
                    onSelect={takeScreenshot}
                  />
                </Command.Group>
              </>
            )}

            {/* ── Wall Mode sub-page ────────────────────────────────────── */}
            {page === 'wall-mode' && (
              <Command.Group heading={t('cmd.wallMode')}>
                {(['cutaway', 'up', 'down'] as const).map((mode) => (
                  <OptionItem
                    isActive={wallMode === mode}
                    key={mode}
                    label={t(wallModeKeys[mode] as any)}
                    onSelect={() => run(() => setWallMode(mode))}
                  />
                ))}
              </Command.Group>
            )}

            {/* ── Level Mode sub-page ───────────────────────────────────── */}
            {page === 'level-mode' && (
              <Command.Group heading={t('cmd.levelMode')}>
                {(['stacked', 'exploded', 'solo'] as const).map((mode) => (
                  <OptionItem
                    isActive={levelMode === mode}
                    key={mode}
                    label={t(levelModeKeys[mode] as any)}
                    onSelect={() => run(() => setLevelMode(mode))}
                  />
                ))}
              </Command.Group>
            )}

            {/* ── Go to Level sub-page ──────────────────────────────────── */}
            {page === 'goto-level' && (
              <Command.Group heading={t('cmd.goToLevel')}>
                {allLevels.map((level) => (
                  <OptionItem
                    isActive={level.id === activeLevelId}
                    key={level.id}
                    label={level.name ?? `${t('node.level')} ${level.level}`}
                    onSelect={() =>
                      run(() => useViewer.getState().setSelection({ levelId: level.id }))
                    }
                  />
                ))}
              </Command.Group>
            )}

            {/* ── Rename Level sub-page ─────────────────────────────────── */}
            {page === 'rename-level' && (
              <Command.Group heading={t('cmd.renameLevel')}>
                <Command.Item
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-foreground text-sm transition-colors data-[disabled=true]:cursor-not-allowed data-[selected=true]:bg-accent data-[disabled=true]:opacity-40"
                  disabled={!inputValue.trim()}
                  onSelect={confirmRename}
                  value="confirm-rename"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                    <PencilLine className="h-4 w-4" />
                  </span>
                  <span className="flex-1 truncate">
                    {inputValue.trim() ? (
                      <>
                        {t('cmd.renameTo')} <span className="font-medium">"{inputValue.trim()}"</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">{t('cmd.typeNameAbove')}</span>
                    )}
                  </span>
                </Command.Item>
              </Command.Group>
            )}

            {/* ── Camera Snapshot: scope picker ─────────────────────────── */}
            {page === 'camera-view' && (
              <Command.Group heading={t('cmd.selectScope')}>
                <OptionItem
                  icon={<Map className="h-4 w-4" />}
                  label={t('node.site')}
                  onSelect={() => {
                    const { rootNodeIds } = useScene.getState()
                    const siteId = rootNodeIds[0]
                    if (siteId) navigateToCameraScope(siteId, t('node.site'))
                  }}
                />
                <OptionItem
                  icon={<Building2 className="h-4 w-4" />}
                  label={t('node.building')}
                  onSelect={() => {
                    const building = Object.values(useScene.getState().nodes).find(
                      (n) => n.type === 'building',
                    )
                    if (building) navigateToCameraScope(building.id, t('node.building'))
                  }}
                />
                <OptionItem
                  disabled={!activeLevelId}
                  icon={<Layers className="h-4 w-4" />}
                  label={t('node.level')}
                  onSelect={() => {
                    if (activeLevelId) navigateToCameraScope(activeLevelId, t('node.level'))
                  }}
                />
                <OptionItem
                  disabled={!hasSelection}
                  icon={<MousePointer2 className="h-4 w-4" />}
                  label={t('node.selection')}
                  onSelect={() => {
                    const firstId = selection.selectedIds[0]
                    if (firstId) navigateToCameraScope(firstId, t('node.selection'))
                  }}
                />
              </Command.Group>
            )}

            {/* ── Camera Snapshot: actions for selected scope ───────────── */}
            {page === 'camera-scope' && cameraScope && (
              <Command.Group heading={`${cameraScope.label} ${t('cmd.cameraSnapshot')}`}>
                <OptionItem
                  icon={<Camera className="h-4 w-4" />}
                  label={hasScopeSnapshot ? t('cmd.updateSnapshot') : t('cmd.takeSnapshot')}
                  onSelect={takeSnapshot}
                />
                {hasScopeSnapshot && (
                  <OptionItem
                    icon={<Eye className="h-4 w-4" />}
                    label={t('cmd.viewSnapshot')}
                    onSelect={viewSnapshot}
                  />
                )}
                {hasScopeSnapshot && (
                  <OptionItem
                    icon={<Trash2 className="h-4 w-4" />}
                    label={t('cmd.clearSnapshot')}
                    onSelect={clearSnapshot}
                  />
                )}
              </Command.Group>
            )}
          </Command.List>

          {/* Footer hint */}
          <div className="flex items-center justify-between border-border/50 border-t px-3 py-2">
            <span className="text-[11px] text-muted-foreground">
              <Shortcut keys={['↑', '↓']} /> {t('common.navigate')}
            </span>
            <span className="text-[11px] text-muted-foreground">
              <Shortcut keys={['↵']} /> {t('common.select')}
            </span>
            {page ? (
              <span className="text-[11px] text-muted-foreground">
                <Shortcut keys={['⌫']} /> {t('common.back')}
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                <Shortcut keys={['Esc']} /> {t('common.close')}
              </span>
            )}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
