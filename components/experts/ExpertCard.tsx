'use client'

import { User } from 'lucide-react'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import type { Expert } from '@/data/experts'
import ExpertModal from './ExpertModal'

export default function ExpertCard({ expert }: { expert: Expert }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="flex h-full w-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm transition duration-200 hover:shadow-lg"
      >
        {/* 실제 사진 수령 전까지 expert.photo 대신 플레이스홀더를 표시합니다. */}
        <span className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-light">
          <User className="h-16 w-16 text-white" aria-hidden />
        </span>
        <span className="mt-4 text-lg font-semibold">{expert.name}</span>
        <span className="mt-1 text-sm text-muted">{expert.title}</span>
        <span className="mt-4 flex flex-wrap justify-center gap-2">
          {expert.specialties.map((specialty) => (
            <Badge key={specialty}>{specialty}</Badge>
          ))}
        </span>
      </button>
      <ExpertModal expert={expert} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
