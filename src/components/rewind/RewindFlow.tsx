"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, AnimatePresence, motion } from "framer-motion";
import { TIERS, type TierId } from "@/data/tiers";
import { DeviceFrame } from "@/components/DeviceFrame";
import { cn } from "@/lib/cn";
import { easeInOutSine } from "@/lib/motion";
import { preloadImages } from "@/lib/preloadImages";
import { ChatScreen, type ChatPhase, lineStepMs } from "./ChatScreen";
import { IntroScreen, SETTLE_DURATION } from "./IntroScreen";
import { TierContext } from "./TierContext";

export type Screen =
  | { name: "loading" }
  | { name: "start" }
  /** `startAt: "menu"` opens Step 4 directly (lines settled, menu up) — used by Back. */
  | { name: "chat"; step: number; startAt?: ChatPhase };

/** One intro line on: the next chat step, holding on the last. */
const nextChatStep =
  (lastStep: number) =>
  (s: Screen): Screen =>
    s.name === "chat" && s.step < lastStep ? { name: "chat", step: s.step + 1 } : s;

export const SCREEN_FADE = 0.5;

const screenFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: SCREEN_FADE },
};

// Intro ends fully white, so it stays opaque underneath while the chat fades in on top.
// Fading both at once let the black frame show through as a grey flash.
// (An exit to opacity 1 completes instantly, so hold via delay, then drop it.)
const introHold = {
  ...screenFade,
  exit: { opacity: 0, transition: { delay: SCREEN_FADE, duration: 0 } },
};

interface RewindFlowProps {
  /** Where the flow opens (the handoff deck embeds it mid-flow). */
  initial?: Screen;
  /** The demo buttons on the black stage — off when embedded. */
  controls?: boolean;
  /** Images to preload; Loading doesn't hand off to Start until they're all in. */
  images?: string[];
  /** Palette, assets and copy to play the flow in. */
  tier?: TierId;
}

const STAGE_BUTTON =
  "hidden items-center gap-2 rounded-full bg-on-accent/10 px-4 py-2.5 text-sm leading-5 font-medium text-on-accent transition-colors hover:bg-on-accent/20 focus-visible:outline-2 focus-visible:outline-on-accent sm:flex";

export function RewindFlow({ initial = { name: "loading" }, controls = true, images, tier = "standard" }: RewindFlowProps) {
  const theme = TIERS[tier];
  const introLines = theme.introLines;
  const lastStep = introLines.length - 1;
  // Carries the tier's palette class; read for the colors Safari paints around the page
  const themeRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<Screen>(initial);
  // Loaded once per visit: a restart replays Loading on the cached images, timed only
  const [loadProgress, setLoadProgress] = useState(images ? 0 : 1);
  useEffect(() => {
    if (images) return preloadImages(images, setLoadProgress);
  }, [images]);
  const [chatPhase, setChatPhase] = useState<ChatPhase>(
    initial.name === "chat" ? (initial.startAt ?? "intro") : "intro",
  );
  // Bumping `run` remounts the current screen so it replays from its start
  const [run, setRun] = useState(0);

  const advanceChat = () => setScreen(nextChatStep(lastStep));
  const jumpTo = (next: Screen) => {
    setScreen(next);
    setChatPhase(next.name === "chat" ? (next.startAt ?? "intro") : "intro");
    setRun((r) => r + 1);
  };
  const restart = () => jumpTo(initial);

  /** Back one Figma frame: Step 5 → 4 → 3 → 2 → 1 → Start → Loading. */
  const goBack = () => {
    if (screen.name === "start") return jumpTo({ name: "loading" });
    if (screen.name !== "chat") return;
    if (chatPhase === "spending") return jumpTo({ name: "chat", step: lastStep, startAt: "menu" });
    if (chatPhase === "menu") return jumpTo({ name: "chat", step: lastStep });
    if (screen.step > 0) return jumpTo({ name: "chat", step: screen.step - 1 });
    jumpTo({ name: "start" });
  };
  const canGoBack = screen.name !== "loading";

  // Chat lines auto-advance (tap skips ahead). Loading hands off when its bar fills.
  useEffect(() => {
    if (screen.name === "chat" && screen.step < lastStep) {
      const t = setTimeout(() => setScreen(nextChatStep(lastStep)), lineStepMs(introLines[screen.step]));
      return () => clearTimeout(t);
    }
  }, [screen, lastStep, introLines]);

  // Phones: Safari paints its status-bar and toolbar areas with the page background. Keep it matching
  // the screen (Loading's top color, cream after) instead of the desktop stage's black, fading with the
  // Loading → Start settle. Desktop keeps its black stage.
  const isDark = screen.name === "loading";
  useEffect(() => {
    if (!controls || !themeRef.current || !window.matchMedia("(width < 40rem)").matches) return;
    const tokens = getComputedStyle(themeRef.current);
    const color = tokens.getPropertyValue(isDark ? "--color-loading-from" : "--color-cream").trim();
    const fade = animate(
      [document.documentElement, document.body],
      { backgroundColor: color },
      { duration: isDark ? 0 : SETTLE_DURATION, ease: easeInOutSine },
    );
    return () => fade.stop();
  }, [isDark, controls]);

  const isIntro = screen.name !== "chat";

  return (
    <TierContext value={theme}>
      {/* `contents`: only here to scope the tier's palette, it adds no box of its own */}
      <div ref={themeRef} className={cn("contents", theme.themeClass)}>
        <DeviceFrame>
          {/* No `initial={false}` here: it propagates down and freezes the looping layers at their end state */}
          <AnimatePresence>
            {isIntro ? (
              <motion.div key={`intro-${run}`} className="absolute inset-0" {...introHold}>
                <IntroScreen
                  phase={screen.name === "loading" ? "loading" : "start"}
                  loadProgress={loadProgress}
                  onLoaded={() => setScreen((s) => (s.name === "loading" ? { name: "start" } : s))}
                  onStart={() => setScreen({ name: "chat", step: 0 })}
                  onClose={restart}
                />
              </motion.div>
            ) : (
              <motion.div key={`chat-${run}`} className="absolute inset-0 z-10" {...screenFade}>
                <ChatScreen
                  lines={introLines.slice(0, screen.step + 1)}
                  isFinalStep={screen.step === lastStep}
                  startAt={screen.startAt}
                  onPhaseChange={setChatPhase}
                  onAdvance={advanceChat}
                  onClose={restart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DeviceFrame>

        {/* Demo controls on the black stage — hidden on phones, where the frame fills the screen */}
        {controls && (
          <>
            {theme.handoff && (
              <Link href="/handoff" target="_blank" className={cn(STAGE_BUTTON, "fixed right-6 top-6")}>
                Dev handoff
                <span aria-hidden>↗</span>
              </Link>
            )}
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className={cn(STAGE_BUTTON, "fixed right-6 bottom-6 disabled:opacity-40 disabled:hover:bg-on-accent/10")}
            >
              <span aria-hidden>←</span>
              Previous step
            </button>
          </>
        )}
      </div>
    </TierContext>
  );
}
