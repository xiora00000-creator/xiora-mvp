// パフォーマンス監視と最適化のユーティリティ

export interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, PerformanceMetrics> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // ページロード時間の測定
  measurePageLoad(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paintEntries = performance.getEntriesByType('paint')
    
    const metrics: PerformanceMetrics = {
      pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstContentfulPaint: this.getPaintTime(paintEntries, 'first-contentful-paint'),
      largestContentfulPaint: 0, // LCPは別途測定
      cumulativeLayoutShift: 0, // CLSは別途測定
      firstInputDelay: 0, // FIDは別途測定
    }

    // LCPの測定
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metrics.largestContentfulPaint = lastEntry.startTime
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }

    // CLSの測定
    if ('PerformanceObserver' in window) {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        }
        metrics.cumulativeLayoutShift = clsValue
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    }

    return metrics
  }

  private getPaintTime(entries: PerformanceEntry[], name: string): number {
    const entry = entries.find(e => e.name === name)
    return entry ? entry.startTime : 0
  }

  // メトリクスの保存
  saveMetrics(page: string, metrics: PerformanceMetrics): void {
    this.metrics.set(page, metrics)
    
    // ローカルストレージに保存（分析用）
    try {
      const stored = JSON.parse(localStorage.getItem('performance-metrics') || '{}')
      stored[page] = {
        ...metrics,
        timestamp: Date.now()
      }
      localStorage.setItem('performance-metrics', JSON.stringify(stored))
    } catch (error) {
      console.warn('Failed to save performance metrics to localStorage:', error)
    }
  }

  // メトリクスの取得
  getMetrics(page: string): PerformanceMetrics | undefined {
    return this.metrics.get(page)
  }

  // 全メトリクスの取得
  getAllMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics)
  }

  // パフォーマンススコアの計算
  calculatePerformanceScore(metrics: PerformanceMetrics): number {
    let score = 100

    // FCP: 1.8秒以下で満点
    if (metrics.firstContentfulPaint > 1800) {
      score -= Math.min(30, (metrics.firstContentfulPaint - 1800) / 100)
    }

    // LCP: 2.5秒以下で満点
    if (metrics.largestContentfulPaint > 2500) {
      score -= Math.min(25, (metrics.largestContentfulPaint - 2500) / 100)
    }

    // CLS: 0.1以下で満点
    if (metrics.cumulativeLayoutShift > 0.1) {
      score -= Math.min(25, metrics.cumulativeLayoutShift * 250)
    }

    // FID: 100ms以下で満点
    if (metrics.firstInputDelay > 100) {
      score -= Math.min(20, (metrics.firstInputDelay - 100) / 10)
    }

    return Math.max(0, Math.round(score))
  }
}

// 画像最適化
export class ImageOptimizer {
  // 遅延読み込みの実装
  static setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        })
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  }

  // 画像のプリロード
  static preloadImages(urls: string[]): void {
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  // WebP対応チェック
  static supportsWebP(): Promise<boolean> {
    return new Promise(resolve => {
      const webP = new Image()
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    })
  }
}

// バンドル分析
export class BundleAnalyzer {
  // チャンクサイズの監視
  static analyzeChunkSizes(): { [key: string]: number } {
    const chunks: { [key: string]: number } = {}
    
    if ('performance' in window) {
      const entries = performance.getEntriesByType('resource')
      entries.forEach(entry => {
        if (entry.name.includes('chunk') || entry.name.includes('bundle')) {
          const resourceEntry = entry as PerformanceResourceTiming
          chunks[entry.name] = resourceEntry.transferSize || 0
        }
      })
    }
    
    return chunks
  }

  // メモリ使用量の監視
  static getMemoryUsage(): { used: number; total: number; limit: number } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      }
    }
    return null
  }
}

// キャッシュ最適化
export class CacheOptimizer {
  // Service Workerのキャッシュ戦略
  static getCacheStrategy(): 'cache-first' | 'network-first' | 'stale-while-revalidate' {
    // ネットワーク状況に応じて動的に選択
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return 'cache-first'
      }
    }
    return 'stale-while-revalidate'
  }

  // キャッシュの有効期限設定
  static getCacheExpiration(resourceType: string): number {
    const expirationMap: { [key: string]: number } = {
      'html': 0, // 即座に無効
      'css': 24 * 60 * 60 * 1000, // 24時間
      'js': 24 * 60 * 60 * 1000, // 24時間
      'image': 7 * 24 * 60 * 60 * 1000, // 7日
      'font': 30 * 24 * 60 * 60 * 1000, // 30日
    }
    
    return expirationMap[resourceType] || 0
  }
}

// パフォーマンス監視の初期化
export function initializePerformanceMonitoring(): void {
  const monitor = PerformanceMonitor.getInstance()
  
  // ページロード完了時の測定
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const metrics = monitor.measurePageLoad()
      monitor.saveMetrics(window.location.pathname, metrics)
    })
  } else {
    const metrics = monitor.measurePageLoad()
    monitor.saveMetrics(window.location.pathname, metrics)
  }

  // 画像の遅延読み込み設定
  ImageOptimizer.setupLazyLoading()
}
