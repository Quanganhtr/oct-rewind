"use client";

import { useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  cubicBezier,
  motion,
  useAnimationFrame,
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
  /** Share of the app's images loaded so far (0–1). The bar can't fill past it. Defaults to done. */
  loadProgress?: number;
  /** Fires once the loading bar has filled: its minimum run is over and everything is loaded. */
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

export function IntroScreen({ phase, loadProgress = 1, onLoaded, onStart, onClose }: IntroScreenProps) {
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
              <LoadingBar
                duration={reduceMotion ? 0.6 : LOADING_DURATION}
                loadProgress={loadProgress}
                onDone={onLoaded}
              />
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

const easeBar = cubicBezier(...easeInOutSine);
/** How quickly the bar catches up when loading, not time, was holding it back (per second). */
const CATCH_UP = 6;
/** Within this much of its target, the bar locks on rather than easing forever. */
const SNAP = 0.02;

/**
 * The Loading progress bar. It fills on its usual eased timeline but never runs ahead of what's
 * actually loaded; if loading is behind, it waits there and then glides on as images arrive.
 */
function LoadingBar({ duration, loadProgress, onDone }: { duration: number; loadProgress: number; onDone: () => void }) {
  const fill = useMotionValue(0);
  const x = useTransform(fill, (f) => `${(f - 1) * 100}%`);
  const elapsed = useRef(0);
  const finished = useRef(false);

  useAnimationFrame((_, delta) => {
    if (finished.current) return;
    elapsed.current += delta / 1000;
    const onSchedule = easeBar(Math.min(1, elapsed.current / duration));
    const target = Math.min(onSchedule, loadProgress);
    const current = fill.get();
    // Close to its target it tracks it exactly; after a hold-up it glides there instead of jumping
    const next =
      Math.abs(target - current) < SNAP ? target : current + (target - current) * Math.min(1, (CATCH_UP * delta) / 1000);
    fill.set(Math.max(current, next));
    if (onSchedule >= 1 && loadProgress >= 1 && fill.get() >= 0.999) {
      fill.set(1);
      finished.current = true;
      onDone();
    }
  });

  return (
    <div className="h-0.5 w-full overflow-clip rounded-[999px]">
      <motion.div className="size-full rounded-[999px] bg-cream" style={{ x }} />
    </div>
  );
}
