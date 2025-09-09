import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'
import { generateSitemapUrls } from '@/lib/utils/seo-utils'

/**
 * 動的サイトマップの生成
 * GET /sitemap.xml
 */
export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
    const now = new Date()
    
    // 基本ページのURL
    const baseUrls = generateSitemapUrls()
    
    // 商品ページのURLを取得
    let productUrls: Array<{
      url: string
      lastModified: Date
      changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
      priority: number
    }> = []
    
    try {
      const products = await sbAdmin('xiora_products?select=slug,updated_at&status=eq.published')
      if (Array.isArray(products)) {
        productUrls = products.map(product => ({
          url: `${baseUrl}/catalog/${product.slug}`,
          lastModified: new Date(product.updated_at || product.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }
    } catch (error) {
      console.warn('Failed to fetch products for sitemap:', error)
    }
    
    // ブログ記事のURLを取得
    let blogUrls: Array<{
      url: string
      lastModified: Date
      changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
      priority: number
    }> = []
    
    try {
      const posts = await sbAdmin('xiora_blog_posts?select=slug,updated_at,status&status=eq.published')
      if (Array.isArray(posts)) {
        blogUrls = posts.map(post => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      }
    } catch (error) {
      console.warn('Failed to fetch blog posts for sitemap:', error)
    }
    
    // レンタル商品のURLを取得
    let rentalUrls: Array<{
      url: string
      lastModified: Date
      changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
      priority: number
    }> = []
    
    try {
      const rentalItems = await sbAdmin('xiora_rental_items?select=slug,updated_at,availability_status&availability_status=eq.available')
      if (Array.isArray(rentalItems)) {
        rentalUrls = rentalItems.map(item => ({
          url: `${baseUrl}/custom-rental/${item.slug}`,
          lastModified: new Date(item.updated_at || item.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }
    } catch (error) {
      console.warn('Failed to fetch rental items for sitemap:', error)
    }
    
    // カテゴリページのURLを取得
    let categoryUrls: Array<{
      url: string
      lastModified: Date
      changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
      priority: number
    }> = []
    
    try {
      const categories = await sbAdmin('xiora_categories?select=slug,updated_at')
      if (Array.isArray(categories)) {
        categoryUrls = categories.map(category => ({
          url: `${baseUrl}/catalog/category/${category.slug}`,
          lastModified: new Date(category.updated_at || category.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      }
    } catch (error) {
      console.warn('Failed to fetch categories for sitemap:', error)
    }
    
    // すべてのURLを結合
    const allUrls = [...baseUrls, ...productUrls, ...blogUrls, ...rentalUrls, ...categoryUrls]
    
    // XMLサイトマップを生成
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // エラー時は基本的なサイトマップを返す
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    
    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  }
}
