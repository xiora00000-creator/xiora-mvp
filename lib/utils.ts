import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * クラス名を結合するユーティリティ関数
 * Tailwind CSSのクラス名の競合を適切に解決します
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
