import React from 'react'
import { cn } from '@/lib/utils'

/**
 * LoadingSpinnerコンポーネントのプロパティ
 */
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
  'aria-label'?: string
}

/**
 * LoadingSpinnerコンポーネント
 * アクセシビリティ対応のローディング表示
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  'aria-label': ariaLabel = '読み込み中'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const variantClasses = {
    default: 'text-fg',
    primary: 'text-bg',
    secondary: 'text-fg-secondary'
  }

  return (
    <div
      className={cn('inline-block', className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <svg
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}

/**
 * LoadingDotsコンポーネント
 * ドットアニメーションによるローディング表示
 */
export const LoadingDots: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = ({
  size = 'md',
  className,
  'aria-label': ariaLabel = '読み込み中'
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <div
        className={cn(
          'bg-fg rounded-full animate-pulse',
          sizeClasses[size]
        )}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={cn(
          'bg-fg rounded-full animate-pulse',
          sizeClasses[size]
        )}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={cn(
          'bg-fg rounded-full animate-pulse',
          sizeClasses[size]
        )}
        style={{ animationDelay: '300ms' }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}

/**
 * LoadingBarコンポーネント
 * バーアニメーションによるローディング表示
 */
export const LoadingBar: React.FC<{
  className?: string
  'aria-label'?: string
}> = ({
  className,
  'aria-label': ariaLabel = '読み込み中'
}) => {
  return (
    <div
      className={cn('w-full bg-bg-secondary rounded-full overflow-hidden', className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={undefined}
      aria-valuetext="読み込み中"
    >
      <div className="h-2 bg-fg rounded-full animate-pulse" />
    </div>
  )
}
