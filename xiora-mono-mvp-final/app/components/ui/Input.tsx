import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Inputコンポーネントのプロパティ
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

/**
 * Inputコンポーネント
 * タップ領域最適化とレスポンシブ対応
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-2">
      {/* ラベル */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-fg"
        >
          {label}
        </label>
      )}

      {/* 入力フィールド */}
      <div className="relative">
        {/* 左アイコン */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fg-muted">
            {leftIcon}
          </div>
        )}

        {/* 入力要素 */}
        <input
          id={inputId}
          className={cn(
            'w-full bg-bg-secondary border border-line text-fg transition-all duration-normal ease-smooth focus:border-fg focus:outline-none resize-none min-h-[44px]',
            'px-3 py-3',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />

        {/* 右アイコン */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fg-muted">
            {rightIcon}
          </div>
        )}
      </div>

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
