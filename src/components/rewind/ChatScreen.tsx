"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { LINE_OPACITY } from "@/data/rewind";
import { BlobGradient } from "./BlobGradient";
import { HomeIndicator } from "./HomeIndicator";
import { TopNavigation } from "./TopNavigation";

interface ChatScreenProps {
  /** Lines visible at this step; the last one is the newest. */
  lines: string[];
  onAdvance: () => void;
  onClose: () => void;
}

/** Figma "Step 1–3": Tech Tech's lines stack up, older ones dimming, over the rising orb. */
export function ChatScreen({ lines, onAdvance, onClose }: ChatScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 flex flex-col items-end overflow-clip bg-page-light"
      onClick={onAdvance}
    >
      {/* Same 512px orb as the key, parked below the fold (Figma: x -68.5, y 556) */}
      <BlobGradient className="absolute -bottom-[216px] -left-[68.5px] size-[512px]" />

      <TopNavigation tone="light" onClose={onClose} />

      <div className="relative flex min-h-px w-full flex-1 flex-col items-start gap-4 p-4">
        {lines.map((line, i) => {
          const age = lines.length - 1 - i;
          return (
            <motion.p
              key={i}
              className="w-full text-2xl leading-8 font-medium whitespace-pre-line text-brand-primary"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: LINE_OPACITY[Math.min(age, LINE_OPACITY.length - 1)], y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeOutExpo }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      <HomeIndicator />
    </div>
  );
}
