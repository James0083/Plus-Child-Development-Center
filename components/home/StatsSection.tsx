import { Award, BookOpen, Heart, Users } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: '6가지', label: '치료 프로그램' },
  { icon: Users, value: '8명+', label: '전문 치료사' }, // [DUMMY]
  { icon: Heart, value: '500+', label: '누적 상담 건수' }, // [DUMMY]
  { icon: Award, value: '10년+', label: '센터 운영 경력' }, // [DUMMY]
]

export default function StatsSection() {
  return (
    <section className="bg-primary text-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex flex-col items-center text-center">
            <Icon className="mb-3 h-8 w-8" aria-hidden />
            <p className="text-4xl font-bold">{value}</p>
            <p className="mt-2 text-sm">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
