# Xiora Design System

## 概要
XioraのモノクロMVPサイト用デザインシステムです。一貫性のある美しいインターフェースを構築するための包括的なガイドラインを提供します。

## カラーパレット

### グレイスケール・トークン
- **bg**: 背景色
  - `bg`: #0B0B0B (メイン背景)
  - `bg-secondary`: #1A1A1A (セカンダリ背景)
  - `bg-tertiary`: #2A2A2A (ターシャリ背景)

- **fg**: 前景色
  - `fg`: #FFFFFF (メインテキスト)
  - `fg-secondary`: #E5E5E5 (セカンダリテキスト)
  - `fg-muted`: #B3B3B3 (ミュートテキスト)

- **neutral**: ニュートラルカラー
  - `neutral-50` から `neutral-900` まで9段階

- **line**: 境界線
  - `line`: #404040 (メイン境界線)
  - `line-light`: #525252 (ライト境界線)
  - `line-dark`: #262626 (ダーク境界線)

## タイポグラフィ

### フォントファミリー
- **Display**: Cormorant Garamond (セリフ)
- **Sans**: Inter (サンセリフ)

### タイプスケール
- **Display**: 3.75rem (60px) - メインタイトル
- **Display Large**: 4.5rem (72px) - 大きなタイトル
- **Display XL**: 5rem (80px) - 特大タイトル
- **Heading 1**: 3.25rem (52px) - セクションヘッダー
- **Heading 2**: 2.75rem (44px) - サブセクションヘッダー
- **Heading 3**: 2.25rem (36px) - 小見出し
- **Body**: 1rem (16px) - 本文テキスト
- **Body Large**: 1.125rem (18px) - 大きな本文
- **Caption**: 0.875rem (14px) - キャプション

### フォントウェイト
- **Display**: 700 (太字)
- **Heading**: 700 (太字)
- **Body**: 400 (通常)
- **Caption**: 500 (中程度)

## スペーシング

### 基本単位
- **section**: 5rem (80px) - セクション間の余白
- **heading**: 1.5rem (24px) - 見出しの上余白
- **grid**: 1.5rem (24px) - グリッドアイテム間の余白

## モーション

### トランジション
- **Duration**: 100ms (fast), 150ms (normal), 200ms (slow)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (smooth)
- **Timing**: ease-out のみ使用

### アニメーション
- **fadeIn**: 0.3s ease-out
- **slideUp**: 0.3s ease-out
- **scaleIn**: 0.2s ease-out

## コンポーネント

### Button
```tsx
import { Button } from '@/components/ui'

<Button variant="primary" size="md">
  ボタンテキスト
</Button>
```

**Variants**: primary, secondary, ghost
**Sizes**: sm, md, lg

### Typography
```tsx
import { H1, Body, Caption } from '@/components/ui'

<H1>見出し</H1>
<Body>本文テキスト</Body>
<Caption>キャプション</Caption>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

<Card>
  <CardHeader>
    <CardTitle>カードタイトル</CardTitle>
  </CardHeader>
  <CardContent>
    カードの内容
  </CardContent>
</Card>
```

## ユーティリティクラス

### レイアウト
- `.container-narrow`: 最大幅4xl、中央寄せ
- `.container-wide`: 最大幅7xl、中央寄せ
- `.section`: セクション用の上下余白

### グリッド
- `.grid-responsive`: レスポンシブグリッド
- `.grid-responsive-2`: 2列グリッド
- `.grid-responsive-3`: 3列グリッド

### アニメーション
- `.animate-fade-in`: フェードイン
- `.animate-slide-up`: スライドアップ
- `.animate-scale-in`: スケールイン

### ホバーエフェクト
- `.hover-lift`: ホバー時に上に移動
- `.hover-glow`: ホバー時にグロー効果

## 使用例

### 基本的なセクション構造
```tsx
<section className="section bg-bg-secondary">
  <div className="container-narrow">
    <div className="text-center mb-16">
      <H2 className="mb-6">セクションタイトル</H2>
      <Body className="text-fg-muted">
        セクションの説明文
      </Body>
    </div>
    
    <div className="grid-responsive-3">
      {/* カードコンテンツ */}
    </div>
  </div>
</section>
```

### ボタングループ
```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Button size="lg">プライマリ</Button>
  <Button variant="secondary" size="lg">セカンダリ</Button>
</div>
```

## ベストプラクティス

1. **一貫性**: 常にデザインシステムのコンポーネントを使用
2. **コントラスト**: 高コントラストを維持して可読性を確保
3. **モーション**: 150ms中心の統一されたアニメーションを使用
4. **タイポグラフィ**: 適切な見出しレベルとフォントサイズを使用
5. **スペーシング**: 定義されたスペーシングスケールを遵守

## カスタマイズ

デザインシステムのカスタマイズは `tailwind.config.js` と `styles/globals.css` で行います。新しいコンポーネントやユーティリティクラスを追加する際は、既存のパターンに従ってください。
