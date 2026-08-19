/**
 * 원본 하단의 "Scroll" 마우스 인디케이터
 */
export function ScrollCue({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const color = variant === "light" ? "border-white/70 text-white/70" : "border-ink text-ink";
  const dot = variant === "light" ? "bg-white/70" : "bg-ink";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 md:bottom-9 md:flex">
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
