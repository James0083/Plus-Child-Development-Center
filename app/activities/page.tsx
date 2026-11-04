import type { Metadata } from 'next'
import Image from 'next/image'
import ExpertCard from '@/components/experts/ExpertCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { activities, activityNote, schoolReady } from '@/data/activities'
import { experts } from '@/data/experts'

export const metadata: Metadata = { title: '활동 안내' }

// 전문가 소개를 다시 표시하려면 true로 바꾸고 메뉴 이름도 함께 수정합니다.
const showExperts = false

export default function ActivitiesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle as="h1" title="활동 안내" description="방과후 활동, 주간활동, 학교 갈 준비 프로그램을 소개합니다." />
        <ul className="grid gap-6 md:grid-cols-2">
          {activities.map((activity) => (
            <li key={activity.id} id={activity.id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold">{activity.title}</h2>
              <div className="mt-2">
                <Badge tone={activity.tone}>대상: {activity.target}</Badge>
              </div>
              <p className="mt-4">{activity.desc}</p>
              <h3 className="mt-6 text-lg font-semibold">주요 활동</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {activity.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">{activityNote}</p>

        <article id={schoolReady.id} className="mt-10 grid scroll-mt-24 gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
          <div>
            <p className="font-semibold text-primary-dark">{schoolReady.label}</p>
            <h2 className="mt-1 text-2xl font-semibold">{schoolReady.title}</h2>
            <div className="mt-2">
              <Badge tone="mint">대상: {schoolReady.target}</Badge>
            </div>
            <h3 className="mt-6 text-lg font-semibold">주요 활동</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {schoolReady.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-lg font-semibold">운영 안내</h3>
            <dl className="mt-2 divide-y divide-gray-200">
              {schoolReady.details.map((detail) => (
                <div key={detail.label} className="flex gap-4 py-2">
                  <dt className="w-20 shrink-0 font-semibold">{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-semibold">{schoolReady.closing}</p>
          </div>
          <Image
            src={schoolReady.poster.src}
            alt={schoolReady.poster.alt}
            width={schoolReady.poster.width}
            height={schoolReady.poster.height}
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="h-auto w-full rounded-lg"
          />
        </article>

        <div className="mt-10 text-center">
          <Button href="/consult">이용 상담 신청</Button>
        </div>
      </section>

      {showExperts && (
        <section id="experts" className="scroll-mt-16 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <SectionTitle title="전문가 소개" description="카드를 선택하면 경력과 자격증을 볼 수 있습니다." />
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {experts.map((expert) => (
                <li key={expert.id}>
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
