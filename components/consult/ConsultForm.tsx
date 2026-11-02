'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { PRIVACY_RETENTION } from '@/lib/constants'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultFormValues>()

  // 실제 서버 연결 전까지 콘솔 출력 후 성공 UI만 표시합니다.
  const onSubmit = (values: ConsultFormValues) => {
    console.log(values)
    setSubmitted(true)
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
        <ul className="text-sm font-light text-muted">
          <li>수집 항목: 아동 이름, 생년월일, 성별, 보호자 이름, 연락처, 상담 내용, 희망 상담일</li>
          <li>이용 목적: 상담 신청 확인 및 상담 진행</li>
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

      <Button type="submit" className="w-full">
        상담 신청하기
      </Button>
    </form>
  )
}
