import type { Metadata } from 'next'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge, Caption } from '../../components/ui/Typography'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Divider } from '../../components/ui/Divider'
import { blogPosts, getLatestPosts } from '../../../lib/blog-data'
import { MDXTableOfContents } from '../../components/ui/MDXComponents'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: '記事が見つかりません | Xiora Blog',
      description: 'お探しの記事が見つかりませんでした。',
    }
  }

  return {
    title: `${post.title} | Xiora Blog`,
    description: post.description,
    keywords: [...post.tags, 'Xiora', 'ブログ', post.category].join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://xiora.com/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

  // 目次用の見出しを抽出
  const headings = extractHeadings(post.content)

  // 関連記事（同じカテゴリの最新記事）
  const relatedPosts = getLatestPosts(3).filter(p => 
    p.id !== post.id && p.category === post.category
  )

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "description": post.author.bio
            },
            "publisher": {
              "@type": "Organization",
              "name": "Xiora",
              "logo": {
                "@type": "ImageObject",
                "url": "https://xiora.com/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://xiora.com/blog/${post.slug}`
            },
            "articleSection": post.category,
            "keywords": post.tags.join(', ')
          })
        }}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* カテゴリとタグ */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="primary">{post.category}</Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* タイトル */}
              <H1 className="mb-6">{post.title}</H1>

              {/* 説明 */}
              <BodyLarge className="text-fg-muted mb-8">
                {post.description}
              </BodyLarge>

              {/* メタ情報 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <Caption className="text-fg-muted">{post.author.bio}</Caption>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-fg-muted">
                  <span>📅 {new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
                  <span>⏱️ {post.readTime}分で読める</span>
                  {post.updatedAt !== post.publishedAt && (
                    <span>🔄 更新: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}</span>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 記事本文セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* 目次サイドバー */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <MDXTableOfContents headings={headings} />
                  </div>
                </div>

                {/* 記事本文 */}
                <div className="lg:col-span-3">
                  <Card className="p-8">
                    {/* 記事の内容を表示 */}
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 関連記事セクション */}
        {relatedPosts.length > 0 && (
          <Section className="py-20 bg-bg-secondary">
            <Container>
              <div className="text-center mb-16">
                <H2 className="mb-6">関連記事</H2>
                <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                  同じカテゴリの記事も合わせてお読みください
                </BodyLarge>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300">
                      <div className="text-center text-fg-muted p-8">
                        <div className="text-4xl mb-4">📝</div>
                        <p className="text-sm">{relatedPost.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                        <Caption className="text-fg-muted">
                          {relatedPost.readTime}分で読める
                        </Caption>
                      </div>
                      <H3 className="mb-3 line-clamp-2">{relatedPost.title}</H3>
                      <Body className="text-fg-muted mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </Body>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center text-xs">
                            {relatedPost.author.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{relatedPost.author.name}</p>
                            <Caption className="text-fg-muted">
                              {new Date(relatedPost.publishedAt).toLocaleDateString('ja-JP')}
                            </Caption>
                          </div>
                        </div>
                        <Button variant="primary" size="sm" asChild>
                          <a href={`/blog/${relatedPost.slug}`}>読む</a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* CTAセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center">
              <H2 className="mb-6">この記事はいかがでしたか？</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted mb-8">
                ご質問やご意見がございましたら、お気軽にお問い合わせください。
                また、新しい記事の更新情報もお知らせします。
              </BodyLarge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <a href="/contact">お問い合わせ</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="/blog">他の記事を見る</a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}

// 見出しを抽出する関数
function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm
  const headings: Array<{ id: string; text: string; level: number }> = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    headings.push({ id, text, level })
  }
  
  return headings
}

// マークダウンをHTMLに変換する関数（簡易版）
function renderMarkdown(content: string): string {
  let html = content
  
  // 見出し
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-4 mt-8">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-6 mt-12">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 mt-16">$1</h1>')
  
  // 段落
  html = html.replace(/^(?!<[h|h])(.+)$/gim, '<p class="mb-4 leading-relaxed">$1</p>')
  
  // リスト
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 mb-2">$2</li>')
  
  // 強調
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
  
  // 引用
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-fg pl-6 my-6 italic text-fg-muted">$1</blockquote>')
  
  // コード
  html = html.replace(/`(.*?)`/g, '<code class="bg-bg-secondary px-2 py-1 rounded text-sm font-mono">$1</code>')
  
  // リンク
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-fg underline hover:text-fg-secondary">$1</a>')
  
  // 画像
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg my-6" />')
  
  // 水平線
  html = html.replace(/^---$/gim, '<hr class="my-8 border-t border-line" />')
  
  // テーブル（簡易版）
  html = html.replace(/^\|(.+)\|$/gim, '<tr>$1</tr>')
  html = html.replace(/^\|(.+)\|$/gim, '<table class="w-full border-collapse border border-line my-6"><tbody>$1</tbody></table>')
  
  return html
}
