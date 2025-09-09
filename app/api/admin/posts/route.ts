import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabase-server'

/**
 * ブログ記事一覧の取得
 * GET /api/admin/posts
 */
export async function GET() {
  try {
    const posts = await sbAdmin('xiora_blog_posts?select=*&order=created_at.desc')
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

/**
 * 新規ブログ記事の作成
 * POST /api/admin/posts
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // 必須フィールドの検証
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }
    
    // 作成日時を追加
    const postData = {
      ...body,
      status: body.status || 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: body.status === 'published' ? new Date().toISOString() : null
    }
    
    const result = await sbAdmin('xiora_blog_posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
