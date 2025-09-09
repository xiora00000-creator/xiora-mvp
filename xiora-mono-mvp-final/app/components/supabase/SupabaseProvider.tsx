'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, checkSupabaseConnection } from '@/lib/supabase/client'
import { validateSupabaseConfig } from '@/lib/supabase/client'

interface SupabaseContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isConnected: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (password: string) => Promise<{ error: any }>
  updateProfile: (updates: any) => Promise<{ error: any }>
  refreshSession: () => Promise<void>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

interface SupabaseProviderProps {
  children: ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  // 初期化時の処理
  useEffect(() => {
    // 設定の検証
    if (!validateSupabaseConfig()) {
      console.error('Invalid Supabase configuration')
      setLoading(false)
      return
    }

    // 接続状態の確認
    checkConnection()
    
    // セッションの取得
    getSession()
    
    // 認証状態の監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 接続状態の確認
  const checkConnection = async () => {
    try {
      const connected = await checkSupabaseConnection()
      setIsConnected(connected)
    } catch (error) {
      console.error('Failed to check connection:', error)
      setIsConnected(false)
    }
  }

  // セッションの取得
  const getSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting session:', error)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
      }
    } catch (error) {
      console.error('Failed to get session:', error)
    } finally {
      setLoading(false)
    }
  }

  // サインイン
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error }
    }
  }

  // サインアップ
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return { error }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error }
    }
  }

  // サインアウト
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  }

  // パスワードリセット
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      return { error }
    } catch (error) {
      console.error('Password reset error:', error)
      return { error }
    }
  }

  // パスワード更新
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      })
      return { error }
    } catch (error) {
      console.error('Password update error:', error)
      return { error }
    }
  }

  // プロフィール更新
  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase.auth.updateUser(updates)
      return { error }
    } catch (error) {
      console.error('Profile update error:', error)
      return { error }
    }
  }

  // セッションの更新
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error('Session refresh error:', error)
      } else if (data.session) {
        setSession(data.session)
        setUser(data.session.user)
      }
    } catch (error) {
      console.error('Failed to refresh session:', error)
    }
  }

  const contextValue: SupabaseContextType = {
    user,
    session,
    loading,
    isConnected,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshSession
  }

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  )
}

// カスタムフック
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

// 認証状態のみを使用するフック
export function useAuth() {
  const { user, session, loading, signIn, signUp, signOut, resetPassword, updatePassword, updateProfile } = useSupabase()
  
  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  }
}

// 接続状態のみを使用するフック
export function useConnection() {
  const { isConnected, loading } = useSupabase()
  
  return {
    isConnected,
    loading
  }
}
