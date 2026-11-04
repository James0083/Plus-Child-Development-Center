# 플러스 아동발달센터 디자인 시스템

사이트의 시각 기준을 정리한 문서입니다. 값은 `styles/`에 있고, 공통 부품은 `components/ui/`에 있습니다.

## 파일 구조

| 위치 | 역할 |
| --- | --- |
| `styles/tokens.css` | 색과 중단점 |
| `styles/utilities.css` | 공통 스타일 `card`, `heading-section` |
| `styles/animations.css` | 메인 첫 화면 효과 |
| `app/globals.css` | 위 파일을 불러오고 전역 기본값을 정함 |
| `components/ui/` | `Button`, `Badge`, `Section`, `SectionTitle`, `BulletList`, `Lightbox` |
| `public/logo/` | 로고 원본 (SVG, PNG) |

## 로고

- 파일: `logo.svg`, `logo.png`, `logo-symbol.svg`, `logo-symbol.png`. 파비콘은 `app/icon.svg`입니다.
- 심볼의 선 굵기는 모두 같게 유지합니다.
- 로고 색은 바꾸지 않습니다.

## 색

로고의 파랑, 초록, 주황에서 가져왔습니다. 비율은 바탕 60%, 메인 25%, 서브 10%, 행동 버튼 5%를 기준으로 합니다.

| 역할 | 토큰 | 값 | 쓰는 곳 | 대비 |
| --- | --- | --- | --- | --- |
| 메인 | `primary` | `#2F5496` | 링크, 현재 메뉴, 하단 상담 영역 | 흰 글자 7.42:1 |
| 메인 연한 색 | `primary-soft` | `#EEF2F9` | 수치 영역, 안내 상자 | 파랑 글자 6.61:1 |
| 메인 중간 색 | `primary-light` | `#5F7FB8` | 장식 면과 선. 글자에 쓰지 않음 | - |
| 서브 | `mint` | `#4B7A35` | 아이콘, 대상 배지 | 흰 글자 5.08:1 |
| 행동 | `accent` | `#BF5610` | 상담과 전화 버튼 | 흰 글자 4.61:1 |
| 바탕 | `cream` | `#FAF8F4` | 페이지 바탕. 카드는 흰색 | - |
| 본문 | `ink` | `#2B2D33` | 제목, 본문, 푸터 바탕 | 바탕 위 12.97:1 |
| 보조 글자 | `muted` | `#5F636C` | 설명, 안내 문구 | 바탕 위 5.68:1 |

규칙:

- 주황은 행동 버튼에만 씁니다. 장식이나 제목에 쓰지 않습니다.
- 진한 파랑 면은 페이지당 한 곳만 씁니다.
- 연한 주황과 연한 초록 위 글자는 본문 색을 씁니다.
- 색은 토큰으로만 지정하고, 컴포넌트에 색상값을 직접 쓰지 않습니다.

## 글꼴

나눔고딕 한 가지를 씁니다. 획 끝이 둥글어 따뜻하고, 본문이 잘 읽힙니다.

| 쓰임 | 크기 | 굵기 |
| --- | --- | --- |
| 메인 제목 | `text-4xl`, 큰 화면 `text-5xl` | `font-extrabold` |
| 페이지 제목 (h1) | `text-2xl`, 큰 화면 `text-3xl` | `font-extrabold` |
| 섹션 제목 (h2) | `heading-section` | `font-extrabold` |
| 소제목 (h3) | `text-lg` | `font-bold` |
| 본문 | `text-base` | 기본 |
| 설명 | `text-sm text-muted` | 기본 |

글꼴에 있는 굵기는 400, 700, 800입니다. `font-semibold`와 `font-light`는 쓰지 않습니다.

## 레이아웃

- 페이지 구역은 `Section`을 씁니다. 폭은 `lg`(기본), `md`, `sm`입니다.
- 흰 면은 `card`에 안쪽 여백을 더해 씁니다. 보통 `card p-6`입니다.
- 격자는 칸이 남지 않게 열 수를 고릅니다.
- 중단점은 `md` 768px, `lg` 1024px, `xl` 1200px입니다. 메뉴는 `lg`부터 펼쳐집니다.

## 사진

- 공개 사진은 위치 정보(EXIF)를 지운 뒤 넣습니다.
- 시설 사진은 원본(`public/images/facility/`)과 썸네일(`thumb/`, 가로 640px, WebP)을 함께 둡니다.
- 사진을 추가하면 `data/about.ts`의 `facilities`에 이름과 대체 텍스트를 함께 적습니다.

## 접근성

- 글자 대비는 AA 기준(본문 4.5:1)을 지킵니다.
- 터치 영역은 44px 이상으로 합니다.
- 새 창 링크에는 `(새 창)`을 화면 밖 글자로 넣습니다.
- 움직임은 `prefers-reduced-motion`을 따릅니다.
