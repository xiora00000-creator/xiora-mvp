import { NextRequest, NextResponse } from 'next/server'
import { supabase, TABLES } from '@/lib/supabase'
import { sendReservationNotification, sendConfirmationEmail } from '@/lib/resend'
import { trackFormSubmit, trackFormSuccess, trackFormError } from '@/lib/posthog'
import { handleFormError } from '@/lib/sentry'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      company,
      phone,
      equipment_type,
      start_date,
      end_date,
      start_time,
      end_time,
      purpose,
      special_requirements,
      terms_accepted
    } = body

    // バリデーション
    if (!name || !email || !phone || !equipment_type || !start_date || !end_date || !start_time || !end_time || !purpose || !terms_accepted) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // 利用規約の同意チェック
    if (!terms_accepted) {
      return NextResponse.json(
        { error: '利用規約に同意してください' },
        { status: 400 }
      )
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      )
    }

    // 日付の妥当性チェック
    const start = new Date(`${start_date}T${start_time}`)
    const end = new Date(`${end_date}T${end_time}`)
    const now = new Date()

    if (start < now) {
      return NextResponse.json(
        { error: '開始日時は現在時刻より後である必要があります' },
        { status: 400 }
      )
    }

    if (end <= start) {
      return NextResponse.json(
        { error: '終了日時は開始日時より後である必要があります' },
        { status: 400 }
      )
    }

    // 利用期間の制限チェック（例：最大30日）
    const maxDays = 30
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays > maxDays) {
      return NextResponse.json(
        { error: `利用期間は最大${maxDays}日までです` },
        { status: 400 }
      )
    }

    // PostHogでフォーム送信を追跡
    trackFormSubmit('reservation', {
      name,
      email,
      company,
      phone,
      equipment_type,
      start_date,
      end_date,
      start_time,
      end_time,
      purpose,
      has_special_requirements: !!special_requirements,
      duration_days: diffDays
    })

    // Supabaseにデータを保存
    const { data, error } = await supabase
      .from(TABLES.RESERVATIONS)
      .insert([
        {
          name,
          email,
          company,
          phone,
          equipment_type,
          start_date,
          end_date,
          start_time,
          end_time,
          purpose,
          special_requirements,
          terms_accepted,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // Sentryでエラーを記録
      handleFormError(error, 'reservation', {
        name,
        email,
        equipment_type,
        start_date,
        end_date
      })
      
      // PostHogでエラーを追跡
      trackFormError('reservation', 'database_error', {
        name,
        email,
        equipment_type,
        error: error.message
      })
      
      return NextResponse.json(
        { error: 'データベースへの保存に失敗しました' },
        { status: 500 }
      )
    }

    // 管理者への通知メール送信
    const notificationResult = await sendReservationNotification({
      name,
      email,
      company,
      phone,
      equipment_type,
      start_date,
      end_date,
      start_time,
      end_time,
      purpose
    })

    if (!notificationResult.success) {
      console.error('Notification email error:', notificationResult.error)
      
      // Sentryでエラーを記録
      handleFormError(notificationResult.error, 'reservation_notification', {
        name,
        email,
        equipment_type
      })
    }

    // ユーザーへの確認メール送信
    const confirmationResult = await sendConfirmationEmail(
      email,
      { name },
      'reservation'
    )

    if (!confirmationResult.success) {
      console.error('Confirmation email error:', confirmationResult.error)
      
      // Sentryでエラーを記録
      handleFormError(confirmationResult.error, 'reservation_confirmation', {
        name,
        email,
        equipment_type
      })
    }

    // PostHogで成功を追跡
    trackFormSuccess('reservation', {
      reservation_id: data.id,
      name,
      email,
      equipment_type,
      start_date,
      end_date,
      duration_days: diffDays,
      notification_sent: notificationResult.success,
      confirmation_sent: confirmationResult.success
    })

    return NextResponse.json({
      success: true,
      message: '予約リクエストを受け付けました',
      data: {
        id: data.id,
        status: data.status,
        reservation_number: `R${data.id.toString().padStart(6, '0')}`
      }
    })

  } catch (error) {
    console.error('Reservation API error:', error)
    
    // Sentryでエラーを記録
    handleFormError(error as Error, 'reservation_api', {
      request_body: await request.text()
    })
    
    // PostHogでエラーを追跡
    trackFormError('reservation', 'api_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
