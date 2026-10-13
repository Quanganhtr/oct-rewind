"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DROP_COUNT = 10;
/** Far enough below the top to clear the tallest phone screen. */
const FALL_DISTANCE = 1000;

interface Drop {
  /** Start position across the screen, % of its width. */
  left: number;
  size: number;
  delay: number;
  duration: number;
  /** Sideways swings (px) the drop passes through on the way down — the curve. */
  sway: number[];
  tilt: number[];
}

const between = (min: number, max: number) => min + Math.random() * (max - min);
const side = () => (Math.random() < 0.5 ? -1 : 1);

/** Each drop gets its own size, start, speed and an S-curve that swings one way, then back. */
function makeDrops(): Drop[] {
  return Array.from({ length: DROP_COUNT }, (_, i) => {
    const dir = side();
    const swing = between(24, 64);
    return {
      // Spread across the width in even lanes, jittered so it doesn't look gridded
      left: ((i + between(0.15, 0.85)) / DROP_COUNT) * 100,
      size: between(28, 60),
      delay: between(0, 0.7),
      duration: between(2.2, 3.4),
      sway: [0, dir * swing, -dir * swing * between(0.4, 0.9), dir * swing * between(0.2, 0.6)],
      tilt: [dir * between(-10, 10), dir * between(10, 24), -dir * between(8, 20), dir * between(0, 12)],
    };
  });
}

/** A handful of emoji falling from the top of the screen along random curved paths. Plays once. */
export function EmojiRain({ emoji }: { emoji: string }) {
  const [drops] = useState(makeDrops);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
      {drops.map((drop, i) => (
        <motion.span
          key={i}
          className="absolute bottom-full block leading-none select-none"
          // Centred with a margin: Motion owns `transform` for the fall, so a translate class would be dropped
          style={{ left: `${drop.left}%`, fontSize: drop.size, marginLeft: -drop.size / 2 }}
          initial={{ y: 0, x: 0, rotate: drop.tilt[0] }}
          animate={{ y: FALL_DISTANCE, x: drop.sway, rotate: drop.tilt }}
          transition={{
            // Gravity: slow off the top, then accelerating
            y: { delay: drop.delay, duration: drop.duration, ease: [0.45, 0, 0.85, 0.6] },
            x: { delay: drop.delay, duration: drop.duration, ease: "easeInOut" },
            rotate: { delay: drop.delay, duration: drop.duration, ease: "easeInOut" },
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
