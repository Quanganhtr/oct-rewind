import { asset } from "@/lib/asset";
import { GROWTH_CARD } from "@/data/rewind";
import { TrendCard } from "./TrendCard";

/** Figma "Chuyện sinh nhai" card: revenue growth on last year, and where that ranks the shop. */
export function GrowthCard() {
  return (
    <TrendCard
      {...GROWTH_CARD}
      gradient="bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]"
      image={asset("/rewind/livelihood/growth-full.png")}
    />
  );
}
