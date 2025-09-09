'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { performanceMonitor, PerformanceMetrics } from '@/lib/performance/performanceMonitor'

interface PerformanceOptimizerProps {
  children: React.ReactNode
  enableLazyLoading?: boolean
  enableIntersectionObserver?: boolean
  enableVirtualization?: boolean
  enableImageOptimization?: boolean
  enableCodeSplitting?: boolean
  onMetricsUpdate?: (metrics: Partial<PerformanceMetrics>) => void
  onError?: (error: Error) => void
}

interface LazyLoadOptions {
  threshold?: number
  rootMargin?: string
  fallback?: React.ReactNode
}

interface ImageOptimizationOptions {
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
  sizes?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
}

export function PerformanceOptimizer({
  children,
  enableLazyLoading = true,
  enableIntersectionObserver = true,
  enableVirtualization = false,
  enableImageOptimization = true,
  enableCodeSplitting = true,
  onMetricsUpdate,
  onError
}: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const performanceObserverRef = useRef<any>(null)

  // パフォーマンス監視の設定
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      // パフォーマンス監視の初期化
      performanceMonitor.initialize()

      // オブザーバーの登録
      const observer = {
        onMetricUpdate: (newMetrics: Partial<PerformanceMetrics>) => {
          setMetrics(prev => prev ? { ...prev, ...newMetrics } : newMetrics as PerformanceMetrics)
          onMetricsUpdate?.(newMetrics)
        },
        onError: (error: Error) => {
          console.error('Performance Optimizer: Error detected:', error)
          onError?.(error)
        }
      }

      performanceMonitor.addObserver(observer)
      performanceObserverRef.current = observer

      // クリーンアップ
      return () => {
        if (performanceObserverRef.current) {
          performanceMonitor.removeObserver(performanceObserverRef.current)
        }
      }
    } catch (error) {
      console.error('Performance Optimizer: Setup failed:', error)
    }
  }, [onMetricsUpdate, onError])

  // パフォーマンス最適化の実行
  const runOptimizations = useCallback(async () => {
    if (isOptimizing) return

    setIsOptimizing(true)
    try {
      // 画像の最適化
      if (enableImageOptimization) {
        await optimizeImages()
      }

      // リソースのプリフェッチ
      await prefetchResources()

      // メモリの最適化
      await optimizeMemory()

      console.log('Performance Optimizer: Optimizations completed')
    } catch (error) {
      console.error('Performance Optimizer: Optimization failed:', error)
    } finally {
      setIsOptimizing(false)
    }
  }, [isOptimizing, enableImageOptimization])

  // 画像の最適化
  const optimizeImages = useCallback(async () => {
    if (typeof window === 'undefined') return

    const images = document.querySelectorAll('img')
    const imagePromises: Promise<void>[] = []

    images.forEach((img) => {
      if (img.complete) {
        // 既に読み込み済みの画像の最適化
        imagePromises.push(optimizeLoadedImage(img))
      } else {
        // 読み込み中の画像の最適化
        img.addEventListener('load', () => optimizeLoadedImage(img))
      }
    })

    await Promise.all(imagePromises)
  }, [])

  // 読み込み済み画像の最適化
  const optimizeLoadedImage = useCallback(async (img: HTMLImageElement) => {
    try {
      // 画像のサイズ最適化
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        const aspectRatio = img.naturalWidth / img.naturalHeight
        
        // ビューポートに応じたサイズ設定
        if (window.innerWidth < 768) {
          img.style.maxWidth = '100%'
          img.style.height = 'auto'
        } else if (window.innerWidth < 1024) {
          img.style.maxWidth = '80%'
          img.style.height = 'auto'
        }

        // 遅延読み込みの設定
        if (enableLazyLoading && !img.loading) {
          img.loading = 'lazy'
        }

        // デコード設定
        if (img.decoding !== 'async') {
          img.decoding = 'async'
        }
      }
    } catch (error) {
      console.warn('Performance Optimizer: Image optimization failed:', error)
    }
  }, [enableLazyLoading])

  // リソースのプリフェッチ
  const prefetchResources = useCallback(async () => {
    if (typeof window === 'undefined') return

    try {
      // 重要なページのプリフェッチ
      const importantPages = ['/ja/about', '/ja/catalog', '/ja/contact']
      
      for (const page of importantPages) {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = page
        link.as = 'document'
        document.head.appendChild(link)
      }

      // 重要な画像のプリフェッチ
      const importantImages = ['/images/hero-bg.jpg', '/images/logo.svg']
      
      for (const image of importantImages) {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = image
        link.as = 'image'
        document.head.appendChild(link)
      }
    } catch (error) {
      console.warn('Performance Optimizer: Resource prefetch failed:', error)
    }
  }, [])

  // メモリの最適化
  const optimizeMemory = useCallback(async () => {
    if (typeof window === 'undefined') return

    try {
      // ガベージコレクションの促進
      if ('gc' in window) {
        (window as any).gc()
      }

      // 不要なイベントリスナーのクリーンアップ
      const cleanupEventListeners = () => {
        // 実装は必要に応じて追加
      }

      cleanupEventListeners()

      // メモリ使用量の監視
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        
        if (memoryUsage > 0.8) {
          console.warn('Performance Optimizer: High memory usage detected:', memoryUsage)
        }
      }
    } catch (error) {
      console.warn('Performance Optimizer: Memory optimization failed:', error)
    }
  }, [])

  // 遅延読み込み用のIntersection Observer
  useEffect(() => {
    if (!enableIntersectionObserver || typeof window === 'undefined') return

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          
          // 画像の遅延読み込み
          if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              img.classList.remove('lazy')
            }
          }

          // コンテンツの遅延読み込み
          if (target.dataset.lazyContent) {
            target.innerHTML = target.dataset.lazyContent
            target.removeAttribute('data-lazy-content')
            target.classList.remove('lazy-content')
          }

          // 監視を停止
          observerRef.current?.unobserve(target)
        }
      })
    }, options)

    // 遅延読み込み対象の監視開始
    const lazyElements = document.querySelectorAll('[data-src], [data-lazy-content]')
    lazyElements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [enableIntersectionObserver])

  // パフォーマンスメトリクスの表示（開発環境のみ）
  const PerformanceMetricsDisplay = useMemo(() => {
    if (process.env.NODE_ENV !== 'development' || !metrics) return null

    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
        <div className="font-bold mb-2">Performance Metrics</div>
        <div className="space-y-1">
          <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}</div>
          <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}</div>
          <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}</div>
          <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}</div>
          <div>Load: {metrics.pageLoadTime ? `${Math.round(metrics.pageLoadTime)}ms` : 'N/A'}</div>
        </div>
        <button
          onClick={runOptimizations}
          disabled={isOptimizing}
          className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isOptimizing ? 'Optimizing...' : 'Optimize'}
        </button>
      </div>
    )
  }, [metrics, isOptimizing, runOptimizations])

  return (
    <>
      {children}
      {PerformanceMetricsDisplay}
    </>
  )
}

