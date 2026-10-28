import { asset } from "@/lib/asset";
import { GUESTS_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện sinh nhai - 7" card: total customers and returning ones, side by side under the footprints. */
export function GuestsCard() {
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-x-0 bottom-0 aspect-square bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]" />
      <div className="absolute inset-x-0 top-0 bottom-1/2 overflow-clip">
        <img
          alt=""
          src={asset("/rewind/livelihood/guests-art.png")}
          className="absolute top-0 bottom-0 left-1/2 block aspect-[686/343] h-full max-w-none -translate-x-1/2 object-cover"
        />
      </div>

      <div className="relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4 text-on-accent">
        {GUESTS_CARD.stats.map(({ value, label }) => (
          <div key={label} className="flex min-w-px flex-1 flex-col items-center gap-1">
            <p className="w-full text-xl leading-7 font-bold">
              <CountUp value={value} />
            </p>
            <p className="w-full text-sm leading-5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <ShareButton tone="dark" className="relative px-4 pt-4 pb-6" />
    </div>
  );
}
