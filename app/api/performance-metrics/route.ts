import { NextRequest, NextResponse } from 'next/server'
import { performanceMonitor } from '@/lib/performance/performanceMonitor'

export async function GET(request: NextRequest) {
  try {
    // クエリパラメータの取得
    const { searchParams } = new URL(request.url)
    const includeBundleAnalysis = searchParams.get('bundle') === 'true'
    const includeOptimizationSuggestions = searchParams.get('optimization') === 'true'

    // パフォーマンスメトリクスの取得
    const performanceMetrics = performanceMonitor.getMetrics()
    
    // レスポンスデータの構築
    const responseData: any = {
      timestamp: new Date().toISOString(),
      url: request.url,
      performance: {
        metrics: performanceMetrics,
        summary: generatePerformanceSummary(performanceMetrics),
        recommendations: generatePerformanceRecommendations(performanceMetrics)
      },
      system: {
        userAgent: request.headers.get('user-agent'),
        acceptLanguage: request.headers.get('accept-language'),
        acceptEncoding: request.headers.get('accept-encoding')
      }
    }

    // バンドル分析は今後の実装予定
    if (includeBundleAnalysis) {
      responseData.bundle = {
        analysis: { message: 'Bundle analysis will be implemented in future updates' },
        optimizationSuggestions: includeOptimizationSuggestions ? [] : undefined
      }
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Performance metrics API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to collect performance metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'reset-metrics':
        performanceMonitor.resetMetrics()
        return NextResponse.json({ success: true, message: 'Metrics reset successfully' })

      case 'reset-bundle-analysis':
        return NextResponse.json({ success: true, message: 'Bundle analysis will be implemented in future updates' })

      case 'generate-report':
        const report = performanceMonitor.generateReport()
        return NextResponse.json({ 
          success: true, 
          report: JSON.parse(report) 
        })

      case 'optimize-performance':
        // パフォーマンス最適化の実行（実際の実装はクライアントサイドで行う）
        return NextResponse.json({ 
          success: true, 
          message: 'Performance optimization initiated',
          note: 'Actual optimization is performed client-side'
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Performance metrics API POST error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * パフォーマンスサマリーの生成
 */
function generatePerformanceSummary(metrics: any) {
  const summary: Record<string, any> = {}

  // Core Web Vitals の評価
  if (metrics.lcp !== null) {
    summary.lcp = {
      value: metrics.lcp,
      rating: metrics.lcp < 2500 ? 'good' : metrics.lcp < 4000 ? 'needs-improvement' : 'poor',
      impact: metrics.lcp < 2500 ? 'low' : metrics.lcp < 4000 ? 'medium' : 'high'
    }
  }

  if (metrics.fid !== null) {
    summary.fid = {
      value: metrics.fid,
      rating: metrics.fid < 100 ? 'good' : metrics.fid < 300 ? 'needs-improvement' : 'poor',
      impact: metrics.fid < 100 ? 'low' : metrics.fid < 300 ? 'medium' : 'high'
    }
  }

  if (metrics.cls !== null) {
    summary.cls = {
      value: metrics.cls,
      rating: metrics.cls < 0.1 ? 'good' : metrics.cls < 0.25 ? 'needs-improvement' : 'poor',
      impact: metrics.cls < 0.1 ? 'low' : metrics.cls < 0.25 ? 'medium' : 'high'
    }
  }

  // 全体的なパフォーマンススコア
  const scores = Object.values(summary).map((metric: any) => {
    if (metric.rating === 'good') return 100
    if (metric.rating === 'needs-improvement') return 50
    return 0
  })

  if (scores.length > 0) {
    const totalScore = scores.reduce((a: number, b: number) => a + b, 0)
    summary.overallScore = Math.round(totalScore / scores.length)
    summary.overallRating = summary.overallScore >= 80 ? 'good' : 
                           summary.overallScore >= 60 ? 'needs-improvement' : 'poor'
  }

  return summary
}

/**
 * パフォーマンス推奨事項の生成
 */
function generatePerformanceRecommendations(metrics: any): string[] {
  const recommendations: string[] = []

  // LCP の推奨事項
  if (metrics.lcp && metrics.lcp > 4000) {
    recommendations.push('LCPが4秒を超えています。画像の最適化、サーバー応答時間の改善、重要なリソースのプリロードを検討してください。')
  } else if (metrics.lcp && metrics.lcp > 2500) {
    recommendations.push('LCPを2.5秒以下に改善することを検討してください。')
  }

  // FID の推奨事項
  if (metrics.fid && metrics.fid > 300) {
    recommendations.push('FIDが300msを超えています。JavaScriptの実行時間を短縮し、メインスレッドのブロッキングを削減してください。')
  } else if (metrics.fid && metrics.fid > 100) {
    recommendations.push('FIDを100ms以下に改善することを検討してください。')
  }

  // CLS の推奨事項
  if (metrics.cls && metrics.cls > 0.25) {
    recommendations.push('CLSが0.25を超えています。レイアウトシフトを防ぐため、画像や動的コンテンツに適切なサイズを設定してください。')
  } else if (metrics.cls && metrics.cls > 0.1) {
    recommendations.push('CLSを0.1以下に改善することを検討してください。')
  }

  // TTFB の推奨事項
  if (metrics.ttfb && metrics.ttfb > 800) {
    recommendations.push('TTFBが800msを超えています。サーバー応答時間の改善、CDNの活用、データベースクエリの最適化を検討してください。')
  }

  // ページロード時間の推奨事項
  if (metrics.pageLoadTime && metrics.pageLoadTime > 3000) {
    recommendations.push('ページロード時間が3秒を超えています。リソースの最適化、コード分割、遅延読み込みの実装を検討してください。')
  }

  // エラー数の推奨事項
  if (metrics.errorCount && metrics.errorCount > 5) {
    recommendations.push('エラー数が多すぎます。JavaScriptエラーの修正、依存関係の更新、エラーハンドリングの改善を検討してください。')
  }

  // メモリ使用量の推奨事項
  if (metrics.memoryUsage) {
    const memoryUsage = metrics.memoryUsage.usedJSHeapSize / metrics.memoryUsage.jsHeapSizeLimit
    if (memoryUsage > 0.8) {
      recommendations.push('メモリ使用量が80%を超えています。メモリリークの調査、不要なオブジェクトの削除、ガベージコレクションの最適化を検討してください。')
    }
  }

  // リソース読み込み時間の推奨事項
  if (metrics.resourceLoadTimes && Object.keys(metrics.resourceLoadTimes).length > 0) {
    const resourceTimes = Object.values(metrics.resourceLoadTimes) as number[]
    const avgLoadTime = resourceTimes.reduce((a, b) => a + b, 0) / resourceTimes.length
    if (avgLoadTime > 1000) {
      recommendations.push('リソースの平均読み込み時間が1秒を超えています。CDNの活用、画像の最適化、リソースの圧縮を検討してください。')
    }
  }

  return recommendations
}
