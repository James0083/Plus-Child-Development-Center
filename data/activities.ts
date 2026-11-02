// [DUMMY] 실제 운영 내용으로 교체합니다. 대상과 이용 시간은 공개 전 최신 정부 지침으로 확인합니다.
export const activities: {
  id: string
  title: string
  target: string
  desc: string
  items: string[]
  tone: 'primary' | 'mint'
}[] = [
  {
    id: 'after-school',
    title: '방과후 활동',
    target: '학령기 발달장애 학생',
    desc: '방과 후 시간을 안전하고 의미 있게 보낼 수 있도록 소그룹으로 진행하는 활동입니다.',
    items: ['자기표현과 또래 관계 활동', '일상생활 기술 연습', '미술·음악·신체 활동', '지역사회 체험'],
    tone: 'primary',
  },
  {
    id: 'day-activity',
    title: '주간활동',
    target: '성인 발달장애인',
    desc: '낮 시간 동안 지역사회 안에서 관심사를 찾고 자립 역량을 키우는 소그룹 활동입니다.',
    items: ['직업 탐색과 사전 체험', '자립 생활 기술 훈련', '문화·여가 활동', '건강 관리와 신체 활동'],
    tone: 'mint',
  },
]

export const activityNote =
  '이용 자격과 시간은 주소지 주민센터나 복지로에서 확인할 수 있으며, 센터 상담으로도 안내해 드립니다.'
