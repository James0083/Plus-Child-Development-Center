// 해당 연도 보건복지부 사업안내로 확인합니다.
export const vouchers = [
  {
    id: 'rehab',
    title: '발달재활바우처',
    intro: '장애아동의 인지, 의사소통, 적응행동, 감각·운동 기능 향상과 행동 발달을 지원합니다.',
    rows: [
      { label: '연령', value: '18세 미만 (신청일 기준, 18세가 되는 달까지 지원)' },
      {
        label: '소득 기준',
        value:
          '기준중위소득 180% 이하. 장애아동 2명 이상 가구, 부모 중 1명 이상이 중증장애인인 가구 등은 예외 기준이 있습니다.',
      },
      { label: '서비스', value: '언어·청능, 미술·음악, 행동·놀이·심리, 감각·운동 등 발달재활 서비스' },
    ],
  },
  {
    id: 'psychology',
    title: '우리아이심리지원바우처',
    intro: '심리·행동 문제의 조기 발견과 개입으로 아동·청소년의 건강한 성장을 지원합니다.',
    rows: [
      { label: '연령', value: '만 18세 이하 (고등학교 재학 중인 만 18세 이상 청소년 포함)' },
      { label: '소득 기준', value: '기준 중위소득 160% 이하' },
      { label: '서비스', value: '언어, 미술, 음악, 놀이, 심리 서비스' },
    ],
  },
]

export const voucherSupportNote =
  '바우처를 이용하면 비용의 약 50%를 지원받을 수 있으며, 소득에 따라 지원금이 달라집니다.'

export const voucherCommonNotes = [
  voucherSupportNote,
  '기존 이용자는 매년 2회(반기별) 소득 기준을 조사해 적합하면 계속 이용할 수 있습니다.',
]

export const voucherSteps = ['자격 기준 확인', '주민센터 또는 복지로 신청', '선정 결과 안내', '제공기관 선택 후 이용']

export const voucherApplyNote = '준비 서류와 신청 시기는 신청 전에 주민센터에서 확인해 주세요.'

// 대상과 시간은 지역과 연도에 따라 달라 이용 시간과 금액은 표시하지 않습니다.
export const otherVouchers = [
  {
    title: '청소년 발달장애인 방과후활동서비스',
    items: [
      '등록 발달장애인(지적, 자폐성 장애) 중 만 6세 이상 18세 미만이 대상이며, 만 18세 이상 재학생도 이용할 수 있습니다.',
      '방과 후 시간에 이용하는 바우처입니다.',
    ],
  },
  {
    title: '발달장애인 지원 바우처',
    items: [
      '주간활동서비스, 부모상담지원 등 발달장애인과 가족을 위한 바우처입니다.',
      '지적, 자폐성 장애 등 사업별 대상 기준을 확인해 주세요.',
    ],
  },
]

export const voucherContacts = [
  { label: '복지로', value: 'bokjiro.go.kr', href: 'https://www.bokjiro.go.kr' },
  { label: '보건복지상담센터', value: '국번 없이 129', href: 'tel:129' },
]
