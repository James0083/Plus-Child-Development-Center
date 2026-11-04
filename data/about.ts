export const history = [
  { date: '2000.1.15.', event: '우&유 아동발달 연구소' },
  { date: '2005.1.29.', event: '장애전담 어린이집 인가' },
  { date: '2005.3.2.', event: '재활플러스 어린이집 개원' },
  { date: '2012.1.2.', event: '플러스아동발달센터 오픈' },
]

export const staff = {
  total: 25,
  fields: [
    { name: '언어', count: 13 },
    { name: '인지', count: 4 },
    { name: '놀이', count: 4 },
    { name: '감각통합', count: 2 },
    { name: '미술', count: 2 },
  ],
}

export const partners = [
  { name: '재활플러스어린이집', target: '1세이상~만12세 장애아동 및 발달지연 아동' },
  { name: '생크림어린이집', target: '일반어린이집' },
  {
    name: '유캔플러스자립지원센터',
    target: '만 6세 이상 65세 미만의 「장애인복지법」상 등록 장애인이며, 소득 수준에 관계없이 신청',
  },
]

// 시설 사진 목록입니다.
export const facilities: {
  src: string
  width: number
  height: number
  name: string
  alt: string
  thumb: string
  position?: string
}[] = [
  { src: '/images/hero-bg.webp', thumb: '/images/facility/thumb/hero-bg.webp', width: 1280, height: 853, name: '건물 전경', alt: '플러스 아동발달센터 건물과 앞 주차장' },
  { src: '/images/facility/lobby.jpg', thumb: '/images/facility/thumb/lobby.webp', width: 960, height: 1280, name: '대기 공간', alt: '하늘색 문이 있는 복도와 보호자용 의자가 놓인 대기 공간' },
  { src: '/images/facility/room-1.jpg', thumb: '/images/facility/thumb/room-1.webp', width: 1280, height: 960, name: '공용 활동 공간', alt: '매트와 터널 놀이기구, 책장이 있는 넓은 실내 공간' },
  { src: '/images/facility/activity-wall.jpg', thumb: '/images/facility/thumb/activity-wall.webp', width: 960, height: 1280, name: '신체 활동 공간', alt: '로프 사다리와 클라이밍 벽, 늑목, 안전 매트가 있는 넓은 공간', position: '50% 30%' },
  { src: '/images/facility/room-2.jpg', thumb: '/images/facility/thumb/room-2.webp', width: 1280, height: 960, name: '치료실1', alt: '창가에 책상과 의자, 화이트보드가 있는 방' },
  { src: '/images/facility/room-3.jpg', thumb: '/images/facility/thumb/room-3.webp', width: 1280, height: 960, name: '치료실2', alt: '교구 책장과 아동용 책상, 놀이 매트가 있는 방' },
  { src: '/images/facility/room-4.jpg', thumb: '/images/facility/thumb/room-4.webp', width: 1280, height: 960, name: '치료실3', alt: '장난감과 책이 가득한 책장, 책상이 있는 방' },
  { src: '/images/facility/room-5.jpg', thumb: '/images/facility/thumb/room-5.webp', width: 1280, height: 960, name: '치료실4', alt: '책상과 의자, 소꿉놀이 주방과 교구장이 있는 방' },
  { src: '/images/facility/room-6.jpg', thumb: '/images/facility/thumb/room-6.webp', width: 1280, height: 960, name: '치료실5', alt: '장난감 선반과 둥근 책상, 깔개가 있는 방' },
  { src: '/images/facility/room-7.jpg', thumb: '/images/facility/thumb/room-7.webp', width: 1280, height: 960, name: '치료실6', alt: '노란 책상과 교재가 꽂힌 책장이 있는 방' },
  { src: '/images/facility/room-8.jpg', thumb: '/images/facility/thumb/room-8.webp', width: 960, height: 1280, name: '치료실7', alt: '천장 그네 틀과 균형대, 놀이 매트, 세발자전거가 있는 방' },
  { src: '/images/facility/room-9.jpg', thumb: '/images/facility/thumb/room-9.webp', width: 960, height: 1280, name: '치료실8', alt: '장난감 수납장과 책장, 아동용 책상과 의자가 있는 방' },
]
