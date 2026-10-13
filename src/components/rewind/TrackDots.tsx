"use client";

import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { LOOP_DURATION } from "@/lib/motion";

/** Figma "Loading": 44 one-pixel dots tracing a pill around the key label. */
const DOTS = [
  "left-[75.5px] top-[7.5px]", "left-[83.46px] top-[7.5px]", "left-[91.41px] top-[7.5px]",
  "left-[99.37px] top-[7.5px]", "left-[107.29px] top-[8px]", "left-[115.06px] top-[9.51px]",
  "left-[122.41px] top-[12.55px]", "left-[128.73px] top-[17.37px]", "left-[133.96px] top-[23.3px]",
  "left-[137.91px] top-[30.13px]", "left-[140.46px] top-[37.61px]", "left-[141.5px] top-[45.5px]",
  "left-[140.46px] top-[53.39px]", "left-[137.91px] top-[60.87px]", "left-[133.96px] top-[67.7px]",
  "left-[128.73px] top-[73.63px]", "left-[122.41px] top-[78.45px]", "left-[115.06px] top-[81.49px]",
  "left-[107.29px] top-[83px]", "left-[99.37px] top-[83.5px]", "left-[91.41px] top-[83.5px]",
  "left-[83.46px] top-[83.5px]", "left-[75.5px] top-[83.5px]", "left-[67.54px] top-[83.5px]",
  "left-[59.59px] top-[83.5px]", "left-[51.63px] top-[83.5px]", "left-[43.71px] top-[83px]",
  "left-[35.94px] top-[81.49px]", "left-[28.59px] top-[78.45px]", "left-[22.27px] top-[73.63px]",
  "left-[17.04px] top-[67.7px]", "left-[13.09px] top-[60.87px]", "left-[10.54px] top-[53.39px]",
  "left-[9.5px] top-[45.5px]", "left-[10.54px] top-[37.61px]", "left-[13.09px] top-[30.13px]",
  "left-[17.04px] top-[23.3px]", "left-[22.27px] top-[17.37px]", "left-[28.59px] top-[12.55px]",
  "left-[35.94px] top-[9.51px]", "left-[43.71px] top-[8px]", "left-[51.63px] top-[7.5px]",
  "left-[59.59px] top-[7.5px]", "left-[67.54px] top-[7.5px]",
];

const STEPS = DOTS.length;
// A dot peaks at 4× on its own step, then decays 3 → 2 → 1 over the next three steps.
const TRAIL = [4, 3, 2];
/** One lap, plus the steps the trail needs to die out behind the last dot, so every dot ends at rest. */
const LAP_STEPS = STEPS + TRAIL.length - 1;
const TIMES = Array.from({ length: LAP_STEPS + 1 }, (_, j) => j / LAP_STEPS);
/** Same pace as the Figma loop: one step every 2s / 44. */
const LAP_DURATION = (LOOP_DURATION * LAP_STEPS) / STEPS;

/** Scale track for dot `k`, sampled on every step of the lap (matches the Figma tracks). */
const scaleTrack = (k: number) => TIMES.map((_, j) => TRAIL[j - k] ?? 1);

interface TrackDotsProps {
  /** Seconds until the bright dot runs its single lap. Unset, the dots rest. */
  lapDelay?: number;
}

/** Runs the lap once rather than looping, so the ring reads as "ready", not "still loading". */
export function TrackDots({ lapDelay }: TrackDotsProps) {
  const reduceMotion = useReducedMotion();
  const runs = lapDelay !== undefined && !reduceMotion;

  return (
    <div className="absolute top-1/2 left-1/2 h-[92px] w-[152px] -translate-1/2 overflow-clip">
      {DOTS.map((position, k) => {
        const track = scaleTrack(k);
        return (
          <motion.img
            key={k}
            alt=""
            src={asset("/rewind/track-dot.svg")}
            className={cn("absolute block size-px", position)}
            initial={{ scale: 1 }}
            animate={runs ? { scale: track } : undefined}
            transition={{ duration: LAP_DURATION, times: TIMES, ease: "linear", delay: lapDelay }}
          />
        );
      })}
    </div>
  );
}
