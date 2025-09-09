import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { Hero } from '@/app/components/ui/Hero'
import { siteConfig, seoConfig } from '@/data/site'
import { ctaButtons } from '@/data/nav'

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: seoConfig.defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.twitterSite,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.ogImage],
  },
}

/**
 * ホームページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Hero
        title="次世代を作り繋げる企業"
        subtitle={siteConfig.name}
        description="DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援を通じて、お客様のビジネスを次世代へ導きます"
        primaryAction={{
          label: ctaButtons.primary.text,
          href: ctaButtons.primary.href
        }}
        secondaryAction={{
          label: ctaButtons.secondary.text,
          href: ctaButtons.secondary.href
        }}
        background="gradient"
        size="lg"
      />

      {/* 事業概要セクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              事業概要
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              私たちは、お客様のビジネスを次世代へ導くために、
              7つの専門領域で包括的なサポートを提供しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'DX・WEB開発',
                description: 'デジタル変革を支援するシステム開発とWEBサイト制作',
                icon: '💻',
              },
              {
                title: 'EC構築・運営',
                description: 'オンラインショップの構築から運営まで一貫サポート',
                icon: '🛒',
              },
              {
                title: '教育システム',
                description: 'eラーニングプラットフォームと教育管理システム',
                icon: '📚',
              },
              {
                title: '人材育成支援',
                description: 'デジタルスキル向上のための研修プログラム',
                icon: '👥',
              },
              {
                title: 'ものづくり支援',
                description: '製造業のデジタル化とIoT導入支援',
                icon: '🏭',
              },
              {
                title: '飲食業支援',
                description: 'POSシステムと顧客管理システムの導入',
                icon: '🍽️',
              },
              {
                title: '補助金申請支援',
                description: 'IT導入補助金や事業再構築補助金の申請サポート',
                icon: '💰',
              },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 実績サマリセクション */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              実績サマリ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              多くのお客様に選ばれ続けている実績
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

      {/* 特徴セクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              選ばれる理由
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              お客様に選ばれ続ける3つの理由
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">専門性</h3>
              <p className="text-gray-600">
                各分野の専門知識を持つチームが、
                お客様のニーズに最適なソリューションを提供します。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">スピード</h3>
              <p className="text-gray-600">
                迅速な対応と効率的な開発プロセスで、
                お客様のビジネスを加速させます。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">パートナーシップ</h3>
              <p className="text-gray-600">
                長期的なパートナーとして、
                お客様の成長を継続的にサポートします。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTAセクション */}
      <Section className="py-20 bg-black">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              次世代を作り繋げる企業と一緒に
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              お客様のビジネスを次世代へ導くお手伝いをします。
              まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={ctaButtons.primary.href}
                className="bg-white text-black px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                {ctaButtons.primary.text}
              </a>
              <a 
                href={ctaButtons.secondary.href}
                className="border border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-black transition-colors font-medium"
              >
                {ctaButtons.secondary.text}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
