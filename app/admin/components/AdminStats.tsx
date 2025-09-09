'use client'

import { useEffect, useState } from 'react'
import { Caption } from '../../components/ui/Typography'

interface Stats {
  users: number
  products: number
  contacts: number
  reservations: number
}

interface AdminStatsResponse {
  stats: Stats
  timestamp: string
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/admin/api/stats')
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        
        const data: AdminStatsResponse = await response.json()
        setStats(data.stats)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    
    // 5分ごとに更新
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-neutral-200">
            <div className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-8 bg-neutral-200 rounded mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-neutral-200">
            <Caption className="text-neutral-500 mb-2">エラー</Caption>
            <div className="text-3xl font-bold text-red-600">--</div>
            <div className="text-sm text-neutral-500 mt-2">データ取得失敗</div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <Caption className="text-neutral-500 mb-2">総ユーザー数</Caption>
        <div className="text-3xl font-bold text-black">{stats.users.toLocaleString()}</div>
        <div className="text-sm text-green-600 mt-2">+12% 今月</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <Caption className="text-neutral-500 mb-2">総商品数</Caption>
        <div className="text-3xl font-bold text-black">{stats.products.toLocaleString()}</div>
        <div className="text-sm text-blue-600 mt-2">+8% 今月</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <Caption className="text-neutral-500 mb-2">お問い合わせ</Caption>
        <div className="text-3xl font-bold text-black">{stats.contacts.toLocaleString()}</div>
        <div className="text-sm text-orange-600 mt-2">+5% 今月</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <Caption className="text-neutral-500 mb-2">予約数</Caption>
        <div className="text-3xl font-bold text-black">{stats.reservations.toLocaleString()}</div>
        <div className="text-sm text-purple-600 mt-2">+15% 今月</div>
      </div>
    </div>
  )
}
