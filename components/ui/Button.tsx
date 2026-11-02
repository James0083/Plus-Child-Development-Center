import Link from 'next/link'
import type { ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark disabled:opacity-60'

const variants = {
  primary: 'bg-accent text-ink hover:brightness-105',
  secondary: 'border-2 border-white text-white hover:bg-white/10',
  outline: 'border-2 border-primary text-primary-dark hover:bg-primary/10',
}

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: keyof typeof variants
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (!href) {
    return (
      <button type={type} className={classes}>
        {children}
      </button>
    )
  }
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
