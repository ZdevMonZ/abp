"use client";

import { useEffect, useRef, useState } from "react";
import { statsContent } from "@/brand/content";
import { Icon } from "@/components/Icon";

/**
 * 6번 섹션 — 숫자 지표
 * 화면에 들어오면 0부터 목표값까지 올라가는 카운터 (원본의 .counter)
 */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;

          // 사용자가 '동작 줄이기'를 켜뒀으면 애니메이션 없이 최종값만 보여준다
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(value);
            continue;
          }

          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // 끝으로 갈수록 느려지는 곡선
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="mt-2.5 text-[28px] font-semibold md:text-[40px]">
      {display}
      {suffix}
    </p>
  );
}

export function StatsSection() {
  return (
    <div className="relative w-full overflow-hidden py-16 md:py-20">
      {/* 하단 도시 실루엣 장식 (원본 배경 이미지 자리) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-alt to-transparent"
      />

      <div className="relative mx-auto w-full max-w-shell px-5 md:px-10">
        <p className="keep-all text-center text-[20px] leading-[1.4] font-light md:text-[34px]">
          {statsContent.headline}
          <span className="block">
            <span className="font-semibold">{statsContent.headlineStrong}</span>
            {statsContent.headlineTail}
          </span>
        </p>

        <ul
          className="mt-8 flex flex-wrap items-start justify-between gap-y-8 md:mt-24 md:flex-nowrap"
          data-reveal
        >
          {statsContent.items.map((item) => (
            <li key={item.id} className="w-1/2 text-center md:w-auto md:flex-1">
              <div className="flex justify-center">
                <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-brand-200 bg-white/70 md:h-[112px] md:w-[112px]">
                  <Icon
                    name={item.icon}
                    strokeWidth={1}
                    className="h-9 w-9 text-brand-500 md:h-14 md:w-14"
                  />
                </span>
              </div>
              <div className="mt-4 md:mt-7">
                <p className="text-[16px] font-light md:text-[24px]">{item.label}</p>
                <Counter value={item.value} suffix={item.suffix} />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-right text-[13px] font-light text-ink-faint md:text-[16px]">
          {statsContent.notice}
        </p>
      </div>

    </div>
  );
}
