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
import { StatStackCard } from "./StatStackCard";
import { TitleNoteCard } from "./TitleNoteCard";

/*
 * Private "Rất sẵn lòng" cards (Figma section 513:14080): full-card art over the grey card base,
 * white text. Most of the art is shared with the Priority cards.
 */

/** Amber glow, dark at the foot (square). */
const AMBER = "/private/amber-full.png";
/** Gold haze, dark at the foot (3:4). */
const HAZE = "/priority/experience/haze-full.png";
/** Copper sweep (3:4). */
const COPPER = "/priority/experience/brand-full.png";
/** Soft sand satin (4:3). */
const SATIN = "/priority/satin-full.png";

/** Pill card art that Figma flips upside down. */
const flipped = (src: string) => (
  <img alt="" src={asset(src)} className="absolute inset-0 block size-full max-w-none -scale-y-100 object-cover" />
);

/** "Doanh thu Tăng 18%": how the reader's business grew. */
export function PrivateRevenueCard() {
  return <MiddleStatCard {...PRIVATE_REVENUE_CARD} image={AMBER} />;
}

/** "8 sự kiện Private / 124 giờ": the Private events attended. */
export function PrivateEventsCard() {
  return <StatStackCard rows={PRIVATE_EVENTS_CARD.rows} gradient="bg-card-base" image={asset(HAZE)} flipImage />;
}

/** "18 khoảnh khắc an nhiên": golf, luxury shopping and lounges. */
export function PrivateMomentsCard() {
  return (
    <PillCard
      {...PRIVATE_MOMENTS_CARD}
      gradient="bg-card-base"
      fullArt
      art={flipped(COPPER)}
      shareTone="cream"
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
      art={flipped(HAZE)}
      shareTone="cream"
      countTitle={false}
    />
  );
}

/** "3 khiên vàng kiên cố": insurance policies held with TCGI. */
export function PrivateShieldsCard() {
  return <MiddleStatCard {...PRIVATE_SHIELDS_CARD} image={AMBER} />;
}

/** "Gia tộc họ Tô": the family group (4:3, art mirrored left to right). */
export function PrivateFamilyCard() {
  return <TitleNoteCard {...PRIVATE_FAMILY_CARD} boldNotes image={SATIN} mirrorImage />;
}
