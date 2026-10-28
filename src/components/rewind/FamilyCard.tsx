import { asset } from "@/lib/asset";
import { FAMILY_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện thương ai - 7" card: the family group, group funds and insurance in the reader's name. */
export function FamilyCard() {
  const { title, pills } = FAMILY_CARD;
  return (
    <PillCard
      title={title}
      pills={pills}
      gradient="bg-[linear-gradient(180deg,var(--color-brands-5)_0%,var(--color-brands-4)_24.04%,var(--color-brands-3)_53.37%,var(--color-brands-2)_77.4%,var(--color-brands-1)_100%)]"
      art={
        <img
          alt=""
          src={asset("/rewind/love/family-art.png")}
          className="absolute top-1/2 left-1/2 block h-[180.5px] w-[361px] max-w-none -translate-1/2 object-cover"
        />
      }
      shareTone="light"
      textTone="dark"
      countPills
    />
  );
}
