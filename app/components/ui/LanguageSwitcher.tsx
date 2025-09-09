'use client'

import { useLocale } from '@/lib/i18n/useLocale'
import { Button } from './Button'

export function LanguageSwitcher() {
  const { locale, changeLocale, isJapanese, isEnglish } = useLocale()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isJapanese ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => changeLocale('ja')}
        className="min-w-[44px] h-[44px] px-3"
        aria-label="日本語に切り替え"
      >
        JA
      </Button>
      <Button
        variant={isEnglish ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => changeLocale('en')}
        className="min-w-[44px] h-[44px] px-3"
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  )
}
