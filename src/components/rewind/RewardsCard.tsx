import { asset } from "@/lib/asset";
import { REWARDS_CARD } from "@/data/rewind";
import { StatPairCard } from "./StatPairCard";

/** Figma "Chuyện tiền tài" card: U-Point earned and cashback received. */
export function RewardsCard() {
  return (
    <StatPairCard
      stats={REWARDS_CARD.stats}
      gradient="aspect-[3/4] bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]"
      image={asset("/rewind/money/rewards-full.png")}
    />
  );
}
