export type ProgramColor = 'primary' | 'mint' | 'accent'

// [DUMMY] targets, activities, session은 실제 운영 내용으로 교체합니다.
export const programs: {
  id: string
  icon: string
  title: string
  desc: string
  color: ProgramColor
  target: string
  targets: string[]
  activities: string[]
  session: string
}[] = [
  {
    id: 'language',
    icon: '💬',
    title: '언어치료',
    desc: '언어 발달 지연, 조음 장애, 언어 이해 및 표현 문제를 가진 아동을 위한 1:1 맞춤 치료입니다.',
    color: 'primary',
    target: '만 1~12세',
    targets: [
      '또래보다 말이 늦거나 사용하는 어휘가 적은 아이',
      '발음이 부정확해 알아듣기 어려운 아이',
      '말을 더듬거나 말의 흐름이 자주 끊기는 아이',
      '질문을 이해하거나 대화를 이어가기 어려워하는 아이',
    ],
    activities: ['언어 이해·표현 훈련', '조음 및 발음 교정', '상황별 대화 연습', '가정 내 언어 자극 안내'],
    session: '1회 50분 (치료 40분 + 부모 상담 10분)',
  },
  {
    id: 'play',
    icon: '🎮',
    title: '놀이치료',
    desc: '놀이를 매개로 아동의 정서적 어려움, 행동 문제, 사회성 발달을 돕는 심리치료입니다.',
    color: 'mint',
    target: '만 2~12세',
    targets: [
      '불안이 높거나 부모와 떨어지기 힘들어하는 아이',
      '감정 조절이 어려워 자주 떼를 쓰거나 공격적인 아이',
      '또래와 어울리는 데 어려움을 겪는 아이',
      '가족 변화 등으로 위축되거나 스트레스를 받는 아이',
    ],
    activities: ['자유 놀이를 통한 감정 표현', '역할 놀이', '규칙이 있는 놀이로 조절력 연습', '부모-자녀 상호작용 코칭'],
    session: '1회 50분 (치료 40분 + 부모 상담 10분)',
  },
  {
    id: 'cognitive',
    icon: '🧠',
    title: '인지치료',
    desc: '주의집중, 기억력, 문제해결 능력 등 인지 발달을 체계적인 커리큘럼으로 향상시킵니다.',
    color: 'primary',
    target: '만 3~12세',
    targets: [
      '한 가지 활동에 집중하는 시간이 짧은 아이',
      '지시를 기억하고 순서대로 따르기 어려워하는 아이',
      '기초 학습 준비에 어려움을 보이는 아이',
      '문제 상황에서 해결 방법을 찾기 힘들어하는 아이',
    ],
    activities: ['주의집중 훈련', '작업 기억 활동', '수·글자 기초 개념 학습', '문제해결 전략 연습'],
    session: '1회 50분 (치료 40분 + 부모 상담 10분)',
  },
  {
    id: 'occupational',
    icon: '✋',
    title: '작업치료(감각통합)',
    desc: '감각처리 문제, 소근육 발달, 일상생활 기술 훈련을 전문 도구와 함께 진행합니다.',
    color: 'mint',
    target: '만 1~10세',
    targets: [
      '소리나 촉감 등 특정 감각에 예민하거나 둔감한 아이',
      '자주 넘어지거나 움직임이 서툰 아이',
      '가위질, 쓰기, 단추 잠그기 등 손 사용이 어려운 아이',
      '식사나 옷 입기 등 일상 활동을 혼자 하기 어려운 아이',
    ],
    activities: ['감각통합 놀이', '대·소근육 협응 활동', '일상생활 기술 훈련', '가정 환경 조정 안내'],
    session: '1회 50분 (치료 40분 + 부모 상담 10분)',
  },
  {
    id: 'arts',
    icon: '🎨',
    title: '미술·음악치료',
    desc: '창의적 표현 활동을 통해 정서 조절, 자기표현, 사회적 상호작용을 증진합니다.',
    color: 'accent',
    target: '만 4~12세',
    targets: [
      '말로 감정을 표현하기 어려워하는 아이',
      '자신감이 낮고 새로운 활동을 꺼리는 아이',
      '정서적으로 긴장하거나 쉽게 위축되는 아이',
      '함께하는 활동에서 순서와 역할을 익혀야 하는 아이',
    ],
    activities: ['그리기·만들기 표현 활동', '악기 연주와 리듬 활동', '노래를 활용한 감정 표현', '짝·소그룹 협동 작품'],
    session: '1회 50분 (치료 40분 + 부모 상담 10분)',
  },
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: '부모상담',
    desc: '자녀 양육 방법, 가정에서의 치료 연계, 부모의 심리적 지지를 위한 전문 상담입니다.',
    color: 'primary',
    target: '자녀를 둔 부모',
    targets: [
      '아이의 발달이 또래와 다른 것 같아 걱정되는 부모',
      '문제 행동에 어떻게 반응해야 할지 고민인 부모',
      '치료 내용을 가정에서 이어가고 싶은 부모',
      '양육 스트레스로 지지가 필요한 부모',
    ],
    activities: ['발달 수준과 치료 경과 설명', '가정 연계 활동 안내', '행동 대처 방법 상담', '양육 스트레스 상담'],
    session: '1회 50분 (부모 단독 상담)',
  },
]

export const programIconBg: Record<ProgramColor, string> = {
  primary: 'bg-primary/10',
  mint: 'bg-mint/15',
  accent: 'bg-accent/10',
}
