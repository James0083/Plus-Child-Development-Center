import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import SectionTitle from '@/components/ui/SectionTitle'
import { notices } from '@/data/notices'

export const metadata: Metadata = { title: '공지사항' }

const categoryTone: Record<string, 'primary' | 'mint' | 'accent'> = {
  휴원: 'accent',
  소식: 'mint',
  바우처: 'primary',
  이벤트: 'accent',
  공지: 'primary',
  모집: 'mint',
  정보: 'mint',
}

export default function NoticePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionTitle as="h1" title="공지사항" />
      <ul className="divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
        {notices.map((notice) => (
          <li key={notice.id} className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-4">
            <div className="shrink-0">
              <Badge tone={categoryTone[notice.category]}>{notice.category}</Badge>
            </div>
            <p className="flex-1 font-semibold">{notice.title}</p>
            <time dateTime={notice.date} className="text-sm font-light text-muted">
              {notice.date}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
