import Image from 'next/image'
import { H1, H2, H3, Body, BodyLarge, Caption } from './Typography'
import { Card } from './Card'
import { Badge } from './Badge'

// MDXコンポーネントの型定義
interface MDXComponentsProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

// 見出しコンポーネント
export const MDXHeading1 = ({ children, ...props }: MDXComponentsProps) => (
  <H1 className="mt-12 mb-6 first:mt-0" {...props}>
    {children}
  </H1>
)

export const MDXHeading2 = ({ children, ...props }: MDXComponentsProps) => (
  <H2 className="mt-10 mb-4 first:mt-0" {...props}>
    {children}
  </H2>
)

export const MDXHeading3 = ({ children, ...props }: MDXComponentsProps) => (
  <H3 className="mt-8 mb-3 first:mt-0" {...props}>
    {children}
  </H3>
)

export const MDXHeading4 = ({ children, ...props }: MDXComponentsProps) => (
  <H3 className="mt-6 mb-2 first:mt-0 text-lg" {...props}>
    {children}
  </H3>
)

// 段落コンポーネント
export const MDXParagraph = ({ children, ...props }: MDXComponentsProps) => (
  <Body className="mb-6 leading-relaxed" {...props}>
    {children}
  </Body>
)

// リストコンポーネント
export const MDXUnorderedList = ({ children, ...props }: MDXComponentsProps) => (
  <ul className="mb-6 ml-6 space-y-2 list-disc" {...props}>
    {children}
  </ul>
)

export const MDXOrderedList = ({ children, ...props }: MDXComponentsProps) => (
  <ol className="mb-6 ml-6 space-y-2 list-decimal" {...props}>
    {children}
  </ol>
)

export const MDXListItem = ({ children, ...props }: MDXComponentsProps) => (
  <li className="leading-relaxed" {...props}>
    {children}
  </li>
)

// 引用コンポーネント
export const MDXBlockquote = ({ children, ...props }: MDXComponentsProps) => (
  <Card className="p-6 my-8 border-l-4 border-fg bg-bg-secondary" {...props}>
    <blockquote className="relative">
      <div className="text-4xl text-fg-muted absolute -top-2 -left-2">"</div>
      <div className="pl-6">
        <BodyLarge className="italic text-fg-muted mb-2">
          {children}
        </BodyLarge>
      </div>
    </blockquote>
  </Card>
)

// 画像コンポーネント（キャプション付き）
export const MDXImage = ({ src, alt, caption, ...props }: MDXComponentsProps & { src: string; alt?: string; caption?: string }) => (
  <div className="my-8">
    <div className="relative aspect-[16/9] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt || ''}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority={false}
        {...props}
      />
    </div>
    {caption && (
      <Caption className="mt-3 text-center text-fg-muted italic">
        {caption}
      </Caption>
    )}
  </div>
)

// コードブロックコンポーネント
export const MDXCodeBlock = ({ children, ...props }: MDXComponentsProps) => (
  <Card className="p-4 my-6 bg-bg-secondary border border-line" {...props}>
    <pre className="overflow-x-auto">
      <code className="text-sm font-mono text-fg">
        {children}
      </code>
    </pre>
  </Card>
)

export const MDXInlineCode = ({ children, ...props }: MDXComponentsProps) => (
  <code className="px-2 py-1 text-sm font-mono bg-bg-secondary border border-line rounded" {...props}>
    {children}
  </code>
)

// リンクコンポーネント
export const MDXLink = ({ href, children, ...props }: MDXComponentsProps & { href: string }) => (
  <a
    href={href}
    className="text-fg underline hover:text-fg-secondary transition-colors duration-150"
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    {...props}
  >
    {children}
  </a>
)

// テーブルコンポーネント
export const MDXTable = ({ children, ...props }: MDXComponentsProps) => (
  <div className="my-8 overflow-x-auto">
    <table className="w-full border-collapse border border-line" {...props}>
      {children}
    </table>
  </div>
)

export const MDXTableHead = ({ children, ...props }: MDXComponentsProps) => (
  <thead className="bg-bg-secondary" {...props}>
    {children}
  </thead>
)

export const MDXTableBody = ({ children, ...props }: MDXComponentsProps) => (
  <tbody {...props}>
    {children}
  </tbody>
)

export const MDXTableRow = ({ children, ...props }: MDXComponentsProps) => (
  <tr className="border-b border-line hover:bg-bg-secondary transition-colors duration-150" {...props}>
    {children}
  </tr>
)

export const MDXTableCell = ({ children, ...props }: MDXComponentsProps) => (
  <td className="px-4 py-3 text-left" {...props}>
    {children}
  </td>
)

export const MDXTableHeader = ({ children, ...props }: MDXComponentsProps) => (
  <th className="px-4 py-3 text-left font-bold border-b border-line" {...props}>
    {children}
  </th>
)

// 水平線コンポーネント
export const MDXHorizontalRule = ({ ...props }: MDXComponentsProps) => (
  <hr className="my-8 border-t border-line" {...props} />
)

// 強調コンポーネント
export const MDXStrong = ({ children, ...props }: MDXComponentsProps) => (
  <strong className="font-bold text-fg" {...props}>
    {children}
  </strong>
)

export const MDXEmphasis = ({ children, ...props }: MDXComponentsProps) => (
  <em className="italic text-fg-muted" {...props}>
    {children}
  </em>
)

// 目次コンポーネント
export const MDXTableOfContents = ({ headings }: { headings: Array<{ id: string; text: string; level: number }> }) => (
  <Card className="p-6 my-8 bg-bg-secondary border border-line">
    <H3 className="mb-4">目次</H3>
    <nav>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-fg-muted hover:text-fg transition-colors duration-150 ${
                heading.level === 1 ? 'font-bold' : heading.level === 2 ? 'ml-4' : 'ml-8'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </Card>
)
