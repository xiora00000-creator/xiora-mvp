import { Container } from './components/ui/Container'
import { Skeleton } from './components/ui/Skeleton'

export default function Loading() {
  return (
    <Container className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー部分のスケルトン */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-80 mx-auto mb-4" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* メインコンテンツのスケルトン */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>

        {/* ボタンのスケルトン */}
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </Container>
  )
}
