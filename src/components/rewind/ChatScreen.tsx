"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
  type TargetAndTransition,
} from "framer-motion";
import { easeInCubic, easeInOutCubic, easeOutQuint } from "@/lib/motion";
import { THREAD, type ThreadTurn } from "@/data/rewind";
import { AnswerPanel } from "./AnswerPanel";
import { BlobGradient, ORB_DOCK, ORB_HIDDEN_Y } from "./BlobGradient";
import { CategoryCard } from "./CategoryCard";
import { BrandsCard } from "./BrandsCard";
import { CompareCard } from "./CompareCard";
import { PromptPanel } from "./PromptPanel";
import { SummaryCard } from "./SummaryCard";
import { SupermarketCard } from "./SupermarketCard";
import { HomeIndicator } from "./HomeIndicator";
import { SpendingCard } from "./SpendingCard";
import { TopicMenu } from "./TopicMenu";
import { TopNavigation } from "./TopNavigation";
import { DIM_DELAY, THREAD_WORD_INTERVAL, typeDuration, TypedLine } from "./TypedLine";


/** The orb swells to this scale while a line is typing… */
export const ORB_TYPING_SCALE = 1.25;
/** …growing over this long, then easing back over ORB_SHRINK once the line has typed. */
export const ORB_GROW = 0.6;
export const ORB_SHRINK = 0.8;

/** After the final line types: the topic menu rises and the orb slides up to Figma Step 4 (y 532 → 332). */
export const ORB_FINAL_LIFT = -200;
export const FINALE_DURATION = 0.9;

/**
 * Picking a topic: the intro lines slide up and vanish, the menu drops away and the orb slides
 * down off-screen, then the thread starts at the top (Figma Step 5, node 23:2645).
 */
export const INTRO_EXIT = 0.5;
export const INTRO_EXIT_Y = -80;
export const MENU_EXIT = 0.5;
export const ORB_EXIT = 0.9;
/** From its lifted Step 4 spot, far enough to clear the orb and its blur off the bottom. */
const ORB_EXIT_Y = ORB_HIDDEN_Y + 40;
/** Entrances: the reader's bubble, then a card. */
export const BUBBLE_ENTER = 0.6;
export const CARD_ENTER = 0.8;
/** The chat glides up to keep the newest message in view. */
export const SCROLL_DURATION = 0.8;

/** Thread turn beats (seconds after the reader picks a topic or an answer). */
export const FIRST_BUBBLE_AT = 0.45; // first turn: as the intro lines finish leaving
export const NEXT_BUBBLE_AT = 0.1; // later turns: right away, while the answers drop out
export const REPLY_GAP = 0.75; // after the bubble
export const CARD_GAP = 0.3; // after the reply has typed
export const QUESTION_GAP = 0.9; // after the card starts
export const ANSWERS_EXIT = 0.5;

/** Where a new message parks while Tech Tech replies: 16px under the 98px top bar. */
export const TOP_INSET = 114;
/** The chat column's bottom padding (pb-4). */
const BOTTOM_PAD = 16;
/** Once the flow has ended (no sheet), the last message rests this far above the screen's bottom. */
export const END_GAP = 56;

/** When the next line can start: this line has typed and its last word begins to dim. */
export const lineStepMs = (text: string) => (typeDuration(text) + DIM_DELAY) * 1000;

/** Where the chat is: typing the intro, showing the topic menu (Step 4), or in the spending thread. */
export type ChatPhase = "intro" | "menu" | "spending";

interface ChatScreenProps {
  /** Intro lines visible at this step; the last one is the newest. */
  lines: string[];
  /** The newest intro line of the whole intro — it never dims. */
  isFinalStep: boolean;
  /** "menu" opens straight on Step 4: lines already settled, orb grown, menu up. */
  startAt?: ChatPhase;
  onPhaseChange?: (phase: ChatPhase) => void;
  onAdvance: () => void;
  onClose: () => void;
}

