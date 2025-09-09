import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * レンタル商品一覧の取得
 * GET /api/admin/rental-items
 */
export async function GET() {
  try {
    const items = await sbAdmin('xiora_rental_items?select=*&order=created_at.desc')
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching rental items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental items' },
      { status: 500 }
    )
  }
}

/**
 * 新規レンタル商品の作成
 * POST /api/admin/rental-items
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // 必須フィールドの検証
    if (!body.name || !body.slug || !body.daily_rate) {
      return NextResponse.json(
        { error: 'Name, slug, and daily_rate are required' },
        { status: 400 }
      )
    }
    
    // 作成日時を追加
    const itemData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin('xiora_rental_items', {
      method: 'POST',
      body: JSON.stringify(itemData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating rental item:', error)
    return NextResponse.json(
      { error: 'Failed to create rental item' },
      { status: 500 }
    )
  }
}
