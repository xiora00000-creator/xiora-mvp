"use client"

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Buttonコンポーネントのプロパティ
 */
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-pressed'?: boolean
}

/**
 * Buttonコンポーネント
 * アクセシビリティ対応のボタン
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  asChild = false,
  disabled = false,
  loading = false,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-normal ease-smooth focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]'
  
  const variantClasses = {
    primary: 'bg-fg text-bg hover:bg-fg-secondary active:scale-95',
    secondary: 'bg-bg-secondary text-fg border border-line hover:bg-neutral-800 hover:border-neutral-600 active:scale-95',
    ghost: 'text-fg hover:bg-bg-secondary active:scale-95',
    danger: 'bg-error text-bg hover:bg-error-dark active:scale-95'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px] min-w-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px] min-w-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[48px] min-w-[48px]'
  }

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  // ローディング状態の処理
  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.()
  }

  // アクセシビリティ属性の構築
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-pressed': ariaPressed,
    'aria-disabled': disabled || loading,
    'aria-busy': loading
  }

  // asChildがtrueの場合、子要素をクローン
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any
    return React.cloneElement(children, {
      className: cn(buttonClasses, childProps.className),
      disabled: disabled || loading,
      onClick: handleClick,
      type,
      ...accessibilityProps,
      ...props,
      ...childProps
    } as any)
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      {...accessibilityProps}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
