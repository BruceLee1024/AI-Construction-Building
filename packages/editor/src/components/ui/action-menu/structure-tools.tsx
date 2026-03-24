'use client'

import NextImage from 'next/image'
import { useContextualTools } from '../../../hooks/use-contextual-tools'

import { useT } from '../../../lib/i18n'
import { cn } from '../../../lib/utils'
import useEditor, {
  type CatalogCategory,
  type StructureTool,
  type Tool,
} from '../../../store/use-editor'
import { ActionButton } from './action-button'

export type ToolConfig = {
  id: StructureTool
  iconSrc: string
  labelKey: string
  catalogCategory?: CatalogCategory
}

export const tools: ToolConfig[] = [
  { id: 'wall', iconSrc: '/icons/wall.png', labelKey: 'tool.wall' },
  // { id: 'room', iconSrc: '/icons/room.png', labelKey: 'Room' },
  // { id: 'custom-room', iconSrc: '/icons/custom-room.png', labelKey: 'Custom Room' },
  { id: 'slab', iconSrc: '/icons/floor.png', labelKey: 'tool.slab' },
  { id: 'ceiling', iconSrc: '/icons/ceiling.png', labelKey: 'tool.ceiling' },
  { id: 'roof', iconSrc: '/icons/roof.png', labelKey: 'tool.gableRoof' },
  { id: 'door', iconSrc: '/icons/door.png', labelKey: 'tool.door' },
  { id: 'window', iconSrc: '/icons/window.png', labelKey: 'tool.window' },
  { id: 'zone', iconSrc: '/icons/zone.png', labelKey: 'tool.zone' },
]

export function StructureTools() {
  const activeTool = useEditor((state) => state.tool)
  const catalogCategory = useEditor((state) => state.catalogCategory)
  const structureLayer = useEditor((state) => state.structureLayer)
  const setTool = useEditor((state) => state.setTool)
  const setCatalogCategory = useEditor((state) => state.setCatalogCategory)

  const contextualTools = useContextualTools()
  const t = useT()

  // Filter tools based on structureLayer
  const visibleTools =
    structureLayer === 'zones'
      ? tools.filter((t) => t.id === 'zone')
      : tools.filter((t) => t.id !== 'zone')

  const hasActiveTool = visibleTools.some(
    (t) =>
      activeTool === t.id && (t.catalogCategory ? catalogCategory === t.catalogCategory : true),
  )

  return (
    <div className="flex items-center gap-1.5 px-1">
      {visibleTools.map((tool, index) => {
        // For item tools with catalog category, check both tool and category match
        const isActive =
          activeTool === tool.id &&
          (tool.catalogCategory ? catalogCategory === tool.catalogCategory : true)

        const isContextual = contextualTools.includes(tool.id)

        return (
          <ActionButton
            className={cn(
              'rounded-lg duration-300',
              isActive
                ? 'z-10 scale-110 bg-black/40 hover:bg-black/40'
                : 'scale-95 bg-transparent opacity-60 grayscale hover:bg-black/20 hover:opacity-100 hover:grayscale-0',
            )}
            key={`${tool.id}-${tool.catalogCategory ?? index}`}
            label={t(tool.labelKey as any)}
            onClick={() => {
              if (!isActive) {
                setTool(tool.id)
                setCatalogCategory(tool.catalogCategory ?? null)

                // Automatically switch to build mode if we select a tool
                if (useEditor.getState().mode !== 'build') {
                  useEditor.getState().setMode('build')
                }
              }
            }}
            size="icon"
            variant="ghost"
          >
            <NextImage
              alt={t(tool.labelKey as any)}
              className="size-full object-contain"
              height={28}
              src={tool.iconSrc}
              width={28}
            />
          </ActionButton>
        )
      })}
    </div>
  )
}
