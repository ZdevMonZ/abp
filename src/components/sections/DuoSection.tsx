import Image from "next/image";
import { duoContent } from "@/brand/content";
import { Icon } from "@/components/Icon";
import { linkTargetProps } from "@/components/link";

/**
 * 3번 섹션 — SOLION × LUNION 좌우 대비
 * ---------------------------------------------------------------------------
 * 레퍼런스: solion-lunion-site/index.html 의 .split 구성
 *
 *  · 넓은 화면 : 왼쪽 = 낮(밝은 배경) / 오른쪽 = 밤(어두운 배경) 을 한 화면에 나란히
 *  · 좁은 화면 : 위아래로 쌓입니다
 *
 * 사진은 **자르지 않고** 카드 안에 거의 통째로 담깁니다(16:10).
 * 원본이 1536×1024 인데 화면에서는 절반 폭(약 520px)으로 줄여 그리기 때문에
 * 예전 가로띠 배너(1400×340 로 잘라 쓰던 방식)보다 훨씬 선명합니다.
 *
 * 문구·사진·링크는 전부 src/brand/content.ts 의 duoContent 에서 옵니다.
 */
export function DuoSection() {
  return (
    <div className="grid w-full grid-cols-1 md:min-h-dvh md:grid-cols-2">
      {duoContent.panels.map((panel) => {
        const night = panel.tone === "night";

        return (
          <div
            key={panel.id}
            id={panel.id}
            // 위쪽 여백은 고정된 상단 메뉴(모바일 62px · PC 86px)를 피하려고 넉넉히 둡니다.
            // 가운데 정렬 대신 위 정렬 — 내용이 화면보다 길 때 위쪽이 잘리지 않습니다.
            className={`relative flex flex-col justify-start overflow-hidden px-6 pt-20 pb-12 md:px-8 md:pt-[110px] md:pb-14 lg:px-[5vw] xl:px-[6vw] ${
              night
                ? "bg-gradient-to-br from-[#191a45] via-[#262254] to-[#3a3680] text-white"
                : "bg-gradient-to-br from-white via-brand-50 to-brand-100 text-ink"
            }`}
          >
            {/* 배경에 은은하게 도는 빛 */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-24 h-72 w-72 rounded-full blur-3xl ${
                night ? "right-[-60px] bg-brand-400/25" : "left-[-60px] bg-accent/20"
              }`}
            />

            <div className="relative mx-auto w-full max-w-[560px]" data-reveal>
              {/* 낮/밤 라벨 */}
              <p
                className={`font-display flex items-center gap-2 text-[11px] tracking-[0.22em] md:text-[12px] ${
                  night ? "text-white/70" : "text-brand-600"
                }`}
              >
                <Icon name={panel.icon} strokeWidth={1.2} className="h-4 w-4" />
                {panel.kicker}
              </p>

              {/* 브랜드 이름 */}
              <p className="font-display mt-2.5 text-[40px] leading-none font-semibold tracking-[0.08em] md:mt-3 md:text-[52px] xl:text-[60px]">
                {panel.name}
              </p>

              <p
                className={`mt-2 text-[13px] tracking-[0.14em] md:text-[14px] ${
                  night ? "text-white/60" : "text-ink-mute"
                }`}
              >
                {panel.sub}
              </p>

              <p className="keep-all mt-4 text-[17px] leading-[1.4] font-light md:mt-5 md:text-[21px]">
                {panel.headline}
              </p>
              <p
                className={`keep-all mt-3 text-[14px] leading-[1.6] md:text-[15px] ${
                  night ? "text-white/70" : "text-ink-soft"
                }`}
              >
                {panel.lead}
              </p>

              {/* 제품 사진 — 자르지 않고 카드 안에 담습니다 */}
              <div
                className={`rounded-card relative mt-6 aspect-[16/10] overflow-hidden md:mt-7 ${
                  night ? "shadow-float ring-1 ring-white/10" : "shadow-card"
                }`}
              >
                <Image
                  src={panel.visualSrc}
                  alt={panel.visualAlt}
                  fill
                  sizes="(min-width: 1440px) 620px, (min-width: 768px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>

              {/* 특징 3개 */}
              <ul className="mt-5 flex flex-col gap-2.5 md:mt-6 md:gap-3">
                {panel.features.map((feature) => (
                  <li key={feature.strong} className="flex items-center gap-3.5">
                    <Icon
                      name={feature.icon}
                      strokeWidth={1.1}
                      className={`h-7 w-7 md:h-8 md:w-8 ${night ? "text-brand-300" : "text-brand-500"}`}
                    />
                    <p className="keep-all text-[13px] leading-[1.4] font-light md:text-[15px]">
                      {feature.lead}
                      <span className="block font-semibold">{feature.strong}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {/* 안내 문구 + 링크 */}
              {"note" in panel && panel.note ? (
                <p
                  className={`mt-5 text-[13px] font-medium md:mt-6 ${
                    night ? "text-brand-200" : "text-brand-600"
                  }`}
                >
                  {panel.note}
                </p>
              ) : null}

              <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${"note" in panel ? "mt-3" : "mt-5 md:mt-6"}`}>
                {panel.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...linkTargetProps(link.href)}
                      className={`group inline-flex items-center gap-2 border-b pb-1 text-[13px] tracking-[0.1em] transition md:text-[14px] ${
                        night
                          ? "border-white/40 text-white hover:border-white"
                          : "border-ink/30 text-ink hover:border-ink"
                      }`}
                    >
                      {link.label}
                      <Icon
                        name="arrow-right"
                        strokeWidth={1.6}
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
