// 상담 신청을 센터 메일로 보내는 Worker입니다. 그 외 모든 페이지는 Cloudflare가 정적 파일로 응답합니다.
// 수신 주소는 wrangler.jsonc의 send_email 설정에서도 같은 주소로 제한합니다.
const CENTER_EMAIL = 'pluscenter4052@naver.com'
const MAX_BODY_BYTES = 8000
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const PHONE_PATTERN = /^0\d{1,2}-?\d{3,4}-?\d{4}$/

type Env = {
  EMAIL: {
    send(message: { to: string; from: string; subject: string; text: string }): Promise<{ messageId: string }>
  }
  CONSULT_FROM_ADDRESS?: string
  TURNSTILE_SECRET_KEY?: string
}

type ConsultRequest = {
  childName: string
  birthDate: string
  gender: string
  parentName: string
  phone: string
  content: string
  preferDate: string
  turnstileToken: string
}

const reply = (message: string, status: number) => Response.json({ message }, { status })

const isText = (value: unknown, max: number): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= max

function parseRequest(body: Record<string, unknown> | null): ConsultRequest | null {
  if (!body || body.privacy !== true) return null

  const { childName, birthDate, gender, parentName, phone, content, turnstileToken } = body
  const preferDate = body.preferDate ?? ''
  const valid =
    isText(childName, 50) &&
    isText(birthDate, 10) &&
    DATE_PATTERN.test(birthDate) &&
    (gender === '남' || gender === '여') &&
    isText(parentName, 50) &&
    isText(phone, 20) &&
    PHONE_PATTERN.test(phone) &&
    isText(content, 2000) &&
    isText(turnstileToken, 2048) &&
    typeof preferDate === 'string' &&
    (preferDate === '' || DATE_PATTERN.test(preferDate))

  return valid
    ? ({ childName, birthDate, gender, parentName, phone, content, preferDate, turnstileToken } as ConsultRequest)
    : null
}

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  })
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null
  return result?.success === true
}

const emailText = (form: ConsultRequest) =>
  [
    '홈페이지로 상담 신청이 접수되었습니다.',
    '',
    `아동 이름: ${form.childName}`,
    `생년월일: ${form.birthDate}`,
    `성별: ${form.gender}`,
    `보호자 이름: ${form.parentName}`,
    `연락처: ${form.phone}`,
    `희망 상담일: ${form.preferDate || '미입력'}`,
    '',
    '고민 / 상담 희망 내용:',
    form.content,
  ].join('\n')

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname !== '/api/consult') return reply('찾을 수 없습니다.', 404)
    if (request.method !== 'POST') return reply('허용되지 않는 요청입니다.', 405)
    if (request.headers.get('Origin') !== url.origin) return reply('허용되지 않는 요청입니다.', 403)

    if (!env.TURNSTILE_SECRET_KEY || !env.CONSULT_FROM_ADDRESS) {
      return reply('상담 신청을 받을 수 없습니다. 전화로 문의해 주세요.', 503)
    }

    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return reply('입력 내용이 너무 깁니다.', 413)

    let body: Record<string, unknown> | null = null
    try {
      body = JSON.parse(raw)
    } catch {
      // 아래 입력 검증에서 함께 거절합니다.
    }

    const form = parseRequest(body)
    if (!form) return reply('입력 내용을 확인해 주세요.', 400)

    const verified = await verifyTurnstile(
      form.turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get('CF-Connecting-IP'),
    )
    if (!verified) return reply('보안 확인에 실패했습니다. 다시 시도해 주세요.', 403)

    try {
      await env.EMAIL.send({
        to: CENTER_EMAIL,
        from: env.CONSULT_FROM_ADDRESS,
        subject: '[홈페이지] 상담 신청 접수',
        text: emailText(form),
      })
    } catch (error) {
      // 신청 내용은 로그에 남기지 않고 오류 코드만 기록합니다.
      console.error('consult email failed', (error as { code?: string }).code ?? 'unknown')
      return reply('신청을 전송하지 못했습니다. 전화로 문의해 주세요.', 502)
    }

    return Response.json({ ok: true })
  },
}
