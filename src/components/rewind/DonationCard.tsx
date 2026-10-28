import { asset } from "@/lib/asset";
import { DONATION_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện thương ai - 8" card: what the reader gave to Quỹ Chạm Yêu Thương, under the hearts. */
export function DonationCard() {
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-x-0 bottom-0 aspect-square bg-[linear-gradient(180deg,var(--color-give-1)_0.16%,var(--color-give-2)_29.89%,var(--color-give-3)_59.94%,var(--color-give-4)_79.97%,var(--color-give-5)_100%)]" />
      {/* Figma slot "asset 2:1": the hearts across the card's top half */}
      <div className="absolute inset-x-0 top-0 bottom-1/2 overflow-clip">
        <img
          alt=""
          src={asset("/rewind/love/donation-art.png")}
          className="absolute top-0 left-0 block h-[180.5px] w-[361px] max-w-none object-cover"
        />
      </div>

      <div className="relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4 text-center text-text-primary">
        {DONATION_CARD.stats.map(({ label, value, unit }) => (
          <div key={label} className="flex min-w-px flex-1 flex-col items-center gap-1">
            <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
            <p className="w-full text-[32px] leading-10 font-bold">
              <CountUp value={value} />
            </p>
            <p className="w-full text-sm leading-5 font-medium">{unit}</p>
          </div>
        ))}
      </div>

      <ShareButton tone="dark" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
