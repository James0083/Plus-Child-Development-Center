# 플러스 아동발달센터 홈페이지

Node.js 26 환경의 Next.js 프로젝트입니다.

```sh
npm install
cp .env.example .env.local
npm run dev
```

`npm run lint`, `npm run build`로 검사합니다. Worker까지 함께 실행하려면 `npm run preview`를 사용합니다.

## 구조와 배포 (Cloudflare Workers 무료 플랜)

페이지는 `out/`의 정적 파일로 Worker 실행 없이 응답하고, `POST /api/consult`만 [worker/index.ts](worker/index.ts)가 처리합니다. 설정은 [wrangler.jsonc](wrangler.jsonc)에 있습니다.

| Workers Builds 설정 | 값 |
|---|---|
| Worker 이름 | `plus-adc` (`wrangler.jsonc`의 `name`과 같아야 함) |
| Git branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node 버전 | `.nvmrc` (26) |

| 환경 변수 | 위치 | 내용 |
|---|---|---|
| `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_KAKAO` | 빌드 변수 | 대표 전화, 카카오 채널 링크 |
| `NEXT_PUBLIC_SITE_URL` | 빌드 변수 | 사이트 주소. 공유 미리보기 이미지에 사용 |
| `NEXT_PUBLIC_CONSULT_FORM_ENABLED`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | 빌드 변수 | 상담 폼 표시, Turnstile 사이트 키 |
| `CONSULT_FROM_ADDRESS` | Worker 변수 | 발신 주소. 센터 도메인 주소 사용 |
| `TURNSTILE_SECRET_KEY` | Worker 비밀 값 | `npx wrangler secret put TURNSTILE_SECRET_KEY` |

`NEXT_PUBLIC_` 값은 빌드할 때 파일에 들어가므로, 바꾼 뒤에는 다시 배포해야 합니다.

### 상담 폼 켜는 순서

폼은 기본으로 꺼져 있습니다. 메일이 도착하는 것을 확인한 뒤에만 켜세요.

1. 도메인을 구입하고 네임서버를 Cloudflare로 옮깁니다. Cloudflare 메일 기능은 Cloudflare DNS가 필요합니다.
2. Email Service에서 `pluscenter4052@naver.com`을 수신 주소로 인증합니다.
3. Turnstile 위젯을 만들고 키를 등록합니다.
4. `CONSULT_FROM_ADDRESS`를 넣고 `NEXT_PUBLIC_CONSULT_FORM_ENABLED=true`로 다시 배포합니다.
5. 시험 신청이 센터 메일에 도착하는지 확인합니다.

수신 주소는 코드와 `wrangler.jsonc` 모두 센터 메일로 고정되어 있습니다.

## 보류 기능

비용이 필요한 기능은 개발을 보류했습니다.

| 기능 | 상태 | 재개 방법 |
|---|---|---|
| 학부모 계정·결제 | 계획만 있음 | [docs/archive/parent-account-payment-plan.md](docs/archive/parent-account-payment-plan.md) |
| 토스 결제 시연 | 이 브랜치에 없음 | `feature/toss-payment-demo` 브랜치에 보존 |

## 버전 정책

`package.json`은 범위로 지정해 이후 업데이트를 열어 두고, 검증한 실제 버전은 `package-lock.json`에 고정합니다.
`npm ci`는 고정된 버전을 그대로 설치하고, `npm update`는 범위 안에서 올립니다.
`overrides`는 사용하지 않고, peer 범위가 맞는 버전과 패키지만 설치합니다.

| 설정 | 이유 | 바꿔도 되는 조건 |
|---|---|---|
| `typescript: ~6.0.3` | `typescript-eslint`가 TypeScript 6.1 미만만 지원 | `typescript-eslint`가 상위 버전을 지원할 때 |
| `eslint-config-next` 미사용 | 포함된 `eslint-plugin-import`, `react`, `jsx-a11y`의 peer 범위가 ESLint 9까지이고, ESLint 9는 지원 종료 | 세 플러그인이 ESLint 10을 peer 범위에 포함할 때 |

### 남은 `npm audit` 항목

`npm audit`에 `minimatch` 보안 권고(11.0.1 미만, moderate)가 표시됩니다.
ESLint와 `typescript-eslint`가 `minimatch` 10을 사용하기 때문이며, 개발 도구에만 해당하고 `npm audit --omit=dev`는 0건입니다.
두 패키지가 11.0.1 이상을 사용하는 버전을 내면 `npm update`로 해소됩니다.
