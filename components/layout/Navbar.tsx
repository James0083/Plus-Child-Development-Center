'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { label: '센터 소개', href: '/about' },
  { label: '프로그램 안내', href: '/programs' },
  { label: '활동 안내', href: '/activities' },
  { label: '바우처 안내', href: '/voucher' },
  { label: '상담 신청', href: '/consult', highlight: true },
  { label: '공지사항', href: '/notice' },
]

export default function Navbar() {
  const pathname = usePathname()
  // 메뉴를 연 경로를 기억해, 경로가 바뀌면(뒤로 가기 포함) 자동으로 닫힌 상태가 됩니다.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const open = openedOn === pathname

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedOn(null)
    }
    // 화면 회전 등으로 md 이상이 되면 메뉴가 숨겨지므로, 스크롤이 잠긴 채 남지 않게 닫습니다.
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onDesktopChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenedOn(null)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktopChange)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktopChange)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      <nav aria-label="주 메뉴" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="shrink-0">
          <Image src="/logo/logo.svg" alt="플러스 아동발달센터" width={829} height={127} preload className="h-7 w-auto md:h-6 lg:h-9" />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={
                  item.highlight
                    ? 'rounded-lg bg-accent px-4 py-2 font-semibold text-ink hover:brightness-105'
                    : `hover:text-primary-dark ${pathname === item.href ? 'font-semibold text-primary-dark' : ''}`
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpenedOn(pathname)}
          aria-label="메뉴 열기"
          aria-expanded={open}
          className="p-2 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" onClick={() => setOpenedOn(null)} className="shrink-0">
              <Image src="/logo/logo.svg" alt="플러스 아동발달센터" width={829} height={127} className="h-7 w-auto" />
            </Link>
            <button type="button" onClick={() => setOpenedOn(null)} aria-label="메뉴 닫기" className="p-2" autoFocus>
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 px-4 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpenedOn(null)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`block rounded-lg px-4 py-4 text-lg font-semibold ${
                    item.highlight ? 'bg-accent text-ink' : 'hover:bg-primary/10'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
