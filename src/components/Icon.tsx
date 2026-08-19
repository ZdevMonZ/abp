/**
 * 선(line) 아이콘 세트
 * ---------------------------------------------------------------------------
 * sample.png 시안의 얇은 선 아이콘 결을 따라 그렸습니다.
 * (SPACE-BIOME / SKIN BARRIER CARE / PDRN COMPLEX / CLINICALLY PROVEN 등)
 *
 * 쓰는 법:  <Icon name="sun" size={90} className="text-brand-500" />
 * 색은 글자색을 따라갑니다(currentColor). 새 아이콘은 아래 PATHS 에 한 줄 추가하세요.
 */

export type IconName =
  | "sun"
  | "moon"
  | "moon-stars"
  | "biome"
  | "droplet"
  | "dna"
  | "shield"
  | "shield-check"
  | "flask"
  | "cycle"
  | "calendar"
  | "ion"
  | "treatment"
  | "reorder"
  | "arrow-right";

const PATHS: Record<IconName, React.ReactNode> = {
  /** 태양 — SOLION(낮·차단) */
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </>
  ),

  /** 초승달 — LUNION(밤·회복) */
  moon: <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />,

  /** 초승달 + 별 — 밤의 회복 */
  "moon-stars": (
    <>
      <path d="M19.5 14.6A7.6 7.6 0 0 1 10.4 5.5a7.6 7.6 0 1 0 9.1 9.1Z" />
      <path d="M17.5 4v2.6M16.2 5.3h2.6M20.4 8.2v1.6M19.6 9h1.6" />
    </>
  ),

  /** 균 콜로니 — SPACE-BIOME (기획서의 "성운처럼 퍼지는 균") */
  biome: (
    <>
      <circle cx="12" cy="9" r="2.4" />
      <circle cx="7" cy="15" r="2" />
      <circle cx="17" cy="15" r="2" />
      <path d="M10.4 10.9 8.5 13.3M13.6 10.9l1.9 2.4M9 15h6" />
      <circle cx="12" cy="19.4" r="0.9" />
      <circle cx="4.4" cy="8.6" r="0.9" />
      <circle cx="19.6" cy="8.6" r="0.9" />
    </>
  ),

  /** 물방울 — SKIN BARRIER CARE(수분·진정) */
  droplet: (
    <>
      <path d="M12 3.4c3.4 4 5.4 6.6 5.4 9.2A5.4 5.4 0 0 1 6.6 12.6c0-2.6 2-5.2 5.4-9.2Z" />
      <path d="M9.4 14.2a2.8 2.8 0 0 0 2.6 2.6" />
    </>
  ),

  /** 이중나선 — PDRN COMPLEX */
  dna: (
    <>
      <path d="M8 3c0 4.5 8 5.5 8 9s-8 4.5-8 9M16 3c0 4.5-8 5.5-8 9s8 4.5 8 9" />
      <path d="M9.3 6.6h5.4M8.2 10h7.6M8.2 14h7.6M9.3 17.4h5.4" />
    </>
  ),

  /** 방패 — 자외선·외부 자극 차단 */
  shield: <path d="M12 3.2 5 6v5.4c0 4.2 2.8 7.4 7 9.4 4.2-2 7-5.2 7-9.4V6Z" />,

  /** 방패 + 체크 — CLINICALLY PROVEN */
  "shield-check": (
    <>
      <path d="M12 3.2 5 6v5.4c0 4.2 2.8 7.4 7 9.4 4.2-2 7-5.2 7-9.4V6Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),

  /** 플라스크 — 의원·연구 */
  flask: (
    <>
      <path d="M9.6 3.4h4.8M10.6 3.4v5.2L6.2 17a2.4 2.4 0 0 0 2.1 3.6h7.4a2.4 2.4 0 0 0 2.1-3.6l-4.4-8.4V3.4" />
      <path d="M8.2 14.6h7.6" />
    </>
  ),

  /** 낮과 밤이 도는 원 — 24H SKIN CYCLE (오른쪽 반이 채워진 낮/밤 원) */
  cycle: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6a8.4 8.4 0 0 1 0 16.8Z" fill="currentColor" fillOpacity="0.3" stroke="none" />
    </>
  ),

  /** 달력 — 28일처럼 '기간' 을 가리킬 때 */
  calendar: (
    <>
      <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.4" />
      <path d="M3.4 9.8h17.2M8.2 3.4v3.6M15.8 3.4v3.6" />
      <path d="m9.2 14.6 2 2 3.6-3.8" />
    </>
  ),

  /** 이온(원자) — Sol + Ion / Luna + Ion */
  ion: (
    <>
      <circle cx="12" cy="12" r="1.9" />
      <ellipse cx="12" cy="12" rx="9" ry="3.9" />
      <ellipse cx="12" cy="12" rx="9" ry="3.9" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.9" transform="rotate(120 12 12)" />
    </>
  ),

  /** 반짝임 — 시술 직후의 광채 */
  treatment: (
    <>
      <path d="M10.4 3.4c0 3.8 2.8 6.6 6.6 6.6-3.8 0-6.6 2.8-6.6 6.6 0-3.8-2.8-6.6-6.6-6.6 3.8 0 6.6-2.8 6.6-6.6Z" />
      <path d="M17.6 14.2c0 1.6 1.1 2.7 2.7 2.7-1.6 0-2.7 1.1-2.7 2.7 0-1.6-1.1-2.7-2.7-2.7 1.6 0 2.7-1.1 2.7-2.7Z" />
    </>
  ),

  /** 다시 담기 — RE-ORDER(재구매) */
  reorder: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20.4 3.4v3.8h-3.8" />
      <path d="M9.6 11.4h4.8M9.6 14.2h3" />
    </>
  ),

  /** 화살표 — VIEW SOLION → 같은 텍스트 링크 */
  "arrow-right": <path d="M4 12h15M13.4 6.4 19.6 12l-6.2 5.6" />,
};

export function Icon({
  name,
  size = 24,
  className = "",
  strokeWidth = 1.2,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {PATHS[name]}
    </svg>
  );
}
