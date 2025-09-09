import { NextResponse } from 'next/server'

/**
 * robots.txtの生成
 * GET /robots.txt
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  const robotsTxt = `User-agent: *
Allow: /

# 管理画面はクロール禁止
Disallow: /admin/
Disallow: /api/admin/

# APIエンドポイントはクロール禁止
Disallow: /api/
Disallow: /_next/

# 画像・CSS・JSファイルは許可
Allow: /images/
Allow: /css/
Allow: /js/
Allow: /_next/static/

# サイトマップ
Sitemap: ${baseUrl}/sitemap

# クロール遅延（1秒間隔）
Crawl-delay: 1

# 特定のボット向け設定
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# 画像ボット向け設定
User-agent: Googlebot-Image
Allow: /images/
Allow: /_next/static/
Disallow: /

# モバイルボット向け設定
User-agent: Googlebot-Mobile
Allow: /
Crawl-delay: 1`
  
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
