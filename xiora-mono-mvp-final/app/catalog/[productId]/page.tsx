import type { Metadata } from 'next'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge, Caption } from '../../components/ui/Typography'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Divider } from '../../components/ui/Divider'

// 商品データ（実際のアプリケーションではデータベースから取得）
const products = {
  'camera-001': {
    id: 'camera-001',
    name: 'Xiora Pro Camera X1',
    description: '4K対応プロ仕様カメラ。高画質と使いやすさを両立した最新モデル。',
    price: 298000,
    category: 'camera',
    image: '/products/camera-x1.jpg',
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    featured: true,
    specs: {
      resolution: '4K (3840 x 2160)',
      sensor: '1インチ CMOS',
      lens: '交換式レンズ対応',
      iso: '100-25600',
      weight: '約850g',
      dimensions: '135 x 95 x 75mm'
    },
    materials: [
      'ボディ: マグネシウム合金',
      'レンズマウント: 金属製',
      'グリップ: ゴム素材',
      'ボタン: 金属製'
    ],
    features: [
      '4K/60fps動画撮影',
      '5軸手ブレ補正',
      'Wi-Fi/Bluetooth接続',
      'タッチスクリーン',
      '防水・防塵対応'
    ],
    included: [
      'ボディキャップ',
      'レンズフロントキャップ',
      'USBケーブル',
      '充電器',
      '取扱説明書',
      '保証書'
    ]
  },
  'lighting-001': {
    id: 'lighting-001',
    name: 'Xiora LED Studio Light',
    description: '自然光に近い高品質なLED照明。スタジオ撮影に最適。',
    price: 89000,
    category: 'lighting',
    image: '/products/led-light.jpg',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true,
    specs: {
      power: '100W',
      brightness: '10,000ルーメン',
      colorTemp: '2700K-6500K',
      cri: '95+',
      weight: '約2.5kg',
      dimensions: '300 x 200 x 150mm'
    },
    materials: [
      'ボディ: アルミニウム合金',
      'レンズ: 光学ガラス',
      'グリップ: ゴム素材',
      'スタンド: スチール製'
    ],
    features: [
      '調光・調色可能',
      'リモートコントロール対応',
      'スタジオマウント対応',
      '冷却ファン内蔵',
      '過熱保護機能'
    ],
    included: [
      'LEDライト本体',
      'スタンド',
      'リモコン',
      '電源アダプター',
      '取扱説明書',
      '保証書'
    ]
  }
}

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products[params.productId as keyof typeof products]
  
  if (!product) {
    return {
      title: '商品が見つかりません | Xiora',
      description: 'お探しの商品が見つかりませんでした。'
    }
  }

  return {
    title: `${product.name} | Xiora - 商品詳細`,
    description: product.description,
    keywords: `Xiora, ${product.name}, ${product.category}, 商品詳細, 仕様, 価格`,
    openGraph: {
      title: `${product.name} | Xiora`,
      description: product.description,
      type: 'website',
      url: `https://xiora.com/catalog/${product.id}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Xiora`,
      description: product.description,
      images: [product.image]
    }
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products[params.productId as keyof typeof products]

  if (!product) {
    return (
      <main id="main-content" role="main">
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">商品が見つかりません</H1>
              <BodyLarge className="mb-8">
                お探しの商品は存在しないか、削除された可能性があります。
              </BodyLarge>
              <Button variant="primary" asChild>
                <a href="/catalog">カタログに戻る</a>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "JPY",
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount
            }
          })
        }}
      />

      <main id="main-content" role="main">
        {/* 商品詳細セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 商品画像 */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-fg-muted">
                    <div className="text-6xl mb-4">📷</div>
                    <p className="text-sm">{product.name}</p>
                  </div>
                </div>
                {product.featured && (
                  <Badge variant="primary" className="absolute top-4 left-4">
                    注目商品
                  </Badge>
                )}
              </div>

              {/* 商品情報 */}
              <div className="space-y-6">
                <div>
                  <H1 className="mb-4">{product.name}</H1>
                  <BodyLarge className="text-fg-muted mb-6">
                    {product.description}
                  </BodyLarge>
                  
                  {/* 評価 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-fg-muted">({product.reviewCount}件のレビュー)</span>
                    </div>
                  </div>

                  {/* 価格 */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-fg">
                      ¥{product.price.toLocaleString()}
                    </div>
                    <Caption className="text-fg-muted">税込</Caption>
                  </div>

                  {/* 在庫状況 */}
                  <div className="mb-6">
                    {product.inStock ? (
                      <Badge variant="primary" className="mb-4">
                        在庫あり
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="mb-4">
                        在庫切れ
                      </Badge>
                    )}
                  </div>

                  {/* アクションボタン */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" size="lg" className="flex-1">
                      カートに追加
                    </Button>
                    <Button variant="secondary" size="lg" className="flex-1">
                      お気に入り
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 仕様・特徴セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 仕様 */}
              <Card className="p-8">
                <H2 className="mb-6">仕様</H2>
                <div className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-line last:border-b-0">
                      <span className="font-medium text-fg-muted capitalize">
                        {key === 'iso' ? 'ISO感度' : 
                         key === 'cri' ? '演色性' : 
                         key === 'colorTemp' ? '色温度' :
                         key === 'dimensions' ? 'サイズ' :
                         key === 'weight' ? '重量' :
                         key === 'power' ? '消費電力' :
                         key === 'brightness' ? '明度' :
                         key === 'resolution' ? '解像度' :
                         key === 'sensor' ? 'センサー' :
                         key === 'lens' ? 'レンズ' : key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 特徴 */}
              <Card className="p-8">
                <H2 className="mb-6">主な特徴</H2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-success text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 素材・付属品セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 使用素材 */}
              <Card className="p-8">
                <H2 className="mb-6">使用素材</H2>
                <ul className="space-y-3">
                  {product.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-info text-lg">🔧</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* 付属品 */}
              <Card className="p-8">
                <H2 className="mb-6">付属品</H2>
                <ul className="space-y-3">
                  {product.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-success text-lg">📦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 価格目安・比較セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">価格目安・比較</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                同カテゴリの商品と価格を比較できます
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">💰</div>
                <H3 className="mb-4">エントリーモデル</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  ¥{Math.round(product.price * 0.6).toLocaleString()}
                </div>
                <Body className="text-fg-muted">
                  基本的な機能を備えたモデル
                </Body>
              </Card>

              <Card className="p-6 text-center border-2 border-fg">
                <div className="text-3xl mb-4">🎯</div>
                <H3 className="mb-4">この商品</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  ¥{product.price.toLocaleString()}
                </div>
                <Body className="text-fg-muted">
                  バランスの取れた高機能モデル
                </Body>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-3xl mb-4">🚀</div>
                <H3 className="mb-4">プロモデル</H3>
                <div className="text-2xl font-bold text-fg mb-2">
                  ¥{Math.round(product.price * 1.8).toLocaleString()}
                </div>
                <Body className="text-fg-muted">
                  最高品質のプロ仕様モデル
                </Body>
              </Card>
            </div>
          </Container>
        </Section>

        {/* CTAセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center">
              <H2 className="mb-6">この商品について</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted mb-8">
                ご質問やカスタマイズのご相談がございましたら、お気軽にお問い合わせください。
              </BodyLarge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <a href="/contact">お問い合わせ</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="/catalog">他の商品を見る</a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}
