/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages에 정적 파일(out/)로 배포합니다. 서버 기능과 이미지 자동 최적화는 쓰지 않습니다.
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
