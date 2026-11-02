# 플러스 아동발달센터 홈페이지

Node.js 26 환경의 Next.js 프로젝트입니다.

```sh
npm install
cp .env.example .env.local   # 대표 전화, 카카오 채널 값
npm run dev
```

`npm run lint`, `npm run build`로 검사합니다.

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
