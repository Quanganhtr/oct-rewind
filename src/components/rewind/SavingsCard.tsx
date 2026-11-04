import { asset } from "@/lib/asset";
import { SAVINGS_CARD } from "@/data/rewind";
import { CenterStatCard } from "./CenterStatCard";

/** Figma "Chuyện tiền tài" card: what the reader saved this year, and across how many goals. */
export function SavingsCard() {
  return (
    <CenterStatCard
      {...SAVINGS_CARD}
      gradient="bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]"
      image={asset("/rewind/money/savings-full.png")}
    />
  );
}
