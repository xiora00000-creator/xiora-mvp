import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, seoConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `実績・事例 - ${siteConfig.name}`,
  description: 'Xioraの実績と導入事例。DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援の成功事例をご紹介します。',
  openGraph: {
    title: `実績・事例 - ${siteConfig.name}`,
    description: 'Xioraの実績と導入事例。DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援の成功事例をご紹介します。',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/cases`,
  },
}

/**
 * 実績・事例ページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function CasesPage() {
  const cases = [
    {
      title: '製造業A社のDX推進',
      industry: '製造業',
      scale: '従業員200名',
      duration: '6ヶ月',
      description: '従来の紙ベースの業務をデジタル化し、生産効率を大幅に向上',
      before: [
        '紙ベースの生産管理',
        '手作業での在庫管理',
        '電話・FAXでの連絡',
        '月次でのデータ集計',
      ],
      after: [
        'デジタル化された生産管理システム',
        'リアルタイム在庫管理',
        'チャット・メールでの連絡',
        'リアルタイムデータ分析',
      ],
      results: [
        '生産効率30%向上',
        '在庫コスト20%削減',
        'データ集計時間90%短縮',
        '品質向上15%',
      ],
      image: '/images/case1.jpg',
    },
    {
      title: '小売業B社のECサイト構築',
      industry: '小売業',
      scale: '従業員50名',
      duration: '4ヶ月',
      description: 'オンラインショップを構築し、デジタルマーケティングを強化',
      before: [
        '店舗販売のみ',
        '顧客データの未活用',
        'マーケティング効果の測定困難',
        '地域限定の販売',
      ],
      after: [
        'オンラインショップ運営',
        '顧客データベース構築',
        'デジタルマーケティング実施',
        '全国展開',
      ],
      results: [
        'オンライン売上40%向上',
        '顧客数2倍増加',
        'マーケティングROI3倍向上',
        '新規顧客獲得コスト50%削減',
      ],
      image: '/images/case2.jpg',
    },
    {
      title: '教育機関C校のeラーニング導入',
      industry: '教育',
      scale: '生徒1,000名',
      duration: '8ヶ月',
      description: 'eラーニングプラットフォームを導入し、学習効果を向上',
      before: [
        '対面授業のみ',
        '学習進捗の把握困難',
        '教材の管理が煩雑',
        '学習データの未活用',
      ],
      after: [
        'オンライン授業の実施',
        'リアルタイム進捗管理',
        'デジタル教材管理',
        '学習データ分析',
      ],
      results: [
        '学習効果25%向上',
        '管理コスト30%削減',
        '生徒満足度90%向上',
        '学習継続率80%向上',
      ],
      image: '/images/case3.jpg',
    },
    {
      title: '飲食業D店のPOSシステム導入',
      industry: '飲食業',
      scale: '従業員20名',
      duration: '3ヶ月',
      description: 'POSシステムと顧客管理システムを導入し、業務効率を改善',
      before: [
        'レジでの手作業',
        '顧客情報の未管理',
        '在庫管理の不備',
        '売上分析の困難',
      ],
      after: [
        'POSシステムでの自動化',
        '顧客データベース構築',
        'リアルタイム在庫管理',
        '売上データ分析',
      ],
      results: [
        '業務効率40%向上',
        '顧客満足度85%向上',
        '在庫ロス50%削減',
        '売上20%向上',
      ],
      image: '/images/case4.jpg',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              実績・事例
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              お客様のビジネスを次世代へ導いた
              実績豊富な導入事例をご紹介します。
            </p>
          </div>
        </Container>
      </Section>

      {/* 事例一覧 */}
      <Section className="py-20">
        <Container>
          <div className="space-y-20">
            {cases.map((caseItem, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* 左側：基本情報 */}
                  <div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                          {caseItem.industry}
                        </span>
                        <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                          {caseItem.scale}
                        </span>
                        <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                          期間: {caseItem.duration}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-black mb-4">
                        {caseItem.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {caseItem.description}
                      </p>
                    </div>

                    {/* Before/After */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-3">
                          Before（導入前）
                        </h4>
                        <ul className="space-y-2">
                          {caseItem.before.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-3">
                          After（導入後）
                        </h4>
                        <ul className="space-y-2">
                          {caseItem.after.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 右側：成果と画像 */}
                  <div>
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="text-gray-500">Case Image</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-black mb-3">
                        主な成果
                      </h4>
                      <ul className="space-y-3">
                        {caseItem.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center">
                            <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                            <span className="text-gray-600 font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 統計セクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Success Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              お客様の成功を数値で見る
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-2">95%</div>
              <p className="text-gray-600">プロジェクト成功率</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-2">30%</div>
              <p className="text-gray-600">平均効率向上率</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-2">98%</div>
              <p className="text-gray-600">顧客満足度</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 業界別実績 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              業界別実績
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              様々な業界での導入実績
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { industry: '製造業', count: '50+', description: '生産管理システム導入' },
              { industry: '小売業', count: '40+', description: 'ECサイト構築・運営' },
              { industry: '教育', count: '30+', description: 'eラーニング導入' },
              { industry: '飲食業', count: '25+', description: 'POSシステム導入' },
              { industry: 'サービス業', count: '20+', description: '業務システム構築' },
              { industry: '建設業', count: '15+', description: 'プロジェクト管理システム' },
              { industry: '医療・介護', count: '10+', description: '情報管理システム' },
              { industry: 'その他', count: '20+', description: 'カスタムシステム開発' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-black mb-2">{item.count}</div>
                  <div className="text-lg font-semibold text-black mb-2">{item.industry}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
