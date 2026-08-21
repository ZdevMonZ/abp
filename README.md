# beautydaum-clone — 리브랜딩 베이스

`https://mall.beautydaum.com/main/index.php` 의 **레이아웃·섹션 구성·스크롤 방식**을 Next.js로 다시 만든 토대입니다.
**문구는 `기획서.md` (SOLION & LUNION Two-Track 사업 기획서, 2026.07) 기준으로 채워져 있습니다.**
**한국어·영어 두 언어를 지원합니다** (상단 `KOR ⌄` / 푸터 드롭다운 · 글자와 사진이 함께 바뀝니다).
**메인 비주얼·제품 배너는 시안 이미지를 씁니다. 아이콘은 `sample.png` 시안의 선(line) 아이콘으로 그려 넣었고,
로고만 아직 자리표시자(placeholder)** 입니다.
원본 사이트의 이미지·로고·상호는 타사 저작물이라 가져오지 않았습니다.

> **저장소에 올리지 않는 파일** — 이 저장소는 공개(public)라서 아래는 `.gitignore` 로 빼 두었습니다.
> 내 컴퓨터에는 그대로 있고, 사이트 동작에는 필요하지 않습니다.
> `기획서.md`(사업 기획서) · 루트의 시안 원본(`brand.png` `main*.png` `solion.png` `lunion.png` `sample.png`) · `solion-lunion-site/`(레퍼런스 컨셉 사이트).
> 아래 문서에서 이 파일들을 언급하는 곳은 **작업 근거를 적어 둔 것**이며, 저장소에는 없습니다.

---

## 실행 방법

```bash
npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 배포용 빌드 → out/ 폴더에 완성된 사이트가 만들어집니다
npm run preview  # 만들어진 out/ 을 그대로 열어 보기 → http://localhost:3001
npm run deploy   # 사이트를 실제로 공개 (아래 '웹사이트 공개하기' 참고)
npm run lint     # 코드 검사
```

> 브라우저에서 파일을 직접 열면 안 됩니다. 반드시 `npm run dev` 를 실행한 뒤 표시되는 주소로 접속하세요.

> **`npm start` 는 없습니다.** 이 사이트는 서버 없이 도는 **정적 사이트**(`output: "export"`)로
> 만들어지기 때문입니다. 빌드 결과를 확인하려면 `npm run preview` 를 쓰세요.

---

## 웹사이트 공개하기 (GitHub Pages)

GitHub 에 올린 파일을 **무료로 웹사이트처럼 띄워 주는 기능**이 GitHub Pages 입니다.

주소:

```
https://ZdevMonZ.github.io/abp/
```

### 1) 최초 1회 — GitHub 화면에서 켜기

1. 브라우저에서 저장소(`github.com/ZdevMonZ/abp`)를 엽니다
2. 위쪽 **Settings** (톱니바퀴) 탭
3. 왼쪽 목록에서 **Pages**
4. **Build and deployment → Source** 를 **`Deploy from a branch`** 로 둔 채,
   바로 아래 **Branch** 를 **`gh-pages`** / **`/ (root)`** 로 고르고 **Save**

끝입니다. 2~3분 뒤 위 주소가 열립니다.

### 2) 내용을 고친 다음 — 명령 한 줄

```bash
npm run deploy
```

이 한 줄이 **빌드 → `gh-pages` 브랜치에 통째로 올리기** 까지 다 합니다 (`scripts/deploy.sh`).
2~3분 뒤 사이트에 반영됩니다.

> **브랜치가 두 개인 이유**
> `main` = 우리가 고치는 **코드**, `gh-pages` = 그 코드로 **만들어진 결과물**.
> `gh-pages` 는 매번 통째로 덮어쓰므로 여기에 직접 뭔가 고치면 다음 배포 때 사라집니다.

> `git push` 는 코드를 백업하는 것일 뿐 **사이트에는 반영되지 않습니다.**
> 사이트에 올리려면 `npm run deploy` 를 따로 실행해야 합니다.

### 검색에는 안 뜨게 해 두었습니다

`src/app/layout.tsx` 의 `robots: { index: false, follow: false }` 가
구글·네이버에 **"이 페이지는 검색 결과에 넣지 마세요"** 라고 알려 줍니다.

> **주의** — 비밀번호가 아닙니다. 주소를 아는 사람은 누구나 볼 수 있고,
> 저장소가 공개(public)라서 코드도 누구나 볼 수 있습니다.
> 정식 오픈해서 검색에 뜨게 하려면 그 `robots:` 줄을 지우면 됩니다.

