import type { Metadata } from 'next'
import ProgramTab from '@/components/programs/ProgramTab'
import VoucherGuide from '@/components/programs/VoucherGuide'
import SectionTitle from '@/components/ui/SectionTitle'

export const metadata: Metadata = { title: '프로그램 안내' }

export default function ProgramsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle as="h1" title="프로그램 안내" description="아이의 발달 특성에 맞는 프로그램을 확인해 보세요." />
      <ProgramTab />
      <VoucherGuide />
    </section>
  )
}
