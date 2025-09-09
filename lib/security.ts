import { NextRequest, NextResponse } from 'next/server'

// セキュリティヘルパー関数
export class SecurityUtils {
  // XSS対策: HTMLエスケープ
  static escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    }
    return text.replace(/[&<>"'/]/g, (m) => map[m])
  }

  // SQLインジェクション対策: 危険な文字の検出
  static detectSqlInjection(input: string): boolean {
    const dangerousPatterns = [
      /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|vbscript|onload|onerror|onclick)\b)/i,
      /(['";]|--|\/\*|\*\/|xp_|sp_)/i,
      /(\b(and|or)\s+\d+\s*[=<>])/i,
    ]
    
    return dangerousPatterns.some(pattern => pattern.test(input))
  }

  // パストラバーサル対策
  static detectPathTraversal(path: string): boolean {
    const dangerousPatterns = [
      /\.\./,
      /\/\//,
      /\\/,
      /%2e%2e/,
      /%2f%2f/,
      /%5c/,
    ]
    
    return dangerousPatterns.some(pattern => pattern.test(path))
  }

  // CSRFトークンの生成
  static generateCSRFToken(): string {
    return crypto.randomUUID()
  }

  // パスワード強度チェック
  static validatePasswordStrength(password: string): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    // 長さチェック
    if (password.length >= 8) score += 1
    else feedback.push('パスワードは8文字以上である必要があります')

    // 大文字小文字
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
    else feedback.push('大文字と小文字の両方を含む必要があります')

    // 数字
    if (/\d/.test(password)) score += 1
    else feedback.push('数字を含む必要があります')

    // 特殊文字
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
    else feedback.push('特殊文字を含む必要があります')

    const isValid = score >= 3

    return { isValid, score, feedback }
  }

  // IPアドレスの検証
  static isValidIP(ip: string): boolean {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    
    if (ipv4Pattern.test(ip)) {
      const parts = ip.split('.')
      return parts.every(part => {
        const num = parseInt(part, 10)
        return num >= 0 && num <= 255
      })
    }
    
    return ipv6Pattern.test(ip)
  }

  // ファイル拡張子の検証
  static isAllowedFileExtension(filename: string, allowedExtensions: string[]): boolean {
    const extension = filename.toLowerCase().split('.').pop()
    return extension ? allowedExtensions.includes(extension) : false
  }

  // コンテンツタイプの検証
  static isAllowedContentType(contentType: string, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => contentType.startsWith(type))
  }
}

// セキュリティミドルウェア
export function securityMiddleware(req: NextRequest) {
  const response = NextResponse.next()
  
  // セキュリティヘッダーの追加
  response.headers.set('X-Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https:; " +
    "frame-ancestors 'none';"
  )
  
  // 追加のセキュリティヘッダー
  response.headers.set('X-DNS-Prefetch-Control', 'off')
  response.headers.set('X-Download-Options', 'noopen')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  
  return response
}

// 入力サニタイゼーション
export function sanitizeInput(input: string): string {
  return SecurityUtils.escapeHtml(input.trim())
}

// ファイルアップロードの検証
export function validateFileUpload(file: File, maxSize: number, allowedTypes: string[]): {
  isValid: boolean
  error?: string
} {
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `ファイルサイズは${maxSize / (1024 * 1024)}MB以下にしてください`
    }
  }

  if (!SecurityUtils.isAllowedContentType(file.type, allowedTypes)) {
    return {
      isValid: false,
      error: '対応していないファイル形式です'
    }
  }

  if (!SecurityUtils.isAllowedFileExtension(file.name, allowedTypes.map(t => t.split('/')[1]))) {
    return {
      isValid: false,
      error: 'ファイル拡張子が無効です'
    }
  }

  return { isValid: true }
}

// ログイン試行の追跡
interface LoginAttempt {
  ip: string
  timestamp: number
  success: boolean
}

const loginAttempts = new Map<string, LoginAttempt[]>()

export function trackLoginAttempt(ip: string, success: boolean): {
  isBlocked: boolean
  remainingAttempts: number
  blockUntil?: number
} {
  const now = Date.now()
  const attempts = loginAttempts.get(ip) || []
  
  // 古い試行を削除（1時間前）
  const recentAttempts = attempts.filter(attempt => now - attempt.timestamp < 60 * 60 * 1000)
  
  // 新しい試行を追加
  recentAttempts.push({ ip, timestamp: now, success })
  loginAttempts.set(ip, recentAttempts)
  
  // 失敗した試行の数をカウント
  const failedAttempts = recentAttempts.filter(attempt => !attempt.success).length
  
  // 5回失敗で15分間ブロック
  if (failedAttempts >= 5) {
    const blockUntil = now + 15 * 60 * 1000
    return {
      isBlocked: true,
      remainingAttempts: 0,
      blockUntil
    }
  }
  
  return {
    isBlocked: false,
    remainingAttempts: 5 - failedAttempts
  }
}
