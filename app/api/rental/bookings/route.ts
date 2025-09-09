import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'
import { generateBookingNumber } from '@/lib/utils/rental-utils'

/**
 * レンタル予約の作成
 * POST /api/rental/bookings
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 必須フィールドの検証
    if (!body.rental_item_id || !body.start_date || !body.end_date) {
      return NextResponse.json(
        { error: 'Rental item ID, start date, and end date are required' },
        { status: 400 }
      )
    }
    
    // 日付の妥当性チェック
    const startDate = new Date(body.start_date)
    const endDate = new Date(body.end_date)
    const today = new Date()
    
    if (startDate < today) {
      return NextResponse.json(
        { error: 'Start date cannot be in the past' },
        { status: 400 }
      )
    }
    
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }
    
    // 商品情報を取得
    const itemResult = await sbAdmin(`xiora_rental_items?id=eq.${body.rental_item_id}&select=*`)
    
    if (!itemResult || !Array.isArray(itemResult) || itemResult.length === 0) {
      return NextResponse.json(
        { error: 'Rental item not found' },
        { status: 404 }
      )
    }
    
    const rentalItem = itemResult[0]
    
    // 商品の利用可能性をチェック
    if (rentalItem.availability_status !== 'available') {
      return NextResponse.json(
        { error: 'Rental item is not available' },
        { status: 400 }
      )
    }
    
    // 既存の予約との競合をチェック
    const conflictingBookings = await sbAdmin(
      `xiora_rental_bookings?rental_item_id=eq.${body.rental_item_id}&status=in.(confirmed,active)&or=(start_date.lte.${body.end_date},end_date.gte.${body.start_date})&select=id,start_date,end_date`
    )
    
    if (Array.isArray(conflictingBookings) && conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Selected dates are not available for this item' },
        { status: 400 }
      )
    }
    
    // 料金を計算
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = rentalItem.daily_rate * totalDays
    const depositAmount = rentalItem.deposit_amount
    const taxAmount = subtotal * 0.08 // 8%の税金
    const totalAmount = subtotal + taxAmount + depositAmount
    
    // 予約番号を生成
    const bookingNumber = generateBookingNumber()
    
    // 予約データを作成
    const bookingData = {
      booking_number: bookingNumber,
      customer_id: body.customer_id || null,
      rental_item_id: body.rental_item_id,
      start_date: body.start_date,
      end_date: body.end_date,
      total_days: totalDays,
      daily_rate: rentalItem.daily_rate,
      subtotal,
      deposit_amount: depositAmount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      status: 'pending',
      payment_status: 'pending',
      pickup_location: body.pickup_location || null,
      return_location: body.return_location || null,
      special_requests: body.special_requests || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    // 予約を作成
    const result = await sbAdmin('xiora_rental_bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    })
    
    return NextResponse.json({
      data: result,
      message: 'Booking created successfully',
      booking_number: bookingNumber
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating rental booking:', error)
    return NextResponse.json(
      { error: 'Failed to create rental booking' },
      { status: 500 }
    )
  }
}

/**
 * ユーザーの予約一覧を取得
 * GET /api/rental/bookings
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customer_id')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }
    
    // クエリパラメータを構築
    let query = `xiora_rental_bookings?customer_id=eq.${customerId}&select=*`
    
    if (status) {
      query += `&status=eq.${status}`
    }
    
    query += `&order=created_at.desc`
    
    // ページネーション
    const offset = (page - 1) * limit
    query += `&range=${offset}-${offset + limit - 1}`
    
    // 予約一覧を取得
    const bookings = await sbAdmin(query)
    
    // 総件数を取得
    const countQuery = query.replace(/&range=.*$/, '').replace(/&order=.*$/, '')
    const countResult = await sbAdmin(countQuery.replace('select=*', 'select=id'))
    const total = Array.isArray(countResult) ? countResult.length : 0
    
    return NextResponse.json({
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error fetching rental bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental bookings' },
      { status: 500 }
    )
  }
}
