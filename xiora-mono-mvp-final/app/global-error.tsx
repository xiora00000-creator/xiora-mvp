'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from './components/ui/Button'
import { Container } from './components/ui/Container'
import { Display, Body, Caption } from './components/ui/Typography'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーログの記録
    console.error('Global error:', error)
    
    // エラー監視サービスへの送信（本番環境）
    if (process.env.NODE_ENV === 'production') {
      // Sentry等へのエラー送信
      console.log('Error digest:', error.digest)
    }
  }, [error])

  return (
    <html>
      <body>
        <Container className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center max-w-2xl mx-auto">
            {/* エラーアイコン */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                <span className="text-6xl">⚠️</span>
              </div>
            </div>

            {/* メインメッセージ */}
            <Display className="mb-6">サーバーエラーが発生しました</Display>
            <Body className="text-neutral-600 mb-8">
              申し訳ございません。一時的な問題が発生しています。
              <br />
              しばらく時間をおいてから再度お試しください。
            </Body>

            {/* エラー詳細（開発環境のみ） */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <Caption className="text-red-600 mb-2">開発者向け情報</Caption>
                <pre className="text-xs text-red-700 overflow-auto">
                  {error.message}
                  {error.stack && `\n${error.stack}`}
                </pre>
              </div>
            )}

            {/* アクション */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={reset} size="lg">
                再試行
              </Button>
              <Button variant="ghost" asChild size="lg">
                <Link href="/ja">
                  ホームに戻る
                </Link>
              </Button>
            </div>

            {/* ヘルプ情報 */}
            <div className="border-t border-neutral-200 pt-8">
              <Caption className="text-neutral-500 mb-4">お困りの際は</Caption>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/ja/contact" className="text-neutral-600 hover:text-black transition-colors">
                  お問い合わせ
                </Link>
                <Link href="/ja/support" className="text-neutral-600 hover:text-black transition-colors">
                  サポート
                </Link>
                <a href="tel:+81-3-XXXX-XXXX" className="text-neutral-600 hover:text-black transition-colors">
                  お電話でのお問い合わせ
                </a>
              </div>
            </div>

            {/* エラーID */}
            {error.digest && (
              <div className="mt-8 p-3 bg-neutral-100 rounded-lg">
                <Caption className="text-neutral-500">エラーID: {error.digest}</Caption>
              </div>
            )}
          </div>
        </Container>
      </body>
    </html>
  )
}
