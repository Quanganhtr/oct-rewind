"use client";

import { useEffect, useRef, useState } from "react";
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
import { BlobGradient, ORB_DOCK, ORB_HIDDEN_Y } from "./BlobGradient";
import { DroppingStars } from "./KeyEffects";
import { KeyGradient } from "./KeyGradient";
import { useTier } from "./TierContext";
import { TopNavigation } from "./TopNavigation";
import { countWords, TypedLine, WORD_INTERVAL } from "./TypedLine";

interface IntroScreenProps {
  /**
   * Figma "Loading" → "Start": black turns to cream, the cream 2026 mark turns black as it glides
   * up, and the key rises into view.
   */
  phase: "loading" | "start";
  /** Share of the app's images loaded so far (0–1). Loading holds until it reaches 1. Defaults to done. */
  loadProgress?: number;
  /** Fires once Loading has run its minimum time and everything is loaded. */
  onLoaded: () => void;
  onStart: () => void;
  onClose: () => void;
}

/** Loading's minimum run, even when everything is already loaded. */
export const LOADING_DURATION = 2.2;
export const SETTLE_DURATION = 1.4;
export const DOME_EXIT_DURATION = 1.2;
/** The eyebrow ("Nhìn lại") fades out as Start takes over. */
export const LOADING_FADE = 0.3;
/** The 2026 mark and greeting vanish this fast once the dome's top reaches the top of the screen. */
export const START_CONTENT_EXIT = 0.15;
/** If nobody taps "Bắt đầu" this long after the key is ready, Start moves on by itself. */
export const AUTO_START = 5;

/** Word offset where each greeting line starts, so line 2 picks up right after line 1. */
const lineStarts = (lines: string[]) =>
  lines.map((_, i) => lines.slice(0, i).reduce((words, line) => words + countWords(line), 0));

export function IntroScreen({ phase, loadProgress = 1, onLoaded, onStart, onClose }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, eyebrowClass, yearMark, greeting, startKey } = useTier();
  const greetingLineStarts = lineStarts(greeting);
  const isLoading = phase === "loading";
  // Loading → Start: one long, soft ease shared by everything that moves
  const settle = { duration: reduceMotion ? 0 : SETTLE_DURATION, ease: easeInOutSine };
  // The greeting waits for the 2026 to land — unless Start opened directly (Back button)
  const [openedOnStart] = useState(phase === "start");
  const greetingDelay = reduceMotion || openedOnStart ? 0 : SETTLE_DURATION;
  useLoadingGate(isLoading, reduceMotion ? 0.6 : LOADING_DURATION, loadProgress, onLoaded);

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

  // No tap? Carry on to the chat anyway, the same way a tap would (dome slides up and away).
  // Counted from when the key is ready: the 2026 has landed and the greeting starts typing.
  useEffect(() => {
    if (isLoading || isLeaving) return;
    const t = setTimeout(handleStart, (greetingDelay + AUTO_START) * 1000);
    return () => clearTimeout(t);
    // handleStart is fresh each render; a tap (isLeaving) or leaving Start cancels the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLeaving, greetingDelay]);

  return (
    <div
      ref={screenRef}
      className="absolute inset-0 flex flex-col items-end overflow-clip bg-linear-to-b from-loading-from via-loading-via to-loading-to"
    >
      {/* Loading is black (or the tier's gradient), Start is cream. initial={false}: start in the current phase's state,
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

      <motion.div
        className={cn(
          "relative flex w-full shrink-0 flex-col items-center justify-center gap-6 px-4",
          // The top bar floats, so this starts at the very top. Loading: the full screen, content centred
          // under the bar (bar height + 24px). Start: the top half, 2026 + greeting centred; the dome
          // takes the bottom half.
          isLoading ? "h-full pt-20 pb-14 sm:pt-[122px]" : "h-1/2",
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
              className={cn("text-2xl leading-8 whitespace-nowrap text-cream", eyebrowClass)}
            >
              {eyebrow}
            </motion.p>
          )}
        </AnimatePresence>

        {/* "2026": small and cream on Loading, full size and dark on Start — it grows and
            cross-fades while it glides up */}
        <motion.div
          layout
          transition={settle}
          className={cn("relative shrink-0", isLoading ? yearMark.loadingSize : yearMark.startSize)}
        >
          {(["loading", "start"] as const).map((mark) => (
            <motion.div
              key={mark}
              className={cn("absolute", mark === "loading" ? "inset-0" : yearMark.startInset)}
              initial={false}
              animate={{ opacity: (mark === "loading") === isLoading ? 1 : 0 }}
              transition={settle}
            >
              <img
                alt={mark === "start" ? "2026" : ""}
                src={asset(yearMark[mark])}
                className="block size-full max-w-none"
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {!isLoading && (
            // Types in once the 2026 has landed, line after line, like the chat's lines
            <motion.div key="greeting" layout="position" className="flex w-full flex-col items-center gap-2">
              {greeting.map((line, i) => (
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
            labelClass={startKey?.labelClass}
            // The icon belongs to "Bắt đầu" only, not the Loading label
            icon={isLoading ? undefined : startKey?.icon}
            onPress={isLoading || isLeaving ? undefined : handleStart}
            // Ready once the key has risen into place (the same moment the greeting starts typing)
            readyDelay={isLoading || isLeaving ? undefined : greetingDelay}
          />
        </motion.div>
      </motion.div>

      {/* Status bar + top bar float over everything, pinned to the top. The dark-icon bar fades in with the cream. */}
      <div className="absolute inset-x-0 top-0">
        <TopNavigation tone="dark" onClose={onClose} />
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={settle}
        >
          <TopNavigation tone="light" onClose={onClose} />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Loading hands off to Start once it has run for `duration` seconds and everything is loaded,
 * whichever comes last.
 */
function useLoadingGate(isLoading: boolean, duration: number, loadProgress: number, onDone: () => void) {
  const [minRunOver, setMinRunOver] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => setMinRunOver(true), duration * 1000);
    return () => clearTimeout(t);
  }, [isLoading, duration]);

  useEffect(() => {
    if (!isLoading || !minRunOver || loadProgress < 1 || done.current) return;
    done.current = true;
    onDone();
  }, [isLoading, minRunOver, loadProgress, onDone]);
}
