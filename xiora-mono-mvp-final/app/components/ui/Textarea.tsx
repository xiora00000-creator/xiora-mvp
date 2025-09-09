import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Textareaコンポーネントのプロパティ
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  rows?: number
}

/**
 * Textareaコンポーネント
 * タップ領域最適化とレスポンシブ対応
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  rows = 4,
  className,
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-2">
      {/* ラベル */}
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-fg"
        >
          {label}
        </label>
      )}

      {/* テキストエリア */}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full bg-bg-secondary border border-line text-fg px-3 py-3 rounded-md transition-all duration-normal ease-smooth focus:border-fg focus:outline-none resize-vertical min-h-[44px]',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />

      {/* エラーメッセージ */}
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* ヘルパーテキスト */}
      {helperText && !error && (
        <p className="text-sm text-fg-muted">
          {helperText}
        </p>
      )}
    </div>
  )
}
