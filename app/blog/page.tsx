"use client"

import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge, Caption } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { blogPosts, getPostsByCategory, getPostsByTag, getFeaturedPosts, getLatestPosts, searchPosts } from '../../lib/blog-data'
import { useState, useMemo } from 'react'



// カテゴリ一覧
const categories = ['すべて', 'デザイン', '技術', 'サービス', '品質管理']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // フィルタリングされた記事
  const filteredPosts = useMemo(() => {
    let posts = blogPosts

    // カテゴリフィルター
    if (selectedCategory !== 'すべて') {
      posts = posts.filter(post => post.category === selectedCategory)
    }

    // 検索クエリフィルター
    if (searchQuery) {
      posts = searchPosts(searchQuery)
    }

    // タグフィルター
    if (selectedTags.length > 0) {
      posts = posts.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      )
    }

    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [selectedCategory, searchQuery, selectedTags])

  // 全タグの取得
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  // タグの選択/解除
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // フィルターのリセット
  const resetFilters = () => {
    setSelectedCategory('すべて')
    setSearchQuery('')
    setSelectedTags([])
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Xiora Blog",
            "description": "Xioraのブログでは、デザイン哲学、技術情報、サービス活用方法など、様々なトピックについて詳しく解説しています。",
            "url": "https://xiora.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Xiora"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "author": {
                "@type": "Person",
                "name": post.author.name
              },
              "datePublished": post.publishedAt,
              "dateModified": post.updatedAt,
              "image": post.image,
              "url": `https://xiora.com/blog/${post.slug}`
            }))
          })
        }}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300">
          <Container>
            <div className="text-center">
              <H1 className="mb-6">Blog</H1>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                Xioraのブログでは、デザイン哲学、技術情報、サービス活用方法など、
                様々なトピックについて詳しく解説しています。
              </BodyLarge>
            </div>
          </Container>
        </Section>

        {/* フィルターセクション */}
        <Section className="py-12 bg-bg">
          <Container>
            <div className="space-y-6">
              {/* 検索バー */}
              <div className="max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="記事を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* カテゴリフィルター */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="min-w-[100px]"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* タグフィルター */}
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="min-w-[80px]"
                  >
                    {tag}
                  </Button>
                ))}
              </div>

              {/* フィルターリセット */}
              {(selectedCategory !== 'すべて' || searchQuery || selectedTags.length > 0) && (
                <div className="text-center">
                  <Button variant="secondary" size="sm" onClick={resetFilters}>
                    フィルターをリセット
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* 注目記事セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">注目記事</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                編集部が厳選した注目の記事をご紹介します
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFeaturedPosts().map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300">
                    <div className="text-center text-fg-muted p-8">
                      <div className="text-4xl mb-4">📝</div>
                      <p className="text-sm">{post.title}</p>
                    </div>
                    {post.featured && (
                      <Badge variant="primary" className="absolute top-4 left-4">
                        注目
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <Caption className="text-fg-muted">
                        {post.readTime}分で読める
                      </Caption>
                    </div>
                    <H3 className="mb-3 line-clamp-2">{post.title}</H3>
                    <Body className="text-fg-muted mb-4 line-clamp-3">
                      {post.excerpt}
                    </Body>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center text-xs">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                          <Caption className="text-fg-muted">
                            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                          </Caption>
                        </div>
                      </div>
                      <Button variant="primary" size="sm" asChild>
                        <a href={`/blog/${post.slug}`}>読む</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 記事一覧セクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">記事一覧</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                {filteredPosts.length}件の記事が見つかりました
              </BodyLarge>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300">
                      <div className="text-center text-fg-muted p-8">
                        <div className="text-4xl mb-4">📝</div>
                        <p className="text-sm">{post.title}</p>
                      </div>
                      {post.featured && (
                        <Badge variant="primary" className="absolute top-4 left-4">
                          注目
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <Caption className="text-fg-muted">
                          {post.readTime}分で読める
                        </Caption>
                      </div>
                      <H3 className="mb-3 line-clamp-2">{post.title}</H3>
                      <Body className="text-fg-muted mb-4 line-clamp-3">
                        {post.excerpt}
                      </Body>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center text-xs">
                            {post.author.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <Caption className="text-fg-muted">
                              {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                            </Caption>
                          </div>
                        </div>
                        <Button variant="primary" size="sm" asChild>
                          <a href={`/blog/${post.slug}`}>読む</a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <H3 className="mb-4">記事が見つかりません</H3>
                <Body className="text-fg-muted mb-8">
                  検索条件に一致する記事がありませんでした。
                  フィルターを調整して再度お試しください。
                </Body>
                <Button variant="primary" onClick={resetFilters}>
                  フィルターをリセット
                </Button>
              </div>
            )}
          </Container>
        </Section>

        {/* CTAセクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center">
              <H2 className="mb-6">ブログの更新情報を受け取る</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted mb-8">
                新しい記事の公開や、注目のトピックについてお知らせします。
                お気軽にご登録ください。
              </BodyLarge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="メールアドレスを入力"
                  className="flex-1"
                />
                <Button variant="primary">
                  登録する
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}
