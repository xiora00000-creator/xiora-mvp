'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: string
  type?: 'application/ld+json' | 'application/json'
}

/**
 * 構造化データ（JSON-LD）をページに埋め込むコンポーネント
 */
export function StructuredData({ data, type = 'application/ld+json' }: StructuredDataProps) {
  useEffect(() => {
    // 既存の構造化データを削除
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())
    
    // 新しい構造化データを追加
    const script = document.createElement('script')
    script.type = type
    script.text = data
    script.setAttribute('data-seo', 'true')
    
    document.head.appendChild(script)
    
    // クリーンアップ
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [data, type])
  
  // サーバーサイドレンダリング用のscriptタグ
  return (
    <script
      type={type}
      dangerouslySetInnerHTML={{ __html: data }}
      data-seo="true"
    />
  )
}

/**
 * 組織情報の構造化データ
 */
export function OrganizationStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xiora',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'}/images/logo.png`,
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
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}

/**
 * ローカルビジネスの構造化データ
 */
export function LocalBusinessStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Xiora',
    description: '映像制作機器のレンタル・販売サービス',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp',
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
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}

/**
 * パンくずリストの構造化データ
 */
export function BreadcrumbStructuredData({ breadcrumbs }: { 
  breadcrumbs: Array<{ name: string; url: string }> 
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}

/**
 * FAQの構造化データ
 */
export function FAQStructuredData({ faqs }: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}

/**
 * 商品の構造化データ
 */
export function ProductStructuredData({ product }: {
  product: {
    name: string
    description?: string
    price: number
    image?: string
    url: string
    category?: string
    availability?: string
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
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
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}

/**
 * ブログ記事の構造化データ
 */
export function BlogPostStructuredData({ post }: {
  post: {
    title: string
    description?: string
    publishedAt: string
    author: string
    image?: string
    url: string
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xiora.jp'
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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
  }
  
  return <StructuredData data={JSON.stringify(data)} />
}
