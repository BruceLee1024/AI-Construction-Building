'use client'

import { useEffect } from 'react'
import { useI18n } from '../lib/i18n'

export function LocaleSync() {
  const locale = useI18n((s) => s.locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
