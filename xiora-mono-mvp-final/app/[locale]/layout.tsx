import { Metadata } from 'next'
import { PWAInstaller } from '@/app/components/PWAInstaller'
// import { AnalyticsProvider, defaultAnalyticsConfig } from '@/app/components/analytics/AnalyticsProvider'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = params
  
  return {
    title: {
      template: '%s | Xiora',
      default: locale === 'ja' ? 'Xiora - 次世代を作り繋げる企業' : 'Xiora - Creating and Connecting the Next Generation',
    },
    description: locale === 'ja' 
      ? 'DX・WEB開発、EC、教育、人材育成、ものづくり、飲食、補助金支援を通じて、お客様のビジネスを次世代へ導きます。'
      : 'Leading your business to the next generation through DX/WEB development, EC, education, human resource development, manufacturing, food & beverage, and subsidy support.',
    openGraph: {
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: locale === 'ja' ? 'en_US' : 'ja_JP',
    },
    alternates: {
      languages: {
        'ja': '/ja',
        'en': '/en',
      },
    },
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params

  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <PWAInstaller />
    </div>
  )
}