### 관련 파일

| 파일 | 역할 |
|---|---|
| `scripts/deploy.sh` | `npm run deploy` 가 실행하는 배포 스크립트 |
| `next.config.ts` | `output: "export"` (서버 없는 정적 사이트) + 주소 앞에 `/abp` 붙이기 |
| `src/image-loader.ts` | 사진 주소 앞에도 `/abp` 를 붙여 줍니다 (이게 없으면 사진만 안 나옵니다) |
| `scripts/github-pages-workflow.yml` | **보관용** — 완전 자동 배포로 바꾸고 싶을 때 쓰는 파일 (아래 참고) |

> **저장소 이름을 바꾸면** `scripts/deploy.sh` 의 `BASE_PATH="/abp"` 를 새 이름으로 고쳐야 합니다.
> 내 컴퓨터(`npm run dev`)에서는 이 값이 비어 있어서 `/abp` 가 붙지 않습니다.

### (선택) push 만 하면 자동으로 배포되게 하기

지금은 `npm run deploy` 를 직접 실행해야 합니다. GitHub 이 알아서 해 주게 하려면:

1. `github.com/settings/tokens` 에서 쓰던 토큰에 **`workflow`** 권한을 체크하고 저장
2. `scripts/github-pages-workflow.yml` 을 `.github/workflows/deploy.yml` 로 옮긴 뒤 커밋·푸시
3. 저장소 **Settings → Pages → Source** 를 **`GitHub Actions`** 로 변경

> 이 권한이 없으면 GitHub 이 그 파일의 푸시를 거부합니다.
> (`refusing to allow a Personal Access Token to create or update workflow`)
> 그래서 지금은 자동화 대신 `npm run deploy` 방식을 씁니다.

---

## 리브랜딩 — 고쳐야 할 곳은 3군데뿐입니다

| 바꾸고 싶은 것 | 고칠 파일 |
|---|---|
| **색상 · 모서리 · 그림자** | `src/app/globals.css` 맨 위 `@theme` 블록 |
| **브랜드명 · 연락처 · 푸터 링크** | `src/brand/brand.ts` |
| **화면에 보이는 모든 문구 (한국어 · 영어)** | `src/brand/content.ts` |

### 예시 1 — 메인 컬러 교체

`src/app/globals.css` 의 `--color-brand-50` ~ `--color-brand-900` 아홉 줄만 교체하면 버튼·제목·아이콘·그림자까지 전부 따라 바뀝니다.
현재 팔레트는 `brand.png` 시안의 **라벤더·퍼플** 계열입니다 (`--color-brand-500: #6b6bd6`).

### 예시 2 — 서비스 섹션을 3개에서 2개로

`src/brand/content.ts` 의 `serviceSections` 배열에서 항목 하나를 지우면 됩니다.
페이지 조립부(`src/app/page.tsx`)와 오른쪽 점 네비게이션이 자동으로 따라갑니다.

### 예시 3 — 폰트 교체

`src/app/layout.tsx` 상단의 `Noto_Sans_KR` / `Poppins` import 두 줄만 바꾸세요.

---

## 언어 전환 (한국어 · English)

상단 메뉴의 **KOR ⌄** 또는 푸터의 드롭다운에서 언어를 고르면
**화면의 모든 글자**가 그 언어로 바뀝니다. 페이지가 새로 열리지 않고 글자만 갈립니다.

- 두 드롭다운은 항상 같은 값을 보여 줍니다
- 고른 언어는 브라우저에 기억되어 **다음 방문·새로고침에도 유지**됩니다
- `<html lang>` 과 브라우저 탭 제목도 함께 바뀝니다

### 문구 고치는 법

`src/brand/content.ts` · `src/brand/brand.ts` 에 한국어와 영어가 **나란히** 적혀 있습니다.

```ts
title: t("우주 방사선 저항균", "Radiation-resistant microbes")
       └ 한국어 ─────────────┘  └ 영어 ─────────────────────┘
```

한국어와 영어가 **같은 글자**(SOLION · ABOUT US · DAY 0~3 · 90%+ …)는 `t()` 없이 그냥 적습니다.

