import { asset } from "@/lib/asset";
import {
  EXPERIENCE_BRAND_CARD,
  EXPERIENCE_CATEGORY_CARD,
  EXPERIENCE_COUNTRIES_CARD,
  EXPERIENCE_PERKS_CARD,
  EXPERIENCE_REWARDS_CARD,
} from "@/data/priority";
import { PillCard } from "./PillCard";
import { StatStackCard } from "./StatStackCard";
import { TitleNoteCard } from "./TitleNoteCard";

/* Priority "Trải nghiệm xứng tầm" cards (Figma section 535:23610): full-card artwork over the grey card base. */

/** Full-card art that fills its card. */
function Art({ src }: { src: string }) {
  return <img alt="" src={asset(src)} className="absolute inset-0 block size-full max-w-none object-cover" />;
}

/** "3 đặc quyền cao cấp": golf rounds and lounge visits. */
export function PriorityPerksCard() {
  return (
    <PillCard
      {...EXPERIENCE_PERKS_CARD}
      gradient="bg-card-base"
      fullArt
      art={<Art src="/priority/experience/perks-full.png" />}
      textTone="cream"
      shareTone="cream"
      countPills
    />
  );
}

/** "2026, Quý khách yêu nhất Siêu thị": the category the reader spent most on, and its share (4:3). */
export function PriorityCategoryCard() {
  // Figma lays the art over a 50% white wash
  return (
    <TitleNoteCard {...EXPERIENCE_CATEGORY_CARD} image="/priority/experience/supermarket-full.png" wash tone="cream" />
  );
}

/** "Quý khách là VIP nhà Hermes": the luxury brand the reader returned to, visits and spend. */
export function PriorityBrandCard() {
  return (
    <StatStackCard
      rows={EXPERIENCE_BRAND_CARD.rows}
      gradient="bg-card-base"
      image={asset("/priority/experience/hermes-full.png")}
      tone="cream"
      shareTone="ink"
    />
  );
}

/** "5 quốc gia": the countries the reader travelled to. */
export function PriorityCountriesCard() {
  return (
    <PillCard
      {...EXPERIENCE_COUNTRIES_CARD}
      gradient="bg-card-base"
      fullArt
      art={<Art src="/priority/experience/countries-full.png" />}
      shareTone="cream"
    />
  );
}

/** "Tổng U-Point / Tổng tiền hoàn": U-Point earned and cashback this year. */
export function PriorityRewardsCard() {
  return (
    <StatStackCard
      rows={EXPERIENCE_REWARDS_CARD.rows}
      gradient="bg-card-base"
      image={asset("/priority/experience/points-full.png")}
    />
  );
}
