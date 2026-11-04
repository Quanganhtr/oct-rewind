import { asset } from "@/lib/asset";
import { MONTHS_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện tiêu xài" months card: the biggest-spending month vs the thriftiest, over the gems artwork. */
export function MonthsCard() {
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-x-0 top-0 aspect-[3/4] bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]" />
      <img
        alt=""
        src={asset("/rewind/spending/seasons-art.png")}
        className="absolute inset-0 block size-full max-w-none object-cover"
      />

      <div className="relative flex min-h-px w-full flex-1 flex-col items-start gap-4 px-4 pt-6 pb-4 text-on-accent">
        {MONTHS_CARD.rows.map(({ label, value }) => (
          <div key={label} className="flex w-full flex-col gap-1">
            <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
            <p className="w-full text-[32px] leading-10 font-bold">
              <CountUp value={value} />
            </p>
          </div>
        ))}
      </div>

      <ShareButton tone="cream" className="relative px-4 pt-4 pb-5" />
    </div>
  );
}
