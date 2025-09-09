import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Checkboxコンポーネントのプロパティ
 */
interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: React.ReactNode
  error?: string
  disabled?: boolean
  className?: string
}

/**
 * Checkboxコンポーネント
 * アクセシビリティ対応のチェックボックス
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  error,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className="block min-h-[44px] min-w-[44px] flex items-center cursor-pointer"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          aria-describedby={error ? `${id}-error` : undefined}
        />
        
        <div
          className={cn(
            'w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-normal ease-smooth',
            checked
              ? 'bg-fg border-fg'
              : 'bg-bg-secondary border-line hover:border-fg-secondary',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-bg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        
        <span className="ml-3 text-fg">{label}</span>
      </label>
      
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-error ml-9"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
