'use client'

import { ClipboardList, MessageCircle, Phone, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { KAKAO_URL, TEL_HREF } from '@/lib/constants'

const ctaItems = [
  { icon: Phone, label: '전화 연결', action: TEL_HREF },
  ...(KAKAO_URL ? [{ icon: MessageCircle, label: '카카오 상담', action: KAKAO_URL }] : []),
  { icon: ClipboardList, label: '상담 안내', action: '/consult' },
]

const itemClass = 'flex items-center gap-3 rounded-full bg-accent py-2 pl-4 pr-3 font-semibold text-ink shadow-lg hover:brightness-105'

export default function FloatingCTA() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open &&
        ctaItems.map(({ icon: Icon, label, action }) =>
          action.startsWith('/') ? (
            <Link key={label} href={action} onClick={() => setOpen(false)} className={itemClass}>
              {label}
              <Icon className="h-5 w-5" />
            </Link>
          ) : (
            <a
              key={label}
              href={action}
              onClick={() => setOpen(false)}
              className={itemClass}
              {...(action.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
              <Icon className="h-5 w-5" />
            </a>
          ),
        )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? '빠른 상담 메뉴 닫기' : '빠른 상담 메뉴 열기'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-lg hover:brightness-105"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  )
}
