'use client'

import { ClipboardList, MessageCircle, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { KAKAO_URL, TEL_HREF } from '@/lib/constants'

const ctaItems = [
  { icon: Phone, label: '전화 연결', action: TEL_HREF },
  ...(KAKAO_URL ? [{ icon: MessageCircle, label: '카카오 상담', action: KAKAO_URL }] : []),
  { icon: ClipboardList, label: '상담 안내', action: '/consult' },
]

const itemClass = 'flex items-center gap-3 rounded-full bg-accent py-2 pl-4 pr-3 font-semibold text-white shadow-lg hover:brightness-110'

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
    <>
      {/* 모바일과 태블릿: 본문을 가리지 않도록 화면 아래에 고정합니다. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-gray-200 bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
        <a href={TEL_HREF} className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-white">
          <Phone className="h-5 w-5" aria-hidden />
          전화 연결
        </a>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-primary py-2.5 font-semibold text-primary-dark"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          카카오 상담
        </a>
      </div>

      <div ref={rootRef} className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
        {open &&
          ctaItems.map(({ icon: Icon, label, action }) =>
            action.startsWith('/') ? (
              <Link key={label} href={action} onClick={() => setOpen(false)} className={itemClass}>
                {label}
                <Icon className="h-5 w-5" aria-hidden />
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
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ),
          )}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-semibold text-white shadow-lg hover:brightness-110"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
          {open ? '닫기' : '빠른 상담'}
        </button>
      </div>
    </>
  )
}
