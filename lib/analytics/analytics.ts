/**
 * アナリティクスシステムのコア機能
 */

import { AnalyticsConfig, AnalyticsEvent, UserProperties } from './types'

// PostHogインスタンス
let posthog: any = null

// Google Analytics設定
let gaConfig: any = null

// カスタムイベントストレージ
const customEvents: AnalyticsEvent[] = []

// アナリティクスの初期化
export function initializeAnalytics(config: AnalyticsConfig): void {
  try {
    // PostHogの初期化
    if (config.posthog.apiKey && config.posthog.enableDebugMode) {
      initializePostHog(config.posthog)
    }

    // Google Analyticsの初期化
    if (config.googleAnalytics.measurementId) {
      initializeGoogleAnalytics(config.googleAnalytics)
    }

    // カスタムアナリティクスの初期化
    initializeCustomAnalytics(config.custom)

    console.log('Analytics initialized successfully')
  } catch (error) {
    console.error('Failed to initialize analytics:', error)
    throw error
  }
}

// PostHogの初期化
function initializePostHog(config: any): void {
  if (typeof window === 'undefined') return

  try {
    // PostHogが既に読み込まれているかチェック
    if ((window as any).posthog) {
      posthog = (window as any).posthog
    } else {
      // PostHogスクリプトの動的読み込み
      const script = document.createElement('script')
      script.src = `https://t.posthog.com/static/array.js`
      script.async = true
      script.onload = () => {
        if ((window as any).posthog) {
          posthog = (window as any).posthog
          posthog.init(config.apiKey, {
            api_host: config.host,
            debug: config.enableDebugMode,
            capture_pageview: config.capturePageView,
            capture_pageleave: config.capturePageLeave,
            capture_clicks: config.captureClicks,
            capture_form_submissions: config.captureFormSubmissions,
            capture_scroll_depth: config.captureScrollDepth,
            capture_time_on_page: config.captureTimeOnPage
          })
        }
      }
      document.head.appendChild(script)
    }
  } catch (error) {
    console.error('Failed to initialize PostHog:', error)
  }
}

