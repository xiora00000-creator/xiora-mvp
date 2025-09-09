import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/**
 * サイトレイアウト
 * 次世代を作り繋げる企業 - Xiora
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  )
}