| 하고 싶은 일 | 고칠 곳 |
|---|---|
| 영어 문구만 다듬기 | 해당 `t(...)` 의 **두 번째** 값 |
| 한국어 문구만 다듬기 | 해당 `t(...)` 의 **첫 번째** 값 |
| 메뉴·버튼·읽어주기 설명 | `content.ts` 맨 아래 `uiText` |
| 기본 언어 바꾸기 | `brand.ts` 의 `locales` 배열 **첫 번째** 항목 |
| 언어 추가 (예: 일본어) | `src/brand/i18n.ts` 의 안내 주석 4단계 |

### 사진도 언어에 따라 바뀝니다

시안 이미지 안에는 글자가 그려져 있어서(코드로 고칠 수 없는 글자) **언어별로 다른 파일**을 씁니다.

| 자리 | 한국어 | English | 크기 |
|---|---|---|---|
| 첫 화면 배경 | `main_high.webp` | `main_high_eng.webp` | 1717×916 |
| SOLION 배너 | `solion.webp` | `solion_eng.webp` | 1535×1024 |
| LUNION 배너 | `lunion.webp` | `lunion_eng.webp` | 1535×1024 |
| SCIENCE 배너 | `space.webp` (공통) | `space.webp` (공통) | 1254×1254 |

SCIENCE 배너는 **그림 안에 글자가 없어서** 두 언어가 같은 파일을 씁니다.

적는 방법은 글자와 똑같습니다 — 한국어 경로, 영어 경로를 나란히:

```ts
// src/brand/content.ts — SOLION·LUNION 배너
visualSrc: t("/solion.webp", "/solion_eng.webp"),
```

```ts
// src/components/sections/HeroSection.tsx — 첫 화면 배경
const IMAGE = {
  src: { ko: "/main_high.webp", en: "/main_high_eng.webp" },
  width: 1717,
  height: 916,
};
```

> 첫 화면만 `{ ko: …, en: … }` 로 풀어 적혀 있습니다. `t("…","…")` 와 같은 뜻인데,
> 그 파일에서는 `t` 라는 이름을 화면에 글자를 그릴 때 이미 쓰고 있어서 그렇습니다.

**언어별 사진을 새로 넣을 때**
1. PNG 를 `public/` 에 WebP 로 변환해 넣기
   `node -e "require('sharp')('사진.png').webp({quality:90}).toFile('public/사진.webp')"`
2. 위처럼 `visualSrc` 에 두 경로를 나란히 적기
3. **두 파일의 가로·세로가 같아야 합니다.** 첫 화면은 사진 비율로 화면 높이를 계산하고,
   배너는 정해진 비율로 잘라 쓰기 때문에 크기가 다르면 잘리는 위치가 어긋납니다.

> SCIENCE 처럼 `ServiceSection` 을 쓰는 섹션은 지금 `visualSrc` 가 경로 하나만 받습니다.
> 그 배너도 언어별로 나누고 싶어지면 요청하세요 (세 줄 작업입니다).

### 검색 노출용 제목/설명은 한국어 고정

검색결과·카톡 미리보기에 쓰이는 글은 **사이트를 만들 때 한 번** 파일에 박히므로
언어를 따라가지 못합니다. 기본 언어(한국어)로 고정해 두었습니다 (`src/app/layout.tsx`).

---

## 폴더 구조

```
src/
├─ app/
│  ├─ globals.css   ★ 브랜드 팔레트 (색·모서리·그림자·애니메이션)
│  ├─ layout.tsx      폰트·메타태그
│  └─ page.tsx      ★ 페이지 조립부 (섹션 순서가 이 배열 그대로)
├─ brand/
│  ├─ brand.ts        ★ 브랜드명·연락처·구매 링크·푸터 (한국어·영어)
│  ├─ content.ts      ★ 상단 메뉴 + 섹션별 문구 (한국어·영어)
│  ├─ i18n.ts           언어 전환 기본 도구 — t("한국어","English")
│  └─ locale-store.ts   선택된 언어를 담아 두는 작은 저장소 (상단·푸터 동기)
├─ image-loader.ts     사진 주소 앞에 /abp 붙이기 (GitHub Pages 용 · 건드릴 일 없음)
└─ components/
   ├─ FullPage.tsx      풀페이지 스크롤 + 점 네비게이션 + 플로팅 버튼
   ├─ TopNav.tsx        상단 메뉴바 (항목은 content.ts 의 navItems)
   ├─ SectionHeading.tsx 섹션 공통 제목
   ├─ SectionBanner.tsx  가로띠 배너 (사진 또는 자리표시자)
   ├─ Icon.tsx         ★ 선 아이콘 모음 (sample.png 시안 결)
   ├─ Placeholder.tsx    이미지·로고 자리표시자 (아이콘 자리표시자는 이제 안 씀)
   ├─ ScrollCue.tsx      "Scroll" 마우스 인디케이터
   ├─ SiteFooter.tsx     푸터 (섹션이 아닌 꼬리 영역 · 점 네비게이션에 안 잡힘)
   ├─ LocaleSwitcher.tsx 언어 드롭다운 — 상단(KOR)·푸터 두 곳에서 씀
   ├─ LocaleTitle.tsx    브라우저 탭 제목 (고른 언어를 따라감)
   └─ sections/          섹션 컴포넌트
      ├─ DuoSection.tsx    ★ SOLION ↔ LUNION 좌우 대비
      └─ CycleSection.tsx    24H SKIN CYCLE 원형 다이어그램

public/               사진 파일 (주소는 /main_high.webp 처럼 public 을 뺀 경로)
scripts/
├─ deploy.sh            npm run deploy 가 실행하는 배포 스크립트
└─ github-pages-workflow.yml  보관용 — 완전 자동 배포로 바꿀 때 쓰는 파일
```

