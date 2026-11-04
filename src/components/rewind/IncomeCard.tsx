import { asset } from "@/lib/asset";
import { INCOME_CARD } from "@/data/rewind";
import { CenterStatCard } from "./CenterStatCard";

/** Figma "Chuyện tiền tài" card: the reader's best month for income. */
export function IncomeCard() {
  return (
    <CenterStatCard
      {...INCOME_CARD}
      large
      gradient="bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]"
      image={asset("/rewind/money/income-full.png")}
    />
  );
}
