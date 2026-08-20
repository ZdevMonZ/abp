/**
 * 섹션별 문구 데이터 (한국어 · 영어)
 * ---------------------------------------------------------------------------
 * 내용 출처: 기획서.md (SOLION & LUNION Two-Track 사업 기획서, 2026.07)
 * 화면에 보이는 글자는 전부 여기 있습니다.
 * 섹션을 추가/삭제하려면 src/app/page.tsx 의 배열을 수정하세요.
 *
 * ★ 두 언어를 나란히 적습니다
 *
 *      title: t("우주 방사선 저항균", "Radiation-resistant microbes")
 *             └ 한국어 ─────────────┘  └ 영어 ─────────────────────┘
 *
 *   한국어와 영어가 같은 글자(SOLION · ABOUT US · DAY 0~3 · 90%+ …)는
 *   t() 없이 그냥 적습니다. 자세한 설명 → src/brand/i18n.ts
 *
 * `icon: "..."` 은 항목 옆에 그려지는 선 아이콘 이름입니다.
 * 고를 수 있는 이름과 그림은 src/components/Icon.tsx 에 모여 있습니다.
 */

import { brand } from "@/brand/brand";
import { t, type Text } from "@/brand/i18n";
import type { IconName } from "@/components/Icon";
import type { Tone } from "@/components/Placeholder";

/** ── 0. 상단 메뉴 (brand.png 시안 구성) ─────────────────────────────
 *  target = 이동할 섹션 id (src/app/page.tsx 의 id 와 같아야 합니다)
 *  match  = 이 섹션들을 보고 있을 때 메뉴에 밑줄이 켜집니다
 *  soon   = 아직 만들 페이지가 없어 흐리게 표시하고 눌리지 않습니다
 *
 *  메뉴 이름은 두 언어 모두 영문 그대로라 t() 를 쓰지 않습니다.
 */
export type NavItem = {
  label: string;
  target?: string;
  match?: readonly string[];
  soon?: boolean;
};

export const navItems: readonly NavItem[] = [
  { label: "BRAND", target: "about", match: ["about", "join"] },
  // SOLION·LUNION 은 한 섹션(duo) 안의 좌우 패널이라 둘 다 같은 섹션을 가리킵니다.
  // (좁은 화면에서는 위아래로 나뉘므로 각 패널로 정확히 이동합니다)
  { label: "SOLION", target: "solion", match: ["duo"] },
  { label: "LUNION", target: "lunion", match: ["duo"] },
  { label: "SCIENCE", target: "science", match: ["cycle", "science", "stats"] },
  // TODO: 브랜드 저널(콘텐츠) 페이지를 만들면 soon 을 지우고 target/href 를 넣으세요.
  { label: "JOURNAL", soon: true },
];

/** ── 1. 메인 비주얼 ─────────────────────────────────────────────────── */
export const heroContent = {
  headline: t("피부 위의 우주.", "The universe on your skin."),
  sub: [
    t("낮에는 SOLION으로 막고,", "Shielded by SOLION through the day,"),
    t("밤에는 LUNION으로 회복한다", "restored by LUNION through the night"),
  ],
};

/** ── 2. ABOUT US ───────────────────────────────────────────────────── */
export const aboutContent = {
  eyebrow: "ABOUT US",
  headline: [
    t("극한에서 살아남은 균이", "Microbes that survived the extremes"),
    t("피부를 지킵니다", "now protect your skin"),
  ],
  headlineStrong: "SOLION & LUNION",
  cards: [
    {
      id: "about-microbe",
      icon: "biome" as IconName,
      title: t("우주 방사선 저항균", "Radiation-resistant microbes"),
      body: [
        t("극한 환경에서 살아남은", "The survival power of microbes"),
        t("미생물의 생존력을 피부 보호에", "from extreme environments, put to work on skin"),
      ],
    },
    {
      id: "about-safety",
      icon: "shield-check" as IconName,
      title: t("포스트바이오틱 안전 설계", "Postbiotics, safe by design"),
      body: [
        t("생균이 아닌 발효물·사균체", "Formulated with ferments and lysates,"),
        t("형태로 배합", "never live cultures"),
      ],
      note: t(
        "※ 국내 화장품 미생물 한도 기준 충족",
        "※ Meets Korean cosmetic microbial limit standards",
      ),
    },
    {
      id: "about-cycle",
      icon: "cycle" as IconName,
      title: t("낮과 밤, 완전한 케어 사이클", "A full day-and-night care cycle"),
      body: [
        t("SOLION 차단 + LUNION 회복", "SOLION shields, LUNION restores —"),
        t("하나의 이온(-ion) 철학", "one shared -ion philosophy"),
      ],
    },
    {
      id: "about-channel",
      icon: "flask" as IconName,
      title: t("병원 채널에서 시작", "Born in the clinic"),
      body: [
        t("시술 후 환자에게", "Prescribed on site, straight"),
        t("의원에서 직접 처방", "after a procedure"),
      ],
    },
  ],
};

