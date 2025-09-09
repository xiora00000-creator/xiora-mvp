import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Sectionコンポーネントのプロパティ
 */
interface SectionProps {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
  variant?: 'default' | 'secondary' | 'accent'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

/**
 * セクション用のSectionコンポーネント
 * 一貫したスペーシングとスタイリングを提供
 */
export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  spacing = 'md',
  as: Component = 'section',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-bg',
    secondary: 'bg-bg-secondary',
    accent: 'bg-neutral-900'
  }

  const spacingClasses = {
    sm: 'py-12',
    md: 'py-section',
    lg: 'py-24',
    xl: 'py-32'
  }

  return (
    <Component
      className={cn(
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}
