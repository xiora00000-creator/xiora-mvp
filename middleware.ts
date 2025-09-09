import { NextRequest, NextResponse } from 'next/server'

// サポートする言語
const locales = ['ja', 'en']
const defaultLocale = 'ja'

// Basic認証の実装
function basicAuth(req: NextRequest): boolean {
  const USER = process.env.ADMIN_USER || 'admin'
  const PASS = process.env.ADMIN_PASSWORD || 'change-me'
  const header = req.headers.get('authorization') || ''
  
  if (!header.startsWith('Basic ')) return false
  
  const [user, pass] = Buffer.from(header.split(' ')[1], 'base64').toString().split(':')
  return user === USER && pass === PASS
}

// パスから言語を取得
function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return defaultLocale
  }

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  return pathnameLocale || defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // /admin パスのBasic認証チェック
  if (pathname.startsWith('/admin')) {
    if (!basicAuth(request)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Xiora Admin"' }
      })
    }
  }
  
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 言語が指定されていない場合はデフォルト言語にリダイレクト
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // 言語プレフィックスを除いたパスにマッチ
    '/((?!_next|api|.*\\..*).*)',
  ],
}
