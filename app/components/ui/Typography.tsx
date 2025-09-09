import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Typographyコンポーネントのプロパティ
 */
interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Typographyコンポーネント
 * サーバーコンポーネント化されたタイポグラフィ
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn('font-display font-bold text-fg', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Displayコンポーネント
 */
export const Display: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h1" className="text-5xl sm:text-6xl leading-tight" {...props} />
)

/**
 * DisplayLargeコンポーネント
 */
export const DisplayLarge: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h1" className="text-6xl sm:text-7xl leading-tight" {...props} />
)

/**
 * DisplayXLargeコンポーネント
 */
export const DisplayXLarge: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h1" className="text-7xl sm:text-8xl leading-tight" {...props} />
)

/**
 * H1コンポーネント
 */
export const H1: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h1" className="text-4xl sm:text-5xl leading-tight" {...props} />
)

/**
 * H2コンポーネント
 */
export const H2: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h2" className="text-3xl sm:text-4xl leading-tight" {...props} />
)

/**
 * H3コンポーネント
 */
export const H3: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="h3" className="text-2xl sm:text-3xl leading-tight" {...props} />
)

/**
 * Bodyコンポーネント
 */
export const Body: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="p" className="text-base sm:text-lg leading-relaxed font-sans font-normal" {...props} />
)

/**
 * BodyLargeコンポーネント
 */
export const BodyLarge: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="p" className="text-lg sm:text-xl leading-relaxed font-sans font-normal" {...props} />
)

/**
 * Captionコンポーネント
 */
export const Caption: React.FC<Omit<TypographyProps, 'as'>> = (props) => (
  <Typography as="p" className="text-sm leading-relaxed font-sans font-normal" {...props} />
)
