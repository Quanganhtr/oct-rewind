import { asset } from "@/lib/asset";
import { SOUNDBOX_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện sinh nhai - 1" card: how many times the reader's shop soundbox rang this year. */
export function SoundboxCard() {
  const { label, value, note } = SOUNDBOX_CARD;
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-spend-1)_0%,var(--color-spend-2)_26.68%,var(--color-spend-3)_53.36%,var(--color-spend-4)_80.42%)]" />
      {/* Figma slot "asset 2:1" fills the whole card here: "Ting" bubbles and the soundbox */}
      <img
        alt=""
        src={asset("/rewind/livelihood/soundbox-art.png")}
        className="absolute inset-y-0 left-[calc(50%-1px)] block aspect-square h-full max-w-none -translate-x-1/2 object-cover"
      />

      <div className="relative flex min-h-px w-full flex-1 flex-col items-center justify-center gap-6 px-4 pt-6 pb-4">
        <div className="flex w-full flex-col items-center justify-center gap-1 text-center text-on-accent">
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-10 font-bold">
            <CountUp value={value} />
          </p>
          <p className="w-full text-sm leading-5 font-medium">{note}</p>
        </div>
        <ShareButton tone="dark" className="justify-center" />
      </div>
    </div>
  );
}