---

## 섹션 구성

> 원본의 **로그인 섹션**과 **CONTACT US 섹션**은 삭제했습니다.
> 푸터는 섹션이 아닌 꼬리 영역으로 남아 있습니다.

| # | id | 원본 | 이 프로젝트 |
|---|---|---|---|
| 1 | `hero` | 풀스크린 메인 비주얼 | `HeroSection` — 배경 `main_high.webp` / 영어 `main_high_eng.webp` |
| 2 | `about` | ABOUT US · 강점 카드 4개 | `AboutSection` |
| 3 | `duo` | MALL / HUB (반복 섹션) | `DuoSection` — **SOLION(낮·밝은 쪽) ↔ LUNION(밤·어두운 쪽) 좌우 대비 1개 섹션**. 사진 `solion.webp`·`lunion.webp` (영어 `solion_eng.webp`·`lunion_eng.webp`) |
| 4 | `cycle` | — | `CycleSection` — 24H SKIN CYCLE 원형 다이어그램 (새로 추가) |
| 5 | `science` | FACULTY | `ServiceSection` — 배너 사진 `public/space.webp` |
| 6 | `stats` | 숫자 카운터 4개 | `StatsSection` |
| 7 | `join` | JOIN US · 5단계 | `JoinSection` (→ CARE RITUAL) |
| — | (섹션 아님) | 푸터 | `SiteFooter` — 마지막 섹션 뒤에 붙는 꼬리 영역 |

---

## 상단 메뉴

`src/brand/content.ts` 의 `navItems` 한 배열에서 관리합니다.

| 메뉴 | 이동 |
|---|---|
| BRAND | ABOUT US 섹션 |
| SOLION | 좌우 대비 섹션의 **SOLION 패널** |
| LUNION | 좌우 대비 섹션의 **LUNION 패널** |
| SCIENCE | SCIENCE 섹션 |
| JOURNAL | **준비 중** — 해당 페이지가 없어 흐리게 표시하고 눌리지 않습니다 |

> SOLION·LUNION 은 한 섹션 안의 좌우 패널이라, 그 섹션을 보고 있으면 **두 메뉴에 함께 밑줄**이 켜집니다.
> 이 섹션은 왼쪽이 밝고 오른쪽이 어두워서 투명한 메뉴 글씨가 한쪽에서 안 보입니다.
> 그래서 이 섹션에서만 메뉴 뒤에 흰 막이 깔립니다 (`page.tsx` 의 `navBackdrop: true`).

오른쪽 아이콘 3개:

| 아이콘 | 동작 |
|---|---|
| 사람 | **준비 중** — 로그인 기능이 없어 표시만 (지우려면 TopNav.tsx 의 해당 `<span>` 삭제) |
| 장바구니 | `brand.purchase.href` 로 이동 (네이버 스마트스토어 예정) |
| KOR ⌄ | 언어 선택 (KOR / ENG) — 고르면 **화면의 모든 글자**가 그 언어로 바뀝니다. 푸터 드롭다운과 값이 항상 같이 움직입니다 |

좁은 화면(1024px 미만)에서는 메뉴가 햄버거(≡) 버튼으로 접힙니다.

---

## 메인 비주얼 (`public/main_high.webp` · 영어 `main_high_eng.webp` · 둘 다 1717×916)

시안 이미지에는 메뉴줄·SOLION/LUNION 문구·DAY/NIGHT·SCROLL 이 **이미 그려져 있습니다.**
`HeroSection.tsx` 위쪽 상수 몇 개로 처리합니다.

