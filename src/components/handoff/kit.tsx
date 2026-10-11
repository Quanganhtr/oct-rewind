"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** The deck is drawn on a fixed 1280×720 canvas and scaled to fit the window. */
export const CANVAS_W = 1280;
export const CANVAS_H = 720;

/** "0.45s", "1.2s" — trims float noise. */
export const sec = (n: number) => `${Number(n.toFixed(2))}s`;
export const bezier = (curve: readonly number[]) => `cubic-bezier(${curve.join(", ")})`;

/* ───────────── Slide layout ───────────── */

interface SlideProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  /** Right column: a live demo or diagram. */
  aside?: ReactNode;
  asideClassName?: string;
}

export function Slide({ eyebrow, title, lead, children, aside, asideClassName }: SlideProps) {
  return (
    <div className="flex size-full gap-12 px-16 pt-6 pb-4">
      <div className="flex min-w-px flex-1 flex-col gap-5">
        <header className="flex flex-col gap-2">
          {eyebrow && <p className="font-mono text-xs tracking-[0.2em] text-glow-1 uppercase">{eyebrow}</p>}
          <h2 className="text-[34px] leading-[42px] font-semibold text-on-accent">{title}</h2>
          {lead && <p className="max-w-[640px] text-base leading-6 text-on-accent/70">{lead}</p>}
        </header>
        <div className="flex min-h-px flex-1 flex-col gap-4">{children}</div>
      </div>
      {aside && <div className={cn("flex shrink-0 flex-col items-center justify-center", asideClassName)}>{aside}</div>}
    </div>
  );
}

