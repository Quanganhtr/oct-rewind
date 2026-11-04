import { asset } from "@/lib/asset";
import { GUESTS_CARD } from "@/data/rewind";
import { StatPairCard } from "./StatPairCard";

/** Figma "Chuyện sinh nhai" card: total customers and the regulars who came back, side by side. */
export function GuestsCard() {
  return (
    <StatPairCard
      stats={GUESTS_CARD.stats}
      gradient="aspect-square bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]"
      image={asset("/rewind/livelihood/guests-full.png")}
    />
  );
}
