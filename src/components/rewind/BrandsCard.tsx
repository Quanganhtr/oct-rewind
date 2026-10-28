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
      gradient="bg-[linear-gradient(180deg,var(--color-brands-1)_0%,var(--color-brands-2)_22.6%,var(--color-brands-3)_46.64%,var(--color-brands-4)_75.96%,var(--color-brands-5)_100%)]"
      art={
        <img
          alt=""
          src={asset("/rewind/brands-planes.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="dark"
      countPills
    />
  );
}
