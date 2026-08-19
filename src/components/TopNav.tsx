"use client";

import { useEffect, useState } from "react";
import { brand } from "@/brand/brand";
import { navItems } from "@/brand/content";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/**
 * 상단 메뉴바 (brand.png 시안 구성)
 * ---------------------------------------------------------------------------
 * 화면 맨 위에 가로로 꽉 차게 떠 있는 투명한 바입니다.
 *   왼쪽  — 워드마크
 *   가운데 — BRAND / SOLION / LUNION / SCIENCE / JOURNAL
 *   오른쪽 — 계정 · 구매(장바구니) · 언어(KR)
 *
 * 메뉴 항목은 src/brand/content.ts 의 navItems 배열에서 옵니다.
 * 어두운 섹션 위에서는 흰 글씨, 밝은 섹션에서는 검은 글씨로 바뀝니다.
 * 화면이 좁으면(md 미만) 메뉴를 접고 햄버거(≡) 버튼으로 펼칩니다.
 */
export function TopNav({
  variant,
  backdrop = false,
  activeId,
  onJump,
}: {
  /** 지금 보고 있는 섹션이 어두운 배경이면 "light" */
  variant: "dark" | "light";
  /** 배경이 밝고 어두운 곳으로 갈리는 섹션에서 메뉴 뒤에 흰 막을 깝니다 */
  backdrop?: boolean;
  activeId?: string;
  onJump: (sectionId: string) => void;
}) {
  const onDark = variant === "light";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleJump = (sectionId: string) => {
    setMenuOpen(false);
    onJump(sectionId);
  };

  const iconTone = onDark
    ? "text-white/80 hover:text-white"
    : "text-ink-soft hover:text-ink";

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* 밝고 어두운 배경이 한 화면에 같이 있는 섹션에서만 깔리는 흰 막 */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-line bg-white/85 backdrop-blur-md transition-opacity duration-300 ${
          backdrop ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative mx-auto flex h-[62px] max-w-shell items-center gap-4 px-5 md:h-[86px] md:px-10">
        {/* ── 왼쪽: 워드마크 ─────────────────────────────── */}
        <button
          type="button"
          onClick={() => handleJump("hero")}
          aria-label={`${brand.wordmark} 홈으로`}
          className={`font-display shrink-0 text-[15px] font-semibold tracking-[0.18em] transition md:text-[19px] ${
            onDark ? "text-white hover:text-white/80" : "text-ink hover:text-brand-700"
          }`}
        >
          {brand.wordmark}
        </button>

        {/* ── 가운데: 메뉴 (넓은 화면) ────────────────────── */}
        <nav aria-label="주요 메뉴" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-7 xl:gap-10">
            {navItems.map((item) => {
              const active = !!item.match && !!activeId && item.match.includes(activeId);

              if (item.soon) {
                return (
                  <li key={item.label}>
                    <span
                      aria-disabled="true"
                      title="준비 중"
                      className={`cursor-default text-[14px] tracking-[0.16em] ${
                        onDark ? "text-white/35" : "text-ink-faint"
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => item.target && handleJump(item.target)}
                    aria-current={active ? "true" : undefined}
                    className={`relative text-[14px] tracking-[0.16em] transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 ${
                      active ? "after:scale-x-100" : ""
                    } ${
                      onDark
                        ? active
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : active
                          ? "text-brand-700"
                          : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── 오른쪽: 계정 · 구매 · 언어 ──────────────────── */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-4 lg:ml-0">
          {/* 계정 — 로그인 기능이 없어 준비 중 표시입니다 */}
          <span
            aria-disabled="true"
            title="계정 (준비 중)"
            className={`hidden cursor-default md:block ${
              onDark ? "text-white/35" : "text-ink-faint"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-[22px] w-[22px]">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
            </svg>
          </span>

          {/* 구매 — brand.purchase 한 곳에서 관리 (네이버 스마트스토어 예정) */}
          <a
            href={brand.purchase.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`제품 구매하기 (${brand.purchase.label})`}
            className={`transition ${iconTone}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-[22px] w-[22px]">
              <path d="M5 8h14l-1.1 11.2a1.6 1.6 0 0 1-1.6 1.4H7.7a1.6 1.6 0 0 1-1.6-1.4Z" strokeLinejoin="round" />
              <path d="M9 8V6.6a3 3 0 0 1 6 0V8" strokeLinecap="round" />
            </svg>
          </a>

          <LocaleSwitcher variant="bar" onDark={onDark} />

          {/* 햄버거 — 좁은 화면에서만 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="top-nav-mobile"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className={`transition lg:hidden ${iconTone}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-6 w-6">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── 좁은 화면에서 펼쳐지는 메뉴 ────────────────────── */}
      {menuOpen ? (
        <>
        {/* 메뉴 바깥을 누르면 닫히도록 깔아 두는 투명한 막 */}
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 -z-10 cursor-default lg:hidden"
        />
        <nav
          id="top-nav-mobile"
          aria-label="주요 메뉴"
          className="shadow-float border-t border-line bg-white/95 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto max-w-shell px-5 py-2 md:px-10">
            {navItems.map((item) =>
              item.soon ? (
                <li key={item.label} className="border-b border-line last:border-0">
                  <span
                    aria-disabled="true"
                    className="block py-3.5 text-[15px] tracking-[0.16em] text-ink-faint"
                  >
                    {item.label}
                    <span className="ml-2 text-[12px] tracking-normal">준비 중</span>
                  </span>
                </li>
              ) : (
                <li key={item.label} className="border-b border-line last:border-0">
                  <button
                    type="button"
                    onClick={() => item.target && handleJump(item.target)}
                    className="block w-full py-3.5 text-left text-[15px] tracking-[0.16em] text-ink transition hover:text-brand-700"
                  >
                    {item.label}
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
        </>
      ) : null}
    </header>
  );
}
