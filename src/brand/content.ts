/**
 * 섹션별 문구 데이터
 * ---------------------------------------------------------------------------
 * 내용 출처: 기획서.md (SOLION & LUNION Two-Track 사업 기획서, 2026.07)
 * 화면에 보이는 글자는 전부 여기 있습니다.
 * 섹션을 추가/삭제하려면 src/app/page.tsx 의 배열을 수정하세요.
 *
 * `icon: "..."` 은 항목 옆에 그려지는 선 아이콘 이름입니다.
 * 고를 수 있는 이름과 그림은 src/components/Icon.tsx 에 모여 있습니다.
 */

import { brand } from "@/brand/brand";
import type { IconName } from "@/components/Icon";
import type { Tone } from "@/components/Placeholder";

/** ── 0. 상단 메뉴 (brand.png 시안 구성) ─────────────────────────────
 *  target = 이동할 섹션 id (src/app/page.tsx 의 id 와 같아야 합니다)
 *  match  = 이 섹션들을 보고 있을 때 메뉴에 밑줄이 켜집니다
 *  soon   = 아직 만들 페이지가 없어 흐리게 표시하고 눌리지 않습니다
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
  headline: "피부 위의 우주.",
  sub: ["낮에는 SOLION으로 막고,", "밤에는 LUNION으로 회복한다"],
};

/** ── 2. ABOUT US ───────────────────────────────────────────────────── */
export const aboutContent = {
  eyebrow: "ABOUT US",
  headline: ["극한에서 살아남은 균이", "피부를 지킵니다"],
  headlineStrong: "SOLION & LUNION",
  cards: [
    {
      id: "about-microbe",
      icon: "biome" as IconName,
      title: "우주 방사선 저항균",
      body: ["극한 환경에서 살아남은", "미생물의 생존력을 피부 보호에"],
    },
    {
      id: "about-safety",
      icon: "shield-check" as IconName,
      title: "포스트바이오틱 안전 설계",
      body: ["생균이 아닌 발효물·사균체", "형태로 배합"],
      note: "※ 국내 화장품 미생물 한도 기준 충족",
    },
    {
      id: "about-cycle",
      icon: "cycle" as IconName,
      title: "낮과 밤, 완전한 케어 사이클",
      body: ["SOLION 차단 + LUNION 회복", "하나의 이온(-ion) 철학"],
    },
    {
      id: "about-channel",
      icon: "flask" as IconName,
      title: "병원 채널에서 시작",
      body: ["시술 후 환자에게", "의원에서 직접 처방"],
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
      headline: "낮 — 우주급 자외선 차단",
      lead: "자외선과 외부 자극에 그대로 노출되는 낮. NASA 클린룸에서 발견된 균주와 무기 자외선 필터를 함께 담아 피부를 지킵니다.",
      visualSrc: "/solion.webp",
      visualAlt: "SOLION Cosmic Screen 선크림 라인업",
      features: [
        { icon: "biome" as IconName, lead: "NASA 클린룸에서 발견된", strong: "Bacillus Lysate" },
        { icon: "shield" as IconName, lead: "무기 자외선 필터", strong: "ZnO · TiO₂ 이중 보호" },
        { icon: "droplet" as IconName, lead: "UV·DNA 보호와 수분 보호막", strong: "엑토인 배합" },
      ],
      // 구매 링크는 brand.purchase 한 곳에서 관리합니다 (네이버 스마트스토어 예정)
      links: [{ label: "제품 구매하기", href: brand.purchase.href }],
    },
    {
      id: "lunion",
      tone: "night" as const,
      kicker: "NIGHT · RECOVER",
      name: "LUNION",
      icon: "moon-stars" as IconName,
      sub: "재생크림 · 에센스",
      headline: "밤 — 시술 후 재생과 진정",
      lead: "시술 직후의 예민한 피부가 쉬는 밤. PDRN·엑토인·비피다 발효물이 무너진 장벽을 다시 세웁니다.",
      visualSrc: "/lunion.webp",
      visualAlt: "LUNION 재생크림 · 에센스 라인업",
      features: [
        { icon: "dna" as IconName, lead: "PDRN + 엑토인 + 비피다발효용해물", strong: "장벽 회복 · 수분 공급" },
        { icon: "droplet" as IconName, lead: "L. paracasei 발효물 + 판테놀", strong: "즉각 진정 · 민감성 케어" },
        { icon: "flask" as IconName, lead: "명동 뮤즈 의원", strong: "시술 후 직접 처방" },
      ],
      note: "재구매는 자사몰에서 15% 할인",
      links: [
        { label: "제품 구매하기", href: brand.purchase.href },
        { label: "판매 의원 안내", href: brand.clinic.href },
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
  lead: "낮과 밤을 따로 보지 않고, 보호와 회복을 하나의 루틴으로 설계합니다.",
  cards: [
    {
      id: "cycle-day",
      tag: "DAY / SOLION",
      title: "PROTECT",
      icon: "sun" as IconName,
      body: "외부 자극에 노출되는 낮, 피부 방어에 집중합니다.",
    },
    {
      id: "cycle-night",
      tag: "NIGHT / LUNION",
      title: "RECOVER",
      icon: "moon-stars" as IconName,
      body: "하루를 마친 밤, 회복 중심의 리듬으로 전환합니다.",
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
  headline: string;
  headlineStrong: string;
  /** 배너 자리에 들어갈 설명 (사진이 없으면 자리표시자에 이 글자가 보입니다) */
  visualLabel: string;
  visualTone: Tone;
  /** 배너 사진 — public/ 아래 파일 경로. 없으면 자리표시자가 나옵니다 */
  visualSrc?: string;
  /** PC 배너에서 보여줄 높이 위치 (0% = 맨 위, 100% = 맨 아래) */
  visualFocus?: string;
  features: readonly { icon: IconName; lead: string; strong: string }[];
};

export const serviceSections: readonly ServiceSectionData[] = [
  {
    id: "science",
    eyebrow: "SCIENCE",
    icon: "biome",
    headline: "우주에서 살아남은 균이",
    headlineStrong: "피부 위에서 당신을 지킵니다",
    visualLabel: "균 콜로니가 성운처럼 퍼져나가는 로고 비주얼",
    visualTone: "brand",
    features: [
      { icon: "shield", lead: "우주 방사선 저항균", strong: "Deinococcus 유래 Mn-SOD" },
      { icon: "biome", lead: "피부에 공생하는 유익균", strong: "마이크로바이옴 장벽 케어" },
      { icon: "ion", lead: "Sol + Ion / Luna + Ion", strong: "하나의 이온 철학" },
    ],
  },
];

/** ── 6. 숫자 지표 ───────────────────────────────────────────────────── */
export const statsContent = {
  headline: "균이 만드는 보호막을",
  headlineStrong: "숫자로 확인",
  headlineTail: "하세요.",
  notice: "※ Bacillus Lysate 원료사 제공 자료 기준 (2026.07)",
  items: [
    { id: "stat-spf", icon: "sun" as IconName, label: "SPF 부스팅", value: 33, suffix: "%" },
    { id: "stat-ros", icon: "shield-check" as IconName, label: "ROS 억제", value: 90, suffix: "%+" },
    { id: "stat-recovery", icon: "calendar" as IconName, label: "시술 후 집중 회복", value: 28, suffix: "일" },
    { id: "stat-strain", icon: "biome" as IconName, label: "마이크로바이옴 균주", value: 4, suffix: "종" },
  ],
};

/** ── 7. 케어 리추얼 (원본의 JOIN US 자리) ──────────────────────────── */
export const joinContent = {
  eyebrow: "CARE RITUAL",
  headline: "시술 직후부터 일상 복귀까지",
  headlineStrong: "5단계 케어 리추얼",
  headlineTail: "을 소개합니다.",
  steps: [
    { id: "step-treatment", icon: "treatment" as IconName, eng: "TREATMENT", ko: ["의원 시술"] },
    { id: "step-day0", icon: "droplet" as IconName, eng: "DAY 0~3", ko: ["LUNION 에센스", "즉각 진정"] },
    { id: "step-day4", icon: "moon-stars" as IconName, eng: "DAY 4~28", ko: ["LUNION 재생크림", "장벽 회복"] },
    { id: "step-day29", icon: "sun" as IconName, eng: "DAY 29~", ko: ["SOLION 선크림", "자외선 차단"] },
    { id: "step-reorder", icon: "reorder" as IconName, eng: "RE-ORDER", ko: ["자사몰 재구매", "15% 할인"] },
  ],
  // 구매 링크는 brand.purchase 한 곳에서 관리합니다 (네이버 스마트스토어 예정)
  primaryCta: { label: "제품 구매", href: brand.purchase.href },
  secondaryCta: { label: "판매 의원 안내", href: brand.clinic.href },
};
