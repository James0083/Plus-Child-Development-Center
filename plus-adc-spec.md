# 플러스 아동발달센터 — 홈페이지 시안 구현 명세서

> 이 문서는 Claude Code에서 Next.js + Tailwind CSS로 홈페이지 시안을 구현할 때 사용하는 실무 명세입니다.  
> ⚠️ 더미 데이터로 채워진 항목은 `[DUMMY]` 표시. 실제 데이터 수령 후 교체 필요.  
> 센터 연락처, 인사말, 연혁, 인력, 협력기관의 실제 값은 `lib/constants.ts`, `data/history.ts`, `app/about/page.tsx`가 기준이며, 이 문서의 해당 예시는 초기 더미입니다.

---

## 1. 기술 스택

| 영역 | 선택 | 버전 |
|------|------|------|
| 런타임 | Node.js | 26.x (LTS) |
| 프레임워크 | Next.js (App Router) | 16.x |
| UI 라이브러리 | React | 19.x |
| 스타일링 | Tailwind CSS | 4.x (Safari 16.4+, Chrome 111+, Firefox 128+) |
| 폰트 | next/font (Google Fonts) | — |
| 아이콘 | lucide-react | 최신 |
| 애니메이션 | framer-motion | 14.x |
| 폼 | react-hook-form | 7.x |
| 지도 | 네이버 지도 링크 패널 (iframe 삽입 불가) | — |
| 배포 | Cloudflare Workers 무료 플랜 (정적 파일 + 상담 폼 Worker) | — |

---

## 2. 디자인 토큰

```css
/* app/globals.css */
@theme {
  --breakpoint-xl: 75rem; /* 1200px. 기본 중단점과 같은 rem 단위 사용 */

  --color-primary: #3b82c4;
  --color-primary-light: #5b9dd4;
  --color-primary-dark: #2c6faf;

  --color-mint: #4db8a0;
  --color-mint-light: #6ecbb6;

  --color-accent: #f47b20; /* CTA 오렌지 */
  --color-cream: #fafafa;  /* 배경 */
  --color-ink: #333333;    /* 본문 */
  --color-muted: #6b7280;  /* 보조 텍스트 */
}
```

**폰트**
```js
// app/layout.tsx
import { Noto_Sans_KR } from 'next/font/google'
const noto = Noto_Sans_KR({ subsets: ['latin'], weight: ['300','400','600','700'] })
```

**타입 스케일**
| 역할 | 클래스 |
|------|--------|
| H1 (Hero) | `text-4xl lg:text-5xl font-bold` |
| H2 (섹션 제목) | `text-2xl lg:text-3xl font-semibold` |
| H3 (카드 제목) | `text-lg font-semibold` |
| 본문 | `text-base font-normal` |
| 보조 | `text-sm font-light text-muted` |

---

## 3. 프로젝트 구조

```
app/
├── layout.tsx          # 글로벌 레이아웃 (Nav + Footer + FloatingCTA)
├── page.tsx            # 홈 (메인)
├── about/
│   └── page.tsx        # 센터 소개
├── programs/
│   └── page.tsx        # 프로그램 안내
├── activities/
│   └── page.tsx        # 활동 안내 (방과후 활동, 주간활동). 전문가 소개는 숨김 처리
├── consult/
│   └── page.tsx        # 상담 신청
├── notice/
│   └── page.tsx        # 공지사항
└── privacy/
    └── page.tsx        # 개인정보처리방침

components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── FloatingCTA.tsx
├── home/
│   ├── HeroBanner.tsx
│   ├── StatsSection.tsx
│   ├── ProgramCards.tsx
│   ├── TimetableSection.tsx
│   ├── MapSection.tsx
│   └── QuickConsult.tsx
├── programs/
│   └── ProgramTab.tsx
├── experts/
│   ├── ExpertCard.tsx
│   └── ExpertModal.tsx
├── consult/
│   └── ConsultForm.tsx
└── ui/
    ├── Button.tsx
    ├── SectionTitle.tsx
    └── Badge.tsx
```

---

## 4. 컴포넌트별 구현 명세

### 4-1. Navbar

- **레이아웃**: 상단 고정 (`sticky top-0 z-50`), 흰 배경, 하단 그림자
- **좌측**: 로고 텍스트 `[DUMMY] 플러스+` (실제 로고 이미지 교체 예정)
- **우측 메뉴**: 센터 소개 / 프로그램 안내 / 활동 안내 / 상담 신청 / 공지사항
- **모바일**: 햄버거 메뉴 → 풀스크린 드로어

