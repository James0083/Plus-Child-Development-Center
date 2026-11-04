import { ArrowRight, Compass } from 'lucide-react'
import Link from 'next/link'
import { programIconTone } from '@/components/programs/programTone'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import { programs } from '@/data/programs'

export default function ProgramCards() {
  return (
    <Section>
      <SectionTitle title="프로그램 안내" description="아이의 발달 특성에 맞는 맞춤 프로그램을 운영합니다." />
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {programs.map((program) => (
          <li
            key={program.id}
            className="flex flex-col card p-6 transition duration-200 hover:scale-105 hover:shadow-lg"
          >
            <span
              aria-hidden
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${programIconTone[program.color]}`}
            >
              <program.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{program.title}</h3>
            <p className="mt-2 flex-1 text-base font-normal">{program.desc}</p>
            <Link
              href={`/programs#${program.id}`}
              aria-label={`${program.title} 자세히 보기`}
              className="mt-2 inline-flex items-center gap-1 py-2.5 font-bold text-primary hover:underline"
            >
              자세히 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
        <li className="flex flex-col rounded-2xl bg-primary-soft p-6">
          <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary">
            <Compass className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-bold">어떤 치료가 맞을지 고민되시나요?</h3>
          <p className="mt-2 flex-1 text-base font-normal">상담에서 아이에게 맞는 프로그램을 함께 찾아 드립니다.</p>
          <Link
            href="/consult"
            className="mt-2 inline-flex items-center gap-1 py-2.5 font-bold text-primary hover:underline"
          >
            상담 안내 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </Section>
  )
}
