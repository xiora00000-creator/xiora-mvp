import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Cardコンポーネントのプロパティ
 */
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  className?: string
  style?: React.CSSProperties
}

/**
 * Cardコンポーネント
 * サーバーコンポーネント化されたカード
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  style
}) => {
  const variantClasses = {
    default: 'bg-bg-secondary border border-line',
    elevated: 'bg-bg-secondary border border-line shadow-lg',
    outlined: 'bg-transparent border-2 border-line'
  }

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all duration-normal ease-smooth',
        variantClasses[variant],
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

/**
 * CardHeaderコンポーネント
 */
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

/**
 * CardTitleコンポーネント
 */
export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <h3 className={cn('text-xl font-display font-bold text-fg mb-2', className)}>
    {children}
  </h3>
)

/**
 * CardDescriptionコンポーネント
 */
export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <p className={cn('text-fg-muted leading-relaxed', className)}>
    {children}
  </p>
)

/**
 * CardContentコンポーネント
 */
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('', className)}>
    {children}
  </div>
)

/**
 * CardFooterコンポーネント
 */
export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('mt-4 pt-4 border-t border-line', className)}>
    {children}
  </div>
)
