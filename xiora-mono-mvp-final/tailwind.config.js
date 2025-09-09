/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // カラーパレット（WCAG AA準拠）
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#e9ecef'
        },
        fg: {
          DEFAULT: '#000000',
          secondary: '#343a40',
          muted: '#6c757d'
        },
        neutral: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#000000'
        },
        line: {
          DEFAULT: '#dee2e6',
          light: '#e9ecef',
          dark: '#adb5bd'
        },
        // アクセシビリティ対応カラー
        focus: {
          DEFAULT: '#0066cc',
          ring: '#0066cc',
          offset: '#ffffff'
        },
        error: {
          DEFAULT: '#dc3545',
          light: '#f8d7da',
          dark: '#721c24'
        },
        success: {
          DEFAULT: '#28a745',
          light: '#d4edda',
          dark: '#155724'
        },
        warning: {
          DEFAULT: '#ffc107',
          light: '#fff3cd',
          dark: '#856404'
        },
        info: {
          DEFAULT: '#17a2b8',
          light: '#d1ecf1',
          dark: '#0c5460'
        }
      },

      // フォントファミリー
      fontFamily: {
        display: ['var(--font-cormorant-garamond)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      },

      // フォントサイズ
      fontSize: {
        'display': {
          'xs': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
          'sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
          'md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          'lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          'xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          '2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
        },
        'heading': {
          'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
          'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
          'h3': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }]
        },
        'body': {
          'sm': ['0.875rem', { lineHeight: '1.7' }],
          'base': ['1rem', { lineHeight: '1.8' }],
          'lg': ['1.125rem', { lineHeight: '1.8' }],
          'xl': ['1.25rem', { lineHeight: '1.8' }]
        },
        'caption': {
          'sm': ['0.75rem', { lineHeight: '1.6' }],
          'base': ['0.875rem', { lineHeight: '1.6' }]
        }
      },

      // フォントウェイト
      fontWeight: {
        'display': '400',
        'heading': '700',
        'body': '400',
        'caption': '500'
      },

      // スペーシング
      spacing: {
        'section': '5rem',
        'heading': '1.5rem',
        'grid': '1.5rem'
      },

      // トランジション
      transitionDuration: {
        'fast': '100ms',
        'normal': '150ms',
        'slow': '300ms'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },

      // アニメーション
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },

      // レスポンシブブレークポイント
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },

      // コンテナ設定
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      },

      // フォーカスリング設定
      ringWidth: {
        'focus': '3px'
      },
      ringColor: {
        'focus': '#0066cc'
      },
      ringOffsetWidth: {
        'focus': '2px'
      },
      ringOffsetColor: {
        'focus': '#ffffff'
      }
    }
  },
  plugins: [
    // レスポンシブグリッドユーティリティ
    function({ addUtilities }) {
      const newUtilities = {
        '.grid-responsive-1': {
          '@apply grid grid-cols-1 gap-6': {}
        },
        '.grid-responsive-2': {
          '@apply grid grid-cols-1 md:grid-cols-2 gap-6': {}
        },
        '.grid-responsive-3': {
          '@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': {}
        },
        '.grid-responsive-4': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6': {}
        },
        '.container-wide': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {}
        },
        '.container-narrow': {
          '@apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8': {}
        },
        // アクセシビリティユーティリティ
        '.focus-visible-ring': {
          '@apply focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-white': {}
        },
        '.sr-only': {
          '@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0': {}
        },
        '.skip-link': {
          '@apply absolute -top-10 left-6 z-50 px-4 py-2 bg-fg text-bg text-sm font-medium rounded transition-transform duration-normal focus-visible:top-6 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2': {}
        }
      }
      addUtilities(newUtilities)
    }
  ]
}