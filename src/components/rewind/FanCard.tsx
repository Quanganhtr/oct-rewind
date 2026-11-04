import { asset } from "@/lib/asset";
import { FAN_CARD } from "@/data/rewind";
import { StatStackCard } from "./StatStackCard";

/** Figma "Chuyện sinh nhai" card: the shop's most loyal customer — who, how often, how much. */
export function FanCard() {
  return (
    <StatStackCard
      rows={FAN_CARD.rows}
      gradient="bg-[linear-gradient(180deg,var(--color-shop-1)_0%,var(--color-shop-2)_22.6%,var(--color-shop-3)_46.64%,var(--color-shop-4)_75.96%,var(--color-shop-5)_100%)]"
      image={asset("/rewind/livelihood/fan-full.png")}
    />
  );
}
