import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, seoConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `事業内容 - ${siteConfig.name}`,
  description: 'DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援の7つの専門領域で包括的なサポートを提供します。',
  openGraph: {
    title: `事業内容 - ${siteConfig.name}`,
    description: 'DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援の7つの専門領域で包括的なサポートを提供します。',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/business`,
  },
}

/**
 * 事業内容ページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function BusinessPage() {
  const services = [
    {
      id: 'dx-web',
      title: 'DX・WEB開発',
      description: 'デジタル変革を支援するシステム開発とWEBサイト制作',
      icon: '💻',
      features: [
        'システム設計・開発',
        'WEBサイト制作・リニューアル',
        'クラウド移行支援',
        'API開発・連携',
        'データベース設計・構築',
        'セキュリティ対策',
      ],
      benefits: [
        '業務効率の大幅改善',
        'コスト削減の実現',
        'データ活用の促進',
        '競争力の向上',
      ],
    },
    {
      id: 'ec',
      title: 'EC構築・運営',
      description: 'オンラインショップの構築から運営まで一貫サポート',
      icon: '🛒',
      features: [
        'ECサイト構築',
        '商品管理システム',
        '在庫管理システム',
        '決済システム連携',
        '顧客管理システム',
        'マーケティング支援',
      ],
      benefits: [
        'オンライン売上の拡大',
        '顧客データの蓄積',
        '24時間365日の販売',
        'マーケティング効果の向上',
      ],
    },
    {
      id: 'education',
      title: '教育システム',
      description: 'eラーニングプラットフォームと教育管理システム',
      icon: '📚',
      features: [
        'eラーニングプラットフォーム',
        '学習管理システム（LMS）',
        'オンライン研修システム',
        '進捗管理システム',
        '評価・テストシステム',
        'コンテンツ管理システム',
      ],
      benefits: [
        '学習効果の向上',
        '教育コストの削減',
        '学習データの分析',
        'スケーラブルな教育提供',
      ],
    },
    {
      id: 'hr',
      title: '人材育成支援',
      description: 'デジタルスキル向上のための研修プログラム',
      icon: '👥',
      features: [
        'デジタルリテラシー研修',
        'システム操作研修',
        'データ分析研修',
        'セキュリティ研修',
        'リモートワーク研修',
        '継続的なフォローアップ',
      ],
      benefits: [
        '従業員スキルの向上',
        '生産性の向上',
        '離職率の低下',
        '組織力の強化',
      ],
    },
    {
      id: 'manufacturing',
      title: 'ものづくり支援',
      description: '製造業のデジタル化とIoT導入支援',
      icon: '🏭',
      features: [
        'IoTシステム導入',
        '生産管理システム',
        '品質管理システム',
        '設備管理システム',
        '在庫管理システム',
        'データ分析・可視化',
      ],
      benefits: [
        '生産効率の向上',
        '品質の安定化',
        'コスト削減',
        '予知保全の実現',
      ],
    },
    {
      id: 'food',
      title: '飲食業支援',
      description: 'POSシステムと顧客管理システムの導入',
      icon: '🍽️',
      features: [
        'POSシステム導入',
        '顧客管理システム',
        '在庫管理システム',
        '予約管理システム',
        'デリバリー管理システム',
        'マーケティング支援',
      ],
      benefits: [
        '売上の向上',
        '顧客満足度の向上',
        '業務効率の改善',
        'データ活用の促進',
      ],
    },
    {
      id: 'subsidy',
      title: '補助金申請支援',
      description: 'IT導入補助金や事業再構築補助金の申請サポート',
      icon: '💰',
      features: [
        '補助金制度の調査',
        '申請書類の作成',
        '提出サポート',
        '審査対応',
        '受給後の報告書作成',
        '継続的なフォローアップ',
      ],
      benefits: [
        '導入コストの削減',
        'リスクの軽減',
        '専門知識の活用',
        '申請成功率の向上',
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              事業内容
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              7つの専門領域で包括的なサポートを提供し、
              お客様のビジネスを次世代へ導きます。
            </p>
          </div>
        </Container>
      </Section>

      {/* サービス一覧 */}
      <Section className="py-20">
        <Container>
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{service.icon}</div>
                      <p className="text-gray-500">Service Image</p>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl font-bold text-black mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-black mb-3">
                      提供サービス
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">
                      期待される効果
                    </h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 技術スタック */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              技術スタック
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              最新の技術を活用したソリューション
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React/Next.js', category: 'フロントエンド' },
              { name: 'Node.js', category: 'バックエンド' },
              { name: 'Python', category: 'データ分析' },
              { name: 'AWS', category: 'クラウド' },
              { name: 'Docker', category: 'コンテナ' },
              { name: 'Kubernetes', category: 'オーケストレーション' },
              { name: 'PostgreSQL', category: 'データベース' },
              { name: 'MongoDB', category: 'NoSQL' },
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="text-lg font-semibold text-black mb-2">{tech.name}</div>
                  <div className="text-sm text-gray-500">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 実績 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              実績
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              これまでの実績
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-black mb-2">200+</div>
              <p className="text-gray-600">プロジェクト完了</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-black mb-2">150+</div>
              <p className="text-gray-600">クライアント企業</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-black mb-2">99.9%</div>
              <p className="text-gray-600">稼働率</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-black mb-2">24/7</div>
              <p className="text-gray-600">サポート体制</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
