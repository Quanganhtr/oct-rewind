import { asset } from "@/lib/asset";
import {
  PRIVATE_COUNTRIES_CARD,
  PRIVATE_EVENTS_CARD,
  PRIVATE_FAMILY_CARD,
  PRIVATE_MOMENTS_CARD,
  PRIVATE_REVENUE_CARD,
  PRIVATE_SHIELDS_CARD,
} from "@/data/private";
import { MiddleStatCard } from "./MiddleStatCard";
import { PillCard } from "./PillCard";
import { TitleNoteCard } from "./TitleNoteCard";

/*
 * Private "Rất sẵn lòng" cards (Figma section 519:16350): each over its own full-card art on the
 * grey card base, in cream text. The share circle is cream for the whole tier (tiers.ts).
 */

const art = (src: string) => (
  <img alt="" src={asset(src)} className="absolute inset-0 block size-full max-w-none object-cover" />
);

/** "Doanh thu Tăng 18%, Top 2%": how the reader's business grew (4:3, over a 50% white wash). */
export function PrivateRevenueCard() {
  return (
    <TitleNoteCard {...PRIVATE_REVENUE_CARD} countTitle image="/private/revenue-full.png" wash tone="cream" />
  );
}

/** "Kết nối cùng 8 sự kiện Private": the Private events attended (4:3, dark share label on light art). */
export function PrivateEventsCard() {
  return (
    <TitleNoteCard
      {...PRIVATE_EVENTS_CARD}
      countTitle
      image="/private/events-full.png"
      tone="cream"
      shareTone="ink"
    />
  );
}

/** "18 khoảnh khắc thư thái": golf, luxury shopping and lounges. */
export function PrivateMomentsCard() {
  return (
    <PillCard
      {...PRIVATE_MOMENTS_CARD}
      gradient="bg-card-base"
      fullArt
      art={art("/private/moments-full.png")}
      textTone="cream"
      shareTone="ink"
      countPills
    />
  );
}

/** "Top 3 quốc gia": favourite destinations. */
export function PrivateCountriesCard() {
  return (
    <PillCard
      {...PRIVATE_COUNTRIES_CARD}
      gradient="bg-card-base"
      fullArt
      art={art("/private/countries-full.png")}
      textTone="cream"
      shareTone="ink"
      countTitle={false}
    />
  );
}

/** "3 khiên vàng kiên cố": insurance policies held with TCLife. */
export function PrivateShieldsCard() {
  return <MiddleStatCard {...PRIVATE_SHIELDS_CARD} image="/private/shields-full.png" tone="cream" />;
}

/** "Gia tộc họ Tô": the family group (4:3). */
export function PrivateFamilyCard() {
  return <TitleNoteCard {...PRIVATE_FAMILY_CARD} boldNotes image="/private/family-full.png" tone="cream" />;
}
