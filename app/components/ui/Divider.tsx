import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Dividerコンポーネントのプロパティ
 */
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'light' | 'dark'
}

/**
 * Dividerコンポーネント
 * セクションやコンテンツを区切るための区切り線
 */
export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  size = 'md',
  color = 'default',
  className,
  ...props
}) => {
  const variantClasses = {
    horizontal: 'w-full',
    vertical: 'h-full w-px'
  }

  const sizeClasses = {
    sm: variant === 'horizontal' ? 'h-px' : 'w-px',
    md: variant === 'horizontal' ? 'h-0.5' : 'w-0.5',
    lg: variant === 'horizontal' ? 'h-1' : 'w-1'
  }

  const colorClasses = {
    default: 'bg-line',
    light: 'bg-line-light',
    dark: 'bg-line-dark'
  }

  return (
    <div
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    />
  )
}
