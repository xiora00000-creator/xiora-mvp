import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * レンタル商品一覧の取得
 * GET /api/rental/items
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')
    const availability = searchParams.get('availability')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sort_by') || 'created_at'
    const sortOrder = searchParams.get('sort_order') || 'desc'
    
    // クエリパラメータを構築
    let query = 'xiora_rental_items?select=*'
    
    // カテゴリフィルター
    if (category) {
      query += `&category_id=eq.${category}`
    }
    
    // 価格フィルター
    if (minPrice) {
      query += `&daily_rate=gte.${minPrice}`
    }
    if (maxPrice) {
      query += `&daily_rate=lte.${maxPrice}`
    }
    
    // 利用可能状況フィルター
    if (availability) {
      query += `&availability_status=eq.${availability}`
    }
    
    // 検索クエリ
    if (search) {
      query += `&or=(name.ilike.%${search}%,description.ilike.%${search}%)`
    }
    
    // ソート
    query += `&order=${sortBy}.${sortOrder}`
    
    // ページネーション
    const offset = (page - 1) * limit
    query += `&range=${offset}-${offset + limit - 1}`
    
    // 商品一覧を取得
    const items = await sbAdmin(query)
    
    // 総件数を取得
    const countQuery = query.replace(/&range=.*$/, '').replace(/&order=.*$/, '')
    const countResult = await sbAdmin(countQuery.replace('select=*', 'select=id'))
    const total = Array.isArray(countResult) ? countResult.length : 0
    
    return NextResponse.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching rental items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental items' },
      { status: 500 }
    )
  }
}
