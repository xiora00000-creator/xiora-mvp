import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, companyInfo, contactInfo, seoConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `会社概要 - ${siteConfig.name}`,
  description: '株式会社Xioraの会社概要。次世代を作り繋げる企業として、DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援を提供しています。',
  openGraph: {
    title: `会社概要 - ${siteConfig.name}`,
    description: '株式会社Xioraの会社概要。次世代を作り繋げる企業として、DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援を提供しています。',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/company`,
  },
}

/**
 * 会社概要ページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function CompanyPage() {
  const companyData = [
    { label: '会社名', value: companyInfo.name },
    { label: '英文社名', value: companyInfo.englishName },
    { label: '設立', value: siteConfig.founded },
    { label: '資本金', value: siteConfig.capital },
    { label: '代表取締役', value: siteConfig.ceo },
    { label: '従業員数', value: siteConfig.employees },
    { label: '本社所在地', value: `〒${siteConfig.address.postalCode} ${siteConfig.address.prefecture}${siteConfig.address.city}${siteConfig.address.street}` },
    { label: '建物', value: siteConfig.address.building },
    { label: '事業内容', value: companyInfo.industries.join('、') },
  ]

  const team = [
    {
      name: '田中 太郎',
      position: '代表取締役CEO',
      description: 'システム開発・DXコンサルティングの専門家。大手IT企業での豊富な経験を持つ。',
      image: '/images/team1.jpg',
    },
    {
      name: '佐藤 花子',
      position: 'CTO',
      description: 'ソフトウェア工学の専門家。最新技術の研究開発をリードしている。',
      image: '/images/team2.jpg',
    },
    {
      name: '鈴木 一郎',
      position: 'CFO',
      description: '経営管理のプロ。財務戦略の立案・実行を担当している。',
      image: '/images/team3.jpg',
    },
    {
      name: '高橋 美咲',
      position: '営業部長',
      description: '顧客との関係構築を得意とし、多くのプロジェクトを成功に導いている。',
      image: '/images/team4.jpg',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              会社概要
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              次世代を作り繋げる企業として、
              お客様のビジネスを次世代へ導きます。
            </p>
          </div>
        </Container>
      </Section>

      {/* 会社概要 */}
      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                Company Overview
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                株式会社Xioraは、次世代を作り繋げる企業として、
                お客様のビジネスを次世代へ導くことを使命としています。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                私たちは、DX・WEB開発、EC、教育、人材育成、ものづくり、
                飲食、補助金支援の7つの専門領域で包括的なサポートを提供し、
                お客様の成功を支援しています。
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-black mb-6">
                会社情報
              </h3>
              <div className="space-y-4">
                {companyData.map((info, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-black">{info.label}</span>
                    <span className="text-gray-600 text-right max-w-xs">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 事業内容詳細 */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              事業内容
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              7つの専門領域で包括的なサポートを提供
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {industry}
                </h3>
                <p className="text-gray-600 text-sm">
                  専門的な知識と豊富な経験を活かし、
                  お客様のニーズに最適なソリューションを提供します。
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* チーム紹介 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              経験豊富な専門家が集結
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 沿革 */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Company History
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
                  description: '次世代を作り繋げる企業として、Xioraを設立。DX・WEB開発サービスを開始。',
                },
                {
                  year: '2021',
                  title: '事業拡大',
                  description: 'EC構築・運営サービスを開始。50社以上のクライアントを獲得。',
                },
                {
                  year: '2022',
                  title: '教育事業開始',
                  description: '教育システム開発と人材育成支援サービスを開始。従業員数を30名に拡大。',
                },
                {
                  year: '2023',
                  title: '補助金支援開始',
                  description: 'IT導入補助金申請支援サービスを開始。100社以上の支援実績を達成。',
                },
                {
                  year: '2024',
                  title: '現在',
                  description: '7つの専門領域で包括的なサポートを提供。150社以上のクライアントを支援。',
                },
              ].map((history, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center mr-6">
                    <span className="text-white font-bold">{history.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {history.title}
                    </h3>
                    <p className="text-gray-600">
                      {history.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 認定・資格 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              取得している認定・資格
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyInfo.certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold text-black">
                  {cert}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* アクセス */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Access
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              アクセス情報
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                本社所在地
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>〒{siteConfig.address.postalCode}</p>
                <p>{siteConfig.address.prefecture}{siteConfig.address.city}{siteConfig.address.street}</p>
                <p>{siteConfig.address.building}</p>
                <p>TEL: {siteConfig.phone}</p>
                <p>Email: {siteConfig.email}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                営業時間
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>平日: {siteConfig.businessHours.weekdays}</p>
                <p>土曜: {siteConfig.businessHours.saturday}</p>
                <p>日曜: {siteConfig.businessHours.sunday}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
