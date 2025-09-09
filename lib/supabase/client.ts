import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// メインクライアント（匿名キー使用）
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'xiora-web-app'
    }
  }
})

// サービスロールキーを使用した管理者クライアント
export const createServiceClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// 開発環境用のローカルクライアント
export const createLocalClient = () => {
  const localUrl = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL || 'http://localhost:54321'
  const localAnonKey = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
  
  return createClient<Database>(localUrl, localAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// 環境に応じたクライアントの取得
export const getSupabaseClient = () => {
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_LOCAL_SUPABASE === 'true') {
    return createLocalClient()
  }
  return supabase
}

// クライアント設定の検証
export const validateSupabaseConfig = () => {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
  
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.error('Missing required Supabase environment variables:', missingVars)
    return false
  }
  
  return true
}

// 接続状態の確認
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('system_settings').select('version').limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Failed to check Supabase connection:', error)
    return false
  }
}

// デフォルトエクスポート
export default supabase
