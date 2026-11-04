import Link from 'next/link'
import type { ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60'

const variants = {
  primary: 'bg-accent text-white hover:brightness-110',
  secondary: 'border-2 border-white text-white hover:bg-white/10',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
}

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: keyof typeof variants
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (!href) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
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
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      {external && <span className="sr-only"> (새 창)</span>}
    </a>
  )
}
