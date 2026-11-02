import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "플러스 아동발달센터",
    template: "%s | 플러스 아동발달센터",
  },
  description:
    "전문 치료사와 함께하는 1:1 맞춤 아동발달 프로그램으로 우리 아이의 건강한 성장을 지원합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${noto.className} flex min-h-screen flex-col bg-cream text-ink antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
