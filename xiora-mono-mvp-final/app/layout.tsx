import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { PerformanceMonitor } from './components/PerformanceMonitor'
import { AnalyticsProvider, defaultAnalyticsConfig } from './components/analytics/AnalyticsProvider'
import { PrivacyConsent } from './components/analytics/PrivacyConsent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://xiora.com'),
  title: {
    default: 'Xiora - 宇宙の美しさを、地球に',
    template: '%s | Xiora'
  },
  description: '宇宙技術とミニマルデザインを融合し、未来の生活を創造します。最先端のイノベーションで、人々の生活を豊かにする製品を提供します。',
  keywords: [
    '宇宙技術',
    'ミニマルデザイン',
    'イノベーション',
    'Xiora',
    'テクノロジー',
    'デザイン',
    '未来',
    '宇宙',
    'ミニマリズム',
    'サステナビリティ'
  ],
  authors: [
    { name: 'Xiora Team' },
    { name: 'Xiora Design Studio' }
  ],
  creator: 'Xiora',
  publisher: 'Xiora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://xiora.com',
    title: 'Xiora - 宇宙の美しさを、地球に',
    description: '宇宙技術とミニマルデザインを融合し、未来の生活を創造します。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xiora - 宇宙技術とミニマルデザインの融合',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 600,
        height: 600,
        alt: 'Xiora Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@xiora_official',
    creator: '@xiora_official',
    title: 'Xiora - 宇宙の美しさを、地球に',
    description: '宇宙技術とミニマルデザインを融合し、未来の生活を創造します。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://xiora.com',
    languages: {
      'ja': 'https://xiora.com/ja',
      'en': 'https://xiora.com/en',
    },
  },
  category: 'technology',
  classification: 'Business',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Xiora',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
