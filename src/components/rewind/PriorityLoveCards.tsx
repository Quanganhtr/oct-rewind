import { asset } from "@/lib/asset";
import {
  LOVE_BIRTHDAY_CARD,
  LOVE_DONATION_CARD,
  LOVE_FAMILY_CARD,
  LOVE_GIFT_CARD,
  LOVE_PERSON_CARD,
} from "@/data/priority";
import { BirthdayCard } from "./BirthdayCard";
import { DonationCard } from "./DonationCard";
import { GiftCard, type GiftSkin } from "./GiftCard";
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

const PERSON_IMAGE = "/priority/love/person-full.png";

/** "Do Mai Linh": the person paid most often, over glass coins (4:3, the birthday card's layout). */
function PriorityPersonCard() {
  return <BirthdayCard {...LOVE_PERSON_CARD} base="bg-card-base" image={PERSON_IMAGE} />;
}

/** Figma "Người ấy là ai?" (542:33589): sand satin wrapping, textured ribbon, over the person card. */
const PRIORITY_GIFT: GiftSkin = {
  ...LOVE_GIFT_CARD,
  name: LOVE_PERSON_CARD.title,
  lines: LOVE_PERSON_CARD.subtitle.split("\n"),
  personBase: "bg-card-base",
  personImage: PERSON_IMAGE,
  wrapBase: "bg-page-light",
  wrapImage: "/priority/love/gift-wrap-full.png",
  ribbon: { horizontal: "/priority/love/ribbon-horizontal.png", vertical: "/priority/love/ribbon-vertical.png" },
  edge: "shadow-[inset_4px_-4px_0px_0px_rgb(139_115_98/0.5)]",
};

/** The gift: tapping "Coi nào" lifts the wrapping off the person card. */
export function PriorityGiftCard(props: { open: boolean; onOpen?: () => void }) {
  return <GiftCard {...props} skin={PRIORITY_GIFT} person={<PriorityPersonCard />} />;
}

/** Birthday wishes received through Techcombank. */
export function PriorityBirthdayCard() {
  return <BirthdayCard {...LOVE_BIRTHDAY_CARD} base="bg-card-base" image="/priority/love/birthday-full.png" />;
}
