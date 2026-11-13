import { asset } from "@/lib/asset";
import {
  FINANCE_GROWTH_CARD,
  FINANCE_NEW_ASSETS_CARD,
  FINANCE_RETURNS_CARD,
  FINANCE_SAVINGS_CARD,
} from "@/data/priority";
import { CenterStatCard } from "./CenterStatCard";
import { PillCard } from "./PillCard";
import { TrendCard } from "./TrendCard";

/*
 * Priority "Tài chính an vững" cards (Figma section 533:20624). Each is full-card artwork over
 * Figma's grey card base, built on the base tier's card layouts.
 */

const CARET = "/priority/caret-up.svg";

/** "Giá trị tài sản 2026 ▲18%": how far the reader's assets grew. */
export function PriorityGrowthCard() {
  return (
    <TrendCard
      {...FINANCE_GROWTH_CARD}
      tone="cream"
      caret={CARET}
      gradient="bg-card-base"
      image={asset("/priority/finance/growth-full.png")}
      // The art is light at the bottom left
      shareTone="dark"
    />
  );
}

/** "Mã đáo thành công": the house and car bought this year. */
export function PriorityNewAssetsCard() {
  return (
    <PillCard
      {...FINANCE_NEW_ASSETS_CARD}
      gradient="bg-card-base"
      fullArt
      art={
        <img
          alt=""
          src={asset("/priority/finance/new-assets-full.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
    />
  );
}

/** "3 khoản tiết kiệm": savings accounts opened this year, their total and goals. */
export function PrioritySavingsCard() {
  const { label, value, total, goals } = FINANCE_SAVINGS_CARD;
  return (
    <CenterStatCard
      label={label}
      value={value}
      large
      note={
        <>
          <span className="font-normal">Tổng cộng </span>
          <span className="font-bold">{total}</span>
          <br />
          Cùng <span className="font-bold">{goals}</span> tích luỹ
        </>
      }
      gradient="bg-card-base"
      image={asset("/priority/finance/savings-full.png")}
    />
  );
}

/** "VND 1,200,520": what Sinh lời tự động earned in 256 days, and its best month. */
export function PriorityReturnsCard() {
  const { label, value, note } = FINANCE_RETURNS_CARD;
  return (
    <CenterStatCard
      label={label}
      value={value}
      large
      note={<span className="font-bold">{note}</span>}
      tone="cream"
      // Figma: white 50% over the grey card base, under art that's see-through in places
      gradient="bg-card-base/50"
      image={asset("/priority/finance/returns-full.png")}
    />
  );
}
