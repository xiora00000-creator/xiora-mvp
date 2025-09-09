import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'
import { Button } from './Button'

/**
 * 記事のプロパティ
 */
interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  publishedAt: string
  readTime: number
  slug: string
}

/**
 * ArticleCardコンポーネントのプロパティ
 */
interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'minimal'
  className?: string
  priority?: boolean
  onReadMore?: (slug: string) => void
}

/**
 * ArticleCardコンポーネント
 * ブログ用の記事カード（next/image最適化）
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'default',
  className,
  priority = false,
  onReadMore
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
            src={article.image}
            alt={article.title}
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
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm">
              {article.category}
            </Badge>
            <span className="text-xs text-fg-muted">
              {article.readTime}分
            </span>
          </div>
          <h3 className="font-medium text-fg group-hover:text-fg-secondary transition-colors duration-normal ease-smooth line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-fg-muted mt-1">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className={cn('bg-bg-secondary border border-line rounded-lg overflow-hidden transition-all duration-normal ease-smooth hover:border-neutral-600 hover:shadow-lg', className)}>
        {/* 統一されたアスペクト比（4:3） */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
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
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary" size="sm">
              {article.category}
            </Badge>
            <span className="text-sm text-fg-muted">
              {article.readTime}分で読める
            </span>
          </div>

          {/* タイトル */}
          <h3 className="text-xl sm:text-2xl font-display font-bold text-fg mb-3 line-clamp-2">
            {article.title}
          </h3>

          {/* 抜粋 */}
          <p className="text-fg-muted text-base mb-6 line-clamp-3">
            {article.excerpt}
          </p>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* フッター */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {article.author.avatar && (
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                    quality={85}
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-fg">
                  {article.author.name}
                </p>
                <p className="text-xs text-fg-muted">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="min-h-[44px]"
              onClick={() => onReadMore?.(article.slug)}
            >
              続きを読む
            </Button>
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
          src={article.image}
          alt={article.title}
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
        {/* ヘッダー */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" size="sm">
            {article.category}
          </Badge>
          <span className="text-xs text-fg-muted">
            {article.readTime}分
          </span>
        </div>

        {/* タイトル */}
        <h3 className="font-display font-bold text-fg mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* 抜粋 */}
        <p className="text-fg-muted text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* タグ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* フッター */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {article.author.avatar && (
              <div className="w-6 h-6 rounded-full overflow-hidden relative">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                  quality={85}
                />
              </div>
            )}
            <span className="text-xs text-fg-muted">
              {article.author.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="min-h-[44px]"
            onClick={() => onReadMore?.(article.slug)}
          >
            続きを読む
          </Button>
        </div>
      </div>
    </div>
  )
}
