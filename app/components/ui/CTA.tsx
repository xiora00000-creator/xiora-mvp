import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { H2, Body } from './Typography'

/**
 * CTAコンポーネントのプロパティ
 */
interface CTAProps {
  title: string
  description?: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  variant?: 'default' | 'centered' | 'split'
  background?: 'default' | 'secondary' | 'accent'
  className?: string
}

/**
 * CTA（Call to Action）セクション用のCTAコンポーネント
 * ユーザーの行動を促すセクションを提供
 */
export const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  background = 'default',
  className
}) => {
  const backgroundClasses = {
    default: 'bg-bg',
    secondary: 'bg-bg-secondary',
    accent: 'bg-neutral-900'
  }

  const variantClasses = {
    default: 'text-left',
    centered: 'text-center',
    split: 'text-left md:text-center'
  }

  return (
    <section className={cn(
      'py-section',
      backgroundClasses[background],
      className
    )}>
      <div className="container-wide">
        <div className={cn(
          'max-w-4xl mx-auto',
          variantClasses[variant]
        )}>
          {/* コンテンツ */}
          <div className="mb-8">
            <H2 className="mb-4">
              {title}
            </H2>
            {description && (
              <Body className="text-fg-muted">
                {description}
              </Body>
            )}
          </div>

          {/* アクションボタン */}
          <div className={cn(
            'flex flex-col sm:flex-row gap-4',
            variant === 'centered' ? 'justify-center' : 'justify-start'
          )}>
            <Button size="lg" asChild>
              <a href={primaryAction.href}>
                {primaryAction.label}
              </a>
            </Button>
            {secondaryAction && (
              <Button variant="secondary" size="lg" asChild>
                <a href={secondaryAction.href}>
                  {secondaryAction.label}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
