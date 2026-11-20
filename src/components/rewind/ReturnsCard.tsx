import { asset } from "@/lib/asset";
import { RETURNS_CARD } from "@/data/rewind";
import { CenterStatCard } from "./CenterStatCard";

/** Figma "Chuyện tiền tài - 16": what Sinh lời tự động earned in 256 days, and its best month. */
export function ReturnsCard() {
  return (
    <CenterStatCard
      {...RETURNS_CARD}
      gradient="bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]"
      image={asset("/rewind/money/returns-full.png")}
    />
  );
}
