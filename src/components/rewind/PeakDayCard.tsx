import { asset } from "@/lib/asset";
import { PEAK_DAY_CARD } from "@/data/rewind";
import { StatStackCard } from "./StatStackCard";

/** Figma "Chuyện sinh nhai" card: the shop's best day of the year. */
export function PeakDayCard() {
  return (
    <StatStackCard
      rows={PEAK_DAY_CARD.rows}
      gradient="bg-[linear-gradient(180deg,var(--color-give-1)_0.16%,var(--color-give-2)_29.89%,var(--color-give-3)_59.94%,var(--color-give-4)_79.97%,var(--color-give-5)_100%)]"
      image={asset("/rewind/livelihood/peak-day-full.png")}
    />
  );
}
