'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const r = useRouter()

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/posts/${params.slug}`)
      setData(await res.json())
    })()
  }, [params.slug])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(e.currentTarget).entries())
    const res = await fetch(`/api/admin/posts/${params.slug}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body) 
    })
    if (res.ok) r.push('/admin/posts')
  }
  
  async function onDelete() {
    if (!confirm('削除しますか？')) return
    const res = await fetch(`/api/admin/posts/${params.slug}`, { method: 'DELETE' })
    if (res.ok) r.push('/admin/posts')
  }

  if (!data) return <div>Loading...</div>
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Edit Post</h1>
      <input 
        name="slug" 
        defaultValue={data.slug} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="title" 
        defaultValue={data.title} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <textarea 
        name="content" 
        defaultValue={data.content || ''} 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3 h-32" 
        required 
      />
      <select 
        name="status" 
        defaultValue={data.status || 'draft'}
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
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
