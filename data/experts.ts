// [DUMMY] 이름·경력은 실제 직원 프로필로 교체합니다.
export type Expert = {
  id: number
  name: string
  title: string
  photo: string
  specialties: string[]
  career: string[]
  certs: string[]
}

export const experts: Expert[] = [
  {
    id: 1,
    name: '김지수',
    title: '언어치료사 (1급)',
    photo: '/images/expert-1.jpg', // placeholder
    specialties: ['언어 발달 지연', '조음 장애', '다문화 아동'],
    career: [
      '○○대학교 언어치료학과 졸업',
      '전) 서울아동발달센터 언어치료사 (5년)',
      '언어재활사 1급 자격 보유',
    ],
    certs: ['언어재활사 1급', '보조공학사'],
  },
  {
    id: 2,
    name: '박민준',
    title: '작업치료사 (감각통합 전문)',
    photo: '/images/expert-2.jpg', // placeholder
    specialties: ['감각통합 장애', 'ADHD', '발달 지연'],
    career: [
      '○○대학교 작업치료학과 졸업',
      '전) 대학병원 소아재활센터 (7년)',
      '감각통합 전문가 과정 수료',
    ],
    certs: ['작업치료사', '감각통합 인증 치료사'],
  },
  {
    id: 3,
    name: '이수연',
    title: '놀이치료사 (심리상담사)',
    photo: '/images/expert-3.jpg', // placeholder
    specialties: ['분리 불안', '정서 행동 장애', '사회성 발달'],
    career: [
      '○○대학원 아동심리치료학과 석사',
      '전) 아동가족상담센터 (4년)',
      '아동심리상담사 1급',
    ],
    certs: ['놀이치료사 1급', '아동심리상담사 1급'],
  },
  {
    id: 4,
    name: '정하늘',
    title: '인지치료사 (학습 발달)',
    photo: '/images/expert-4.jpg', // placeholder
    specialties: ['주의력 저하', '학습 준비', '경계선 지능'],
    career: [
      '○○대학원 특수교육학과 석사',
      '전) 아동발달연구소 인지치료사 (6년)',
      '초등 저학년 학습 지원 프로그램 운영',
    ],
    certs: ['인지학습치료사', '특수교사 2급'],
  },
  {
    id: 5,
    name: '최유진',
    title: '미술·음악치료사',
    photo: '/images/expert-5.jpg', // placeholder
    specialties: ['정서 표현', '자기조절', '소그룹 사회성'],
    career: [
      '○○대학원 예술치료학과 석사',
      '전) 지역 아동복지관 예술치료 강사 (5년)',
      '사회성 소그룹 프로그램 운영',
    ],
    certs: ['미술심리상담사 1급', '음악중재전문가'],
  },
]
