import { Award, BookOpen, Heart, Users } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: '7가지', label: '치료 프로그램' },
  { icon: Users, value: '25명', label: '전문 치료사' },
  { icon: Heart, value: '월 350명+', label: '치료 아동' },
  { icon: Award, value: '2000년', label: '연구소 설립' },
]

export default function StatsSection() {
  return (
    <section className="bg-primary-soft text-primary-dark">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex flex-col items-center text-center">
            <Icon className="mb-3 h-8 w-8" aria-hidden />
            <p className="whitespace-nowrap text-3xl font-extrabold lg:text-4xl">{value}</p>
            <p className="mt-2 text-sm">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
