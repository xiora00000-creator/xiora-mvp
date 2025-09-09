import { createClient } from '@supabase/supabase-js'

// 環境変数のチェック
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が設定されていない場合はダミークライアントを作成
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://dummy.supabase.co', 'dummy-key')

// 管理者用クライアント（サービスロールキー使用）
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return createClient('https://dummy.supabase.co', 'dummy-key')
  }
  return createClient(supabaseUrl, serviceRoleKey)
}

// データベースの型定義
export interface ContactForm {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  purpose: 'inquiry' | 'quote' | 'support' | 'other'
  message: string
  status: 'new' | 'in_progress' | 'completed' | 'spam'
  created_at?: string
  updated_at?: string
}

export interface ReservationForm {
  id?: string
  name: string
  email: string
  company?: string
  phone: string
  equipment_type: 'camera' | 'lighting' | 'audio' | 'other'
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  purpose: string
  special_requirements?: string
  terms_accepted: boolean
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  created_at?: string
  updated_at?: string
}

// データベーステーブル名
export const TABLES = {
  CONTACTS: 'contacts',
  RESERVATIONS: 'reservations',
  EQUIPMENT: 'equipment',
  USERS: 'users'
} as const
