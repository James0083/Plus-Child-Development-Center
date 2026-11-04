import Link from 'next/link'
import { footerInfo } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-300">
      {/* 하단 여백: 페이지 끝에서 플로팅 버튼이 링크를 가리지 않게 합니다. */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 text-sm">
        <p className="text-lg font-semibold text-white">{footerInfo.name}</p>
        <dl className="mt-4 grid gap-1 md:grid-cols-2">
          <div>
            <dt className="inline">대표(센터장) </dt>
            <dd className="inline">{footerInfo.director}</dd>
          </div>
          <div>
            <dt className="inline">사업자등록번호 </dt>
            <dd className="inline">{footerInfo.bizNo}</dd>
          </div>
          <div>
            <dt className="inline">주소 </dt>
            <dd className="inline">
              {footerInfo.address} (지번: {footerInfo.addressLot})
            </dd>
          </div>
          <div>
            <dt className="inline">전화 </dt>
            <dd className="inline">{footerInfo.phone}</dd>
          </div>
          <div>
            <dt className="inline">이메일 </dt>
            <dd className="inline">{footerInfo.email}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/20 pt-6 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} 플러스 아동발달센터. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-semibold text-white hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-white hover:underline">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
