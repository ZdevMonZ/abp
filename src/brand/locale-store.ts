"use client";

import { useSyncExternalStore } from "react";
import { brand } from "@/brand/brand";

/**
 * 언어 선택 상태 (아주 작은 공용 저장소)
 * ---------------------------------------------------------------------------
 * 언어 드롭다운이 화면에 두 곳(상단 메뉴의 KR, 푸터)에 있습니다.
 * 각자 따로 기억하면 한쪽은 "한국어", 다른 쪽은 "English" 로 어긋나므로
 * 여기 한 곳에 담아 두고 둘 다 이 값을 봅니다.
 *
 * ⚠️ 지금은 "표시"만 바뀝니다. 실제 번역(i18n)은 아직 붙어 있지 않습니다.
 *    next-intl 같은 다국어 도구를 붙일 때 setLocale 안에서 언어를 전환하세요.
 */
type Locale = (typeof brand.locales)[number];

const DEFAULT_CODE = brand.locales[0].code;

let currentCode: string = DEFAULT_CODE;
const listeners = new Set<() => void>();

export function setLocale(code: string) {
  if (code === currentCode) return;
  currentCode = code;
  listeners.forEach((notify) => notify());
  // TODO: 다국어 도구를 붙이면 여기서 실제 언어 전환을 호출하세요.
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

/** 지금 선택된 언어. 서버 렌더 때는 항상 첫 번째 언어로 그립니다. */
export function useLocale(): Locale {
  const code = useSyncExternalStore(
    subscribe,
    () => currentCode,
    () => DEFAULT_CODE,
  );
  return brand.locales.find((locale) => locale.code === code) ?? brand.locales[0];
}
