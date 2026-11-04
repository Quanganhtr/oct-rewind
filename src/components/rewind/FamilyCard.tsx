import { asset } from "@/lib/asset";
import { FAMILY_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện thương ai" card: the family group, group funds and insurance in the reader's name. */
export function FamilyCard() {
  const { label, title, pills } = FAMILY_CARD;
  return (
    <PillCard
      label={label}
      title={title}
      pills={pills}
      gradient="bg-[linear-gradient(0deg,var(--color-spend-4)_0%,var(--color-spend-3)_33.65%,var(--color-spend-2)_66.83%,var(--color-spend-1)_100%)]"
      fullArt
      art={
        <img
          alt=""
          src={asset("/rewind/love/family-full.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
      countPills
    />
  );
}
