import { Metadata } from 'next'
import { Container } from '../components/ui/Container'
import { H1, H2, Body, Caption } from '../components/ui/Typography'
import { Button } from '../components/ui/Button'
import Link from 'next/link'
import { AdminStats } from './components/AdminStats'
import { RecentActivities } from './components/RecentActivities'

export const metadata: Metadata = {
  title: '管理者ダッシュボード',
  description: 'Xiora管理者専用ダッシュボード',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboard() {
  return (
    <Container className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <H1 className="mb-4">管理者ダッシュボード</H1>
          <Body className="text-neutral-600">
            システムの管理と監視を行うための専用ページです。
          </Body>
        </div>

        {/* 統計カード */}
        <AdminStats />

        {/* 管理セクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ユーザー管理 */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <H2 className="mb-4">ユーザー管理</H2>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/admin/users">
                  ユーザー一覧
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/admin/users/create">
                  新規ユーザー作成
                </Link>
              </Button>
            </div>
          </div>

          {/* 商品管理 */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <H2 className="mb-4">商品管理</H2>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/admin/products">
                  商品一覧
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/admin/products/create">
                  新規商品作成
                </Link>
              </Button>
            </div>
          </div>

          {/* コンテンツ管理 */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <H2 className="mb-4">コンテンツ管理</H2>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/admin/blog">
                  ブログ記事管理
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/admin/categories">
                  カテゴリ管理
                </Link>
              </Button>
            </div>
          </div>

          {/* システム設定 */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <H2 className="mb-4">システム設定</H2>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/admin/settings">
                  一般設定
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/admin/analytics">
                  アナリティクス
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 最近のアクティビティ */}
        <RecentActivities />

        {/* クイックアクション */}
        <div className="mt-8 bg-neutral-50 p-6 rounded-lg">
          <H2 className="mb-4">クイックアクション</H2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="sm">
              システムバックアップ
            </Button>
            <Button variant="secondary" size="sm">
              ログ確認
            </Button>
            <Button variant="secondary" size="sm">
              パフォーマンス監視
            </Button>
            <Button variant="secondary" size="sm">
              セキュリティチェック
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
