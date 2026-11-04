// 상담 폼과 Worker가 함께 쓰는 입력 규칙입니다.
export const PHONE_PATTERN = /^0\d{1,2}-?\d{3,4}-?\d{4}$/

// 영문 이름의 띄어쓰기는 허용합니다.
export const NAME_PATTERN = /^[가-힣a-zA-Z]+(?: [가-힣a-zA-Z]+)*$/

export const MAX_CONTENT_LENGTH = 2000

const MAX_PHONE_DIGITS = 11

// 숫자만 남기고, 11자리가 되면 000-0000-0000 형식으로 보여 줍니다.
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS)
  return digits.length === MAX_PHONE_DIGITS ? digits.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3') : digits
}

// 입력 중인 한글 자모는 남겨야 글자를 조합할 수 있습니다.
export function sanitizeName(value: string) {
  return value
    .normalize('NFC')
    .replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z ]/g, '')
    .replace(/^ +/, '')
    .replace(/ {2,}/g, ' ')
}

// 센터 운영 기준인 한국 날짜를 YYYY-MM-DD로 반환합니다.
export function koreaToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date())
}

// 입력한 날짜 자체의 요일이므로 시간대의 영향을 받지 않게 UTC로 계산합니다.
const isSunday = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay() === 0

// 문제가 없으면 null을 반환합니다.
export function preferDateError(date: string) {
  if (!date) return null
  if (date < koreaToday()) return '희망 상담일은 지난 날짜일 수 없습니다.'
  if (isSunday(date)) return '일요일은 휴무입니다. 다른 날짜를 선택해 주세요.'
  return null
}
