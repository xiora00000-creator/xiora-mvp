import Link from 'next/link'

async function getData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const res = await fetch(`${base}/api/admin/rental-items`, { cache: 'no-store' })
  return res.json()
}

export default async function Page() {
  const items = await getData()
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Rental Items</h1>
        <Link href="/admin/rental-items/new" className="rounded-2xl border border-neutral-700 px-4 py-2">
          New
        </Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400">
            <th>slug</th>
            <th>name</th>
            <th>daily_rate</th>
            <th>availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((it: any) => (
            <tr key={it.slug} className="border-t border-neutral-800">
              <td className="py-2">{it.slug}</td>
              <td>{it.name}</td>
              <td>¥{it.daily_rate?.toLocaleString()}</td>
              <td>{it.availability_status}</td>
              <td>
                <Link href={`/admin/rental-items/${it.slug}`} className="text-neutral-300 underline">
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
