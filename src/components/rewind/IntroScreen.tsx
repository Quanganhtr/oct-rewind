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
import { easeInOutCubic, easeOutExpo } from "@/lib/motion";
import { USER_NAME } from "@/data/rewind";
import { KeyGradient } from "./KeyGradient";
import { TopNavigation } from "./TopNavigation";

interface IntroScreenProps {
  /** Figma "Loading" → "Start": same layout, the year mark grows and the key rises into view. */
  phase: "loading" | "start";
  onStart: () => void;
  onClose: () => void;
}

const DOME_EXIT_DURATION = 1.2;

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function IntroScreen({ phase, onStart, onClose }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const isLoading = phase === "loading";
  const layoutTransition = { duration: reduceMotion ? 0 : 0.9, ease: easeOutExpo };

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
          "relative flex w-full shrink-0 flex-col items-center px-4 pt-6 pb-14",
          isLoading ? "h-[754px] justify-center gap-4" : "gap-6",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isLoading && (
            <motion.p
              key="eyebrow"
              layout="position"
              {...fade}
              transition={layoutTransition}
              className="text-2xl leading-8 font-light whitespace-nowrap text-on-accent"
            >
              Nhìn lại
            </motion.p>
          )}
        </AnimatePresence>

        {/* "2026" year mark — Figma exports one render per size; the box scales between them */}
        <motion.div
          layout
          transition={layoutTransition}
          className={cn("relative shrink-0", isLoading ? "h-[50.039px] w-[171.5px]" : "h-[90.74px] w-[311px]")}
        >
          <div className="absolute inset-[-15.99%_-4.66%_-15.99%_-3.95%]">
            <img
              alt="2026"
              src={asset(isLoading ? "/rewind/union-loading.svg" : "/rewind/union.svg")}
              className="block size-full max-w-none"
            />
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {!isLoading && (
            <motion.div
              key="greeting"
              layout="position"
              {...fade}
              transition={{ ...layoutTransition, delay: reduceMotion ? 0 : 0.3 }}
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
        transition={layoutTransition}
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
