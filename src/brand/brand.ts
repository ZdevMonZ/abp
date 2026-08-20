/**
 * 브랜드 정보 단일 소스 (Single Source of Truth)
 * ---------------------------------------------------------------------------
 * 내용 출처: 기획서.md (SOLION & LUNION Two-Track 사업 기획서, 2026.07)
 *
 * ⚠️ TODO 표시된 항목은 기획서에 없는 정보라 임의로 만들지 않고 비워 뒀습니다.
 *    실제 값이 정해지면 바꿔 주세요.
 *
 * ★ t("한국어", "English") = 언어 드롭다운에 따라 바뀌는 글자입니다.
 *   두 언어가 같은 글자(SOLION & LUNION 같은 고유명·영문 문구)는 t() 없이 그냥 적습니다.
 *   자세한 설명 → src/brand/i18n.ts
 */

import { t } from "@/brand/i18n";

/** 판매 의원 (아래 brand.clinic / brand.purchase 가 함께 참조합니다) */
const clinic = {
  name: t("명동 뮤즈 의원", "Myeongdong Muse Clinic"),
  href: "https://myeongdong.museclinic.co.kr/",
} as const;

export const brand = {
  /** 로고 자리 워드마크 — 두 브랜드를 묶는 상위 명칭이 정해지면 교체하세요 */
  wordmark: "SOLION & LUNION",
  nameKo: "솔리온 & 루니온",

  title: t("SOLION & LUNION — 피부 위의 우주", "SOLION & LUNION — The Universe on Your Skin"),
  description: t(
    "시술 후 피부를 밤새 회복시키는 LUNION, 낮의 자외선을 막는 SOLION. 마이크로바이옴 기반 포스트 프로시저 스킨케어.",
    "LUNION restores post-procedure skin overnight, SOLION shields it from daytime UV. Microbiome-based post-procedure skincare.",
  ),

  /** 로고 위 리드 문구 (현재 화면에는 안 나옵니다) */
  introLead: "Post-Procedure Skincare Ecosystem",
  /** ★ 첫 화면 아래쪽 슬로건 — HeroSection 이 씁니다 (두 언어 공통 영문) */
  introHeadline: "The universe lives on your skin.",

  /**
   * ★ 언어 드롭다운에 뜨는 목록 (첫 번째가 기본 언어입니다)
   *   code   — src/brand/i18n.ts 의 LocaleCode 와 같아야 합니다
   *   label  — 상단 메뉴에 짧게 뜨는 이름
   *   native — 드롭다운 목록에 뜨는 이름
   */
  locales: [
    { code: "ko", label: "KOR", native: "한국어" },
    { code: "en", label: "ENG", native: "English" },
  ],

  contact: {
    label: t("고객센터", "Customer Care"),
    phone: "0000-0000", // TODO: 고객센터 번호 미정
    hours: t("평일상담 : 00:00~00:00", "Weekdays : 00:00~00:00"), // TODO: 상담 시간 미정
    holiday: t("토요일/일요일/공휴일 휴무", "Closed on weekends and public holidays"),
    email: "solion@naver.com",
    address: t(
      "서울특별시 중구 퇴계로 97, 고려대연각타워 3층",
      "3F Korea Yeongak Tower, 97 Toegye-ro, Jung-gu, Seoul, Korea",
    ),
    /** 약도 안내 — 주소 아래 한 줄로 따로 표시됩니다 */
    directions: t(
      "명동역 5번 출구 도보 5분 · 회현역 7번 출구 신세계백화점 맞은편",
      "5 min from Myeongdong Stn. Exit 5 · Opposite Shinsegae Dept. Store, Hoehyeon Stn. Exit 7",
    ),
    /** 카카오톡 채널 — 우하단 플로팅 버튼이 씁니다 */
    messenger: { label: t("채널추가", "Add channel"), href: "https://pf.kakao.com/_fqUxaK" },
  },

  /** 판매 의원 — "판매 의원 안내" 버튼들이 함께 참조합니다 */
  clinic,

  /**
   * ★ 구매 링크 단일 소스
   * 상단 메뉴 "구매하기" 와 CARE RITUAL 의 "제품 구매" 가 이 주소 하나를 봅니다.
   *
   * TODO: 네이버 스마트스토어가 열리면 아래 href 를 스토어 주소로 바꾸세요.
   *       이 한 줄만 고치면 두 버튼이 같이 바뀝니다.
   *       (열리기 전까지는 1차 판매 채널인 명동 뮤즈 의원으로 연결합니다)
   */
  purchase: {
    label: t("네이버 스마트스토어", "Naver Smart Store"), // 개설 예정 채널
    href: clinic.href,
  },

  footer: {
    policies: [
      { label: t("이용약관", "Terms of Use"), href: "#" },
      { label: t("개인정보취급방침", "Privacy Policy"), href: "#" },
    ],
    copyright: "©SOLION & LUNION. All rights reserved.",
  },
} as const;

export type Brand = typeof brand;
