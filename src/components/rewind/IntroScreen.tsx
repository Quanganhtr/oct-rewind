"use client";

import { useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { easeInOutCubic, easeInOutSine } from "@/lib/motion";
import { USER_NAME } from "@/data/rewind";
import { KeyGradient } from "./KeyGradient";
import { TopNavigation } from "./TopNavigation";

interface IntroScreenProps {
  /** Figma "Loading" → "Start": same layout, the year mark glides up and the key rises into view. */
  phase: "loading" | "start";
  /** Fires once the loading bar has filled. */
  onLoaded: () => void;
  onStart: () => void;
  onClose: () => void;
}

const LOADING_DURATION = 2.2;
const SETTLE_DURATION = 1.4;
const DOME_EXIT_DURATION = 1.2;

export function IntroScreen({ phase, onLoaded, onStart, onClose }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const isLoading = phase === "loading";
  // Loading → Start: one long, soft ease shared by everything that moves
  const settle = { duration: reduceMotion ? 0 : SETTLE_DURATION, ease: easeInOutSine };

  // Tapping "Bắt đầu" slides the dome up and off-screen; the page whitens in step with it.
  const domeRef = useRef<HTMLDivElement>(null);
  const domeY = useMotionValue(0);
  const [exitDistance, setExitDistance] = useState(1);
  const [isLeaving, setIsLeaving] = useState(false);
  const whiteOpacity = useTransform(domeY, [0, -exitDistance], [0, 1]);

  const handleStart = async () => {
    const dome = domeRef.current;
    if (!dome || isLeaving) return;
    // Fully out once its bottom edge passes the top of the screen
    const distance = dome.offsetTop + dome.offsetHeight;
    setExitDistance(distance);
    setIsLeaving(true);
    await animate(domeY, -distance, {
      duration: reduceMotion ? 0 : DOME_EXIT_DURATION,
      ease: easeInOutCubic,
    });
    onStart();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-end overflow-clip bg-brand-primary">
      <motion.div className="pointer-events-none absolute inset-0 bg-page-light" style={{ opacity: whiteOpacity }} />

      <TopNavigation tone="dark" onClose={onClose} />
      {/* Light-background bar fades in with the white so icons stay visible */}
      <motion.div className="absolute inset-x-0 top-0" style={{ opacity: whiteOpacity }}>
        <TopNavigation tone="light" onClose={onClose} />
      </motion.div>

      <div
        className={cn(
          "relative flex w-full shrink-0 flex-col items-center gap-6 px-4 pt-6 pb-14",
          isLoading && "h-[754px] justify-center",
        )}
      >
        {/* "2026" — identical artwork on both screens (Start's export only adds side padding) */}
        <motion.img
          layout="position"
          transition={settle}
          alt="2026"
          src={asset("/rewind/year-2026.svg")}
          className="block h-[92.74px] w-[308.782px] max-w-none shrink-0"
        />

        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              key="progress"
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="w-[124px] shrink-0 rounded-[999px] bg-on-accent/30 p-0.5"
              role="progressbar"
              aria-label="Đang tải"
            >
              <div className="h-2 w-full overflow-clip rounded-[999px]">
                <motion.div
                  className="size-full rounded-[999px] bg-on-accent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: reduceMotion ? 0.6 : LOADING_DURATION, ease: easeInOutSine }}
                  onAnimationComplete={onLoaded}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="greeting"
              layout="position"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...settle, delay: reduceMotion ? 0 : 0.5 }}
              className="flex w-full flex-col items-center gap-2 text-2xl leading-8 font-light whitespace-nowrap text-on-accent"
            >
              <p>{USER_NAME} ơi!</p>
              <p>Chuyện trò chút nhé</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        ref={domeRef}
        layout="position"
        transition={settle}
        className="relative h-[1000px] w-full shrink-0"
      >
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
