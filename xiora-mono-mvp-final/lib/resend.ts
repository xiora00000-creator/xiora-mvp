import { Resend } from 'resend'

// 環境変数のチェック
const resendApiKey = process.env.RESEND_API_KEY

// 環境変数が設定されていない場合はダミークライアントを作成
const resend = resendApiKey ? new Resend(resendApiKey) : null

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export interface ContactNotificationData {
  name: string
  email: string
  company?: string
  phone?: string
  purpose: string
  message: string
}

export interface ReservationNotificationData {
  name: string
  email: string
  company?: string
  phone: string
  equipment_type: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  purpose: string
}

// お問い合わせ通知メール
export const sendContactNotification = async (data: ContactNotificationData) => {
  if (!resend) {
    console.warn('Resend API key not configured')
    return { success: false, error: 'Resend not configured' }
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@xiora.com'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@xiora.com'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>新しいお問い合わせ</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
          新しいお問い合わせ
        </h1>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #000; margin-top: 0;">お問い合わせ内容</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">お名前:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">メールアドレス:</td>
              <td style="padding: 8px 0;">${data.email}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">会社名:</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            ${data.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">電話番号:</td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">お問い合わせ種別:</td>
              <td style="padding: 8px 0;">${data.purpose}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
          <h3 style="color: #000; margin-top: 0;">メッセージ</h3>
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            このメールは自動送信されています。<br>
            返信は ${data.email} までお願いします。
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `[Xiora] 新しいお問い合わせ: ${data.name}様`,
      html
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error }
  }
}

// 予約通知メール
export const sendReservationNotification = async (data: ReservationNotificationData) => {
  if (!resend) {
    console.warn('Resend API key not configured')
    return { success: false, error: 'Resend not configured' }
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@xiora.com'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@xiora.com'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>新しい予約リクエスト</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
          新しい予約リクエスト
        </h1>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #000; margin-top: 0;">予約内容</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">お名前:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">メールアドレス:</td>
              <td style="padding: 8px 0;">${data.email}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">会社名:</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">電話番号:</td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">機器種別:</td>
              <td style="padding: 8px 0;">${data.equipment_type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">利用期間:</td>
              <td style="padding: 8px 0;">${data.start_date} 〜 ${data.end_date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">利用時間:</td>
              <td style="padding: 8px 0;">${data.start_time} 〜 ${data.end_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">利用目的:</td>
              <td style="padding: 8px 0;">${data.purpose}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            このメールは自動送信されています。<br>
            返信は ${data.email} までお願いします。
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `[Xiora] 新しい予約リクエスト: ${data.name}様`,
      html
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error }
  }
}

// 確認メール送信
export const sendConfirmationEmail = async (to: string, data: any, type: 'contact' | 'reservation') => {
  if (!resend) {
    console.warn('Resend API key not configured')
    return { success: false, error: 'Resend not configured' }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@xiora.com'
  
  const subject = type === 'contact' 
    ? '[Xiora] お問い合わせありがとうございます'
    : '[Xiora] 予約リクエストありがとうございます'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>確認メール</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
          ${type === 'contact' ? 'お問い合わせ' : '予約リクエスト'}ありがとうございます
        </h1>
        
        <p>${data.name}様</p>
        
        <p>この度は${type === 'contact' ? 'お問い合わせ' : '予約リクエスト'}いただき、ありがとうございます。</p>
        
        <p>内容を確認の上、担当者よりご連絡させていただきます。</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            このメールは自動送信されています。<br>
            ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error }
  }
}
