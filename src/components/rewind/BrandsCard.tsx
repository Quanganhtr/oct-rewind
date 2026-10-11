import { asset } from "@/lib/asset";
import { BRANDS_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma Step 9 "Card": how many places the reader visited, with the top three as frosted pills. */
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
          className="absolute top-[calc(50%-0.17px)] left-1/2 block h-[180.5px] w-[361px] max-w-none -translate-1/2 object-cover"
        />
      }
      shareTone="dark"
    />
  );
}
