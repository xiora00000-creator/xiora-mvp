/**
 * ナビゲーションデータ
 * 次世代を作り繋げる企業 - Xiora
 */

export interface NavItem {
  name: string
  href: string
  description?: string
  children?: NavItem[]
}

export const mainNavigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'ホームページ',
  },
  {
    name: 'Vision',
    href: '/vision',
    description: 'ビジョンとミッション',
  },
  {
    name: 'Business',
    href: '/business',
    description: '事業内容',
  },
  {
    name: 'Cases',
    href: '/cases',
    description: '実績・事例',
  },
  {
    name: 'Plans',
    href: '/plans',
    description: 'プランと料金',
  },
  {
    name: 'Company',
    href: '/company',
    description: '会社概要',
  },
  {
    name: 'Recruit',
    href: '/recruit',
    description: '採用・パートナー',
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'お問い合わせ',
  },
]

export const footerNavigation = {
  company: [
    { name: '会社概要', href: '/company' },
    { name: 'ビジョン', href: '/vision' },
    { name: '事業内容', href: '/business' },
    { name: '採用情報', href: '/recruit' },
  ],
  services: [
    { name: 'DX・WEB開発', href: '/business#dx-web' },
    { name: 'EC構築', href: '/business#ec' },
    { name: '教育システム', href: '/business#education' },
    { name: '人材育成', href: '/business#hr' },
    { name: 'ものづくり支援', href: '/business#manufacturing' },
    { name: '飲食業支援', href: '/business#food' },
    { name: '補助金支援', href: '/business#subsidy' },
  ],
  support: [
    { name: '実績・事例', href: '/cases' },
    { name: 'プランと料金', href: '/plans' },
    { name: 'お問い合わせ', href: '/contact' },
    { name: '資料請求', href: '/contact?type=document' },
  ],
  legal: [
    { name: 'プライバシーポリシー', href: '/privacy' },
    { name: '利用規約', href: '/terms' },
    { name: '特定商取引法に基づく表記', href: '/legal' },
    { name: 'サイトマップ', href: '/sitemap' },
  ],
}

export const ctaButtons = {
  primary: {
    text: '無料相談',
    href: '/contact?type=consultation',
    description: 'お気軽にご相談ください',
  },
  secondary: {
    text: '資料請求',
    href: '/contact?type=document',
    description: '詳細資料をダウンロード',
  },
}

export const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/xiora',
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/xiora',
    icon: 'linkedin',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/xiora',
    icon: 'facebook',
  },
]
