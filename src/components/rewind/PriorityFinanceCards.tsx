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
 * Priority "Tài chính an vững" cards (Figma section 499:6522). Each is full-card artwork over
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

/** "Sinh lời mang tới ▲22 Tr": what Sinh lời tự động earned, and its best month. */
export function PriorityReturnsCard() {
  return (
    <TrendCard
      {...FINANCE_RETURNS_CARD}
      tone="cream"
      caret={CARET}
      gradient="bg-card-base"
      image={asset("/priority/satin-full.png")}
      mirrorImage
    />
  );
}
