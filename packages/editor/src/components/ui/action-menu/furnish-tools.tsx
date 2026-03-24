'use client'

import NextImage from 'next/image'
import { useT } from './../../../lib/i18n'
import { cn } from './../../../lib/utils'
import useEditor, { type CatalogCategory } from './../../../store/use-editor'
import { ActionButton } from './action-button'

export type FurnishToolConfig = {
  id: 'item'
  iconSrc: string
  labelKey: string
  catalogCategory: CatalogCategory
}

// Furnish mode tools: furniture, appliances, decoration (painting is now a control mode)
export const furnishTools: FurnishToolConfig[] = [
  {
    id: 'item',
    iconSrc: '/icons/couch.png',
    labelKey: 'furnish.furniture',
    catalogCategory: 'furniture',
  },
  {
    id: 'item',
    iconSrc: '/icons/appliance.png',
    labelKey: 'furnish.appliance',
    catalogCategory: 'appliance',
  },
  {
    id: 'item',
    iconSrc: '/icons/kitchen.png',
    labelKey: 'furnish.kitchen',
    catalogCategory: 'kitchen',
  },
  {
    id: 'item',
    iconSrc: '/icons/bathroom.png',
    labelKey: 'furnish.bathroom',
    catalogCategory: 'bathroom',
  },
  {
    id: 'item',
    iconSrc: '/icons/tree.png',
    labelKey: 'furnish.outdoor',
    catalogCategory: 'outdoor',
  },
]

export function FurnishTools() {
  const mode = useEditor((state) => state.mode)
  const activeTool = useEditor((state) => state.tool)
  const setActiveTool = useEditor((state) => state.setTool)
  const setMode = useEditor((state) => state.setMode)
  const catalogCategory = useEditor((state) => state.catalogCategory)
  const setCatalogCategory = useEditor((state) => state.setCatalogCategory)
  const t = useT()

  const hasActiveTool = furnishTools.some(
    (tool) => mode === 'build' && activeTool === 'item' && catalogCategory === tool.catalogCategory,
  )

  return (
    <div className="flex items-center gap-1.5 px-1">
      {furnishTools.map((tool, index) => {
        // For item tools with catalog category, check both tool and category match
        const isActive =
          mode === 'build' && activeTool === 'item' && catalogCategory === tool.catalogCategory

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
                setCatalogCategory(tool.catalogCategory)
                setActiveTool('item')
                if (mode !== 'build') {
                  setMode('build')
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
