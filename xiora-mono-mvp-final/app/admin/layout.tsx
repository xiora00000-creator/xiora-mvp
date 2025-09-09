export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        <header className="border-b border-neutral-800">
          <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between">
            <div className="font-semibold tracking-widest">Xiora Admin</div>
            <nav className="flex gap-4 text-sm text-neutral-300">
              <a href="/admin">Dashboard</a>
              <a href="/admin/categories">Categories</a>
              <a href="/admin/products">Products</a>
              <a href="/admin/equipments">Equipments</a>
              <a href="/admin/posts">Posts</a>
              <a href="/admin/rental-items">Rental Items</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
