import type { Metadata } from 'next'
import ConsultForm from '@/components/consult/ConsultForm'
import SectionTitle from '@/components/ui/SectionTitle'
import { consultSteps, faqs } from '@/data/consult'

export const metadata: Metadata = { title: '상담 신청' }

export default function ConsultPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <SectionTitle as="h1" title="상담 신청" description="아래 내용을 남겨 주시면 확인 후 연락드리겠습니다." />

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

      <ConsultForm />

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
