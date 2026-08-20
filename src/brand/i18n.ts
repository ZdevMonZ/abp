/**
 * 다국어(한국어 · 영어) 기본 도구
 * ---------------------------------------------------------------------------
 * 이 사이트는 한 페이지짜리 정적 사이트(GitHub Pages)라 언어별 페이지를 따로
 * 만들지 않습니다. 대신 **화면의 글자만 바꿔 끼우는** 방식으로 전환합니다.
 *
 * ── 문구를 적을 때 (src/brand/brand.ts · src/brand/content.ts) ──────────────
 *
 *     title: t("우주 방사선 저항균", "Radiation-resistant microbes")
 *            └ 한국어 ─────────────┘  └ 영어 ─────────────────────┘
 *
 *   한국어와 영어가 같은 글자(SOLION · ABOUT US · DAY 0~3 · 50% …)는
 *   t() 로 묶지 않고 그냥 문자열로 적으면 됩니다.
 *
 * ── 화면에 그릴 때 (컴포넌트) ──────────────────────────────────────────────
 *
 *     const t = useText();        // src/brand/locale-store.ts
 *     <p>{t(card.title)}</p>      // 지금 고른 언어의 글자만 나옵니다
 *
 * 언어를 하나 더 늘리려면 (예: 일본어)
 *   1) 아래 LocaleCode 에 "ja" 추가
 *   2) Localized 에 ja 추가 → t() 인자도 하나 늘림
 *   3) brand.locales 에 { code: "ja", ... } 한 줄 추가
 *   4) 문구 파일에서 t() 호출에 일본어를 채우면 타입 검사가 빠진 곳을 알려 줍니다
 */

/** 이 사이트가 지원하는 언어 코드 (brand.locales 와 짝을 맞춥니다) */
export type LocaleCode = "ko" | "en";

/** 한국어 · 영어 한 쌍 */
export type Localized = { readonly ko: string; readonly en: string };

/** 화면에 나갈 글자 — 언어별로 다르면 한 쌍, 두 언어가 같으면 그냥 문자열 */
export type Text = string | Localized;

/** 한국어와 영어를 한 쌍으로 묶습니다 */
export function t(ko: string, en: string): Localized {
  return { ko, en };
}

/** 한 쌍에서 해당 언어의 글자를 꺼냅니다 (그냥 문자열이면 그대로 돌려줍니다) */
export function pick(text: Text, locale: LocaleCode): string {
  return typeof text === "string" ? text : text[locale];
}
