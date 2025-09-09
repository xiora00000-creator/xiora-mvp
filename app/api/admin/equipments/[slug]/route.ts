import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 特定機器の取得
 * GET /api/admin/equipments/[slug]
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const equipment = await sbAdmin(`xiora_equipments?slug=eq.${params.slug}&select=*`)
    return NextResponse.json(equipment?.[0] || null)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    )
  }
}

/**
 * 機器の更新
 * PUT /api/admin/equipments/[slug]
 */
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    
    // 更新日時を追加
    const updateData = {
      ...body,
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin(`xiora_equipments?slug=eq.${params.slug}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating equipment:', error)
    return NextResponse.json(
      { error: 'Failed to update equipment' },
      { status: 500 }
    )
  }
}

/**
 * 機器の削除
 * DELETE /api/admin/equipments/[slug]
 */
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try {
    await sbAdmin(`xiora_equipments?slug=eq.${params.slug}`, {
      method: 'DELETE'
    })
    
    return NextResponse.json({ ok: true, message: 'Equipment deleted successfully' })
  } catch (error) {
    console.error('Error deleting equipment:', error)
    return NextResponse.json(
      { error: 'Failed to delete equipment' },
      { status: 500 }
    )
  }
}
