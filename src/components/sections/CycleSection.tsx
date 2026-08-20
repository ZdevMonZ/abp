"use client";

import { cycleContent } from "@/brand/content";
import { useText } from "@/brand/locale-store";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * 4번 섹션 — 24H SKIN CYCLE
 * ---------------------------------------------------------------------------
 * 레퍼런스: solion-lunion-site/index.html 의 .cycle 구성
 * 왼쪽 DAY 카드 · 가운데 원형 다이어그램 · 오른쪽 NIGHT 카드.
 * 좁은 화면에서는 세로로 쌓입니다(카드 → 원 → 카드).
 *
 * 문구는 src/brand/content.ts 의 cycleContent 에서 옵니다.
 */
export function CycleSection() {
  const t = useText();
  const [day, night] = cycleContent.cards;

  return (
    <div className="relative w-full overflow-hidden py-16 md:py-20">
      {/* 배경 — 위는 흰색, 아래로 갈수록 옅은 라벤더 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white to-brand-50"
      />

      <div className="relative mx-auto w-full max-w-shell px-5 md:px-10">
        <div data-reveal>
          <SectionHeading
            eyebrow={cycleContent.eyebrow}
            icon="cycle"
            lines={[cycleContent.headline]}
          />
          <p className="keep-all mx-auto mt-4 max-w-[560px] text-center text-[14px] leading-[1.6] text-ink-soft md:text-[16px]">
            {t(cycleContent.lead)}
          </p>
        </div>

        <div
          className="mt-9 grid grid-cols-1 items-center gap-5 md:mt-14 md:grid-cols-[1fr_1.1fr_1fr] md:gap-6"
          data-reveal
        >
          <CycleCard card={day} />

          {/* 가운데 원형 다이어그램 */}
          <div className="order-first mx-auto w-full max-w-[300px] md:order-none md:max-w-none">
            <div
              className="relative grid aspect-square place-items-center rounded-full border border-brand-300/40"
              style={{
                background:
                  "radial-gradient(circle at 50% 42%, #fff 0 28%, #edeafb 29% 54%, rgba(143,134,221,0.24) 55% 68%, rgba(143,134,221,0.06) 69% 100%)",
                boxShadow: "0 25px 70px rgba(90, 85, 192, 0.18)",
              }}
            >
              {/* 비스듬히 겹쳐 도는 두 개의 궤도 */}
              <span
                aria-hidden="true"
                className="absolute inset-[14%] rotate-[15deg] rounded-full border border-brand-400/45"
              />
              <span
                aria-hidden="true"
                className="absolute inset-[7%] -rotate-[14deg] rounded-full border border-brand-400/30"
              />

              {/* 해 = 낮(왼쪽 위) · 달 = 밤(오른쪽 아래) */}
              <Icon
                name="sun"
                strokeWidth={1.1}
                className="absolute top-[13%] left-1/2 h-6 w-6 -translate-x-1/2 text-brand-500 md:h-7 md:w-7"
              />
              <Icon
                name="moon-stars"
                strokeWidth={1.1}
                className="absolute bottom-[13%] left-1/2 h-6 w-6 -translate-x-1/2 text-brand-600 md:h-7 md:w-7"
              />

              <div className="relative z-10 px-6 text-center">
                <p className="font-display text-[18px] font-semibold tracking-[0.06em] text-ink md:text-[22px] lg:text-[26px]">
                  {cycleContent.center.big}
                </p>
                <p className="font-display mt-1.5 text-[10px] tracking-[0.18em] text-ink-mute md:text-[11px]">
                  {cycleContent.center.small}
                </p>
              </div>
            </div>
          </div>

          <CycleCard card={night} />
        </div>
      </div>
    </div>
  );
}

function CycleCard({ card }: { card: (typeof cycleContent.cards)[number] }) {
  const t = useText();

  return (
    <div className="rounded-card border border-line bg-white/85 p-6 md:min-h-[190px] md:p-8">
      <p className="font-display flex items-center gap-2 text-[10px] tracking-[0.18em] text-brand-600 md:text-[11px]">
        <Icon name={card.icon} strokeWidth={1.2} className="h-4 w-4" />
        {card.tag}
      </p>
      <p className="font-display mt-2 text-[24px] font-semibold tracking-[0.06em] text-ink md:mt-3 md:text-[28px]">
        {card.title}
      </p>
      <p className="keep-all mt-3 text-[13px] leading-[1.6] text-ink-soft md:mt-4">{t(card.body)}</p>
    </div>
  );
}
