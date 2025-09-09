# @xiora-performance-pack

Xioraサイトの包括的なパフォーマンス最適化パックです。Core Web Vitals、バンドル最適化、画像最適化、キャッシュ戦略などを統合し、最高のユーザー体験を提供します。

## 🚀 特徴

### Core Web Vitals 最適化
- **LCP (Largest Contentful Paint)**: 2.5秒以下を目標
- **FID (First Input Delay)**: 100ms以下を目標  
- **CLS (Cumulative Layout Shift)**: 0.1以下を目標
- **TTFB (Time to First Byte)**: 800ms以下を目標

### 高度なService Worker
- 複数のキャッシュ戦略（Cache First, Network First, Stale While Revalidate）
- バックグラウンド同期とプリフェッチ
- オフライン対応とプッシュ通知
- キャッシュ有効期限管理

### 包括的なパフォーマンス監視
- リアルタイムメトリクス収集
- カスタムパフォーマンス指標
- エラー監視とレポート生成
- メモリ使用量監視

### バンドル分析と最適化
- バンドルサイズの分析
- 重複ファイルの検出
- 最適化提案の生成
- コード分割の推奨

### 画像最適化
- WebP/AVIF形式の自動変換
- 遅延読み込みとプリロード
- レスポンシブ画像の最適化
- 画像圧縮と品質調整

## 📦 インストール

```bash
npm install @xiora-performance-pack
```

## 🔧 セットアップ

### 1. パフォーマンス監視の初期化

```typescript
import { performanceMonitor } from '@/lib/performance/performanceMonitor'

// パフォーマンス監視の開始
performanceMonitor.initialize()

// メトリクスの取得
const metrics = performanceMonitor.getMetrics()
```

### 2. パフォーマンス最適化コンポーネントの使用

```tsx
import { PerformanceOptimizer } from '@/app/components/PerformanceOptimizer'

export default function Layout({ children }) {
  return (
    <PerformanceOptimizer
      enableLazyLoading={true}
      enableImageOptimization={true}
      onMetricsUpdate={(metrics) => {
        console.log('Performance metrics updated:', metrics)
      }}
    >
      {children}
    </PerformanceOptimizer>
  )
}
```

### 3. Service Workerの登録

```typescript
// app/layout.tsx または適切な場所で
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-performance.js')
    .then(registration => {
      console.log('Service Worker registered:', registration)
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error)
    })
}
```

## 🎯 使用方法

### パフォーマンスメトリクスの監視

```typescript
import { performanceMonitor } from '@/lib/performance/performanceMonitor'

// オブザーバーの登録
const observer = {
  onMetricUpdate: (metrics) => {
    console.log('LCP:', metrics.lcp)
    console.log('FID:', metrics.fid)
    console.log('CLS:', metrics.cls)
  },
  onError: (error) => {
    console.error('Performance error:', error)
  }
}

performanceMonitor.addObserver(observer)
```

### バンドル分析の実行

```typescript
import { bundleAnalyzer } from '@/lib/performance/bundleAnalyzer'

// バンドル分析の実行
const analysis = bundleAnalyzer.analyzeBundles()
console.log('Total bundle size:', analysis.totalSizeFormatted)
console.log('Optimization opportunities:', analysis.optimizationOpportunities)

// 最適化提案の取得
const suggestions = bundleAnalyzer.generateOptimizationSuggestions()
```

### 画像最適化の使用

```tsx
import { OptimizedImage } from '@/app/components/PerformanceOptimizer'

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  options={{
    quality: 85,
    format: 'webp',
    loading: 'lazy'
  }}
/>
```

### 遅延読み込みの実装

```tsx
import { withLazyLoading } from '@/app/components/PerformanceOptimizer'

const LazyComponent = withLazyLoading(MyComponent, {
  threshold: 0.1,
  rootMargin: '50px',
  fallback: <div>Loading...</div>
})
```

## ⚙️ 設定

### パフォーマンス設定のカスタマイズ

```typescript
import { 
  getPerformanceConfig, 
  updatePerformanceConfig 
} from '@/lib/performance/config'

// 現在の設定を取得
const config = getPerformanceConfig()

// 設定の更新
updatePerformanceConfig({
  thresholds: {
    lcp: { good: 2000, needsImprovement: 3500, poor: 3500 }
  },
  imageOptimization: {
    defaultQuality: 90
  }
})
```

### Next.js設定の最適化

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'clsx'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
}
```

## 📊 API エンドポイント

### パフォーマンスメトリクスの取得

```typescript
// GET /api/performance-metrics
const response = await fetch('/api/performance-metrics?bundle=true&optimization=true')
const data = await response.json()

console.log('Performance metrics:', data.performance.metrics)
console.log('Bundle analysis:', data.bundle.analysis)
```

### パフォーマンス最適化の実行

```typescript
// POST /api/performance-metrics
const response = await fetch('/api/performance-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'optimize-performance' })
})
```

## 🔍 開発ツール

### パフォーマンスメトリクスの表示

開発環境では、画面右下にパフォーマンスメトリクスが表示されます：

- LCP, FID, CLS, TTFB の値
- ページロード時間
- 最適化ボタン

### バンドル分析の実行

```bash
# バンドル分析の有効化
ANALYZE=true npm run build

# 分析結果の確認
open .next/analyze/bundle-analysis.html
```

## 📈 パフォーマンス指標

### Core Web Vitals の目標値

| 指標 | 良い | 改善が必要 | 悪い |
|------|------|------------|------|
| LCP  | ≤2.5s | 2.5s-4.0s | >4.0s |
| FID  | ≤100ms | 100ms-300ms | >300ms |
| CLS  | ≤0.1 | 0.1-0.25 | >0.25 |
| TTFB | ≤800ms | 800ms-1.8s | >1.8s |

### 最適化の優先度

1. **High Priority**: LCP > 4s, FID > 300ms, CLS > 0.25
2. **Medium Priority**: LCP > 2.5s, FID > 100ms, CLS > 0.1
3. **Low Priority**: その他の最適化

## 🛠️ トラブルシューティング

### よくある問題

#### Service Workerが登録されない
```typescript
// HTTPS環境でのみ動作します
if (location.protocol === 'https:' && 'serviceWorker' in navigator) {
  // Service Worker登録
}
```

#### パフォーマンスメトリクスが取得できない
```typescript
// ブラウザの互換性チェック
if ('PerformanceObserver' in window) {
  // パフォーマンス監視の開始
} else {
  console.warn('PerformanceObserver not supported')
}
```

#### バンドル分析が失敗する
```typescript
try {
  const analysis = bundleAnalyzer.analyzeBundles()
} catch (error) {
  console.warn('Bundle analysis failed, using fallback data')
  // フォールバック処理
}
```

### デバッグモードの有効化

```typescript
// 環境変数の設定
PERFORMANCE_DEBUG=true npm run dev

// または設定で有効化
updatePerformanceConfig({
  development: {
    performanceDebugMode: true
  }
})
```

## 📚 参考資料

### 公式ドキュメント
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

### ツール
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## 🤝 コントリビューション

パフォーマンスの改善提案やバグレポートは、GitHubのIssueまたはPull Requestでお知らせください。

## 📄 ライセンス

MIT License

## 🔗 関連パック

- `@xiora-mono-site-i18n-pwa`: 国際化とPWA機能
- `@xiora-hardening-pack`: セキュリティ強化
- `@xiora-growth-pack`: 成長機能（検索、エラーページ等）
- `@xiora-brand-ogp-mdx-pack`: ブランド強化とMDX対応

---

**Xiora Performance Pack** - 最高のパフォーマンスを実現する包括的なソリューション
