"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/brand/brand";
import { setLocale, useLocale } from "@/brand/locale-store";

/**
 * 언어 선택 드롭다운
 * ---------------------------------------------------------------------------
 * 두 가지 모양으로 씁니다.
 *   variant="footer" — 푸터의 테두리 박스 (위로 열림)
 *   variant="bar"    — 상단 메뉴의 "KR ⌄" (아래로 열림 · 시안과 같은 모양)
 *
 * 선택한 언어는 src/brand/locale-store.ts 에 한 곳에 담겨 있어
 * 상단과 푸터가 항상 같은 값을 보여 줍니다.
 *
 * ⚠️ 지금은 "표시"만 바뀝니다. 실제 번역(i18n)은 아직 붙어 있지 않습니다.
 */
export function LocaleSwitcher({
  variant = "footer",
  onDark = false,
}: {
  variant?: "footer" | "bar";
  /** variant="bar" 에서 어두운 배경 위에 있으면 true (흰 글씨) */
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const currentLocale = useLocale();
  const boxRef = useRef<HTMLDivElement>(null);

  // 바깥을 클릭하거나 Esc 를 누르면 닫기
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSelect = (code: string) => {
    setLocale(code);
    setOpen(false);
  };

  const isBar = variant === "bar";

  const chevron = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div ref={boxRef} className={`relative ${isBar ? "" : "w-[168px]"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="언어 선택"
        className={
          isBar
            ? `flex items-center gap-1 py-2 text-[13px] tracking-[0.12em] transition md:text-[14px] ${
                onDark ? "text-white/80 hover:text-white" : "text-ink-soft hover:text-ink"
              }`
            : "flex h-[54px] w-full items-center justify-between border-2 border-[#666] bg-black px-4 text-[15px] text-white transition hover:border-[#888] md:text-[16px]"
        }
      >
        {isBar ? (
          <>
            {currentLocale.label}
            {chevron}
          </>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
              </svg>
              {currentLocale.native}
            </span>
            <span className={open ? "rotate-180 transition-transform" : "transition-transform"}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              >
                <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </>
        )}
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="언어 목록"
          className={
            isBar
              ? "shadow-float absolute top-full right-0 z-30 w-[132px] overflow-hidden rounded-[10px] border border-line bg-white py-1"
              : "absolute bottom-[54px] left-0 z-20 w-full border-r-2 border-l-2 border-[#666]"
          }
        >
          {brand.locales.map((locale) => {
            const selected = locale.code === currentLocale.code;
            return (
              <li key={locale.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => handleSelect(locale.code)}
                  className={
                    isBar
                      ? `flex w-full items-center justify-between px-3 py-2.5 text-left text-[14px] transition hover:bg-brand-50 ${
                          selected ? "font-semibold text-brand-700" : "text-ink-soft"
                        }`
                      : `flex w-full items-center justify-between border-t-2 border-[#666] bg-black px-4 py-2.5 text-left text-[14px] transition hover:bg-[#111] ${
                          selected ? "text-white" : "text-[#aaa]"
                        }`
                  }
                >
                  {locale.native}
                  {selected ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    >
                      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
