import { asset } from "@/lib/asset";
import { COMPARE_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma Step 8 "Card": this year vs last year, over the gem artwork. */
export function CompareCard() {
  const { label, amount, note } = COMPARE_CARD;

  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className="absolute top-0 bottom-0 left-1/2 aspect-square -translate-x-1/2 bg-[linear-gradient(0deg,var(--color-compare-1)_0%,var(--color-compare-2)_33.65%,var(--color-compare-3)_66.81%,var(--color-compare-4)_99.98%)]" />
      <div className="absolute top-0 bottom-0 left-1/2 aspect-square -translate-x-1/2 overflow-clip">
        <img
          alt=""
          src={asset("/rewind/compare-gems.png")}
          className="absolute top-1/2 left-[calc(50%-0.5px)] block size-[361px] max-w-none -translate-1/2 object-cover"
        />
      </div>

      <div className="relative flex min-h-px w-full flex-1 flex-col items-center justify-center gap-6 px-4 pt-6 pb-4">
        <div className="flex w-full flex-col items-center gap-1 text-center text-on-accent">
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-11 font-bold">
            <CountUp value={amount} />
          </p>
          <p className="w-full text-sm leading-5 font-medium">{note}</p>
        </div>
        <ShareButton tone="light" className="justify-center" />
      </div>
    </div>
  );
}
