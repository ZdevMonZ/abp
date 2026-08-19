import { Fragment } from "react";
import { joinContent } from "@/brand/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { linkTargetProps } from "@/components/link";

/**
 * 7번 섹션 — JOIN US (가입 절차 5단계)
 * 단계를 늘리거나 줄이려면 content.ts 의 joinContent.steps 배열만 고치세요.
 */
export function JoinSection() {
  return (
    <div className="relative w-full overflow-hidden py-16 md:py-20">
      {/* 배경 곡선 장식 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(143,134,221,0.12),transparent_55%)]"
      />

      <div className="relative mx-auto w-full max-w-shell px-5 md:px-10">
        <div data-reveal>
          <SectionHeading
            eyebrow={joinContent.eyebrow}
            lines={[joinContent.headline]}
            strong={joinContent.headlineStrong}
            tail={joinContent.headlineTail}
          />
        </div>

        {/* 단계 원형 카드 — PC 에서는 원과 원 사이에 화살표가 들어갑니다
            (sample.png 의 POST-PROCEDURE JOURNEY 줄) */}
        <div className="relative mt-8 md:mt-12" data-reveal>
          <ul className="relative flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:gap-0 lg:py-8">
            {joinContent.steps.map((step, i) => (
              <Fragment key={step.id}>
                {i > 0 ? (
                  <li aria-hidden="true" className="hidden shrink-0 px-1 lg:block">
                    <Icon name="arrow-right" strokeWidth={1.4} className="h-5 w-5 text-brand-400" />
                  </li>
                ) : null}
                <li className="flex justify-center lg:flex-1">
                  <div className="shadow-card flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-white text-center md:h-[160px] md:w-[160px] lg:h-[158px] lg:w-[158px] xl:h-[200px] xl:w-[200px]">
                    <Icon
                      name={step.icon}
                      strokeWidth={1.1}
                      className="h-8 w-8 text-brand-500 md:h-10 md:w-10 xl:h-[52px] xl:w-[52px]"
                    />
                    <p className="font-display mt-2.5 text-[12px] font-semibold text-brand-400 md:mt-4 md:text-[13px] xl:mt-5 xl:text-[16px]">
                      {step.eng}
                    </p>
                    <p className="keep-all mt-1 text-[14px] leading-[1.3] font-semibold text-ink md:text-[15px] xl:text-[19px]">
                      {step.ko.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>

        {/* 하단 버튼 2개 */}
        <div className="mt-10 flex items-center justify-center gap-4 md:mt-12 md:gap-5">
          <a
            href={joinContent.primaryCta.href}
            {...linkTargetProps(joinContent.primaryCta.href)}
            className="shadow-card rounded-pill flex h-[50px] w-[136px] items-center justify-center bg-gradient-to-r from-brand-400 to-brand-700 text-[15px] font-semibold text-white transition hover:brightness-105 md:h-[66px] md:w-[200px] md:text-[20px]"
          >
            {joinContent.primaryCta.label}
          </a>
          <a
            href={joinContent.secondaryCta.href}
            {...linkTargetProps(joinContent.secondaryCta.href)}
            className="shadow-card rounded-pill flex h-[50px] w-[136px] items-center justify-center border border-surface-mute bg-white text-[15px] font-semibold text-ink transition hover:bg-surface-alt md:h-[66px] md:w-[200px] md:text-[20px]"
          >
            {joinContent.secondaryCta.label}
          </a>
        </div>
      </div>
    </div>
  );
}
