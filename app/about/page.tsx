import { ImageIcon, User } from 'lucide-react'
import type { Metadata } from 'next'
import SectionTitle from '@/components/ui/SectionTitle'
import { facilities, history, values } from '@/data/history'
import { DIRECTOR_NAME, DIRECTOR_TITLE } from '@/lib/constants'

export const metadata: Metadata = { title: '센터 소개' }

const greeting = [
  `안녕하세요, 플러스 아동발달센터 원장 ${DIRECTOR_NAME}입니다.`,
  '아이의 발달에 대한 걱정으로 이곳을 찾아오신 부모님께 진심으로 감사드립니다. 저희 센터는 "모든 아이는 각자의 속도로 성장한다"는 믿음 아래, 각 아동의 강점을 발견하고 어려움을 함께 해결해 나가는 것을 목표로 합니다.',
  '언어치료, 놀이치료, 작업치료, 인지치료, 미술·음악치료 등 다양한 전문 프로그램을 통해 아이가 일상에서 행복하게 성장할 수 있도록 최선을 다하겠습니다.',
]

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle as="h1" title="센터 소개" description="플러스 아동발달센터를 소개합니다." />
        <div className="flex flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-sm md:flex-row md:items-start">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary-light">
            <User className="h-16 w-16 text-white" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold">원장 인사말</h2>
            <div className="mt-3 space-y-3">
              {greeting.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 font-semibold">
              {DIRECTOR_TITLE} · {DIRECTOR_NAME} 원장
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle title="핵심 가치" />
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <li key={value.title} className="rounded-2xl bg-cream p-6 text-center">
                <span aria-hidden className="text-4xl">
                  {value.icon}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2">{value.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <SectionTitle title="연혁" />
        <ol className="border-l-2 border-primary-light">
          {history.map((item) => (
            <li key={item.year} className="relative pb-8 pl-8 last:pb-0">
              <span className="absolute left-[-7px] top-1.5 h-3 w-3 rounded-full bg-primary" aria-hidden />
              <p className="font-semibold text-primary-dark">{item.year}</p>
              <p className="mt-1">{item.event}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle title="시설 안내" />
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {facilities.map((facility) => (
              <li key={facility.name}>
                {/* 실제 시설 사진 수령 전까지 플레이스홀더를 표시합니다. */}
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-200">
                  <ImageIcon className="h-12 w-12 text-gray-400" aria-hidden />
                  <span className="ml-2 text-gray-500">시설 사진</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{facility.name}</h3>
                <p className="mt-1">{facility.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
