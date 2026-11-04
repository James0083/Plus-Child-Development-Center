import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { otherVouchers, voucherApply, voucherContacts, vouchers, voucherSteps, voucherSupportNote } from '@/data/voucher'

export const metadata: Metadata = { title: '바우처 안내' }

export default function VoucherPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle as="h1" title="바우처 안내" description="센터에서 이용할 수 있는 바우처를 안내합니다." />

      <p className="mb-12 rounded-lg bg-primary-soft p-4 text-center font-semibold">
        플러스 아동발달센터는 발달재활서비스 제공기관으로, 대상 아동은 센터에서 바우처로 이용할 수 있습니다.
      </p>

      <div className="space-y-12">
        {vouchers.map((voucher) => (
          <section key={voucher.id} aria-labelledby={voucher.id}>
            <h2 id={voucher.id} className="text-2xl font-semibold">
              {voucher.title}
            </h2>
            <p className="mt-2">{voucher.intro}</p>
            <ul className="mt-6 grid gap-6 lg:grid-cols-3">
              {voucher.sections.map((section) => (
                <li key={section.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold">신청 방법</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {voucherApply.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ol className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {voucherSteps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 rounded-lg bg-primary-soft p-4 font-semibold">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm text-white">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <h2 className="mt-12 text-2xl font-semibold">그 외 바우처</h2>
      <ul className="mt-4 grid gap-6 md:grid-cols-2">
        {otherVouchers.map((voucher) => (
          <li key={voucher.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{voucher.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {voucher.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">확인과 문의</h2>
        <p className="mt-2">{voucherSupportNote} 지원 기준과 금액은 해마다 달라질 수 있습니다.</p>
        <ul className="mt-1 flex flex-col justify-center md:flex-row md:gap-6">
          {voucherContacts.map((contact) => (
            <li key={contact.label}>
              {contact.label}:{' '}
              <a
                href={contact.href}
                className="inline-block py-2.5 font-semibold text-primary-dark underline"
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
    </section>
  )
}
