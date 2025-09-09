'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNavigation, ctaButtons } from '@/data/nav'

/**
 * ヘッダーコンポーネント
 * 次世代を作り繋げる企業 - Xiora
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/ja' || pathname === '/en'
    }
    return pathname.includes(href)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-black">
              Xiora
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={ctaButtons.secondary.href}
              className="text-gray-600 hover:text-black text-sm font-medium transition-colors"
            >
              {ctaButtons.secondary.text}
            </Link>
            <Link
              href={ctaButtons.primary.href}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              {ctaButtons.primary.text}
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none focus:text-black"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-black bg-gray-50'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* モバイルCTAボタン */}
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Link
                    href={ctaButtons.secondary.href}
                    className="block w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {ctaButtons.secondary.text}
                  </Link>
                  <Link
                    href={ctaButtons.primary.href}
                    className="block w-full text-center px-3 py-2 text-base font-medium bg-black text-white hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {ctaButtons.primary.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
