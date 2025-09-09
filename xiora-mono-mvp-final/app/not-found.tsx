import Link from 'next/link'
import { Button } from './components/ui/Button'
import { Container } from './components/ui/Container'
import { Display, H1, Body, Caption } from './components/ui/Typography'

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 アイコン */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-neutral-100 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-neutral-400">404</span>
          </div>
        </div>

        {/* メインメッセージ */}
        <Display className="mb-6">ページが見つかりません</Display>
        <Body className="text-neutral-600 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
          <br />
          正しいURLをご確認いただくか、下記のリンクからサイト内を移動してください。
        </Body>

        {/* アクション */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg">
            <Link href="/ja">
              ホームに戻る
            </Link>
          </Button>
          <Button variant="ghost" asChild size="lg">
            <Link href="/ja/contact">
              お問い合わせ
            </Link>
          </Button>
        </div>

        {/* よく使われるページへのリンク */}
        <div className="border-t border-neutral-200 pt-8">
          <Caption className="text-neutral-500 mb-4">よく使われるページ</Caption>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/ja/about" className="text-neutral-600 hover:text-black transition-colors">
              会社概要
            </Link>
            <Link href="/ja/catalog" className="text-neutral-600 hover:text-black transition-colors">
              製品カタログ
            </Link>
            <Link href="/ja/custom-rental" className="text-neutral-600 hover:text-black transition-colors">
              カスタム・レンタル
            </Link>
            <Link href="/ja/blog" className="text-neutral-600 hover:text-black transition-colors">
              ブログ
            </Link>
          </div>
        </div>

        {/* 検索ボックス */}
        <div className="mt-8 max-w-md mx-auto">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="サイト内を検索..."
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Button type="submit" size="sm">
              検索
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}
