import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { TEL_HREF } from '@/lib/constants'

export default function QuickConsult() {
  return (
    <section className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center">
        <div>
          <h2 className="text-2xl font-semibold lg:text-3xl">우리 아이 발달이 걱정되시나요?</h2>
          <p className="mt-3">전문 치료사와의 상담으로 편하게 시작해 보세요.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/consult">상담 신청하기</Button>
          <Button href={TEL_HREF} variant="secondary">
            <Phone className="h-5 w-5" />
            전화 연결
          </Button>
        </div>
      </div>
    </section>
  )
}
