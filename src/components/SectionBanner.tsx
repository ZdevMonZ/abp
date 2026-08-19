import Image from "next/image";
import { Placeholder, type Tone } from "@/components/Placeholder";

/**
 * 섹션 대표 배너
 * ---------------------------------------------------------------------------
 * `src` 가 있으면 실제 사진을, 없으면 자리표시자를 그립니다.
 * 사진을 넣으려면 `public/` 에 파일을 두고
 * src/brand/content.ts 의 해당 섹션에 `visualSrc: "/파일명.png"` 한 줄만 추가하세요.
 *
 * 가로로 긴 PC 배너와 세로로 넉넉한 모바일 배너의 비율이 달라서
 * 같은 사진이라도 보이는 범위가 다릅니다 (`objectPosition` 으로 조절).
 */
export function SectionBanner({
  src,
  label,
  tone,
  /** PC 배너에서 사진의 어느 높이를 보여줄지 (0% = 맨 위, 100% = 맨 아래) */
  focus = "50%",
}: {
  src?: string;
  label: string;
  tone: Tone;
  focus?: string;
}) {
  if (!src) {
    return (
      <>
        <Placeholder label={label} tone={tone} ratio="1400 / 340" className="hidden md:flex" />
        <Placeholder label={label} tone={tone} ratio="16 / 9" className="md:hidden" />
      </>
    );
  }

  return (
    <>
      {/* PC — 가로로 긴 띠. 사진의 가운데 띠만 잘라 보여 줍니다 */}
      <div className="relative hidden md:block" style={{ aspectRatio: "1400 / 340" }}>
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width: 1440px) 1320px, 92vw"
          className="object-cover"
          style={{ objectPosition: `50% ${focus}` }}
        />
      </div>

      {/* 모바일 — 사진 비율(3:2) 그대로. 잘리는 곳 없이 전체가 보입니다 */}
      <div className="relative md:hidden" style={{ aspectRatio: "3 / 2" }}>
        <Image src={src} alt={label} fill sizes="100vw" className="object-cover" />
      </div>
    </>
  );
}
