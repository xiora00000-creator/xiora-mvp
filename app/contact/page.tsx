"use client"

import { useState } from 'react'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge, Caption } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Checkbox } from '../components/ui/Checkbox'
import { Field } from '../components/ui/Field'
import { FormMessage } from '../components/ui/FormMessage'

// お問い合わせの用途
const contactPurposes = [
  {
    id: 'custom-manufacturing',
    title: 'カスタム制作',
    description: 'オリジナル機器の制作について',
    icon: '🎨',
    details: [
      '完全オリジナル設計',
      'プロトタイプ制作',
      '量産対応',
      '技術サポート'
    ]
  },
  {
    id: 'rental-service',
    title: 'レンタルサービス',
    description: '機器のレンタルについて',
    icon: '📦',
    details: [
      '短期・長期レンタル',
      '配送・設置サービス',
      '技術サポート',
      'メンテナンス'
    ]
  },
  {
    id: 'technical-support',
    title: '技術サポート',
    description: '技術的なご相談について',
    icon: '🔧',
    details: [
      '技術相談',
      '故障対応',
      'メンテナンス',
      'トレーニング'
    ]
  },
  {
    id: 'partnership',
    title: 'パートナーシップ',
    description: 'ビジネスパートナーについて',
    icon: '🤝',
    details: [
      '代理店契約',
      'OEM供給',
      '共同開発',
      '販売提携'
    ]
  },
  {
    id: 'other',
    title: 'その他',
    description: 'その他のご相談について',
    icon: '💬',
    details: [
      '一般質問',
      '資料請求',
      '見学希望',
      'その他'
    ]
  }
]

// フォームの状態
interface ContactFormData {
  purpose: string
  company: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  budget: string
  timeline: string
  consent: boolean
}

