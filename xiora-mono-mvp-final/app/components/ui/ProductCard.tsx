import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'
import { Button } from './Button'

/**
 * 商品のプロパティ
 */
interface Product {
  id: string
  name: string
  description: string
  price: {
    amount: number
    currency: string
    unit?: string
  }
  image: string
  category: string
  tags?: string[]
  specs?: Record<string, string>
  materials?: string[]
  inStock: boolean
  rating?: number
  reviewCount?: number
}

/**
 * ProductCardコンポーネントのプロパティ
 */
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'detailed' | 'minimal'
  className?: string
  priority?: boolean
  onViewDetails?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

/**
 * ProductCardコンポーネント
 * ECカタログ用の商品カード（next/image最適化）
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  className,
  priority = false,
  onViewDetails,
  onAddToCart
}) => {
  const formatPrice = (price: Product['price']) => {
    return `${price.currency}${price.amount.toLocaleString()}${price.unit ? `/${price.unit}` : ''}`
  }

  // レスポンシブsizes設定
  const sizes = variant === 'minimal' 
    ? '(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
    : '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'

  if (variant === 'minimal') {
    return (
      <div className={cn('group cursor-pointer', className)}>
        {/* 統一されたアスペクト比（4:3） */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-bg-secondary border border-line transition-all duration-normal ease-smooth group-hover:border-neutral-600 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-normal ease-smooth group-hover:scale-105"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        <div className="mt-3">
          <h3 className="font-medium text-fg group-hover:text-fg-secondary transition-colors duration-normal ease-smooth line-clamp-2">
            {product.name}
          </h3>
          <p className="text-fg text-sm font-medium mt-1">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('bg-bg-secondary border border-line rounded-lg overflow-hidden transition-all duration-normal ease-smooth hover:border-neutral-600 hover:shadow-lg', className)}>
        {/* 統一されたアスペクト比（4:3） */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        {/* コンテンツ */}
        <div className="p-4 sm:p-6">
          {/* ヘッダー */}
          <div className="flex items-start justify-between mb-3">
            <Badge variant="outline" size="sm">
              {product.category}
            </Badge>
            {!product.inStock && (
              <Badge variant="secondary" size="sm">
                在庫切れ
              </Badge>
            )}
          </div>

          {/* 商品名 */}
          <h3 className="text-lg font-display font-bold text-fg mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* 説明 */}
          <p className="text-fg-muted text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* 価格 */}
          <div className="mb-4">
            <p className="text-xl sm:text-2xl font-bold text-fg">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* 仕様 */}
          {product.specs && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-fg mb-2">仕様</h4>
              <div className="space-y-1">
                {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-fg-muted">{key}:</span>
                    <span className="text-fg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 素材 */}
          {product.materials && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-fg mb-2">素材</h4>
              <div className="flex flex-wrap gap-1">
                {product.materials.slice(0, 3).map((material) => (
                  <Badge key={material} variant="default" size="sm">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="sm"
              className="flex-1 min-h-[44px]"
              onClick={() => onViewDetails?.(product.id)}
            >
              詳細を見る
            </Button>
            {product.inStock && (
              <Button
                variant="secondary"
                size="sm"
                className="min-h-[44px]"
                onClick={() => onAddToCart?.(product.id)}
              >
                カートに追加
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // デフォルトバリアント
  return (
    <div className={cn('bg-bg-secondary border border-line rounded-lg overflow-hidden transition-all duration-normal ease-smooth hover:border-neutral-600 hover:shadow-lg', className)}>
      {/* 統一されたアスペクト比（4:3） */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-normal ease-smooth group-hover:scale-105"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        {/* カテゴリ */}
        <div className="mb-2">
          <Badge variant="outline" size="sm">
            {product.category}
          </Badge>
        </div>

        {/* 商品名 */}
        <h3 className="font-display font-bold text-fg mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* 説明 */}
        <p className="text-fg-muted text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* 価格 */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-fg">
            {formatPrice(product.price)}
          </p>
          {!product.inStock && (
            <Badge variant="secondary" size="sm">
              在庫切れ
            </Badge>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 min-h-[44px]"
            onClick={() => onViewDetails?.(product.id)}
          >
            詳細を見る
          </Button>
          {product.inStock && (
            <Button
              variant="secondary"
              size="sm"
              className="min-h-[44px]"
              onClick={() => onAddToCart?.(product.id)}
            >
              カートに追加
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
