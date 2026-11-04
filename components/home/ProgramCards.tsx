import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import SectionTitle from '@/components/ui/SectionTitle'
import { programIconBg, programs } from '@/data/programs'

export default function ProgramCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="프로그램 안내" description="아이의 발달 특성에 맞는 맞춤 프로그램을 운영합니다." />
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <li
            key={program.id}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm transition duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span
                aria-hidden
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${programIconBg[program.color]}`}
              >
                {program.icon}
              </span>
              {program.ages && <Badge tone={program.color}>{program.ages}</Badge>}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{program.title}</h3>
            <p className="mt-2 flex-1 text-base font-normal">{program.desc}</p>
            <Link
              href={`/programs#${program.id}`}
              aria-label={`${program.title} 자세히 보기`}
              className="mt-2 inline-flex items-center gap-1 py-2.5 font-semibold text-primary-dark hover:underline"
            >
              자세히 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
