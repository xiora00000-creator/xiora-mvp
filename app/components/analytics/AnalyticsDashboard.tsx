'use client'

import React, { useState, useEffect } from 'react'
import { useAnalytics } from './AnalyticsProvider'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface AnalyticsDashboardProps {
  isAdmin?: boolean
  showRealTime?: boolean
}

export function AnalyticsDashboard({ isAdmin = false, showRealTime = true }: AnalyticsDashboardProps) {
  const { isInitialized, privacySettings } = useAnalytics()
  
  const [metrics, setMetrics] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30000) // 30秒
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  // メトリクスの取得
  useEffect(() => {
    if (isInitialized) {
      fetchMetrics()
    }
  }, [isInitialized])

  // リアルタイム更新の設定
  useEffect(() => {
    if (!showRealTime || !isInitialized) return

    const interval = setInterval(fetchMetrics, refreshInterval)
    return () => clearInterval(interval)
  }, [showRealTime, isInitialized, refreshInterval])

  // メトリクスの取得
  const fetchMetrics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/performance-metrics')
      if (response.ok) {
        const data = await response.json()
        setMetrics(data.performance || {})
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 時間範囲の変更
  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range)
    fetchMetrics()
  }

  // 更新間隔の変更
  const handleRefreshIntervalChange = (interval: number) => {
    setRefreshInterval(interval)
  }

  // データのエクスポート
  const handleExportData = () => {
    const data = {
      metrics,
      timestamp: new Date().toISOString(),
      timeRange: selectedTimeRange
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isAdmin) {
    return null
  }

  if (!isInitialized) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          アナリティクスが初期化されていません
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            アナリティクスダッシュボード
          </h2>
          <p className="text-gray-600 mt-1">
            サイトのパフォーマンスとユーザー行動の詳細分析
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={fetchMetrics}
            variant="secondary"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? '読み込み中...' : '更新'}
          </Button>
          
          <Button
            onClick={handleExportData}
            variant="secondary"
            size="sm"
          >
            エクスポート
          </Button>
        </div>
      </div>

      {/* コントロールパネル */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* 時間範囲選択 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              時間範囲:
            </label>
            <select
              value={selectedTimeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="1h">1時間</option>
              <option value="24h">24時間</option>
              <option value="7d">7日間</option>
              <option value="30d">30日間</option>
            </select>
          </div>

          {/* 更新間隔選択 */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              更新間隔:
            </label>
            <select
              value={refreshInterval / 1000}
              onChange={(e) => handleRefreshIntervalChange(parseInt(e.target.value) * 1000)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value={10}>10秒</option>
              <option value={30}>30秒</option>
              <option value={60}>1分</option>
              <option value={300}>5分</option>
            </select>
          </div>

          {/* プライバシー設定状態 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              プライバシー:
            </span>
            <div className="flex items-center gap-1">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div
                  key={key}
                  className={`w-2 h-2 rounded-full ${
                    value ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  title={`${key}: ${value ? '有効' : '無効'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* メトリクスグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ページビュー */}
        <MetricCard
          title="ページビュー"
          value={metrics.pageViews || 0}
          change={metrics.pageViewsChange || 0}
          format="number"
          icon="📊"
        />

        {/* ユニークユーザー */}
        <MetricCard
          title="ユニークユーザー"
          value={metrics.uniqueUsers || 0}
          change={metrics.uniqueUsersChange || 0}
          format="number"
          icon="👥"
        />

        {/* セッション数 */}
        <MetricCard
          title="セッション数"
          value={metrics.sessions || 0}
          change={metrics.sessionsChange || 0}
          format="number"
          icon="🔄"
        />

        {/* 離脱率 */}
        <MetricCard
          title="離脱率"
          value={metrics.bounceRate || 0}
          change={metrics.bounceRateChange || 0}
          format="percentage"
          icon="📈"
          isInverse={true}
        />
      </div>

      {/* パフォーマンスメトリクス */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          パフォーマンス指標
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* LCP */}
          <PerformanceMetric
            label="LCP"
            value={metrics.lcp}
            threshold={2500}
            unit="ms"
            description="最大コンテンツフルペイント"
          />

          {/* FID */}
          <PerformanceMetric
            label="FID"
            value={metrics.fid}
            threshold={100}
            unit="ms"
            description="初回入力遅延"
          />

          {/* CLS */}
          <PerformanceMetric
            label="CLS"
            value={metrics.cls}
            threshold={0.1}
            unit=""
            description="累積レイアウトシフト"
          />

          {/* TTFB */}
          <PerformanceMetric
            label="TTFB"
            value={metrics.ttfb}
            threshold={800}
            unit="ms"
            description="初回バイトまでの時間"
          />

          {/* ページロード時間 */}
          <PerformanceMetric
            label="ロード時間"
            value={metrics.pageLoadTime}
            threshold={3000}
            unit="ms"
            description="ページ完全読み込み時間"
          />

          {/* エラー率 */}
          <PerformanceMetric
            label="エラー率"
            value={metrics.errorRate}
            threshold={5}
            unit="%"
            description="JavaScriptエラー発生率"
            isInverse={true}
          />
        </div>
      </Card>

      {/* リアルタイムアクティビティ */}
      {showRealTime && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            リアルタイムアクティビティ
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                アクティブユーザー
              </span>
              <span className="font-medium text-green-600">
                {metrics.activeUsers || 0}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                現在のページ
              </span>
              <span className="font-medium text-blue-600">
                {metrics.currentPage || '/'}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                最後のイベント
              </span>
              <span className="font-medium text-gray-900">
                {metrics.lastEvent || 'イベントなし'}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* プライバシー設定 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          プライバシー設定
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(privacySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key}
              </span>
              <span className={`text-sm font-medium ${
                value ? 'text-green-600' : 'text-red-600'
              }`}>
                {value ? '有効' : '無効'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// メトリクスカードコンポーネント
interface MetricCardProps {
  title: string
  value: number
  change: number
  format: 'number' | 'percentage' | 'currency'
  icon: string
  isInverse?: boolean
}

function MetricCard({ title, value, change, format, icon, isInverse = false }: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`
      case 'currency':
        return `¥${val.toLocaleString()}`
      default:
        return val.toLocaleString()
    }
  }

  const formatChange = (val: number) => {
    const sign = val >= 0 ? '+' : ''
    return `${sign}${val.toFixed(1)}%`
  }

  const isPositive = isInverse ? change <= 0 : change >= 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      
      {change !== 0 && (
        <div className="mt-2 flex items-center">
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatChange(change)}
          </span>
          <svg
            className={`ml-1 w-4 h-4 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isPositive ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            )}
          </svg>
        </div>
      )}
    </Card>
  )
}

// パフォーマンスメトリクスコンポーネント
interface PerformanceMetricProps {
  label: string
  value: number
  threshold: number
  unit: string
  description: string
  isInverse?: boolean
}

function PerformanceMetric({ label, value, threshold, unit, description, isInverse = false }: PerformanceMetricProps) {
  if (value === undefined || value === null) return null

  const isGood = isInverse ? value <= threshold : value <= threshold
  const statusColor = isGood ? 'text-green-600' : 'text-red-600'
  const statusText = isGood ? '良好' : '要改善'

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-xs font-medium ${statusColor}`}>{statusText}</span>
      </div>
      
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {value.toFixed(2)}{unit}
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        目標: {threshold}{unit}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isGood ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            width: `${Math.min((value / threshold) * 100, 100)}%`
          }}
        />
      </div>
      
      <p className="text-xs text-gray-600 mt-2">{description}</p>
    </div>
  )
}
