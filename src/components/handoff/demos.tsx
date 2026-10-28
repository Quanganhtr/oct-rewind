"use client";

import { useEffect, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { INTRO_LINES, linesOf, START_GREETING, THREAD } from "@/data/rewind";
import { RewindFlow, type Screen } from "@/components/rewind/RewindFlow";
import { IntroScreen } from "@/components/rewind/IntroScreen";
import { KeyGradient } from "@/components/rewind/KeyGradient";
import { BlobGradient, ORB_DOCK } from "@/components/rewind/BlobGradient";
import { CARD_ENTER, FINALE_DURATION, ORB_GROW, ORB_SHRINK, ORB_TYPING_SCALE } from "@/components/rewind/ChatScreen";
import { easeOutQuint } from "@/lib/motion";
import { countWords, TypedLine, WORD_INTERVAL } from "@/components/rewind/TypedLine";
import { TopicMenu } from "@/components/rewind/TopicMenu";
import { AnswerPanel } from "@/components/rewind/AnswerPanel";
import { PromptPanel } from "@/components/rewind/PromptPanel";
import { SpendingCard } from "@/components/rewind/SpendingCard";
import { CategoryCard } from "@/components/rewind/CategoryCard";
import { CompareCard } from "@/components/rewind/CompareCard";
import { BrandsCard } from "@/components/rewind/BrandsCard";
import { SupermarketCard } from "@/components/rewind/SupermarketCard";
import { SummaryCard } from "@/components/rewind/SummaryCard";
import { Phone, ReplayButton } from "./kit";

/** The whole prototype, opened at `initial` — fully interactive. */
export function FlowDemo({ initial, hint }: { initial: Screen; hint: string }) {
  const [run, setRun] = useState(0);
  return (
    <Phone
      framed={false}
      caption={
        <>
          <span>{hint}</span>
          <ReplayButton onClick={() => setRun((r) => r + 1)} label="Restart" />
        </>
      }
    >
      <RewindFlow key={run} initial={initial} controls={false} />
    </Phone>
  );
}

/** Loading → Start on its own; it stops on Start (tapping "Bắt đầu" restarts). */
export function IntroDemo() {
  const [run, setRun] = useState(0);
  return (
    <Phone caption={<ReplayButton onClick={() => setRun((r) => r + 1)} />}>
      <IntroCycle key={run} onRestart={() => setRun((r) => r + 1)} />
    </Phone>
  );
}

function IntroCycle({ onRestart }: { onRestart: () => void }) {
  const [phase, setPhase] = useState<"loading" | "start">("loading");
  return <IntroScreen phase={phase} onLoaded={() => setPhase("start")} onStart={onRestart} onClose={onRestart} />;
}

/** The top of the dome, cropped: the four ambient loops running together. */
export function DomeDemo() {
  return (
    <div className="relative h-[540px] w-[393px] overflow-hidden rounded-[32px] bg-cream">
      <div className="absolute inset-x-0 top-6">
        <KeyGradient label="Bắt đầu" readyDelay={0} />
      </div>
    </div>
  );
}

/** The chat orb: tap to switch between "typing" (swell + swirl) and resting. */
export function OrbDemo() {
  const reduceMotion = useReducedMotion();
  const [typing, setTyping] = useState(false);
  const scale = useMotionValue(1);

  useEffect(() => {
    const controls = animate(scale, typing ? ORB_TYPING_SCALE : 1, {
      duration: reduceMotion ? 0 : typing ? ORB_GROW : ORB_SHRINK,
      ease: typing ? "easeOut" : "easeInOut",
    });
    return () => controls.stop();
  }, [typing, scale, reduceMotion]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[420px] w-[393px] overflow-hidden rounded-[32px] bg-cream">
        <motion.div className={ORB_DOCK} style={{ scale }}>
          <BlobGradient variant="chat" playing={typing} className="size-full" />
        </motion.div>
        <p className="absolute inset-x-0 top-6 text-center font-mono text-xs text-text-primary/60">
          {typing ? "typing — swell to 1.25 + swirl" : "resting — scale 1, still"}
        </p>
      </div>
      <div className="flex gap-2">
        {(["Typing", "Resting"] as const).map((label) => {
          const on = (label === "Typing") === typing;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setTyping(label === "Typing")}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                on ? "bg-cream text-brand-primary" : "bg-on-accent/10 text-on-accent hover:bg-on-accent/20",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Both typing paces side by side, on the real cream background. */
export function TypingDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <div key={run} className="flex w-[393px] flex-col gap-5 rounded-[32px] bg-cream p-6">
        <PaceLabel>Intro · 24px · 0.15s / word</PaceLabel>
        <TypedLine text={INTRO_LINES[0]} age={0} stayVisible={false} variant="intro" />
        <div className="h-px bg-stroke/10" />
        <PaceLabel>Chat thread · 14px · 0.07s / word</PaceLabel>
        <TypedLine text={linesOf(THREAD[0].reply)[0]} age={0} stayVisible variant="thread" />
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} />
    </div>
  );
}

/** The Start greeting: centred, typed once the 2026 mark has landed, never dims. */
const greetingStarts = START_GREETING.map((_, i) =>
  START_GREETING.slice(0, i).reduce((words, line) => words + countWords(line), 0),
);

export function GreetingDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <div key={run} className="flex w-[393px] flex-col items-center gap-2 rounded-[32px] bg-cream px-6 py-10">
        {START_GREETING.map((line, i) => (
          <TypedLine
            key={line}
            text={line}
            age={0}
            stayVisible
            variant="greeting"
            delay={greetingStarts[i] * WORD_INTERVAL}
          />
        ))}
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} />
    </div>
  );
}

function PaceLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] tracking-wider text-text-primary/50 uppercase">{children}</p>;
}

/** The four bottom-sheet variants, exactly as they render. */
export function SheetGallery() {
  const items: [string, string, ReactNode][] = [
    ["topics", "Topic list", <TopicMenu key="t" />],
    [
      "answers",
      "Answers",
      <AnswerPanel key="a" answers={THREAD[0].next.kind === "answers" ? THREAD[0].next.answers : []} />,
    ],
    [
      "prompt",
      "Prompt + send",
      <PromptPanel key="p" prompt="Năm nay mình ghé bao nhiêu brand bạn biết không?" action="Gửi" />,
    ],
  ];
  return (
    <div className="flex items-end justify-center gap-5">
      {items.map(([kind, label, sheet]) => (
        <div key={kind} className="flex flex-col items-center gap-2">
          <div className="flex items-end overflow-hidden rounded-3xl bg-cream pt-6">
            {/* zoom (not scale) so the layout box shrinks with it */}
            <div className="w-[393px] shrink-0 [zoom:0.72]">{sheet}</div>
          </div>
          <p className="font-mono text-[11px] text-on-accent/60">
            next.kind = <span className="text-cream">&quot;{kind}&quot;</span> · {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** "Tổng kết lại cho mình nha" typing into the sheet. */
export function TypedPromptDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="overflow-hidden rounded-3xl bg-cream pt-24">
        <motion.div
          key={run}
          className="w-[393px]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: FINALE_DURATION, ease: easeOutQuint }}
        >
          <PromptPanel prompt="Tổng kết lại cho mình nha" action="Gửi" typed />
        </motion.div>
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} />
    </div>
  );
}

/** A card as it enters the chat: blur-up, then its numbers count. */
export function CardEntranceDemo({ card }: { card: "spending" | "summary" }) {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[361px]">
        <motion.div
          key={run}
          initial={{ opacity: 0, filter: "blur(8px)", y: 24, scale: 0.97 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          transition={{ duration: CARD_ENTER, ease: easeOutQuint }}
        >
          {card === "spending" ? <SpendingCard /> : <SummaryCard />}
        </motion.div>
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} />
    </div>
  );
}

/** Every topic card, small. */
export function CardGallery() {
  const [run, setRun] = useState(0);
  const cards: [string, ReactNode][] = [
    ["spending · Step 5", <SpendingCard key="s" />],
    ["fashion · Step 7", <CategoryCard key="f" />],
    ["compare · Step 8", <CompareCard key="c" />],
    ["brands · Step 9", <BrandsCard key="b" />],
    ["supermarket · Step 10", <SupermarketCard key="m" />],
  ];
  return (
    <div className="flex flex-col items-center gap-3">
      <div key={run} className="flex items-start gap-4">
        {cards.map(([label, card]) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-[361px] [zoom:0.5]">{card}</div>
            <p className="font-mono text-[10px] text-on-accent/60">{label}</p>
          </div>
        ))}
      </div>
      <ReplayButton onClick={() => setRun((r) => r + 1)} label="Replay counts" />
    </div>
  );
}
