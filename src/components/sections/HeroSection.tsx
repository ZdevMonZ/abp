import Image from "next/image";
import { brand } from "@/brand/brand";
import { heroContent } from "@/brand/content";
import { LogoMark } from "@/components/Placeholder";
import { ScrollCue } from "@/components/ScrollCue";

/**
 * 1번 섹션 — 메인 비주얼
 * ---------------------------------------------------------------------------
 * 배경은 시안 이미지 `public/main_high.webp` (1717×916) 입니다.
 * (원본 PNG 를 WebP 로 바꿔 1.9MB → 0.17MB 로 줄인 파일입니다)
 *
 * ★ PC 에서 화면을 세로로 꽉 채우지 않는 이유 (선명도)
 * 사진은 원본보다 크게 늘리면 흐려집니다. 이 사진으로 큰 화면의 높이까지 채우려면
 * 1.4~1.8배로 늘려야 해서 눈에 띄게 흐려졌습니다. 그래서 PC 에서는
 * **좌우만 꽉 채우고 세로는 사진 비율 그대로** 두고, 아래 남는 자리는 배경색으로 채웁니다.
 *   · 1440 폭 화면 : 1.49배 → 1.25배
 *   · 1920 폭 화면 : 1.37배 → 1.11배
 *   · 2560 폭 화면 : 1.82배 → 1.49배
 * (완전히 안 늘리려면 사진을 화면 폭의 80% 이하로 줄여야 해서 첫 화면이 액자처럼
 *  작아집니다. 더 선명하게 하려면 더 큰 원본 파일이 필요합니다.)
 *
 * 단, 이 배치는 **화면이 가로로 넓을 때만**(5:3 보다 넓을 때) 씁니다.
 * 휴대폰·태블릿·16:10 노트북처럼 정사각형에 가까운 화면에서는 아래 여백이
 * 화면의 3할 넘게 비어 허전해지므로 예전처럼 꽉 채웁니다.
 * 그런 화면은 사진이 오히려 축소되거나 조금만 늘어나서 선명도 문제도 적습니다.
 * 기준선은 src/app/globals.css 의 `.hero-band` / `.hero-fill` 에 있습니다.
 *
 * 이 사진에는 SOLION / LUNION / PROTECT·RECOVER / SCROLL 문구와 **가짜 메뉴줄**이
 * 이미 그려져 있습니다. 그래서
 *   · 위쪽 가짜 메뉴줄은 잘라내고 (진짜 상단 메뉴가 그 자리에 옵니다)
 *   · 아래쪽 DAY/NIGHT·SCROLL 글자는 그늘로 눌러 배경색으로 이어지게 하고
 *   · 우리 문구(피부 위의 우주 …)는 기본적으로 겹쳐 쓰지 않습니다
 *
 * 다른 사진으로 바꾸려면 아래 IMAGE 값(파일명·가로·세로)만 고치면 됩니다.
 */

/** 배경 사진 — 파일을 바꾸면 가로·세로도 실제 크기로 고쳐 주세요 */
const IMAGE = { src: "/main_high.webp", width: 1717, height: 916 };

/** 사진 위쪽에서 잘라낼 비율 — 시안에 그려진 가짜 메뉴줄을 가리는 최소값입니다 */
const CROP_TOP = 0.16;

/** PC 에서 화면에 보이는 사진 띠의 비율 (위쪽을 잘라낸 만큼 납작해집니다) */
const BAND_RATIO = `${IMAGE.width} / ${Math.round(IMAGE.height * (1 - CROP_TOP))}`;

/** 사진 아래를 채우는 배경색. 사진 아래쪽과 이어지는 짙은 남보라입니다 */
const BACKDROP = "#14122b";

/** 사진 아래 그늘 — 시안의 DAY/NIGHT·SCROLL 글자를 누르고 배경색으로 이어 줍니다 */
const FADE_TO_BACKDROP = `linear-gradient(to top, ${BACKDROP} 0%, ${BACKDROP}f0 48%, ${BACKDROP}99 72%, transparent 100%)`;

