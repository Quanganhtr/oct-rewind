"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { easeOutQuint } from "@/lib/motion";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";
import { useTier } from "./TierContext";
import { TypedLine, typeDuration } from "./TypedLine";

/** The greeting card slides up from the bottom over the chat… */
const CARD_SLIDE = 0.9;
/** …then the greeting types in once it has mostly landed, and the wish LINE_GAP after it. */
const TYPE_START = CARD_SLIDE - 0.2;
const LINE_GAP = 0.3;
/** Any figures under the wish come in one after another once it has typed in… */
const STAT_GAP = 0.25;
/** …each fading up over this long, its number counting as it lands. */
const STAT_REVEAL = 0.5;

/** Figma "End" (Private, node 525:19433): the closing sheet's one wide button. */
export function GreetingButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <div className="flex w-full flex-col items-start bg-linear-to-b from-cream/0 to-cream">
      <div className="flex w-full flex-col items-center px-4 pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPress();
          }}
          className="flex w-full min-w-24 items-center justify-center rounded-rounded bg-brand-primary px-5 py-3"
        >
          <span className="text-base leading-6 font-medium whitespace-nowrap text-on-accent">{label}</span>
        </button>
      </div>
      {/* Room for the home indicator, which floats above this */}
      <div className="h-[34px] w-full shrink-0" />
    </div>
  );
}

/**
 * Figma "Dashboard" (section 561:37590: Private 561:37518, Priority 561:37554): a full-screen New
 * Year card over the tier's art, the greeting and wish in cream. No share button. The base tier's
 * "Dashboard" (592:5898) is its year summary in the same frame: the reader's title, then three
 * figures down the right, and a share button.
 *
 * It has no header or home indicator of its own: it slides up under the chat's, which every
 * screen shares (ChatScreen switches them to their on-dark look). It only leaves room for them.
 */
export function GreetingCard() {
  const { greetingCard } = useTier();
  const reduceMotion = useReducedMotion();
  const greeting = greetingCard?.lines.join("\n") ?? "";
  const wishAt = TYPE_START + typeDuration(greeting) + LINE_GAP;
  const statsAt = reduceMotion ? 0 : wishAt + typeDuration(greetingCard?.wish ?? "") + LINE_GAP;
  // Figures mount as they're due, so their numbers count up in view
  const [statsShown, setStatsShown] = useState(false);
  useEffect(() => {
    if (!greetingCard?.stats) return;
    const timer = setTimeout(() => setStatsShown(true), statsAt * 1000);
    return () => clearTimeout(timer);
  }, [greetingCard?.stats, statsAt]);
  if (!greetingCard) return null;
  const { wish, image, linesClass, wishClass, stats, share } = greetingCard;

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-end overflow-clip bg-brand-primary"
      onClick={(e) => e.stopPropagation()}
      initial={{ y: reduceMotion ? 0 : "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: reduceMotion ? 0 : CARD_SLIDE, ease: easeOutQuint }}
    >
      <img alt="" src={asset(image)} className="absolute inset-0 block size-full max-w-none object-cover" />

      {/* Room for the shared header: 56px title bar on phones, + the 50px status bar in the desktop frame */}
      <div className="h-14 w-full shrink-0 sm:h-[98px]" />

      {/* Typed word by word, like the Start greeting: the greeting line(s), then the wish */}
      <div className="relative flex min-h-px w-full flex-1 flex-col items-start gap-4 px-4 pt-14 pb-4">
        <div className={cn("flex w-full flex-col items-start", stats ? "gap-2" : "gap-4")}>
          <TypedLine text={greeting} age={0} stayVisible variant="card" delay={TYPE_START} className={linesClass} />
          <TypedLine text={wish} age={0} stayVisible variant="cardBold" delay={wishAt} className={wishClass} />
        </div>
        {statsShown &&
          stats?.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex w-full flex-col items-end gap-2 text-right"
              initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: STAT_REVEAL, delay: i * STAT_GAP, ease: easeOutQuint }}
            >
              <p className="w-full text-base leading-6 font-medium text-cream">{label}</p>
              <p className="w-full text-[32px] leading-10 font-bold text-on-accent">
                <CountUp value={value} />
              </p>
            </motion.div>
          ))}
      </div>

      <div className="relative flex w-full flex-col items-start">
        {share && <ShareButton tone="cream" className="justify-center p-4" />}
        {/* Room for the shared home indicator (the New Year cards have no share button: Figma 561:37590) */}
        <div className="h-[34px] w-full shrink-0" />
      </div>
    </motion.div>
  );
}
