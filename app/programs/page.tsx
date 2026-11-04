import type { Metadata } from 'next'
import ProgramTab from '@/components/programs/ProgramTab'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'

export const metadata: Metadata = { title: '프로그램 안내' }

export default function ProgramsPage() {
  return (
    <Section>
      <SectionTitle
        as="h1"
        title="프로그램 안내"
        description="연령을 따로 정하지 않고, 아이의 발달 수준에 맞춰 평가한 뒤 치료 계획을 세웁니다."
      />
      <ProgramTab />
      <div className="mt-10 text-center">
        <Button href="/voucher" variant="outline">
          바우처 안내 보기
        </Button>
      </div>
    </Section>
  )
}
