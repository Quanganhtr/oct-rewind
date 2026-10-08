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

/** Figma "Light": a blurred white bar sweeping diagonally across the key, blended as overlay. */
const LIGHT_X = [
  -169.771, -167.453, -160.304, -148.069, -130.573, -107.771, -79.818, -47.133, -10.461, 29.12,
  70.238, 111.357, 150.937, 187.609, 220.294, 248.247, 271.049, 288.545, 300.78, 307.929, 310.247,
];
const LIGHT_Y = [
  -117.326, -112.304, -96.815, -70.308, -32.4, 17.003, 77.566, 148.38, 227.834, 313.589, 402.676,
  491.763, 577.518, 656.972, 727.786, 788.349, 837.752, 875.659, 902.167, 917.655, 922.678,
];
const LIGHT_TIMES = LIGHT_X.map((_, i) => i / (LIGHT_X.length - 1));
// The wrapper sits at the t=0 design position, so tracks play as deltas from their first key.
const LIGHT_SWEEP = {
  x: LIGHT_X.map((v) => v - LIGHT_X[0]),
  y: LIGHT_Y.map((v) => v - LIGHT_Y[0]),
};

export function LightSweep() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute top-[-113.76px] left-[-167.83px] flex h-[422.138px] w-[635.165px] items-center justify-center mix-blend-overlay"
      animate={reduceMotion ? undefined : LIGHT_SWEEP}
      transition={{ x: loop(LIGHT_TIMES), y: loop(LIGHT_TIMES) }}
    >
      <div className="flex-none -rotate-30">
        <div className="relative h-24 w-[678px] bg-on-accent blur-[24px]" />
      </div>
    </motion.div>
  );
}
