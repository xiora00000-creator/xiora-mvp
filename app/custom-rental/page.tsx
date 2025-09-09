import type { Metadata } from 'next'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge, Caption } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Divider } from '../components/ui/Divider'

export const metadata: Metadata = {
  title: 'Custom & Rental | Xiora - カスタム制作・レンタルサービス',
  description: 'Xioraのカスタム制作・レンタルサービスをご紹介します。4つの機器カテゴリからお選びいただけます。',
  keywords: 'Xiora, カスタム制作, レンタル, 機器, 料金表, 安全注意',
  openGraph: {
    title: 'Custom & Rental | Xiora - カスタム制作・レンタルサービス',
    description: 'Xioraのカスタム制作・レンタルサービスをご紹介します。',
    type: 'website',
    url: 'https://xiora.com/custom-rental',
    images: [
      {
        url: '/og-custom-rental.jpg',
        width: 1200,
        height: 630,
        alt: 'Xiora Custom & Rental - カスタム制作・レンタルサービス'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom & Rental | Xiora - カスタム制作・レンタルサービス',
    description: 'Xioraのカスタム制作・レンタルサービスをご紹介します。',
    images: ['/og-custom-rental.jpg']
  }
}

// 機器カテゴリデータ
const equipmentCategories = [
  {
    id: 'camera-equipment',
    name: 'カメラ・映像機器',
    description: 'プロ仕様のカメラと映像機器のカスタム制作・レンタル',
    icon: '📷',
    features: [
      '4K/8K対応カメラ',
      '特殊レンズ制作',
      'カメラアクセサリー',
      '映像処理機器'
    ],
    rentalPrices: {
      daily: 15000,
      weekly: 80000,
      monthly: 250000
    },
    customPrices: {
      basic: 500000,
      standard: 1200000,
      premium: 2500000
    },
    safetyNotes: [
      '使用前の動作確認を必ず行ってください',
      '湿度・温度管理にご注意ください',
      '落下・衝撃にご注意ください',
      '専門スタッフの立ち会いが必要です'
    ]
  },
  {
    id: 'lighting-equipment',
    name: '照明機器',
    description: 'スタジオ照明から特殊照明まで、用途に応じたカスタム制作・レンタル',
    icon: '💡',
    features: [
      'LED照明システム',
      '特殊効果照明',
      '調光・調色システム',
      'スタジオ照明'
    ],
    rentalPrices: {
      daily: 12000,
      weekly: 65000,
      monthly: 200000
    },
    customPrices: {
      basic: 400000,
      standard: 1000000,
      premium: 2000000
    },
    safetyNotes: [
      '電源の過負荷にご注意ください',
      '熱に弱い素材の近くでの使用は避けてください',
      '定期的な点検・メンテナンスが必要です',
      '防水・防塵性能を確認してください'
    ]
  },
  {
    id: 'audio-equipment',
    name: '音響機器',
    description: '高品質な音響機器のカスタム制作・レンタルサービス',
    icon: '🎤',
    features: [
      'マイク・スピーカー',
      'ミキサー・エフェクター',
      '録音機器',
      '音響処理機器'
    ],
    rentalPrices: {
      daily: 10000,
      weekly: 55000,
      monthly: 180000
    },
    customPrices: {
      basic: 350000,
      standard: 800000,
      premium: 1800000
    },
    safetyNotes: [
      '音量レベルの適切な管理を行ってください',
      'ケーブルの断線・接触不良にご注意ください',
      '静電気対策を行ってください',
      '定期的な音質チェックが必要です'
    ]
  },
  {
    id: 'accessory-equipment',
    name: 'アクセサリー・特殊機器',
    description: '三脚、ケース、特殊機器のカスタム制作・レンタル',
    icon: '🔧',
    features: [
      '三脚・スタビライザー',
      'ケース・収納',
      '特殊マウント',
      'カスタムパーツ'
    ],
    rentalPrices: {
      daily: 8000,
      weekly: 40000,
      monthly: 120000
    },
    customPrices: {
      basic: 250000,
      standard: 600000,
      premium: 1500000
    },
    safetyNotes: [
      '重量制限を必ず確認してください',
      '組み立て・分解は専門スタッフが行います',
      '定期的な強度チェックが必要です',
      '使用環境に応じた適切な選択を行ってください'
    ]
  }
]

export default function CustomRentalPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Custom & Rental | Xiora",
            "description": "Xioraのカスタム制作・レンタルサービスをご紹介します。",
            "url": "https://xiora.com/custom-rental",
            "mainEntity": {
              "@type": "Service",
              "name": "Xiora Custom & Rental Service",
              "description": "カスタム制作・レンタルサービス",
              "provider": {
                "@type": "Organization",
                "name": "Xiora"
              },
              "serviceType": "カスタム制作・レンタル",
              "areaServed": "日本全国"
            }
          })
        }}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">Custom & Rental</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                お客様のニーズに合わせたカスタム制作と、高品質な機器のレンタルサービス。
                プロジェクトの成功をサポートします。
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* サービス概要セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">サービス概要</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                カスタム制作とレンタルの両方に対応し、お客様のプロジェクトに最適なソリューションを提供します
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 text-center">
                <div className="text-4xl mb-6">🎨</div>
                <H3 className="mb-4">カスタム制作</H3>
                <Body className="text-fg-muted mb-6">
                  お客様の独自の要件に合わせて、完全オリジナルの機器を制作します。
                  設計から製造まで、一貫したサービスを提供いたします。
                </Body>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>完全オリジナル設計</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>プロトタイプ制作</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>量産対応</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 text-center">
                <div className="text-4xl mb-6">📦</div>
                <H3 className="mb-4">レンタルサービス</H3>
                <Body className="text-fg-muted mb-6">
                  高品質な機器を短期・長期でレンタルいたします。
                  プロジェクトの規模や期間に応じて柔軟に対応いたします。
                </Body>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>日次・週次・月次レンタル</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>配送・設置サービス</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>技術サポート</span>
                  </li>
                </ul>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 機器カテゴリセクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">機器カテゴリ</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                4つの主要カテゴリから、お客様のニーズに最適な機器をお選びいただけます
              </BodyLarge>
            </div>

            <div className="space-y-16">
              {equipmentCategories.map((category, index) => (
                <div key={category.id}>
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* 左側：基本情報 */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl">{category.icon}</div>
                        <div>
                          <H3 className="mb-2">{category.name}</H3>
                          <Body className="text-fg-muted">{category.description}</Body>
                        </div>
                      </div>

                      <div className="mb-6">
                        <H3 className="mb-4">主な特徴</H3>
                        <ul className="space-y-2">
                          {category.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <span className="text-info">🔧</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 料金表 */}
                      <div className="mb-6">
                        <H3 className="mb-4">料金表</H3>
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4 text-center">
                            <H3 className="text-sm mb-2">レンタル料金</H3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>日次</span>
                                <span className="font-bold">¥{category.rentalPrices.daily.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>週次</span>
                                <span className="font-bold">¥{category.rentalPrices.weekly.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>月次</span>
                                <span className="font-bold">¥{category.rentalPrices.monthly.toLocaleString()}</span>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4 text-center">
                            <H3 className="text-sm mb-2">カスタム制作</H3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>ベーシック</span>
                                <span className="font-bold">¥{category.customPrices.basic.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>スタンダード</span>
                                <span className="font-bold">¥{category.customPrices.standard.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>プレミアム</span>
                                <span className="font-bold">¥{category.customPrices.premium.toLocaleString()}</span>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>

                    {/* 右側：安全注意事項 */}
                    <div>
                      <Card className="p-6 border-l-4 border-warning">
                        <H3 className="mb-4 text-warning">⚠️ 安全注意事項</H3>
                        <ul className="space-y-3">
                          {category.safetyNotes.map((note, noteIndex) => (
                            <li key={noteIndex} className="flex items-start gap-3">
                              <span className="text-warning text-lg">•</span>
                              <span className="text-sm">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <div className="mt-6">
                        <Button variant="primary" size="lg" className="w-full mb-3">
                          お見積もり依頼
                        </Button>
                        <Button variant="secondary" size="lg" className="w-full">
                          レンタル予約
                        </Button>
                      </div>
                    </div>
                  </div>

                  {index < equipmentCategories.length - 1 && (
                    <Divider className="my-12" />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 料金体系セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">料金体系</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                透明性の高い料金体系で、お客様の予算に合わせた最適なプランをご提案いたします
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-2 border-line">
                <div className="text-3xl mb-4">💰</div>
                <H3 className="mb-4">レンタルプラン</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  日次 ¥8,000〜
                </div>
                <Body className="text-fg-muted mb-6">
                  短期利用に最適なレンタルプラン
                </Body>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>日次・週次・月次対応</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>配送・設置サービス</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>技術サポート</span>
                  </li>
                </ul>
                <Button variant="secondary" size="lg" className="w-full">
                  詳細を見る
                </Button>
              </Card>

              <Card className="p-8 text-center border-2 border-fg">
                <div className="text-3xl mb-4">🎯</div>
                <H3 className="mb-4">カスタム制作</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  基本 ¥250,000〜
                </div>
                <Body className="text-fg-muted mb-6">
                  完全オリジナルの機器制作
                </Body>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>オリジナル設計</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>プロトタイプ制作</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>量産対応</span>
                  </li>
                </ul>
                <Button variant="primary" size="lg" className="w-full">
                  お見積もり依頼
                </Button>
              </Card>

              <Card className="p-8 text-center border-2 border-line">
                <div className="text-3xl mb-4">🚀</div>
                <H3 className="mb-4">メンテナンス</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  月次 ¥50,000〜
                </div>
                <Body className="text-fg-muted mb-6">
                  定期的な点検・メンテナンス
                </Body>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>定期点検</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>部品交換</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>緊急対応</span>
                  </li>
                </ul>
                <Button variant="secondary" size="lg" className="w-full">
                  詳細を見る
                </Button>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 安全・品質保証セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">安全・品質保証</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                お客様の安全と機器の品質を最優先に考え、包括的な保証サービスを提供いたします
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">🛡️</div>
                <H3 className="mb-3">安全保証</H3>
                <Body className="text-sm text-fg-muted">
                  すべての機器は安全基準を満たし、定期的な点検を実施しています
                </Body>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">🔧</div>
                <H3 className="mb-3">品質保証</H3>
                <Body className="text-sm text-fg-muted">
                  高品質な部品を使用し、耐久性と性能を保証いたします
                </Body>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">📋</div>
                <H3 className="mb-3">技術サポート</H3>
                <Body className="text-sm text-fg-muted">
                  専門スタッフによる技術サポートとトレーニングを提供
                </Body>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">📞</div>
                <H3 className="mb-3">24時間対応</H3>
                <Body className="text-sm text-fg-muted">
                  緊急時は24時間体制でサポートいたします
                </Body>
              </Card>
            </div>
          </Container>
        </Section>

        {/* CTAセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center">
              <H2 className="mb-6">お問い合わせ・お見積もり</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted mb-8">
                カスタム制作やレンタルについて、お気軽にお問い合わせください。
                専門スタッフが最適なソリューションをご提案いたします。
              </BodyLarge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <a href="/contact">お問い合わせ</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="/catalog">商品カタログ</a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}
