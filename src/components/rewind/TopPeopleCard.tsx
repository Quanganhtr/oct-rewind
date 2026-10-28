import { asset } from "@/lib/asset";
import { TOP_PEOPLE_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma "Chuyện thương ai - 5" card: the three names on the reader's statement, over hearts and arrows. */
export function TopPeopleCard() {
  const { title, subtitle, names } = TOP_PEOPLE_CARD;
  return (
    <PillCard
      title={title}
      subtitle={subtitle}
      pills={names}
      gradient="bg-[linear-gradient(0deg,var(--color-spend-4)_0%,var(--color-spend-3)_33.65%,var(--color-spend-2)_66.83%,var(--color-spend-1)_100%)]"
      art={
        <img
          alt=""
          src={asset("/rewind/love/top-people-art.png")}
          className="absolute bottom-0 left-0 block h-[180.5px] w-[361px] max-w-none object-cover"
        />
      }
      shareTone="light"
    />
  );
}
