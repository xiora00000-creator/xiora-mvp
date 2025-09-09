import Link from 'next/link'

async function getData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const res = await fetch(`${base}/api/admin/posts`, { cache: 'no-store' })
  return res.json()
}

export default async function Page() {
  const items = await getData()
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded-2xl border border-neutral-700 px-4 py-2">
          New
        </Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400">
            <th>slug</th>
            <th>title</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((it: any) => (
            <tr key={it.slug} className="border-t border-neutral-800">
              <td className="py-2">{it.slug}</td>
              <td>{it.title}</td>
              <td>{it.status || 'draft'}</td>
              <td>
                <Link href={`/admin/posts/${it.slug}`} className="text-neutral-300 underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
