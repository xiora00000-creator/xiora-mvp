import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Fieldコンポーネントのプロパティ
 */
interface FieldProps {
  children: React.ReactNode
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  className?: string
}

/**
 * Fieldコンポーネント
 * フォームフィールドのラッパー
 */
export const Field: React.FC<FieldProps> = ({
  children,
  label,
  error,
  helperText,
  required = false,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {/* ラベル */}
      {label && (
        <label className="block text-sm font-medium text-fg">
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      {/* フィールドコンテンツ */}
      {children}

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
