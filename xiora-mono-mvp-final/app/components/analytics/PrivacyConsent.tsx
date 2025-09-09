'use client'

import React, { useState, useEffect } from 'react'
import { usePrivacyConsent } from '@/hooks/usePrivacyConsent'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'
import { Checkbox } from '@/app/components/ui/Checkbox'

interface PrivacyConsentProps {
  showOnLoad?: boolean
  onConsentChange?: (consent: any) => void
}

export function PrivacyConsent({ showOnLoad = true, onConsentChange }: PrivacyConsentProps) {
  const {
    privacyConsent,
    isLoaded,
    updateConsent,
    acceptAll,
    acceptNecessary,
    rejectAll,
    toggleConsent,
    getConsentSummary
  } = usePrivacyConsent()

  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // 初回読み込み時の表示制御
  useEffect(() => {
    if (isLoaded && showOnLoad) {
      const hasConsent = localStorage.getItem('xiora_privacy_consent')
      if (!hasConsent) {
        setIsVisible(true)
      }
    }
  }, [isLoaded, showOnLoad])

  // 同意設定の変更通知
  useEffect(() => {
    if (onConsentChange) {
      onConsentChange(privacyConsent)
    }
  }, [privacyConsent, onConsentChange])

  // 同意設定の更新
  const handleConsentUpdate = (newConsent: Partial<typeof privacyConsent>) => {
    updateConsent(newConsent)
    
    // 同意が完了したらバナーを非表示
    const summary = getConsentSummary()
    if (summary.isFullyAccepted || summary.isMinimallyAccepted) {
      setIsVisible(false)
    }
  }

  // 全同意
  const handleAcceptAll = () => {
    acceptAll()
    setIsVisible(false)
  }

  // 必要最小限のみ同意
  const handleAcceptNecessary = () => {
    acceptNecessary()
    setIsVisible(false)
  }

  // 全拒否
  const handleRejectAll = () => {
    rejectAll()
    setIsVisible(false)
  }

  // 詳細設定の切り替え
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // 個別設定の切り替え
  const handleToggleConsent = (category: keyof typeof privacyConsent) => {
    toggleConsent(category)
  }

  if (!isVisible || !isLoaded) {
    return null
  }

  const summary = getConsentSummary()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto p-4">
        <Card className="bg-white shadow-2xl">
          <div className="p-6">
            {/* ヘッダー */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  プライバシー設定
                </h3>
                <p className="text-sm text-gray-600">
                  当サイトでは、お客様の体験向上とサービス改善のためにCookieを使用しています。お客様の同意に基づいて、分析、マーケティング、その他の目的でCookieを設定することができます。
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="閉じる"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 同意設定 */}
            <div className="space-y-4 mb-6">
              {/* 必要不可欠なCookie */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="necessary"
                    label="必要不可欠なCookie"
                    checked={privacyConsent.necessary}
                    disabled={true}
                    onChange={() => {}}
                  />
                  <div>
                    <label htmlFor="necessary" className="text-sm font-medium text-gray-900">
                      必要不可欠なCookie
                    </label>
                    <p className="text-xs text-gray-500">
                      サイトの基本機能に必要で、無効化できません
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  常に有効
                </span>
              </div>

              {/* 分析Cookie */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="analytics"
                    label="分析Cookie"
                    checked={privacyConsent.analytics}
                    onChange={() => handleToggleConsent('analytics')}
                  />
                  <div>
                    <label htmlFor="analytics" className="text-sm font-medium text-gray-900">
                      分析Cookie
                    </label>
                    <p className="text-xs text-gray-500">
                      サイトの使用状況を分析し、パフォーマンスを改善するために使用されます
                    </p>
                  </div>
                </div>
                <span className="text-xs text-blue-600">
                  {privacyConsent.analytics ? '有効' : '無効'}
                </span>
              </div>

              {/* マーケティングCookie */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="marketing"
                    label="マーケティングCookie"
                    checked={privacyConsent.marketing}
                    onChange={() => handleToggleConsent('marketing')}
                  />
                  <div>
                    <label htmlFor="marketing" className="text-sm font-medium text-gray-900">
                      マーケティングCookie
                    </label>
                    <p className="text-xs text-gray-500">
                      パーソナライズされた広告やコンテンツを表示するために使用されます
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-600">
                  {privacyConsent.marketing ? '有効' : '無効'}
                </span>
              </div>

              {/* 設定Cookie */}
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="preferences"
                    label="設定Cookie"
                    checked={privacyConsent.preferences}
                    onChange={() => handleToggleConsent('preferences')}
                  />
                  <div>
                    <label htmlFor="preferences" className="text-sm font-medium text-gray-900">
                      設定Cookie
                    </label>
                    <p className="text-xs text-gray-500">
                      お客様の設定や選択を記憶し、カスタマイズされた体験を提供します
                    </p>
                  </div>
                </div>
                <span className="text-xs text-purple-600">
                  {privacyConsent.preferences ? '有効' : '無効'}
                </span>
              </div>
            </div>

            {/* 詳細設定 */}
            <div className="mb-6">
              <button
                onClick={handleToggleExpanded}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{isExpanded ? '詳細を隠す' : '詳細を表示'}</span>
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    詳細設定
                  </h4>
                  <div className="space-y-3 text-xs text-gray-600">
                    <p>
                      必要不可欠なCookie: セッション管理、セキュリティ、基本機能に必要
                    </p>
                    <p>
                      分析Cookie: Google Analytics、PostHog、パフォーマンス監視に使用
                    </p>
                    <p>
                      マーケティングCookie: 広告効果測定、リターゲティング、パーソナライゼーション
                    </p>
                    <p>
                      設定Cookie: 言語設定、テーマ設定、ユーザー設定の記憶
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 同意率表示 */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>同意率</span>
                <span>{summary.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${summary.percentage}%` }}
                />
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                すべて同意する
              </Button>
              
              <Button
                onClick={handleAcceptNecessary}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                必要最小限のみ
              </Button>
              
              <Button
                onClick={handleRejectAll}
                variant="ghost"
                size="lg"
                className="flex-1"
              >
                すべて拒否
              </Button>
            </div>

            {/* 設定保存ボタン */}
            <div className="mt-4 text-center">
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
              >
                設定を保存
              </Button>
            </div>

            {/* フッター */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
                <div className="mb-2 sm:mb-0">
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    プライバシーポリシー
                  </a>
                  <span className="mx-2">•</span>
                  <a
                    href="/cookie-policy"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Cookieポリシー
                  </a>
                </div>
                <div>
                  最終更新: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
