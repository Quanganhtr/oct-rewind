import { asset } from "@/lib/asset";
import {
  EXPERIENCE_BRAND_CARD,
  EXPERIENCE_COUNTRIES_CARD,
  EXPERIENCE_DINING_CARD,
  EXPERIENCE_PERKS_CARD,
  EXPERIENCE_REWARDS_CARD,
} from "@/data/priority";
import { CountUp } from "./CountUp";
import { PillCard } from "./PillCard";
import { ShareButton } from "./ShareButton";
import { StatStackCard } from "./StatStackCard";

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
  const { label, title, notes } = EXPERIENCE_DINING_CARD;
  return (
    <div className="relative flex aspect-[4/3] max-h-[276px] w-full max-w-[368px] shrink-0 overflow-clip rounded-card bg-card-base">
      {/* Figma lays the art over a 50% white wash, mirrored left to right */}
      <div className="absolute inset-0 bg-page-light/50" />
      <img
        alt=""
        src={asset(SATIN)}
        className="absolute inset-0 block size-full max-w-none -scale-x-100 object-cover"
      />

      <div className="relative flex min-w-px flex-1 flex-col">
        <div className="flex min-h-px w-full flex-1 flex-col gap-1 px-4 pt-6 pb-4 text-cream">
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-10 font-bold">{title}</p>
          <p className="w-full text-sm leading-5 font-medium">
            {notes.map((line) => (
              <span key={line} className="block">
                <CountUp value={line} />
              </span>
            ))}
          </p>
        </div>
        <ShareButton tone="cream" className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
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
