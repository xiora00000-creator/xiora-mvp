import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 機器一覧の取得
 * GET /api/admin/equipments
 */
export async function GET() {
  try {
    const equipments = await sbAdmin('xiora_equipments?select=*&order=created_at.desc')
    return NextResponse.json(equipments)
  } catch (error) {
    console.error('Error fetching equipments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch equipments' },
      { status: 500 }
    )
  }
}

/**
 * 新規機器の作成
 * POST /api/admin/equipments
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
    const equipmentData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const result = await sbAdmin('xiora_equipments', {
      method: 'POST',
      body: JSON.stringify(equipmentData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating equipment:', error)
    return NextResponse.json(
      { error: 'Failed to create equipment' },
      { status: 500 }
    )
  }
}
