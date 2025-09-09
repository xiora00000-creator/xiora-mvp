'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, contactInfo, seoConfig } from '@/data/site'

/**
 * お問い合わせページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inquiryTypes = [
    { value: 'consultation', label: '無料相談', description: 'お気軽にご相談ください' },
    { value: 'document', label: '資料請求', description: '詳細資料をダウンロード' },
    { value: 'quote', label: '見積もり依頼', description: 'プロジェクトの見積もり' },
    { value: 'support', label: 'サポート', description: '既存サービスのサポート' },
    { value: 'recruit', label: '採用応募', description: '採用に関するお問い合わせ' },
    { value: 'partner', label: 'パートナー応募', description: 'パートナーシップに関するお問い合わせ' },
    { value: 'other', label: 'その他', description: 'その他のお問い合わせ' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 既存のAPIエンドポイントを使用
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          subject: '',
          message: '',
        })
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Section className="py-20 bg-gray-50">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h1 className="text-4xl font-bold text-black mb-6">
                お問い合わせありがとうございます
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                お問い合わせを受け付けました。
                内容を確認の上、2営業日以内にご連絡いたします。
              </p>
              <a
                href="/"
                className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                ホームに戻る
              </a>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              お気軽にご相談ください。
              専門チームが最適なソリューションをご提案します。
            </p>
          </div>
        </Container>
      </Section>

      {/* お問い合わせフォーム */}
      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* フォーム */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-8">
                お問い合わせフォーム
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* お問い合わせ種別 */}
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {inquiryTypes.map((type) => (
                      <label key={type.value} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          checked={formData.inquiryType === type.value}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                          required
                        />
                        <div>
                          <div className="font-medium text-black">{type.label}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* お名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* 会社名 */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                    会社名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* 件名 */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* メッセージ */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    メッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </form>
            </div>

            {/* 連絡先情報 */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-8">
                連絡先情報
              </h2>
              
              <div className="space-y-8">
                {/* 本社 */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">本社</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>〒{siteConfig.address.postalCode}</p>
                    <p>{siteConfig.address.prefecture}{siteConfig.address.city}{siteConfig.address.street}</p>
                    <p>{siteConfig.address.building}</p>
                    <p>TEL: {siteConfig.phone}</p>
                    <p>Email: {siteConfig.email}</p>
                  </div>
                </div>

                {/* 営業時間 */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">営業時間</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>平日: {siteConfig.businessHours.weekdays}</p>
                    <p>土曜: {siteConfig.businessHours.saturday}</p>
                    <p>日曜: {siteConfig.businessHours.sunday}</p>
                  </div>
                </div>

                {/* 各部門連絡先 */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">各部門連絡先</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-black">営業部</h4>
                      <p className="text-gray-600">Email: {contactInfo.departments.sales.email}</p>
                      <p className="text-gray-600">TEL: {contactInfo.departments.sales.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">サポート部</h4>
                      <p className="text-gray-600">Email: {contactInfo.departments.support.email}</p>
                      <p className="text-gray-600">TEL: {contactInfo.departments.support.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">人事部</h4>
                      <p className="text-gray-600">Email: {contactInfo.departments.hr.email}</p>
                      <p className="text-gray-600">TEL: {contactInfo.departments.hr.phone}</p>
                    </div>
                  </div>
                </div>

                {/* よくある質問 */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">よくある質問</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-black">Q. 対応時間はどのくらいですか？</h4>
                      <p className="text-gray-600 text-sm">A. 通常2営業日以内にご連絡いたします。</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Q. 無料相談はありますか？</h4>
                      <p className="text-gray-600 text-sm">A. はい、初回相談は無料で承っております。</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Q. 見積もりは無料ですか？</h4>
                      <p className="text-gray-600 text-sm">A. はい、見積もりは無料で作成いたします。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
