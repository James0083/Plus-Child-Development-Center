'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { centerInfo, PRIVACY_RETENTION, TEL_HREF, TURNSTILE_SITE_KEY } from '@/lib/constants'

type TurnstileOptions = {
  sitekey: string
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

type ConsultFormValues = {
  childName: string
  birthDate: string
  gender: '남' | '여'
  parentName: string
  phone: string
  content: string
  preferDate: string
  privacy: boolean
}

const inputClass = 'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/30'

// 사용자의 현지 날짜를 YYYY-MM-DD로 반환합니다.
const today = () => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

// 공백만 입력한 값도 빈 값으로 처리합니다.
const notBlank = (message: string) => (value: string) => value.trim().length > 0 || message

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-700">
      {message}
    </p>
  )
}

function Field({ name, label, required, error, children }: {
  name: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="font-semibold">
        {label}
        {required && <span className="ml-1 text-red-700">*</span>}
      </label>
      {children}
      <ErrorText id={`${name}-error`} message={error} />
    </div>
  )
}

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [widgetId, setWidgetId] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultFormValues>()

  const renderTurnstile = useCallback(() => {
    const container = turnstileRef.current
    if (!window.turnstile || !container || container.childElementCount > 0) return
    setWidgetId(
      window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      }),
    )
  }, [])

  // 페이지 이동으로 다시 들어와도 위젯이 새로 그려지도록 정리합니다.
  useEffect(
    () => () => {
      if (widgetId) window.turnstile?.remove(widgetId)
    },
    [widgetId],
  )

  const onSubmit = async (values: ConsultFormValues) => {
    if (!turnstileToken) {
      setSendError('보안 확인이 끝난 뒤 다시 눌러 주세요.')
      return
    }

    setSending(true)
    setSendError('')
    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message)
      }
      setSubmitted(true)
    } catch (error) {
      setSendError((error instanceof Error && error.message) || '신청을 전송하지 못했습니다.')
      // 보안 확인 토큰은 한 번만 쓸 수 있으므로 실패하면 새로 받습니다.
      setTurnstileToken('')
      if (widgetId) window.turnstile?.reset(widgetId)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-mint" aria-hidden />
        <p className="mt-4 whitespace-pre-line text-lg font-semibold">
          {'상담 신청이 완료되었습니다.\n영업일 기준 1~2일 내로 연락드리겠습니다. 감사합니다.'}
        </p>
      </div>
    )
  }

  const invalidProps = (name: keyof ConsultFormValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <Field name="childName" label="아동 이름" required error={errors.childName?.message}>
        <input
          id="childName"
          type="text"
          autoComplete="off"
          className={inputClass}
          {...invalidProps('childName')}
          {...register('childName', { validate: notBlank('아동 이름을 입력해 주세요.') })}
        />
      </Field>

      <Field name="birthDate" label="생년월일" required error={errors.birthDate?.message}>
        <input
          id="birthDate"
          type="date"
          className={inputClass}
          {...invalidProps('birthDate')}
          {...register('birthDate', {
            required: '생년월일을 입력해 주세요.',
            validate: (value) => value <= today() || '생년월일은 미래 날짜일 수 없습니다.',
          })}
        />
      </Field>

      <fieldset aria-describedby={errors.gender ? 'gender-error' : undefined}>
        <legend className="font-semibold">
          성별<span className="ml-1 text-red-700">*</span>
        </legend>
        <div className="mt-2 flex gap-6">
          {['남', '여'].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                value={option}
                className="h-4 w-4 accent-primary"
                {...register('gender', { required: '성별을 선택해 주세요.' })}
              />
              {option}
            </label>
          ))}
        </div>
        <ErrorText id="gender-error" message={errors.gender?.message} />
      </fieldset>

      <Field name="parentName" label="보호자 이름" required error={errors.parentName?.message}>
        <input
          id="parentName"
          type="text"
          autoComplete="name"
          className={inputClass}
          {...invalidProps('parentName')}
          {...register('parentName', { validate: notBlank('보호자 이름을 입력해 주세요.') })}
        />
      </Field>

      <Field name="phone" label="연락처" required error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          className={inputClass}
          {...invalidProps('phone')}
          {...register('phone', {
            required: '연락처를 입력해 주세요.',
            pattern: {
              value: /^0\d{1,2}-?\d{3,4}-?\d{4}$/,
              message: '연락처 형식을 확인해 주세요. (예: 010-0000-0000)',
            },
          })}
        />
      </Field>

      <Field name="content" label="고민 / 상담 희망 내용" required error={errors.content?.message}>
        <textarea
          id="content"
          rows={5}
          className={inputClass}
          {...invalidProps('content')}
          {...register('content', {
            validate: notBlank('상담 희망 내용을 입력해 주세요.'),
          })}
        />
      </Field>

      <Field name="preferDate" label="희망 상담일" error={errors.preferDate?.message}>
        <input
          id="preferDate"
          type="date"
          className={inputClass}
          {...invalidProps('preferDate')}
          {...register('preferDate', {
            validate: (value) => !value || value >= today() || '희망 상담일은 지난 날짜일 수 없습니다.',
          })}
        />
      </Field>

      <div className="rounded-lg bg-cream p-4">
        <ul className="text-sm text-muted">
          <li>수집 항목: 아동 이름, 생년월일, 성별, 보호자 이름, 연락처, 상담 내용, 희망 상담일</li>
          <li>이용 목적: 상담 신청 확인 및 상담 진행</li>
          <li>전달 방법: 입력한 내용은 센터 이메일로 전송됩니다.</li>
          <li>보유 기간: {PRIVACY_RETENTION}</li>
        </ul>
        <label className="mt-3 flex items-start gap-2 font-semibold">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-primary"
            {...invalidProps('privacy')}
            {...register('privacy', { required: '개인정보 수집·이용에 동의해 주세요.' })}
          />
          개인정보 수집·이용 동의 (필수)
        </label>
        <Link href="/privacy" target="_blank" className="mt-2 inline-block text-sm text-primary-dark underline">
          개인정보처리방침 보기
        </Link>
        <ErrorText id="privacy-error" message={errors.privacy?.message} />
      </div>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderTurnstile}
      />
      <div ref={turnstileRef} />

      {sendError && (
        <div role="alert" className="rounded-lg bg-accent/15 p-4 text-sm">
          <p className="font-semibold">{sendError}</p>
          <p className="mt-1">
            급하시면{' '}
            <a href={TEL_HREF} className="font-semibold underline">
              {centerInfo.phone}
            </a>
            로 전화해 주세요.
          </p>
        </div>
      )}

      <Button type="submit" disabled={sending} className="w-full">
        {sending ? '전송 중입니다' : '상담 신청하기'}
      </Button>
    </form>
  )
}