// 遅延読み込み用のHOC
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  options: LazyLoadOptions = {}
) {
  return function LazyLoadedComponent(props: P) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!elementRef.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '50px'
        }
      )

      observer.observe(elementRef.current)

      return () => observer.disconnect()
    }, [])

    if (!isVisible) {
      return (
        <div ref={elementRef} className="min-h-[200px] flex items-center justify-center">
          {options.fallback || <div className="animate-pulse bg-gray-200 rounded h-32 w-full" />}
        </div>
      )
    }

    if (!isLoaded) {
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <Component {...props} onLoad={() => setIsLoaded(true)} />
        </div>
      )
    }

    return <Component {...props} />
  }
}

// 画像最適化コンポーネント
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  options = {}
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  options?: ImageOptimizationOptions
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const imageOptions = {
    quality: options.quality || 85,
    format: options.format || 'auto',
    sizes: options.sizes || '100vw',
    loading: options.loading || 'lazy',
    decoding: options.decoding || 'async',
    ...options
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className || ''}`}>
        <span className="text-gray-500 text-sm">画像の読み込みに失敗しました</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={imageOptions.loading}
        decoding={imageOptions.decoding}
        sizes={imageOptions.sizes}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

// 仮想化リストコンポーネント（基本的な実装）
export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 5
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  containerHeight: number
  overscan?: number
}) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleItemCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.floor(scrollTop / itemHeight) + visibleItemCount + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
