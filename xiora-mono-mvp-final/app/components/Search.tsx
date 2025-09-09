'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/Button'
import { useLocale } from '@/lib/i18n/useLocale'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'product' | 'blog' | 'category'
  relevance: number
}

export function Search({ onClose }: { onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { locale } = useLocale()

  // 検索結果のサンプルデータ
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: '宇宙技術の革新',
      description: '最新の宇宙技術とその応用について',
      url: `/${locale}/blog/space-technology-innovation`,
      type: 'blog',
      relevance: 0.9,
    },
    {
      id: '2',
      title: 'ミニマルデザイン哲学',
      description: 'Xioraのデザイン思想とアプローチ',
      url: `/${locale}/blog/minimal-design-philosophy`,
      type: 'blog',
      relevance: 0.8,
    },
    {
      id: '3',
      title: '宇宙機器カタログ',
      description: '各種宇宙機器の詳細情報',
      url: `/${locale}/catalog`,
      type: 'category',
      relevance: 0.7,
    },
    {
      id: '4',
      title: 'カスタム機器開発',
      description: 'お客様のニーズに合わせた機器開発',
      url: `/${locale}/custom-rental`,
      type: 'page',
      relevance: 0.7,
    },
    {
      id: '5',
      title: 'レンタルサービス',
      description: '宇宙機器のレンタルサービス',
      url: `/${locale}/custom-rental`,
      type: 'page',
      relevance: 0.6,
    },
  ]

  // 検索実行
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // 実際の実装では、APIエンドポイントを呼び出す
    // ここではサンプルデータでフィルタリング
    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => b.relevance - a.relevance)

    // 検索結果の模擬的な遅延
    setTimeout(() => {
      setResults(filteredResults)
      setIsLoading(false)
      setSelectedIndex(-1)
    }, 300)
  }

  // 検索クエリの変更を監視
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // キーボードナビゲーション
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
      setResults([])
      onClose?.()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const selectedResult = results[selectedIndex]
      if (selectedResult) {
        router.push(selectedResult.url)
        setIsOpen(false)
        setQuery('')
        setResults([])
        onClose?.()
      }
    }
  }

  // 検索結果の選択
  const handleResultClick = (result: SearchResult) => {
    router.push(result.url)
    setIsOpen(false)
    setQuery('')
    setResults([])
    onClose?.()
  }

  // 検索モーダルの開閉
  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
      onClose?.()
    }
  }

  // 外部クリックで検索を閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
        setResults([])
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* 検索ボタン */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSearch}
        className="p-2"
        aria-label="検索"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>

      {/* 検索モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <div
            ref={searchRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
          >
            {/* 検索ヘッダー */}
            <div className="flex items-center p-4 border-b border-neutral-200">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="サイト内を検索..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSearch}
                className="ml-2 p-2"
                aria-label="検索を閉じる"
              >
                <XMarkIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* 検索結果 */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-neutral-500">
                  検索中...
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                        index === selectedIndex ? 'bg-neutral-100' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-black mb-1">
                            {result.title}
                          </h3>
                          <p className="text-sm text-neutral-600 mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500">
                              {result.type === 'page' && 'ページ'}
                              {result.type === 'product' && '製品'}
                              {result.type === 'blog' && 'ブログ'}
                              {result.type === 'category' && 'カテゴリ'}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {result.url}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="p-4 text-center text-neutral-500">
                  検索結果が見つかりませんでした
                </div>
              ) : (
                <div className="p-4 text-center text-neutral-500">
                  検索したいキーワードを入力してください
                </div>
              )}
            </div>

            {/* 検索ヒント */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200">
              <p className="text-xs text-neutral-500">
                キーボードショートカット: ↑↓ で結果を選択、Enter で決定、Esc で閉じる
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
