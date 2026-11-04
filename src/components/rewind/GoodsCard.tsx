import { asset } from "@/lib/asset";
import { GOODS_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện tiền tài" card: the big things the reader bought this year. */
export function GoodsCard() {
  return (
    <PillCard
      {...GOODS_CARD}
      compactTitle
      gradient="bg-[linear-gradient(0deg,var(--color-spend-1)_0%,var(--color-spend-2)_33.17%,var(--color-spend-3)_66.35%,var(--color-spend-4)_100%)]"
      fullArt
      art={
        <img
          alt=""
          src={asset("/rewind/money/goods-full.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
    />
  );
}
