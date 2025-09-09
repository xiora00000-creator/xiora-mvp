import { NextResponse } from 'next/server'
import { sbAdminCount, sbAdminGet } from '@/lib/supabase-server'

/**
 * 管理者ダッシュボード用の統計データを取得するAPI
 * Service Role Keyを使用してデータベースにアクセス
 */
export async function GET() {
  try {
    // 各テーブルの統計データを取得
    const [userCount, productCount, contactCount, reservationCount] = await Promise.all([
      sbAdminCount('users'),
      sbAdminCount('products'),
      sbAdminCount('contacts'),
      sbAdminCount('reservations')
    ])

    // 最近のアクティビティを取得
    const recentActivities = await sbAdminGet('audit_logs', {
      select: 'action,table_name,record_id,created_at',
      orderBy: { column: 'created_at', ascending: false },
      limit: 10
    })

    // 統計データを返す
    return NextResponse.json({
      stats: {
        users: userCount,
        products: productCount,
        contacts: contactCount,
        reservations: reservationCount
      },
      recentActivities,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