/** ── 3. SOLION × LUNION — 좌우 대비 섹션 ────────────────────────────
 *  왼쪽은 낮(밝은 배경), 오른쪽은 밤(어두운 배경)으로 한 화면에서 대비시킵니다.
 *  (레퍼런스: solion-lunion-site/index.html 의 .split 구성)
 *  사진은 잘라내지 않고 카드 안에 통째로 담기므로 visualFocus 같은 조절값이 없습니다.
 */
export const duoContent = {
  panels: [
    {
      id: "solion",
      /** day = 밝은 패널, night = 어두운 패널 */
      tone: "day" as const,
      kicker: "DAY · PROTECT",
      name: "SOLION",
      icon: "sun" as IconName,
      sub: "SOLION Cosmic Screen",
      headline: t("낮 — 우주급 자외선 차단", "Day — cosmic-grade UV defense"),
      lead: t(
        "자외선과 외부 자극에 그대로 노출되는 낮. NASA 클린룸에서 발견된 균주와 무기 자외선 필터를 함께 담아 피부를 지킵니다.",
        "Daytime leaves skin fully exposed to UV and outside stress. A strain found in a NASA clean room works alongside mineral UV filters to keep it protected.",
      ),
      // 사진 안에 글자가 그려져 있어 언어별로 다른 파일을 씁니다 (둘 다 1535×1024)
      visualSrc: t("/solion.webp", "/solion_eng.webp"),
      visualAlt: t("SOLION Cosmic Screen 선크림 라인업", "SOLION Cosmic Screen sunscreen lineup"),
      features: [
        {
          icon: "biome" as IconName,
          lead: t("NASA 클린룸에서 발견된", "Discovered in a NASA clean room"),
          strong: "Bacillus Lysate",
        },
        {
          icon: "shield" as IconName,
          lead: t("무기 자외선 필터", "Mineral UV filters"),
          strong: t("ZnO · TiO₂ 이중 보호", "ZnO · TiO₂ dual protection"),
        },
        {
          icon: "droplet" as IconName,
          lead: t("UV·DNA 보호와 수분 보호막", "UV & DNA defense with a moisture shield"),
          strong: t("엑토인 배합", "Formulated with ectoin"),
        },
      ],
      // 구매 링크는 brand.purchase 한 곳에서 관리합니다 (네이버 스마트스토어 예정)
      links: [{ label: t("제품 구매하기", "Shop the products"), href: brand.purchase.href }],
    },
    {
      id: "lunion",
      tone: "night" as const,
      kicker: "NIGHT · RECOVER",
      name: "LUNION",
      icon: "moon-stars" as IconName,
      sub: t("재생크림 · 에센스", "Recovery Cream · Essence"),
      headline: t("밤 — 시술 후 재생과 진정", "Night — post-procedure repair and calm"),
      lead: t(
        "시술 직후의 예민한 피부가 쉬는 밤. PDRN·엑토인·비피다 발효물이 무너진 장벽을 다시 세웁니다.",
        "Night is when freshly treated, sensitive skin rests. PDRN, ectoin and Bifida ferment rebuild the barrier a procedure breaks down.",
      ),
      // 사진 안에 글자가 그려져 있어 언어별로 다른 파일을 씁니다 (둘 다 1535×1024)
      visualSrc: t("/lunion.webp", "/lunion_eng.webp"),
      visualAlt: t("LUNION 재생크림 · 에센스 라인업", "LUNION recovery cream and essence lineup"),
      features: [
        {
          icon: "dna" as IconName,
          lead: t("PDRN + 엑토인 + 비피다발효용해물", "PDRN + ectoin + Bifida ferment lysate"),
          strong: t("장벽 회복 · 수분 공급", "Barrier repair · deep hydration"),
        },
        {
          icon: "droplet" as IconName,
          lead: t("L. paracasei 발효물 + 판테놀", "L. paracasei ferment + panthenol"),
          strong: t("즉각 진정 · 민감성 케어", "Instant calm · sensitive care"),
        },
        {
          icon: "flask" as IconName,
          lead: brand.clinic.name,
          strong: t("시술 후 직접 처방", "Prescribed right after treatment"),
        },
      ],
      note: t("재구매는 자사몰에서 15% 할인", "15% off repeat orders on our own store"),
      links: [
        { label: t("제품 구매하기", "Shop the products"), href: brand.purchase.href },
        { label: t("판매 의원 안내", "Clinic information"), href: brand.clinic.href },
      ],
    },
  ],
};

