'use client'

import { useEffect } from 'react'
import { useI18n, type Locale } from '../lib/i18n'

export function LocaleSync() {
  const locale = useI18n((s) => s.locale)
  const setLocale = useI18n((s) => s.setLocale)

  useEffect(() => {
    const saved = localStorage.getItem('pascal-locale') as Locale
    if (saved && saved !== 'en') {
      setLocale(saved)
    }
  }, [setLocale])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
