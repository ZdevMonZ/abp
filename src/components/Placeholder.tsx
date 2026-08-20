"use client";

/**
 * 이미지 자리표시자
 * ---------------------------------------------------------------------------
 * 원본 사이트의 사진·로고는 타사 저작물이라 가져오지 않았습니다.
 * 실제 이미지를 넣을 때는 이 컴포넌트를 next/image 의 <Image /> 로 바꾸세요.
 */

import { uiText } from "@/brand/content";
import { useText } from "@/brand/locale-store";

export type Tone = "brand" | "cool" | "warm" | "dark" | "neutral";

const TONE_CLASS: Record<Tone, string> = {
  brand: "bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 text-white",
  cool: "bg-gradient-to-br from-brand-50 via-accent-soft to-brand-100 text-brand-800",
  warm: "bg-gradient-to-br from-[#f6efe7] via-[#efe3d8] to-[#e6d5c6] text-[#7a604a]",
  dark: "bg-gradient-to-br from-[#2c3238] via-[#3b444d] to-[#5a6670] text-white/80",
  neutral: "bg-gradient-to-br from-surface-alt via-surface-mute to-line text-ink-soft",
};

export function Placeholder({
  label,
  tone = "neutral",
  className = "",
  ratio,
}: {
  label: string;
  tone?: Tone;
  className?: string;
  /** 예: "16 / 6" — 넘기지 않으면 부모 높이를 채웁니다 */
  ratio?: string;
}) {
  const t = useText();

  return (
    <div
      role="img"
      aria-label={`${label} (${t(uiText.placeholder)})`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`relative flex items-center justify-center overflow-hidden ${TONE_CLASS[tone]} ${className}`}
    >
      {/* 자리표시자임을 알려주는 옅은 대각선 무늬 */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
      >
        <defs>
          <pattern
            id={`ph-${label.replace(/\s/g, "")}`}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#ph-${label.replace(/\s/g, "")})`}
        />
      </svg>
      <span className="relative px-4 text-center text-sm font-medium tracking-wide sm:text-base">
        {label}
      </span>
    </div>
  );
}

/**
 * 작은 아이콘 자리표시자 (원본의 90~120px 픽토그램 자리)
 *
 * ※ 지금 화면에서는 쓰지 않습니다. 아이콘은 sample.png 시안에 맞춘
 *   선 아이콘(src/components/Icon.tsx)으로 모두 바뀌었습니다.
 *   새 아이콘이 필요하면 Icon.tsx 에 추가하세요.
 */
export function IconPlaceholder({
  label,
  size = 90,
  className = "",
}: {
  label: string;
  size?: number;
  className?: string;
}) {
  const t = useText();

  return (
    <div
      role="img"
      aria-label={`${label} ${t(uiText.placeholder)}`}
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-[22%] bg-accent-soft text-brand-600 ring-1 ring-brand-200 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-1/2 w-1/2"
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M3.5 17.5 9 12l3.5 3.5L16 12l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * 로고 자리표시자 — 실제 로고 이미지가 준비되면 <Image /> 로 교체하세요.
 */
export function LogoMark({
  wordmark,
  className = "",
  variant = "dark",
}: {
  wordmark: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  const color = variant === "light" ? "text-white" : "text-brand-600";
  return (
    <span
      className={`font-display inline-flex items-baseline gap-[0.15em] text-3xl font-extrabold tracking-tight ${color} ${className}`}
    >
      {wordmark}
      <span
        aria-hidden="true"
        className={`inline-block h-[0.28em] w-[0.28em] rounded-full ${
          variant === "light" ? "bg-white/70" : "bg-accent"
        }`}
      />
    </span>
  );
}