| 처리 | 상수 |
|---|---|
| 사진 파일과 실제 크기 | `IMAGE = { src, width, height }` |
| 위쪽 가짜 메뉴줄 → **잘라냄** (진짜 상단 메뉴가 그 자리에) | `CROP_TOP = 0.16` |
| 아래쪽 DAY/NIGHT·SCROLL → **그늘로 눌러 배경색으로 이어 줌** | `FADE_TO_BACKDROP` |
| 사진 아래·둘레를 채우는 색 | `BACKDROP = "#14122b"` |
| 우리 문구 겹쳐 쓰기 | `SHOW_TEXT_OVER_IMAGE`(기본 `false`) |

### 왜 화면을 세로까지 꽉 채우지 않나 — 선명도

사진은 **원본보다 크게 늘리면 흐려집니다.** 이 사진(1717×916)으로 큰 화면의 높이까지
채우려면 1.4~1.8배로 늘려야 해서 눈에 띄게 흐려졌습니다.
그래서 **가로로 넓은 화면에서는 좌우만 꽉 채우고, 세로는 사진 비율 그대로** 둡니다.
아래 남는 자리(화면의 약 20%)는 배경색이고, 사진 아래 그늘이 그 색으로 이어져 경계가 보이지 않습니다.

| 화면 | 늘어나는 배율 (전) | (후) |
|---|---|---|
| 1440 폭 | 1.49배 | **1.25배** |
| 1920 폭 | 1.37배 | **1.11배** |
| 2560 폭 | 1.82배 | **1.49배** |

**단, 이 배치는 화면이 4:3(1.33)보다 가로로 넓을 때만** 씁니다 — 가로로 놓인 화면은 전부 해당됩니다.
휴대폰·태블릿 **세로**처럼 세로로 긴 화면에서만 화면을 꽉 채웁니다(띠로 두면 사진이 화면 높이의
2~3할밖에 안 되는 얇은 줄이 되기 때문입니다).

**왜 4:3 인가 — 좌우가 잘리면 안 되기 때문입니다.**
시안 양쪽 끝에 SOLION(왼쪽) · LUNION(오른쪽) 글자가 있습니다. 화면을 꽉 채우려고 사진을 키우면
그 글자들이 먼저 잘려 나갑니다.

| 화면 | 비율 | 꽉 채우면 잘리는 좌우 |
|---|---|---|
| 1920×1080 (16:9) | 1.78 | 20% |
| 1440×900 (16:10) | 1.60 | 26% |
| 맥북 1512×982 | 1.54 | 29% |
| 아이패드 가로 | 1.44 | 34% |

기준선은 `src/app/globals.css` 의 `.hero-band` / `.hero-fill` 에 있고, `4/3` 숫자 하나로 조절합니다.
숫자를 키우면 꽉 채우는(=잘리는) 화면이 늘고, 줄이면 사진 아래 여백이 커집니다.

> **더 선명하게 하려면** 더 큰 원본이 필요합니다. 최소 2560×1366, 되도록 3840×2048 로 다시 뽑으세요.
> 이 사진은 가로보다 **세로 픽셀이 부족**하므로(1.87:1 의 아주 옆으로 긴 비율) 세로가 함께 커져야 합니다.
> 가짜 메뉴줄이 없는 버전을 받으면 `CROP_TOP` 을 `0` 으로 둘 수 있어 그만큼 더 또렷해집니다.

> 사진을 바꾸려면 `public/` 에 넣고 `IMAGE` 의 파일명·가로·세로를 실제 값으로 고치세요.
> 글자가 없는 사진이라면 `CROP_TOP` 을 `0` 으로 두고 `SHOW_TEXT_OVER_IMAGE` 를 `true` 로 켜는 편이 좋습니다.

---|---|
| 위쪽 가짜 메뉴줄 → **잘라냄** (진짜 상단 메뉴가 그 자리에) | `CROP_TOP = "16%"` |
| 아래쪽 DAY/NIGHT·SCROLL → **그늘로 눌러 줌** | 아래쪽 그라데이션 |
| 우리 문구 겹쳐 쓰기 | `SHOW_TEXT_OVER_IMAGE`(기본 `false`) |

> **왜 아래는 자르지 않나** — 이 사진은 가로로 길어서(1717×916) 위아래를 자를수록 좌우도
> 크게 잘려 나갑니다. 아래까지 자르면 양옆 SOLION / LUNION 글자가 잘려서, 대신 그늘로 처리했습니다.

