import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { PHONE, TEL_HREF } from '@/lib/constants'

export default function QuickConsult() {
  return (
    <section className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center">
        <div>
          <h2 className="text-2xl font-semibold">우리 아이 발달이 걱정되시나요?</h2>
          <p className="mt-3">초기 상담은 무료입니다. 이용 절차와 비용도 미리 확인해 보세요.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/consult">상담·비용 안내</Button>
          <Button href={TEL_HREF} variant="secondary">
            <Phone className="h-5 w-5" />
            {PHONE}
          </Button>
        </div>
      </div>
    </section>
  )
}
