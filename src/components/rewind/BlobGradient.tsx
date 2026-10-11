"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { centerTemplate, LOOP_DURATION } from "@/lib/motion";

type Layer = {
  /** Rotated bounding box the layer spins inside. */
  box: string;
  /** The blurred pill itself: size, color and blur (Figma layer-blur radius ÷ 2). */
  pill: string;
  /** Static base angle of the pill. */
  rotate: string;
};

/**
 * Figma "Gradient": seven blurred pills stacked from the outside in. While playing, each spins
 * -180° and breathes 1 → 1.2 → 1 on the shared 2s loop.
 *  • dome — inside the key gradient: deep red outside, peach centre.
 *  • chat — parked at the bottom of the chat: 1.25× larger, softer, colors reversed.
 */
const VARIANTS: Record<"dome" | "chat", Layer[]> = {
  dome: [
    { box: "h-[420px] w-[364px]", pill: "h-[364px] w-[420px] bg-ember-7 blur-[30px]", rotate: "rotate-90" },
    { box: "h-[441.111px] w-[401.513px]", pill: "h-[316px] w-[372px] bg-ember-6 blur-[18px]", rotate: "rotate-75" },
    { box: "h-[414.592px] w-[394.095px]", pill: "h-[268px] w-[324px] bg-ember-5 blur-[18px]", rotate: "rotate-60" },
    { box: "size-[350.725px]", pill: "h-[220px] w-[276px] bg-ember-4 blur-[18px]", rotate: "rotate-45" },
    { box: "h-[262.956px] w-[283.454px]", pill: "h-[172px] w-[228px] bg-ember-3 blur-[14px]", rotate: "rotate-30" },
    { box: "h-[166.362px] w-[205.96px]", pill: "h-[124px] w-[180px] bg-ember-2 blur-[14px]", rotate: "rotate-15" },
    { box: "h-[76px] w-[132px]", pill: "h-[76px] w-[132px] bg-ember-1 blur-[12px]", rotate: "" },
  ],
  chat: [
    { box: "h-[525px] w-[455px]", pill: "h-[455px] w-[525px] bg-ember-1 blur-[37.5px]", rotate: "rotate-90" },
    { box: "h-[551.389px] w-[501.892px]", pill: "h-[395px] w-[465px] bg-ember-2 blur-[22.5px]", rotate: "rotate-75" },
    { box: "h-[518.24px] w-[492.619px]", pill: "h-[335px] w-[405px] bg-ember-3 blur-[22.5px]", rotate: "rotate-60" },
    { box: "size-[438.406px]", pill: "h-[275px] w-[345px] bg-ember-4 blur-[22.5px]", rotate: "rotate-45" },
    { box: "h-[328.695px] w-[354.317px]", pill: "h-[215px] w-[285px] bg-ember-5 blur-[17.5px]", rotate: "rotate-30" },
    { box: "h-[207.953px] w-[257.45px]", pill: "h-[155px] w-[225px] bg-ember-6 blur-[17.5px]", rotate: "rotate-15" },
    { box: "h-[95px] w-[165px]", pill: "h-[95px] w-[165px] bg-ember-7 blur-[15px]", rotate: "" },
  ],
};

/** Easing in/out of the loop when playback starts or stops. */
export const BLEND_IN = 0.4;
export const BLEND_OUT = 0.6;

/** Where the chat screens park the orb: 640px, centred on the screen's bottom edge (Figma: x -124, y 532). */
export const ORB_DOCK = "pointer-events-none absolute -bottom-[320px] left-[-124px] size-[640px]";
/** Offset that hides the docked orb fully below the screen: half its tallest layer + its blur. */
export const ORB_HIDDEN_Y = 525 / 2 + 2 * 37.5 + 8;

interface BlobGradientProps {
  variant: "dome" | "chat";
  /**
   * Whether the loop runs. Stopping eases every layer into Figma's resting pose (spin offset 0,
   * scale 1) rather than freezing mid-turn; starting picks the loop up again from rest.
   */
  playing?: boolean;
  className?: string;
}

export function BlobGradient({ variant, playing = true, className }: BlobGradientProps) {
  const reduceMotion = useReducedMotion();
  const active = playing && !reduceMotion;

  // A clock that only runs while the loop is (partly) blended in, so the loop can pause and resume.
  const clock = useMotionValue(0);
  const blend = useMotionValue(0);
  /** Angle the spin settles to when stopping: the next half turn ahead (pills look identical there). */
  const restAngle = useRef(0);
  /** Continuous spin (no wrap), so blending toward rest never jumps. */
  const spinAt = (t: number) => (-180 * t) / LOOP_DURATION;

  useEffect(() => {
    if (!active) restAngle.current = Math.floor(spinAt(clock.get()) / 180) * 180;
    const controls = animate(blend, active ? 1 : 0, {
      duration: active ? BLEND_IN : BLEND_OUT,
      ease: "easeInOut",
      onComplete: () => {
        if (active) return;
        // Fully at rest: rewind the loop to its start (same pose, pills are half-turn symmetric)
        clock.set(0);
        restAngle.current = 0;
      },
    });
    return () => controls.stop();
  }, [active, blend, clock]);

  useAnimationFrame((_, delta) => {
    if (blend.get() > 0) clock.set(clock.get() + delta / 1000);
  });

  // Snippet tracks: linear -180° per loop, scale 1 → 1.2 → 1 — blended toward rest by `blend`
  const rotate = useTransform(() => {
    const spin = spinAt(clock.get());
    return restAngle.current + (spin - restAngle.current) * blend.get();
  });
  const scale = useTransform(() => {
    const phase = (clock.get() % LOOP_DURATION) / LOOP_DURATION;
    const breath = phase < 0.5 ? 1 + 0.4 * phase : 1.4 - 0.4 * phase;
    return 1 + (breath - 1) * blend.get();
  });

  return (
    <div className={cn("relative", className)}>
      {VARIANTS[variant].map((layer) => (
        <motion.div
          key={layer.pill}
          className={cn("absolute top-1/2 left-1/2 flex items-center justify-center", layer.box)}
          transformTemplate={centerTemplate}
          style={{ rotate, scale }}
        >
          <div className={cn("flex-none", layer.rotate)}>
            <div className={cn("relative rounded-[999px]", layer.pill)} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
