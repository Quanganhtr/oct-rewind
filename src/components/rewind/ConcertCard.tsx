import { asset } from "@/lib/asset";
import { CONCERT_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện tiêu xài" concert card: ticket spend and shows attended, side by side under the artwork. */
export function ConcertCard() {
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-x-0 bottom-0 aspect-square bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]" />
      <img
        alt=""
        src={asset("/rewind/spending/concert-full.png")}
        className="absolute inset-0 block size-full max-w-none object-cover"
      />

      <div className="relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4 text-center text-on-accent">
        {CONCERT_CARD.stats.map(({ value, label }) => (
          <div key={label} className="flex min-w-px flex-1 flex-col items-center gap-1">
            <p className="w-full text-[32px] leading-10 font-bold">
              <CountUp value={value} />
            </p>
            <p className="w-full text-sm leading-5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <ShareButton tone="cream" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
