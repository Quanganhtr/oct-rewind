"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { BlobGradient } from "./BlobGradient";
import { DroppingStars, LightSweep } from "./KeyEffects";
import { TrackDots } from "./TrackDots";

interface KeyGradientProps {
  label: string;
  /** When set, the centre label becomes the tap target. */
  onPress?: () => void;
  className?: string;
}

/** Figma "Key gradient": the glowing pill-topped orb with loader ring, stars and light sweep. */
export function KeyGradient({ label, onPress, className }: KeyGradientProps) {
  return (
    <div
      className={cn(
        "relative flex h-[1000px] w-full shrink-0 items-start justify-center gap-2.5 overflow-clip rounded-rounded",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-rounded bg-linear-to-b from-key-from from-50% to-key-to" />

      <div className="relative flex min-w-px flex-1 items-center gap-2.5">
        <BlobGradient className="aspect-square min-w-px flex-1" />
        <TrackDots />
        <button
          type="button"
          onClick={onPress}
          disabled={!onPress}
          className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded-rounded px-8 py-6 focus-visible:outline-2 focus-visible:outline-text-primary"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              className="font-sf text-xl leading-7 font-semibold whitespace-nowrap text-text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <DroppingStars />
      <LightSweep />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-key-glow" />
    </div>
  );
}
