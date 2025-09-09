/**
 * 包括的なパフォーマンス監視システム
 * Core Web Vitals、カスタムメトリクス、リソース監視を統合
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null
  fid: number | null
  cls: number | null
  
  // 追加のWeb Vitals
  ttfb: number | null
  fcp: number | null
  
  // カスタムメトリクス
  pageLoadTime: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
  
  // リソースメトリクス
  resourceLoadTimes: Record<string, number>
  imageLoadTimes: Record<string, number>
  
  // エラーメトリクス
  errorCount: number
  warningCount: number
  
  // ユーザーインタラクション
  interactionToNextPaint: number | null
  
  // メモリ使用量
  memoryUsage: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  } | null
}

export interface PerformanceObserver {
  onMetricUpdate: (metrics: Partial<PerformanceMetrics>) => void
  onError: (error: Error) => void
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics
  private observers: PerformanceObserver[] = []
  private isInitialized = false
  private resourceObserver: any = null
  private navigationObserver: any = null
  private paintObserver: any = null
  private layoutShiftObserver: any = null
  private firstInputObserver: any = null
  private largestContentfulPaintObserver: any = null

  constructor() {
    this.metrics = this.initializeMetrics()
  }

  /**
   * メトリクスの初期化
   */
  private initializeMetrics(): PerformanceMetrics {
    return {
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      fcp: null,
      pageLoadTime: 0,
      domContentLoaded: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      resourceLoadTimes: {},
      imageLoadTimes: {},
      errorCount: 0,
      warningCount: 0,
      interactionToNextPaint: null,
      memoryUsage: null
    }
  }

  /**
   * パフォーマンス監視の初期化
   */
  public initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return
    }

    try {
      this.setupCoreWebVitals()
      this.setupCustomMetrics()
      this.setupResourceMonitoring()
      this.setupErrorMonitoring()
      this.setupMemoryMonitoring()
      this.setupUserInteractionMonitoring()
      
      this.isInitialized = true
      console.log('Performance Monitor: Initialized successfully')
    } catch (error) {
      console.error('Performance Monitor: Initialization failed:', error)
    }
  }

  /**
   * Core Web Vitalsの監視設定
   */
  private setupCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        this.largestContentfulPaintObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            this.metrics.lcp = lastEntry.startTime
            this.notifyObservers({ lcp: lastEntry.startTime })
          }
        })
        this.largestContentfulPaintObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (error) {
        console.warn('Performance Monitor: LCP observer setup failed:', error)
      }

      // First Input Delay (FID)
      try {
        this.firstInputObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          for (const entry of entries) {
            this.metrics.fid = entry.processingStart - entry.startTime
            this.notifyObservers({ fid: this.metrics.fid })
          }
        })
        this.firstInputObserver.observe({ entryTypes: ['first-input'] })
      } catch (error) {
        console.warn('Performance Monitor: FID observer setup failed:', error)
      }

      // Cumulative Layout Shift (CLS)
      try {
        this.layoutShiftObserver = new (window as any).PerformanceObserver((list: any) => {
          let clsValue = 0
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          this.metrics.cls = clsValue
          this.notifyObservers({ cls: clsValue })
        })
        this.layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        console.warn('Performance Monitor: CLS observer setup failed:', error)
      }

      // First Contentful Paint (FCP)
      try {
        this.paintObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime
              this.notifyObservers({ fcp: entry.startTime })
            }
          }
        })
        this.paintObserver.observe({ entryTypes: ['paint'] })
      } catch (error) {
        console.warn('Performance Monitor: FCP observer setup failed:', error)
      }
    }
  }

  /**
   * カスタムメトリクスの監視設定
   */
  private setupCustomMetrics(): void {
    // ページロード時間
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.metrics.domContentLoaded = performance.now()
        this.notifyObservers({ domContentLoaded: this.metrics.domContentLoaded })
      })
    } else {
      this.metrics.domContentLoaded = performance.now()
    }

    // ページロード完了
    window.addEventListener('load', () => {
      this.metrics.pageLoadTime = performance.now()
      this.notifyObservers({ pageLoadTime: this.metrics.pageLoadTime })
    })

    // Time to First Byte (TTFB)
    if ('PerformanceObserver' in window) {
      try {
        this.navigationObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          for (const entry of entries) {
            if (entry.entryType === 'navigation') {
              this.metrics.ttfb = (entry as any).responseStart - (entry as any).requestStart
              this.notifyObservers({ ttfb: this.metrics.ttfb })
            }
          }
        })
        this.navigationObserver.observe({ entryTypes: ['navigation'] })
      } catch (error) {
        console.warn('Performance Monitor: Navigation observer setup failed:', error)
      }
    }
  }

  /**
   * リソース監視の設定
   */
  private setupResourceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      try {
        this.resourceObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          for (const entry of entries) {
            if (entry.entryType === 'resource') {
              const loadTime = entry.responseEnd - entry.startTime
              this.metrics.resourceLoadTimes[entry.name] = loadTime
              
              // 画像の場合は別途記録
              if (entry.initiatorType === 'img') {
                this.metrics.imageLoadTimes[entry.name] = loadTime
              }
            }
          }
          this.notifyObservers({
            resourceLoadTimes: this.metrics.resourceLoadTimes,
            imageLoadTimes: this.metrics.imageLoadTimes
          })
        })
        this.resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (error) {
        console.warn('Performance Monitor: Resource observer setup failed:', error)
      }
    }
  }

  /**
   * エラー監視の設定
   */
  private setupErrorMonitoring(): void {
    // JavaScript エラー
    window.addEventListener('error', (event) => {
      this.metrics.errorCount++
      this.notifyObservers({ errorCount: this.metrics.errorCount })
      this.logError('JavaScript Error', event.error || event.message)
    })

    // Promise リジェクション
    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.errorCount++
      this.notifyObservers({ errorCount: this.metrics.errorCount })
      this.logError('Unhandled Promise Rejection', event.reason)
    })

    // コンソール警告
    const originalWarn = console.warn
    console.warn = (...args) => {
      this.metrics.warningCount++
      this.notifyObservers({ warningCount: this.metrics.warningCount })
      originalWarn.apply(console, args)
    }
  }

  /**
   * メモリ監視の設定
   */
  private setupMemoryMonitoring(): void {
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        const memory = (performance as any).memory
        this.metrics.memoryUsage = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        }
        this.notifyObservers({ memoryUsage: this.metrics.memoryUsage })
      }

      // 初期値の設定
      updateMemoryUsage()

      // 定期的な更新
      setInterval(updateMemoryUsage, 5000)
    }
  }

  /**
   * ユーザーインタラクション監視の設定
   */
  private setupUserInteractionMonitoring(): void {
    if ('PerformanceObserver' in window) {
      try {
        const interactionObserver = new (window as any).PerformanceObserver((list: any) => {
          const entries = list.getEntries()
          for (const entry of entries) {
            if (entry.entryType === 'interaction') {
              this.metrics.interactionToNextPaint = entry.value
              this.notifyObservers({ interactionToNextPaint: entry.value })
            }
          }
        })
        interactionObserver.observe({ entryTypes: ['interaction'] })
      } catch (error) {
        console.warn('Performance Monitor: Interaction observer setup failed:', error)
      }
    }
  }

  /**
   * オブザーバーの登録
   */
  public addObserver(observer: PerformanceObserver): void {
    this.observers.push(observer)
  }

  /**
   * オブザーバーの削除
   */
  public removeObserver(observer: PerformanceObserver): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  /**
   * オブザーバーへの通知
   */
  private notifyObservers(metrics: Partial<PerformanceMetrics>): void {
    this.observers.forEach(observer => {
      try {
        observer.onMetricUpdate(metrics)
      } catch (error) {
        console.error('Performance Monitor: Observer notification failed:', error)
      }
    })
  }

  /**
   * エラーログの記録
   */
  private logError(type: string, error: any): void {
    const errorInfo = {
      type,
      message: error?.message || String(error),
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    console.error('Performance Monitor: Error logged:', errorInfo)
    
    // エラー情報をオブザーバーに通知
    this.observers.forEach(observer => {
      try {
        observer.onError(new Error(`${type}: ${errorInfo.message}`))
      } catch (observerError) {
        console.error('Performance Monitor: Error observer notification failed:', observerError)
      }
    })
  }

  /**
   * 現在のメトリクスを取得
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * 特定のメトリクスを取得
   */
  public getMetric<K extends keyof PerformanceMetrics>(key: K): PerformanceMetrics[K] {
    return this.metrics[key]
  }

  /**
   * メトリクスのリセット
   */
  public resetMetrics(): void {
    this.metrics = this.initializeMetrics()
    this.notifyObservers(this.metrics)
  }

  /**
   * パフォーマンスレポートの生成
   */
  public generateReport(): string {
    const report = {
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      metrics: this.metrics,
      summary: this.generateSummary()
    }

    return JSON.stringify(report, null, 2)
  }

  /**
   * パフォーマンスサマリーの生成
   */
  private generateSummary(): Record<string, any> {
    const summary: Record<string, any> = {}

    // Core Web Vitals の評価
    if (this.metrics.lcp !== null) {
      summary.lcp = {
        value: this.metrics.lcp,
        rating: this.metrics.lcp < 2500 ? 'good' : this.metrics.lcp < 4000 ? 'needs-improvement' : 'poor'
      }
    }

    if (this.metrics.fid !== null) {
      summary.fid = {
        value: this.metrics.fid,
        rating: this.metrics.fid < 100 ? 'good' : this.metrics.fid < 300 ? 'needs-improvement' : 'poor'
      }
    }

    if (this.metrics.cls !== null) {
      summary.cls = {
        value: this.metrics.cls,
        rating: this.metrics.cls < 0.1 ? 'good' : this.metrics.cls < 0.25 ? 'needs-improvement' : 'poor'
      }
    }

    // リソース読み込み時間の統計
    const resourceTimes = Object.values(this.metrics.resourceLoadTimes)
    if (resourceTimes.length > 0) {
      summary.resourceStats = {
        count: resourceTimes.length,
        average: resourceTimes.reduce((a, b) => a + b, 0) / resourceTimes.length,
        slowest: Math.max(...resourceTimes),
        fastest: Math.min(...resourceTimes)
      }
    }

    // エラー率
    summary.errorRate = this.metrics.errorCount / Math.max(this.metrics.pageLoadTime / 1000, 1)

    return summary
  }

  /**
   * クリーンアップ
   */
  public cleanup(): void {
    if (this.largestContentfulPaintObserver) {
      this.largestContentfulPaintObserver.disconnect()
    }
    if (this.firstInputObserver) {
      this.firstInputObserver.disconnect()
    }
    if (this.layoutShiftObserver) {
      this.layoutShiftObserver.disconnect()
    }
    if (this.paintObserver) {
      this.paintObserver.disconnect()
    }
    if (this.navigationObserver) {
      this.navigationObserver.disconnect()
    }
    if (this.resourceObserver) {
      this.resourceObserver.disconnect()
    }

    this.observers = []
    this.isInitialized = false
  }
}

// シングルトンインスタンス
export const performanceMonitor = new PerformanceMonitor()

// 開発環境でのデバッグ用
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).performanceMonitor = performanceMonitor
}
