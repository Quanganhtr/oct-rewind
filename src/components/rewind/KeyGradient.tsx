"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { easeInOutSine } from "@/lib/motion";
import { BlobGradient } from "./BlobGradient";
import { DroppingStars, LightSweep } from "./KeyEffects";
import { TrackDots } from "./TrackDots";

interface KeyGradientProps {
  label: string;
  /** Label size, replacing the default 20px (Priority uses 16px). */
  labelClass?: string;
  /** 16px icon after the label, 4px away (Priority's "Bắt đầu ↑"). */
  icon?: string;
  /** When set, the centre label becomes the tap target. */
  onPress?: () => void;
  /**
   * Seconds until the key has settled on screen and is ready to tap. The ring runs its lap then,
   * and if nobody has tapped HINT_FIRST later, the key starts nudging. Unset, both rest.
   */
  readyDelay?: number;
  className?: string;
}

/** The dome's orb turns once, then holds this long before turning again (the chat orb keeps spinning). */
const DOME_REST = 5;

/** How long the key sits untouched before its first nudge to tap. */
export const HINT_FIRST = 5;
/** Still gap after each nudge before the next one. */
const HINT_REST = 10;
/** One nudge: swell, shake while big, then settle; the still gap between nudges keeps it from reading as loading. */
const HINT_GROW = 0.3;
const HINT_SHAKE = 1.2;
const HINT_SCALE = 1.08;
/** Side-to-side tilts (deg) during the shake, easing off towards the end. */
const SHAKE_TILTS = [-4, 4, -4, 4, -3.5, 3.5, -3, 3, -2, 2, -1, 1];

const HINT_DURATION = HINT_GROW * 2 + HINT_SHAKE;
const growEnd = HINT_GROW / HINT_DURATION;
const shakeEnd = (HINT_GROW + HINT_SHAKE) / HINT_DURATION;
const HINT_SCALE_TRACK = { scale: [1, HINT_SCALE, HINT_SCALE, 1], times: [0, growEnd, shakeEnd, 1] };
/** Upright through the grow, one tilt per step across the shake, upright again to shrink. */
const tiltStep = (shakeEnd - growEnd) / (SHAKE_TILTS.length + 1);
const HINT_TILT_TRACK = {
  rotate: [0, 0, ...SHAKE_TILTS, 0, 0],
  times: [0, growEnd, ...SHAKE_TILTS.map((_, i) => growEnd + tiltStep * (i + 1)), shakeEnd, 1],
};

/** Figma "Key gradient": the glowing pill-topped orb with loader ring, stars and light sweep. */
export function KeyGradient({ label, labelClass, icon, onPress, readyDelay, className }: KeyGradientProps) {
  const reduceMotion = useReducedMotion();
  const hinting = readyDelay !== undefined && !reduceMotion;
  const nudge = {
    duration: HINT_DURATION,
    ease: easeInOutSine,
    repeat: Infinity,
    repeatDelay: HINT_REST,
    delay: (readyDelay ?? 0) + HINT_FIRST,
  };
  // Tapping (or leaving Start) lets the key ease back to rest
  const settle = { duration: 0.3, ease: easeInOutSine };

  return (
    <div
      className={cn(
        "relative flex h-[1000px] w-full shrink-0 items-start justify-center gap-2.5 overflow-clip rounded-rounded",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-rounded bg-linear-to-b from-key-from from-50% to-key-to" />

      <div className="relative flex min-w-px flex-1 items-center gap-2.5">
        <BlobGradient variant="dome" restBetweenTurns={DOME_REST} className="aspect-square min-w-px flex-1" />
        {/* Ring + label swell and shake together around the orb's centre as the tap hint */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={
            hinting ? { scale: HINT_SCALE_TRACK.scale, rotate: HINT_TILT_TRACK.rotate } : { scale: 1, rotate: 0 }
          }
          transition={
            hinting
              ? { scale: { ...nudge, times: HINT_SCALE_TRACK.times }, rotate: { ...nudge, times: HINT_TILT_TRACK.times } }
              : settle
          }
        >
          <TrackDots lapDelay={readyDelay} />
          <button
            type="button"
            onClick={onPress}
            disabled={!onPress}
            className="pointer-events-auto absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center justify-center rounded-rounded px-8 py-6 focus-visible:outline-2 focus-visible:outline-text-primary"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={label}
                className={cn(
                  "flex items-center gap-1 font-sf text-xl leading-7 font-semibold whitespace-nowrap text-text-primary",
                  labelClass,
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {label}
                {icon && <img alt="" src={asset(icon)} className="block size-4 shrink-0" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      <DroppingStars />
      <LightSweep />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-key-glow" />
    </div>
  );
}
