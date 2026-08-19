import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";

/**
 * 섹션 공통 제목 (원본의 .abus_maintit)
 *  - eyebrow: 위쪽 작은 영문 라벨 (그라데이션 글자)
 *  - icon:    eyebrow 위에 얹는 선 아이콘 (sample.png 시안의 결)
 *  - lines:   본문 제목. 마지막 줄을 강조하고 싶으면 strong 에 넣으세요.
 */
export function SectionHeading({
  eyebrow,
  icon,
  lines,
  strong,
  tail,
  align = "center",
  variant = "dark",
  className = "",
}: {
  eyebrow?: string;
  icon?: IconName;
  lines: readonly string[];
  strong?: ReactNode;
  tail?: string;
  align?: "center" | "left";
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {icon ? (
        <Icon
          name={icon}
          strokeWidth={1}
          className={`mb-3 h-9 w-9 text-brand-400 md:mb-4 md:h-11 md:w-11 ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      ) : null}
      {eyebrow ? (
        <p className="font-display bg-gradient-to-r from-brand-400 via-brand-700 to-brand-800 bg-clip-text text-[15px] font-extrabold tracking-wide text-transparent md:text-[22px]">
          {eyebrow}
        </p>
      ) : null}
      <p
        className={`keep-all mt-3 text-[23px] leading-[1.4] font-light md:text-[40px] ${
          variant === "light" ? "text-white" : "text-ink"
        }`}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        {strong ? (
          <span className="block">
            <span className="font-semibold">{strong}</span>
            {tail}
          </span>
        ) : (
          tail
        )}
      </p>
    </div>
  );
}
