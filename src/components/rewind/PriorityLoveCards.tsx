import { asset } from "@/lib/asset";
import { LOVE_BIRTHDAY_CARD, LOVE_DONATION_CARD, LOVE_FAMILY_CARD, LOVE_GIFT_CARD } from "@/data/priority";
import { BirthdayCard } from "./BirthdayCard";
import { DonationCard } from "./DonationCard";
import { GiftCard, type GiftSkin } from "./GiftCard";
import { PillCard } from "./PillCard";

/*
 * Priority "Yêu thương trọn tâm" cards (Figma section 504:8568): the base tier's love cards with
 * Priority art over Figma's grey card base, and white text.
 */

/** Soft sand satin: the person's card, the gift wrapping (and the finance "22 Tr" card). */
const SATIN = "/priority/satin-full.png";

/** "Anh vun vén": the family group, group funds and insurance in the reader's name. */
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

/** White box in satin wrapping with textured ribbon, over the person paid most often. */
const PRIORITY_GIFT: GiftSkin = {
  ...LOVE_GIFT_CARD,
  personBase: "bg-card-base",
  personImage: SATIN,
  mirrorPerson: true,
  wrapBase: "bg-page-light",
  wrapImage: SATIN,
  ribbon: { horizontal: "/priority/love/ribbon-horizontal.png", vertical: "/priority/love/ribbon-vertical.png" },
  edge: "shadow-[inset_4px_-4px_0px_0px_rgb(139_115_98/0.5)]",
};

export function PriorityGiftCard(props: { open: boolean; onOpen?: () => void }) {
  return <GiftCard {...props} skin={PRIORITY_GIFT} />;
}

/** Birthday wishes received through Techcombank. */
export function PriorityBirthdayCard() {
  return <BirthdayCard {...LOVE_BIRTHDAY_CARD} base="bg-card-base" image="/priority/love/birthday-full.png" />;
}