> 사진을 바꾸려면 `public/` 에 넣고 `HeroSection.tsx` 의 `IMAGE.src` 를 교체하세요 (언어별 두 줄).
> **비율이 다른 사진으로 바꾸면 `CROP_TOP` 을 다시 맞춰야 합니다.**
> 글자가 없는 사진이라면 `CROP_TOP` 을 `0%` 로 두고 `SHOW_TEXT_OVER_IMAGE` 를 `true` 로 켜는 편이 좋습니다.

---

### 첫 화면 연출 — "더 고급스러워 보이게"

`HeroSection.tsx` 맨 위 **`FX_` 로 시작하는 줄**이 전부입니다. `false` 로 바꾸면 그 효과만 꺼집니다.
(① 페이드인만 `src/components/IntroVeil.tsx` 에 따로 있습니다 — 첫 화면 바깥의 메뉴 바·오른쪽
버튼까지 **같이** 밝아져야 해서 사이트 맨 위층에 막을 덮기 때문입니다.)

| 효과 | 스위치 | 세기·시간 상수 | 무엇이 보이나 |
|---|---|---|---|
| ① 열림(페이드인) | `FX_INTRO` | `INTRO_MS` | 화면 전체(사진·메뉴·버튼)가 어둠에서 **점점 밝아집니다** (처음 한 번, 1.2초) |
| ② 안착 | `FX_SETTLE` | `SETTLE_SCALE` · `SETTLE_MS` | 사진이 아주 살짝 컸다가 제자리로 내려앉습니다 |
| ③ 필름 입자 | `FX_GRAIN` | `GRAIN_OPACITY` · `GRAIN_TILE_PX` · `GRAIN_FREQ` | 화면 전체에 미세한 입자 — 매끈한 CG 느낌을 걷어냅니다 |
| ④ 가장자리 | `FX_FALLOFF` | `EDGE_FALLOFF` | 좌우 끝이 살짝 가라앉아 시선이 가운데로 모입니다 |
| ⑤ 등장 순서 | `FX_CASCADE` | `SLOGAN_DELAY_MS` · `CUE_DELAY_MS` … | 사진 → 슬로건 → Scroll 순으로 도착합니다 |

**설계 원칙 — 계속 움직이는 것은 하나도 없습니다.** 약 1.9초 뒤 첫 화면은 완전히 멈춥니다.
반짝임·맥동·마우스를 따라오는 광택 같은 것은 임상·과학 브랜드에서 오히려 싸구려로 읽히고
노트북 팬을 돌리기 때문에 일부러 넣지 않았습니다.

- 연출이 끝나면 사진에는 **아무 효과도 남지 않습니다** — 선명도 손해가 0 입니다.
- 시안 양쪽 끝 SOLION(12.6%~) · LUNION(~88.7%) 글자는 어느 순간에도 잘리거나 어두워지지 않습니다.
- '동작 줄이기'(macOS 손쉬운 사용)를 켠 사용자는 연출 없이 **완성된 화면을 곧바로** 봅니다.
- 필름 입자는 파일이 아니라 코드로 그려 넣어(약 0.6KB) 내려받는 시간이 늘지 않습니다.

> **같이 고친 것 — 시안 아래쪽 글자가 비쳐 보이던 문제**
> 사진 아래 그늘(`FADE_TO_BACKDROP`)이 가장 진한 곳도 94% 라서, 남은 6% 로 시안에 그려진
> "SCIENCE · SAFETY · SUSTAINABILITY / DAY·PROTECT / NIGHT·RECOVER" 글자가 유령처럼 비치고
> 우리 슬로건과 겹쳐 보였습니다. 그늘을 100% 까지 올려 완전히 지웠습니다
> (세로 화면 쪽 그늘 높이도 34% → 40% 로 함께 올렸습니다).

---

## 제품 사진 넣기

사진이 들어가는 곳은 두 종류이고, **넣는 방식이 다릅니다.**

> **파일 형식은 `.webp` 를 쓰세요.** PNG 와 눈으로 구별이 거의 안 되는데 용량은 10분의 1입니다.
> (지금 쓰는 사진 3장: PNG 5.9MB → WebP 0.45MB. 휴대폰에서 첫 화면 뜨는 속도가 달라집니다.)
> PNG/JPG 를 가지고 있다면 터미널에서 아래 한 줄로 바꿀 수 있습니다.
>
> ```bash
> node -e "require('sharp')('사진.png').webp({quality:90}).toFile('public/사진.webp')"
> ```
>
> `sharp` 는 Next.js 에 이미 딸려 있어서 따로 설치할 필요가 없습니다.

