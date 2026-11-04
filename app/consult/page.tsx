import { ClipboardList, MessageCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import { consultFees, consultSteps } from '@/data/consult'
import { voucherSupportNote } from '@/data/voucher'
import { centerInfo, CONSULT_FORM_DEMO, CONSULT_FORM_ENABLED, TEL_HREF } from '@/lib/constants'

// 폼이 꺼져 있으면 폼 코드를 내려받지 않습니다.
const ConsultForm = dynamic(() => import('@/components/consult/ConsultForm'))

// 신청 폼을 켜기 전에는 전화와 카카오 채널로만 안내합니다.
const showForm = CONSULT_FORM_ENABLED || CONSULT_FORM_DEMO
const pageTitle = showForm ? '상담 신청' : '상담 및 이용 안내'

export const metadata: Metadata = { title: pageTitle }

export default function ConsultPage() {
  const { regular, closed } = centerInfo.hours

  return (
    <Section width="sm">
      <SectionTitle as="h1" title={pageTitle} description="편한 방법으로 문의해 주세요." />

      <div className="mb-10 card p-6 text-center md:p-8">
        <p className="text-2xl font-extrabold text-primary">{centerInfo.phone}</p>
        <p className="mt-2 text-sm text-muted">
          {regular} / {closed}
        </p>
        <div className="mt-5 flex flex-col flex-wrap justify-center gap-3 md:flex-row">
          <Button href={TEL_HREF}>
            <Phone className="h-5 w-5" />
            전화 연결
          </Button>
          <Button href={centerInfo.kakao} variant="outline">
            <MessageCircle className="h-5 w-5" />
            카카오 채널 상담
          </Button>
          {showForm && (
            <Button href="#consult-form" variant="outline">
              <ClipboardList className="h-5 w-5" />
              온라인 신청서 작성
            </Button>
          )}
        </div>
      </div>

      <h2 className="heading-section">상담 및 이용 절차</h2>
      <ol className="mb-10 mt-4 space-y-3">
        {consultSteps.map((step, index) => (
          <li key={step.title} className="flex gap-3 rounded-lg bg-white p-4 shadow-xs">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              <p className="font-bold">{step.title}</p>
              <p className="mt-1 text-sm">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="heading-section">비용 안내</h2>
      <div className="mb-10 mt-4 card p-6">
        <dl className="divide-y divide-gray-200">
          {consultFees.map((fee) => (
            <div key={fee.item} className="flex flex-col gap-1 py-3 first:pt-0 md:flex-row md:justify-between md:gap-4">
              <dt className="font-bold">{fee.item}</dt>
              <dd>{fee.fee}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-muted">{voucherSupportNote}</p>
        <Link href="/voucher" className="inline-block py-3 text-sm font-bold text-primary underline">
          바우처 안내 보기
        </Link>
      </div>

      {showForm && (
        <>
          <h2 id="consult-form" className="heading-section mb-4">
            온라인 상담 신청
          </h2>
          <ConsultForm />
        </>
      )}
    </Section>
  )
}
