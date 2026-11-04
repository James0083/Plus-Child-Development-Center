export const PHONE = process.env.NEXT_PUBLIC_PHONE || '031-763-4052'
export const TEL_HREF = `tel:${PHONE.replace(/[^0-9+]/g, '')}`

// 카카오 채널 링크를 받기 전까지는 비워 두고, 버튼 대신 채널 이름을 안내합니다.
export const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO ?? ''
export const KAKAO_CHANNEL_NAME = '플러스아동발달센터'

export const DIRECTOR_NAME = '우혜주'
export const DIRECTOR_TITLE = '센터장'
const ADDRESS = '경기 광주시 광주역8로 20'

export const centerInfo = {
  name: '플러스 아동발달센터',
  address: ADDRESS,
  phone: PHONE,
  hours: {
    regular: '월~토 09:00 ~ 20:00',
    sunday: '일요일 휴무',
  },
  kakao: KAKAO_URL,
}

export const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(ADDRESS)}`

export const footerInfo = {
  name: centerInfo.name,
  director: DIRECTOR_NAME,
  bizNo: '126-91-88155',
  address: ADDRESS,
  phone: PHONE,
  email: 'pluscenter4052@naver.com',
}

export const PRIVACY_RETENTION = '상담 완료 후 1년' // [DUMMY] 실제 보관 정책 확정 후 교체

// 메일 전송을 시험한 뒤에만 켭니다. 꺼져 있으면 전화와 카카오 채널로만 안내합니다.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
export const CONSULT_FORM_ENABLED =
  process.env.NEXT_PUBLIC_CONSULT_FORM_ENABLED === 'true' && TURNSTILE_SITE_KEY !== ''
