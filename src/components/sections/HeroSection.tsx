"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { brand } from "@/brand/brand";
import { heroContent } from "@/brand/content";
import { useText } from "@/brand/locale-store";
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
 * 이 배치의 더 중요한 이유는 **좌우가 잘리지 않는다**는 것입니다.
 * 시안 양쪽 끝에 SOLION(왼쪽) · LUNION(오른쪽) 글자가 있어서, 화면을 꽉 채우려고
 * 사진을 키우면 그 글자들이 먼저 잘려 나갑니다. (16:10 노트북에서 좌우 26%)
 *
 * 그래서 **가로로 놓인 화면(4:3 = 1.33 보다 넓을 때)은 전부** 이 띠 배치를 씁니다.
 * 휴대폰·태블릿 세로처럼 세로로 긴 화면만 꽉 채웁니다 — 그런 화면에서 띠로 두면
 * 사진이 화면 높이의 2~3할밖에 안 되는 얇은 줄이 되기 때문입니다.
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

/**
 * 배경 사진 — 파일을 바꾸면 가로·세로도 실제 크기로 고쳐 주세요
 *
 * 시안 안에 글자가 그려져 있어 **언어별로 다른 파일**을 씁니다.
 * `{ ko: ..., en: ... }` 은 다른 곳에서 쓰는 `t("한국어","English")` 와 같은 뜻입니다.
 * (이 파일에서는 `t` 라는 이름을 화면에 글자를 그릴 때 쓰고 있어 풀어 적었습니다)
 *
 * 두 파일 모두 1717×916 · 같은 구성이라 아래 가로·세로와 CROP_TOP 을 함께 씁니다.
 */
const IMAGE = {
  src: { ko: "/main_high.webp", en: "/main_high_eng.webp" },
  width: 1717,
  height: 916,
};

/** 사진 위쪽에서 잘라낼 비율 — 시안에 그려진 가짜 메뉴줄을 가리는 최소값입니다 */
const CROP_TOP = 0.16;

/** PC 에서 화면에 보이는 사진 띠의 비율 (위쪽을 잘라낸 만큼 납작해집니다) */
const BAND_RATIO = `${IMAGE.width} / ${Math.round(IMAGE.height * (1 - CROP_TOP))}`;

/** 사진 아래를 채우는 배경색. 사진 아래쪽과 이어지는 짙은 남보라입니다 */
export const BACKDROP = "#14122b";

/**
 * 사진 아래 그늘 — 시안 아래쪽에 그려진 글자
 * (SCIENCE·SAFETY·SUSTAINABILITY / DAY·PROTECT / NIGHT·RECOVER / SCROLL) 를
 * 눌러 지우고 배경색으로 이어 줍니다.
 *
 * ★ 52% 지점까지 **완전히 불투명**한 것이 핵심입니다.
 *   예전에는 가장 진한 곳도 94% 라서, 남은 6% 로 시안 글자가 유령처럼 비쳐
 *   우리 슬로건과 겹쳐 보였습니다(특히 큰 화면). 100% 로 올려 완전히 지웠습니다.
 *   위쪽으로 흐려지는 모양은 예전과 거의 같아서 물결·노을은 그대로 보입니다.
 */
const FADE_TO_BACKDROP =
  `linear-gradient(to top, ${BACKDROP} 0%, ${BACKDROP} 52%,` +
  ` ${BACKDROP}a6 74%, ${BACKDROP}4d 88%, transparent 100%)`;

/**
 * 이미지 위에 우리 문구(워드마크 + 헤드라인)를 겹쳐 보이고 싶으면 true 로 바꾸세요.
 * 시안 이미지 자체에 문구가 있어서 겹치면 서로 읽기 어려워집니다.
 */
const SHOW_TEXT_OVER_IMAGE = false;

