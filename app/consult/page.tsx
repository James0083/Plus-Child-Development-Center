import { MessageCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import ConsultForm from '@/components/consult/ConsultForm'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { consultSteps, faqs } from '@/data/consult'
import { centerInfo, CONSULT_FORM_ENABLED, KAKAO_CHANNEL_NAME, TEL_HREF } from '@/lib/constants'

export const metadata: Metadata = { title: '상담 신청' }

export default function ConsultPage() {
  const { regular, sunday } = centerInfo.hours

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <SectionTitle as="h1" title="상담 신청" description="편한 방법으로 문의해 주세요." />

      <div className="mb-10 rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
        <p className="text-2xl font-semibold text-primary-dark">{centerInfo.phone}</p>
        <p className="mt-2 text-sm font-light text-muted">
          {regular} / {sunday}
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 md:flex-row">
          <Button href={TEL_HREF}>
            <Phone className="h-5 w-5" />
            전화 연결
          </Button>
          {centerInfo.kakao && (
            <Button href={centerInfo.kakao} variant="outline">
              <MessageCircle className="h-5 w-5" />
              카카오 채널 상담
            </Button>
          )}
        </div>
        {!centerInfo.kakao && (
          <p className="mt-4 text-sm">카카오톡에서 &apos;{KAKAO_CHANNEL_NAME}&apos; 채널을 찾아 문의하실 수 있습니다.</p>
        )}
      </div>

      <h2 className="text-lg font-semibold">상담은 이렇게 진행됩니다</h2>
      <ol className="mb-10 mt-4 space-y-3">
        {consultSteps.map((step, index) => (
          <li key={step.title} className="flex gap-3 rounded-lg bg-white p-4 shadow-xs">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="mt-1 text-sm">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {CONSULT_FORM_ENABLED && <ConsultForm />}

      <h2 className="mt-12 text-lg font-semibold">자주 묻는 질문</h2>
      <div className="mt-4 divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
        {faqs.map((faq) => (
          <details key={faq.question} className="p-5">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-3">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
