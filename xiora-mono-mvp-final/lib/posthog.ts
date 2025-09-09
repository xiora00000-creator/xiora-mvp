import posthog from 'posthog-js'

// PostHogの初期化
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // 開発環境でのデバッグ
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    // 自動ページビューの無効化（手動で制御）
    capture_pageview: false
  })
}

// PostHogインスタンスのエクスポート
export { posthog }

// カスタムイベントの定義
export const EVENTS = {
  // ページビュー
  PAGE_VIEW: 'page_view',
  
  // お問い合わせ
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // 予約
  RESERVATION_FORM_SUBMIT: 'reservation_form_submit',
  RESERVATION_FORM_SUCCESS: 'reservation_form_success',
  RESERVATION_FORM_ERROR: 'reservation_form_error',
  
  // ナビゲーション
  NAVIGATION_CLICK: 'navigation_click',
  MOBILE_MENU_OPEN: 'mobile_menu_open',
  MOBILE_MENU_CLOSE: 'mobile_menu_close',
  
  // ユーザーエンゲージメント
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  SCROLL_DEPTH: 'scroll_depth',
  
  // パフォーマンス
  PAGE_LOAD_TIME: 'page_load_time',
  IMAGE_LOAD_ERROR: 'image_load_error'
} as const

// イベント送信のヘルパー関数
export const trackEvent = (
  event: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

// ページビューの追跡
export const trackPageView = (url: string, properties?: Record<string, any>) => {
  trackEvent(EVENTS.PAGE_VIEW, {
    url,
    title: document.title,
    ...properties
  })
}

// フォーム送信の追跡
export const trackFormSubmit = (
  formType: 'contact' | 'reservation',
  properties?: Record<string, any>
) => {
  trackEvent(
    formType === 'contact' ? EVENTS.CONTACT_FORM_SUBMIT : EVENTS.RESERVATION_FORM_SUBMIT,
    {
      form_type: formType,
      timestamp: new Date().toISOString(),
      ...properties
    }
  )
}

// フォーム成功の追跡
export const trackFormSuccess = (
  formType: 'contact' | 'reservation',
  properties?: Record<string, any>
) => {
  trackEvent(
    formType === 'contact' ? EVENTS.CONTACT_FORM_SUCCESS : EVENTS.RESERVATION_FORM_SUCCESS,
    {
      form_type: formType,
      timestamp: new Date().toISOString(),
      ...properties
    }
  )
}

// フォームエラーの追跡
export const trackFormError = (
  formType: 'contact' | 'reservation',
  error: string,
  properties?: Record<string, any>
) => {
  trackEvent(
    formType === 'contact' ? EVENTS.CONTACT_FORM_ERROR : EVENTS.RESERVATION_FORM_ERROR,
    {
      form_type: formType,
      error,
      timestamp: new Date().toISOString(),
      ...properties
    }
  )
}

// ナビゲーションクリックの追跡
export const trackNavigationClick = (
  linkText: string,
  linkUrl: string,
  properties?: Record<string, any>
) => {
  trackEvent(EVENTS.NAVIGATION_CLICK, {
    link_text: linkText,
    link_url: linkUrl,
    timestamp: new Date().toISOString(),
    ...properties
  })
}

// ボタンクリックの追跡
export const trackButtonClick = (
  buttonText: string,
  buttonType: string,
  properties?: Record<string, any>
) => {
  trackEvent(EVENTS.BUTTON_CLICK, {
    button_text: buttonText,
    button_type: buttonType,
    timestamp: new Date().toISOString(),
    ...properties
  })
}

// スクロール深度の追跡
export const trackScrollDepth = (depth: number) => {
  trackEvent(EVENTS.SCROLL_DEPTH, {
    depth,
    timestamp: new Date().toISOString()
  })
}

// パフォーマンスの追跡
export const trackPageLoadTime = (loadTime: number) => {
  trackEvent(EVENTS.PAGE_LOAD_TIME, {
    load_time: loadTime,
    url: window.location.href,
    timestamp: new Date().toISOString()
  })
}

// ユーザー識別
export const identifyUser = (
  userId: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties)
  }
}

// ユーザープロパティの設定
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // PostHogではidentifyを使用してユーザープロパティを設定
    posthog.identify(undefined, properties)
  }
}