/* ==========================================================================
   첫 화면 연출 (고급스러운 인상) — 여기 숫자만 고치면 됩니다
   --------------------------------------------------------------------------
   다섯 가지가 전부입니다. 다섯 다 **한 번만** 실행되고 끝나면 사라집니다.
   계속 반짝이거나 숨쉬듯 움직이는 것은 일부러 하나도 넣지 않았습니다 —
   임상·과학 브랜드에서 그런 움직임은 오히려 싸구려로 읽히고, 노트북 팬을 돌립니다.

     ① 열림   화면 전체가 어둠에서 점점 밝아짐 (페이드인)
              ★ 이것만 다른 파일에 있습니다 → src/components/IntroVeil.tsx
                위쪽 메뉴 바·오른쪽 점·버튼까지 **같이** 밝아져야 해서,
                첫 화면이 아니라 사이트 맨 위층에 막을 덮습니다.
     ② 안착   사진이 아주 살짝 컸다가 제자리로 내려앉음
     ③ 필름입자 화면 전체에 아주 미세한 입자 (매끈한 CG 느낌을 걷어냄)
     ④ 가장자리 좌우 끝만 살짝 어두워져 시선이 가운데로 모임
     ⑤ 순서    사진 → 슬로건 → Scroll 순으로 도착

   전부 끄고 예전 화면으로 돌아가려면 아래 FX_ 네 줄 + IntroVeil.tsx 의 FX_INTRO 를
   false 로 바꾸세요.
   ========================================================================== */

/** ② 사진이 살짝 컸다가 제자리로 내려앉는 연출 */
const FX_SETTLE = true;
/** ③ 화면 전체 필름 입자 */
const FX_GRAIN = true;
/** ④ 좌우 가장자리 감광 */
const FX_FALLOFF = true;
/** ⑤ 슬로건 → Scroll 순차 등장 */
const FX_CASCADE = true;

/**
 * ② 처음에 사진이 얼마나 커져 있다가 내려앉는지 (1.00 = 확대 없음)
 * ★ 1.03 을 넘기지 마세요. 확대된 동안 사진이 눈에 띄게 흐려집니다.
 *   (좌우 시안 글자가 잘리기 시작하는 값은 1.30 이라 여유는 아주 큽니다)
 */
const SETTLE_SCALE = 1.024;
/**
 * ② 내려앉는 데 걸리는 시간(ms). 1500 을 넘기면 사진이 계속 흐르는 것처럼 보입니다.
 *   IntroVeil.tsx 의 INTRO_MS 와 같은 값으로 두면
 *   '다 밝아지는 순간 = 사진이 멈추는 순간'이 되어 깔끔합니다 (지금 둘 다 1200).
 */
const SETTLE_MS = 1200;

/**
 * ③ 필름 입자의 진하기. 올리면 또렷해집니다. 0.14 를 넘으면 '지저분하다'로 읽힙니다.
 *   0 = 끔. 어두운 밤하늘 쪽에 입자가 덜 보이는 것은 실제 필름과 같은 정상 동작입니다.
 */
const GRAIN_OPACITY = 0.085;
/** ③ 입자 무늬가 반복되는 간격(px). 200 이하로 두세요 */
const GRAIN_TILE_PX = 140;
/** ③ 입자의 곱기. 낮추면(0.6) 거칠고, 올리면(1.1) 더 고와집니다 */
const GRAIN_FREQ = 0.9;

/**
 * ④ 좌우 끝이 어두워지는 정도. 0.30 을 넘으면 '렌즈'가 아니라 '화면에 낀 때'로 보입니다.
 *   0 = 끔.
 *
 *   이 값은 **네 모서리에서 가장 진할 때**의 값입니다. 좌우 한가운데는 그 절반쯤
 *   (0.19 → 약 0.09)만 내려앉습니다 — 실제 렌즈가 그렇게 떨어지기 때문입니다.
 *
 *   어두워지기 시작하는 자리는 시안 글자가 있는 높이에서 좌 9.9% / 우 90.1% 이고,
 *   시안의 SOLION(12.6%~) · LUNION(~88.7%) 글자에는 닿지 않습니다.
 *   (한국어·영어 시안 파일에서 직접 재 본 값입니다.
 *    사진 위아래 끝으로 갈수록 조금 더 안쪽에서 시작하지만, 그쪽엔 글자가 없습니다)
 */
const EDGE_FALLOFF = 0.19;

/**
 * ⑤ 슬로건이 나타나기 시작하는 시각(ms) / 떠오르는 데 걸리는 시간(ms)
 *   ★ IntroVeil.tsx 의 INTRO_MS(밝아지는 시간)를 바꾸면 이 두 값도 같이 옮기세요 —
 *     화면이 거의 다 밝아진 뒤 글자가 도착해야 "사진 → 문구 → 초대" 순서가 살아납니다.
 *     (INTRO_MS 의 0.85배쯤이 기준입니다. 지금은 1200 → 1000 · 1350)
 */
