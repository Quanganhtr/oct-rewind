import { asset } from "@/lib/asset";
import { TOP_PEOPLE_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện thương ai" card: the three people the reader sends money to most. */
export function TopPeopleCard() {
  const { label, title, names } = TOP_PEOPLE_CARD;
  return (
    <PillCard
      label={label}
      title={title}
      pills={names}
      gradient="bg-[linear-gradient(0deg,var(--color-compare-4)_0%,var(--color-compare-3)_33.17%,var(--color-compare-2)_66.33%,var(--color-compare-1)_99.98%)]"
      fullArt
      art={
        <img
          alt=""
          src={asset("/rewind/love/top-people-full.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
    />
  );
}