```tsx
const navItems = [
  { label: '센터 소개',   href: '/about' },
  { label: '프로그램 안내', href: '/programs' },
  { label: '활동 안내', href: '/activities' },
  { label: '상담 신청',   href: '/consult', highlight: true },
  { label: '공지사항',   href: '/notice' },
]
```

---

### 4-2. HeroBanner (`app/page.tsx` 상단)

- **배경**: 센터 건물 사진 `/images/hero-bg.jpg` (덮개 없음). 위쪽 간판이 보이도록 사진 상단 기준으로 맞추고, 문구는 하단에 글자 그림자와 함께 배치
- **텍스트 (더미)**:
  ```
  H1: "아이의 가능성을
       함께 키워갑니다"
  Sub: "전문 치료사와 함께하는 1:1 맞춤 아동발달 프로그램으로
        우리 아이의 건강한 성장을 지원합니다."
  ```
- **CTA 버튼 2개**:
  - Primary (오렌지): `상담 신청하기` → `/consult`
  - Secondary (흰 테두리): `전화 연결` → `tel:031-000-0000 [DUMMY]`
- **애니메이션**: framer-motion `fadeInUp` (텍스트, 버튼 순차적)

---

### 4-3. StatsSection

```tsx
const stats = [
  { icon: 'BookOpen', value: '6가지', label: '치료 프로그램' },
  { icon: 'Users',    value: '8명+',  label: '전문 치료사' },    // [DUMMY]
  { icon: 'Heart',    value: '500+',  label: '누적 상담 건수' }, // [DUMMY]
  { icon: 'Award',    value: '10년+', label: '센터 운영 경력' }, // [DUMMY]
]
```

- 배경: `bg-primary text-white`
- 레이아웃: 4열 그리드 (모바일 2열)
- 숫자: `text-4xl font-bold`

---

### 4-4. ProgramCards

```tsx
const programs = [
  {
    id: 'language',
    icon: '💬',
    title: '언어치료',
    desc: '언어 발달 지연, 조음 장애, 언어 이해 및 표현 문제를 가진 아동을 위한 1:1 맞춤 치료입니다.',
    color: 'primary',
    target: '만 1~12세',
  },
  {
    id: 'play',
    icon: '🎮',
    title: '놀이치료',
    desc: '놀이를 매개로 아동의 정서적 어려움, 행동 문제, 사회성 발달을 돕는 심리치료입니다.',
    color: 'mint',
    target: '만 2~12세',
  },
  {
    id: 'cognitive',
    icon: '🧠',
    title: '인지치료',
    desc: '주의집중, 기억력, 문제해결 능력 등 인지 발달을 체계적인 커리큘럼으로 향상시킵니다.',
    color: 'primary',
    target: '만 3~12세',
  },
  {
    id: 'occupational',
    icon: '✋',
    title: '작업치료(감각통합)',
    desc: '감각처리 문제, 소근육 발달, 일상생활 기술 훈련을 전문 도구와 함께 진행합니다.',
    color: 'mint',
    target: '만 1~10세',
  },
  {
    id: 'arts',
    icon: '🎨',
    title: '미술·음악치료',
    desc: '창의적 표현 활동을 통해 정서 조절, 자기표현, 사회적 상호작용을 증진합니다.',
    color: 'accent',
    target: '만 4~12세',
  },
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: '부모상담',
    desc: '자녀 양육 방법, 가정에서의 치료 연계, 부모의 심리적 지지를 위한 전문 상담입니다.',
    color: 'primary',
    target: '자녀를 둔 부모',
  },
]
```

- **레이아웃**: 3열 그리드 (태블릿 2열, 모바일 1열)
- **카드 호버**: `scale-105 shadow-lg` 트랜지션
- **"자세히 보기" 링크**: `/programs#${id}`

---

### 4-5. MapSection

```tsx
const centerInfo = {
  name: '플러스 아동발달센터',
  address: '[DUMMY] 경기도 성남시 분당구 판교로 123, 2층 201호',
  phone: '[DUMMY] 031-000-0000',
  hours: {
    regular: '월~토 08:50 ~ 19:40',
    sunday: '일요일 정규 수업 없음',
    holiday: '공휴일 휴무', // [DUMMY]
  },
  kakao: '[DUMMY] https://pf.kakao.com/_xxxxx',
  naverPlaceId: '20724877',
}
```

