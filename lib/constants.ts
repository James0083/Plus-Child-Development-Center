export const PHONE = process.env.NEXT_PUBLIC_PHONE || '031-763-4052'
export const TEL_HREF = `tel:${PHONE.replace(/[^0-9+]/g, '')}`

export const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO || 'https://pf.kakao.com/_tMxoxgn'

// 센터장이 사업자 대표와 개인정보 보호책임자를 겸합니다.
export const DIRECTOR_NAME = '우혜주'
export const DIRECTOR_TITLE = '센터장'
const ADDRESS = '경기 광주시 광주역8로 20'
const ADDRESS_LOT = '경기 광주시 역동 358-4'

export const centerInfo = {
  name: '플러스 아동발달센터',
  address: ADDRESS,
  addressLot: ADDRESS_LOT,
  phone: PHONE,
  parking: '건물 앞 주차 가능. 주차장 있음.',
  hours: {
    regular: '월~토 08:50 ~ 19:40',
    closed: '일요일·공휴일 휴무',
  },
  kakao: KAKAO_URL,
}

export const NAVER_MAP_URL = 'https://naver.me/FsoR15aq'

export const footerInfo = {
  name: centerInfo.name,
  director: DIRECTOR_NAME,
  bizNo: '126-91-88155',
  address: ADDRESS,
  addressLot: ADDRESS_LOT,
  phone: PHONE,
  email: 'pluscenter4052@naver.com',
}

export const PRIVACY_RETENTION = '상담 완료 후 1년' // [DUMMY] 실제 보관 정책 확정 후 교체

// 메일 전송을 시험한 뒤에만 켭니다. 꺼져 있으면 전화와 카카오 채널로만 안내합니다.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
export const CONSULT_FORM_ENABLED =
  process.env.NEXT_PUBLIC_CONSULT_FORM_ENABLED === 'true' && TURNSTILE_SITE_KEY !== ''
