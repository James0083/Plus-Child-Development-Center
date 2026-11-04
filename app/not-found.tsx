import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import { PHONE, TEL_HREF } from '@/lib/constants'

export const metadata: Metadata = { title: '페이지를 찾을 수 없습니다' }

export default function NotFound() {
  return (
    <Section width="sm" className="text-center">
      <h1 className="text-2xl font-extrabold lg:text-3xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4">주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 필요한 안내를 찾아보세요.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">메인으로 가기</Button>
        <Button href={TEL_HREF} variant="outline">
          <Phone className="h-5 w-5" />
          {PHONE}
        </Button>
      </div>
    </Section>
  )
}
