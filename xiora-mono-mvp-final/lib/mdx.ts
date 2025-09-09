import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

// MDXファイルの型定義
export interface MDXMeta {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category: string
  image?: string
  featured?: boolean
  draft?: boolean
  slug: string
  locale: string
}

export interface MDXContent {
  meta: MDXMeta
  content: string
}

// MDXファイルのディレクトリパス
const MDX_DIR = path.join(process.cwd(), 'content')

// 指定されたディレクトリからMDXファイルを取得
export async function getMDXFiles(dir: string): Promise<string[]> {
  const fullPath = path.join(MDX_DIR, dir)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const files = fs.readdirSync(fullPath)
  return files.filter(file => file.endsWith('.mdx'))
}

// MDXファイルのメタデータを取得
export async function getMDXMeta(filePath: string): Promise<MDXMeta> {
  const fullPath = path.join(MDX_DIR, filePath)
  
  if (!fs.existsSync(fullPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContent)
  
  return {
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Xiora Team',
    tags: data.tags || [],
    category: data.category || 'general',
    image: data.image,
    featured: data.featured || false,
    draft: data.draft || false,
    slug: path.basename(filePath, '.mdx'),
    locale: data.locale || 'ja',
  }
}

// 指定されたディレクトリの全MDXファイルのメタデータを取得
export async function getAllMDXMeta(dir: string, locale?: string): Promise<MDXMeta[]> {
  const files = await getMDXFiles(dir)
  const metas = await Promise.all(
    files.map(async (file) => {
      const meta = await getMDXMeta(path.join(dir, file))
      if (locale && meta.locale !== locale) return null
      return meta
    })
  )
  
  return metas.filter(Boolean) as MDXMeta[]
}

// MDXファイルの内容を取得
export async function getMDXContent(filePath: string): Promise<MDXContent> {
  const fullPath = path.join(MDX_DIR, filePath)
  
  if (!fs.existsSync(fullPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return {
    meta: {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Xiora Team',
      tags: data.tags || [],
      category: data.category || 'general',
      image: data.image,
      featured: data.featured || false,
      draft: data.draft || false,
      slug: path.basename(filePath, '.mdx'),
      locale: data.locale || 'ja',
    },
    content,
  }
}

// MDXファイルをコンパイル
export async function compileMDXContent(content: string, options?: any) {
  try {
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        ...options,
      },
    })
    
    return compiledContent
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw new Error('Failed to compile MDX content')
  }
}

// タグ別のMDXファイルを取得
export async function getMDXByTag(dir: string, tag: string, locale?: string): Promise<MDXMeta[]> {
  const allMeta = await getAllMDXMeta(dir, locale)
  return allMeta.filter(meta => meta.tags.includes(tag))
}

// カテゴリ別のMDXファイルを取得
export async function getMDXByCategory(dir: string, category: string, locale?: string): Promise<MDXMeta[]> {
  const allMeta = await getAllMDXMeta(dir, locale)
  return allMeta.filter(meta => meta.category === category)
}

// フィーチャー記事を取得
export async function getFeaturedMDX(dir: string, locale?: string): Promise<MDXMeta[]> {
  const allMeta = await getAllMDXMeta(dir, locale)
  return allMeta.filter(meta => meta.featured && !meta.draft)
}

// 最新のMDXファイルを取得
export async function getLatestMDX(dir: string, limit: number = 5, locale?: string): Promise<MDXMeta[]> {
  const allMeta = await getAllMDXMeta(dir, locale)
  const publishedMeta = allMeta.filter(meta => !meta.draft)
  
  return publishedMeta
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// 検索機能
export async function searchMDX(dir: string, query: string, locale?: string): Promise<MDXMeta[]> {
  const allMeta = await getAllMDXMeta(dir, locale)
  const publishedMeta = allMeta.filter(meta => !meta.draft)
  
  if (!query) return publishedMeta
  
  const searchTerms = query.toLowerCase().split(' ')
  
  return publishedMeta.filter(meta => {
    const searchableText = [
      meta.title,
      meta.description,
      meta.author,
      ...meta.tags,
      meta.category
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  })
}
