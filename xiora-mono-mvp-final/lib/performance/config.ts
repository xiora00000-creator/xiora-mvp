/**
 * パフォーマンス最適化のための設定ファイル
 * 各種最適化オプションとしきい値を定義
 */

export interface PerformanceConfig {
  // Core Web Vitals のしきい値
  thresholds: {
    lcp: {
      good: number
      needsImprovement: number
      poor: number
    }
    fid: {
      good: number
      needsImprovement: number
      poor: number
    }
    cls: {
      good: number
      needsImprovement: number
      poor: number
    }
    ttfb: {
      good: number
      needsImprovement: number
      poor: number
    }
  }

  // 画像最適化の設定
  imageOptimization: {
    defaultQuality: number
    supportedFormats: string[]
    maxWidth: number
    maxHeight: number
    compressionLevel: number
    enableWebP: boolean
    enableAvif: boolean
  }

  // キャッシュ設定
  caching: {
    staticAssets: {
      maxAge: number
      immutable: boolean
    }
    images: {
      maxAge: number
      immutable: boolean
    }
    fonts: {
      maxAge: number
      immutable: boolean
    }
    api: {
      maxAge: number
      sMaxAge: number
    }
  }

  // リソース最適化の設定
  resourceOptimization: {
    preloadCritical: boolean
    prefetchNonCritical: boolean
    preconnectExternal: boolean
    dnsPrefetch: boolean
    maxConcurrentRequests: number
  }

  // メモリ最適化の設定
  memoryOptimization: {
    maxMemoryUsage: number
    cleanupInterval: number
    enableGarbageCollection: boolean
    monitorEventListeners: boolean
  }

  // バンドル最適化の設定
  bundleOptimization: {
    maxBundleSize: number
    enableCodeSplitting: boolean
    enableTreeShaking: boolean
    enableMinification: boolean
    analyzeBundles: boolean
  }

  // 監視設定
  monitoring: {
    enableRealTimeMonitoring: boolean
    metricsCollectionInterval: number
    errorReporting: boolean
    performanceReporting: boolean
    bundleAnalysis: boolean
  }

  // 開発環境設定
  development: {
    showPerformanceMetrics: boolean
    enableBundleAnalyzer: boolean
    performanceDebugMode: boolean
    mockMetrics: boolean
  }
}

/**
 * デフォルト設定
 */
export const defaultPerformanceConfig: PerformanceConfig = {
  thresholds: {
    lcp: {
      good: 2500,
      needsImprovement: 4000,
      poor: 4000
    },
    fid: {
      good: 100,
      needsImprovement: 300,
      poor: 300
    },
    cls: {
      good: 0.1,
      needsImprovement: 0.25,
      poor: 0.25
    },
    ttfb: {
      good: 800,
      needsImprovement: 1800,
      poor: 1800
    }
  },

  imageOptimization: {
    defaultQuality: 85,
    supportedFormats: ['webp', 'avif', 'jpeg', 'png'],
    maxWidth: 1920,
    maxHeight: 1080,
    compressionLevel: 6,
    enableWebP: true,
    enableAvif: true
  },

  caching: {
    staticAssets: {
      maxAge: 31536000, // 1年
      immutable: true
    },
    images: {
      maxAge: 2592000, // 30日
      immutable: true
    },
    fonts: {
      maxAge: 31536000, // 1年
      immutable: true
    },
    api: {
      maxAge: 60, // 1分
      sMaxAge: 300 // 5分
    }
  },

  resourceOptimization: {
    preloadCritical: true,
    prefetchNonCritical: true,
    preconnectExternal: true,
    dnsPrefetch: true,
    maxConcurrentRequests: 6
  },

  memoryOptimization: {
    maxMemoryUsage: 0.8, // 80%
    cleanupInterval: 5000, // 5秒
    enableGarbageCollection: true,
    monitorEventListeners: true
  },

  bundleOptimization: {
    maxBundleSize: 500000, // 500KB
    enableCodeSplitting: true,
    enableTreeShaking: true,
    enableMinification: true,
    analyzeBundles: true
  },

  monitoring: {
    enableRealTimeMonitoring: true,
    metricsCollectionInterval: 1000, // 1秒
    errorReporting: true,
    performanceReporting: true,
    bundleAnalysis: true
  },

  development: {
    showPerformanceMetrics: true,
    enableBundleAnalyzer: true,
    performanceDebugMode: false,
    mockMetrics: false
  }
}

/**
 * 環境別設定の取得
 */
