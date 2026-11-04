import type { ReactNode } from 'react'

const widths = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-6xl',
}

type SectionProps = {
  children: ReactNode
  id?: string
  tone?: 'white'
  width?: keyof typeof widths
  className?: string
}

export default function Section({ children, id, tone, width = 'lg', className = '' }: SectionProps) {
  return (
    <section id={id} className={tone === 'white' ? 'bg-white' : undefined}>
      <div className={`mx-auto px-4 py-16 ${widths[width]} ${className}`}>{children}</div>
    </section>
  )
}
