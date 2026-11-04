import { ChevronDown } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { sessionMinutes, sessions } from '@/data/schedule'
import { centerInfo } from '@/lib/constants'

export default function TimetableSection() {
  const { regular, closed } = centerInfo.hours

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          title="치료 시간표"
          description={`1회 ${sessionMinutes}분(수업 40분 + 상담 10분) · 쉬는 시간 없이 운영합니다.`}
        />
        <p className="text-center text-lg font-bold">
          {sessions[0].start}부터 {sessions[sessions.length - 1].end}까지 {sessionMinutes}분 단위, 총 {sessions.length}회기
        </p>
        <details className="group mx-auto mt-6 max-w-md">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary hover:bg-primary/10 [&::-webkit-details-marker]:hidden">
            회기별 시간 전체 보기
            <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-center">
              <caption className="sr-only">회기별 치료 시간</caption>
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col" className="w-1/3 px-4 py-3 font-bold">
                    회기
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold">
                    시간
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessions.map((session, index) => (
                  <tr key={session.start} className="even:bg-cream">
                    <th scope="row" className="px-4 py-2.5 font-bold">
                      {index + 1}회기
                    </th>
                    <td className="px-4 py-2.5">
                      {session.start} ~ {session.end}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <p className="mt-4 text-center text-sm text-muted">
          운영시간: {regular} / {closed}
        </p>
      </div>
    </section>
  )
}
