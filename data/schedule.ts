// 월~토 공통 시간표: 1회 50분(수업 40분 + 상담 10분), 쉬는 시간 없음, 일요일 정규 수업 없음
export const sessionMinutes = 50

const firstStart = 8 * 60 + 50 // 08:50
const lastStart = 18 * 60 + 50 // 18:50

const formatTime = (minutes: number) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`
}

export const sessions = Array.from({ length: (lastStart - firstStart) / sessionMinutes + 1 }, (_, index) => {
  const start = firstStart + index * sessionMinutes
  return { start: formatTime(start), end: formatTime(start + sessionMinutes) }
})
