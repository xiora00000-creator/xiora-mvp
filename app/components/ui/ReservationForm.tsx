"use client"

import React, { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { Checkbox } from './Checkbox'
import { Field } from './Field'
import { FormMessage } from './FormMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { trackFormSubmit, trackFormSuccess, trackFormError } from '@/lib/posthog'

/**
 * 予約フォームのプロパティ
 */
interface ReservationFormProps {
  className?: string
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

/**
 * 予約フォームのデータ型
 */
interface ReservationFormData {
  name: string
  email: string
  company: string
  phone: string
  equipment_type: 'camera' | 'lighting' | 'audio' | 'other'
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  purpose: string
  special_requirements: string
  terms_accepted: boolean
}

/**
 * 予約フォームコンポーネント
 * 機器の予約リクエスト用フォーム
 */
export const ReservationForm: React.FC<ReservationFormProps> = ({
  className,
  onSuccess,
  onError
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    equipment_type: 'camera',
    start_date: '',
    end_date: '',
    start_time: '09:00',
    end_time: '17:00',
    purpose: '',
    special_requirements: '',
    terms_accepted: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // フォームデータの更新
  const handleInputChange = (field: keyof ReservationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // エラーのクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号を入力してください'
    }

    if (!formData.start_date) {
      newErrors.start_date = '開始日を選択してください'
    }

    if (!formData.end_date) {
      newErrors.end_date = '終了日を選択してください'
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = '利用目的を入力してください'
    }

    if (!formData.terms_accepted) {
      newErrors.terms_accepted = '利用規約に同意してください'
    }

    // 日付の妥当性チェック
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date)
      const end = new Date(formData.end_date)
      const now = new Date()
      now.setHours(0, 0, 0, 0)

      if (start < now) {
        newErrors.start_date = '開始日は今日以降を選択してください'
      }

      if (end <= start) {
        newErrors.end_date = '終了日は開始日より後を選択してください'
      }

      // 利用期間の制限（最大30日）
      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays > 30) {
        newErrors.end_date = '利用期間は最大30日までです'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // PostHogでフォーム送信を追跡
      trackFormSubmit('reservation', {
        equipment_type: formData.equipment_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        has_special_requirements: !!formData.special_requirements
      })

      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        
        // PostHogで成功を追跡
        trackFormSuccess('reservation', {
          reservation_id: result.data.id,
          equipment_type: formData.equipment_type
        })
        
        onSuccess?.(result.data)
        
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          equipment_type: 'camera',
          start_date: '',
          end_date: '',
          start_time: '09:00',
          end_time: '17:00',
          purpose: '',
          special_requirements: '',
          terms_accepted: false
        })
      } else {
        setSubmitStatus('error')
        
        // PostHogでエラーを追跡
        trackFormError('reservation', 'api_error', {
          error: result.error,
          equipment_type: formData.equipment_type
        })
        
        onError?.(result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      
      const errorMessage = error instanceof Error ? error.message : '送信に失敗しました'
      
      // PostHogでエラーを追跡
      trackFormError('reservation', 'network_error', {
        error: errorMessage,
        equipment_type: formData.equipment_type
      })
      
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 最小日付（今日）
  const today = new Date().toISOString().split('T')[0]

  if (submitStatus === 'success') {
    return (
      <div className={`text-center p-8 bg-success-light border border-success rounded-lg ${className}`}>
        <div className="text-success text-6xl mb-4">✓</div>
        <h3 className="text-xl font-display font-bold text-fg mb-2">
          予約リクエストを受け付けました
        </h3>
        <p className="text-fg-muted mb-4">
          内容を確認の上、担当者よりご連絡させていただきます。
        </p>
        <Button
          variant="primary"
          onClick={() => setSubmitStatus('idle')}
        >
          新しい予約を作成
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* 基本情報 */}
      <div className="grid-responsive-2 gap-6">
        <Field label="お名前 *" error={errors.name}>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="山田太郎"
            aria-label="お名前"
          />
        </Field>

        <Field label="メールアドレス *" error={errors.email}>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="yamada@example.com"
            aria-label="メールアドレス"
          />
        </Field>

        <Field label="会社名">
          <Input
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="株式会社サンプル"
            aria-label="会社名"
          />
        </Field>

        <Field label="電話番号 *" error={errors.phone}>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="03-1234-5678"
            aria-label="電話番号"
          />
        </Field>
      </div>

      {/* 機器・日時情報 */}
      <div className="grid-responsive-2 gap-6">
        <Field label="機器種別 *">
          <select
            value={formData.equipment_type}
            onChange={(e) => handleInputChange('equipment_type', e.target.value)}
            className="w-full bg-bg-secondary border border-line text-fg px-4 py-3 rounded-md transition-all duration-normal ease-smooth focus:border-focus focus-visible-ring min-h-[44px]"
            aria-label="機器種別"
          >
            <option value="camera">カメラ・映像機器</option>
            <option value="lighting">照明機器</option>
            <option value="audio">音響機器</option>
            <option value="other">その他</option>
          </select>
        </Field>

        <Field label="利用目的 *" error={errors.purpose}>
          <Input
            value={formData.purpose}
            onChange={(e) => handleInputChange('purpose', e.target.value)}
            placeholder="撮影、イベント、その他"
            aria-label="利用目的"
          />
        </Field>

        <Field label="開始日 *" error={errors.start_date}>
          <Input
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            min={today}
            aria-label="開始日"
          />
        </Field>

        <Field label="終了日 *" error={errors.end_date}>
          <Input
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
            min={formData.start_date || today}
            aria-label="終了日"
          />
        </Field>

        <Field label="開始時間">
          <Input
            type="time"
            value={formData.start_time}
            onChange={(e) => handleInputChange('start_time', e.target.value)}
            aria-label="開始時間"
          />
        </Field>

        <Field label="終了時間">
          <Input
            type="time"
            value={formData.end_time}
            onChange={(e) => handleInputChange('end_time', e.target.value)}
            aria-label="終了時間"
          />
        </Field>
      </div>

      {/* 特別要件 */}
      <Field label="特別要件・ご要望">
        <Textarea
          value={formData.special_requirements}
          onChange={(e) => handleInputChange('special_requirements', e.target.value)}
          placeholder="特別な設定やご要望がございましたらご記入ください"
          rows={3}
          aria-label="特別要件・ご要望"
        />
      </Field>

      {/* 利用規約 */}
      <Field error={errors.terms_accepted}>
        <Checkbox
          id="terms"
          checked={formData.terms_accepted}
          onChange={(e) => handleInputChange('terms_accepted', e.target.checked)}
          label={
            <span>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-fg-secondary underline"
              >
                利用規約
              </a>
              に同意します *
            </span>
          }
        />
      </Field>

      {/* エラーメッセージ */}
      {submitStatus === 'error' && (
        <FormMessage type="error">
          送信に失敗しました。しばらく時間をおいてから再度お試しください。
        </FormMessage>
      )}

      {/* 送信ボタン */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        loading={isSubmitting}
        aria-label="予約リクエストを送信"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            送信中...
          </>
        ) : (
          '予約リクエストを送信'
        )}
      </Button>

      {/* 注意事項 */}
      <div className="text-sm text-fg-muted text-center">
        <p>※ 予約リクエストは承認制となっております</p>
        <p>※ ご希望の日時でご利用できない場合がございます</p>
      </div>
    </form>
  )
}