/** ── 4. 24H SKIN CYCLE — 낮과 밤을 하나의 루틴으로 ──────────────────
 *  (레퍼런스: solion-lunion-site/index.html 의 .cycle 구성)
 */
export const cycleContent = {
  eyebrow: "THE SYSTEM",
  headline: "24H SKIN CYCLE",
  lead: t(
    "낮과 밤을 따로 보지 않고, 보호와 회복을 하나의 루틴으로 설계합니다.",
    "Day and night are not treated separately — protection and recovery are designed as one routine.",
  ),
  cards: [
    {
      id: "cycle-day",
      tag: "DAY / SOLION",
      title: "PROTECT",
      icon: "sun" as IconName,
      body: t(
        "외부 자극에 노출되는 낮, 피부 방어에 집중합니다.",
        "Through the day, exposed to the outside world, skin focuses on defense.",
      ),
    },
    {
      id: "cycle-night",
      tag: "NIGHT / LUNION",
      title: "RECOVER",
      icon: "moon-stars" as IconName,
      body: t(
        "하루를 마친 밤, 회복 중심의 리듬으로 전환합니다.",
        "At night, once the day is done, the rhythm shifts to recovery.",
      ),
    },
  ],
  center: { big: "SOLION × LUNION", small: "24H · DAY TO NIGHT" },
};

/** ── 5. 그 밖의 소개 섹션 ───────────────────────────────────────────
 *  같은 모양의 섹션을 더 만들고 싶으면 이 배열에 한 칸 추가하면 됩니다.
 *  (SOLION·LUNION 은 위 duoContent 의 좌우 대비 섹션으로 옮겨졌습니다)
 */
export type ServiceSectionData = {
  id: string;
  eyebrow: string;
  /** 제목 위 작은 선 아이콘 */
  icon?: IconName;
  headline: Text;
  headlineStrong: Text;
  /** 배너 자리에 들어갈 설명 (사진이 없으면 자리표시자에 이 글자가 보입니다) */
  visualLabel: Text;
  visualTone: Tone;
  /** 배너 사진 — public/ 아래 파일 경로. 없으면 자리표시자가 나옵니다 */
  visualSrc?: string;
  /** PC 배너에서 보여줄 높이 위치 (0% = 맨 위, 100% = 맨 아래) */
  visualFocus?: string;
  features: readonly { icon: IconName; lead: Text; strong: Text }[];
};

export const serviceSections: readonly ServiceSectionData[] = [
  {
    id: "science",
    eyebrow: "SCIENCE",
    icon: "biome",
    headline: t("우주에서 살아남은 균이", "Microbes that survived space"),
    headlineStrong: t("피부 위에서 당신을 지킵니다", "now stand guard on your skin"),
    // 배너 사진 — 글자가 없는 그림이라 한국어·영어 화면에서 같은 파일을 씁니다
    visualSrc: "/space.webp",
    visualLabel: t(
      "빛의 초승달에서 균 콜로니가 성운처럼 퍼져나가는 우주 비주얼",
      "Cosmic visual of microbial colonies spreading like a nebula from a crescent of light",
    ),
    visualTone: "brand",
    features: [
      {
        icon: "shield",
        lead: t("우주 방사선 저항균", "Radiation-resistant microbes"),
        strong: t("Deinococcus 유래 Mn-SOD", "Mn-SOD derived from Deinococcus"),
      },
      {
        icon: "biome",
        lead: t("피부에 공생하는 유익균", "Beneficial microbes that live with skin"),
        strong: t("마이크로바이옴 장벽 케어", "Microbiome barrier care"),
      },
      {
        icon: "ion",
        lead: "Sol + Ion / Luna + Ion",
        strong: t("하나의 이온 철학", "One shared -ion philosophy"),
      },
    ],
  },
];