/** Big part opener: number, name, what it covers. */
export function PartCover({ n, name, range, points }: { n: string; name: string; range: string; points: string[] }) {
  return (
    <div className="flex size-full flex-col justify-center gap-8 px-24">
      <p className="font-mono text-sm tracking-[0.3em] text-glow-1 uppercase">Part {n}</p>
      <div className="flex flex-col gap-3">
        <h2 className="text-[80px] leading-[88px] font-bold text-cream">{name}</h2>
        <p className="font-mono text-lg text-on-accent/60">{range}</p>
      </div>
      <ul className="flex max-w-[760px] flex-col gap-2 border-l border-on-accent/15 pl-6">
        {points.map((p) => (
          <li key={p} className="text-lg leading-7 text-on-accent/80">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── Text blocks ───────────── */

/** Label → value rows. */
export function Specs({ rows, labelWidth = "w-[150px]" }: { rows: [string, ReactNode][]; labelWidth?: string }) {
  return (
    <dl className="flex flex-col divide-y divide-on-accent/10 border-y border-on-accent/10">
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-4 py-2">
          <dt
            className={cn(
              "shrink-0 pt-0.5 font-mono text-[11px] leading-4 tracking-wider text-on-accent/50 uppercase",
              labelWidth,
            )}
          >
            {label}
          </dt>
          <dd className="min-w-px flex-1 text-sm leading-5 text-on-accent">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered rules — the "do exactly this" list. */
export function Rules({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-5 text-on-accent/90">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-glow-1 font-mono text-[11px] font-semibold text-brand-primary">
            {i + 1}
          </span>
          <span className="min-w-px flex-1">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Inline value: a number, token or string from the UI. */
export function V({ children }: { children: ReactNode }) {
  return <code className="rounded bg-on-accent/10 px-1 py-px font-mono text-[0.9em] text-cream">{children}</code>;
}

export function Callout({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm leading-5",
        tone === "info" ? "border-glow-1/30 bg-glow-1/10 text-cream" : "border-ember-6/50 bg-ember-6/15 text-cream",
      )}
    >
      {children}
    </div>
  );
}

/* ───────────── Timeline ───────────── */

export type Beat = {
  label: string;
  at: number;
  dur: number;
  kind: "enter" | "exit" | "type" | "move" | "count";
  /** Shown instead of the computed range, e.g. "linked to dome". */
  note?: string;
};

const BEAT_FILL: Record<Beat["kind"], string> = {
  enter: "bg-cream",
  exit: "bg-ember-6",
  type: "bg-glow-1",
  move: "bg-on-accent/45",
  count: "bg-ember-3",
};

const BEAT_LEGEND: [Beat["kind"], string][] = [
  ["enter", "enters"],
  ["exit", "leaves"],
  ["move", "moves"],
  ["type", "types"],
  ["count", "counts"],
];

/** Gantt-style beat chart: every bar starts at `at` seconds and lasts `dur`. */
export function Timeline({ beats, total, step = 0.5 }: { beats: Beat[]; total: number; step?: number }) {
  const reduceMotion = useReducedMotion();
  const ticks = Array.from({ length: Math.round(total / step) + 1 }, (_, i) => i * step);
  const pct = (n: number) => `${(n / total) * 100}%`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end gap-3">
        <div className="w-[190px] shrink-0" />
        <div className="flex min-w-px flex-1 justify-between font-mono text-[10px] text-on-accent/40">
          {ticks.map((t) => (
            <span key={t} className="w-0 overflow-visible whitespace-nowrap">
              {Number.isInteger(t) || step < 1 ? sec(t) : ""}
            </span>
          ))}
        </div>
        <div className="w-[120px] shrink-0" />
      </div>
      {beats.map((beat, i) => (
        <div key={beat.label} className="flex items-center gap-3">
          <p className="w-[190px] shrink-0 truncate text-[13px] leading-5 text-on-accent/85">{beat.label}</p>
          <div className="relative h-5 min-w-px flex-1 rounded-sm bg-on-accent/5">
            <motion.div
              className={cn("absolute inset-y-0.5 rounded-sm", BEAT_FILL[beat.kind])}
              initial={{ left: pct(beat.at), width: 0 }}
              animate={{ left: pct(beat.at), width: pct(Math.max(beat.dur, total / 200)) }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.15 + i * 0.05,
                ease: "easeOut",
              }}
            />
          </div>
          <p className="w-[120px] shrink-0 font-mono text-[11px] whitespace-nowrap text-on-accent/60">
            {beat.note ?? `${sec(beat.at)} → ${sec(beat.at + beat.dur)}`}
          </p>
        </div>
      ))}
      <div className="flex gap-4 pt-1 pl-[202px]">
        {BEAT_LEGEND.filter(([kind]) => beats.some((b) => b.kind === kind)).map(([kind, label]) => (
          <span key={kind} className="flex items-center gap-1.5 text-[11px] text-on-accent/55">
            <span className={cn("size-2 rounded-sm", BEAT_FILL[kind])} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Easing ───────────── */

/** The curve, plus a dot running it on loop so the feel is visible. */
export function EaseCurve({
  name,
  curve,
  use,
}: {
  name: string;
  curve: readonly [number, number, number, number];
  use: string;
}) {
  const reduceMotion = useReducedMotion();
  const [x1, y1, x2, y2] = curve;
  const S = 56;
  const d = `M0 ${S} C ${x1 * S} ${(1 - y1) * S} ${x2 * S} ${(1 - y2) * S} ${S} 0`;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-on-accent/5 p-3">
      <svg viewBox={`-4 -4 ${S + 8} ${S + 8}`} className="size-14 shrink-0 overflow-visible text-glow-1" aria-hidden>
        <path d={`M0 ${S} L${S} 0`} className="stroke-on-accent/15" strokeWidth="1" fill="none" />
        <path d={d} stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <div className="flex min-w-px flex-1 flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-on-accent">{name}</p>
          <p className="font-mono text-[10px] text-on-accent/50">{bezier(curve)}</p>
        </div>
        <p className="text-xs leading-4 text-on-accent/65">{use}</p>
        <div className="relative mt-1 h-1 rounded-full bg-on-accent/10">
          <motion.div
            className="absolute top-1/2 size-2.5 -translate-1/2 rounded-full bg-cream"
            initial={{ left: "0%" }}
            animate={reduceMotion ? undefined : { left: ["0%", "100%"] }}
            transition={{ duration: 1.2, ease: [...curve], repeat: Infinity, repeatDelay: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Colour ───────────── */

export function Swatch({ fill, name, value }: { fill: string; name: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn("size-8 shrink-0 rounded-lg ring-1 ring-on-accent/15", fill)} />
      <span className="flex min-w-px flex-col">
        <span className="truncate text-xs font-medium text-on-accent">{name}</span>
        <span className="font-mono text-[10px] text-on-accent/55">{value}</span>
      </span>
    </div>
  );
}

/* ───────────── Live demos ───────────── */

/** Remounts its content on "Replay" so an entrance plays again. */
export function Replayable({ children, className }: { children: ReactNode; className?: string }) {
  const [run, setRun] = useState(0);
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div key={run} className="contents">
        {children}
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} />
    </div>
  );
}

export function ReplayButton({ onClick, label = "Replay" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full bg-on-accent/10 px-3 py-1.5 text-xs font-medium text-on-accent transition-colors hover:bg-on-accent/20"
    >
      <span aria-hidden>↻</span>
      {label}
    </button>
  );
}

const PHONE_SCALE = 0.66;

/**
 * A live 393×852 screen, scaled down to sit in a slide. `framed` draws the device outline (the
 * full flow brings its own). The scale is a Motion value, not a CSS class, so layout animations
 * inside (the 2026 glide, the dome) can correct for it, as they do for the deck's own scaling.
 */
export function Phone({
  children,
  framed = true,
  caption,
}: {
  children: ReactNode;
  framed?: boolean;
  caption?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[562.32px] w-[259.38px] shrink-0">
        <motion.div
          className={cn(
            "absolute top-0 left-0 h-device-h w-device-w",
            framed && "overflow-hidden rounded-screen bg-brand-primary ring-1 ring-screen-border",
          )}
          initial={false}
          animate={{ scale: PHONE_SCALE, originX: 0, originY: 0 }}
        >
          {children}
        </motion.div>
      </div>
      {caption && <div className="flex items-center gap-2 text-xs text-on-accent/55">{caption}</div>}
    </div>
  );
}
