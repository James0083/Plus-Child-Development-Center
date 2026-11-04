'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

const RESET_MS = 3000

export default function CopyAddressButton({ address }: { address: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), RESET_MS)
    return () => clearTimeout(timer)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary"
      >
        {status === 'copied' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        주소 복사
      </button>
      <span role="status" className="text-sm text-muted">
        {status === 'copied' && '복사했습니다.'}
        {status === 'failed' && '주소를 길게 눌러 복사해 주세요.'}
      </span>
    </div>
  )
}
