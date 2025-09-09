import { Metadata } from 'next'
import { Container } from '@/app/components/ui/Container'
import { Section } from '@/app/components/ui/Section'
import { siteConfig, seoConfig } from '@/data/site'
import { plans, additionalServices, faqs } from '@/data/plans'

export const metadata: Metadata = {
  title: `プランと料金 - ${siteConfig.name}`,
  description: 'Xioraのプランと料金。ライトプランからプレミアムプランまで、お客様のニーズに合わせた柔軟な料金プランをご用意しています。',
  openGraph: {
    title: `プランと料金 - ${siteConfig.name}`,
    description: 'Xioraのプランと料金。ライトプランからプレミアムプランまで、お客様のニーズに合わせた柔軟な料金プランをご用意しています。',
    type: 'website',
    siteName: siteConfig.name,
    url: `${siteConfig.url}/plans`,
  },
}

/**
 * プランと料金ページ
 * 次世代を作り繋げる企業 - Xiora
 */
export default function PlansPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              プランと料金
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              お客様のニーズに合わせた
              柔軟な料金プランをご用意しています。
            </p>
          </div>
        </Container>
      </Section>

      {/* プラン一覧 */}
      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-sm border-2 p-8 ${
                  plan.popular ? 'border-black' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                      人気
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.targetAudience}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-black">
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/月</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-black">含まれる機能</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                          feature.included ? 'bg-black' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <span className={`text-sm ${
                            feature.included ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {feature.name}
                          </span>
                          {feature.description && (
                            <p className="text-xs text-gray-500 mt-1">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.buttonHref}
                  className={`w-full py-3 px-6 rounded-md font-medium transition-colors text-center block ${
                    plan.popular
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 追加サービス */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              追加でご利用いただけるサービス
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={service.id} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="text-2xl font-bold text-black mb-4">
                  ¥{service.price.toLocaleString()} / {service.unit}
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 料金の特徴 */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              料金の特徴
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              透明性のある料金体系
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">透明性</h3>
              <p className="text-gray-600">
                隠れた費用は一切ありません。
                すべての料金を事前にご提示します。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">柔軟性</h3>
              <p className="text-gray-600">
                プランの変更や追加サービスは
                いつでも対応可能です。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">ROI重視</h3>
              <p className="text-gray-600">
                投資対効果を重視した
                料金設定を行っています。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              よくあるご質問
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* お問い合わせ */}
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black mb-6">
              最適なプランを見つけませんか？
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              お客様のニーズに合わせて、最適なプランをご提案します。
              まずはお気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact?type=consultation" 
                className="bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                無料相談
              </a>
              <a 
                href="/contact?type=document" 
                className="border border-black text-black px-8 py-4 rounded-md hover:bg-black hover:text-white transition-colors font-medium"
              >
                資料請求
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
