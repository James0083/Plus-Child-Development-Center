'use client'

import { useSyncExternalStore } from 'react'
import Badge from '@/components/ui/Badge'
import BulletList from '@/components/ui/BulletList'
import { ZoomableImage } from '@/components/ui/Lightbox'
import { schoolReady } from '@/data/activities'

const hideAt = new Date(schoolReady.visibleUntil).getTime()
const subscribe = () => () => {}

// 정적 사이트라 다시 배포하지 않아도 숨겨지도록 방문자의 브라우저에서 날짜를 확인합니다.
export default function SchoolReady() {
  const visible = useSyncExternalStore(
    subscribe,
    () => Date.now() < hideAt,
    () => true,
  )
  if (!visible) return null

  return (
    <article id={schoolReady.id} className="mt-10 grid scroll-mt-24 gap-8 card p-6 md:grid-cols-2 md:p-8">
      <div>
        <p className="font-bold text-primary">{schoolReady.label}</p>
        <h2 className="mt-1 heading-section">{schoolReady.title}</h2>
        <div className="mt-2">
          <Badge tone="mint">대상: {schoolReady.target}</Badge>
        </div>
        <h3 className="mt-6 text-lg font-bold">주요 활동</h3>
        <BulletList className="mt-2" items={schoolReady.focus} />
        <h3 className="mt-6 text-lg font-bold">운영 안내</h3>
        <dl className="mt-2 divide-y divide-gray-200">
          {schoolReady.details.map((detail) => (
            <div key={detail.label} className="flex gap-4 py-2">
              <dt className="w-20 shrink-0 font-bold">{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-bold">{schoolReady.closing}</p>
      </div>
      <ZoomableImage photos={[schoolReady.poster]} sizes="(min-width: 48rem) 50vw, 100vw" imageClassName="h-auto" />
    </article>
  )
}
