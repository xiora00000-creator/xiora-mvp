import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './Button'

/**
 * Heroアクションのプロパティ
 */
interface HeroAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

/**
 * Heroコンポーネントのプロパティ
 */
interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  background?: 'default' | 'gradient' | 'image'
  backgroundImage?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Heroコンポーネント
 * パフォーマンス最適化されたヒーローセクション
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  background = 'default',
  backgroundImage,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'py-16',
    md: 'py-20',
    lg: 'py-32'
  }

  const titleSizeClasses = {
    sm: 'text-4xl sm:text-5xl',
    md: 'text-5xl sm:text-6xl',
    lg: 'text-6xl sm:text-7xl'
  }

  return (
    <section className={cn(
      'relative overflow-hidden',
      sizeClasses[size],
      className
    )}>
      {/* 背景 */}
      {background === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300" />
      )}
      
      {background === 'image' && backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* サブタイトル */}
          {subtitle && (
            <p className="text-lg sm:text-xl text-fg-muted mb-4 font-medium tracking-wide uppercase">
              {subtitle}
            </p>
          )}

          {/* メインタイトル */}
          <h1 className={cn(
            'font-display font-bold text-fg mb-6 leading-tight',
            titleSizeClasses[size]
          )}>
            {title}
          </h1>

          {/* 説明 */}
          {description && (
            <p className="text-lg sm:text-xl text-fg-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* アクションボタン */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryAction && (
                <Button
                  variant="primary"
                  size="lg"
                  asChild
                >
                  <a href={primaryAction.href}>
                    {primaryAction.label}
                  </a>
                </Button>
              )}
              
              {secondaryAction && (
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                >
                  <a href={secondaryAction.href}>
                    {secondaryAction.label}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
