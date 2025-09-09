/**
 * アナリティクスシステムの型定義
 */

// アナリティクス設定
export interface AnalyticsConfig {
  posthog: PostHogConfig
  googleAnalytics: GoogleAnalyticsConfig
  custom: CustomAnalyticsConfig
  privacy: PrivacyConfig
}

// PostHog設定
export interface PostHogConfig {
  apiKey: string
  host: string
  enableDebugMode: boolean
  capturePageView: boolean
  capturePageLeave: boolean
  captureClicks: boolean
  captureFormSubmissions: boolean
  captureScrollDepth: boolean
  captureTimeOnPage: boolean
}

// Google Analytics設定
export interface GoogleAnalyticsConfig {
  measurementId: string
  enableDebugMode: boolean
  anonymizeIp: boolean
  respectDoNotTrack: boolean
  enhancedLinkAttribution: boolean
  demographicsAndInterests: boolean
}

// カスタムアナリティクス設定
export interface CustomAnalyticsConfig {
  enableCustomEvents: boolean
  enableUserTracking: boolean
  enableSessionRecording: boolean
  enableHeatmaps: boolean
  dataRetentionDays: number
  enableDataExport: boolean
}

// プライバシー設定
export interface PrivacyConfig {
  enableConsentManagement: boolean
  enableDataAnonymization: boolean
  enableOptOut: boolean
  respectGdpr: boolean
  cookieExpiryDays: number
}

// プライバシー設定
export interface PrivacySettings {
  analytics: boolean
  marketing: boolean
  necessary: boolean
  preferences: boolean
}

// ユーザープロパティ
export interface UserProperties {
  userId?: string
  email?: string
  name?: string
  company?: string
  role?: string
  location?: string
  language?: string
  timezone?: string
  deviceType?: string
  browser?: string
  os?: string
  [key: string]: any
}

// アナリティクスイベント
export interface AnalyticsEvent {
  eventName: string
  properties?: Record<string, any>
  timestamp: string
  sessionId: string
  pageUrl: string
  userAgent: string
  privacyConsent: PrivacySettings
}

// ページビューイベント
export interface PageViewEvent extends AnalyticsEvent {
  eventName: 'page_view'
  properties: {
    pageTitle: string
    pagePath: string
    referrer: string
    pageType: string
    contentCategory?: string
    contentTags?: string[]
    loadTime?: number
    scrollDepth?: number
    timeOnPage?: number
  }
}

// ユーザーインタラクションイベント
export interface UserInteractionEvent extends AnalyticsEvent {
  eventName: 'user_interaction'
  properties: {
    interactionType: 'click' | 'scroll' | 'form_submit' | 'form_field_focus' | 'video_play' | 'download'
    elementId?: string
    elementClass?: string
    elementText?: string
    elementType?: string
    pageSection?: string
    interactionValue?: string | number
  }
}

// コンバージョンイベント
export interface ConversionEvent extends AnalyticsEvent {
  eventName: 'conversion'
  properties: {
    conversionType: 'contact_form' | 'reservation' | 'purchase' | 'newsletter_signup' | 'download'
    conversionValue?: number
    conversionCurrency?: string
    conversionSource?: string
    conversionMedium?: string
    conversionCampaign?: string
    conversionTerm?: string
    conversionContent?: string
    conversionStage?: string
    conversionFunnel?: string
  }
}

// エラーイベント
export interface ErrorEvent extends AnalyticsEvent {
  eventName: 'error'
  properties: {
    errorType: 'javascript' | 'network' | 'validation' | 'server' | 'user'
    errorMessage: string
    errorStack?: string
    errorCode?: string
    errorUrl?: string
    errorLine?: number
    errorColumn?: number
    userAction?: string
    pageState?: string
  }
}

// パフォーマンスイベント
export interface PerformanceEvent extends AnalyticsEvent {
  eventName: 'performance'
  properties: {
    metricType: 'lcp' | 'fid' | 'cls' | 'ttfb' | 'fcp' | 'load_time' | 'resource_load'
    metricValue: number
    metricUnit?: string
    threshold?: number
    isGood?: boolean
    pageUrl: string
    resourceType?: string
    resourceUrl?: string
    resourceSize?: number
  }
}