### 1) SOLION / LUNION 좌우 대비 섹션 — 자르지 않고 통째로

`src/brand/content.ts` 의 `duoContent.panels` 에서 한 줄만 고치면 됩니다.

```ts
visualSrc: t("/solion.webp", "/solion_eng.webp"),  // 한국어 · 영어 경로
visualAlt: "SOLION ... 라인업",        // 사진 설명 (화면에는 안 보이고 읽어 주는 글)
```

사진은 **16:10 카드 안에 거의 통째로** 들어갑니다(원본 3:2 에서 위아래를 아주 조금만 덜어냄).
화면에서는 절반 폭(약 480~560px)으로 줄여 그리는데 원본이 1536×1024 라
**줄여 그리는 만큼 더 또렷하게** 보입니다. 잘라내는 위치를 맞추는 값(`visualFocus`)은 필요 없습니다.

> 레퍼런스(`solion-lunion-site/index.html`)의 사진이 선명해 보였던 이유가 이것입니다.
> 파일은 우리 것과 완전히 같고, **가로로 길게 잘라 크게 늘리지 않았을 뿐**입니다.

### 2) SCIENCE 같은 가로띠 배너 — 잘라서 보여 주기

`public/` 에 파일을 넣고 `src/brand/content.ts` 의 해당 섹션에 두 줄을 추가합니다.

```ts
visualSrc: "/space.webp",   // 사진 경로 (없으면 자리표시자가 나옵니다)
visualFocus: "62%",         // PC 배너에서 사진의 어느 높이를 보여줄지 (안 적으면 가운데 50%)
```

| 화면 | 배너 비율 | 보이는 범위 |
|---|---|---|
| 768px 이상 | 1400 : 340 (가로로 긴 띠) | `visualFocus` 로 지정한 높이의 띠만 |
| 768px 미만 | 3 : 2 | 좌우는 전부, 위아래는 조금 잘림 |

`visualFocus` 는 `0%`(사진 맨 위) ~ `100%`(맨 아래).
사진에 글자가 그려져 있다면 **그 글자가 반쯤 잘리지 않는 값**으로 맞추세요.

지금 SCIENCE 배너는 `public/space.webp` (1254×1254 정사각형)를 씁니다.
가운데(기본 50%)에 빛의 초승달과 입자가 모여 있어 `visualFocus` 를 따로 주지 않았습니다.
**글자가 없는 그림이라 한국어·영어 화면이 같은 파일을 씁니다.**

---

## 아이콘 바꾸기 (`sample.png` 시안 결)

화면의 모든 픽토그램은 **선으로 그린 SVG 아이콘**입니다. 그림 파일이 아니라 코드라서
색은 글자색을 따라가고, 아무리 키워도 흐려지지 않습니다.

**아이콘을 바꾸려면** `src/brand/content.ts` 에서 그 항목의 `icon:` 이름만 고치면 됩니다.

```ts
{ id: "about-cycle", icon: "cycle", title: "낮과 밤, 완전한 케어 사이클", ... }
//                    └─ 이 이름만 아래 표의 다른 이름으로 바꾸면 그림이 바뀝니다
```

| 이름 | 그림 | 지금 쓰는 곳 |
|---|---|---|
| `sun` | 해 | SOLION 섹션 제목, SPF 부스팅, DAY 29~ |
| `moon` | 초승달 | (예비) |
| `moon-stars` | 초승달 + 별 | LUNION 섹션 제목, DAY 4~28 |
| `biome` | 균 콜로니 | SCIENCE 섹션 제목, 우주 방사선 저항균, 마이크로바이옴 |
| `droplet` | 물방울 | 엑토인 배합, 즉각 진정, DAY 0~3 |
| `dna` | 이중나선 | PDRN 복합 |
| `shield` | 방패 | 무기 자외선 필터, 우주 방사선 저항균 |
| `shield-check` | 방패 + 체크 | 포스트바이오틱 안전 설계, ROS 억제 |
| `flask` | 플라스크 | 병원 채널, 시술 후 직접 처방 |
| `cycle` | 반이 채워진 원 (낮/밤) | 낮과 밤 케어 사이클 |
| `calendar` | 달력 + 체크 | 시술 후 집중 회복 28일 |
| `ion` | 원자(이온) | 하나의 이온 철학 |
| `treatment` | 반짝임 | TREATMENT 의원 시술 |
| `reorder` | 되돌아가는 화살표 | RE-ORDER 자사몰 재구매 |
| `arrow-right` | 오른쪽 화살표 | 구매 버튼, 케어 리추얼 단계 사이 |

