"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CANVAS_H, CANVAS_W } from "./kit";
import { PARTS, SLIDES } from "./slides";

/* The slide number lives in the URL hash (#5), so a link can open any slide and Back walks slides. */
const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readSlide = () => {
  const n = Number.parseInt(window.location.hash.slice(1), 10);
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), SLIDES.length - 1) : 0;
};

/* Fit the fixed 1280×720 canvas inside the window. */
const subscribeResize = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};
const readScale = () => Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);

const goTo = (index: number) => {
  const clamped = Math.min(Math.max(index, 0), SLIDES.length - 1);
  window.location.hash = String(clamped + 1);
};

export function HandoffDeck() {
  const reduceMotion = useReducedMotion();
  const index = useSyncExternalStore(subscribeHash, readSlide, () => 0);
  const scale = useSyncExternalStore(subscribeResize, readScale, () => 1);
  const slide = SLIDES[index];

  const step = useCallback((delta: number) => goTo(readSlide() + delta), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(SLIDES.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden bg-stage">
      <motion.div
        className="relative flex h-[720px] w-[1280px] shrink-0 flex-col bg-stage font-sans text-on-accent"
        animate={{ scale }}
        transition={{ duration: 0 }}
      >
        {/* Top bar: title, part tabs, counter */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-on-accent/10 px-8">
          <p className="text-sm font-semibold text-on-accent">
            Rewind 2026 <span className="font-normal text-on-accent/50">· Dev handoff</span>
          </p>
          <nav className="flex gap-1">
            {PARTS.map((part) => {
              const opener = SLIDES.findIndex((s) => s.part === part.n);
              const active = slide.part === part.n;
              return (
                <button
                  key={part.n}
                  type="button"
                  onClick={() => goTo(opener)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-cream text-brand-primary"
                      : "text-on-accent/60 hover:bg-on-accent/10 hover:text-on-accent",
                  )}
                >
                  0{part.n} {part.name}
                </button>
              );
            })}
          </nav>
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-on-accent/70 transition-colors hover:bg-on-accent/10 hover:text-on-accent"
          >
            Open prototype ↗
          </Link>
        </header>

        {/* Slide */}
        <div className="relative min-h-px flex-1">
          <AnimatePresence mode="wait">
            <motion.section
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              aria-label={slide.title}
            >
              {slide.render()}
            </motion.section>
          </AnimatePresence>
        </div>

        {/* Bottom bar: progress + prev/next */}
        <footer className="flex h-12 shrink-0 items-center gap-6 border-t border-on-accent/10 px-8">
          <div className="flex min-w-px flex-1 gap-1">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}: ${s.title}`}
                className="group flex h-4 min-w-px flex-1 items-center"
              >
                <span
                  className={cn(
                    "h-1 w-full rounded-full transition-colors",
                    i === index
                      ? "bg-cream"
                      : i < index
                        ? "bg-on-accent/40"
                        : "bg-on-accent/10 group-hover:bg-on-accent/25",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-on-accent/50">
            {String(index + 1).padStart(2, "0")} / {SLIDES.length}
          </p>
          <div className="flex gap-1">
            <DeckButton onClick={() => step(-1)} disabled={index === 0} label="Previous slide">
              ←
            </DeckButton>
            <DeckButton onClick={() => step(1)} disabled={index === SLIDES.length - 1} label="Next slide">
              →
            </DeckButton>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}

function DeckButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: string;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-full bg-on-accent/10 text-sm text-on-accent transition-colors hover:bg-on-accent/20 disabled:opacity-30 disabled:hover:bg-on-accent/10"
    >
      {children}
    </button>
  );
}
