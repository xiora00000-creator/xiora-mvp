import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 商品一覧の取得
 * GET /api/admin/products
 */
export async function GET() {
  try {
    const products = await sbAdmin('xiora_products?select=*&order=created_at.desc')
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

/**
 * 新規商品の作成
 * POST /api/admin/products
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
    const productData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin('xiora_products', {
      method: 'POST',
      body: JSON.stringify(productData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
