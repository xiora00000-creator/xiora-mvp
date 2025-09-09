import Link from 'next/link'

async function getData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const res = await fetch(`${base}/api/admin/equipments`, { cache: 'no-store' })
  return res.json()
}

export default async function Page() {
  const items = await getData()
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Equipments</h1>
        <Link href="/admin/equipments/new" className="rounded-2xl border border-neutral-700 px-4 py-2">
          New
        </Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400">
            <th>slug</th>
            <th>name</th>
            <th>type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((it: any) => (
            <tr key={it.slug} className="border-t border-neutral-800">
              <td className="py-2">{it.slug}</td>
              <td>{it.name}</td>
              <td>{it.type || '-'}</td>
              <td>
                <Link href={`/admin/equipments/${it.slug}`} className="text-neutral-300 underline">
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
