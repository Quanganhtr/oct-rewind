"use client";

import { useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { easeInOutCubic, easeInOutSine } from "@/lib/motion";
import { START_GREETING } from "@/data/rewind";
import { BlobGradient, ORB_DOCK, ORB_HIDDEN_Y } from "./BlobGradient";
import { DroppingStars } from "./KeyEffects";
import { KeyGradient } from "./KeyGradient";
import { TopNavigation } from "./TopNavigation";
import { countWords, TypedLine, WORD_INTERVAL } from "./TypedLine";

interface IntroScreenProps {
  /**
   * Figma "Loading" → "Start": black turns to cream, the cream 2026 mark turns black as it glides
   * up, and the key rises into view.
   */
  phase: "loading" | "start";
  /** Fires once the loading bar has filled. */
  onLoaded: () => void;
  onStart: () => void;
  onClose: () => void;
}

export const LOADING_DURATION = 2.2;
export const SETTLE_DURATION = 1.4;
export const DOME_EXIT_DURATION = 1.2;
/** "Nhìn lại" and the progress bar fade out as Start takes over. */
export const LOADING_FADE = 0.3;
/** The 2026 mark and greeting vanish this fast once the dome's top reaches the top of the screen. */
export const START_CONTENT_EXIT = 0.15;

/** Word offset where each greeting line starts, so line 2 picks up right after line 1. */
const greetingLineStarts = START_GREETING.map((_, i) =>
  START_GREETING.slice(0, i).reduce((words, line) => words + countWords(line), 0),
);

export function IntroScreen({ phase, onLoaded, onStart, onClose }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const isLoading = phase === "loading";
  // Loading → Start: one long, soft ease shared by everything that moves
  const settle = { duration: reduceMotion ? 0 : SETTLE_DURATION, ease: easeInOutSine };
  // The greeting waits for the 2026 to land — unless Start opened directly (Back button)
  const [openedOnStart] = useState(phase === "start");
  const greetingDelay = reduceMotion || openedOnStart ? 0 : SETTLE_DURATION;

  // Tapping "Bắt đầu" slides the dome up and off-screen. The 2026 mark and greeting vanish as the
  // dome's top edge reaches the top of the screen. Once its bottom edge reaches mid-screen, the chat
  // orb rises from below, landing as the dome clears the top.
  const screenRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);
  const domeY = useMotionValue(0);
  const [exit, setExit] = useState({ distance: 1, orbStart: 0.5, topAt: 0.5 });
  const [isLeaving, setIsLeaving] = useState(false);
  const [contentGone, setContentGone] = useState(false);
  const orbY = useTransform(domeY, [-exit.orbStart, -exit.distance], [ORB_HIDDEN_Y, 0]);
  useMotionValueEvent(domeY, "change", (y) => {
    if (isLeaving && !contentGone && y <= -exit.topAt) setContentGone(true);
  });

  const handleStart = async () => {
    const dome = domeRef.current;
    const screen = screenRef.current;
    if (!dome || !screen || isLeaving) return;
    // Fully out once its bottom edge passes the top of the screen
    const distance = dome.offsetTop + dome.offsetHeight;
    setExit({ distance, orbStart: distance - screen.clientHeight / 2, topAt: dome.offsetTop });
    setIsLeaving(true);
    await animate(domeY, -distance, {
      duration: reduceMotion ? 0 : DOME_EXIT_DURATION,
      ease: easeInOutCubic,
    });
    onStart();
  };

  return (
    <div ref={screenRef} className="absolute inset-0 flex flex-col items-end overflow-clip bg-brand-primary">
      {/* Loading is black, Start is cream. initial={false}: start in the current phase's state,
          so the first load stays black instead of fading the cream out. */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-cream"
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={settle}
      />
      {/* Loading's dropping stars (same loop as the dome's), faded out as Start takes over */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={settle}
      >
        <DroppingStars className="left-px h-[952px] w-[390px] translate-x-0" />
      </motion.div>
      {isLeaving && (
        <motion.div className={ORB_DOCK} style={{ y: orbY }}>
          <BlobGradient variant="chat" playing={false} className="size-full" />
        </motion.div>
      )}

      <TopNavigation tone="dark" onClose={onClose} />
      {/* Dark-icon bar fades in with the cream */}
      <motion.div
        className="absolute inset-x-0 top-0"
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={settle}
      >
        <TopNavigation tone="light" onClose={onClose} />
      </motion.div>

      <motion.div
        className={cn(
          "relative flex w-full shrink-0 flex-col items-center gap-6 px-4 pt-6 pb-14",
          isLoading && "h-[754px] justify-center",
        )}
        animate={{ opacity: contentGone ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : START_CONTENT_EXIT }}
      >
        <AnimatePresence mode="popLayout">
          {isLoading && (
            <motion.p
              key="eyebrow"
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : LOADING_FADE }}
              className="text-2xl leading-8 font-light whitespace-nowrap text-cream"
            >
              Nhìn lại
            </motion.p>
          )}
        </AnimatePresence>

        {/* "2026": small and cream on Loading, full size and black on Start — it grows and
            cross-fades while it glides up */}
        <motion.div
          layout
          transition={settle}
          className={cn("relative shrink-0", isLoading ? "h-[55px] w-[189px]" : "h-[90.74px] w-[311px]")}
        >
          {(["cream", "dark"] as const).map((tone) => (
            <motion.div
              key={tone}
              className={cn("absolute", tone === "cream" ? "inset-0" : "inset-[0_0_0_0.71%]")}
              initial={false}
              animate={{ opacity: (tone === "cream") === isLoading ? 1 : 0 }}
              transition={settle}
            >
              <img
                alt={tone === "dark" ? "2026" : ""}
                src={asset(`/rewind/year-2026-${tone}.svg`)}
                className="block size-full max-w-none"
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              key="progress"
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : LOADING_FADE }}
              className="w-[124px] shrink-0 rounded-[999px] bg-on-accent/30 p-px"
              role="progressbar"
              aria-label="Đang tải"
            >
              <div className="h-0.5 w-full overflow-clip rounded-[999px]">
                <motion.div
                  className="size-full rounded-[999px] bg-cream"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: reduceMotion ? 0.6 : LOADING_DURATION, ease: easeInOutSine }}
                  onAnimationComplete={onLoaded}
                />
              </div>
            </motion.div>
          ) : (
            // Types in once the 2026 has landed, line after line, like the chat's lines
            <motion.div key="greeting" layout="position" className="flex w-full flex-col items-center gap-2">
              {START_GREETING.map((line, i) => (
                <TypedLine
                  key={line}
                  text={line}
                  age={0}
                  stayVisible
                  variant="greeting"
                  delay={greetingDelay + greetingLineStarts[i] * WORD_INTERVAL}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div ref={domeRef} layout="position" transition={settle} className="relative h-[1000px] w-full shrink-0">
        <motion.div style={{ y: domeY }}>
          <KeyGradient
            label={isLoading ? "Đang tải" : "Bắt đầu"}
            onPress={isLoading || isLeaving ? undefined : handleStart}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
