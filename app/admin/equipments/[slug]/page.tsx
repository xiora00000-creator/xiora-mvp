'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const r = useRouter()

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/equipments/${params.slug}`)
      setData(await res.json())
    })()
  }, [params.slug])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(e.currentTarget).entries())
    const res = await fetch(`/api/admin/equipments/${params.slug}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body) 
    })
    if (res.ok) r.push('/admin/equipments')
  }
  
  async function onDelete() {
    if (!confirm('削除しますか？')) return
    const res = await fetch(`/api/admin/equipments/${params.slug}`, { method: 'DELETE' })
    if (res.ok) r.push('/admin/equipments')
  }

  if (!data) return <div>Loading...</div>
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Edit Equipment</h1>
      <input 
        name="slug" 
        defaultValue={data.slug} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="name" 
        defaultValue={data.name} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="type" 
        defaultValue={data.type || ''} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <textarea 
        name="description" 
        defaultValue={data.description || ''} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <div className="flex gap-2">
        <button className="rounded-2xl border px-4 py-2">Update</button>
        <button 
          type="button" 
          onClick={onDelete} 
          className="rounded-2xl border border-red-500 text-red-400 px-4 py-2"
        >
          Delete
        </button>
      </div>
    </form>
  )
}
