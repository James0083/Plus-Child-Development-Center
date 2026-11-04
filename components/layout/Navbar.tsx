'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: '센터 소개', href: '/about' },
  { label: '프로그램 안내', href: '/programs' },
  { label: '활동 안내', href: '/activities' },
  { label: '바우처 안내', href: '/voucher' },
  { label: '찾아오는 길', href: '/#location' },
  { label: '상담·비용 안내', href: '/consult', highlight: true },
]

export default function Navbar() {
  const pathname = usePathname()
  // 메뉴를 연 경로를 기억해, 경로가 바뀌면(뒤로 가기 포함) 자동으로 닫힌 상태가 됩니다.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const open = openedOn === pathname
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef(false)

  // 닫기 버튼이나 Esc로 닫으면 메뉴 버튼으로 포커스를 돌려줍니다.
  const closeMenu = () => {
    returnFocus.current = true
    setOpenedOn(null)
  }

  useEffect(() => {
    if (!open) return
    const menuButton = menuButtonRef.current
    // 메뉴 뒤의 내용은 키보드와 스크린리더가 들어가지 못하게 막습니다.
    const background = [navRef.current, ...document.querySelectorAll<HTMLElement>('a[href="#main"], main, footer, [data-quick-cta]')]
    background.forEach((el) => {
      if (el) el.inert = true
    })
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    // 화면 회전 등으로 lg 이상이 되면 메뉴가 숨겨지므로, 스크롤이 잠긴 채 남지 않게 닫습니다.
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onDesktopChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenedOn(null)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktopChange)
    return () => {
      background.forEach((el) => {
        if (el) el.inert = false
      })
      if (returnFocus.current) {
        returnFocus.current = false
        menuButton?.focus()
      }
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktopChange)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      <nav ref={navRef} aria-label="주 메뉴" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="shrink-0 py-2">
          <Image src="/logo/logo.svg" alt="플러스 아동발달센터" width={829} height={129} preload className="h-7 w-auto lg:h-9" />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={
                  item.highlight
                    ? 'rounded-lg bg-accent px-4 py-2 font-bold text-white hover:brightness-110'
                    : `hover:text-primary-dark ${pathname === item.href ? 'font-bold text-primary-dark' : ''}`
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpenedOn(pathname)}
          aria-label="메뉴 열기"
          aria-expanded={open}
          className="p-2.5 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="전체 메뉴" className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" onClick={() => setOpenedOn(null)} className="shrink-0 py-2">
              <Image src="/logo/logo.svg" alt="플러스 아동발달센터" width={829} height={129} className="h-7 w-auto" />
            </Link>
            <button type="button" onClick={closeMenu} aria-label="메뉴 닫기" className="p-2.5" autoFocus>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="전체 메뉴">
            <ul className="flex flex-col gap-2 px-4 pt-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenedOn(null)}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`block rounded-lg px-4 py-4 text-lg font-bold ${
                      item.highlight ? 'bg-accent text-white' : `hover:bg-primary/10 ${pathname === item.href ? 'text-primary-dark' : ''}`
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
