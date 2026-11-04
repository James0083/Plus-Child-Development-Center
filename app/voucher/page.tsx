import type { Metadata } from 'next'
import BulletList from '@/components/ui/BulletList'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import { otherVouchers, voucherApplyNote, voucherCommonNotes, voucherContacts, vouchers, voucherSteps } from '@/data/voucher'

export const metadata: Metadata = { title: '바우처 안내' }

export default function VoucherPage() {
  return (
    <Section>
      <SectionTitle as="h1" title="바우처 안내" description="센터에서 이용할 수 있는 바우처를 안내합니다." />

      <p className="mb-12 rounded-lg bg-primary-soft p-4 text-center font-bold">
        플러스 아동발달센터는 발달재활서비스 제공기관으로, 대상 아동은 센터에서 바우처로 이용할 수 있습니다.
      </p>

      <ul className="grid gap-6 md:grid-cols-2">
        {vouchers.map((voucher) => (
          <li key={voucher.id} className="card p-6">
            <h2 className="heading-section">{voucher.title}</h2>
            <p className="mt-2">{voucher.intro}</p>
            <dl className="mt-4 divide-y divide-gray-200">
              {voucher.rows.map((row) => (
                <div key={row.label} className="py-3">
                  <dt className="font-bold">{row.label}</dt>
                  <dd className="mt-1">{row.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <BulletList className="mt-6" items={voucherCommonNotes} />

      <h2 className="mt-12 heading-section">신청 방법</h2>
      <ol className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {voucherSteps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 rounded-lg bg-primary-soft p-4 font-bold">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-muted">{voucherApplyNote}</p>

      <h2 className="mt-12 heading-section">그 외 바우처</h2>
      <ul className="mt-4 grid gap-6 md:grid-cols-2">
        {otherVouchers.map((voucher) => (
          <li key={voucher.title} className="card p-6">
            <h3 className="text-lg font-bold">{voucher.title}</h3>
            <BulletList className="mt-3" items={voucher.items} />
          </li>
        ))}
      </ul>

      <div className="mt-12 card p-6 text-center">
        <h2 className="heading-section">확인과 문의</h2>
        <p className="mt-2">지원 기준과 금액은 해마다 달라질 수 있습니다.</p>
        <ul className="mt-1 flex flex-col justify-center md:flex-row md:gap-6">
          {voucherContacts.map((contact) => (
            <li key={contact.label}>
              {contact.label}:{' '}
              <a
                href={contact.href}
                className="inline-block py-2.5 font-bold text-primary underline"
                {...(contact.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {contact.value}
                {contact.href.startsWith('http') && <span className="sr-only"> (새 창)</span>}
              </a>
            </li>
          ))}
        </ul>
        <Button href="/consult" className="mt-5">
          센터에 이용 상담하기
        </Button>
      </div>
    </Section>
  )
}