/** ── 6. 숫자 지표 ───────────────────────────────────────────────────── */
export const statsContent = {
  headline: t("균이 만드는 보호막을", "The shield these microbes build,"),
  headlineStrong: t("숫자로 확인", "measured in numbers"),
  headlineTail: t("하세요.", "."),
  notice: t(
    "※ Bacillus Lysate 원료사 제공 자료 기준 (2026.07)",
    "※ Based on data provided by the Bacillus Lysate ingredient supplier (Jul 2026)",
  ),
  items: [
    {
      id: "stat-spf",
      icon: "sun" as IconName,
      label: t("SPF 부스팅", "SPF boosting"),
      value: 33,
      suffix: "%",
    },
    {
      id: "stat-ros",
      icon: "shield-check" as IconName,
      label: t("ROS 억제", "ROS suppression"),
      value: 90,
      suffix: "%+",
    },
    {
      id: "stat-recovery",
      icon: "calendar" as IconName,
      label: t("시술 후 집중 회복", "Focused post-procedure recovery"),
      value: 28,
      // 영어는 숫자 뒤에 띄어쓰기가 들어갑니다 ("28 days")
      suffix: t("일", " days"),
    },
    {
      id: "stat-strain",
      icon: "biome" as IconName,
      label: t("마이크로바이옴 균주", "Microbiome strains"),
      value: 4,
      suffix: t("종", " strains"),
    },
  ],
};

/** ── 7. 케어 리추얼 (원본의 JOIN US 자리) ──────────────────────────── */
export const joinContent = {
  eyebrow: "CARE RITUAL",
  headline: t("시술 직후부터 일상 복귀까지", "From the treatment room back to everyday life,"),
  headlineStrong: t("5단계 케어 리추얼", "a five-step care ritual"),
  headlineTail: t("을 소개합니다.", "."),
  steps: [
    {
      id: "step-treatment",
      icon: "treatment" as IconName,
      eng: "TREATMENT",
      caption: [t("의원 시술", "In-clinic procedure")],
    },
    {
      id: "step-day0",
      icon: "droplet" as IconName,
      eng: "DAY 0~3",
      caption: [t("LUNION 에센스", "LUNION Essence"), t("즉각 진정", "instant calm")],
    },
    {
      id: "step-day4",
      icon: "moon-stars" as IconName,
      eng: "DAY 4~28",
      caption: [t("LUNION 재생크림", "LUNION Recovery Cream"), t("장벽 회복", "barrier repair")],
    },
    {
      id: "step-day29",
      icon: "sun" as IconName,
      eng: "DAY 29~",
      caption: [t("SOLION 선크림", "SOLION Sunscreen"), t("자외선 차단", "UV defense")],
    },
    {
      id: "step-reorder",
      icon: "reorder" as IconName,
      eng: "RE-ORDER",
      caption: [t("자사몰 재구매", "Reorder on our store"), t("15% 할인", "15% off")],
    },
  ],
  // 구매 링크는 brand.purchase 한 곳에서 관리합니다 (네이버 스마트스토어 예정)
  primaryCta: { label: t("제품 구매", "Shop now"), href: brand.purchase.href },
  secondaryCta: { label: t("판매 의원 안내", "Clinic information"), href: brand.clinic.href },
};

/** ── 8. 버튼·안내 같은 짧은 화면 문구 ────────────────────────────────
 *  섹션 본문이 아니라 메뉴·푸터·읽어주기 설명(aria-label)에 쓰이는 글자입니다.
 *  눈에 보이지 않는 것도 있지만, 화면 읽어주기 프로그램은 이 글자를 읽습니다.
 */
export const uiText = {
  /** 상단 메뉴 */
  home: t("홈으로", "Home"),
  mainMenu: t("주요 메뉴", "Main menu"),
  openMenu: t("메뉴 열기", "Open menu"),
  closeMenu: t("메뉴 닫기", "Close menu"),
  comingSoon: t("준비 중", "Coming soon"),
  account: t("계정 (준비 중)", "Account (coming soon)"),
  shop: t("제품 구매하기", "Shop the products"),
  /** 언어 드롭다운 */
  selectLanguage: t("언어 선택", "Select language"),
  languageList: t("언어 목록", "Languages"),
  /** 풀페이지 이동 */
  sectionNav: t("섹션 바로가기", "Jump to section"),
  backToTop: t("맨 위로", "Back to top"),
  askOnKakao: t("카카오톡 채널로 문의하기", "Ask us on KakaoTalk"),
  /** 푸터 */
  inquiry: t("문의 :", "Contact :"),
  /** 사진이 아직 없는 자리 */
  placeholder: t("자리표시자", "placeholder"),
  /** 오른쪽 점 네비게이션에 뜨는 섹션 이름 (영문 그대로인 항목은 page.tsx 에 직접 적습니다) */
  sectionHero: t("메인", "Main"),
  sectionStats: t("숫자로 보는 브랜드", "By the numbers"),
};
