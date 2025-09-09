'use client'

import { useEffect } from 'react'
import { performanceMonitor } from '@/lib/performance/performanceMonitor'
import { getPerformanceConfig } from '@/lib/performance/config'

export function PerformanceMonitor() {
  useEffect(() => {
    try {
      // パフォーマンス設定の適用
      const config = getPerformanceConfig()
      console.log('Performance configuration loaded:', config)

      // パフォーマンス監視の初期化
      performanceMonitor.initialize()

      // 開発環境でのデバッグ情報表示
      if (config.development.performanceDebugMode) {
        console.log('Performance Monitor: Debug mode enabled')
        console.log('Available tools:', {
          performanceMonitor: typeof performanceMonitor !== 'undefined',
          config: config
        })
      }

    } catch (error) {
      console.error('Performance Monitor: Initialization failed:', error)
    }

    // クリーンアップ
    return () => {
      try {
        performanceMonitor.cleanup()
      } catch (error) {
        console.warn('Performance Monitor: Cleanup failed:', error)
      }
    }
  }, [])

  // このコンポーネントは表示要素を持たない
  return null
}
