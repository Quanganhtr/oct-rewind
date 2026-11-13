import { asset } from "@/lib/asset";
import { LOVE_BIRTHDAY_CARD, LOVE_DONATION_CARD, LOVE_FAMILY_CARD, LOVE_PERSON_CARD } from "@/data/priority";
import { BirthdayCard } from "./BirthdayCard";
import { DonationCard } from "./DonationCard";
import { PillCard } from "./PillCard";

/*
 * Priority "Yêu thương trọn tâm" cards (Figma section 533:23609): the base tier's love cards with
 * Priority art over Figma's grey card base, and white text.
 */

/** "Trọn tâm vun vén": the family group, group funds and insurance in the reader's name. */
export function PriorityFamilyCard() {
  return (
    <PillCard
      {...LOVE_FAMILY_CARD}
      gradient="bg-card-base"
      fullArt
      art={
        // Jar and shield (Figma 509:12577)
        <img
          alt=""
          src={asset("/priority/love/family-full.png")}
          className="absolute inset-0 block size-full max-w-none object-cover"
        />
      }
      shareTone="cream"
      countPills
    />
  );
}

/** U-Point given to Quỹ Chạm Yêu Thương, and the projects it joined. */
export function PriorityDonationCard() {
  return (
    <DonationCard
      stats={LOVE_DONATION_CARD.stats}
      base="bg-card-base"
      image="/priority/love/donation-full.png"
      textTone="light"
    />
  );
}

/** "Do Mai Linh": the person paid most often, over glass coins (4:3, the birthday card's layout). */
export function PriorityPersonCard() {
  return <BirthdayCard {...LOVE_PERSON_CARD} base="bg-card-base" image="/priority/love/person-full.png" />;
}

/** Birthday wishes received through Techcombank. */
export function PriorityBirthdayCard() {
  return <BirthdayCard {...LOVE_BIRTHDAY_CARD} base="bg-card-base" image="/priority/love/birthday-full.png" />;
}
