"use client"

import { useRouter } from 'next/navigation'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'
import { ProductCard } from '../components/ui/ProductCard'
import { Badge } from '../components/ui/Badge'

// カテゴリデータ
const categories = [
  {
    id: 'camera',
    name: 'カメラ・映像機器',
    description: 'プロ仕様のカメラと映像機器',
    icon: '📷',
    productCount: 12,
    featured: true
  },
  {
    id: 'lighting',
    name: '照明機器',
    description: 'スタジオ照明からLEDライトまで',
    icon: '💡',
    productCount: 8,
    featured: true
  },
  {
    id: 'audio',
    name: '音響機器',
    description: 'マイク、ミキサー、スピーカー',
    icon: '🎤',
    productCount: 15,
    featured: false
  },
  {
    id: 'accessories',
    name: 'アクセサリー',
    description: '三脚、ケース、フィルターなど',
    icon: '🔧',
    productCount: 20,
    featured: false
  }
]

// 商品データ
const products = [
  {
    id: 'camera-001',
    name: 'Xiora Pro Camera X1',
    description: '4K対応プロ仕様カメラ。高画質と使いやすさを両立した最新モデル。',
    price: {
      amount: 298000,
      currency: '¥',
      unit: '台'
    },
    category: 'camera',
    image: '/products/camera-x1.jpg',
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    featured: true,
    priority: true,
    specs: {
      '解像度': '4K (3840 x 2160)',
      'センサー': '1インチ CMOS',
      'レンズ': '交換式レンズ対応'
    },
    materials: ['マグネシウム合金', '金属製', 'ゴム素材']
  },
  {
    id: 'lighting-001',
    name: 'Xiora LED Studio Light',
    description: '自然光に近い高品質なLED照明。スタジオ撮影に最適。',
    price: {
      amount: 89000,
      currency: '¥',
      unit: '台'
    },
    category: 'lighting',
    image: '/products/led-light.jpg',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true,
    priority: true,
    specs: {
      '消費電力': '100W',
      '明度': '10,000ルーメン',
      '色温度': '2700K-6500K'
    },
    materials: ['アルミニウム合金', '光学ガラス', 'スチール製']
  },
  {
    id: 'audio-001',
    name: 'Xiora Wireless Mic Pro',
    description: 'ノイズキャンセリング機能付きワイヤレスマイク。',
    price: {
      amount: 45000,
      currency: '¥',
      unit: '台'
    },
    category: 'audio',
    image: '/products/wireless-mic.jpg',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    featured: false,
    priority: true,
    specs: {
      '周波数': '2.4GHz',
      '距離': '最大100m',
      '電池': '約8時間'
    },
    materials: ['アルミニウム', 'プラスチック', 'ゴム']
  },
  {
    id: 'accessories-001',
    name: 'Xiora Carbon Tripod',
    description: '軽量で頑丈なカーボン三脚。プロユースに耐える品質。',
    price: {
      amount: 68000,
      currency: '¥',
      unit: '台'
    },
    category: 'accessories',
    image: '/products/tripod.jpg',
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    featured: false,
    priority: false,
    specs: {
      '最大高さ': '180cm',
      '最小高さ': '45cm',
      '重量': '約1.2kg'
    },
    materials: ['カーボン', 'アルミニウム', 'ゴム']
  },
  {
    id: 'camera-002',
    name: 'Xiora Compact Camera C2',
    description: 'コンパクトサイズながら高画質。旅行や日常撮影に最適。',
    price: {
      amount: 158000,
      currency: '¥',
      unit: '台'
    },
    category: 'camera',
    image: '/products/compact-camera.jpg',
    rating: 4.5,
    reviewCount: 94,
    inStock: true,
    featured: false,
    priority: false,
    specs: {
      '解像度': 'Full HD (1920 x 1080)',
      'センサー': '1/2.3インチ CMOS',
      'ズーム': '光学10倍'
    },
    materials: ['プラスチック', '金属', 'ゴム']
  },
  {
    id: 'lighting-002',
    name: 'Xiora Ring Light',
    description: '美肌効果のあるリングライト。ポートレート撮影に最適。',
    price: {
      amount: 32000,
      currency: '¥',
      unit: '台'
    },
    category: 'lighting',
    image: '/products/ring-light.jpg',
    rating: 4.4,
    reviewCount: 67,
    inStock: false,
    featured: false,
    priority: false,
    specs: {
      '直径': '18cm',
      '明度': '3,000ルーメン',
      '色温度': '3000K-6000K'
    },
    materials: ['プラスチック', 'LED', 'アルミニウム']
  }
] as const

export default function CatalogPage() {
  // 商品詳細ページへのナビゲーション
  const handleViewDetails = (productId: string) => {
    window.location.href = `/catalog/${productId}`
  }

  // カートに追加（実際のアプリケーションでは状態管理を使用）
  const handleAddToCart = (productId: string) => {
    console.log(`商品 ${productId} をカートに追加`)
    // ここでカートの状態管理やAPI呼び出しを行う
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EC Catalog | Xiora",
            "description": "Xioraの商品カタログをご覧ください。",
            "url": "https://xiora.com/catalog",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Xiora商品カタログ",
              "itemListElement": products.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "description": product.description,
                  "image": product.image,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price.amount,
                    "priceCurrency": "JPY",
                    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                  }
                }
              }))
            }
          })
        }}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">商品カタログ</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                プロ仕様の高品質な機器から、日常使いの便利なアイテムまで。
                Xioraの製品ラインナップをご覧ください。
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* カテゴリセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">カテゴリから探す</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                お探しの商品をカテゴリ別に見つけることができます
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`p-6 text-center hover:shadow-lg transition-all duration-normal ease-smooth cursor-pointer ${
                    category.featured ? 'ring-2 ring-fg ring-opacity-20' : ''
                  }`}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <H3 className="mb-2">{category.name}</H3>
                  <Body className="text-fg-muted mb-4">{category.description}</Body>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary">{category.productCount}商品</Badge>
                    {category.featured && (
                      <Badge variant="primary">注目</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 注目商品セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">注目商品</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                人気の高い商品や新着商品をご紹介します
              </BodyLarge>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => p.featured).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  variant="detailed"
                  priority={product.priority}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* 全商品セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">全商品</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                カテゴリ別に商品をご覧いただけます
              </BodyLarge>
            </div>

            {/* カテゴリ別商品表示 */}
            {categories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <H3 className="mb-2">{category.name}</H3>
                    <Body className="text-fg-muted">{category.description}</Body>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(p => p.category === category.id)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product as any}
                        variant="default"
                        priority={product.priority}
                        onViewDetails={handleViewDetails}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                </div>
              </div>
            ))}
          </Container>
        </Section>

        {/* CTAセクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center">
              <H2 className="mb-6">お探しの商品が見つからない場合</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted mb-8">
                カスタム制作やレンタルサービスもご用意しています。
                お気軽にお問い合わせください。
              </BodyLarge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/custom-rental"
                  className="inline-flex items-center justify-center px-6 py-3 bg-fg text-bg font-medium rounded-lg hover:bg-fg-secondary transition-colors duration-normal ease-smooth min-h-[44px] min-w-[44px]"
                >
                  カスタム・レンタルについて
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-fg text-fg font-medium rounded-lg hover:bg-fg hover:text-bg transition-colors duration-normal ease-smooth min-h-[44px] min-w-[44px]"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}
