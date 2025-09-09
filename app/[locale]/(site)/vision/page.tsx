import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, seoConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Vision & Mission - ${siteConfig.name}`,
  description: 'Xioraのビジョンとミッション。次世代を作り繋げる企業として、お客様のビジネスを次世代へ導きます。',
  openGraph: {
    title: `Vision & Mission - ${siteConfig.name}`,
    description: 'Xioraのビジョンとミッション。次世代を作り繋げる企業として、お客様のビジネスを次世代へ導きます。',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/vision`,
  },
}

/**
 * ビジョンページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function VisionPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              Vision & Mission
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              次世代を作り繋げる企業として、
              お客様のビジネスを次世代へ導くことが私たちの使命です。
            </p>
          </div>
        </Container>
      </Section>

      {/* ビジョンセクション */}
      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                私たちは、テクノロジーの力で社会をより良くし、
                次世代のビジネスモデルを創造する企業を目指しています。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                お客様の成功を通じて、持続可能で豊かな社会の実現に
                貢献していきます。
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="text-6xl font-bold text-black mb-4">2030</div>
              <p className="text-lg text-gray-600">
                2030年までに、1,000社以上の企業の
                デジタル変革を支援し、
                次世代のビジネスリーダーを育成することを目指しています。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ミッションセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              私たちの使命
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Innovation</h3>
              <p className="text-gray-600">
                最新のテクノロジーを活用し、
                革新的なソリューションを提供します。
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Partnership</h3>
              <p className="text-gray-600">
                お客様との長期的なパートナーシップを築き、
                共に成長していきます。
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Impact</h3>
              <p className="text-gray-600">
                社会にポジティブな影響を与え、
                持続可能な未来を創造します。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 価値観セクション */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              私たちが大切にする価値観
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  title: 'Customer First',
                  description: 'お客様の成功を最優先に考え、常にお客様目線でサービスを提供します。',
                },
                {
                  title: 'Quality Excellence',
                  description: '最高品質のサービスと成果物を提供することを追求し続けます。',
                },
                {
                  title: 'Continuous Learning',
                  description: '常に学び続け、最新の知識と技術を身につけていきます。',
                },
                {
                  title: 'Team Collaboration',
                  description: 'チームワークを重視し、お互いを尊重し合う環境を築きます。',
                },
                {
                  title: 'Integrity',
                  description: '誠実で透明性のあるビジネスを実践し、信頼関係を築きます。',
                },
              ].map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ストーリーセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              私たちの歩み
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: '2020',
                  title: '会社設立',
                  description: '次世代を作り繋げる企業として、Xioraを設立。デジタル変革支援を開始。',
                },
                {
                  year: '2021',
                  title: '事業拡大',
                  description: 'EC構築・運営サービスを開始。50社以上のクライアントを獲得。',
                },
                {
                  year: '2022',
                  title: '教育事業開始',
                  description: '教育システム開発と人材育成支援サービスを開始。',
                },
                {
                  year: '2023',
                  title: '補助金支援開始',
                  description: 'IT導入補助金申請支援サービスを開始。100社以上の支援実績。',
                },
                {
                  year: '2024',
                  title: '現在',
                  description: '7つの専門領域で包括的なサポートを提供。150社以上のクライアントを支援。',
                },
              ].map((story, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold">{story.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
