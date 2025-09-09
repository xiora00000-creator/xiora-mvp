import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * 特定ブログ記事の取得
 * GET /api/admin/posts/[slug]
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await sbAdmin(`xiora_blog_posts?slug=eq.${params.slug}&select=*`)
    return NextResponse.json(post?.[0] || null)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

/**
 * ブログ記事の更新
 * PUT /api/admin/posts/[slug]
 */
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    
    // 更新日時を追加
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
      published_at: body.status === 'published' ? new Date().toISOString() : body.published_at
    }
    
    const result = await sbAdmin(`xiora_blog_posts?slug=eq.${params.slug}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

/**
 * ブログ記事の削除
 * DELETE /api/admin/posts/[slug]
 */
export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  try {
    await sbAdmin(`xiora_blog_posts?slug=eq.${params.slug}`, {
      method: 'DELETE'
    })
    
    return NextResponse.json({ ok: true, message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
