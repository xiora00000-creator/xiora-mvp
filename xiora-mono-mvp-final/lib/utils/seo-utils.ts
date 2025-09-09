// SEO最適化用のユーティリティ関数

import { Metadata } from 'next'

/**
 * 基本的なメタデータを生成
 */
export function generateBasicMetadata(
  title: string,
  description: string,
  path: string = ''
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  const fullUrl = `${baseUrl}${path}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Xiora',
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * 商品ページ用のメタデータを生成
 */
export function generateProductMetadata(
  product: {
    name: string
    description?: string
    price?: number
    images?: string[]
    category?: string
  },
  path: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  const fullUrl = `${baseUrl}${path}`
  const title = `${product.name} | Xiora`
  const description = product.description || `${product.name}の詳細情報。高品質な商品をお届けします。`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Xiora',
      locale: 'ja_JP',
      type: 'website',
      images: product.images?.map(img => ({
        url: img.startsWith('http') ? img : `${baseUrl}${img}`,
        width: 1200,
        height: 630,
        alt: product.name,
      })) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images?.[0] || undefined,
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'product:price:amount': product.price?.toString() || '',
      'product:price:currency': 'JPY',
      'product:category': product.category || '',
    },
  }
}

/**
 * ブログ記事用のメタデータを生成
 */
export function generateBlogPostMetadata(
  post: {
    title: string
    excerpt?: string
    content: string
    publishedAt?: string
    author?: string
    tags?: string[]
    image?: string
  },
  path: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  const fullUrl = `${baseUrl}${path}`
  const title = `${post.title} | Xiora Blog`
  const description = post.excerpt || post.content.substring(0, 160) + '...'
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Xiora',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.image ? [{
        url: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image || undefined,
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'article:published_time': post.publishedAt || '',
      'article:author': post.author || '',
      'article:section': 'Blog',
    },
  }
}

/**
 * 構造化データ（JSON-LD）を生成
 */
export function generateStructuredData(type: string, data: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${baseUrl}${data.url || ''}`,
    'url': `${baseUrl}${data.url || ''}`,
  }
  
  const structuredData = { ...baseData, ...data }
  
  return JSON.stringify(structuredData)
}

/**
 * 組織情報の構造化データ
 */
export function generateOrganizationStructuredData(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  return generateStructuredData('Organization', {
    name: 'Xiora',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: '高品質な映像制作機器とレンタルサービスを提供するXioraです。',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressLocality: 'Tokyo',
      addressRegion: 'Tokyo',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-3-1234-5678',
      contactType: 'customer service',
      availableLanguage: ['Japanese', 'English'],
    },
    sameAs: [
      'https://twitter.com/xiora',
      'https://www.facebook.com/xiora',
      'https://www.instagram.com/xiora',
    ],
  })
}

/**
 * 商品の構造化データ
 */
export function generateProductStructuredData(product: {
  name: string
  description?: string
  price: number
  image?: string
  url: string
  category?: string
  availability?: string
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  return generateStructuredData('Product', {
    name: product.name,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    url: `${baseUrl}${product.url}`,
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'JPY',
      availability: product.availability === 'available' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `${baseUrl}${product.url}`,
    },
  })
}

/**
 * ブログ記事の構造化データ
 */
export function generateBlogPostStructuredData(post: {
  title: string
  description?: string
  publishedAt: string
  author: string
  image?: string
  url: string
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  return generateStructuredData('BlogPosting', {
    headline: post.title,
    description: post.description,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xiora',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${post.url}`,
    },
  })
}

/**
 * パンくずリストの構造化データ
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string
  url: string
}>): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  return generateStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  })
}

/**
 * FAQの構造化データ
 */
export function generateFAQStructuredData(faqs: Array<{
  question: string
  answer: string
}>): string {
  return generateStructuredData('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}

/**
 * ローカルビジネスの構造化データ
 */
export function generateLocalBusinessStructuredData(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  return generateStructuredData('LocalBusiness', {
    name: 'Xiora',
    description: '映像制作機器のレンタル・販売サービス',
    url: baseUrl,
    telephone: '+81-3-1234-5678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1-1-1 Shibuya',
      addressLocality: 'Shibuya',
      addressRegion: 'Tokyo',
      postalCode: '150-0002',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.658034,
      longitude: 139.701636,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '¥¥',
    servesCuisine: '映像制作機器',
  })
}

/**
 * サイトマップ用のURLを生成
 */
export function generateSitemapUrls(): Array<{
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  const now = new Date()
  
  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/custom-rental`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}

/**
 * メタタグの文字数をチェック
 */
export function validateMetaLength(title: string, description: string): {
  titleValid: boolean
  descriptionValid: boolean
  titleLength: number
  descriptionLength: number
  titleSuggestion?: string
  descriptionSuggestion?: string
} {
  const titleLength = title.length
  const descriptionLength = description.length
  
  const titleValid = titleLength >= 30 && titleLength <= 60
  const descriptionValid = descriptionLength >= 120 && descriptionLength <= 160
  
  let titleSuggestion: string | undefined
  let descriptionSuggestion: string | undefined
  
  if (titleLength < 30) {
    titleSuggestion = 'タイトルが短すぎます。30文字以上にしてください。'
  } else if (titleLength > 60) {
    titleSuggestion = 'タイトルが長すぎます。60文字以下にしてください。'
  }
  
  if (descriptionLength < 120) {
    descriptionSuggestion = '説明文が短すぎます。120文字以上にしてください。'
  } else if (descriptionLength > 160) {
    descriptionSuggestion = '説明文が長すぎます。160文字以下にしてください。'
  }
  
  return {
    titleValid,
    descriptionValid,
    titleLength,
    descriptionLength,
    titleSuggestion,
    descriptionSuggestion,
  }
}

/**
 * キーワード密度を計算
 */
export function calculateKeywordDensity(text: string, keyword: string): number {
  const words = text.toLowerCase().split(/\s+/)
  const keywordLower = keyword.toLowerCase()
  const keywordCount = words.filter(word => word.includes(keywordLower)).length
  
  return (keywordCount / words.length) * 100
}

/**
 * SEOスコアを計算
 */
export function calculateSEOScore(checks: {
  hasTitle: boolean
  hasDescription: boolean
  hasOpenGraph: boolean
  hasTwitterCard: boolean
  hasStructuredData: boolean
  hasCanonical: boolean
  titleLength: number
  descriptionLength: number
  hasImages: boolean
  hasAltText: boolean
}): number {
  let score = 0
  const maxScore = 100
  
  // 基本要素（40点）
  if (checks.hasTitle) score += 10
  if (checks.hasDescription) score += 10
  if (checks.hasOpenGraph) score += 5
  if (checks.hasTwitterCard) score += 5
  if (checks.hasStructuredData) score += 5
  if (checks.hasCanonical) score += 5
  
  // 最適化（30点）
  if (checks.titleLength >= 30 && checks.titleLength <= 60) score += 15
  if (checks.descriptionLength >= 120 && checks.descriptionLength <= 160) score += 15
  
  // 画像最適化（20点）
  if (checks.hasImages) score += 10
  if (checks.hasAltText) score += 10
  
  // 技術的要素（10点）
  if (checks.hasStructuredData) score += 10
  
  return Math.min(score, maxScore)
}
