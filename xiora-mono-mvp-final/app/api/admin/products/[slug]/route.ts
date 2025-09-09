import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 特定商品の取得
 * GET /api/admin/products/[slug]
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const product = await sbAdmin(`xiora_products?slug=eq.${params.slug}&select=*`)
    return NextResponse.json(product?.[0] || null)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

/**
 * 商品の更新
 * PUT /api/admin/products/[slug]
 */
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    
    // 更新日時を追加
    const updateData = {
      ...body,
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin(`xiora_products?slug=eq.${params.slug}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

/**
 * 商品の削除
 * DELETE /api/admin/products/[slug]
 */
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try {
    await sbAdmin(`xiora_products?slug=eq.${params.slug}`, {
      method: 'DELETE'
    })
    
    return NextResponse.json({ ok: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
