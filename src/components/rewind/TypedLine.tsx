"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/cn";
import { LINE_OPACITY } from "@/data/rewind";

/*
 * Word-by-word typing shared by the Start greeting and the chat: each word blurs in, glows
 * peach → red → its resting color, and (for older chat lines) dims afterwards.
 */

/** A new word starts every WORD_INTERVAL seconds, whatever the line length… */
export const WORD_INTERVAL = 0.15;
/** …and faster once the conversation proper starts (Step 5's 14px thread text). */
export const THREAD_WORD_INTERVAL = 0.07;
/** A word un-blurs over this long. */
export const WORD_REVEAL = 0.5;
/** A word's color runs peach → red → its resting color over this long as it appears. */
export const WORD_COLOR = 1;
const WORD_GLOW = ["var(--color-glow-1)", "var(--color-glow-2)"];
/** Words dim this long after they appear… */
export const DIM_DELAY = 1;
/** …over this long. */
export const DIM_DURATION = 0.6;

export const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Time for a line to fully type in: last word's start + its reveal. */
export const typeDuration = (text: string, interval = WORD_INTERVAL) =>
  (countWords(text) - 1) * interval + WORD_REVEAL;

interface TypedLineProps {
  text: string;
  /** 0 = newest line. */
  age: number;
  stayVisible: boolean;
  /** "intro": 24px chat line, dims with age. "thread": Step 5's 14px body. "greeting": Start's centred lines. */
  variant: "intro" | "thread" | "greeting" | "prompt";
  /** Show already settled, no typing (opening straight on a later step). */
  instant?: boolean;
  /** Seconds before the first word starts. */
  delay?: number;
}

const VARIANT_CLASS = {
  intro: "w-full text-2xl leading-8 font-medium text-brand-primary",
  thread: "w-full text-sm leading-5 font-medium text-text-primary",
  greeting: "text-2xl leading-8 font-medium whitespace-nowrap text-brand-primary",
  prompt: "w-full text-sm leading-5 font-normal text-text-primary",
};

export function TypedLine({ text, age, stayVisible, variant, instant = false, delay = 0 }: TypedLineProps) {
  const reduceMotion = useReducedMotion();
  // Keep whitespace (incl. the "\n" line break) as plain text between word spans
  const tokens = text.split(/(\s+)/);
  // Position of each word among words only (whitespace tokens get -1)
  const wordIndexes = tokens.map((t, i) => (t.trim() ? tokens.slice(0, i).filter((w) => w.trim()).length : -1));
  const restingOpacity = stayVisible ? 1 : LINE_OPACITY[1];
  const isBody = variant === "thread" || variant === "prompt";
  const interval = isBody ? THREAD_WORD_INTERVAL : WORD_INTERVAL;
  const restColor = isBody ? "var(--color-text-primary)" : "var(--color-brand-primary)";
  const colors = [...WORD_GLOW, restColor];

  return (
    <p className={cn("whitespace-pre-line", VARIANT_CLASS[variant])}>
      {tokens.map((token, t) => {
        const wordIndex = wordIndexes[t];
        if (wordIndex < 0) return token;

        // Newest line: blur in, hold, then dim. Older lines: settle to their age's opacity.
        const total = WORD_REVEAL + DIM_DELAY + DIM_DURATION;
        const typing: TargetAndTransition = {
          opacity: [0, 1, 1, restingOpacity],
          filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)"],
          color: colors,
          transition: {
            duration: total,
            times: [0, WORD_REVEAL / total, (WORD_REVEAL + DIM_DELAY) / total, 1],
            ease: "easeOut",
            delay: delay + wordIndex * interval,
            color: {
              duration: WORD_COLOR,
              ease: "easeInOut",
              delay: delay + wordIndex * interval,
            },
          },
        };
        const settled: TargetAndTransition = {
          opacity: age === 0 ? restingOpacity : LINE_OPACITY[Math.min(age, LINE_OPACITY.length - 1)],
          filter: "blur(0px)",
          color: restColor,
          transition: { duration: DIM_DURATION, ease: "easeOut" },
        };

        return (
          <motion.span
            key={t}
            className="inline-block"
            initial={reduceMotion || instant ? false : { opacity: 0, filter: "blur(8px)", color: colors[0] }}
            animate={
              reduceMotion || instant ? { ...settled, transition: { duration: 0 } } : age === 0 ? typing : settled
            }
          >
            {token}
          </motion.span>
        );
      })}
    </p>
  );
}
