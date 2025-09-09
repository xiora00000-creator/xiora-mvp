import type { Metadata } from 'next'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { H1, H2, H3, Body, BodyLarge } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'
import { Divider } from '../components/ui/Divider'
import { Hero } from '../components/ui/Hero'

export const metadata: Metadata = {
  title: 'About | Xiora - 宇宙とミニマリズムの融合',
  description: 'Xioraのブランドストーリーと代表メッセージをご紹介します。宇宙の神秘とミニマリズムの美しさを融合させた、革新的なアプローチについて。',
  keywords: 'Xiora, ブランドストーリー, 代表メッセージ, 宇宙, ミニマリズム, ビジョン',
  openGraph: {
    title: 'About | Xiora - 宇宙とミニマリズムの融合',
    description: 'Xioraのブランドストーリーと代表メッセージをご紹介します。宇宙の神秘とミニマリズムの美しさを融合させた、革新的なアプローチについて。',
    type: 'website',
    url: 'https://xiora.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Xiora About - 宇宙とミニマリズムの融合'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Xiora - 宇宙とミニマリズムの融合',
    description: 'Xioraのブランドストーリーと代表メッセージをご紹介します。',
    images: ['/og-about.jpg']
  }
}

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About | Xiora",
            "description": "Xioraのブランドストーリーと代表メッセージをご紹介します。",
            "url": "https://xiora.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Xiora",
              "description": "宇宙とミニマリズムを融合させた革新的なアプローチを提供する企業",
              "founder": {
                "@type": "Person",
                "name": "代表取締役",
                "jobTitle": "CEO"
              }
            }
          })
        }}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Hero
          title="About Xiora"
          subtitle="宇宙とミニマリズムの融合"
          description="無限の可能性を秘めた宇宙の神秘と、本質を見極めるミニマリズムの美しさ。この一見相反する要素を融合させ、革新的なソリューションを創造します。"
          background="gradient"
          size="lg"
        />

        {/* ブランドストーリーセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">ブランドストーリー</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                私たちの物語は、宇宙への憧れとミニマリズムへの深い理解から始まりました
              </BodyLarge>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <H3>宇宙への憧れ</H3>
                <Body>
                  人類が初めて宇宙を見上げた瞬間から、私たちは無限の可能性を感じてきました。
                  星々の輝き、銀河の壮大さ、そして未知なる世界への探求心。
                  これらは私たちの創造性の源となり、常に新しい視点を提供し続けています。
                </Body>
                <Body>
                  宇宙は複雑さと秩序、混沌と調和を同時に表現しています。
                  この矛盾する要素の共存が、私たちのアプローチの基盤となっています。
                </Body>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-fg-muted">
                    <div className="text-6xl mb-4">🌌</div>
                    <p className="text-sm">宇宙の神秘</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ミニマリズムの哲学セクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-fg-muted">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-sm">ミニマリズムの美</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <H3>ミニマリズムの哲学</H3>
                <Body>
                  真の美しさは、不必要なものを取り除いた先に存在します。
                  ミニマリズムは単なるデザイン手法ではなく、本質を見極める思考法です。
                </Body>
                <Body>
                  複雑な問題をシンプルな解決策に落とし込み、
                  ユーザーにとって本当に価値のあるものを提供する。
                  これが私たちの使命です。
                </Body>
                <Body>
                  宇宙の複雑さを理解し、それを人間が理解できる形に整理する。
                  このプロセスこそが、私たちの創造性の核心です。
                </Body>
              </div>
            </div>
          </Container>
        </Section>

        {/* 融合のアプローチセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">融合のアプローチ</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                宇宙の神秘とミニマリズムの美しさを融合させ、革新的なソリューションを創造します
              </BodyLarge>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🔍</div>
                <H3 className="mb-4">本質の探求</H3>
                <Body>
                  複雑な問題の核心を見極め、本当に必要な要素を特定します。
                  宇宙の神秘を理解するように、問題の本質を深く探求します。
                </Body>
              </Card>

              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🎨</div>
                <H3 className="mb-4">美しい表現</H3>
                <Body>
                  本質を美しく表現し、ユーザーにとって理解しやすい形に整理します。
                  ミニマリズムの美学を活かした、洗練されたデザインを追求します。
                </Body>
              </Card>

              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🚀</div>
                <H3 className="mb-4">革新的な実装</H3>
                <Body>
                  理論と実践を融合させ、革新的なソリューションを実現します。
                  宇宙への探求心を持って、常に新しい可能性を追求します。
                </Body>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 代表メッセージセクション */}
        <Section className="py-20 bg-bg-secondary">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">代表メッセージ</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                私たちのビジョンとミッションについて、代表からのメッセージをお届けします
              </BodyLarge>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-12 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full mx-auto flex items-center justify-center text-3xl">
                    👨‍💼
                  </div>
                </div>
                
                <H3 className="mb-6">代表取締役 CEO</H3>
                
                <div className="space-y-6 text-left">
                  <Body>
                    私たちXioraは、宇宙の神秘とミニマリズムの美しさを融合させた、
                    革新的なアプローチで社会に貢献することを目指しています。
                  </Body>
                  
                  <Body>
                    現代社会は複雑さを増し、多くの人々が情報の海の中で迷子になっています。
                    しかし、宇宙を見上げれば、複雑さの中にも美しい秩序が存在することがわかります。
                    私たちは、この宇宙の知恵を活かし、複雑な問題をシンプルで美しい形に整理することを使命としています。
                  </Body>
                  
                  <Body>
                    ミニマリズムは、不必要なものを取り除くことで本質を見極める哲学です。
                    これは、宇宙の複雑さを理解し、それを人間が理解できる形に整理するプロセスと通じるものがあります。
                    私たちは、この哲学に基づいて、ユーザーにとって本当に価値のあるものを提供し続けます。
                  </Body>
                  
                  <Body>
                    未来への探求は、宇宙への探求と同じように果てしなく続きます。
                    私たちは、この探求の旅路で、常に新しい可能性を追求し、
                    社会に貢献できる革新的なソリューションを創造し続けます。
                  </Body>
                  
                  <Body>
                    皆様と共に、より美しく、より理解しやすい世界を築いていきたいと思います。
                    これからも、宇宙の神秘とミニマリズムの美しさを融合させた、
                    私たちならではのアプローチで、社会に貢献してまいります。
                  </Body>
                </div>
                
                <Divider className="my-8" />
                
                <div className="text-right">
                  <Body className="font-display">
                    代表取締役 CEO<br />
                    <span className="text-fg-muted">Xiora Inc.</span>
                  </Body>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* ビジョンセクション */}
        <Section className="py-20 bg-bg">
          <Container>
            <div className="text-center mb-16">
              <H2 className="mb-6">私たちのビジョン</H2>
              <BodyLarge className="max-w-3xl mx-auto text-fg-muted">
                宇宙の神秘とミニマリズムの美しさを融合させ、より良い世界を創造する
              </BodyLarge>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <H3>未来への展望</H3>
                <Body>
                  私たちは、技術の進歩と人間の創造性が融合する未来を目指しています。
                  宇宙への探求が続くように、私たちの探求も終わることはありません。
                </Body>
                <Body>
                  複雑さを増す現代社会において、私たちのアプローチはますます重要になっています。
                  本質を見極め、美しく表現し、革新的に実装する。
                  この循環が、社会の進歩を支える原動力となります。
                </Body>
                <Body>
                  皆様と共に、より美しく、より理解しやすい世界を築いていきたいと思います。
                  これからも、宇宙の神秘とミニマリズムの美しさを融合させた、
                  私たちならではのアプローチで、社会に貢献してまいります。
                </Body>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-fg-muted">
                    <div className="text-6xl mb-4">🌟</div>
                    <p className="text-sm">未来への展望</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}
