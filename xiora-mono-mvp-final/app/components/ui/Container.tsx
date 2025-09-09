import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Containerコンポーネントのプロパティ
 */
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

/**
 * レスポンシブなContainerコンポーネント
 * デザインシステムに基づいた一貫したレイアウトを提供
 */
export const Container: React.FC<ContainerProps> = ({
  size = 'md',
  as: Component = 'div',
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl mx-auto px-4',
    md: 'max-w-4xl mx-auto px-6',
    lg: 'max-w-6xl mx-auto px-8',
    xl: 'max-w-7xl mx-auto px-8',
    full: 'w-full px-4'
  }

  return (
    <Component
      className={cn(sizeClasses[size], className)}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}
