import { asset } from "@/lib/asset";
import { ASSETS_CARD } from "@/data/rewind";
import { TrendCard } from "./TrendCard";

/** Figma "Chuyện tiền tài" card: total assets this year, against last year. */
export function AssetsCard() {
  return (
    <TrendCard
      {...ASSETS_CARD}
      gradient="bg-[linear-gradient(180deg,var(--color-shop-1)_0%,var(--color-shop-2)_22.6%,var(--color-shop-3)_46.64%,var(--color-shop-4)_75.96%,var(--color-shop-5)_100%)]"
      image={asset("/rewind/money/assets-full.png")}
    />
  );
}
