import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, seoConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `採用・パートナー - ${siteConfig.name}`,
  description: 'Xioraの採用情報とパートナー募集。次世代を作り繋げる企業と一緒に、お客様のビジネスを次世代へ導きませんか？',
  openGraph: {
    title: `採用・パートナー - ${siteConfig.name}`,
    description: 'Xioraの採用情報とパートナー募集。次世代を作り繋げる企業と一緒に、お客様のビジネスを次世代へ導きませんか？',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/recruit`,
  },
}

/**
 * 採用・パートナーページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function RecruitPage() {
  const positions = [
    {
      title: 'フロントエンドエンジニア',
      department: '開発部',
      type: '正社員',
      location: '東京都渋谷区',
      description: 'React/Next.jsを使用したWebアプリケーションの開発を担当していただきます。',
      requirements: [
        'React/Next.jsの実務経験3年以上',
        'TypeScriptの使用経験',
        'Gitの基本的な操作',
        'チーム開発の経験',
      ],
      benefits: [
        '年俸制（経験に応じて調整）',
        'リモートワーク可',
        'フレックス制度',
        '各種研修制度',
      ],
    },
    {
      title: 'バックエンドエンジニア',
      department: '開発部',
      type: '正社員',
      location: '東京都渋谷区',
      description: 'Node.js/Pythonを使用したサーバーサイド開発を担当していただきます。',
      requirements: [
        'Node.jsまたはPythonの実務経験3年以上',
        'データベース設計の経験',
        'API設計・開発の経験',
        'クラウドサービスの使用経験',
      ],
      benefits: [
        '年俸制（経験に応じて調整）',
        'リモートワーク可',
        'フレックス制度',
        '各種研修制度',
      ],
    },
    {
      title: 'プロジェクトマネージャー',
      department: '事業部',
      type: '正社員',
      location: '東京都渋谷区',
      description: 'プロジェクトの進行管理とお客様とのコミュニケーションを担当していただきます。',
      requirements: [
        'プロジェクト管理の実務経験3年以上',
        'IT業界での経験',
        'お客様とのコミュニケーション経験',
        'PMP資格（歓迎）',
      ],
      benefits: [
        '年俸制（経験に応じて調整）',
        'リモートワーク可',
        'フレックス制度',
        '各種研修制度',
      ],
    },
    {
      title: '営業担当者',
      department: '営業部',
      type: '正社員',
      location: '東京都渋谷区',
      description: '新規顧客の開拓と既存顧客との関係構築を担当していただきます。',
      requirements: [
        '営業経験3年以上',
        'IT業界での経験（歓迎）',
        'コミュニケーション能力',
        '目標達成への意欲',
      ],
      benefits: [
        '年俸制（経験に応じて調整）',
        'リモートワーク可',
        'フレックス制度',
        '各種研修制度',
      ],
    },
  ]

  const benefits = [
    {
      title: '働き方',
      items: [
        'フレックス制度（コアタイム10:00-15:00）',
        'リモートワーク可（週3日まで）',
        '有給取得率100%',
        '育児休暇・介護休暇制度',
      ],
    },
    {
      title: '福利厚生',
      items: [
        '社会保険完備',
        '退職金制度',
        '健康診断・人間ドック補助',
        '書籍購入補助',
      ],
    },
    {
      title: '成長支援',
      items: [
        '外部研修参加費補助',
        '資格取得支援',
        '技術書購入補助',
        'カンファレンス参加支援',
      ],
    },
  ]

  const partners = [
    {
      title: '技術パートナー',
      description: '最新技術の研究開発や技術的な課題解決を一緒に取り組むパートナーを募集しています。',
      requirements: [
        '特定技術分野での専門性',
        '研究開発経験',
        '技術的な課題解決能力',
        'チームワーク',
      ],
    },
    {
      title: 'ビジネスパートナー',
      description: '新規事業の開拓や既存事業の拡大を一緒に取り組むパートナーを募集しています。',
      requirements: [
        'ビジネス開発経験',
        '業界知識',
        'ネットワーク',
        '事業拡大への意欲',
      ],
    },
    {
      title: '教育パートナー',
      description: '人材育成や教育プログラムの開発を一緒に取り組むパートナーを募集しています。',
      requirements: [
        '教育・研修経験',
        'カリキュラム開発経験',
        '人材育成への情熱',
        'コミュニケーション能力',
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
              採用・パートナー
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              次世代を作り繋げる企業と一緒に、
              お客様のビジネスを次世代へ導きませんか？
            </p>
          </div>
        </Container>
      </Section>

      {/* 募集職種 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              現在募集中の職種
            </p>
          </div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <a
                    href={`/contact?type=recruit&position=${encodeURIComponent(position.title)}`}
                    className="mt-4 md:mt-0 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    応募する
                  </a>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {position.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      必須要件
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      待遇・福利厚生
                    </h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
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

      {/* 福利厚生 */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Benefits & Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              働きやすい環境と充実した福利厚生
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">
                  {benefit.title}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* パートナー募集 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Partner Recruitment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              一緒に成長するパートナーを募集しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {partner.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {partner.description}
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-3">
                    求められる経験・スキル
                  </h4>
                  <ul className="space-y-2">
                    {partner.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`/contact?type=partner&category=${encodeURIComponent(partner.title)}`}
                  className="mt-6 block w-full text-center bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  パートナーとして応募
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 会社の魅力 */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Why Xiora?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Xioraで働く理由
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">
                次世代を作り繋げる企業で働く
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                私たちは、お客様のビジネスを次世代へ導くために、
                最新の技術と創造的なアイデアを組み合わせた
                革新的なソリューションを提供しています。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  <span className="text-gray-600">最新技術の習得機会</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  <span className="text-gray-600">多様なプロジェクト経験</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  <span className="text-gray-600">成長できる環境</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="text-6xl font-bold text-black mb-4">50+</div>
              <p className="text-lg text-gray-600">
                現在50名の優秀なメンバーが
                共に働いています
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 応募プロセス */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              応募から入社までの流れ
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: '応募', description: '求人ページから応募' },
                { step: '2', title: '書類選考', description: '履歴書・職務経歴書を確認' },
                { step: '3', title: '面接', description: '1-2回の面接を実施' },
                { step: '4', title: '内定・入社', description: '内定後、入社手続き' },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{process.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTAセクション */}
      <Section className="py-20 bg-black">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              一緒に次世代を作り繋げませんか？
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              あなたのスキルと情熱で、私たちのチームをより強くしましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact?type=recruit" 
                className="bg-white text-black px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                採用応募
              </a>
              <a 
                href="/contact?type=partner" 
                className="border border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-black transition-colors font-medium"
              >
                パートナー応募
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
