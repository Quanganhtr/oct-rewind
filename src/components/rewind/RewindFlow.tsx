"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_LINES } from "@/data/rewind";
import { DeviceFrame } from "@/components/DeviceFrame";
import { cn } from "@/lib/cn";
import { ChatScreen, type ChatPhase, lineStepMs } from "./ChatScreen";
import { IntroScreen } from "./IntroScreen";

export type Screen =
  | { name: "loading" }
  | { name: "start" }
  /** `startAt: "menu"` opens Step 4 directly (lines settled, menu up) — used by Back. */
  | { name: "chat"; step: number; startAt?: ChatPhase };

const LAST_STEP = INTRO_LINES.length - 1;

const nextChatStep = (s: Screen): Screen =>
  s.name === "chat" && s.step < LAST_STEP ? { name: "chat", step: s.step + 1 } : s;

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
}

const STAGE_BUTTON =
  "hidden items-center gap-2 rounded-full bg-on-accent/10 px-4 py-2.5 text-sm leading-5 font-medium text-on-accent transition-colors hover:bg-on-accent/20 focus-visible:outline-2 focus-visible:outline-on-accent sm:flex";

export function RewindFlow({ initial = { name: "loading" }, controls = true }: RewindFlowProps) {
  const [screen, setScreen] = useState<Screen>(initial);
  const [chatPhase, setChatPhase] = useState<ChatPhase>(
    initial.name === "chat" ? (initial.startAt ?? "intro") : "intro",
  );
  // Bumping `run` remounts the current screen so it replays from its start
  const [run, setRun] = useState(0);

  const advanceChat = () => setScreen(nextChatStep);
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
    if (chatPhase === "spending") return jumpTo({ name: "chat", step: LAST_STEP, startAt: "menu" });
    if (chatPhase === "menu") return jumpTo({ name: "chat", step: LAST_STEP });
    if (screen.step > 0) return jumpTo({ name: "chat", step: screen.step - 1 });
    jumpTo({ name: "start" });
  };
  const canGoBack = screen.name !== "loading";

  // Chat lines auto-advance (tap skips ahead). Loading hands off when its bar fills.
  useEffect(() => {
    if (screen.name === "chat" && screen.step < LAST_STEP) {
      const t = setTimeout(() => setScreen(nextChatStep), lineStepMs(INTRO_LINES[screen.step]));
      return () => clearTimeout(t);
    }
  }, [screen]);

  const isIntro = screen.name !== "chat";

  return (
    <>
      <DeviceFrame>
        {/* No `initial={false}` here: it propagates down and freezes the looping layers at their end state */}
        <AnimatePresence>
          {isIntro ? (
            <motion.div key={`intro-${run}`} className="absolute inset-0" {...introHold}>
              <IntroScreen
                phase={screen.name === "loading" ? "loading" : "start"}
                onLoaded={() => setScreen((s) => (s.name === "loading" ? { name: "start" } : s))}
                onStart={() => setScreen({ name: "chat", step: 0 })}
                onClose={restart}
              />
            </motion.div>
          ) : (
            <motion.div key={`chat-${run}`} className="absolute inset-0 z-10" {...screenFade}>
              <ChatScreen
                lines={INTRO_LINES.slice(0, screen.step + 1)}
                isFinalStep={screen.step === LAST_STEP}
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
          <Link href="/handoff" target="_blank" className={cn(STAGE_BUTTON, "fixed right-6 top-6")}>
            Dev handoff
            <span aria-hidden>↗</span>
          </Link>
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
    </>
  );
}
