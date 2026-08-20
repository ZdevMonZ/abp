"use client";

import { useText } from "@/brand/locale-store";
import { Icon } from "@/components/Icon";
import { SectionBanner } from "@/components/SectionBanner";
import { SectionHeading } from "@/components/SectionHeading";
import type { ServiceSectionData } from "@/brand/content";

/**
 * 소개 섹션 (제목 + 대표 배너 + 특징 3개)
 * ---------------------------------------------------------------------------
 * 원본은 MALL / HUB / FACULTY 세 섹션이 거의 같은 HTML 을 세 번 반복했습니다.
 * 여기서는 데이터(content.ts 의 serviceSections)만 바꾸면 섹션이 늘고 줄어듭니다.
 *
 * SOLION·LUNION 은 좌우 대비 섹션(DuoSection)으로 옮겨져서
 * 지금 이 컴포넌트를 쓰는 곳은 SCIENCE 섹션 하나입니다.
 */
export function ServiceSection({ service }: { service: ServiceSectionData }) {
  const t = useText();

  return (
    <div className="relative w-full py-16 md:py-20">
      <div className="mx-auto w-full max-w-shell px-5 md:px-10">
        <div data-reveal>
          <SectionHeading
            eyebrow={service.eyebrow}
            icon={service.icon}
            lines={[t(service.headline)]}
            strong={t(service.headlineStrong)}
          />
        </div>

        {/* 대표 이미지 */}
        <div className="rounded-card shadow-card relative mt-6 overflow-hidden md:mt-10" data-reveal>
          <SectionBanner
            src={service.visualSrc}
            label={t(service.visualLabel)}
            tone={service.visualTone}
            focus={service.visualFocus}
          />
        </div>

        {/* 특징 3개 — PC 에서는 얇은 세로줄로 칸을 나눕니다 (sample.png SCIENCE 줄) */}
        <ul
          className="mt-7 grid grid-cols-1 gap-2.5 md:mt-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line"
          data-reveal
        >
          {service.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-5 md:flex-col md:gap-0 md:px-6 md:text-center"
            >
              <Icon
                name={feature.icon}
                strokeWidth={1}
                className="h-12 w-12 text-brand-500 md:h-[72px] md:w-[72px]"
              />
              <p className="keep-all text-[15px] leading-[1.5] font-light md:mt-4 md:text-[20px]">
                {t(feature.lead)}
                <span className="block font-semibold">{t(feature.strong)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
