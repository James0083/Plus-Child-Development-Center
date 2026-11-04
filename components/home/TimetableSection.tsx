import SectionTitle from '@/components/ui/SectionTitle'
import { sessionMinutes, sessions } from '@/data/schedule'
import { centerInfo } from '@/lib/constants'

export default function TimetableSection() {
  const { regular, sunday } = centerInfo.hours

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          title="치료 시간표"
          description={`1회 ${sessionMinutes}분(수업 40분 + 상담 10분) · 쉬는 시간 없이 운영합니다.`}
        />
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-center">
            <caption className="sr-only">회기별 치료 시간</caption>
            <thead className="bg-primary-dark text-white">
              <tr>
                <th scope="col" className="w-1/3 px-4 py-3 font-semibold">
                  회기
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  시간
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.map((session, index) => (
                <tr key={session.start} className="even:bg-cream">
                  <th scope="row" className="px-4 py-2.5 font-semibold">
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
        <p className="mt-4 text-center text-sm font-light text-muted">
          운영시간: {regular} / {sunday}
        </p>
      </div>
    </section>
  )
}
