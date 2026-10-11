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
/** Things entering: fast, then settling. */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
/** Things leaving: slow, then accelerating away. */
export const easeInCubic = [0.32, 0, 0.67, 0] as const;
