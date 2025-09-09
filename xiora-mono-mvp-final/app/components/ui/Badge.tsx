import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Badgeコンポーネントのプロパティ
 */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Badgeコンポーネント
 * ステータスやカテゴリを表示するための小さなラベル
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors'
  
  const variantClasses = {
    default: 'bg-neutral-800 text-fg border border-line',
    primary: 'bg-fg text-bg',
    secondary: 'bg-neutral-700 text-fg-secondary',
    outline: 'bg-transparent text-fg border border-line'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }
  
  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