// 検索イベント
export interface SearchEvent extends AnalyticsEvent {
  eventName: 'search'
  properties: {
    searchQuery: string
    searchResults: number
    searchFilters?: Record<string, any>
    searchCategory?: string
    searchSource?: string
    searchPosition?: number
    searchTime?: number
    searchSuccess?: boolean
  }
}

// コンテンツエンゲージメントイベント
export interface ContentEngagementEvent extends AnalyticsEvent {
  eventName: 'content_engagement'
  properties: {
    contentType: 'article' | 'product' | 'video' | 'image' | 'download'
    contentId: string
    contentTitle: string
    contentCategory?: string
    contentTags?: string[]
    engagementType: 'view' | 'read' | 'share' | 'like' | 'comment' | 'bookmark'
    engagementValue?: number
    timeSpent?: number
    scrollDepth?: number
    completionRate?: number
  }
}

// セッションイベント
export interface SessionEvent extends AnalyticsEvent {
  eventName: 'session'
  properties: {
    sessionType: 'start' | 'end' | 'extend' | 'timeout'
    sessionDuration?: number
    sessionPages?: number
    sessionEvents?: number
    sessionSource?: string
    sessionMedium?: string
    sessionCampaign?: string
    sessionTerm?: string
    sessionContent?: string
    sessionLandingPage?: string
    sessionExitPage?: string
  }
}

// デバイス・ブラウザ情報
export interface DeviceInfo {
  deviceType: 'desktop' | 'tablet' | 'mobile'
  deviceBrand?: string
  deviceModel?: string
  screenResolution: string
  viewportSize: string
  colorDepth: number
  pixelRatio: number
  touchSupport: boolean
  orientation: 'portrait' | 'landscape'
}

// ネットワーク情報
export interface NetworkInfo {
  connectionType?: string
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

// 地理的位置情報
export interface LocationInfo {
  country?: string
  region?: string
  city?: string
  timezone?: string
  latitude?: number
  longitude?: number
  accuracy?: number
}

// アナリティクスレポート
export interface AnalyticsReport {
  reportId: string
  reportType: 'daily' | 'weekly' | 'monthly' | 'custom'
  dateRange: {
    start: string
    end: string
  }
  metrics: {
    pageViews: number
    uniqueUsers: number
    sessions: number
    bounceRate: number
    avgSessionDuration: number
    conversionRate: number
    topPages: Array<{
      page: string
      views: number
      uniqueViews: number
      avgTimeOnPage: number
      bounceRate: number
    }>
    topSources: Array<{
      source: string
      sessions: number
      conversionRate: number
    }>
    userBehavior: {
      newUsers: number
      returningUsers: number
      userRetention: Record<string, number>
    }
  }
  generatedAt: string
}

// アナリティクスアラート
export interface AnalyticsAlert {
  alertId: string
  alertType: 'threshold' | 'anomaly' | 'trend' | 'error'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  metric: string
  currentValue: number
  thresholdValue?: number
  trend?: 'increasing' | 'decreasing' | 'stable'
  triggeredAt: string
  isResolved: boolean
  resolvedAt?: string
  actions?: Array<{
    action: string
    url?: string
    description: string
  }>
}

// データエクスポート設定
export interface DataExportConfig {
  format: 'csv' | 'json' | 'xlsx'
  dateRange: {
    start: string
    end: string
  }
  metrics: string[]
  filters?: Record<string, any>
  includeMetadata: boolean
  anonymizeData: boolean
  compression: boolean
}

// アナリティクスダッシュボード設定
export interface DashboardConfig {
  dashboardId: string
  title: string
  description?: string
  widgets: Array<{
    widgetId: string
    type: 'chart' | 'metric' | 'table' | 'heatmap'
    title: string
    dataSource: string
    config: Record<string, any>
    position: {
      x: number
      y: number
      width: number
      height: number
    }
  }>
  refreshInterval: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
