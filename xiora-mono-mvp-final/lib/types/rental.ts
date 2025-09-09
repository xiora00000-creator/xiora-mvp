// レンタル予約システム用の型定義

export interface RentalItem {
  id: string
  slug: string
  name: string
  description?: string
  category_id?: string
  daily_rate: number
  weekly_rate?: number
  monthly_rate?: number
  deposit_amount: number
  availability_status: 'available' | 'rented' | 'maintenance' | 'unavailable'
  condition_notes?: string
  images?: string[]
  specifications?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface RentalBooking {
  id: string
  booking_number: string
  customer_id?: string
  rental_item_id: string
  start_date: string
  end_date: string
  total_days: number
  daily_rate: number
  subtotal: number
  deposit_amount: number
  tax_amount: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'partially_paid' | 'refunded'
  pickup_location?: string
  return_location?: string
  special_requests?: string
  cancellation_reason?: string
  created_at: string
  updated_at: string
}

export interface RentalPricing {
  id: string
  rental_item_id: string
  pricing_type: 'daily' | 'weekly' | 'monthly' | 'seasonal'
  start_date?: string
  end_date?: string
  rate: number
  minimum_duration: number
  maximum_duration?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface RentalTerms {
  id: string
  title: string
  content: string
  version: string
  is_active: boolean
  effective_date: string
  created_at: string
}

export interface RentalInsurance {
  id: string
  name: string
  description?: string
  daily_rate: number
  coverage_amount: number
  deductible_amount: number
  is_active: boolean
  created_at: string
}

export interface RentalReview {
  id: string
  rental_item_id: string
  customer_id: string
  booking_id: string
  rating: number
  review_text?: string
  is_verified: boolean
  created_at: string
}

export interface RentalCategory {
  id: string
  slug: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

// 予約作成時のリクエスト型
export interface CreateBookingRequest {
  rental_item_id: string
  start_date: string
  end_date: string
  pickup_location?: string
  return_location?: string
  special_requests?: string
  insurance_id?: string
}

// 予約更新時のリクエスト型
export interface UpdateBookingRequest {
  start_date?: string
  end_date?: string
  pickup_location?: string
  return_location?: string
  special_requests?: string
  status?: RentalBooking['status']
}

// 料金計算結果の型
export interface PricingCalculation {
  daily_rate: number
  total_days: number
  subtotal: number
  deposit_amount: number
  tax_amount: number
  total_amount: number
  insurance_cost?: number
  discount_amount?: number
}

// 利用可能期間の型
export interface AvailabilityPeriod {
  start_date: string
  end_date: string
  is_available: boolean
  conflicting_bookings?: string[]
}

// 検索・フィルタリングの型
export interface RentalSearchFilters {
  category_id?: string
  min_price?: number
  max_price?: number
  start_date?: string
  end_date?: string
  availability_status?: RentalItem['availability_status']
  search_query?: string
}

// ページネーションの型
export interface PaginationParams {
  page: number
  limit: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

// APIレスポンスの型
export interface RentalApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface RentalListResponse {
  items: RentalItem[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// 予約ステータスの変更履歴
export interface BookingStatusHistory {
  id: string
  booking_id: string
  previous_status: RentalBooking['status']
  new_status: RentalBooking['status']
  changed_by: string
  reason?: string
  created_at: string
}

// レンタル商品の在庫状況
export interface RentalInventory {
  item_id: string
  total_quantity: number
  available_quantity: number
  rented_quantity: number
  maintenance_quantity: number
  unavailable_quantity: number
}

// レンタル料金の割引設定
export interface RentalDiscount {
  id: string
  name: string
  description?: string
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  minimum_duration?: number
  maximum_duration?: number
  start_date?: string
  end_date?: string
  is_active: boolean
  applicable_items?: string[] // 適用可能な商品IDの配列
}

// レンタル商品のメンテナンス記録
export interface RentalMaintenance {
  id: string
  rental_item_id: string
  maintenance_type: 'routine' | 'repair' | 'inspection' | 'cleaning'
  description: string
  start_date: string
  end_date?: string
  cost?: number
  performed_by?: string
  notes?: string
  created_at: string
}

// レンタル商品の損傷・事故記録
export interface RentalIncident {
  id: string
  rental_item_id: string
  booking_id?: string
  incident_type: 'damage' | 'accident' | 'theft' | 'loss'
  description: string
  incident_date: string
  reported_by: string
  estimated_cost?: number
  actual_cost?: number
  resolution?: string
  status: 'reported' | 'investigating' | 'resolved' | 'closed'
  created_at: string
  updated_at: string
}