export default function ContactPage() {
  const [step, setStep] = useState<'purpose' | 'form' | 'confirm' | 'thanks'>('purpose')
  const [selectedPurpose, setSelectedPurpose] = useState<string>('')
  const [formData, setFormData] = useState<ContactFormData>({
    purpose: '',
    company: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    consent: false
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 用途選択
  const handlePurposeSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId)
    setFormData(prev => ({ ...prev, purpose: purposeId }))
    setStep('form')
  }

  // フォーム入力
  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) newErrors.name = 'お名前は必須です'
    if (!formData.email.trim()) newErrors.email = 'メールアドレスは必須です'
    if (!formData.subject.trim()) newErrors.subject = '件名は必須です'
    if (!formData.message.trim()) newErrors.message = 'お問い合わせ内容は必須です'
    if (!formData.consent) newErrors.consent = true

    // メールアドレスの形式チェック
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 確認画面へ
  const handleSubmit = () => {
    if (validateForm()) {
      setStep('confirm')
    }
  }

  // フォームに戻る
  const handleBackToForm = () => {
    setStep('form')
  }

  // 送信処理
  const handleSend = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStep('thanks')
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      console.error('送信エラー:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 用途選択画面
  if (step === 'purpose') {
    return (
      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">お問い合わせ</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                お客様のニーズに最適なソリューションをご提案いたします。
                まずはお問い合わせの用途をお選びください。
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* 用途選択セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactPurposes.map((purpose) => (
                <div
                  key={purpose.id}
                  className="p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-150 hover:scale-105 rounded-lg duration-normal ease-smooth bg-bg-secondary border border-line"
                  onClick={() => handlePurposeSelect(purpose.id)}
                >
                  <div className="text-4xl mb-6">{purpose.icon}</div>
                  <H3 className="mb-4">{purpose.title}</H3>
                  <Body className="text-fg-muted mb-6">{purpose.description}</Body>
                  <ul className="text-left space-y-2 mb-6">
                    {purpose.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-success">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="primary" className="w-full">
                    選択する
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  // フォーム画面
  if (step === 'form') {
    const selectedPurposeData = contactPurposes.find(p => p.id === selectedPurpose)
    
    return (
      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">お問い合わせフォーム</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                選択された用途: {selectedPurposeData?.title}
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* フォームセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* 左側 */}
                    <div className="space-y-6">
                      <Field label="会社名・組織名">
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="会社名・組織名を入力"
                        />
                      </Field>

                      <Field label="お名前 *" error={errors.name}>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="お名前を入力"
                          className={errors.name ? 'border-error' : ''}
                        />
                        {errors.name && <FormMessage>{errors.name}</FormMessage>}
                      </Field>

                      <Field label="メールアドレス *" error={errors.email}>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="example@company.com"
                          className={errors.email ? 'border-error' : ''}
                        />
                        {errors.email && <FormMessage>{errors.email}</FormMessage>}
                      </Field>

                      <Field label="電話番号">
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="03-1234-5678"
                        />
                      </Field>
                    </div>

                    {/* 右側 */}
                    <div className="space-y-6">
                      <Field label="件名 *" error={errors.subject}>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="お問い合わせの件名を入力"
                          className={errors.subject ? 'border-error' : ''}
                        />
                        {errors.subject && <FormMessage>{errors.subject}</FormMessage>}
                      </Field>

                      <Field label="予算">
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full bg-bg-secondary border border-line text-fg transition-all duration-normal ease-smooth focus:border-fg focus:outline-none resize-none min-h-[44px] px-3 py-3 rounded-md"
                        >
                          <option value="">選択してください</option>
                          <option value="under-100k">10万円未満</option>
                          <option value="100k-500k">10万円〜50万円</option>
                          <option value="500k-1m">50万円〜100万円</option>
                          <option value="1m-5m">100万円〜500万円</option>
                          <option value="over-5m">500万円以上</option>
                          <option value="undecided">未定</option>
                        </select>
                      </Field>

                      <Field label="希望納期">
                        <select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full bg-bg-secondary border border-line text-fg transition-all duration-normal ease-smooth focus:border-fg focus:outline-none resize-none min-h-[44px] px-3 py-3 rounded-md"
                        >
                          <option value="">選択してください</option>
                          <option value="asap">至急</option>
                          <option value="1month">1ヶ月以内</option>
                          <option value="3months">3ヶ月以内</option>
                          <option value="6months">6ヶ月以内</option>
                          <option value="1year">1年以内</option>
                          <option value="undecided">未定</option>
                        </select>
                      </Field>
                    </div>
                  </div>

                  {/* お問い合わせ内容 */}
                  <div className="mt-8">
                    <Field label="お問い合わせ内容 *" error={errors.message}>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="詳細なお問い合わせ内容を入力してください"
                        rows={8}
                        className={errors.message ? 'border-error' : ''}
                      />
                      {errors.message && <FormMessage>{errors.message}</FormMessage>}
                    </Field>
                  </div>

                  {/* プライバシーポリシー同意 */}
                  <div className="mt-8">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onChange={(e) => handleInputChange('consent', e.target.checked)}
                          label={
                            <span className="text-fg-muted">
                              <a href="/privacy" className="underline hover:text-fg">
                                プライバシーポリシー
                              </a>
                              に同意します *
                            </span>
                          }
                          error={errors.consent ? 'プライバシーポリシーへの同意は必須です' : undefined}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ボタン */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep('purpose')}
                    >
                      用途選択に戻る
                    </Button>
                    <Button type="submit" variant="primary">
                      確認画面へ
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  // 確認画面
  if (step === 'confirm') {
    const selectedPurposeData = contactPurposes.find(p => p.id === formData.purpose)
    
    return (
      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">確認画面</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                入力内容をご確認ください
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* 確認セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <H2 className="mb-8 text-center">お問い合わせ内容の確認</H2>
                
                <div className="space-y-6">
                  {/* 用途 */}
                  <div className="border-b border-line pb-4">
                    <H3 className="mb-3">お問い合わせの用途</H3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedPurposeData?.icon}</span>
                      <div>
                        <p className="font-medium">{selectedPurposeData?.title}</p>
                        <p className="text-sm text-fg-muted">{selectedPurposeData?.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* 基本情報 */}
                  <div className="border-b border-line pb-4">
                    <H3 className="mb-3">基本情報</H3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-fg-muted">会社名・組織名</p>
                        <p className="font-medium">{formData.company || '未入力'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">お名前</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">メールアドレス</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">電話番号</p>
                        <p className="font-medium">{formData.phone || '未入力'}</p>
                      </div>
                    </div>
                  </div>

                  {/* 詳細情報 */}
                  <div className="border-b border-line pb-4">
                    <H3 className="mb-3">詳細情報</H3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-fg-muted">件名</p>
                        <p className="font-medium">{formData.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">予算</p>
                        <p className="font-medium">
                          {formData.budget === 'under-100k' ? '10万円未満' :
                           formData.budget === '100k-500k' ? '10万円〜50万円' :
                           formData.budget === '500k-1m' ? '50万円〜100万円' :
                           formData.budget === '1m-5m' ? '100万円〜500万円' :
                           formData.budget === 'over-5m' ? '500万円以上' :
                           formData.budget === 'undecided' ? '未定' : '未選択'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">希望納期</p>
                        <p className="font-medium">
                          {formData.timeline === 'asap' ? '至急' :
                           formData.timeline === '1month' ? '1ヶ月以内' :
                           formData.timeline === '3months' ? '3ヶ月以内' :
                           formData.timeline === '6months' ? '6ヶ月以内' :
                           formData.timeline === '1year' ? '1年以内' :
                           formData.timeline === 'undecided' ? '未定' : '未選択'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-fg-muted">お問い合わせ内容</p>
                        <p className="font-medium whitespace-pre-wrap">{formData.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* 同意事項 */}
                  <div>
                    <H3 className="mb-3">同意事項</H3>
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        id="consent-confirm"
                        checked={formData.consent} 
                        onChange={() => {}} 
                        label="プライバシーポリシーに同意"
                        disabled 
                      />
                    </div>
                  </div>
                </div>

                {/* ボタン */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Button
                    variant="secondary"
                    onClick={handleBackToForm}
                  >
                    修正する
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSend}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送信中...' : '送信する'}
                  </Button>
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  // サンクス画面
  if (step === 'thanks') {
    return (
      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">お問い合わせありがとうございます</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                お問い合わせを受け付けました。
                内容を確認の上、担当者よりご連絡いたします。
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* サンクスセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <Card className="p-12">
                <div className="text-6xl mb-8">✅</div>
                <H2 className="mb-6">お問い合わせを受け付けました</H2>
                
                <div className="space-y-6 mb-12">
                  <BodyLarge className="text-fg-muted">
                    この度はお問い合わせいただき、誠にありがとうございます。
                  </BodyLarge>
                  
                  <div className="bg-bg-secondary p-6 rounded-lg">
                    <H3 className="mb-4">今後の流れ</H3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                      <div className="text-center">
                        <div className="text-3xl mb-3">📧</div>
                        <p className="font-medium mb-2">1. 受付確認</p>
                        <p className="text-sm text-fg-muted">自動返信メールをお送りします</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">👥</div>
                        <p className="font-medium mb-2">2. 担当者アサイン</p>
                        <p className="text-sm text-fg-muted">専門スタッフが担当いたします</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">📞</div>
                        <p className="font-medium mb-2">3. ご連絡</p>
                        <p className="text-sm text-fg-muted">2-3営業日以内にご連絡いたします</p>
                      </div>
                    </div>
                  </div>

                  <Body className="text-fg-muted">
                    お急ぎの場合は、お電話でもお問い合わせいただけます。
                  </Body>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" asChild>
                    <a href="/">ホームに戻る</a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href="/catalog">商品カタログ</a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href="/custom-rental">カスタム・レンタル</a>
                  </Button>
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  return null
}