/** Progress of the newest thread turn: 0 none, then bubble → reply → card → question → answers. */
type ThreadStage = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Figma "Step 1–5", one continuous chat: Tech Tech's intro lines type in and dim; the topic menu
 * rises with the orb; picking "Chuyện tiêu xài" clears the intro, drops the menu and the orb, and
 * plays the spending thread from the top, scrolling up like a chat as it grows.
 */
export function ChatScreen({
  lines,
  isFinalStep,
  startAt = "intro",
  onPhaseChange,
  onAdvance,
  onClose,
}: ChatScreenProps) {
  const reduceMotion = useReducedMotion();
  const newestLine = lines[lines.length - 1];
  const opensOnMenu = startAt === "menu";
  const [showMenu, setShowMenu] = useState(opensOnMenu);
  /** Thread turns started so far (THREAD order); the last one is still playing until stage 5. */
  const [turnCount, setTurnCount] = useState(0);
  const [stage, setStage] = useState<ThreadStage>(0);
  const topicPicked = turnCount > 0;
  const latest = turnCount - 1;

  const orbScale = useMotionValue(1);
  // The orb's swirl runs only while a line is typing; it rests between lines and once all are in
  const [restingLine, setRestingLine] = useState<string | null>(null);
  const orbY = useMotionValue(opensOnMenu ? ORB_FINAL_LIFT : 0);

  // Chat scroll: a real scroll area (wheel / trackpad / touch). While the reader is at the bottom,
  // new content glides into view; scrolling up to reread pauses that until they return.
  const viewportRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const followRef = useRef(true);
  const glideRef = useRef<AnimationPlaybackControls | null>(null);

  // Swell while the newest line types, then settle — continuing from wherever the orb is now.
  // After the final line it also slides up to its Step 4 spot as it settles.
  useEffect(() => {
    if (reduceMotion || opensOnMenu) return;
    const hold = Math.max(typeDuration(newestLine), ORB_GROW);
    const settle = isFinalStep ? FINALE_DURATION : ORB_SHRINK;
    const total = hold + settle;
    const timing = { duration: total, times: [0, ORB_GROW / total, hold / total, 1] };
    const controls = animate(orbScale, [null, ORB_TYPING_SCALE, ORB_TYPING_SCALE, 1], {
      ...timing,
      ease: ["easeOut", "linear", isFinalStep ? easeOutQuint : "easeInOut"],
    });
    const lift = isFinalStep
      ? animate(orbY, [null, 0, 0, ORB_FINAL_LIFT], { ...timing, ease: ["linear", "linear", easeOutQuint] })
      : null;
    const rest = setTimeout(() => setRestingLine(newestLine), hold * 1000);
    return () => {
      controls.stop();
      lift?.stop();
      clearTimeout(rest);
    };
  }, [newestLine, isFinalStep, orbScale, orbY, reduceMotion, opensOnMenu]);

  // Bring the menu in the moment the final line's last word ("nào?") is fully shown
  useEffect(() => {
    if (!isFinalStep || opensOnMenu) return;
    const t = setTimeout(
      () => {
        setShowMenu(true);
        onPhaseChange?.("menu");
      },
      reduceMotion ? 0 : typeDuration(newestLine) * 1000,
    );
    return () => clearTimeout(t);
  }, [isFinalStep, newestLine, reduceMotion, opensOnMenu, onPhaseChange]);

  // Each thread turn: schedule its beats when it starts
  useEffect(() => {
    if (turnCount === 0) return;
    const turn = THREAD[turnCount - 1];
    const bubbleAt = turnCount === 1 ? FIRST_BUBBLE_AT : NEXT_BUBBLE_AT;
    const replyAt = bubbleAt + REPLY_GAP;
    const replyDone = replyAt + typeDuration(turn.reply, THREAD_WORD_INTERVAL) + CARD_GAP;
    // Optional beats: a card after the reply, then a line typed before the sheet
    const cardAt = turn.card ? replyDone : null;
    const questionAt = cardAt !== null ? cardAt + QUESTION_GAP : replyDone;
    const question = questionOf(turn);
    const sheetAt = question ? questionAt + typeDuration(question, THREAD_WORD_INTERVAL) : questionAt;
    const beats: [number, ThreadStage][] = [
      [bubbleAt, 1],
      [replyAt, 2],
      ...(cardAt !== null ? [[cardAt, 3] as [number, ThreadStage]] : []),
      ...(question ? [[questionAt, 4] as [number, ThreadStage]] : []),
      [sheetAt, 5],
    ];
    const timers = beats.map(([at, next]) => setTimeout(() => setStage(next), at * 1000));
    return () => timers.forEach(clearTimeout);
  }, [turnCount]);

  const startTurn = (index: number) => {
    followRef.current = true; // a new message always brings the chat back to it
    setStage(0);
    setTurnCount(index + 1);
  };

  const pickTopic = (topic: string) => {
    if (topic !== THREAD[0].trigger || topicPicked) return;
    onPhaseChange?.("spending");
    startTurn(0);
    setShowMenu(false);
    animate(orbY, ORB_EXIT_Y, {
      duration: reduceMotion ? 0 : ORB_EXIT,
      ease: easeInCubic,
    });
  };

  const pickAnswer = (answer: string) => {
    if (stage < 5 || THREAD[turnCount]?.trigger !== answer) return;
    startTurn(turnCount);
  };

  // Chat layout: the tail spacer at the end of the column decides how far the chat can scroll.
  // • Normally it matches the floating bottom sheet, so the last message clears it.
  // • While a turn plays it also reserves room for the new bubble to sit 16px under the top bar;
  //   the reply, card and question then fill that room, so the bubble holds still.
  // • When the turn ends, the chat glides to its new end before the extra room is trimmed.
  const sheetRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const tailSpace = useMotionValue(0);
  const anchoringRef = useRef(false);
  const endedRef = useRef(false);
  const relayoutRef = useRef<() => void>(() => {});

  useEffect(() => {
    const viewport = viewportRef.current;
    const column = columnRef.current;
    const sheet = sheetRef.current;
    const spacer = spacerRef.current;
    if (!viewport || !column || !sheet || !spacer) return;

    /** Where the current glide is heading — size changes that keep the same target don't restart it. */
    let glideTarget: number | null = null;
    const glide = (to: number, done?: () => void) => {
      if (glideRef.current && glideTarget !== null && Math.abs(glideTarget - to) < 1) return;
      glideRef.current?.stop();
      glideTarget = to;
      glideRef.current = animate(viewport.scrollTop, to, {
        duration: reduceMotion ? 0 : SCROLL_DURATION,
        ease: easeInOutCubic,
        onUpdate: (v) => (viewport.scrollTop = v),
        onComplete: () => {
          glideRef.current = null;
          glideTarget = null;
          done?.();
        },
      });
    };
    /** Size the tail spacer now (not on the next frame), so the scroll range is ready for the glide. */
    const setTail = (height: number) => {
      spacer.style.height = `${height}px`;
      tailSpace.set(height);
    };

    const relayout = () => {
      const sheetHeight = sheet.offsetHeight;
      const end = spacer.offsetTop; // where the messages end
      const viewHeight = viewport.clientHeight;
      const bubble = bubbleRef.current;

      // A turn is playing: park the new bubble 16px under the top bar — one glide to a fixed spot
      if (anchoringRef.current && bubble) {
        const room = bubble.offsetTop - TOP_INSET + viewHeight - BOTTOM_PAD - end;
        setTail(Math.max(sheetHeight, room, 0));
        if (followRef.current) {
          const anchor = Math.max(0, bubble.offsetTop - TOP_INSET);
          if (Math.abs(anchor - viewport.scrollTop) > 1) glide(anchor);
        }
        return;
      }

      // Otherwise the tail matches the sheet (or the end gap) and the chat follows its bottom
      const target = endedRef.current ? Math.max(sheetHeight, END_GAP - BOTTOM_PAD) : sheetHeight;
      const newBottom = Math.max(0, end + target + BOTTOM_PAD - viewHeight);
      if (target < tailSpace.get() - 0.5 && viewport.scrollTop > newBottom + 0.5) {
        // Trimming would clamp the scroll and jump — glide to the new end first, then trim
        glide(newBottom, () => setTail(target));
        return;
      }
      setTail(target);
      if (followRef.current && newBottom > viewport.scrollTop + 1) glide(newBottom);
    };
    relayoutRef.current = relayout;

    const observer = new ResizeObserver(relayout);
    observer.observe(viewport);
    observer.observe(column);
    observer.observe(sheet);
    return () => {
      observer.disconnect();
      glideRef.current?.stop();
    };
  }, [reduceMotion, tailSpace]);

  // A turn anchors its bubble from the moment it appears until its answers are up
  useEffect(() => {
    anchoringRef.current = stage >= 1 && stage < 5;
    endedRef.current = stage >= 5 && THREAD[latest]?.next.kind === "end";
    relayoutRef.current();
  }, [stage, latest]);

  /** The reader took over: stop any auto-glide. */
  const takeOver = () => {
    glideRef.current?.stop();
    glideRef.current = null;
  };
  const onScroll = () => {
    if (glideRef.current) return; // our own glide — not the reader
    const viewport = viewportRef.current;
    if (!viewport) return;
    followRef.current = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 8;
  };

  const enter = (from: TargetAndTransition): TargetAndTransition =>
    reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", ...from };

  return (
    <div className="absolute inset-0 flex flex-col items-end overflow-clip bg-cream" onClick={onAdvance}>
      {/* Same 512px orb as the key, parked below the fold */}
      <motion.div className={ORB_DOCK} style={{ scale: orbScale, y: orbY }}>
        <BlobGradient
          variant="chat"
          playing={!opensOnMenu && !topicPicked && restingLine !== newestLine}
          className="size-full"
        />
      </motion.div>

      <div
        ref={viewportRef}
        onScroll={onScroll}
        onWheel={takeOver}
        onTouchStart={takeOver}
        className="relative min-h-px w-full flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Top padding clears the overlaid header (98px) + Figma's 16px */}
        <div ref={columnRef} className="relative flex flex-col items-start gap-4 px-4 pt-[114px] pb-4">
          {/* popLayout lifts the leaving intro out of the flow at once, so the thread starts at the top */}
          <AnimatePresence mode="popLayout">
            {!topicPicked && (
              <motion.div
                key="intro"
                className="flex w-full flex-col items-start gap-4"
                exit={{
                  y: reduceMotion ? 0 : INTRO_EXIT_Y,
                  opacity: 0,
                  transition: {
                    duration: reduceMotion ? 0 : INTRO_EXIT,
                    ease: easeInCubic,
                  },
                }}
              >
                {lines.map((line, i) => {
                  const age = lines.length - 1 - i;
                  return (
                    <TypedLine
                      key={i}
                      text={line}
                      age={age}
                      stayVisible={isFinalStep && age === 0}
                      variant="intro"
                      instant={opensOnMenu}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {THREAD.slice(0, turnCount).map((turn, i) => {
            const turnStage = i === latest ? stage : 4;
            return (
              <Fragment key={i}>
                {turnStage >= 1 && (
                  <motion.div
                    ref={i === latest ? bubbleRef : undefined}
                    className="flex w-full flex-col items-end justify-center pl-14"
                    initial={enter({ y: 16, scale: 0.96 })}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                    transition={{ duration: BUBBLE_ENTER, ease: easeOutQuint }}
                  >
                    {/* Hugs short messages; long ones wrap at the 305px the pl-14 leaves (Figma) */}
                    <p className="rounded-card border border-brand-primary p-4 text-sm leading-5 font-medium text-text-primary backdrop-blur-[50px]">
                      {turn.userMessage}
                    </p>
                  </motion.div>
                )}
                {turnStage >= 2 && <TypedLine text={turn.reply} age={0} stayVisible variant="thread" />}
                {turnStage >= 3 && turn.card && (
                  <motion.div
                    className="w-full"
                    initial={enter({ y: 24, scale: 0.97 })}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                    transition={{ duration: CARD_ENTER, ease: easeOutQuint }}
                  >
                    {turn.card === "spending" && <SpendingCard />}
                    {turn.card === "fashion" && <CategoryCard />}
                    {turn.card === "compare" && <CompareCard />}
                    {turn.card === "brands" && <BrandsCard />}
                    {turn.card === "supermarket" && <SupermarketCard />}
                    {turn.card === "summary" && <SummaryCard />}
                  </motion.div>
                )}
                {turnStage >= 4 && questionOf(turn) && (
                  <TypedLine text={questionOf(turn)!} age={0} stayVisible variant="thread" />
                )}
              </Fragment>
            );
          })}
          {/* Tail spacer (see "Chat layout" above); -mt-4 cancels the column gap */}
          <motion.div ref={spacerRef} aria-hidden className="-mt-4 w-full shrink-0" style={{ height: tailSpace }} />
        </div>
      </div>

      {/* Bottom sheets float over the chat, so messages scroll on underneath the frosted card */}
      <div ref={sheetRef} className="absolute inset-x-0 bottom-0">
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="topics"
              className="relative w-full shrink-0"
              initial={{ y: reduceMotion ? 0 : "100%" }}
              animate={{
                y: 0,
                transition: { duration: FINALE_DURATION, ease: easeOutQuint },
              }}
              exit={{
                y: "100%",
                transition: {
                  duration: reduceMotion ? 0 : MENU_EXIT,
                  ease: easeInCubic,
                },
              }}
            >
              <TopicMenu onSelect={pickTopic} />
            </motion.div>
          )}
          {stage >= 5 && THREAD[latest].next.kind !== "end" && (
            <motion.div
              key={`answers-${latest}`}
              className="relative w-full shrink-0"
              initial={{ y: reduceMotion ? 0 : "100%" }}
              animate={{ y: 0, transition: { duration: FINALE_DURATION, ease: easeOutQuint } }}
              exit={{ y: "100%", transition: { duration: reduceMotion ? 0 : ANSWERS_EXIT, ease: easeInCubic } }}
            >
              <TurnSheet next={THREAD[latest].next} onAnswer={pickAnswer} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header over the scrolling chat: solid cream for its top 75%, fading out below (Figma) */}
      <div className="absolute inset-x-0 top-0 bg-linear-to-b from-cream from-75% to-cream/0">
        <TopNavigation tone="light" onClose={onClose} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <HomeIndicator />
      </div>
    </div>
  );
}

/** What a turn asks next, in the bottom sheet. Sending a prompt replies with the prompt itself. */
function TurnSheet({ next, onAnswer }: { next: ThreadTurn["next"]; onAnswer: (answer: string) => void }) {
  if (next.kind === "end") return null;
  if (next.kind === "answers") return <AnswerPanel answers={next.answers} onSelect={onAnswer} />;
  if (next.kind === "prompt") {
    return (
      <PromptPanel prompt={next.prompt} action={next.action} typed={next.typed} onAction={() => onAnswer(next.prompt)} />
    );
  }
  return <TopicMenu prompt={next.prompt} topics={next.topics} tile="white" onSelect={onAnswer} />;
}

/** The line Tech Tech types in the chat before the sheet, if this turn has one. */
const questionOf = (turn: ThreadTurn) =>
  turn.next.kind === "answers" || turn.next.kind === "topics" ? turn.next.question : undefined;
