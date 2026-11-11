import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { DONATION_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface DonationCardProps {
  stats?: { label: string; value: string; unit: string }[];
  /** Fill under the art. */
  base?: string;
  image?: string;
  /** Dark text (base tier's light art) or white (Priority). */
  textTone?: "dark" | "light";
}

/** Figma "Chuyện thương ai" card: what the reader gave to Quỹ Chạm Yêu Thương. */
export function DonationCard({
  stats = DONATION_CARD.stats,
  base = "bg-[linear-gradient(180deg,var(--color-give-1)_0.16%,var(--color-give-2)_29.89%,var(--color-give-3)_59.94%,var(--color-give-4)_79.97%,var(--color-give-5)_100%)]",
  image = "/rewind/love/donation-full.png",
  textTone = "dark",
}: DonationCardProps) {
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-x-0 bottom-0 aspect-square", base)} />
      <img alt="" src={asset(image)} className="absolute inset-0 block size-full max-w-none object-cover" />

      <div
        className={cn(
          "relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4 text-center",
          textTone === "dark" ? "text-text-primary" : "text-on-accent",
        )}
      >
        {stats.map(({ label, value, unit }) => (
          <div key={label} className="flex min-w-px flex-1 flex-col items-center gap-1">
            <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
            <p className="w-full text-[32px] leading-10 font-bold">
              <CountUp value={value} />
            </p>
            <p className="w-full text-sm leading-5 font-medium">{unit}</p>
          </div>
        ))}
      </div>

      <ShareButton tone="cream" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