- **지도**: 주소와 "네이버 지도에서 보기" 버튼이 있는 링크 패널 (`https://map.naver.com/p/entry/place/20724877`)
  > ⚠️ `map.naver.com`은 `X-Frame-Options: DENY`로 iframe 삽입을 차단하므로 실제 Next.js 빌드에서도 표시되지 않음. 페이지 안에 지도를 직접 표시하려면 API 키를 발급받아 네이버 지도 API를 연동해야 함.
- **레이아웃**: 지도 60% + 정보 패널 40% (모바일 스택)
- **정보 패널**: 주소 / 전화 / 운영시간 / 카카오 채널 버튼

---

### 4-6. FloatingCTA

```tsx
// 우하단 고정, 펼쳐지는 스피드다이얼
const ctaItems = [
  { icon: 'Phone',        label: '전화 연결',    action: 'tel:[DUMMY]031-000-0000' },
  { icon: 'MessageCircle', label: '카카오 상담',  action: '[DUMMY]https://pf.kakao.com/_xxxxx' },
  { icon: 'ClipboardList', label: '온라인 상담 신청', action: '/consult' },
]
```

- 버튼 색상: 오렌지 (`bg-accent`)
- 펼침 방향: 위쪽
- 닫기: 외부 클릭 또는 ESC

---

### 4-7. 전문가 소개 (더미 데이터, 현재 숨김)

> `app/activities/page.tsx`의 `showExperts`를 `true`로 바꾸면 다시 표시됩니다.

```tsx
const experts = [
  {
    id: 1,
    name: '[DUMMY] 김지수',
    title: '언어치료사 (1급)',
    photo: '/images/expert-1.jpg', // placeholder
    specialties: ['언어 발달 지연', '조음 장애', '다문화 아동'],
    career: [
      '[DUMMY] ○○대학교 언어치료학과 졸업',
      '[DUMMY] 전) 서울아동발달센터 언어치료사 (5년)',
      '[DUMMY] 언어재활사 1급 자격 보유',
    ],
    certs: ['언어재활사 1급', '보조공학사'],
  },
  {
    id: 2,
    name: '[DUMMY] 박민준',
    title: '작업치료사 (감각통합 전문)',
    photo: '/images/expert-2.jpg',
    specialties: ['감각통합 장애', 'ADHD', '발달 지연'],
    career: [
      '[DUMMY] ○○대학교 작업치료학과 졸업',
      '[DUMMY] 전) 대학병원 소아재활센터 (7년)',
      '[DUMMY] 감각통합 전문가 과정 수료',
    ],
    certs: ['작업치료사', '감각통합 인증 치료사'],
  },
  {
    id: 3,
    name: '[DUMMY] 이수연',
    title: '놀이치료사 (심리상담사)',
    photo: '/images/expert-3.jpg',
    specialties: ['분리 불안', '정서 행동 장애', '사회성 발달'],
    career: [
      '[DUMMY] ○○대학원 아동심리치료학과 석사',
      '[DUMMY] 전) 아동가족상담센터 (4년)',
      '[DUMMY] 아동심리상담사 1급',
    ],
    certs: ['놀이치료사 1급', '아동심리상담사 1급'],
  },
]
```

- **그리드**: 3열 (모바일 1열)
- **카드**: 프로필 사진 (플레이스홀더 SVG) + 이름 + 직함 + 전문 분야 배지
- **모달**: 클릭 시 전체 경력·자격증 팝업 (`dialog` 요소)

---

### 4-8. ConsultForm (메일 전송 확인 전까지 숨김)

> 신청 내용은 `worker/index.ts`가 Turnstile 검증 후 `pluscenter4052@naver.com`으로만 전송합니다. `NEXT_PUBLIC_CONSULT_FORM_ENABLED=true`일 때 표시합니다.

```tsx
// 필드 목록
const fields = [
  { name: 'childName',   label: '아동 이름',  type: 'text',   required: true },
  { name: 'birthDate',   label: '생년월일',   type: 'date',   required: true },
  { name: 'gender',      label: '성별',       type: 'radio',  options: ['남', '여'], required: true },
  { name: 'parentName',  label: '보호자 이름', type: 'text',   required: true },
  { name: 'phone',       label: '연락처',     type: 'tel',    required: true },
  { name: 'content',     label: '고민 / 상담 희망 내용', type: 'textarea', required: true, rows: 5 },
  { name: 'preferDate',  label: '희망 상담일', type: 'date',   required: false },
  { name: 'privacy',     label: '개인정보 수집·이용 동의 (필수)', type: 'checkbox', required: true },
]
```

