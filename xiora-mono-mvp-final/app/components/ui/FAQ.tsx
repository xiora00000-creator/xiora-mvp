"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

/**
 * FAQアイテムのプロパティ
 */
interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

/**
 * FAQコンポーネントのプロパティ
 */
interface FAQProps {
  items: FAQItem[]
  title?: string
  description?: string
  className?: string
}

/**
 * FAQコンポーネント
 * アコーディオン形式でよくある質問を表示
 */
export const FAQ: React.FC<FAQProps> = ({
  items,
  title,
  description,
  className
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={cn('w-full', className)}>
      {/* ヘッダー */}
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-2xl font-display font-bold text-fg mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-fg-muted max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* FAQアイテム */}
      <div className="space-y-4">
        {items.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 個別のFAQアイテム
 */
const FAQItem: React.FC<{
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border border-line rounded-lg bg-bg-secondary overflow-hidden">
      {/* 質問 */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-900 transition-colors duration-normal ease-smooth"
      >
        <span className="font-medium text-fg pr-4">
          {item.question}
        </span>
        <ChevronDownIcon
          className={cn(
            'w-5 h-5 text-fg-muted transition-transform duration-normal ease-smooth',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* 回答 */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-normal ease-smooth',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 pb-4">
          <p className="text-fg-muted leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}
