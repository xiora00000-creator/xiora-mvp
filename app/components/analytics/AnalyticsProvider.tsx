'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AnalyticsConfig, AnalyticsEvent, UserProperties, PrivacySettings } from '@/lib/analytics/types'
import { initializeAnalytics, trackEvent, identifyUser, setUserProperties } from '@/lib/analytics/analytics'
import { usePrivacyConsent } from '@/hooks/usePrivacyConsent'

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  identifyUser: (userId: string, properties?: UserProperties) => void
  setUserProperties: (properties: UserProperties) => void
  isInitialized: boolean
  privacySettings: PrivacySettings
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
  config: AnalyticsConfig
}

export function AnalyticsProvider({ children, config }: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const { privacyConsent, updateConsent } = usePrivacyConsent()
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    analytics: privacyConsent.analytics,
    marketing: privacyConsent.marketing,
    necessary: privacyConsent.necessary,
    preferences: privacyConsent.preferences
  })

  // アナリティクスの初期化
  useEffect(() => {
    if (privacySettings.analytics) {
      try {
        // 環境変数が不足している場合は初期化をスキップ
        if (!config.posthog.apiKey && !config.googleAnalytics.measurementId) {
          console.log('Analytics disabled: No API keys configured')
          setIsInitialized(true)
          return
        }
        
        initializeAnalytics(config)
        setIsInitialized(true)
        console.log('Analytics initialized successfully')
      } catch (error) {
        console.error('Failed to initialize analytics:', error)
        // エラーが発生しても初期化完了として扱う
        setIsInitialized(true)
      }
    } else {
      // アナリティクスが無効な場合も初期化完了として扱う
      setIsInitialized(true)
    }
  }, [config, privacySettings.analytics])

  // プライバシー設定の更新
  const updatePrivacySettings = (newSettings: Partial<PrivacySettings>) => {
    const updatedSettings = { ...privacySettings, ...newSettings }
    setPrivacySettings(updatedSettings)
    
    // 同意設定の更新
    updateConsent({
      analytics: updatedSettings.analytics,
      marketing: updatedSettings.marketing,
      necessary: updatedSettings.necessary,
      preferences: updatedSettings.preferences
    })

    // アナリティクスの有効/無効切り替え
    if (updatedSettings.analytics && !isInitialized) {
      try {
        // 環境変数が不足している場合は初期化をスキップ
        if (!config.posthog.apiKey && !config.googleAnalytics.measurementId) {
          console.log('Analytics disabled: No API keys configured')
          setIsInitialized(true)
          return
        }
        
        initializeAnalytics(config)
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize analytics after consent:', error)
        setIsInitialized(true)
      }
    }
  }

  // イベント追跡
  const handleTrackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!privacySettings.analytics || !isInitialized) {
      console.log('Analytics disabled or not initialized, event not tracked:', eventName)
      return
    }

    try {
      trackEvent(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        privacyConsent: privacySettings
      })
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }

  // ユーザー識別
  const handleIdentifyUser = (userId: string, properties?: UserProperties) => {
    if (!privacySettings.analytics || !isInitialized) return

    try {
      identifyUser(userId, properties)
    } catch (error) {
      console.error('Failed to identify user:', error)
    }
  }

  // ユーザープロパティ設定
  const handleSetUserProperties = (properties: UserProperties) => {
    if (!privacySettings.analytics || !isInitialized) return

    try {
      setUserProperties(properties)
    } catch (error) {
      console.error('Failed to set user properties:', error)
    }
  }

  // セッションIDの取得
  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('xiora_session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('xiora_session_id', sessionId)
    }
    return sessionId
  }

  const contextValue: AnalyticsContextType = {
    trackEvent: handleTrackEvent,
    identifyUser: handleIdentifyUser,
    setUserProperties: handleSetUserProperties,
    isInitialized,
    privacySettings,
    updatePrivacySettings
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

// カスタムフック
export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// デフォルト設定
export const defaultAnalyticsConfig: AnalyticsConfig = {
  posthog: {
    apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    enableDebugMode: process.env.NODE_ENV === 'development',
    capturePageView: true,
    capturePageLeave: true,
    captureClicks: true,
    captureFormSubmissions: true,
    captureScrollDepth: true,
    captureTimeOnPage: true
  },
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_ID || '',
    enableDebugMode: process.env.NODE_ENV === 'development',
    anonymizeIp: true,
    respectDoNotTrack: true,
    enhancedLinkAttribution: true,
    demographicsAndInterests: false
  },
  custom: {
    enableCustomEvents: true,
    enableUserTracking: true,
    enableSessionRecording: false,
    enableHeatmaps: false,
    dataRetentionDays: 90,
    enableDataExport: true
  },
  privacy: {
    enableConsentManagement: true,
    enableDataAnonymization: true,
    enableOptOut: true,
    respectGdpr: true,
    cookieExpiryDays: 365
  }
}
