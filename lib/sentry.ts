import * as Sentry from '@sentry/nextjs'

// Sentryの初期化
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // 環境設定
  environment: process.env.NODE_ENV,
  
  // リリース設定
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // サンプリング設定
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // コンテキスト設定
  beforeSend(event) {
    // 開発環境では送信しない
    if (process.env.NODE_ENV === 'development') {
      return null
    }
    
    // ユーザー情報の追加
    if (event.user) {
      event.user.ip_address = '{{auto}}'
    }
    
    return event
  },
})

// エラーハンドラーの設定
export const captureException = (error: Error, context?: any) => {
  Sentry.captureException(error, {
    extra: context,
    tags: {
      component: 'error-boundary',
      timestamp: new Date().toISOString(),
    },
  })
}

// メッセージの送信
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.captureMessage(message, {
    level,
    tags: {
      component: 'application',
      timestamp: new Date().toISOString(),
    },
  })
}

// ユーザー情報の設定
export const setUser = (user: {
  id?: string
  email?: string
  username?: string
  [key: string]: any
}) => {
  Sentry.setUser(user)
}

// ユーザーコンテキストのクリア
export const clearUser = () => {
  Sentry.setUser(null)
}

// タグの設定
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value)
}

// コンテキストの設定
export const setContext = (name: string, context: Record<string, any>) => {
  Sentry.setContext(name, context)
}

// エラーバウンダリー用の設定
export const withSentry = (Component: React.ComponentType<any>) => {
  return Sentry.withProfiler(Component)
}

// APIエラーハンドラー
export const handleApiError = (error: any, endpoint: string) => {
  Sentry.captureException(error, {
    tags: {
      component: 'api',
      endpoint,
      timestamp: new Date().toISOString(),
    },
    extra: {
      endpoint,
      error: error.message,
      stack: error.stack,
    },
  })
}

// フォームエラーハンドラー
export const handleFormError = (error: any, formType: string, formData?: any) => {
  Sentry.captureException(error, {
    tags: {
      component: 'form',
      form_type: formType,
      timestamp: new Date().toISOString(),
    },
    extra: {
      formType,
      formData,
      error: error.message,
      stack: error.stack,
    },
  })
}

// パフォーマンスエラーハンドラー
export const handlePerformanceError = (error: any, metric: string, value?: number) => {
  Sentry.captureException(error, {
    tags: {
      component: 'performance',
      metric,
      timestamp: new Date().toISOString(),
    },
    extra: {
      metric,
      value,
      error: error.message,
      stack: error.stack,
    },
  })
}

// セキュリティイベントの送信
export const captureSecurityEvent = (
  event: string,
  details: Record<string, any>
) => {
  Sentry.captureMessage(`Security Event: ${event}`, {
    level: 'warning',
    tags: {
      component: 'security',
      event,
      timestamp: new Date().toISOString(),
    },
    extra: details,
  })
}

// ビジネスイベントの送信
export const captureBusinessEvent = (
  event: string,
  properties: Record<string, any>
) => {
  Sentry.captureMessage(`Business Event: ${event}`, {
    level: 'info',
    tags: {
      component: 'business',
      event,
      timestamp: new Date().toISOString(),
    },
    extra: properties,
  })
}
