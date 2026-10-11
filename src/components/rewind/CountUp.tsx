"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * The one rule for every number on the cards: start 0.2s after the card appears, count up from 0
 * over 1.4s, fast at first and easing into the final value.
 */
export const COUNT_DELAY = 0.2;
export const COUNT_DURATION = 1.4;
export const COUNT_EASE = [0.16, 1, 0.3, 1] as const;

/** First number in the text: "45,678,000", "3.8", "64", "12.4"… */
const NUMBER = /\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/;

interface CountUpProps {
  /** Text containing a number, e.g. "VND 45,678,000" or "64 nơi khác nhau" — only the number counts. */
  value: string;
}

/** Counts the number inside a piece of card text up from 0 when it mounts; the words stay put. */
export function CountUp({ value }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const match = value.match(NUMBER);
  const raw = match?.[0] ?? "";
  const target = Number(raw.replace(/,/g, ""));
  const decimals = raw.split(".")[1]?.length ?? 0;
  const format = new Intl.NumberFormat("en-US", {
    useGrouping: raw.includes(","),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const before = match ? value.slice(0, match.index) : value;
  const after = match ? value.slice((match.index ?? 0) + raw.length) : "";

  const hasNumber = match !== null;
  const count = useMotionValue(reduceMotion || !hasNumber ? target : 0);
  const shown = useTransform(count, (n) => format.format(n));

  useEffect(() => {
    if (reduceMotion || !hasNumber) return;
    const controls = animate(count, target, { delay: COUNT_DELAY, duration: COUNT_DURATION, ease: COUNT_EASE });
    return () => controls.stop();
  }, [count, target, reduceMotion, hasNumber]);

  if (!hasNumber) return <>{value}</>;
  // Fixed-width digits keep centred numbers from wobbling while they count
  return (
    <>
      {before}
      <motion.span className="tabular-nums">{shown}</motion.span>
      {after}
    </>
  );
}
