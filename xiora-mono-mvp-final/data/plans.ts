/**
 * プランと料金データ
 * 次世代を作り繋げる企業 - Xiora
 */

export interface PlanFeature {
  name: string
  included: boolean
  description?: string
}

export interface Plan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  description: string
  features: PlanFeature[]
  popular: boolean
  buttonText: string
  buttonHref: string
  targetAudience: string
}

export const plans: Plan[] = [
  {
    id: 'light',
    name: 'ライトプラン',
    price: 50000,
    period: 'monthly',
    description: '小規模事業者向けの基本プラン',
    targetAudience: '従業員10名以下の小規模事業者',
    features: [
      { name: '基本的なWEBサイト制作', included: true, description: '5ページまでのシンプルなサイト' },
      { name: '月10時間のサポート', included: true, description: 'メール・電話サポート' },
      { name: '基本的なSEO対策', included: true, description: '基本的な検索エンジン最適化' },
      { name: '月1回の更新作業', included: true, description: 'コンテンツ更新・メンテナンス' },
      { name: '24時間サポート', included: false },
      { name: '専任担当者', included: false },
      { name: '高度なカスタマイズ', included: false },
      { name: 'EC機能', included: false },
    ],
    popular: false,
    buttonText: 'プランを選択',
    buttonHref: '/contact?plan=light',
  },
  {
    id: 'standard',
    name: 'スタンダードプラン',
    price: 150000,
    period: 'monthly',
    description: '中規模事業者向けの標準プラン',
    targetAudience: '従業員50名以下の中規模事業者',
    features: [
      { name: '包括的なWEBサイト制作', included: true, description: '20ページまでの本格的なサイト' },
      { name: '月30時間のサポート', included: true, description: 'メール・電話・チャットサポート' },
      { name: '高度なSEO対策', included: true, description: '検索エンジン最適化とアクセス解析' },
      { name: '月2回の更新作業', included: true, description: 'コンテンツ更新・機能追加' },
      { name: '専任担当者', included: true, description: 'プロジェクトマネージャーが担当' },
      { name: '基本的なEC機能', included: true, description: '商品登録・注文管理機能' },
      { name: '24時間サポート', included: false },
      { name: '高度なカスタマイズ', included: false },
      { name: 'API連携', included: false },
    ],
    popular: true,
    buttonText: 'プランを選択',
    buttonHref: '/contact?plan=standard',
  },
  {
    id: 'premium',
    name: 'プレミアムプラン',
    price: 300000,
    period: 'monthly',
    description: '大規模事業者向けの高機能プラン',
    targetAudience: '従業員100名以上の大規模事業者',
    features: [
      { name: 'フルカスタムWEBサイト制作', included: true, description: '無制限ページの完全カスタムサイト' },
      { name: '無制限サポート', included: true, description: '24時間365日対応サポート' },
      { name: '最適化されたSEO対策', included: true, description: '包括的な検索エンジン最適化' },
      { name: '週1回の更新作業', included: true, description: '定期的なコンテンツ更新・機能改善' },
      { name: '専任チーム', included: true, description: '複数名の専門チームが担当' },
      { name: '高度なEC機能', included: true, description: '在庫管理・決済連携・顧客管理' },
      { name: 'API連携', included: true, description: '既存システムとの連携' },
      { name: '高度なカスタマイズ', included: true, description: '完全カスタマイズ対応' },
      { name: 'SLA保証', included: true, description: '99.9%の稼働率保証' },
    ],
    popular: false,
    buttonText: 'お問い合わせ',
    buttonHref: '/contact?plan=premium',
  },
]

export const additionalServices = [
  {
    id: 'consulting',
    name: 'DXコンサルティング',
    description: 'デジタル変革の戦略立案から実装まで、専門的なコンサルティングサービスを提供します。',
    price: 15000,
    unit: '時間',
    features: [
      '現状分析と課題整理',
      'DX戦略の立案',
      'システム選定支援',
      '導入計画の策定',
      '運用サポート',
    ],
  },
  {
    id: 'training',
    name: '人材育成支援',
    description: '従業員のデジタルスキル向上を支援する研修プログラムを提供します。',
    price: 200000,
    unit: '回',
    features: [
      'デジタルリテラシー研修',
      'システム操作研修',
      'データ分析研修',
      'セキュリティ研修',
      '継続的なフォローアップ',
    ],
  },
  {
    id: 'subsidy',
    name: '補助金申請支援',
    description: 'IT導入補助金や事業再構築補助金などの申請をサポートします。',
    price: 100000,
    unit: '件',
    features: [
      '補助金制度の調査',
      '申請書類の作成',
      '提出サポート',
      '審査対応',
      '受給後の報告書作成',
    ],
  },
]

export const faqs = [
  {
    question: 'プランの変更は可能ですか？',
    answer: 'はい、いつでもプランの変更が可能です。変更は翌月から適用されます。',
  },
  {
    question: '解約の際の違約金はありますか？',
    answer: '違約金はございません。いつでも解約可能です。',
  },
  {
    question: 'カスタマイズはどの程度可能ですか？',
    answer: 'お客様のニーズに合わせて柔軟にカスタマイズ可能です。詳細はお問い合わせください。',
  },
  {
    question: 'サポートの対応時間はどのようになっていますか？',
    answer: 'ライトプランは平日9:00-18:00、スタンダードプランは平日9:00-21:00、プレミアムプランは24時間365日対応です。',
  },
  {
    question: '追加の開発時間は購入できますか？',
    answer: 'はい、追加の開発時間は1時間あたり¥10,000で購入可能です。',
  },
  {
    question: 'EC機能の詳細を教えてください',
    answer: '商品管理、在庫管理、注文管理、決済連携、顧客管理などの機能を提供しています。',
  },
]
