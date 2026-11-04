import { ImageIcon, User } from 'lucide-react'
import type { Metadata } from 'next'
import SectionTitle from '@/components/ui/SectionTitle'
import { facilities, history, partners, staff, values } from '@/data/history'
import { DIRECTOR_NAME, DIRECTOR_TITLE } from '@/lib/constants'

export const metadata: Metadata = { title: '센터 소개' }

const greeting = [
  `안녕하세요. 플러스아동발달센터 ${DIRECTOR_TITLE} ${DIRECTOR_NAME}입니다.`,
  '우리 아이들이 우리가 하는 모든 일의 중심에 있다는 관점에 중점을 두고 각 아동에 맞는 개별화 된 특수교육과 전문적이고 체계적인 프로그램이 이루어지고 있으며, 부모님의 마음으로 사랑과 정성을 모아 우리 아이들이 사회의 일원으로 성장할 수 있도록 최선을 다하고 있습니다.',
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
            <h2 className="text-lg font-semibold">인사말</h2>
            <div className="mt-3 space-y-3">
              {greeting.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 font-semibold">
              {DIRECTOR_TITLE} {DIRECTOR_NAME}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle title="전문 치료사" description={`전체 치료사 ${staff.total}명이 함께합니다.`} />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {staff.fields.map((field) => (
              <li key={field.name} className="rounded-2xl bg-cream p-6 text-center">
                <p className="text-lg font-semibold">{field.name}</p>
                <p className="mt-1 text-2xl font-bold text-primary-dark">{field.count}명</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle title="핵심 가치" />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <li key={value.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <span aria-hidden className="text-4xl">
                {value.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2">{value.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <SectionTitle title="센터 연혁" />
          <ol className="border-l-2 border-primary-light">
            {history.map((item) => (
              <li key={item.date} className="relative pb-8 pl-8 last:pb-0">
                <span className="absolute left-[-7px] top-1.5 h-3 w-3 rounded-full bg-primary" aria-hidden />
                <p className="font-semibold text-primary-dark">{item.date}</p>
                <p className="mt-1">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle title="협력기관" />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.name} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{partner.name}</h3>
              <p className="mt-2">
                <span className="font-semibold">대상:</span> {partner.target}
              </p>
            </li>
          ))}
        </ul>
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
