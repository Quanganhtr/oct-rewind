"use client";

import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { loop } from "@/lib/motion";

/**
 * Figma "Dropping star": five staggered star fields that drift down, fade, and reset.
 * `box` is the design-time position minus the field's t=0 offset, so `y` plays verbatim.
 */
const STAR_FIELDS = [
  {
    box: "left-[59.75px] top-[27.02px] h-[385.197px] w-[356.164px]",
    y: [5.5, 54.945, 54.945, 0, 5.5],
    yTimes: [0, 0.899, 0.8999, 0.9, 1],
    opacityTimes: [0, 0.71, 0.86, 0.9, 0.99, 1],
  },
  {
    box: "left-[72.46px] top-[41.21px] h-[314.489px] w-[295.408px]",
    y: [16.5, 59.94, 59.94, 0, 16.5],
    yTimes: [0, 0.724, 0.7249, 0.725, 1],
    opacityTimes: [0, 0.535, 0.685, 0.725, 0.815, 1],
  },
  {
    box: "left-[23.59px] top-[31.83px] h-[338.079px] w-[351.544px]",
    y: [29.25, 64.935, 64.935, 0, 29.25],
    yTimes: [0, 0.549, 0.5499, 0.55, 1],
    opacityTimes: [0, 0.36, 0.51, 0.55, 0.64, 1],
  },
  {
    box: "left-[18.01px] top-[20.1px] h-[344.965px] w-[320.604px]",
    y: [43.75, 69.93, 69.93, 0, 43.75],
    yTimes: [0, 0.374, 0.3749, 0.375, 1],
    opacityTimes: [0, 0.185, 0.335, 0.375, 0.465, 1],
  },
  {
    box: "left-[97.09px] top-[21.75px] h-[333.045px] w-[287.501px]",
    y: [60, 74.925, 74.925, 0, 60],
    yTimes: [0, 0.199, 0.1999, 0.2, 1],
    opacityTimes: [0, 0.01, 0.16, 0.2, 0.29, 1],
  },
];

const STAR_OPACITY = [1, 1, 0, 0, 1, 1];

export function DroppingStars() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute top-0 left-1/2 h-[952.747px] w-[440px] -translate-x-1/2 overflow-clip">
      {STAR_FIELDS.map((field, i) => (
        <motion.img
          key={field.box}
          alt=""
          src={asset(`/rewind/stars/star-field-${i + 1}.svg`)}
          className={cn("absolute block", field.box)}
          initial={{ y: field.y[0], opacity: 1 }}
          animate={reduceMotion ? undefined : { y: field.y, opacity: STAR_OPACITY }}
          transition={{ y: loop(field.yTimes), opacity: loop(field.opacityTimes) }}
        />
      ))}
    </div>
  );
}

/**
 * Figma "Light": a blurred white bar, tilted -30°, blended as overlay. It enters fully above the
 * dome and leaves fully below it, so the loop restarts out of sight. It travels straight down
 * because the 635px bar spans the dome's full width at that x.
 */
const DOME_HEIGHT = 1000;
const LIGHT_BOX_HEIGHT = 422.138;
const LIGHT_BLUR_PAD = 48; // 2× the 24px blur, so the soft edge is hidden too
const LIGHT_SWEEP = { y: [-(LIGHT_BOX_HEIGHT + LIGHT_BLUR_PAD), DOME_HEIGHT + LIGHT_BLUR_PAD] };
const LIGHT_TRANSITION = { duration: 2.6, ease: "easeInOut", repeat: Infinity } as const;

export function LightSweep() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-[-167.83px] flex h-[422.138px] w-[635.165px] items-center justify-center mix-blend-overlay"
      initial={{ y: LIGHT_SWEEP.y[0] }}
      animate={reduceMotion ? undefined : LIGHT_SWEEP}
      transition={LIGHT_TRANSITION}
    >
      <div className="flex-none -rotate-30">
        <div className="relative h-24 w-[678px] bg-on-accent blur-[24px]" />
      </div>
    </motion.div>
  );
}
