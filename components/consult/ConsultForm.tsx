'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent, type ReactNode } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Button from '@/components/ui/Button'
import {
  formatPhone,
  koreaToday,
  MAX_CONTENT_LENGTH,
  NAME_PATTERN,
  PHONE_PATTERN,
  preferDateError,
  sanitizeName,
} from '@/lib/consultRules'
import { centerInfo, CONSULT_FORM_DEMO, PRIVACY_RETENTION, TEL_HREF, TURNSTILE_SITE_KEY } from '@/lib/constants'

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

const inputClass =
  'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/30'

const subscribeToNothing = () => () => {}

// 공백만 입력한 값도 빈 값으로 처리합니다.
const notBlank = (message: string) => (value: string) => value.trim().length > 0 || message

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-sm text-red-700">
      {message}
    </p>
  )
}

function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="font-bold">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-red-700">
            *
          </span>
        )}
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
  const doneRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<ConsultFormValues>()
  const contentValue = useWatch({ control, name: 'content', defaultValue: '' })
  // 미리 만든 HTML과 달라지지 않도록 브라우저에서만 오늘 날짜를 넣습니다.
  const todayValue = useSyncExternalStore(subscribeToNothing, koreaToday, () => undefined)

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

  // 폼이 사라지므로 완료 문구로 포커스를 옮겨 스크린리더가 읽게 합니다.
  useEffect(() => {
    if (submitted) doneRef.current?.focus()
  }, [submitted])

  const onSubmit = async (values: ConsultFormValues) => {
    if (CONSULT_FORM_DEMO) {
      setSubmitted(true)
      return
    }

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
      <div ref={doneRef} tabIndex={-1} role="status" className="card p-10 text-center outline-hidden">
        <CheckCircle2 className="mx-auto h-12 w-12 text-mint" aria-hidden />
        <p className="mt-4 whitespace-pre-line text-lg font-bold">
          {CONSULT_FORM_DEMO
            ? '시연이 끝났습니다. 입력한 내용은 전송되지 않았습니다.\n실제 상담은 전화나 카카오 채널로 문의해 주세요.'
            : '상담 신청이 완료되었습니다.\n영업일 기준 1~2일 내로 연락드리겠습니다. 감사합니다.'}
        </p>
      </div>
    )
  }

  // 입력값을 정리한 뒤 폼에 넘겨, 화면과 전송 값이 같게 합니다.
  // 등록 순서가 오류 이동 순서이므로 register는 입력 칸을 그릴 때 호출합니다.
  const cleaned = (clean: (value: string) => string, onChange: (event: ChangeEvent<HTMLInputElement>) => unknown) => ({
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const value = clean(event.target.value)
      if (value !== event.target.value) event.target.value = value
      return onChange(event)
    },
  })

  const nameField = (name: 'childName' | 'parentName', blankMessage: string) => {
    const field = register(name, {
      validate: (value) =>
        value.trim().length === 0
          ? blankMessage
          : NAME_PATTERN.test(value.trim()) || '이름은 한글 또는 영어로 입력해 주세요.',
    })
    return { ...field, ...cleaned(sanitizeName, field.onChange) }
  }

  const phoneField = () => {
    const field = register('phone', {
      required: '연락처를 입력해 주세요.',
      pattern: {
        value: PHONE_PATTERN,
        message: '연락처 형식을 확인해 주세요. (예: 010-0000-0000)',
      },
    })
    return { ...field, ...cleaned(formatPhone, field.onChange) }
  }

  const invalidProps = (name: keyof ConsultFormValues) => ({
    'aria-required': name === 'preferDate' ? undefined : true,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 card p-6 md:p-8">
      {CONSULT_FORM_DEMO && (
        <p className="rounded-lg bg-primary-soft p-4 font-bold">
          시연용 화면입니다. 입력한 내용은 전송되거나 저장되지 않으니 실제 정보를 입력하지 마세요.
        </p>
      )}
      <p className="text-sm text-muted">
        <span aria-hidden className="mr-1 text-red-700">
          *
        </span>
        표시는 필수 항목입니다.
      </p>
      <Field name="childName" label="아동 이름" required error={errors.childName?.message}>
        <input
          id="childName"
          type="text"
          autoComplete="off"
          className={inputClass}
          {...invalidProps('childName')}
          maxLength={50}
          {...nameField('childName', '아동 이름을 입력해 주세요.')}
        />
      </Field>

      <Field name="birthDate" label="생년월일" required error={errors.birthDate?.message}>
        <input
          id="birthDate"
          max={todayValue}
          type="date"
          className={inputClass}
          {...invalidProps('birthDate')}
          {...register('birthDate', {
            required: '생년월일을 입력해 주세요.',
            validate: (value) => value <= koreaToday() || '생년월일은 미래 날짜일 수 없습니다.',
          })}
        />
      </Field>

      <fieldset
        role="radiogroup"
        aria-required
        aria-invalid={errors.gender ? true : undefined}
        aria-describedby={errors.gender ? 'gender-error' : undefined}
      >
        <legend className="font-bold">
          성별
          <span aria-hidden className="ml-1 text-red-700">
            *
          </span>
        </legend>
        <div className="mt-1 flex gap-6">
          {['남', '여'].map((option) => (
            <label key={option} className="flex min-h-11 min-w-11 items-center gap-2">
              <input
                type="radio"
                value={option}
                className="h-5 w-5 accent-primary"
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
          maxLength={50}
          {...nameField('parentName', '보호자 이름을 입력해 주세요.')}
        />
      </Field>

      <Field name="phone" label="연락처" required error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="숫자만 입력해 주세요"
          className={inputClass}
          {...invalidProps('phone')}
          inputMode="numeric"
          maxLength={13}
          {...phoneField()}
        />
      </Field>

      <Field name="content" label="고민 / 상담 희망 내용" required error={errors.content?.message}>
        <textarea
          id="content"
          maxLength={MAX_CONTENT_LENGTH}
          rows={5}
          className={inputClass}
          {...invalidProps('content')}
          {...register('content', {
            validate: notBlank('상담 희망 내용을 입력해 주세요.'),
          })}
        />
        <p className="mt-1 text-right text-sm text-muted">
          {contentValue.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()}
        </p>
      </Field>

      <Field name="preferDate" label="희망 상담일" error={errors.preferDate?.message}>
        <input
          id="preferDate"
          min={todayValue}
          type="date"
          className={inputClass}
          {...invalidProps('preferDate')}
          {...register('preferDate', {
            validate: (value) => preferDateError(value) ?? true,
            // 일요일을 고르면 제출 전에 바로 알려 줍니다.
            onChange: () => trigger('preferDate'),
          })}
        />
        <p className="mt-1 text-sm text-muted">공휴일은 휴무입니다. 상담 때 일정을 조정해 드립니다.</p>
      </Field>

      <div className="rounded-lg bg-cream p-4">
        <ul className="text-sm text-muted">
          <li>수집 항목: 아동 이름, 생년월일, 성별, 보호자 이름, 연락처, 상담 내용, 희망 상담일</li>
          <li>이용 목적: 상담 신청 확인 및 상담 진행</li>
          <li>
            전달 방법:{' '}
            {CONSULT_FORM_DEMO
              ? '시연 화면에서는 전송되지 않습니다. 실제 신청 내용은 센터 이메일로 전달됩니다.'
              : '입력한 내용은 센터 이메일로 전송됩니다.'}
          </li>
          <li>보유 기간: {PRIVACY_RETENTION}</li>
        </ul>
        <label className="mt-1 flex items-start gap-2 py-2.5 font-bold">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
            {...invalidProps('privacy')}
            {...register('privacy', { required: '개인정보 수집·이용에 동의해 주세요.' })}
          />
          개인정보 수집·이용 동의 (필수)
        </label>
        <Link href="/privacy" target="_blank" className="inline-block py-2.5 text-sm text-primary underline">
          개인정보처리방침 보기
          <span className="sr-only"> (새 창)</span>
        </Link>
        <ErrorText id="privacy-error" message={errors.privacy?.message} />
      </div>

      {!CONSULT_FORM_DEMO && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={renderTurnstile}
          />
          <div ref={turnstileRef} />
        </>
      )}

      {sendError && (
        <div role="alert" className="rounded-lg bg-accent/15 p-4 text-sm">
          <p className="font-bold">{sendError}</p>
          <p className="mt-1">
            급하시면{' '}
            <a href={TEL_HREF} className="font-bold underline">
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