**제출 후 동작**: 성공 메시지 표시 (실제 서버 연결 전까지 `onSubmit` → `console.log` + 성공 UI)

```tsx
// 성공 메시지 (더미)
'상담 신청이 완료되었습니다.\n영업일 기준 1~2일 내로 연락드리겠습니다. 감사합니다.'
```

---

### 4-9. 공지사항 (더미 데이터)

```tsx
const notices = [
  { id: 1, title: '[공지] 2026년 추석 휴원 안내',         date: '2026-09-10', category: '휴원' },
  { id: 2, title: '[소식] 감각통합치료실 리모델링 완료',    date: '2026-08-20', category: '소식' },
  { id: 3, title: '[공지] 발달재활서비스 바우처 안내',      date: '2026-08-05', category: '바우처' },
  { id: 4, title: '[이벤트] 신규 등록 아동 초회 할인 이벤트', date: '2026-07-15', category: '이벤트' },
  { id: 5, title: '[공지] 2026년 하반기 운영시간 변경 안내', date: '2026-07-01', category: '공지' },
]
```

---

### 4-10. Footer

```tsx
const footerInfo = {
  name: '플러스 아동발달센터',
  ceo: '[DUMMY] 홍길동',
  bizNo: '[DUMMY] 123-45-67890',
  address: '[DUMMY] 경기도 성남시 분당구 판교로 123, 2층 201호',
  phone: '[DUMMY] 031-000-0000',
  email: '[DUMMY] hello@plus-adc.co.kr',
  copyright: `© ${new Date().getFullYear()} 플러스 아동발달센터. All rights reserved.`,
}
```

---

### 4-11. TimetableSection

- **위치**: 홈, ProgramCards와 MapSection 사이
- **시간 구성**: 월~토 공통, 08:50 시작, 1회 50분(수업 40분 + 상담 10분), 쉬는 시간 없음, 마지막 회기 18:50~19:40 (총 13회기). 일요일 정규 수업 없음
- **데이터**: `data/schedule.ts`
- **레이아웃**: 요일과 프로그램 없이 회기와 시간 2열 표로 표시

---

### 4-12. 보강 콘텐츠 (더미 데이터)

| 위치 | 내용 | 데이터 |
|------|------|--------|
| `/programs` 탭 | 도움이 되는 경우, 주요 활동, 회기 구성(치료 40분 + 부모 상담 10분) | `data/programs.ts` |
| `/programs` 하단 | 발달재활서비스 바우처 안내 (금액은 표시하지 않음) | `data/voucher.ts` |
| `/consult` | 상담 진행 5단계, 자주 묻는 질문 | `data/consult.ts` |
| `/about` 시설 안내 | 치료실 6종 설명 | `data/history.ts` |
| `/activities` | 방과후 활동, 주간활동 | `data/activities.ts` |
| 전문가 소개 (숨김) | 인지치료사, 미술·음악치료사 추가 (총 5명) | `data/experts.ts` |
| `/notice` | 모집, 정보 유형 추가 (총 9건) | `data/notices.ts` |
| 홈 오시는 길 | 교통 안내, 편의시설 | `lib/constants.ts` |

---

## 5. 센터 소개 페이지 (`/about`)

### 원장 인사말 (더미)

```
안녕하세요, 플러스 아동발달센터 원장 [DUMMY] 홍길동입니다.

아이의 발달에 대한 걱정으로 이곳을 찾아오신 부모님께 진심으로 감사드립니다.
저희 센터는 "모든 아이는 각자의 속도로 성장한다"는 믿음 아래,
각 아동의 강점을 발견하고 어려움을 함께 해결해 나가는 것을 목표로 합니다.

언어치료, 놀이치료, 작업치료, 인지치료, 미술·음악치료 등
다양한 전문 프로그램을 통해 아이가 일상에서 행복하게 성장할 수 있도록
최선을 다하겠습니다.

[DUMMY] 언어재활사 1급 · 홍길동 원장
```

### 핵심 가치 (더미)

