import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Skeletonコンポーネントのプロパティ
 */
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  'aria-label'?: string
}

/**
 * Skeletonコンポーネント
 * アクセシビリティ対応のローディングプレースホルダー
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  'aria-label': ariaLabel = '読み込み中'
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        'bg-bg-secondary animate-pulse',
        variantClasses[variant],
        className
      )}
      style={style}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}

/**
 * SkeletonTextコンポーネント
 * テキスト用のスケルトン
 */
export const SkeletonText: React.FC<{
  lines?: number
  className?: string
  'aria-label'?: string
}> = ({
  lines = 1,
  className,
  'aria-label': ariaLabel = 'テキストを読み込み中'
}) => {
  return (
    <div
      className={cn('space-y-2', className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '75%' : '100%'}
          aria-label={`${index + 1}行目のテキストを読み込み中`}
        />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}

/**
 * SkeletonCardコンポーネント
 * カード用のスケルトン
 */
export const SkeletonCard: React.FC<{
  className?: string
  'aria-label'?: string
}> = ({
  className,
  'aria-label': ariaLabel = 'カードを読み込み中'
}) => {
  return (
    <div
      className={cn('bg-bg-secondary border border-line rounded-lg p-6', className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {/* 画像スケルトン */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        className="mb-4"
        aria-label="画像を読み込み中"
      />
      
      {/* タイトルスケルトン */}
      <Skeleton
        variant="text"
        width="80%"
        height={24}
        className="mb-3"
        aria-label="タイトルを読み込み中"
      />
      
      {/* 説明スケルトン */}
      <SkeletonText
        lines={3}
        className="mb-4"
        aria-label="説明文を読み込み中"
      />
      
      {/* ボタンスケルトン */}
      <div className="flex gap-2">
        <Skeleton
          variant="rectangular"
          width={100}
          height={40}
          aria-label="ボタンを読み込み中"
        />
        <Skeleton
          variant="rectangular"
          width={80}
          height={40}
          aria-label="ボタンを読み込み中"
        />
      </div>
      
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}

/**
 * SkeletonAvatarコンポーネント
 * アバター用のスケルトン
 */
export const SkeletonAvatar: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
}> = ({
  size = 'md',
  className,
  'aria-label': ariaLabel = 'アバターを読み込み中'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
      aria-label={ariaLabel}
    />
  )
}

/**
 * SkeletonTableコンポーネント
 * テーブル用のスケルトン
 */
export const SkeletonTable: React.FC<{
  rows?: number
  columns?: number
  className?: string
  'aria-label'?: string
}> = ({
  rows = 5,
  columns = 4,
  className,
  'aria-label': ariaLabel = 'テーブルを読み込み中'
}) => {
  return (
    <div
      className={cn('space-y-2', className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {/* ヘッダー行 */}
      <div className="flex gap-4 pb-2 border-b border-line">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={`header-${index}`}
            variant="text"
            width={100}
            height={20}
            aria-label={`${index + 1}列目のヘッダーを読み込み中`}
          />
        ))}
      </div>
      
      {/* データ行 */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text"
              width={80}
              height={16}
              aria-label={`${rowIndex + 1}行目${colIndex + 1}列目のデータを読み込み中`}
            />
          ))}
        </div>
      ))}
      
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}
