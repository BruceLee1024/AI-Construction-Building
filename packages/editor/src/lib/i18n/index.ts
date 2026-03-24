import { create } from 'zustand'
import { en } from './en'
import type { Locale, TranslationKeys } from './types'
import { zh } from './zh'

const dictionaries: Record<Locale, TranslationKeys> = { en, zh }

interface I18nStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useI18n = create<I18nStore>((set) => ({
  locale: (typeof window !== 'undefined' && (localStorage.getItem('pascal-locale') as Locale)) || 'en',
  setLocale: (locale) => {
    if (typeof window !== 'undefined') localStorage.setItem('pascal-locale', locale)
    set({ locale })
  },
}))

export function useT() {
  const locale = useI18n((s) => s.locale)
  const dict = dictionaries[locale]
  return function t(key: keyof TranslationKeys): string {
    return dict[key] ?? key
  }
}

export type { Locale, TranslationKeys }
