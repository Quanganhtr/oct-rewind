import { asset } from "@/lib/asset";
import { BRANDS_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện tiêu xài" brands card: how many brands the reader visited, the favourite, visits and spend. */
export function BrandsCard() {
  const { label, title, top } = BRANDS_CARD;
  return (
    <PillCard
      label={label}
      title={title}
      pills={top}
      gradient="bg-[linear-gradient(180deg,var(--color-shop-1)_0%,var(--color-shop-2)_22.6%,var(--color-shop-3)_46.64%,var(--color-shop-4)_75.96%,var(--color-shop-5)_100%)]"
      fullArt
      art={
        <img
          alt=""
          src={asset("/rewind/spending/brands-art.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
      headingTone="dark"
      countPills
    />
  );
}
