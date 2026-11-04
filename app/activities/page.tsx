import type { Metadata } from 'next'
import SchoolReady from '@/components/activities/SchoolReady'
import Badge from '@/components/ui/Badge'
import BulletList from '@/components/ui/BulletList'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import { activities, activityNote } from '@/data/activities'

export const metadata: Metadata = { title: '활동 안내' }

export default function ActivitiesPage() {
  return (
    <>
      <Section>
        <SectionTitle as="h1" title="활동 안내" description="센터의 활동 프로그램을 소개합니다." />
        <ul className="grid gap-6 md:grid-cols-2">
          {activities.map((activity) => (
            <li key={activity.id} id={activity.id} className="scroll-mt-24 card p-6 md:p-8">
              <h2 className="heading-section">{activity.title}</h2>
              <div className="mt-2">
                <Badge tone={activity.tone}>대상: {activity.target}</Badge>
              </div>
              <p className="mt-4">{activity.desc}</p>
              <h3 className="mt-6 text-lg font-bold">주요 활동</h3>
              <BulletList className="mt-2" items={activity.items} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">{activityNote}</p>

        <SchoolReady />

        <div className="mt-10 text-center">
          <Button href="/consult">이용 상담 안내</Button>
        </div>
      </Section>
    </>
  )
}