// Google Analyticsの初期化
function initializeGoogleAnalytics(config: any): void {
  if (typeof window === 'undefined') return

  try {
    gaConfig = config

    // Google Analytics 4の設定
    if ((window as any).gtag) {
      (window as any).gtag('config', config.measurementId, {
        debug_mode: config.enableDebugMode,
        anonymize_ip: config.anonymizeIp,
        respect_dnt: config.respectDoNotTrack,
        link_attribution: config.enhancedLinkAttribution,
        demographics: config.demographicsAndInterests
      })
    } else {
      // gtagスクリプトの動的読み込み
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`
      script.async = true
      script.onload = () => {
        if ((window as any).gtag) {
          (window as any).gtag('config', config.measurementId, {
            debug_mode: config.enableDebugMode,
            anonymize_ip: config.anonymizeIp,
            respect_dnt: config.respectDoNotTrack,
            link_attribution: config.enhancedLinkAttribution,
            demographics: config.demographicsAndInterests
          })
        }
      }
      document.head.appendChild(script)
    }
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error)
  }
}

// カスタムアナリティクスの初期化
function initializeCustomAnalytics(config: any): void {
  if (typeof window === 'undefined') return

  try {
    // セッション情報の初期化
    initializeSessionTracking()

    // ページビューの自動追跡
    if (config.enableCustomEvents) {
      initializePageViewTracking()
    }

    // ユーザー行動の自動追跡
    if (config.enableUserTracking) {
      initializeUserBehaviorTracking()
    }

    // スクロール深度の追跡
    if (config.enableCustomEvents) {
      initializeScrollDepthTracking()
    }

    // フォーム送信の追跡
    if (config.enableCustomEvents) {
      initializeFormTracking()
    }

    console.log('Custom analytics initialized')
  } catch (error) {
    console.error('Failed to initialize custom analytics:', error)
  }
}

// セッション追跡の初期化
function initializeSessionTracking(): void {
  if (typeof window === 'undefined') return

  const sessionId = generateSessionId()
  const sessionStart = Date.now()

  // セッション情報をセッションストレージに保存
  sessionStorage.setItem('xiora_session_id', sessionId)
  sessionStorage.setItem('xiora_session_start', sessionStart.toString())

  // セッション開始イベントを記録
  trackEvent('session_start', {
    sessionId,
    sessionStart,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    pageUrl: window.location.href
  })

  // ページ離脱時のセッション終了イベント
  window.addEventListener('beforeunload', () => {
    const sessionEnd = Date.now()
    const sessionDuration = sessionEnd - parseInt(sessionStorage.getItem('xiora_session_start') || '0')
    
    trackEvent('session_end', {
      sessionId,
      sessionEnd,
      sessionDuration,
      pageUrl: window.location.href
    })
  })
}

// ページビュー追跡の初期化
function initializePageViewTracking(): void {
  if (typeof window === 'undefined') return

  // 初期ページビュー
  trackPageView()

  // ルート変更の監視（Next.js App Router対応）
  let currentPath = window.location.pathname
  
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname
      trackPageView()
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// ユーザー行動追跡の初期化
function initializeUserBehaviorTracking(): void {
  if (typeof window === 'undefined') return

  // クリックイベントの追跡
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (target) {
      trackEvent('user_interaction', {
        interactionType: 'click',
        elementId: target.id,
        elementClass: target.className,
        elementText: target.textContent?.substring(0, 100),
        elementType: target.tagName.toLowerCase(),
        pageUrl: window.location.href
      })
    }
  })

  // フォーカスイベントの追跡
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement
    if (target && target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      trackEvent('user_interaction', {
        interactionType: 'form_field_focus',
        elementId: target.id,
        elementClass: target.className,
        elementType: target.tagName.toLowerCase(),
        pageUrl: window.location.href
      })
    }
  })
}

// スクロール深度追跡の初期化
function initializeScrollDepthTracking(): void {
  if (typeof window === 'undefined') return

  let maxScrollDepth = 0
  const scrollThresholds = [25, 50, 75, 90, 100]

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

    // 新しい閾値に達した場合のみ記録
    for (const threshold of scrollThresholds) {
      if (scrollPercentage >= threshold && maxScrollDepth < threshold) {
        maxScrollDepth = threshold
        trackEvent('scroll_depth', {
          depth: threshold,
          pageUrl: window.location.href,
          scrollTop,
          scrollHeight,
          scrollPercentage
        })
        break
      }
    }
  })
}

// フォーム追跡の初期化
function initializeFormTracking(): void {
  if (typeof window === 'undefined') return

  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement
    if (form) {
      trackEvent('form_submit', {
        formId: form.id,
        formAction: form.action,
        formMethod: form.method,
        formFields: Array.from(form.elements).map((element: any) => ({
          name: element.name,
          type: element.type,
          required: element.required
        })),
        pageUrl: window.location.href
      })
    }
  })
}

// イベント追跡
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  try {
    const event: AnalyticsEvent = {
      eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      privacyConsent: getPrivacyConsent()
    }

    // PostHogに送信
    if (posthog) {
      posthog.capture(eventName, properties)
    }

    // Google Analyticsに送信
    if (gaConfig && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties)
    }

    // カスタムイベントストレージに保存
    customEvents.push(event)

    // ローカルストレージに保存（最大1000件）
    if (customEvents.length > 1000) {
      customEvents.splice(0, customEvents.length - 1000)
    }

    // 開発環境でのログ出力
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event)
    }
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

// ページビュー追跡
export function trackPageView(): void {
  trackEvent('page_view', {
    pageTitle: document.title,
    pagePath: window.location.pathname,
    pageUrl: window.location.href,
    referrer: document.referrer,
    pageType: getPageType(),
    contentCategory: getContentCategory(),
    contentTags: getContentTags(),
    loadTime: performance.now()
  })
}

// ユーザー識別
export function identifyUser(userId: string, properties?: UserProperties): void {
  try {
    // PostHogに送信
    if (posthog) {
      posthog.identify(userId, properties)
    }

    // Google Analyticsに送信
    if (gaConfig && (window as any).gtag) {
      (window as any).gtag('config', gaConfig.measurementId, {
        user_id: userId,
        ...properties
      })
    }

    // カスタムイベントとして記録
    trackEvent('user_identified', {
      userId,
      ...properties
    })
  } catch (error) {
    console.error('Failed to identify user:', error)
  }
}

// ユーザープロパティ設定
export function setUserProperties(properties: UserProperties): void {
  try {
    // PostHogに送信
    if (posthog) {
      posthog.set(properties)
    }

    // Google Analyticsに送信
    if (gaConfig && (window as any).gtag) {
      (window as any).gtag('config', gaConfig.measurementId, properties)
    }

    // カスタムイベントとして記録
    trackEvent('user_properties_set', properties)
  } catch (error) {
    console.error('Failed to set user properties:', error)
  }
}

// セッションIDの生成
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// セッションIDの取得
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('xiora_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('xiora_session_id', sessionId)
  }
  return sessionId
}

// プライバシー同意設定の取得
function getPrivacyConsent(): any {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem('xiora_privacy_consent')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.consent || {}
    }
  } catch (error) {
    console.error('Failed to get privacy consent:', error)
  }
  
  return {}
}

// ページタイプの判定
function getPageType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const path = window.location.pathname
  
  if (path === '/') return 'home'
  if (path.startsWith('/about')) return 'about'
  if (path.startsWith('/catalog')) return 'catalog'
  if (path.startsWith('/blog')) return 'blog'
  if (path.startsWith('/contact')) return 'contact'
  if (path.startsWith('/custom-rental')) return 'custom-rental'
  
  return 'other'
}

// コンテンツカテゴリの判定
function getContentCategory(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const path = window.location.pathname
  
  if (path.startsWith('/catalog')) return 'product'
  if (path.startsWith('/blog')) return 'content'
  if (path.startsWith('/about')) return 'company'
  if (path.startsWith('/contact')) return 'service'
  
  return 'general'
}

// コンテンツタグの取得
function getContentTags(): string[] {
  if (typeof window === 'undefined') return []
  
  const tags: string[] = []
  const path = window.location.pathname
  
  if (path.startsWith('/catalog')) tags.push('product', 'shopping')
  if (path.startsWith('/blog')) tags.push('content', 'information')
  if (path.startsWith('/about')) tags.push('company', 'brand')
  if (path.startsWith('/contact')) tags.push('service', 'support')
  
  return tags
}

// カスタムイベントの取得
export function getCustomEvents(): AnalyticsEvent[] {
  return [...customEvents]
}

// カスタムイベントのクリア
export function clearCustomEvents(): void {
  customEvents.length = 0
}

// アナリティクスの無効化
export function disableAnalytics(): void {
  try {
    // PostHogの無効化
    if (posthog) {
      posthog.opt_out_capturing()
    }

    // Google Analyticsの無効化
    if (gaConfig && (window as any).gtag) {
      (window as any).gtag('config', gaConfig.measurementId, {
        send_page_view: false
      })
    }

    console.log('Analytics disabled')
  } catch (error) {
    console.error('Failed to disable analytics:', error)
  }
}

// アナリティクスの再有効化
export function enableAnalytics(): void {
  try {
    // PostHogの再有効化
    if (posthog) {
      posthog.opt_in_capturing()
    }

    // Google Analyticsの再有効化
    if (gaConfig && (window as any).gtag) {
      (window as any).gtag('config', gaConfig.measurementId, {
        send_page_view: true
      })
    }

    console.log('Analytics enabled')
  } catch (error) {
    console.error('Failed to enable analytics:', error)
  }
}
