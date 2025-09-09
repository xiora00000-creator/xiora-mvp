'use client'

import { useEffect, useState } from 'react'
import { H2, Body, Caption } from '../../components/ui/Typography'

interface Activity {
  id: string
  action: string
  table_name: string | null
  record_id: string | null
  created_at: string
}

interface ActivitiesResponse {
  recentActivities: Activity[]
  timestamp: string
}

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch('/admin/api/stats')
        
        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }
        
        const data: ActivitiesResponse = await response.json()
        setActivities(data.recentActivities || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
    
    // 1分ごとに更新
    const interval = setInterval(fetchActivities, 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return '今'
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    return `${Math.floor(diffInMinutes / 1440)}日前`
  }

  const getActionDisplayName = (action: string) => {
    const actionMap: Record<string, string> = {
      'create': '作成',
      'update': '更新',
      'delete': '削除',
      'login': 'ログイン',
      'logout': 'ログアウト',
      'view': '閲覧',
      'export': 'エクスポート',
      'import': 'インポート'
    }
    return actionMap[action] || action
  }

  const getTableDisplayName = (tableName: string | null) => {
    if (!tableName) return 'システム'
    
    const tableMap: Record<string, string> = {
      'users': 'ユーザー',
      'products': '商品',
      'contacts': 'お問い合わせ',
      'reservations': '予約',
      'blog_posts': 'ブログ記事',
      'categories': 'カテゴリ'
    }
    return tableMap[tableName] || tableName
  }

  if (loading) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200">
        <H2 className="mb-4">最近のアクティビティ</H2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-100">
              <div className="animate-pulse">
                <div className="h-4 bg-neutral-200 rounded mb-1 w-32"></div>
                <div className="h-3 bg-neutral-200 rounded w-24"></div>
              </div>
              <div className="h-3 bg-neutral-200 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200">
        <H2 className="mb-4">最近のアクティビティ</H2>
        <div className="text-center py-8">
          <Body className="text-red-600 mb-2">データの取得に失敗しました</Body>
          <Caption className="text-neutral-500">{error}</Caption>
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200">
        <H2 className="mb-4">最近のアクティビティ</H2>
        <div className="text-center py-8">
          <Body className="text-neutral-600">まだアクティビティがありません</Body>
          <Caption className="text-neutral-500">システムの使用を開始すると、ここに表示されます</Caption>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200">
      <H2 className="mb-4">最近のアクティビティ</H2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
            <div>
              <Body className="font-medium">
                {getActionDisplayName(activity.action)}
                {activity.table_name && ` - ${getTableDisplayName(activity.table_name)}`}
              </Body>
              {activity.record_id && (
                <Caption className="text-neutral-500">
                  ID: {activity.record_id}
                </Caption>
              )}
            </div>
            <Caption className="text-neutral-500">
              {formatTimeAgo(activity.created_at)}
            </Caption>
          </div>
        ))}
      </div>
    </div>
  )
}
