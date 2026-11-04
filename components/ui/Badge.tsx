import type { ReactNode } from 'react'

const tones = {
  primary: 'bg-primary/10',
  mint: 'bg-mint/15',
}

type BadgeProps = {
  children: ReactNode
  tone?: keyof typeof tones
}

export default function Badge({ children, tone = 'primary' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-ink ${tones[tone]}`}>
      {children}
    </span>
  )
}
