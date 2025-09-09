import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * カテゴリ一覧の取得
 * GET /api/admin/categories
 */
export async function GET() {
  try {
    const categories = await sbAdmin('xiora_categories?select=*&order=created_at.desc')
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

/**
 * 新規カテゴリの作成
 * POST /api/admin/categories
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // 必須フィールドの検証
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }
    
    // 作成日時を追加
    const categoryData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin('xiora_categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
