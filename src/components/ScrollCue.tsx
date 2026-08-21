/**
 * 원본 하단의 "Scroll" 마우스 인디케이터
 *
 * enter = true 로 주면 첫 화면 연출의 **마지막 순서**로 늦게 나타납니다
 * (사진 → 슬로건 → Scroll). 나타나는 시각은 부모(첫 화면)가 넘겨주는
 * --hero-cue-delay 값을 따르고, 실제 애니메이션은 globals.css 의 .hero-cue 에 있습니다.
 */
export function ScrollCue({
  variant = "dark",
  enter = false,
}: {
  variant?: "dark" | "light";
  /** 첫 화면처럼 순서를 두고 나타나게 할지 (기본: 바로 보임) */
  enter?: boolean;
}) {
  const color = variant === "light" ? "border-white/70 text-white/70" : "border-ink text-ink";
  const dot = variant === "light" ? "bg-white/70" : "bg-ink";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 md:bottom-9 md:flex ${
        enter ? "hero-cue" : ""
      }`}
    >
      <span
        className={`animate-cue-label text-[10px] tracking-[0.15em] ${
          variant === "light" ? "text-white/70" : "text-ink"
        }`}
      >
        Scroll
      </span>
      <span className={`flex h-[42px] w-[26px] justify-center rounded-full border-2 pt-2 ${color}`}>
        <span className={`animate-cue-wheel h-[4px] w-[4px] rounded-full ${dot}`} />
      </span>
    </div>
  );
}
