import { asset } from "@/lib/asset";
import { SPENDING } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma Step 5 "Card": yearly card spend over the bank-card artwork. */
export function SpendingCard() {
  const { label, amount, average } = SPENDING.card;

  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-spend-1)_0%,var(--color-spend-2)_26.68%,var(--color-spend-3)_53.36%,var(--color-spend-4)_80.42%)]" />
      <img
        alt=""
        src={asset("/rewind/spending/total-art.png")}
        className="absolute inset-0 block size-full max-w-none object-cover"
      />

      <div className="relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4">
        <div className="flex min-w-px flex-1 flex-col items-center gap-1 text-center text-on-accent">
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-10 font-bold">
            <CountUp value={amount} />
          </p>
          <p className="w-full text-sm leading-5 font-medium">
            {average.before}
            <span className="font-bold">
              <CountUp value={average.value} />
              {average.unit}
            </span>
            {average.after}
          </p>
        </div>
      </div>

      <ShareButton tone="cream" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
