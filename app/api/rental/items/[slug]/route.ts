import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 特定レンタル商品の取得
 * GET /api/rental/items/[slug]
 */
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // 商品情報を取得
    const item = await sbAdmin(`xiora_rental_items?slug=eq.${params.slug}&select=*`)
    
    if (!item || !Array.isArray(item) || item.length === 0) {
      return NextResponse.json(
        { error: 'Rental item not found' },
        { status: 404 }
      )
    }
    
    const rentalItem = item[0]
    
    // 関連する料金設定を取得
    const pricing = await sbAdmin(
      `xiora_rental_pricing?rental_item_id=eq.${rentalItem.id}&is_active=eq.true&select=*`
    )
    
    // 関連するカテゴリ情報を取得
    let category = null
    if (rentalItem.category_id) {
      const categoryResult = await sbAdmin(
        `xiora_categories?id=eq.${rentalItem.category_id}&select=*`
      )
      category = Array.isArray(categoryResult) && categoryResult.length > 0 ? categoryResult[0] : null
    }
    
    // レビュー情報を取得
    const reviews = await sbAdmin(
      `xiora_rental_reviews?rental_item_id=eq.${rentalItem.id}&select=*&order=created_at.desc&limit=10`
    )
    
    // 平均評価を計算
    let averageRating = 0
    if (Array.isArray(reviews) && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      averageRating = totalRating / reviews.length
    }
    
    // 利用可能期間をチェック（次の30日間）
    const today = new Date()
    const nextMonth = new Date(today)
    nextMonth.setDate(today.getDate() + 30)
    
    const conflictingBookings = await sbAdmin(
      `xiora_rental_bookings?rental_item_id=eq.${rentalItem.id}&status=in.(confirmed,active)&start_date=gte.${today.toISOString().split('T')[0]}&end_date=lte.${nextMonth.toISOString().split('T')[0]}&select=start_date,end_date`
    )
    
    const availability = {
      next_30_days: Array.isArray(conflictingBookings) ? conflictingBookings : [],
      is_available: rentalItem.availability_status === 'available'
    }
    
    return NextResponse.json({
      data: {
        ...rentalItem,
        category,
        pricing: Array.isArray(pricing) ? pricing : [],
        reviews: Array.isArray(reviews) ? reviews : [],
        average_rating: averageRating,
        total_reviews: Array.isArray(reviews) ? reviews.length : 0,
        availability
      }
    })
  } catch (error) {
    console.error('Error fetching rental item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental item' },
      { status: 500 }
    )
  }
}
