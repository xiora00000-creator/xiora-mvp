import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message: string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// メモリベースのストア（本番環境ではRedis等を使用）
const store: RateLimitStore = {}

export function createRateLimiter(config: RateLimitConfig) {
  return function rateLimit(req: NextRequest) {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    // 既存のレコードを取得または初期化
    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 0,
        resetTime: now + config.windowMs,
      }
    }
    
    // リクエストカウントを増加
    store[ip].count++
    
    // 制限をチェック
    if (store[ip].count > config.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests', message: config.message },
        { status: 429 }
      )
    }
    
    // レート制限ヘッダーを追加
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', Math.max(0, config.maxRequests - store[ip].count).toString())
    response.headers.set('X-RateLimit-Reset', new Date(store[ip].resetTime).toISOString())
    
    return response
  }
}

// デフォルト設定
export const defaultRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15分
  maxRequests: 100, // 100リクエスト
  message: 'Too many requests from this IP, please try again later.',
})

// 厳格な制限（ログイン等）
export const strictRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15分
  maxRequests: 5, // 5リクエスト
  message: 'Too many attempts, please try again later.',
})

// フォーム送信用の制限
export const formRateLimit = createRateLimiter({
  windowMs: 60 * 1000, // 1分
  maxRequests: 3, // 3リクエスト
  message: 'Too many form submissions, please wait before trying again.',
})
