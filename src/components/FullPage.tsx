"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { brand } from "@/brand/brand";
import { uiText } from "@/brand/content";
import { useLocaleSetup, useText } from "@/brand/locale-store";
import { TopNav } from "@/components/TopNav";

export type SectionDef = {
  /** 앵커 id (#service-01 처럼 링크로 쓸 수 있습니다) */
  id: string;
  /** 오른쪽 점 네비게이션에 뜨는 이름 */
  label: string;
  /** 어두운 배경 섹션이면 "light" (점·화살표를 흰색으로) */
  variant?: "dark" | "light";
  /** 한 화면보다 긴 섹션(마지막 CONTACT+푸터)이면 true */
  tall?: boolean;
  /**
   * 배경이 한 섹션 안에서 밝고 어두운 곳으로 갈리면 true.
   * 투명한 상단 메뉴가 한쪽에서 안 보이므로, 이 섹션에서만 메뉴 뒤에 흰 막을 깝니다.
   */
  navBackdrop?: boolean;
  node: ReactNode;
};

/**
 * 풀페이지 스크롤 컨테이너
 * ---------------------------------------------------------------------------
 * 원본은 jQuery 플러그인(fullview.js)으로 스크롤을 가로챘습니다.
 * 여기서는 브라우저 기본 기능인 CSS scroll-snap 을 씁니다.
 *  - 마우스휠·터치·키보드·스크롤바가 전부 자연스럽게 동작합니다
 *  - 모바일(md 미만)에서는 스냅을 끄고 일반 스크롤로 둡니다
 */
export function FullPage({
  sections,
  footer,
}: {
  sections: SectionDef[];
  /** 마지막 섹션 뒤에 붙는 꼬리 영역. 점 네비게이션에는 잡히지 않습니다. */
  footer?: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const t = useText();

  // 지난 방문에서 고른 언어 되살리기 + <html lang> · 탭 제목 맞추기
  // (화면에 항상 떠 있는 컴포넌트라 여기서 한 번만 호출합니다)
  useLocaleSetup();

  // 현재 보이는 섹션 추적 + 등장 애니메이션
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));

    const activeObserver = new IntersectionObserver(
      (entries) => {
        // 화면을 가장 많이 차지한 섹션을 활성으로 본다
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (!best) return;
        const index = items.indexOf(best.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { root, threshold: [0.25, 0.5, 0.75] },
    );
    items.forEach((el) => activeObserver.observe(el));

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { root, threshold: 0.15 },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [sections.length]);

  const goTo = useCallback((index: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));
    const target = items[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // 상단 메뉴에서 id 로 이동
  // 섹션 id 를 먼저 찾고, 없으면 섹션 안의 앵커(SOLION/LUNION 패널 등)를 찾습니다.
  const goToId = useCallback((sectionId: string) => {
    const root = scrollerRef.current;
    if (!root) return;
    const selector = `#${CSS.escape(sectionId)}`;
    const target =
      root.querySelector<HTMLElement>(`[data-section]${selector}`) ??
      root.querySelector<HTMLElement>(selector);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // 키보드 이동 (Home / End / PageUp / PageDown)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(sections.length - 1);
      } else if (e.key === "PageDown") {
        e.preventDefault();
        goTo(Math.min(active + 1, sections.length - 1));
      } else if (e.key === "PageUp") {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo, sections.length]);

  const activeVariant = sections[active]?.variant ?? "dark";
  const navBackdrop = sections[active]?.navBackdrop ?? false;

  return (
    <>
      <TopNav
        variant={navBackdrop ? "dark" : activeVariant}
        backdrop={navBackdrop}
        activeId={sections[active]?.id}
        onJump={goToId}
      />

      <div
        ref={scrollerRef}
        className="h-dvh w-full overflow-x-hidden overflow-y-auto md:snap-y md:snap-mandatory"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-section
            aria-label={section.label}
            className={`relative w-full snap-start ${
              section.tall ? "min-h-dvh" : "flex min-h-dvh flex-col justify-center"
            }`}
          >
            {section.node}
          </section>
        ))}

        {footer ? <div className="snap-start">{footer}</div> : null}
      </div>

      {/* 오른쪽 점 네비게이션 (원본 #fv-dots) */}
      <nav
        aria-label={t(uiText.sectionNav)}
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:block lg:right-10"
      >
        <ul className="flex flex-col items-center gap-1">
          {sections.map((section, i) => {
            const isActive = i === active;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={section.label}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex h-6 w-6 items-center justify-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isActive ? "h-[10px] w-[10px]" : "h-[7px] w-[7px]"
                    } ${
                      activeVariant === "light"
                        ? isActive
                          ? "bg-white/90"
                          : "bg-white/40 group-hover:bg-white/70"
                        : isActive
                          ? "bg-ink-mute"
                          : "bg-line group-hover:bg-ink-faint"
                    }`}
                  />
                  <span className="pointer-events-none absolute right-full mr-2 hidden rounded bg-ink/85 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 우하단 플로팅 버튼 (원본 .log-back-top) */}
      <div className="fixed right-4 bottom-5 z-40 flex flex-col gap-2 md:right-5 md:bottom-6 md:gap-2.5 lg:right-10">
        <a
          href={brand.contact.messenger.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(uiText.askOnKakao)}
          className="shadow-card flex h-11 w-11 items-center justify-center rounded-full bg-[#f4d94e] text-ink transition hover:brightness-105 md:h-14 md:w-14"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-2.9-.4L4 21l1.4-3.8A8.3 8.3 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => goTo(0)}
          aria-label={t(uiText.backToTop)}
          className={`shadow-card flex h-11 w-11 items-center justify-center rounded-full bg-brand-400 text-white transition hover:bg-brand-500 md:h-14 md:w-14 ${
            active === 0 ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-6 w-6">
            <path d="M12 19V5m0 0-7 7m7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
