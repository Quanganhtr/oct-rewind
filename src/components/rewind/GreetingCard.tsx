"use client";

import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { easeOutQuint } from "@/lib/motion";
import { ShareButton } from "./ShareButton";
import { useTier } from "./TierContext";
import { TypedLine, typeDuration } from "./TypedLine";

/** The greeting card slides up from the bottom over the chat… */
const CARD_SLIDE = 0.9;
/** …then the greeting types in once it has mostly landed, and the wish LINE_GAP after it. */
const TYPE_START = CARD_SLIDE - 0.2;
const LINE_GAP = 0.3;

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
 * Figma "Dashboard" (Private, node 525:19417): a full-screen New Year card over the bamboo art,
 * the greeting and wish in cream, and a share button at the foot. (Figma also has a red "2026"
 * layer under the bamboo, fully covered by it, so only the bamboo is shipped.)
 *
 * It has no header or home indicator of its own: it slides up under the chat's, which every
 * screen shares (ChatScreen switches them to their on-dark look). It only leaves room for them.
 */
export function GreetingCard() {
  const { greetingCard } = useTier();
  const reduceMotion = useReducedMotion();
  if (!greetingCard) return null;
  const { lines, wish, image } = greetingCard;
  const greeting = lines.join("\n");

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

      {/* Typed word by word, like the Start greeting: the two greeting lines, then the wish */}
      <div className="relative flex min-h-px w-full flex-1 flex-col items-start gap-4 px-4 pt-14 pb-4">
        <TypedLine text={greeting} age={0} stayVisible variant="card" delay={TYPE_START} />
        <TypedLine
          text={wish}
          age={0}
          stayVisible
          variant="cardBold"
          delay={TYPE_START + typeDuration(greeting) + LINE_GAP}
        />
      </div>

      <div className="relative flex w-full flex-col items-start">
        <ShareButton tone="ink" className="justify-center p-4" />
        {/* Room for the shared home indicator */}
        <div className="h-[34px] w-full shrink-0" />
      </div>
    </motion.div>
  );
}
