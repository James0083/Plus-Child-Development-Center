// [DUMMY] 이 파일의 값은 실제 센터 정보 수령 후 일괄 교체합니다.
export const PHONE = process.env.NEXT_PUBLIC_PHONE || '031-000-0000'
export const TEL_HREF = `tel:${PHONE.replace(/[^0-9+]/g, '')}`
export const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO || 'https://pf.kakao.com/_xxxxx'

export const DIRECTOR_NAME = '홍길동' // [DUMMY]
export const DIRECTOR_TITLE = '언어재활사 1급' // [DUMMY]
const ADDRESS = '경기도 성남시 분당구 판교로 123, 2층 201호' // [DUMMY]

export const centerInfo = {
  name: '플러스 아동발달센터',
  address: ADDRESS,
  directions: '신분당선 판교역 1번 출구 도보 5분', // [DUMMY]
  amenities: ['예약제 운영', '주차 가능', '무선 인터넷', '장애인 편의시설'], // [DUMMY]
  phone: PHONE,
  hours: {
    regular: '월~토 08:50 ~ 19:40',
    sunday: '일요일 정규 수업 없음',
    holiday: '공휴일 휴무', // [DUMMY] 공휴일 운영 여부 확인 필요
  },
  kakao: KAKAO_URL,
  naverPlaceId: '20724877',
}

export const NAVER_MAP_URL = `https://map.naver.com/p/entry/place/${centerInfo.naverPlaceId}`

export const footerInfo = {
  name: centerInfo.name,
  ceo: DIRECTOR_NAME,
  bizNo: '123-45-67890', // [DUMMY]
  address: ADDRESS,
  phone: PHONE,
  email: 'hello@plus-adc.co.kr', // [DUMMY]
}

export const PRIVACY_RETENTION = '상담 완료 후 1년' // [DUMMY] 실제 보관 정책 확정 후 교체
