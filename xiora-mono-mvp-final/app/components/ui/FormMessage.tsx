import React from 'react'
import { cn } from '@/lib/utils'

/**
 * FormMessageコンポーネントのプロパティ
 */
interface FormMessageProps {
  children?: React.ReactNode
  type?: 'error' | 'success' | 'warning' | 'info'
  className?: string
}

/**
 * FormMessageコンポーネント
 * Zodとの連携を想定したフォームメッセージ表示
 */
export const FormMessage: React.FC<FormMessageProps> = ({
  children,
  type = 'error',
  className
}) => {
  if (!children) return null

  const typeClasses = {
    error: 'text-red-500 bg-red-500/10 border-red-500/20',
    success: 'text-green-500 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    info: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
  }

  const iconClasses = {
    error: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'success':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      case 'info':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'flex items-start gap-2 px-3 py-2 rounded-md border text-sm',
        typeClasses[type],
        className
      )}
    >
      <div className={cn('flex-shrink-0 mt-0.5', iconClasses[type])}>
        {getIcon()}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
