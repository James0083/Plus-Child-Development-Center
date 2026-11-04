// 상담 폼과 Worker가 함께 쓰는 입력 규칙입니다.
export const PHONE_PATTERN = /^0\d{1,2}-?\d{3,4}-?\d{4}$/

// 영문 이름의 띄어쓰기는 허용합니다.
export const NAME_PATTERN = /^[가-힣a-zA-Z]+(?: [가-힣a-zA-Z]+)*$/

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
