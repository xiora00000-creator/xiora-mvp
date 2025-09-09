import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 特定カテゴリの取得
 * GET /api/admin/categories/[slug]
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const category = await sbAdmin(`xiora_categories?slug=eq.${params.slug}&select=*`)
    return NextResponse.json(category?.[0] || null)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

/**
 * カテゴリの更新
 * PUT /api/admin/categories/[slug]
 */
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    
    // 更新日時を追加
    const updateData = {
      ...body,
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin(`xiora_categories?slug=eq.${params.slug}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

/**
 * カテゴリの削除
 * DELETE /api/admin/categories/[slug]
 */
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try {
    await sbAdmin(`xiora_categories?slug=eq.${params.slug}`, {
      method: 'DELETE'
    })
    
    return NextResponse.json({ ok: true, message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
