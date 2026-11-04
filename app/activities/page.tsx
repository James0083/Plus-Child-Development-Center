import type { Metadata } from 'next'
import SchoolReady from '@/components/activities/SchoolReady'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { activities, activityNote } from '@/data/activities'

export const metadata: Metadata = { title: '활동 안내' }


export default function ActivitiesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle as="h1" title="활동 안내" description="센터의 활동 프로그램을 소개합니다." />
        <ul className="grid gap-6 md:grid-cols-2">
          {activities.map((activity) => (
            <li key={activity.id} id={activity.id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-extrabold">{activity.title}</h2>
              <div className="mt-2">
                <Badge tone={activity.tone}>대상: {activity.target}</Badge>
              </div>
              <p className="mt-4">{activity.desc}</p>
              <h3 className="mt-6 text-lg font-bold">주요 활동</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {activity.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">{activityNote}</p>

        <SchoolReady />

        <div className="mt-10 text-center">
          <Button href="/consult">이용 상담 안내</Button>
        </div>
      </section>
    </>
  )
}
