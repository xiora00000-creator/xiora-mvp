'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const r = useRouter()
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    
    // 数値フィールドの変換
    const formData = {
      ...data,
      daily_rate: parseFloat(data.daily_rate as string),
      weekly_rate: data.weekly_rate ? parseFloat(data.weekly_rate as string) : null,
      monthly_rate: data.monthly_rate ? parseFloat(data.monthly_rate as string) : null,
      deposit_amount: parseFloat(data.deposit_amount as string) || 0
    }
    
    const ok = await fetch('/api/admin/rental-items', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(formData) 
    })
    if (ok) r.push('/admin/rental-items')
  }
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">New Rental Item</h1>
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
      <textarea 
        name="description" 
        placeholder="description (optional)" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <input 
        name="daily_rate" 
        type="number" 
        step="0.01" 
        placeholder="daily_rate" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
        required 
      />
      <input 
        name="weekly_rate" 
        type="number" 
        step="0.01" 
        placeholder="weekly_rate (optional)" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <input 
        name="monthly_rate" 
        type="number" 
        step="0.01" 
        placeholder="monthly_rate (optional)" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <input 
        name="deposit_amount" 
        type="number" 
        step="0.01" 
        placeholder="deposit_amount" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3" 
      />
      <select 
        name="availability_status" 
        className="w-full rounded-2xl border border-neutral-700 bg-transparent px-4 py-3"
      >
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
        <option value="maintenance">Maintenance</option>
      </select>
      <button className="rounded-2xl border px-4 py-2">Create</button>
    </form>
  )
}
