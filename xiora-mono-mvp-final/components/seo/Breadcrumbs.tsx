import Link from 'next/link'
import { BreadcrumbStructuredData } from './StructuredData'

interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * SEO対応のパンくずリストコンポーネント
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null
  
  return (
    <>
      {/* 構造化データ */}
      <BreadcrumbStructuredData breadcrumbs={items} />
      
      {/* パンくずリストの表示 */}
      <nav 
        aria-label="パンくずリスト" 
        className={`text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-neutral-400" aria-hidden="true">
                  /
                </span>
              )}
              
              {item.current ? (
                <span 
                  className="text-neutral-600 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

/**
 * 商品詳細ページ用のパンくずリスト
 */
export function ProductBreadcrumbs({ 
  categoryName, 
  categoryUrl, 
  productName 
}: {
  categoryName: string
  categoryUrl: string
  productName: string
}) {
  const items = [
    { name: 'ホーム', url: '/' },
    { name: '商品カタログ', url: '/catalog' },
    { name: categoryName, url: categoryUrl },
    { name: productName, url: '', current: true }
  ]
  
  return <Breadcrumbs items={items} className="mb-6" />
}

/**
 * ブログ記事用のパンくずリスト
 */
export function BlogPostBreadcrumbs({ 
  postTitle 
}: {
  postTitle: string
}) {
  const items = [
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
    { name: postTitle, url: '', current: true }
  ]
  
  return <Breadcrumbs items={items} className="mb-6" />
}

/**
 * カテゴリページ用のパンくずリスト
 */
export function CategoryBreadcrumbs({ 
  categoryName 
}: {
  categoryName: string
}) {
  const items = [
    { name: 'ホーム', url: '/' },
    { name: '商品カタログ', url: '/catalog' },
    { name: categoryName, url: '', current: true }
  ]
  
  return <Breadcrumbs items={items} className="mb-6" />
}

/**
 * レンタル商品用のパンくずリスト
 */
export function RentalItemBreadcrumbs({ 
  categoryName, 
  categoryUrl, 
  itemName 
}: {
  categoryName: string
  categoryUrl: string
  itemName: string
}) {
  const items = [
    { name: 'ホーム', url: '/' },
    { name: 'レンタル', url: '/custom-rental' },
    { name: categoryName, url: categoryUrl },
    { name: itemName, url: '', current: true }
  ]
  
  return <Breadcrumbs items={items} className="mb-6" />
}