/**
 * 이미지 위에 우리 문구(워드마크 + 헤드라인)를 겹쳐 보이고 싶으면 true 로 바꾸세요.
 * 시안 이미지 자체에 문구가 있어서 겹치면 서로 읽기 어려워집니다.
 */
const SHOW_TEXT_OVER_IMAGE = false;

export function HeroSection() {
  return (
    <div
      className="relative flex min-h-dvh w-full flex-col overflow-hidden"
      style={{ backgroundColor: BACKDROP }}
    >
      {/* ── 꽉 채우는 배치 (휴대폰·태블릿·16:10 노트북) ─────── */}
      <div
        aria-hidden="true"
        className="hero-fill absolute inset-x-0 bottom-0 overflow-hidden"
        style={{ top: `-${CROP_TOP * 100}%` }}
      >
        <Image
          src={IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      {/* 꽉 채울 때의 아래쪽 그늘 (화면 바닥 기준) */}
      <div
        aria-hidden="true"
        className="hero-fill pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
        style={{ backgroundImage: FADE_TO_BACKDROP }}
      />

      {/* ── 사진 띠 배치 (가로로 넓은 화면) ─────────────────── */}
      <div className="hero-band relative w-full shrink-0" style={{ aspectRatio: BAND_RATIO }}>
        <Image
          src={IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          /* 아래쪽에 맞춰 담으면 위쪽(가짜 메뉴줄)이 잘려 나갑니다 */
          className="object-cover object-bottom"
        />
        {/* 사진 띠 아래쪽 그늘 → 아래 배경색으로 이어져 경계선이 보이지 않습니다 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{ backgroundImage: FADE_TO_BACKDROP }}
        />
      </div>

      {/* 상단 메뉴(흰 글씨)가 밝은 하늘 위에서도 읽히도록 얇게 덧씌우는 그늘 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 via-black/15 to-transparent md:h-52"
      />

      {/* ── 슬로건 — 사진 아래 여백에 놓입니다 ────────────────
          여백이 없는 화면(휴대폰·16:10 노트북)에서는 사진 아래쪽 그늘 위에 얹힙니다.
          자리를 차지하지 않고 떠 있게(absolute) 두었습니다. 흐름에 넣으면 창이
          아주 납작할 때 첫 화면이 한 화면보다 길어져 슬로건이 밑으로 밀립니다.
          아래 위치(bottom)는 Scroll 인디케이터와 겹치지 않을 만큼 띄운 값입니다. */}
      <div className="absolute inset-x-0 bottom-14 flex justify-center px-5 md:bottom-[116px]">
        <div className="flex items-center gap-4 md:gap-6" data-reveal>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-transparent to-white/45 md:w-16"
          />
          <p className="font-display bg-gradient-to-r from-white via-brand-100 to-brand-200 bg-clip-text text-center text-[14px] leading-[1.4] font-light tracking-[0.12em] text-transparent md:text-[21px] md:tracking-[0.14em] xl:text-[24px]">
            {brand.introHeadline}
          </p>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-l from-transparent to-white/45 md:w-16"
          />
        </div>
      </div>

      {/* ── 시안 위에 겹쳐 쓰는 문구 (기본은 숨김) ─────────────── */}
      {SHOW_TEXT_OVER_IMAGE ? (
        <div
          className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-shell -translate-y-1/2 px-5 md:px-10"
          data-reveal
        >
          <LogoMark wordmark={brand.wordmark} variant="light" className="text-2xl md:text-4xl" />
          <h1 className="keep-all mt-4 text-[25px] leading-tight font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-[70px]">
            {heroContent.headline}
          </h1>
          <p className="mt-2.5 text-[16px] leading-[1.5] font-normal text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:mt-7 md:text-[20px]">
            {heroContent.sub.map((line) => (
              <span key={line} className="block md:inline">
                {line}{" "}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {/* 움직이는 Scroll 인디케이터 — PC 에서는 사진 아래 배경 자리에 앉습니다 */}
      <ScrollCue variant="light" />
    </div>
  );
}
