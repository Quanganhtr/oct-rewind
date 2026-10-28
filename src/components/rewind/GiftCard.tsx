"use client";

import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { asset } from "@/lib/asset";
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

interface GiftCardProps {
  open: boolean;
  /** Tapping the gift; omitted once it's open. */
  onOpen?: () => void;
}

/**
 * Figma "Chuyện thương ai" card: a wrapped gift ("Người ấy là ai?" + ribbon) over the person the
 * reader sends money to most. Tapping it lifts the wrapping off (see GIFT_DROP) to show the card.
 */
export function GiftCard({ open, onOpen }: GiftCardProps) {
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
      {/* Underneath: the person's card, put in as the gift is opened (so its numbers count as it shows) */}
      <div className="absolute inset-0 flex overflow-clip rounded-card bg-page-light">
        {open && (
          <>
            <div className="absolute inset-x-0 bottom-0 aspect-[4/3] bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]" />
            {/* Figma slot "asset 1:2": the coin artwork across the card, with its orbit rings off the right edge */}
            <div className="absolute inset-0 flex flex-col items-end justify-center overflow-clip">
              <img
                alt=""
                src={asset("/rewind/love/person-coin.png")}
                className="block aspect-[4/3] w-full max-w-none shrink-0 object-cover"
              />
              <img
                alt=""
                src={asset("/rewind/love/person-rings.svg")}
                className="absolute top-[-48.6px] right-[-98.86px] block h-[477.353px] w-[197.726px] max-w-none"
              />
            </div>
            <div className="relative flex min-w-px flex-1 flex-col">
              <div className="flex min-h-px w-full flex-1 flex-col gap-1 px-4 pt-6 pb-4 text-on-accent">
                <p className="w-full text-[32px] leading-10 font-bold">{LOVE_CARD.name}</p>
                <p className="w-full text-sm leading-5 font-medium">
                  {LOVE_CARD.lines.map((line) => (
                    <span key={line} className="block">
                      <CountUp value={line} />
                    </span>
                  ))}
                </p>
              </div>
              <ShareButton tone="light" className="px-4 pt-4 pb-6" />
            </div>
          </>
        )}
      </div>

      {/* On top: the wrapping — a whole card of its own that hops and falls away when tapped */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="gift"
            type="button"
            aria-label={LOVE_CARD.action}
            disabled={!onOpen}
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-start justify-start overflow-clip rounded-card text-left disabled:cursor-default"
            exit={drop}
          >
            <span className="absolute inset-x-0 bottom-0 aspect-[4/3] bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]" />
            {/* Wrapped-box edge: an inset shadow on the left and bottom */}
            <span className="absolute inset-0 rounded-[inherit] shadow-[inset_4px_-4px_0px_0px_rgb(0_0_0/0.56)]" />
            <span className="relative flex flex-col items-start">
              <span className="block w-full px-4 pt-6 pb-4 text-[32px] leading-10 font-bold text-on-accent">
                {LOVE_CARD.teaser}
              </span>
              <span className="px-4 pb-6">
                <span className="flex items-center justify-center rounded-rounded bg-cream px-5 py-3 text-base leading-6 font-medium whitespace-nowrap text-text-primary">
                  {LOVE_CARD.action}
                </span>
              </span>
            </span>

            {/* Ribbon: a band across, a band down, and the bow where they cross */}
            <span className="absolute inset-x-0 top-[191px] h-2.5 bg-cream shadow-[2px_2px_4px_0px_rgb(0_0_0/0.16)]" />
            <span className="absolute inset-y-0 right-[19.46%] left-[77.59%] bg-cream shadow-[2px_2px_4px_0px_rgb(0_0_0/0.16)]" />
            <span className="absolute top-[166px] right-[7.67%] left-[65.8%] h-[60px]">
              <img
                alt=""
                src={asset("/rewind/love/gift-bow.svg")}
                className="absolute inset-[0_-3.67%_0_0] block size-full max-w-none"
              />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
