"use client";

import { brand } from "@/brand/brand";
import { useText } from "@/brand/locale-store";

/**
 * 브라우저 탭 제목
 * ---------------------------------------------------------------------------
 * 고른 언어를 따라갑니다. React 가 이 <title> 을 <head> 로 올려 주므로
 * 언어를 바꾸면 탭 제목도 같이 바뀝니다.
 *
 * ⚠️ 탭 제목을 이렇게 컴포넌트로 그리는 이유
 * Next.js 의 metadata 로 넣은 제목은 화면이 뜬 직후 한 번 더 덮어써질 때가 있어,
 * 코드로 document.title 을 바꿔 두면 새로고침할 때 한국어로 되돌아갔습니다.
 * 그래서 제목도 다른 글자들과 똑같이 React 가 그리게 두었습니다.
 * (검색·카톡 미리보기에 쓰이는 제목은 src/app/layout.tsx 의 openGraph 가 담당)
 */
export function LocaleTitle() {
  const t = useText();
  return <title>{t(brand.title)}</title>;
}