export function getPerformanceConfig(): PerformanceConfig {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isProduction = process.env.NODE_ENV === 'production'

  let config = { ...defaultPerformanceConfig }

  // 開発環境の設定
  if (isDevelopment) {
    config = {
      ...config,
      development: {
        ...config.development,
        showPerformanceMetrics: true,
        enableBundleAnalyzer: true,
        performanceDebugMode: true
      },
      monitoring: {
        ...config.monitoring,
        enableRealTimeMonitoring: true,
        metricsCollectionInterval: 500
      }
    }
  }

  // 本番環境の設定
  if (isProduction) {
    config = {
      ...config,
      development: {
        ...config.development,
        showPerformanceMetrics: false,
        enableBundleAnalyzer: false,
        performanceDebugMode: false
      },
      monitoring: {
        ...config.monitoring,
        enableRealTimeMonitoring: false,
        metricsCollectionInterval: 5000
      },
      imageOptimization: {
        ...config.imageOptimization,
        defaultQuality: 90
      }
    }
  }

  // 環境変数による設定の上書き
  if (process.env.PERFORMANCE_DEBUG === 'true') {
    config.development.performanceDebugMode = true
  }

  if (process.env.ENABLE_BUNDLE_ANALYZER === 'true') {
    config.development.enableBundleAnalyzer = true
  }

  if (process.env.MAX_BUNDLE_SIZE) {
    config.bundleOptimization.maxBundleSize = parseInt(process.env.MAX_BUNDLE_SIZE)
  }

  if (process.env.IMAGE_QUALITY) {
    config.imageOptimization.defaultQuality = parseInt(process.env.IMAGE_QUALITY)
  }

  return config
}

/**
 * 設定の検証
 */
export function validatePerformanceConfig(config: PerformanceConfig): string[] {
  const errors: string[] = []

  // しきい値の検証
  if (config.thresholds.lcp.good >= config.thresholds.lcp.needsImprovement) {
    errors.push('LCPのしきい値が正しく設定されていません')
  }

  if (config.thresholds.fid.good >= config.thresholds.fid.needsImprovement) {
    errors.push('FIDのしきい値が正しく設定されていません')
  }

  if (config.thresholds.cls.good >= config.thresholds.cls.needsImprovement) {
    errors.push('CLSのしきい値が正しく設定されていません')
  }

  if (config.thresholds.ttfb.good >= config.thresholds.ttfb.needsImprovement) {
    errors.push('TTFBのしきい値が正しく設定されていません')
  }

  // 画像最適化の検証
  if (config.imageOptimization.defaultQuality < 0 || config.imageOptimization.defaultQuality > 100) {
    errors.push('画像品質は0-100の範囲で設定してください')
  }

  if (config.imageOptimization.maxWidth <= 0 || config.imageOptimization.maxHeight <= 0) {
    errors.push('画像の最大サイズは正の値で設定してください')
  }

  // キャッシュ設定の検証
  if (config.caching.staticAssets.maxAge <= 0) {
    errors.push('静的アセットのキャッシュ期間は正の値で設定してください')
  }

  // メモリ最適化の検証
  if (config.memoryOptimization.maxMemoryUsage <= 0 || config.memoryOptimization.maxMemoryUsage > 1) {
    errors.push('メモリ使用量の上限は0-1の範囲で設定してください')
  }

  // バンドル最適化の検証
  if (config.bundleOptimization.maxBundleSize <= 0) {
    errors.push('バンドルサイズの上限は正の値で設定してください')
  }

  return errors
}

/**
 * 設定の適用
 */
export function applyPerformanceConfig(config: PerformanceConfig): void {
  // 設定の検証
  const errors = validatePerformanceConfig(config)
  if (errors.length > 0) {
    console.error('Performance config validation errors:', errors)
    throw new Error('Invalid performance configuration')
  }

  // グローバル設定の適用
  if (typeof window !== 'undefined') {
    (window as any).__PERFORMANCE_CONFIG__ = config
  }

  // 環境変数の設定
  if (config.development.performanceDebugMode) {
    process.env.PERFORMANCE_DEBUG = 'true'
  }

  if (config.development.enableBundleAnalyzer) {
    process.env.ENABLE_BUNDLE_ANALYZER = 'true'
  }

  console.log('Performance configuration applied:', config)
}

/**
 * 現在の設定を取得
 */
export function getCurrentPerformanceConfig(): PerformanceConfig {
  if (typeof window !== 'undefined' && (window as any).__PERFORMANCE_CONFIG__) {
    return (window as any).__PERFORMANCE_CONFIG__
  }

  return getPerformanceConfig()
}

/**
 * 設定の更新
 */
export function updatePerformanceConfig(updates: Partial<PerformanceConfig>): PerformanceConfig {
  const currentConfig = getCurrentPerformanceConfig()
  const updatedConfig = { ...currentConfig, ...updates }

  // 更新された設定を適用
  applyPerformanceConfig(updatedConfig)

  return updatedConfig
}

/**
 * 設定のリセット
 */
export function resetPerformanceConfig(): PerformanceConfig {
  const defaultConfig = getPerformanceConfig()
  applyPerformanceConfig(defaultConfig)
  return defaultConfig
}
