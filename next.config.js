const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // 画像最適化設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 実験的機能の有効化
  experimental: {
    // 最適化されたパッケージ
    optimizePackageImports: [
      '@heroicons/react',
      'clsx',
      'tailwind-merge'
    ],
    
    // サーバーコンポーネントの最適化
    serverComponentsExternalPackages: [],
  },

  // コンパイラ設定
  compiler: {
    // 開発環境でのconsole.logの削除
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
    
    // 感情表現の削除
    emotion: false,
    
    // スタイルドコンポーネントの最適化
    styledComponents: false,
  },

  // 出力設定
  output: 'standalone',
  
  // ヘッダー設定（セキュリティとパフォーマンス）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // セキュリティヘッダー
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          
          // パフォーマンスヘッダー
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ]
      },
      
      // 静的アセット用のヘッダー
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      
      // 画像用のヘッダー
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      
      // フォント用のヘッダー
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      
      // API用のヘッダー
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=300'
          }
        ]
      }
    ]
  },

  // リダイレクト設定
  async redirects() {
    return [
      // 古いURLから新しいURLへのリダイレクト
      {
        source: '/old-home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/catalog',
        permanent: true,
      },
    ]
  },

  // リライト設定
  async rewrites() {
    return [
      // 画像最適化のためのリライト
      {
        source: '/optimized-images/:path*',
        destination: '/api/image-optimization/:path*',
      },
      
      // パフォーマンス監視用のリライト
      {
        source: '/performance-metrics',
        destination: '/api/performance-metrics',
      },
    ]
  },

  // Webpack設定
  webpack: (config, { dev, isServer }) => {
    // 本番環境での最適化
    if (!dev && !isServer) {
      // バンドル分析の有効化
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analysis.html'
          })
        )
      }

      // コード分割の最適化
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }

      // ミニファイ設定
      config.optimization.minimize = true
    }

    // フォントファイルの最適化
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/fonts/',
        },
      },
    })

    // 画像ファイルの最適化
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/images/',
        },
      },
    })

    return config
  },

  // 環境変数の設定
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // パフォーマンス監視の設定
  onDemandEntries: {
    // ページのメモリ内保持時間
    maxInactiveAge: 25 * 1000,
    // 同時に保持するページ数
    pagesBufferLength: 2,
  },

  // 静的生成の設定
  generateEtags: false,
  
  // 圧縮設定
  compress: true,
  
  // パワーアナリティクス
  poweredByHeader: false,
}

module.exports = withMDX(nextConfig)