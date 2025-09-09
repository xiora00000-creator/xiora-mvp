'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Locale, translations } from './translations'

export function useLocale() {
  const router = useRouter()
  const pathname = usePathname()

  // 現在の言語を取得
  const currentLocale = useMemo((): Locale => {
    const pathLocale = pathname.split('/')[1]
    return (pathLocale === 'en' ? 'en' : 'ja') as Locale
  }, [pathname])

  // 言語を切り替え
  const changeLocale = useCallback((newLocale: Locale) => {
    const currentPath = pathname
    const currentPathLocale = currentPath.split('/')[1]
    
    let newPath: string
    
    if (currentPathLocale === 'ja' || currentPathLocale === 'en') {
      // 現在の言語プレフィックスを新しい言語に置き換え
      newPath = currentPath.replace(`/${currentPathLocale}`, `/${newLocale}`)
    } else {
      // 言語プレフィックスがない場合は新しい言語を追加
      newPath = `/${newLocale}${currentPath}`
    }
    
    router.push(newPath)
  }, [router, pathname])

  // 現在の言語の翻訳を取得
  const t = useMemo(() => translations[currentLocale], [currentLocale])

  // 言語切り替えリンクを生成
  const getLocaleLink = useCallback((locale: Locale, path?: string) => {
    const targetPath = path || pathname
    const currentPathLocale = targetPath.split('/')[1]
    
    if (currentPathLocale === 'ja' || currentPathLocale === 'en') {
      return targetPath.replace(`/${currentPathLocale}`, `/${locale}`)
    }
    
    return `/${locale}${targetPath}`
  }, [pathname])

  return {
    locale: currentLocale,
    changeLocale,
    t,
    getLocaleLink,
    isJapanese: currentLocale === 'ja',
    isEnglish: currentLocale === 'en',
  }
}
