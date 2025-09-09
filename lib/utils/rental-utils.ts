// レンタル予約システム用のユーティリティ関数

import { RentalItem, RentalPricing, PricingCalculation, AvailabilityPeriod } from '@/lib/types/rental'

/**
 * 日付の差分を計算（日数）
 */
export function calculateDaysDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * 日付が有効かチェック
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * 開始日が終了日より前かチェック
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return false
  }
  const start = new Date(startDate)
  const end = new Date(endDate)
  return start < end
}

/**
 * 最小レンタル期間をチェック
 */
export function checkMinimumDuration(startDate: string, endDate: string, minDays: number = 1): boolean {
  const days = calculateDaysDifference(startDate, endDate)
  return days >= minDays
}

/**
 * 料金を計算
 */
export function calculatePricing(
  item: RentalItem,
  startDate: string,
  endDate: string,
  pricingRules?: RentalPricing[]
): PricingCalculation {
  const totalDays = calculateDaysDifference(startDate, endDate)
  
  // 基本料金を決定
  let dailyRate = item.daily_rate
  
  // 期間別料金を適用
  if (pricingRules && pricingRules.length > 0) {
    const applicablePricing = pricingRules.find(rule => {
      if (rule.pricing_type === 'seasonal' && rule.start_date && rule.end_date) {
        const ruleStart = new Date(rule.start_date)
        const ruleEnd = new Date(rule.end_date)
        const bookingStart = new Date(startDate)
        const bookingEnd = new Date(endDate)
        
        // 予約期間が料金ルール期間と重複するかチェック
        return bookingStart <= ruleEnd && bookingEnd >= ruleStart
      }
      
      if (rule.pricing_type === 'weekly' && totalDays >= 7) {
        return totalDays >= (rule.minimum_duration || 7)
      }
      
      if (rule.pricing_type === 'monthly' && totalDays >= 30) {
        return totalDays >= (rule.minimum_duration || 30)
      }
      
      return false
    })
    
    if (applicablePricing) {
      dailyRate = applicablePricing.rate
    }
  }
  
  // 小計を計算
  const subtotal = dailyRate * totalDays
  
  // デポジット
  const depositAmount = item.deposit_amount
  
  // 税金（8%と仮定）
  const taxAmount = subtotal * 0.08
  
  // 合計
  const totalAmount = subtotal + taxAmount + depositAmount
  
  return {
    daily_rate: dailyRate,
    total_days: totalDays,
    subtotal,
    deposit_amount: depositAmount,
    tax_amount: taxAmount,
    total_amount: totalAmount
  }
}

/**
 * 予約番号を生成
 */
export function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `RENTAL-${timestamp}-${random}`.toUpperCase()
}

/**
 * 利用可能期間をチェック
 */
export function checkAvailability(
  item: RentalItem,
  startDate: string,
  endDate: string,
  existingBookings: Array<{ start_date: string; end_date: string; status: string }>
): AvailabilityPeriod {
  // 商品が利用可能かチェック
  if (item.availability_status !== 'available') {
    return {
      start_date: startDate,
      end_date: endDate,
      is_available: false,
      conflicting_bookings: []
    }
  }
  
  // 既存の予約との競合をチェック
  const conflictingBookings: string[] = []
  const requestedStart = new Date(startDate)
  const requestedEnd = new Date(endDate)
  
  for (const booking of existingBookings) {
    if (['confirmed', 'active'].includes(booking.status)) {
      const bookingStart = new Date(booking.start_date)
      const bookingEnd = new Date(booking.end_date)
      
      // 日付の重複をチェック
      if (
        (requestedStart <= bookingEnd && requestedEnd >= bookingStart) ||
        (bookingStart <= requestedEnd && bookingEnd >= requestedStart)
      ) {
        conflictingBookings.push(booking.start_date)
      }
    }
  }
  
  const isAvailable = conflictingBookings.length === 0
  
  return {
    start_date: startDate,
    end_date: endDate,
    is_available: isAvailable,
    conflicting_bookings: conflictingBookings
  }
}

/**
 * 日付をフォーマット
 */
export function formatDate(date: string | Date, format: 'short' | 'long' | 'iso' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'iso') {
    return dateObj.toISOString().split('T')[0]
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }
  
  return dateObj.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * 時間をフォーマット
 */
export function formatTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * 料金をフォーマット
 */
export function formatPrice(price: number, currency: string = 'JPY'): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency
  }).format(price)
}

/**
 * 期間を人間が読みやすい形式でフォーマット
 */
export function formatDuration(startDate: string, endDate: string): string {
  const days = calculateDaysDifference(startDate, endDate)
  
  if (days === 1) return '1日'
  if (days < 7) return `${days}日間`
  if (days < 30) return `${Math.floor(days / 7)}週間${days % 7 > 0 ? ` ${days % 7}日` : ''}`
  
  const months = Math.floor(days / 30)
  const remainingDays = days % 30
  
  if (remainingDays === 0) return `${months}ヶ月`
  return `${months}ヶ月${remainingDays}日`
}

/**
 * 利用可能な時間帯を取得
 */
export function getAvailableTimeSlots(): Array<{ value: string; label: string }> {
  return [
    { value: '09:00', label: '9:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' }
  ]
}

/**
 * 最小予約日数を取得
 */
export function getMinimumRentalDays(category?: string): number {
  const categoryMinDays: Record<string, number> = {
    'camera': 1,
    'lighting': 1,
    'audio': 1,
    'props': 1,
    'default': 1
  }
  
  return categoryMinDays[category || 'default'] || 1
}

/**
 * 最大予約日数を取得
 */
export function getMaximumRentalDays(category?: string): number {
  const categoryMaxDays: Record<string, number> = {
    'camera': 90,
    'lighting': 90,
    'audio': 90,
    'props': 90,
    'default': 90
  }
  
  return categoryMaxDays[category || 'default'] || 90
}

/**
 * 予約可能な日付範囲を取得（今日から最大予約日数後まで）
 */
export function getAvailableDateRange(category?: string): { min: string; max: string } {
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 1) // 明日から予約可能
  
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + getMaximumRentalDays(category))
  
  return {
    min: minDate.toISOString().split('T')[0],
    max: maxDate.toISOString().split('T')[0]
  }
}

/**
 * 予約ステータスの日本語表示
 */
export function getBookingStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'pending': '予約待ち',
    'confirmed': '予約確定',
    'active': 'レンタル中',
    'completed': '完了',
    'cancelled': 'キャンセル'
  }
  
  return statusLabels[status] || status
}

/**
 * 支払いステータスの日本語表示
 */
export function getPaymentStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'pending': '支払い待ち',
    'paid': '支払い完了',
    'partially_paid': '一部支払い',
    'refunded': '返金済み'
  }
  
  return statusLabels[status] || status
}

/**
 * 利用可能状況の日本語表示
 */
export function getAvailabilityStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'available': '利用可能',
    'rented': 'レンタル中',
    'maintenance': 'メンテナンス中',
    'unavailable': '利用不可'
  }
  
  return statusLabels[status] || status
}
