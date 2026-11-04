'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Button from '@/components/ui/Button'
import { programIconTone, programSession, programs } from '@/data/programs'

export default function ProgramTab() {
  const [activeId, setActiveId] = useState(programs[0].id)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const active = programs.find((program) => program.id === activeId) ?? programs[0]

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1)
      if (programs.some((program) => program.id === hash)) setActiveId(hash)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const select = (id: string) => {
    setActiveId(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const offset = e.key === 'ArrowRight' ? 1 : -1
    const next = (index + offset + programs.length) % programs.length
    select(programs[next].id)
    tabsRef.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="프로그램 목록" className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
        {programs.map((program, index) => {
          const selected = program.id === active.id
          return (
            <button
              key={program.id}
              id={program.id}
              ref={(el) => {
                tabsRef.current[index] = el
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${program.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(program.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`scroll-mt-24 rounded-lg px-3 py-3 last:col-span-2 xl:last:col-span-1 text-sm font-semibold transition-colors ${
                selected ? 'bg-primary-dark text-white' : 'bg-white text-ink shadow-xs hover:bg-primary/10'
              }`}
            >
              {program.title}
            </button>
          )
        })}
      </div>

      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={active.id}
        tabIndex={0}
        className="mt-8 rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${programIconTone[active.color]}`}
          >
            <active.icon className="h-8 w-8" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold">{active.title}</h2>
          </div>
        </div>
        <p className="mt-6 text-base font-normal">{active.desc}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">이런 아동에게 도움이 됩니다</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {active.targets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">치료 내용</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {active.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">회기 구성: {active.session ?? programSession}</p>
        <Button href="/consult" className="mt-6">
          {active.title} 상담 신청
        </Button>
      </div>
    </div>
  )
}
