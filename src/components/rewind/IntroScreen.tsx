"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";
import { easeOutExpo } from "@/lib/motion";
import { USER_NAME } from "@/data/rewind";
import { KeyGradient } from "./KeyGradient";
import { TopNavigation } from "./TopNavigation";

interface IntroScreenProps {
  /** Figma "Loading" → "Start": same layout, the year mark grows and the key rises into view. */
  phase: "loading" | "start";
  onStart: () => void;
  onClose: () => void;
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function IntroScreen({ phase, onStart, onClose }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const isLoading = phase === "loading";
  const layoutTransition = { duration: reduceMotion ? 0 : 0.9, ease: easeOutExpo };

  return (
    <div className="absolute inset-0 flex flex-col items-end overflow-clip bg-brand-primary">
      <TopNavigation tone="dark" onClose={onClose} />

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

      <motion.div layout="position" transition={layoutTransition} className="w-full shrink-0">
        <KeyGradient label={isLoading ? "Đang tải" : "Bắt đầu"} onPress={isLoading ? undefined : onStart} />
      </motion.div>
    </div>
  );
}