const SLOGAN_DELAY_MS = 1000;
const SLOGAN_MS = 700;
/** ⑤ 맨 아래 Scroll 표시. ★ 항상 SLOGAN_DELAY_MS 보다 뒤여야 순서가 맞습니다 */
const CUE_DELAY_MS = 1350;
const CUE_MS = 550;

/**
 * ③ 필름 입자 그림 — 그림 파일을 따로 두지 않고 글자(SVG)로 그려 넣습니다.
 *   약 0.6KB 라 내려받는 시간이 0 이고, 배포 파일도 늘지 않습니다.
 *   · color-interpolation-filters='sRGB' — 없으면 브라우저가 다른 색 공간에서 계산해
 *     회색이 아니라 밝은 판이 되어 화면 전체가 뿌예집니다 (★ 지우지 마세요)
 *   · feFuncA — 잡음이 투명도에도 들어가는 것을 막아 '반투명 얼룩'이 되지 않게 합니다
 */
const GRAIN_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${GRAIN_TILE_PX}' height='${GRAIN_TILE_PX}'>` +
  `<filter id='g' color-interpolation-filters='sRGB' x='0' y='0' width='100%' height='100%'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='${GRAIN_FREQ}' numOctaves='2'` +
  ` stitchTiles='stitch' seed='11'/>` +
  `<feColorMatrix type='saturate' values='0'/>` +
  `<feComponentTransfer><feFuncA type='linear' slope='0' intercept='1'/></feComponentTransfer>` +
  `</filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`;

