import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { voucherFacts, voucherSteps } from '@/data/voucher'

export default function VoucherGuide() {
  return (
    <div id="voucher" className="mt-16 scroll-mt-24">
      <SectionTitle
        title="발달재활서비스 바우처 안내"
        description="지원 기준과 금액은 해마다 달라질 수 있어 주민센터나 센터로 확인해 주세요."
      />
      <ul className="grid gap-6 md:grid-cols-2">
        {voucherFacts.map((fact) => (
          <li key={fact.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{fact.title}</h3>
            <p className="mt-2">{fact.desc}</p>
          </li>
        ))}
      </ul>
      <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {voucherSteps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 rounded-lg bg-primary/10 p-4 font-semibold">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm text-white">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-8 text-center">
        <Button href="/consult">바우처 이용 상담 신청</Button>
      </div>
    </div>
  )
}
