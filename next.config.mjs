/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages에 정적 파일(out/)로 배포합니다. 서버 기능과 이미지 자동 최적화는 쓰지 않습니다.
  output: 'export',
  // GitHub Pages 미리보기처럼 하위 경로에 배포할 때만 씁니다.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: { unoptimized: true },
}

export default nextConfig
