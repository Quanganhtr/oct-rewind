"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { centerTemplate, loop } from "@/lib/motion";

/**
 * Figma "Gradient" (Non+Inspire / Main): seven blurred pills stacked from the
 * outside in. Each one spins -180° and breathes 1 → 1.2 → 1 on the shared 2s loop.
 */
const LAYERS = [
  { box: "h-[420px] w-[364px]", pill: "h-[364px] w-[420px] bg-blob-7 blur-[28px]", rotate: "rotate-90" },
  { box: "h-[441.111px] w-[401.513px]", pill: "h-[316px] w-[372px] bg-blob-6 blur-[16px]", rotate: "rotate-75" },
  { box: "h-[414.592px] w-[394.095px]", pill: "h-[268px] w-[324px] bg-blob-5 blur-[16px]", rotate: "rotate-60" },
  { box: "size-[350.725px]", pill: "h-[220px] w-[276px] bg-blob-4 blur-[16px]", rotate: "rotate-45" },
  { box: "h-[262.956px] w-[283.454px]", pill: "h-[172px] w-[228px] bg-blob-3 blur-[10px]", rotate: "rotate-30" },
  { box: "h-[166.362px] w-[205.96px]", pill: "h-[124px] w-[180px] bg-blob-2 blur-[10px]", rotate: "rotate-15" },
  { box: "h-[76px] w-[132px]", pill: "h-[76px] w-[132px] bg-blob-1 blur-[8px]", rotate: "" },
];

// Snippet tracks are linear 9°/step and a 1 → 1.2 → 1 triangle — expressed with their endpoints.
// Rotation is the offset from each pill's static base angle, which stays on the inner div.
const SPIN = { rotate: [0, -180], scale: [1, 1.2, 1] };
const SPIN_TRANSITION = { rotate: loop(), scale: loop([0, 0.5, 1]) };

export function BlobGradient({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      {LAYERS.map((layer) => (
        <motion.div
          key={layer.pill}
          className={cn("absolute top-1/2 left-1/2 flex items-center justify-center", layer.box)}
          transformTemplate={centerTemplate}
          initial={{ rotate: 0, scale: 1 }}
          animate={reduceMotion ? undefined : SPIN}
          transition={SPIN_TRANSITION}
        >
          <div className={cn("flex-none", layer.rotate)}>
            <div className={cn("relative rounded-[999px]", layer.pill)} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
