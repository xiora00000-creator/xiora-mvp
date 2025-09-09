import { NextRequest, NextResponse } from 'next/server'
import { formRateLimit } from '@/lib/rateLimit'
import { validateContactForm, ContactFormData } from '@/lib/validation'
import { SecurityUtils, sanitizeInput } from '@/lib/security'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/posthog'
import { captureException } from '@/lib/sentry'

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const rateLimitResult = formRateLimit(request)
    if (rateLimitResult instanceof NextResponse) {
      return rateLimitResult
    }

    // IPアドレスの検証
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!SecurityUtils.isValidIP(clientIP)) {
      return NextResponse.json(
        { error: 'Invalid client IP address' },
        { status: 400 }
      )
    }

    // リクエストボディの取得と検証
    const body = await request.json()
    
    // 入力検証
    let validatedData: ContactFormData
    try {
      validatedData = validateContactForm(body)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error },
        { status: 400 }
      )
    }

    // セキュリティチェック
    if (SecurityUtils.detectSqlInjection(validatedData.message)) {
      return NextResponse.json(
        { error: 'Potentially malicious content detected' },
        { status: 400 }
      )
    }

    // 入力データのサニタイゼーション
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: validatedData.email.toLowerCase().trim(),
      company: validatedData.company ? sanitizeInput(validatedData.company) : '',
      phone: sanitizeInput(validatedData.phone),
      message: sanitizeInput(validatedData.message),
      purpose: validatedData.purpose,
      consent: validatedData.consent,
    }

    // Supabaseへの保存
    const { data, error: dbError } = await supabase
      .from('contact_forms')
      .insert([
        {
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company,
          phone: sanitizedData.phone,
          message: sanitizedData.message,
          purpose: sanitizedData.purpose,
          ip_address: clientIP,
          user_agent: request.headers.get('user-agent') || '',
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save contact form' },
        { status: 500 }
      )
    }

    // 管理者への通知メール送信（一時的に無効化）
    /*
    try {
      // メール送信処理
      console.log('Admin notification email would be sent here')
    } catch (emailError) {
      console.error('Email sending error:', emailError)
    }
    */

    // ユーザーへの確認メール送信（一時的に無効化）
    /*
    try {
      // メール送信処理
      console.log('Confirmation email would be sent here')
    } catch (emailError) {
      console.error('Confirmation email error:', emailError)
    }
    */

    // 分析イベントの送信
    try {
      trackEvent('contact_form_submitted', {
        purpose: sanitizedData.purpose,
        hasCompany: !!sanitizedData.company,
        messageLength: sanitizedData.message.length,
      })
    } catch (analyticsError) {
      console.error('Analytics error:', analyticsError)
    }

    // 成功レスポンス
    return NextResponse.json(
      { 
        success: true, 
        message: 'お問い合わせを受け付けました',
        id: data?.[0]?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Sentryへのエラー送信
    captureException(error as Error, {
      tags: { component: 'contact_api' },
      extra: { 
        ip: request.ip,
        userAgent: request.headers.get('user-agent'),
      }
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// OPTIONS リクエスト（CORS対応）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}
