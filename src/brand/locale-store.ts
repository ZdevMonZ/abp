"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { brand } from "@/brand/brand";
import { pick, type LocaleCode, type Text } from "@/brand/i18n";

/**
 * 언어 선택 상태 (아주 작은 공용 저장소)
 * ---------------------------------------------------------------------------
 * 언어 드롭다운이 화면에 두 곳(상단 메뉴의 KOR, 푸터)에 있습니다.
 * 각자 따로 기억하면 한쪽은 "한국어", 다른 쪽은 "English" 로 어긋나므로
 * 여기 한 곳에 담아 두고 둘 다 이 값을 봅니다.
 *
 * 여기서 언어를 바꾸면 **화면의 모든 글자가 같이 바뀝니다.**
 * 글자는 src/brand/content.ts · src/brand/brand.ts 에 한국어·영어가 나란히 적혀 있고,
 * 컴포넌트가 useText() 로 그중 한쪽을 골라 그립니다. (설명 → src/brand/i18n.ts)
 */

type Locale = (typeof brand.locales)[number];

const DEFAULT_CODE: LocaleCode = brand.locales[0].code;

/** 브라우저에 선택을 기억해 두는 칸 이름 — 다음 방문 때 같은 언어로 열립니다 */
const STORAGE_KEY = "abp.locale";

let currentCode: LocaleCode = DEFAULT_CODE;
const listeners = new Set<() => void>();

/** brand.locales 에 있는 코드인지 확인 (오래된 저장값·오타를 걸러 냅니다) */
function isSupported(code: string | null | undefined): code is LocaleCode {
  return !!code && brand.locales.some((locale) => locale.code === code);
}

export function setLocale(code: string) {
  if (!isSupported(code) || code === currentCode) return;
  currentCode = code;
  // localStorage 는 시크릿 모드·차단 설정에서 예외를 던질 수 있어 감싸 둡니다
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* 기억해 두지 못해도 이번 방문 동안은 정상 동작합니다 */
  }
  listeners.forEach((notify) => notify());
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

/**
 * ★ 화면에 글자를 그릴 때 쓰는 번역 함수
 *
 *     const t = useText();
 *     <p>{t(card.title)}</p>   // 지금 고른 언어의 글자
 *
 * t() 는 한국어·영어 한 쌍이든 그냥 문자열이든 모두 받습니다.
 */
export function useText() {
  const { code } = useLocale();
  return useCallback((text: Text) => pick(text, code), [code]);
}

/**
 * 앱이 한 번만 실행하는 뒷정리 (FullPage 에서 호출합니다)
 *  1) 지난 방문에서 고른 언어를 되살립니다
 *  2) <html lang="…"> 을 고른 언어에 맞춥니다 (읽어주기 프로그램·번역 기능이 봅니다)
 *
 * 1) 을 화면이 처음 그려진 **뒤**에 하는 이유: 미리 만들어 둔 HTML(한국어)과
 * 첫 렌더 결과가 어긋나면 React 가 경고를 내고 화면이 깨질 수 있습니다.
 * 그래서 첫 화면은 한국어로 맞춰 그린 뒤 곧바로 저장된 언어로 바꿉니다.
 */
export function useLocaleSetup() {
  const locale = useLocale();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isSupported(saved)) setLocale(saved);
    } catch {
      /* 저장값을 못 읽으면 기본 언어(한국어)로 둡니다 */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale.code;
  }, [locale.code]);
}
