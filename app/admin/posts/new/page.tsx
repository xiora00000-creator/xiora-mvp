'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const r = useRouter()
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    const ok = await fetch('/api/admin/posts', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    })
    if (ok) r.push('/admin/posts')
  }
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">New Post</h1>
      <input 
        name="slug" 
        placeholder="slug" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="title" 
        placeholder="title" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <textarea 
        name="content" 
        placeholder="content" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3 h-32" 
        required 
      />
      <select 
        name="status" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button className="rounded-2xl border px-4 py-2">Create</button>
    </form>
  )
}
