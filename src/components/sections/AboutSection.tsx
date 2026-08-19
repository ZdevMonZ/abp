import { aboutContent } from "@/brand/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * 2번 섹션 — ABOUT US (강점 카드 4개)
 * 카드를 늘리거나 줄이려면 src/brand/content.ts 의 aboutContent.cards 배열만 고치세요.
 */
export function AboutSection() {
  return (
    <div className="relative w-full py-16 md:py-20">
      <div className="mx-auto w-full max-w-shell px-5 md:px-10">
        <div data-reveal>
          <SectionHeading
            eyebrow={aboutContent.eyebrow}
            lines={aboutContent.headline}
            strong={aboutContent.headlineStrong}
          />
        </div>

        <ul
          className="mt-8 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-4"
          data-reveal
        >
          {aboutContent.cards.map((card, i) => (
            <li
              key={card.id}
              className={`rounded-card flex items-center gap-4 p-5 md:flex-col md:items-stretch md:justify-between md:gap-5 md:p-10 md:pb-8 ${
                i % 2 === 0 ? "bg-surface-tint" : "bg-surface-mute"
              }`}
            >
              <div className="order-2 flex-1 md:order-1">
                <p className="keep-all text-[16px] font-semibold text-ink md:text-[20px]">
                  {card.title}
                </p>
                <p className="keep-all mt-1.5 text-[14px] leading-[1.3] text-ink-soft md:text-[18px]">
                  {card.body.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                {"note" in card && card.note ? (
                  <p className="mt-1.5 text-[12px] text-brand-500">{card.note}</p>
                ) : null}
              </div>
              <div className="order-1 shrink-0 md:order-2 md:self-center">
                <Icon
                  name={card.icon}
                  strokeWidth={1}
                  className="h-12 w-12 text-brand-500 md:h-[76px] md:w-[76px]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
