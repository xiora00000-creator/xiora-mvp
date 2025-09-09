"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Masonry from 'react-masonry-css'

/**
 * Galleryアイテムのプロパティ
 */
interface GalleryItem {
  id: string
  title: string
  description?: string
  image: string
  category?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  priority?: boolean
}

/**
 * Galleryコンポーネントのプロパティ
 */
interface GalleryProps {
  items: GalleryItem[]
  columns?: number
  gap?: number
  className?: string
}

/**
 * Masonryレイアウトを使用したGalleryコンポーネント
 * next/imageによるパフォーマンス最適化
 */
export const Gallery: React.FC<GalleryProps> = ({
  items,
  columns = 3,
  gap = 24,
  className
}) => {
  // レスポンシブブレークポイントでの列数最適化
  const breakpointColumns = {
    default: columns,
    1200: Math.min(columns, 3), // lg
    768: Math.min(columns, 2),  // md
    640: Math.min(columns, 2),  // sm
    480: 1                       // xs
  }

  return (
    <div className={cn('w-full', className)}>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
        style={{ '--masonry-gap': `${gap}px` } as React.CSSProperties}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="mb-6 break-inside-avoid"
            style={{ marginBottom: `${gap}px` }}
          >
            <GalleryItem item={item} index={index} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}

/**
 * 個別のGalleryアイテム
 * next/imageによる最適化
 */
const GalleryItem: React.FC<{ item: GalleryItem; index: number }> = ({ item, index }) => {
  // 統一されたアスペクト比（4:3または1:1）
  const aspectRatioClasses = {
    square: 'aspect-square',           // 1:1
    portrait: 'aspect-[4/3]',         // 4:3
    landscape: 'aspect-[4/3]',        // 4:3
    wide: 'aspect-[4/3]'              // 4:3
  }

  // レスポンシブsizes設定
  const sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'

  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg bg-bg-secondary border border-line transition-all duration-normal ease-smooth hover:border-neutral-600 hover:shadow-lg hover:-translate-y-1">
      {/* 画像 - next/imageによる最適化 */}
      <div className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[item.aspectRatio || 'square']
      )}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={sizes}
          priority={item.priority || index < 3} // 最初の3枚は優先読み込み
          className="object-cover transition-transform duration-normal ease-smooth group-hover:scale-105"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-normal ease-smooth" />
        
        {/* カテゴリバッジ */}
        {item.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2 py-1 bg-fg text-bg text-xs font-medium rounded-full">
              {item.category}
            </span>
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        <h3 className="font-medium text-fg mb-2 group-hover:text-fg-secondary transition-colors duration-normal ease-smooth line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-fg-muted line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}
