'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const r = useRouter()
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    const ok = await fetch('/api/admin/equipments', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    })
    if (ok) r.push('/admin/equipments')
  }
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">New Equipment</h1>
      <input 
        name="slug" 
        placeholder="slug" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="name" 
        placeholder="name" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="type" 
        placeholder="type (optional)" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <textarea 
        name="description" 
        placeholder="description (optional)" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <button className="rounded-2xl border px-4 py-2">Create</button>
    </form>
  )
}