**새 아이콘이 필요하면** `src/components/Icon.tsx` 의 `PATHS` 에 한 칸 추가하세요.
그림은 24×24 칸에 그린 선이고, 굵기·크기·색은 쓰는 쪽에서 정합니다.

---

## 원본과 의도적으로 다르게 만든 부분

| 항목 | 원본 | 이 프로젝트 | 이유 |
|---|---|---|---|
| 풀페이지 스크롤 | jQuery `fullview.js` 플러그인 | 브라우저 기본 CSS scroll-snap | 라이브러리 의존 제거. 휠·터치·키보드·스크롤바가 모두 자연스럽게 동작 |
| MALL/HUB/FACULTY | 거의 같은 HTML 3번 반복 | 컴포넌트 1개 + 데이터 배열 | 섹션 추가·삭제가 배열 수정 한 번으로 끝남 |
| 한글 폰트 | Pretendard | Noto Sans KR | Pretendard는 Google Fonts에 없음 |
| 첫 화면 | 로그인 폼 + 배너 슬라이더 + 진입 카드 | 삭제 — 메인 비주얼로 바로 시작 | 회원제 쇼핑몰이 아닌 브랜드 소개 사이트 |
| 상단 메뉴 | 없음 (로그인 화면이 입구 역할) | `brand.png` 시안 구성 — 워드마크 / BRAND·SOLION·LUNION·SCIENCE·JOURNAL / 계정·구매·언어 | 로그인 화면을 없앤 대신 어디서든 이동할 수 있는 길 |
| 팔레트 | 민트·청록 (#1fa0b0) | 라벤더·퍼플 (#6b6bd6) | `brand.png` 시안 톤 |
| 메인 비주얼 | 배너 슬라이더 | 시안 이미지 1장 (`main_high.webp`) 전체 화면 | 시안이 이미 완성된 한 장 구성 |
| 푸터 드롭다운 | 관련 사이트 링크 | 언어 선택 (한국어/English) | 고르면 화면의 모든 글자가 바뀝니다 (아래 **언어 전환** 참고) |
| 픽토그램 | 회색 아이콘 이미지 | 선으로 그린 SVG 아이콘 (`Icon.tsx`) | `sample.png` 시안 결. 이미지 파일이 없어도 되고 색·크기가 자유로움 |
| 특징 3개 줄 | 좌우 여백만 | PC 에서 얇은 세로줄로 칸 구분 | `sample.png` 의 SCIENCE 줄 구성 |
| 케어 리추얼 단계 | 원 사이 점선 | 원 사이 화살표(→) | `sample.png` 의 POST-PROCEDURE JOURNEY 줄 구성 |
| SOLION·LUNION | 같은 모양 섹션 2개 | **한 섹션 안 좌우 대비** (왼쪽 밝음/오른쪽 어두움) | `solion-lunion-site/index.html` 레퍼런스. 낮과 밤의 대비가 한눈에 들어옵니다 |
| 제품 사진 | 1400:340 가로띠로 잘라 확대 | 16:10 카드에 통째로 (절반 폭으로 축소) | 잘리지 않고 더 선명함 |
| 24H SKIN CYCLE | 없음 | 원형 다이어그램 섹션 신설 | 같은 레퍼런스의 `.cycle` 구성 |

## 접근성 · 반응형

- 모바일(768px 미만)에서는 스냅을 끄고 일반 스크롤로 동작합니다
- 키보드: `Home` / `End` / `PageUp` / `PageDown` 으로 섹션 이동
- OS의 **동작 줄이기** 설정을 켜면 모든 애니메이션이 꺼집니다
- 390 / 640 / 768 / 900 / 1024 / 1180 / 1280 / 1440 / 1920px 폭에서 가로 스크롤·잘림이 없도록 실측 검증했습니다
- 케어 리추얼 5단계는 1024px 이상에서 한 줄, 그 아래에서는 줄바꿈됩니다

## 실제 이미지를 넣을 때

`<Placeholder>` / `<LogoMark>` 를 `next/image` 의 `<Image>` 로 교체하고,
이미지 파일은 `public/` 아래에 두면 됩니다.
