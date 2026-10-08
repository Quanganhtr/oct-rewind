"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_STEPS } from "@/data/rewind";
import { ChatScreen } from "./ChatScreen";
import { IntroScreen } from "./IntroScreen";

type Screen = { name: "loading" } | { name: "start" } | { name: "chat"; step: number };

const LOADING_MS = 2400;
const CHAT_STEP_MS = 2800;

const LAST_STEP = INTRO_STEPS.length - 1;

const nextChatStep = (s: Screen): Screen =>
  s.name === "chat" && s.step < LAST_STEP ? { name: "chat", step: s.step + 1 } : s;

const screenFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export function RewindFlow() {
  const [screen, setScreen] = useState<Screen>({ name: "loading" });
  const [run, setRun] = useState(0);

  const advanceChat = () => setScreen(nextChatStep);
  const restart = () => {
    setScreen({ name: "loading" });
    setRun((r) => r + 1);
  };

  // Loading hands off to Start on its own; chat lines auto-advance (tap skips ahead).
  useEffect(() => {
    if (screen.name === "loading") {
      const t = setTimeout(() => setScreen({ name: "start" }), LOADING_MS);
      return () => clearTimeout(t);
    }
    if (screen.name === "chat" && screen.step < LAST_STEP) {
      const t = setTimeout(() => setScreen(nextChatStep), CHAT_STEP_MS);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const isIntro = screen.name !== "chat";

  return (
    // No `initial={false}` here: it propagates down and freezes the looping layers at their end state
    <AnimatePresence>
      {isIntro ? (
        <motion.div key={`intro-${run}`} className="absolute inset-0" {...screenFade}>
          <IntroScreen
            phase={screen.name === "loading" ? "loading" : "start"}
            onStart={() => setScreen({ name: "chat", step: 0 })}
            onClose={restart}
          />
        </motion.div>
      ) : (
        <motion.div key={`chat-${run}`} className="absolute inset-0" {...screenFade}>
          <ChatScreen lines={INTRO_STEPS[screen.step]} onAdvance={advanceChat} onClose={restart} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
