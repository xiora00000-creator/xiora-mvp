import React from 'react'
import { cn } from '@/lib/utils'

/**
 * ステップアイテムのプロパティ
 */
interface StepItem {
  id: string
  number: number
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
}

/**
 * Stepsコンポーネントのプロパティ
 */
interface StepsProps {
  items: StepItem[]
  variant?: 'default' | 'vertical' | 'timeline'
  className?: string
}

/**
 * Stepsコンポーネント
 * ステップ形式のコンテンツを表示
 */
export const Steps: React.FC<StepsProps> = ({
  items,
  variant = 'default',
  className
}) => {
  if (variant === 'vertical') {
    return (
      <div className={cn('w-full', className)}>
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={item.id} className="flex gap-6">
              {/* ステップ番号 */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-fg text-bg flex items-center justify-center font-bold text-lg">
                  {item.number}
                </div>
              </div>

              {/* コンテンツ */}
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-fg mb-2">
                  {item.title}
                </h3>
                <p className="text-fg-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'timeline') {
    return (
      <div className={cn('w-full', className)}>
        <div className="relative">
          {/* タイムラインライン */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-line" />

          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={item.id} className="relative flex gap-6">
                {/* ステップ番号 */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-fg text-bg flex items-center justify-center font-bold text-lg relative z-10">
                    {item.number}
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-display font-bold text-fg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-fg-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // デフォルトバリアント（水平）
  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="text-center">
            {/* ステップ番号 */}
            <div className="w-16 h-16 rounded-full bg-fg text-bg flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              {item.number}
            </div>

            {/* タイトル */}
            <h3 className="text-lg font-display font-bold text-fg mb-3">
              {item.title}
            </h3>

            {/* 説明 */}
            <p className="text-fg-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
