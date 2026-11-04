import type { Metadata, Viewport } from 'next'
import { Nanum_Gothic } from 'next/font/google'
import FloatingCTA from '@/components/layout/FloatingCTA'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

const font = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  // 한글 글꼴은 파일이 많아 미리 받으면 첫 화면이 크게 늦어집니다.
  preload: false,
})

const description = '전문 치료사와 함께하는 맞춤 아동발달 프로그램으로 우리 아이의 건강한 성장을 지원합니다.'

// 공유 미리보기 이미지는 전체 주소가 필요해 도메인을 정한 뒤에만 넣습니다.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  // 임시 미리보기는 검색에 노출되지 않게 합니다.
  ...(process.env.NEXT_PUBLIC_NOINDEX === 'true' ? { robots: { index: false, follow: false } } : {}),
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: '플러스 아동발달센터',
    template: '%s | 플러스 아동발달센터',
  },
  description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '플러스 아동발달센터',
    title: '플러스 아동발달센터',
    description,
    ...(siteUrl
      ? {
          url: '/',
          images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: '플러스 아동발달센터 건물과 안내 문구' }],
        }
      : {}),
  },
}

export const viewport: Viewport = {
  themeColor: '#2f5496',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${font.className} flex min-h-screen flex-col bg-cream text-ink antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-60 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-primary focus:shadow-lg"
        >
          본문 바로가기
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 outline-hidden">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
