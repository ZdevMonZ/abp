/**
 * 외부 링크 판별 헬퍼
 * ---------------------------------------------------------------------------
 * http로 시작하면 외부 사이트로 보고 새 탭으로 엽니다.
 *  - target="_blank"  : 보던 페이지를 잃지 않게 새 탭에서 열기
 *  - rel="noopener…"  : 외부 페이지가 원래 창을 조작하지 못하게 막는 보안 속성
 * 내부 앵커(#solion 등)에는 아무것도 붙이지 않습니다.
 */
export function linkTargetProps(href: string) {
  return href.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
