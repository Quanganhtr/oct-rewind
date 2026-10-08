import type { Transition } from "framer-motion";

/** Every looping layer in the Figma timeline shares one 2s cohort. */
export const LOOP_DURATION = 2;

export const loop = (times?: number[]): Transition => ({
  duration: LOOP_DURATION,
  ease: "linear",
  repeat: Infinity,
  ...(times && { times }),
});

/** Keeps a static centering offset under Motion's generated transform. */
export const centerTemplate = (_: unknown, generated: string) =>
  `translateX(-50%) translateY(-50%) ${generated}`;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;
export const easeInOutSine = [0.37, 0, 0.63, 1] as const;
