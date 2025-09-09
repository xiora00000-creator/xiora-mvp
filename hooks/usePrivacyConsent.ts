'use client'

import { useState, useEffect } from 'react'

export interface PrivacyConsent {
  analytics: boolean
  marketing: boolean
  necessary: boolean
  preferences: boolean
}

const DEFAULT_CONSENT: PrivacyConsent = {
  analytics: false,
  marketing: false,
  necessary: true, // 必要不可欠なCookieは常に有効
  preferences: false
}

const CONSENT_STORAGE_KEY = 'xiora_privacy_consent'
const CONSENT_VERSION = '1.0'

export function usePrivacyConsent() {
  const [privacyConsent, setPrivacyConsent] = useState<PrivacyConsent>(DEFAULT_CONSENT)
  const [isLoaded, setIsLoaded] = useState(false)

  // 初期化時にローカルストレージから同意設定を読み込み
  useEffect(() => {
    loadConsentFromStorage()
  }, [])

  // ローカルストレージから同意設定を読み込み
  const loadConsentFromStorage = () => {
    try {
      if (typeof window === 'undefined') return

      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        
        // バージョンチェック
        if (parsed.version === CONSENT_VERSION && parsed.consent) {
          setPrivacyConsent(parsed.consent)
        } else {
          // バージョンが古い場合はデフォルト値を使用
          setPrivacyConsent(DEFAULT_CONSENT)
        }
      } else {
        // 初回訪問の場合はデフォルト値を使用
        setPrivacyConsent(DEFAULT_CONSENT)
      }
    } catch (error) {
      console.error('Failed to load privacy consent:', error)
      setPrivacyConsent(DEFAULT_CONSENT)
    } finally {
      setIsLoaded(true)
    }
  }

  // 同意設定をローカルストレージに保存
  const saveConsentToStorage = (consent: PrivacyConsent) => {
    try {
      if (typeof window === 'undefined') return

      const data = {
        version: CONSENT_VERSION,
        consent,
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save privacy consent:', error)
    }
  }

  // 同意設定の更新
  const updateConsent = (newConsent: Partial<PrivacyConsent>) => {
    const updatedConsent = { ...privacyConsent, ...newConsent }
    setPrivacyConsent(updatedConsent)
    saveConsentToStorage(updatedConsent)

    // 同意設定の変更をイベントとして発火
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('privacyConsentChanged', {
        detail: updatedConsent
      }))
    }
  }

  // 全同意
  const acceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      necessary: true,
      preferences: true
    })
  }

  // 必要最小限のみ同意
  const acceptNecessary = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      necessary: true,
      preferences: false
    })
  }

  // 全拒否
  const rejectAll = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      necessary: true, // 必要不可欠なCookieは常に有効
      preferences: false
    })
  }

  // 特定のカテゴリの同意設定を切り替え
  const toggleConsent = (category: keyof PrivacyConsent) => {
    if (category === 'necessary') return // 必要不可欠なCookieは変更不可
    
    updateConsent({
      [category]: !privacyConsent[category]
    })
  }

  // 同意設定のリセット
  const resetConsent = () => {
    setPrivacyConsent(DEFAULT_CONSENT)
    saveConsentToStorage(DEFAULT_CONSENT)
    
    // ローカルストレージから削除
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CONSENT_STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to reset privacy consent:', error)
    }
  }

  // 同意設定の検証
  const validateConsent = (consent: PrivacyConsent): boolean => {
    // 必要不可欠なCookieは常に必要
    if (!consent.necessary) return false
    
    // その他のカテゴリは任意
    return true
  }

  // 同意設定の要約
  const getConsentSummary = () => {
    const totalCategories = Object.keys(privacyConsent).length
    const acceptedCategories = Object.values(privacyConsent).filter(Boolean).length
    
    return {
      total: totalCategories,
      accepted: acceptedCategories,
      percentage: Math.round((acceptedCategories / totalCategories) * 100),
      isFullyAccepted: acceptedCategories === totalCategories,
      isMinimallyAccepted: privacyConsent.necessary && acceptedCategories === 1
    }
  }

  // 同意設定の変更履歴
  const getConsentHistory = () => {
    try {
      if (typeof window === 'undefined') return []

      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.updatedAt ? [parsed.updatedAt] : []
      }
      return []
    } catch (error) {
      console.error('Failed to get consent history:', error)
      return []
    }
  }

  // 同意設定のエクスポート
  const exportConsent = () => {
    try {
      const data = {
        consent: privacyConsent,
        summary: getConsentSummary(),
        history: getConsentHistory(),
        exportedAt: new Date().toISOString(),
        version: CONSENT_VERSION
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `privacy-consent-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export consent:', error)
    }
  }

  // 同意設定のインポート
  const importConsent = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          
          if (data.version === CONSENT_VERSION && data.consent) {
            if (validateConsent(data.consent)) {
              updateConsent(data.consent)
              resolve(true)
            } else {
              console.error('Invalid consent data')
              resolve(false)
            }
          } else {
            console.error('Invalid consent file format')
            resolve(false)
          }
        } catch (error) {
          console.error('Failed to parse consent file:', error)
          resolve(false)
        }
      }
      
      reader.onerror = () => {
        console.error('Failed to read consent file')
        resolve(false)
      }
      
      reader.readAsText(file)
    })
  }

  return {
    privacyConsent,
    isLoaded,
    updateConsent,
    acceptAll,
    acceptNecessary,
    rejectAll,
    toggleConsent,
    resetConsent,
    validateConsent,
    getConsentSummary,
    getConsentHistory,
    exportConsent,
    importConsent
  }
}