const GRAIN_STYLE: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`,
  backgroundSize: `${GRAIN_TILE_PX}px ${GRAIN_TILE_PX}px`,
  /* overlay = 중간 회색에서 아무 변화가 없는 방식.
     그래서 이미 배경색으로 완전히 덮인 아래쪽에서는 색을 ±1 흔들 뿐,
     그늘이 지운 시안 글자를 되살리지 않습니다. ★ screen 등으로 바꾸지 마세요. */
  mixBlendMode: "overlay",
};

/** ④ 좌우 가장자리 감광 — 위·아래 가운데는 0 이라 기존 상·하단 그늘과 겹치지 않습니다 */
const EDGE_FALLOFF_STYLE: CSSProperties = {
  backgroundImage:
    `radial-gradient(62% 102% at 50% 46%,` +
    ` rgba(8,6,24,0) 66%, rgba(8,6,24,${EDGE_FALLOFF}) 100%)`,
};

/** 연출 숫자를 CSS 로 넘기는 통로 (CSS 쪽은 globals.css 의 .hero-* 규칙) */
const HERO_VARS = {
  "--hero-settle-scale": String(SETTLE_SCALE),
  "--hero-settle-ms": `${SETTLE_MS}ms`,
  "--hero-grain-opacity": String(GRAIN_OPACITY),
  "--hero-slogan-delay": `${SLOGAN_DELAY_MS}ms`,
  "--hero-slogan-ms": `${SLOGAN_MS}ms`,
  "--hero-cue-delay": `${CUE_DELAY_MS}ms`,
  "--hero-cue-ms": `${CUE_MS}ms`,
} as CSSProperties;

/**
 * 사진에 붙이는 '안착' 연출 class (끄면 빈 문자열)
 * ★ 아래에서 쓸 때 반드시 `object-bottom ${SETTLE_CLASS}` 처럼 **앞에 띄어쓰기**를 두세요.
 *   붙여 쓰면 Tailwind 가 `object-bottom` 을 한 덩어리로 못 읽어 그 스타일이
 *   아예 만들어지지 않습니다 (사진 자르는 위치가 틀어집니다).
 */
const SETTLE_CLASS = FX_SETTLE ? "hero-settle" : "";

export function HeroSection() {
  const t = useText();

  return (
    <div
      /* isolate = 필름 입자가 첫 화면 밖(다음 섹션·페이지 배경)과 섞이지 않게 가둡니다 */
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden"
      style={{ backgroundColor: BACKDROP, ...HERO_VARS }}
    >
      {/* ── 꽉 채우는 배치 (휴대폰·태블릿 세로) ─────────────── */}
      <div
        aria-hidden="true"
        className="hero-fill absolute inset-x-0 bottom-0 overflow-hidden"
        style={{ top: `-${CROP_TOP * 100}%` }}
      >
        <Image
          src={t(IMAGE.src)}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-top ${SETTLE_CLASS}`}
        />
        {/* 좌우 가장자리 감광 — 사진 바로 위, 아래쪽 그늘보다는 아래 */}
        {FX_FALLOFF ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={EDGE_FALLOFF_STYLE}
          />
        ) : null}
      </div>
      {/* 꽉 채울 때의 아래쪽 그늘 (화면 바닥 기준)
          40% = 시안 아래쪽 글자를 완전히 지우는 높이입니다 (계산상 한계는 37%,
          여유 3%p). ★ 37% 아래로 줄이면 시안 글자가 유령처럼 비쳐 나옵니다. */}
      <div
        aria-hidden="true"
        className="hero-fill pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{ backgroundImage: FADE_TO_BACKDROP }}
      />

      {/* ── 사진 띠 배치 (가로로 넓은 화면) ─────────────────── */}
      {/* overflow-hidden = '안착' 연출로 살짝 커진 사진이 띠 아래로 삐져나와
          그늘이 가리고 있는 시안 글자를 잠깐 되살리는 것을 막습니다. ★ 지우지 마세요 */}
      <div
        className="hero-band relative w-full shrink-0 overflow-hidden"
        style={{ aspectRatio: BAND_RATIO }}
      >
        <Image
          src={t(IMAGE.src)}
          alt=""
          fill
          priority
          sizes="100vw"
          /* 아래쪽에 맞춰 담으면 위쪽(가짜 메뉴줄)이 잘려 나갑니다 */
          className={`object-cover object-bottom ${SETTLE_CLASS}`}
        />
        {/* 좌우 가장자리 감광 */}
        {FX_FALLOFF ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={EDGE_FALLOFF_STYLE}
          />
        ) : null}
        {/* 사진 띠 아래쪽 그늘 → 아래 배경색으로 이어져 경계선이 보이지 않습니다.
            ★ 반드시 이 띠의 마지막 자식이어야 합니다 (뒤에 뭘 넣으면 그늘 위에 얹힙니다) */}
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

      {/* 필름 입자 — 사진과 아래 배경색을 같은 '재질'로 묶어 줍니다.
          (그늘·배경색 위에도 덮여야 이음매가 사라지므로 맨 위쪽에 둡니다) */}
      {FX_GRAIN ? (
        <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" style={GRAIN_STYLE} />
      ) : null}

      {/* ① 열림(페이드인)의 어두운 막은 여기가 아니라 사이트 맨 위층에 있습니다.
          → src/components/IntroVeil.tsx (위쪽 메뉴까지 같이 밝아지게 하려고 옮겼습니다) */}

      {/* ── 슬로건 — 사진 아래 여백에 놓입니다 ────────────────
          여백이 없는 화면(휴대폰·16:10 노트북)에서는 사진 아래쪽 그늘 위에 얹힙니다.
          자리를 차지하지 않고 떠 있게(absolute) 두었습니다. 흐름에 넣으면 창이
          아주 납작할 때 첫 화면이 한 화면보다 길어져 슬로건이 밑으로 밀립니다.
          아래 위치(bottom)는 Scroll 인디케이터와 겹치지 않을 만큼 띄운 값입니다. */}
      <div className="absolute inset-x-0 bottom-14 flex justify-center px-5 md:bottom-[116px]">
        <div className={`flex items-center gap-4 md:gap-6 ${FX_CASCADE ? "hero-late" : ""}`}>
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
            {t(heroContent.headline)}
          </h1>
          <p className="mt-2.5 text-[16px] leading-[1.5] font-normal text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:mt-7 md:text-[20px]">
            {heroContent.sub.map((line, i) => (
              <span key={i} className="block md:inline">
                {t(line)}{" "}
              </span>
            ))}
          </p>
        </div>
      ) : null}

      {/* 움직이는 Scroll 인디케이터 — PC 에서는 사진 아래 배경 자리에 앉습니다 */}
      <ScrollCue variant="light" enter={FX_CASCADE} />
    </div>
  );
}
