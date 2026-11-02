'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import type { Expert } from '@/data/experts'

type ExpertModalProps = {
  expert: Expert
  open: boolean
  onClose: () => void
}

export default function ExpertModal({ expert, open, onClose }: ExpertModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`expert-${expert.id}-name`}
      onClose={onClose}
      onClick={(e) => {
        // 바깥 영역(backdrop) 클릭은 dialog 자신을 target으로 전달됩니다.
        if (e.target === dialogRef.current) onClose()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl text-ink backdrop:bg-black/50"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id={`expert-${expert.id}-name`} className="text-lg font-semibold">
              {expert.name}
            </h3>
            <p className="text-sm font-light text-muted">{expert.title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="닫기" className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <h4 className="mt-6 font-semibold">전문 분야</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {expert.specialties.map((specialty) => (
            <li key={specialty}>
              <Badge>{specialty}</Badge>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 font-semibold">경력</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {expert.career.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h4 className="mt-6 font-semibold">자격증</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {expert.certs.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
