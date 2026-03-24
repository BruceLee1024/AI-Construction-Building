'use client'

import { useViewer } from '@pascal-app/viewer'
import { Bot, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { type ReactNode, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './../../../components/ui/primitives/tooltip'
import { useT } from './../../../lib/i18n'
import { cn } from './../../../lib/utils'

export type PanelId = 'site' | 'settings' | 'agent'

interface IconRailProps {
  activePanel: PanelId
  onPanelChange: (panel: PanelId) => void
  appMenuButton?: ReactNode
  className?: string
}

const panels: { id: PanelId; iconSrc?: string; icon?: React.FC<{ className?: string }>; labelKey: string }[] = [
  { id: 'site', iconSrc: '/icons/level.png', labelKey: 'rail.site' },
  { id: 'agent', icon: ({ className }) => <Bot className={className} />, labelKey: 'rail.agent' },
  { id: 'settings', iconSrc: '/icons/settings.png', labelKey: 'rail.settings' },
]

export function IconRail({ activePanel, onPanelChange, appMenuButton, className }: IconRailProps) {
  const theme = useViewer((state) => state.theme)
  const setTheme = useViewer((state) => state.setTheme)
  const [mounted, setMounted] = useState(false)
  const t = useT()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={cn(
        'flex h-full w-11 flex-col items-center gap-1 border-border/50 border-r py-2',
        className,
      )}
    >
      {/* App menu slot */}
      {appMenuButton}

      {/* Divider */}
      <div className="mb-1 h-px w-8 bg-border/50" />

      {panels.map((panel) => {
        const isActive = activePanel === panel.id
        return (
          <Tooltip key={panel.id}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-all',
                  isActive ? 'bg-accent' : 'hover:bg-accent',
                )}
                onClick={() => onPanelChange(panel.id)}
                type="button"
              >
                {panel.iconSrc ? (
                  <img
                    alt={t(panel.labelKey as any)}
                    className={cn(
                      'h-6 w-6 object-contain transition-all',
                      !isActive && 'opacity-50 saturate-0',
                    )}
                    src={panel.iconSrc}
                  />
                ) : panel.icon ? (
                  <panel.icon
                    className={cn(
                      'h-5 w-5 transition-all',
                      isActive ? 'text-violet-400' : 'text-muted-foreground opacity-50',
                    )}
                  />
                ) : null}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{t(panel.labelKey as any)}</TooltipContent>
          </Tooltip>
        )
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      {mounted && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-accent/40 text-foreground transition-all hover:bg-accent"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              type="button"
            >
              <motion.div
                animate={{ rotate: 0, opacity: 1 }}
                initial={{ rotate: -90, opacity: 0 }}
                key={theme}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{t('viewer.toggleTheme')}</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export { panels }