```tsx
const values = [
  { icon: '🤝', title: '신뢰',     desc: '부모님과 함께 투명하게 소통합니다.' },
  { icon: '🎯', title: '전문성',   desc: '자격을 갖춘 치료사가 근거 기반으로 치료합니다.' },
  { icon: '❤️', title: '따뜻함',   desc: '아이와 가족을 진심으로 돌봅니다.' },
  { icon: '🌱', title: '성장 지향', desc: '작은 변화도 함께 기뻐하고 지속적으로 발전합니다.' },
]
```

### 연혁 타임라인 (더미)

```tsx
const history = [
  { year: '[DUMMY] 2015', event: '플러스 아동발달센터 설립' },
  { year: '[DUMMY] 2017', event: '언어치료실 2호 확장' },
  { year: '[DUMMY] 2019', event: '발달재활서비스 바우처 기관 등록' },
  { year: '[DUMMY] 2021', event: '감각통합치료실 신설' },
  { year: '[DUMMY] 2023', event: '누적 상담 500건 달성' },
  { year: '[DUMMY] 2025', event: '홈페이지 리뉴얼 오픈' },
]
```

---

## 6. 플레이스홀더 이미지 처리

실제 이미지 없이 시안 제작 시:

```tsx
// 프로필 사진 플레이스홀더
<div className="w-32 h-32 rounded-full bg-primary-light flex items-center justify-center">
  <User className="w-16 h-16 text-white" />
</div>

// 시설 사진 플레이스홀더
<div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
  <ImageIcon className="w-12 h-12 text-gray-400" />
  <span className="text-gray-400 ml-2">시설 사진</span>
</div>
```

---

## 7. 반응형 Breakpoint 적용 규칙

| 구간 | Tailwind prefix | 주요 레이아웃 변화 |
|------|-----------------|-------------------|
| 모바일 (`< 768px`) | (기본) | 1열, 햄버거 메뉴, 스택 레이아웃 |
| 태블릿 (`768px ~`) | `md:` | 2열 그리드, 사이드바 표시 |
| 데스크탑 (`1200px ~`) | `xl:` | 3열 그리드, 전체 Navbar |

---

## 8. 시안 제작 순서 (Claude Code 작업 순서 권장)

1. Node.js 26 환경에서 `npx create-next-app@16 plus-adc --typescript --tailwind --app`
2. `app/globals.css`의 `@theme`에 색상 토큰 추가
3. `layout.tsx` (Navbar + Footer + FloatingCTA)
4. `app/page.tsx` (홈 전체 조립)
5. `/about`, `/programs`, `/activities` 순서로 정적 페이지
6. `/consult` 폼 페이지
7. `/notice` 목록 페이지
8. 반응형 QA (375px / 768px / 1440px)

---

## 9. 교체 필요 항목 체크리스트

| 항목 | 현재 상태 | 교체 방법 |
|------|-----------|-----------|
| 대표 전화 | `031-000-0000` | `.env.local` → `NEXT_PUBLIC_PHONE` |
| 주소 | 더미 주소 | `lib/constants.ts` 에서 일괄 변경 |
| 원장 이름 | `홍길동` | 동일 |
| 직원 프로필 | 더미 3명 | `data/experts.ts` 교체 |
| 프로필 사진 | SVG 플레이스홀더 | `public/images/` 에 실제 사진 |
| 로고 | 텍스트 "플러스+" | `public/logo.svg` |
| 설립 연혁 | 더미 연도/이벤트 | `data/history.ts` 교체 |
| 카카오 채널 | 더미 URL | `.env.local` → `NEXT_PUBLIC_KAKAO` |
| 사업자번호 | `123-45-67890` | `lib/constants.ts` |
| 공지사항 | 더미 5건 | Supabase `notices` 테이블 연결 |
| 프로그램 상세 | 더미 대상·활동·회기 | `data/programs.ts` 교체 |
| 방과후 활동·주간활동 | 더미 대상·활동 | 최신 정부 지침 확인 후 `data/activities.ts` 교체 |
| 바우처 안내 | 일반 안내 초안 | 최신 정부 지침 확인 후 `data/voucher.ts` 교체 |
| 상담 절차·FAQ | 더미 | `data/consult.ts` 교체 |
| 시설 안내 | 더미 치료실 6종 | `data/history.ts`, 실제 사진 교체 |
| 교통·편의시설 | 더미 | `lib/constants.ts` |
