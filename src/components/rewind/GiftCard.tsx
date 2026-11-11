"use client";

import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { easeInCubic } from "@/lib/motion";
import { LOVE_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/**
 * Opening the gift, like lifting a box lid: the wrapped cover hops up GIFT_HOP px, then drops down
 * off the screen, uncovering the person's card that was underneath. GIFT_DROP is the whole move.
 */
export const GIFT_DROP = 0.85;
const GIFT_HOP = 24;
/** Far enough below to leave the screen from anywhere in the chat. */
const GIFT_FALL = 900;

/** What the gift and the card under it look like, and who it uncovers. */
export interface GiftSkin {
  teaser: string;
  action: string;
  name: string;
  lines: string[];
  /** The person's card: base fill under its art, the art, and whether Figma flips it left to right. */
  personBase: string;
  personImage: string;
  mirrorPerson?: boolean;
  /** The wrapping: base fill, optional art over it, and textured ribbon bars (else flat cream bands). */
  wrapBase: string;
  wrapImage?: string;
  ribbon?: { horizontal: string; vertical: string };
  /** The wrapped-box edge: an inset shadow on the left and bottom. */
  edge: string;
}

const MARKET_GRADIENT =
  "bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]";

/** Figma "Chuyện thương ai": purple wrapping with cream ribbon. */
const STANDARD_GIFT: GiftSkin = {
  teaser: LOVE_CARD.teaser,
  action: LOVE_CARD.action,
  name: LOVE_CARD.name,
  lines: LOVE_CARD.lines,
  personBase: MARKET_GRADIENT,
  personImage: "/rewind/love/person-full.png",
  wrapBase: MARKET_GRADIENT,
  edge: "shadow-[inset_4px_-4px_0px_0px_rgb(48_13_137/0.5)]",
};

/** Ribbon band shadow, flat or textured. */
const BAND_SHADOW = "shadow-[2px_2px_4px_0px_rgb(0_0_0/0.16)]";

interface GiftCardProps {
  open: boolean;
  /** Tapping the gift; omitted once it's open. */
  onOpen?: () => void;
  skin?: GiftSkin;
}

/**
 * Figma "Chuyện thương ai" card: a wrapped gift ("Người ấy là ai?" + ribbon) over the person the
 * reader sends money to most. Tapping it lifts the wrapping off (see GIFT_DROP) to show the card.
 */
export function GiftCard({ open, onOpen, skin = STANDARD_GIFT }: GiftCardProps) {
  const reduceMotion = useReducedMotion();
  const drop: TargetAndTransition = reduceMotion
    ? { opacity: 0, transition: { duration: 0 } }
    : {
        y: [0, -GIFT_HOP, GIFT_FALL],
        rotate: [0, -2, 8],
        transition: { duration: GIFT_DROP, times: [0, 0.27, 1], ease: ["easeOut", easeInCubic] },
      };

  return (
    // Not clipped: the wrapping falls out past the card's edges
    <div className="relative aspect-[4/3] w-full max-w-[368px] shrink-0">
      {/* Underneath: the person's card. Its art is always there so the reveal never waits on the image;
          its text goes in as the gift is opened, so the numbers count as it shows */}
      <div className="absolute inset-0 flex overflow-clip rounded-card bg-page-light">
        <div className={cn("absolute inset-0", skin.personBase)} />
        <img
          alt=""
          src={asset(skin.personImage)}
          className={cn("absolute inset-0 block size-full max-w-none object-cover", skin.mirrorPerson && "-scale-x-100")}
        />
        {open && (
          <div className="relative flex min-w-px flex-1 flex-col">
            <div className="flex min-h-px w-full flex-1 flex-col gap-1 px-4 pt-6 pb-4 text-on-accent">
              <p className="w-full text-[32px] leading-10 font-bold">{skin.name}</p>
              <p className="w-full text-sm leading-5 font-medium">
                {skin.lines.map((line) => (
                  <span key={line} className="block">
                    <CountUp value={line} />
                  </span>
                ))}
              </p>
            </div>
            <ShareButton tone="cream" className="px-4 pt-4 pb-6" />
          </div>
        )}
      </div>

      {/* On top: the wrapping — a whole card of its own that hops and falls away when tapped */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="gift"
            type="button"
            aria-label={skin.action}
            disabled={!onOpen}
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-start justify-start overflow-clip rounded-card text-left disabled:cursor-default"
            exit={drop}
          >
            <span className={cn("absolute inset-0", skin.wrapBase)} />
            {skin.wrapImage && (
              <img
                alt=""
                src={asset(skin.wrapImage)}
                className="absolute inset-0 block size-full max-w-none object-cover"
              />
            )}
            <span className="relative flex size-full flex-col items-start">
              <span className="block w-full px-4 pt-6 text-[32px] leading-10 font-bold text-on-accent">
                {skin.teaser}
              </span>
              <span className="flex min-h-px w-full flex-1 items-start px-4 pt-4 pb-6">
                <span className="flex min-w-24 items-center justify-center rounded-rounded bg-cream px-5 py-3 text-base leading-6 font-medium whitespace-nowrap text-text-primary">
                  {skin.action}
                </span>
              </span>
            </span>

            {/* Ribbon: a band across, a band down, and the bow where they cross */}
            {skin.ribbon ? (
              <>
                <span className={cn("absolute inset-[74.32%_-0.1%_21.79%_0] overflow-clip", BAND_SHADOW)}>
                  <img
                    alt=""
                    src={asset(skin.ribbon.horizontal)}
                    className="absolute inset-0 block size-full max-w-none object-cover"
                  />
                </span>
                {/* The bar art runs across; turned a quarter to run down the box */}
                <span className="absolute inset-[0_19.16%_0_77.92%] flex items-center justify-center [container-type:size]">
                  <span className={cn("relative h-[100cqw] w-[100cqh] flex-none -rotate-90", BAND_SHADOW)}>
                    <img
                      alt=""
                      src={asset(skin.ribbon.vertical)}
                      className="absolute inset-0 block size-full max-w-none object-cover"
                    />
                  </span>
                </span>
              </>
            ) : (
              <>
                <span className={cn("absolute inset-[74.32%_-0.1%_21.79%_0] bg-cream", BAND_SHADOW)} />
                <span className={cn("absolute inset-[0_19.16%_0_77.92%] bg-cream", BAND_SHADOW)} />
              </>
            )}
            <span className="absolute inset-[64.59%_7.49%_12.06%_66.24%]">
              <span className="absolute inset-[0_-3.94%_0_0]">
                <img alt="" src={asset("/rewind/love/gift-bowtie.svg")} className="block size-full max-w-none" />
              </span>
            </span>
            {/* Wrapped-box edge: an inset shadow on the left and bottom, over everything */}
            <span className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", skin.edge)} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
