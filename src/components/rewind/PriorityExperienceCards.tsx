import { asset } from "@/lib/asset";
import {
  EXPERIENCE_BRAND_CARD,
  EXPERIENCE_COUNTRIES_CARD,
  EXPERIENCE_DINING_CARD,
  EXPERIENCE_PERKS_CARD,
  EXPERIENCE_REWARDS_CARD,
} from "@/data/priority";
import { PillCard } from "./PillCard";
import { StatStackCard } from "./StatStackCard";
import { TitleNoteCard } from "./TitleNoteCard";

/*
 * Priority "Trải nghiệm xứng tầm" cards (Figma section 504:10351). Full-card artwork over Figma's
 * grey card base; the perks and countries cards share one image, the second one upside down.
 */

/** Gold haze, dark at the foot. */
const HAZE = "/priority/experience/haze-full.png";
/** Soft sand satin, shared with the finance and love cards. */
const SATIN = "/priority/satin-full.png";

/** "3 đặc quyền cao cấp": golf rounds and lounge visits, in dark text on the light top of the art. */
export function PriorityPerksCard() {
  return (
    <PillCard
      {...EXPERIENCE_PERKS_CARD}
      gradient="bg-card-base"
      fullArt
      art={<img alt="" src={asset(HAZE)} className="absolute inset-0 block size-full max-w-none object-cover" />}
      textTone="dark"
      shareTone="cream"
      countPills
    />
  );
}

/** "2026, anh yêu nhất Ẩm thực": the category the reader spent most on, and its share (4:3). */
export function PriorityDiningCard() {
  // Figma lays the art over a 50% white wash, mirrored left to right
  return <TitleNoteCard {...EXPERIENCE_DINING_CARD} image={SATIN} mirrorImage wash tone="cream" />;
}

/** "Anh là khách sộp nhà Hermes": the luxury brand the reader returned to, visits and spend. */
export function PriorityBrandCard() {
  return (
    <StatStackCard
      rows={EXPERIENCE_BRAND_CARD.rows}
      gradient="bg-card-base"
      image={asset("/priority/experience/brand-full.png")}
      flipImage
      tone="cream"
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
      art={
        // Figma flips this art upside down
        <img
          alt=""
          src={asset(HAZE)}
          className="absolute inset-0 block size-full max-w-none -scale-y-100 object-cover"
        />
      }
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
      image={asset("/priority/experience/rewards-full.png")}
    />
  );
}
