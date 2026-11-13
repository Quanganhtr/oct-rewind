"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
  type TargetAndTransition,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { easeInCubic, easeInOutCubic, easeOutQuint } from "@/lib/motion";
import {
  ANY_ANSWER,
  type CardKind,
  GATED_CARDS,
  type Lines,
  linesOf,
  resolveNext,
  type SheetNext,
  type ThreadTurn,
} from "@/data/rewind";
import { AnswerPanel } from "./AnswerPanel";
import { BlobGradient, ORB_DOCK, ORB_HIDDEN_Y } from "./BlobGradient";
import { CategoryCard } from "./CategoryCard";
import { BirthdayCard } from "./BirthdayCard";
import { BrandsCard } from "./BrandsCard";
import { CompareCard } from "./CompareCard";
import { Confetti } from "./Confetti";
import { DonationCard } from "./DonationCard";
import { EmojiRain } from "./EmojiRain";
import { FamilyCard } from "./FamilyCard";
import { GiftCard } from "./GiftCard";
import { PromptPanel } from "./PromptPanel";
import {
  PriorityGrowthCard,
  PriorityNewAssetsCard,
  PriorityReturnsCard,
  PrioritySavingsCard,
} from "./PriorityFinanceCards";
import {
  PriorityBirthdayCard,
  PriorityDonationCard,
  PriorityFamilyCard,
  PriorityPersonCard,
} from "./PriorityLoveCards";
import {
  PriorityBrandCard,
  PriorityCountriesCard,
  PriorityCategoryCard,
  PriorityPerksCard,
  PriorityRewardsCard,
} from "./PriorityExperienceCards";
import {
  PrivateCountriesCard,
  PrivateEventsCard,
  PrivateFamilyCard,
  PrivateMomentsCard,
  PrivateRevenueCard,
  PrivateShieldsCard,
} from "./PrivateCards";
import { SummaryCard } from "./SummaryCard";
import { SupermarketCard } from "./SupermarketCard";
import { GuestsCard } from "./GuestsCard";
import { FanCard } from "./FanCard";
import { GrowthCard } from "./GrowthCard";
import { AssetsCard } from "./AssetsCard";
import { GoodsCard } from "./GoodsCard";
import { IncomeCard } from "./IncomeCard";
import { RewardsCard } from "./RewardsCard";
import { SavingsCard } from "./SavingsCard";
import { PeakDayCard } from "./PeakDayCard";
import { MonthsCard } from "./MonthsCard";
import { ConcertCard } from "./ConcertCard";
import { TopPeopleCard } from "./TopPeopleCard";
import { GreetingButton, GreetingCard } from "./GreetingCard";
import { HomeIndicator } from "./HomeIndicator";
import { SoundboxCard } from "./SoundboxCard";
import { SpendingCard } from "./SpendingCard";
import { useTier } from "./TierContext";
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
/**
 * The intro, now 16px chat history, fades in only once the first bubble has finished pushing the
 * 24px lines up (it appears at FIRST_BUBBLE_AT and glides for SCROLL_DURATION), not during the push.
 */
export const HISTORY_DELAY = FIRST_BUBBLE_AT + SCROLL_DURATION;
export const HISTORY_ENTER = 0.5;
export const CARD_GAP = 0.3; // after the reply has typed
export const QUESTION_GAP = 0.9; // after the card starts (or after a gift is tapped open)
export const LINE_GAP = 0.3; // between lines typed back to back
export const ANSWERS_EXIT = 0.5;
/** Opening the greeting: the chat dims and blurs over this long while the card rises… */
export const GREETING_DIM = 0.4;
/** …and the shared header and home indicator switch to their on-dark look as its top arrives. */
export const GREETING_CHROME_DELAY = 0.15;
export const GREETING_CHROME = 0.4;

/** When each of several lines starts typing (back to back, LINE_GAP apart), and when the last is in. */
export const typeLines = (lines: string[]) => {
  let at = 0;
  const starts = lines.map((line, i) => {
    const start = at;
    at += typeDuration(line, THREAD_WORD_INTERVAL) + (i < lines.length - 1 ? LINE_GAP : 0);
    return start;
  });
  return { starts, total: at };
};

/**
 * Where a new message parks while Tech Tech replies: 16px under the 98px top bar. On phones the
 * fake status bar is hidden, so the bar is 56px and this drops to 72 (read from the column's padding).
 */
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

/** One beat of a turn after the reader's bubble: line(s) Tech Tech types, or a card. */
type Beat = { lines: string[]; bold?: boolean; note?: boolean } | { card: CardKind };

/**
 * A turn as played: its topic (null for the summary) and step, with its sheet worked out as it starts
 * and its beats in order — reply, card, any extra beats, then the line(s) typed before the sheet.
 */
type PlayedTurn = ThreadTurn & { topic: string | null; step: number; sheet: SheetNext; beats: Beat[] };

/**
 * How far the newest turn has played: 0 nothing, 1 the bubble, 1 + n its first n beats, and
 * sheetProgress(turn) once its sheet is up.
 */
const sheetProgress = (turn: PlayedTurn) => turn.beats.length + 2;

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
  const { threads, topicSet, topics, openWithPrompt, menuOrbLift = ORB_FINAL_LIFT } = useTier();
  const newestLine = lines[lines.length - 1];
  const opensOnMenu = startAt === "menu";
  const [showMenu, setShowMenu] = useState(opensOnMenu);
  /** Turns started so far, across topics in the order the reader picked; the last plays until its sheet. */
  const [played, setPlayed] = useState<PlayedTurn[]>([]);
  const turnCount = played.length;
  /** Turns started so far, updated the moment one starts (before React re-renders). */
  const startedRef = useRef(0);
  const [progress, setProgress] = useState(0);
  /** Turns whose gated card (the gift) the reader has opened. */
  const [opened, setOpened] = useState<number[]>([]);
  /** The ending's "Mở thiệp chúc mừng" was tapped: the full-screen greeting card is up. */
  const [greetingOpen, setGreetingOpen] = useState(false);
  const greetingChrome = {
    duration: reduceMotion ? 0 : GREETING_CHROME,
    delay: reduceMotion ? 0 : GREETING_CHROME_DELAY,
    ease: "easeInOut" as const,
  };
  const topicPicked = turnCount > 0;
  const latest = turnCount - 1;

  const orbScale = useMotionValue(1);
  // The orb's swirl runs only while a line is typing; it rests between lines and once all are in
  const [restingLine, setRestingLine] = useState<string | null>(null);
  const orbY = useMotionValue(opensOnMenu ? menuOrbLift : 0);

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
      ? animate(orbY, [null, 0, 0, menuOrbLift], { ...timing, ease: ["linear", "linear", easeOutQuint] })
      : null;
    const rest = setTimeout(() => setRestingLine(newestLine), hold * 1000);
    return () => {
      controls.stop();
      lift?.stop();
      clearTimeout(rest);
    };
  }, [newestLine, isFinalStep, orbScale, orbY, reduceMotion, opensOnMenu, menuOrbLift]);

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

  // Each thread turn: schedule its beats when it starts — up to a gated card, which waits for a tap
  useEffect(() => {
    if (turnCount === 0) return;
    const bubbleAt = turnCount === 1 ? FIRST_BUBBLE_AT : NEXT_BUBBLE_AT;
    const steps: [number, number][] = [[bubbleAt, 1], ...beatTimes(played[turnCount - 1], 0, bubbleAt + REPLY_GAP)];
    const timers = steps.map(([at, next]) => setTimeout(() => setProgress(next), at * 1000));
    return () => timers.forEach(clearTimeout);
    // Only a new turn starting reschedules: `played` itself is only ever appended to
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnCount]);

  // Opening the gift carries its turn on from the beat after it
  const giftOpen = turnCount > 0 && opened.includes(turnCount - 1);
  useEffect(() => {
    if (!giftOpen) return;
    const turn = played[turnCount - 1];
    const gift = turn.beats.findIndex((beat) => "card" in beat && GATED_CARDS.has(beat.card));
    const timers = beatTimes(turn, gift + 1, QUESTION_GAP).map(([at, next]) =>
      setTimeout(() => setProgress(next), at * 1000),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftOpen, turnCount]);

  const current = played[latest];
  const sheetUp = turnCount > 0 && progress >= sheetProgress(current);

  // A reply can rain its reaction emoji over the screen as it starts typing
  const reaction = turnCount > 0 && progress >= 2 && !reduceMotion ? current.reaction : undefined;

  // The summary card bursts confetti over the whole screen as it appears
  const summaryBeat = current?.beats.findIndex((beat) => "card" in beat && beat.card === "summary") ?? -1;
  const showConfetti = summaryBeat >= 0 && progress >= summaryBeat + 2 && !reduceMotion;

  /** Plays `turn` next. Its sheet is worked out now, from the topics visited so far (this one included). */
  const startTurn = (turn: ThreadTurn, topic: string | null, step: number) => {
    startedRef.current += 1;
    followRef.current = true; // a new message always brings the chat back to it
    setProgress(0);
    setPlayed((sofar) => {
      const visited = [...sofar.map((t) => t.topic), topic].filter((t): t is string => t !== null);
      const sheet = resolveNext(turn, visited, topicSet);
      return [...sofar, { ...turn, topic, step, sheet, beats: beatsOf(turn, sheet) }];
    });
  };

  /** The first menu (Step 4): any topic can start the thread. */
  const pickTopic = (topic: string) => {
    // `topicPicked` is stale in a menu still sliding out; the ref already knows a turn started
    if (topicPicked || startedRef.current > 0 || !threads[topic]) return;
    onPhaseChange?.("spending");
    // The first bubble rises from where this sheet's top edge was (see "First bubble" below)
    pickSheetRef.current = sheetRef.current?.offsetHeight ?? 0;
    startTurn(threads[topic][0], topic, 0);
    setShowMenu(false);
    animate(orbY, ORB_EXIT_Y, {
      duration: reduceMotion ? 0 : ORB_EXIT,
      ease: easeInCubic,
    });
  };

  /** A tap in the sheet: another topic, the summary prompt, or the designed answer that carries the topic on. */
  const pickAnswer = (answer: string) => {
    // A sheet still sliding out keeps this handler from its own render: a second tap there is stale
    if (!sheetUp || startedRef.current !== turnCount) return;
    if (current.sheet.kind === "greeting") {
      setGreetingOpen(true);
      return;
    }
    if (current.sheet.kind === "topics") {
      // A topic whose conversation isn't built yet stays put
      if (current.sheet.topics.includes(answer) && threads[answer]) startTurn(threads[answer][0], answer, 0);
      return;
    }
    if (current.next.kind === "continue") {
      if (topicSet.summary) startTurn(topicSet.summary, null, 0);
      return;
    }
    const following = current.topic ? threads[current.topic][current.step + 1] : undefined;
    if (!following || (following.trigger !== answer && following.trigger !== ANY_ANSWER)) return;
    // An ANY_ANSWER turn shows the reader's pick as their bubble, or wraps it ("Tôi nhớ là khoảng {answer}")
    const userMessage = following.userMessage ? following.userMessage.replace("{answer}", answer) : answer;
    startTurn({ ...following, userMessage }, current.topic, current.step + 1);
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
      const topInset = parseFloat(getComputedStyle(column).paddingTop) || TOP_INSET;

      // A turn is playing: park the new bubble 16px under the top bar — one glide to a fixed spot
      if (anchoringRef.current && bubble) {
        const room = bubble.offsetTop - topInset + viewHeight - BOTTOM_PAD - end;
        setTail(Math.max(sheetHeight, room, 0));
        if (followRef.current) {
          const anchor = Math.max(0, bubble.offsetTop - topInset);
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

  // First bubble: later bubbles appear at the chat's end, just above the sheet, and the glide carries
  // them to the top. The first one would appear mid-screen under the short intro history instead, so
  // it starts pushed down to just above where the picked sheet was, and eases back to its place in
  // step with the glide (same duration and ease): one rise from the bottom, like every other bubble.
  const firstLift = useMotionValue(0);
  const pickSheetRef = useRef(0);
  const firstRiseRef = useRef(false);
  useLayoutEffect(() => {
    if (turnCount !== 1 || progress < 1 || firstRiseRef.current || reduceMotion) return;
    const viewport = viewportRef.current;
    const bubble = bubbleRef.current;
    if (!viewport || !bubble) return;
    firstRiseRef.current = true;
    const bottom = bubble.offsetTop + bubble.offsetHeight - viewport.scrollTop;
    const drop = viewport.clientHeight - pickSheetRef.current - BOTTOM_PAD - bottom;
    if (drop <= 0) return;
    firstLift.set(drop);
    animate(firstLift, 0, { duration: SCROLL_DURATION, ease: easeInOutCubic });
  }, [turnCount, progress, reduceMotion, firstLift]);

  // A turn anchors its bubble from the moment it appears until its answers are up
  useEffect(() => {
    anchoringRef.current = progress >= 1 && !sheetUp;
    endedRef.current = sheetUp && current.sheet.kind === "end";
    relayoutRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, latest]);

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

  /** A gift in turn `i`: open once tapped, and tappable only while it's the newest turn's. */
  const giftProps = (i: number) => ({
    open: opened.includes(i),
    onOpen: i === latest && !opened.includes(i) ? () => setOpened((o) => [...o, i]) : undefined,
  });

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
        {/* Top padding clears the overlaid header (98px; 56px on phones, no status bar) + Figma's 16px */}
        <div ref={columnRef} className="relative flex flex-col items-start gap-4 px-4 pt-[72px] pb-4 sm:pt-[114px]">
          {/* Picking a topic: the 24px intro lifts away (popLayout takes it out of the flow at once) and
              the same lines stay behind as chat history at the thread's 16px, above the first bubble.
              The chat still glides that bubble to the top, so the history is there on scrolling back up. */}
          <AnimatePresence mode="popLayout">
            {!topicPicked ? (
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
            ) : (
              <motion.div
                key="history"
                className="flex w-full flex-col items-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : HISTORY_ENTER,
                  delay: reduceMotion ? 0 : HISTORY_DELAY,
                  ease: easeOutQuint,
                }}
              >
                {lines.map((line, i) => (
                  <p key={i} className="w-full text-base leading-6 font-medium whitespace-pre-line text-text-primary">
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {played.map((turn, i) => {
            const shown = i === latest ? progress : Infinity;
            return (
              <Fragment key={i}>
                {shown >= 1 && (
                  // The outer box keeps the bubble's place in the flow (and the glide's anchor); only the
                  // first bubble uses its offset, to rise from the bottom (see "First bubble")
                  <motion.div
                    ref={i === latest ? bubbleRef : undefined}
                    className="w-full"
                    style={i === 0 ? { y: firstLift } : undefined}
                  >
                    <motion.div
                      className="flex w-full flex-col items-end justify-center pl-14"
                      initial={enter({ y: 16, scale: 0.96 })}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                      transition={{ duration: BUBBLE_ENTER, ease: easeOutQuint }}
                    >
                      {/* Hugs short messages; long ones wrap at the 305px the pl-14 leaves (Figma) */}
                      <p className="rounded-card border border-brand-primary p-4 text-base leading-6 font-medium text-text-primary backdrop-blur-[50px]">
                        {turn.userMessage}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
                {turn.beats.slice(0, Math.max(0, shown - 1)).map((beat, k) =>
                  "lines" in beat ? (
                    <TypedLines key={k} lines={beat.lines} bold={beat.bold} note={beat.note} />
                  ) : (
                    <motion.div
                      key={k}
                      className="w-full"
                      initial={enter({ y: 24, scale: 0.97 })}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                      transition={{ duration: CARD_ENTER, ease: easeOutQuint }}
                    >
                      {beat.card === "spending" && <SpendingCard />}
                      {beat.card === "fashion" && <CategoryCard />}
                      {beat.card === "compare" && <CompareCard />}
                      {beat.card === "brands" && <BrandsCard />}
                      {beat.card === "supermarket" && <SupermarketCard />}
                      {beat.card === "gift" && <GiftCard {...giftProps(i)} />}
                      {beat.card === "priorityPerson" && <PriorityPersonCard />}
                      {beat.card === "topPeople" && <TopPeopleCard />}
                      {beat.card === "birthday" && <BirthdayCard />}
                      {beat.card === "family" && <FamilyCard />}
                      {beat.card === "donation" && <DonationCard />}
                      {beat.card === "soundbox" && <SoundboxCard />}
                      {beat.card === "guests" && <GuestsCard />}
                      {beat.card === "fan" && <FanCard />}
                      {beat.card === "peakDay" && <PeakDayCard />}
                      {beat.card === "growth" && <GrowthCard />}
                      {beat.card === "assets" && <AssetsCard />}
                      {beat.card === "income" && <IncomeCard />}
                      {beat.card === "rewards" && <RewardsCard />}
                      {beat.card === "goods" && <GoodsCard />}
                      {beat.card === "savings" && <SavingsCard />}
                      {beat.card === "months" && <MonthsCard />}
                      {beat.card === "concert" && <ConcertCard />}
                      {beat.card === "summary" && <SummaryCard />}
                      {beat.card === "priorityGrowth" && <PriorityGrowthCard />}
                      {beat.card === "priorityNewAssets" && <PriorityNewAssetsCard />}
                      {beat.card === "prioritySavings" && <PrioritySavingsCard />}
                      {beat.card === "priorityReturns" && <PriorityReturnsCard />}
                      {beat.card === "priorityFamily" && <PriorityFamilyCard />}
                      {beat.card === "priorityDonation" && <PriorityDonationCard />}
                      {beat.card === "priorityBirthday" && <PriorityBirthdayCard />}
                      {beat.card === "priorityPerks" && <PriorityPerksCard />}
                      {beat.card === "priorityCategory" && <PriorityCategoryCard />}
                      {beat.card === "priorityBrand" && <PriorityBrandCard />}
                      {beat.card === "priorityCountries" && <PriorityCountriesCard />}
                      {beat.card === "priorityRewards" && <PriorityRewardsCard />}
                      {beat.card === "privateRevenue" && <PrivateRevenueCard />}
                      {beat.card === "privateEvents" && <PrivateEventsCard />}
                      {beat.card === "privateMoments" && <PrivateMomentsCard />}
                      {beat.card === "privateCountries" && <PrivateCountriesCard />}
                      {beat.card === "privateShields" && <PrivateShieldsCard />}
                      {beat.card === "privateFamily" && <PrivateFamilyCard />}
                    </motion.div>
                  ),
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
              {openWithPrompt ? (
                <PromptPanel prompt={topics[0]} action="Gửi" typed onAction={() => pickTopic(topics[0])} />
              ) : (
                <TopicMenu onSelect={pickTopic} />
              )}
            </motion.div>
          )}
          {sheetUp && current.sheet.kind !== "end" && (
            <motion.div
              key={`answers-${latest}`}
              className="relative w-full shrink-0"
              initial={{ y: reduceMotion ? 0 : "100%" }}
              animate={{ y: 0, transition: { duration: FINALE_DURATION, ease: easeOutQuint } }}
              exit={{ y: "100%", transition: { duration: reduceMotion ? 0 : ANSWERS_EXIT, ease: easeInCubic } }}
            >
              <TurnSheet next={current.sheet} onAnswer={pickAnswer} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {reaction && <EmojiRain key={latest} emoji={reaction} />}
      {showConfetti && <Confetti />}

      {/* Opening the ending's greeting: the chat dims and blurs while the card rises over it… */}
      <AnimatePresence>
        {greetingOpen && (
          <motion.div
            key="greeting-dim"
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 bg-brand-primary/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : GREETING_DIM, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{greetingOpen && <GreetingCard key="greeting" />}</AnimatePresence>

      {/* …under the one header and home indicator every screen shares. They stay put (above the card
          once it's open) and switch to their on-dark look as it arrives. */}
      <div className={cn("absolute inset-x-0 top-0", greetingOpen && "z-40")}>
        {/* Over the chat: solid cream for its top 75%, fading out below (Figma) */}
        <motion.div
          className="bg-linear-to-b from-cream from-75% to-cream/0"
          initial={false}
          animate={{ opacity: greetingOpen ? 0 : 1 }}
          transition={greetingChrome}
        >
          <TopNavigation tone="light" onClose={onClose} />
        </motion.div>
        {greetingOpen && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={greetingChrome}
          >
            <TopNavigation tone="dark" onClose={onClose} />
          </motion.div>
        )}
      </div>
      <div className={cn("pointer-events-none absolute inset-x-0 bottom-0", greetingOpen && "z-40")}>
        <motion.div initial={false} animate={{ opacity: greetingOpen ? 0 : 1 }} transition={greetingChrome}>
          <HomeIndicator />
        </motion.div>
        {greetingOpen && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={greetingChrome}
          >
            <HomeIndicator tone="light" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/** What a turn asks next, in the bottom sheet. Sending a prompt replies with the prompt itself. */
function TurnSheet({ next, onAnswer }: { next: SheetNext; onAnswer: (answer: string) => void }) {
  if (next.kind === "end") return null;
  if (next.kind === "greeting") return <GreetingButton label={next.action} onPress={() => onAnswer(next.action)} />;
  if (next.kind === "answers") return <AnswerPanel answers={next.answers} onSelect={onAnswer} />;
  if (next.kind === "prompt") {
    return (
      <PromptPanel
        prompt={next.prompt}
        action={next.action}
        typed={next.typed}
        onAction={() => onAnswer(next.prompt)}
      />
    );
  }
  return <TopicMenu prompt={next.prompt} topics={next.topics} onSelect={onAnswer} />;
}

/** A turn's beats in order: reply, card, any extra beats, then the line(s) typed before its sheet. */
function beatsOf(turn: ThreadTurn, sheet: SheetNext): Beat[] {
  const beat = (item: Lines | { card: CardKind } | { note: string }): Beat => {
    if (typeof item !== "object" || Array.isArray(item)) return { lines: linesOf(item) };
    return "note" in item ? { lines: [item.note], note: true } : item;
  };
  const items = [
    ...(turn.reply ? [beat(turn.reply)] : []),
    ...(turn.card ? [beat({ card: turn.card })] : []),
    ...(turn.after ?? []).map(beat),
    ...(sheet.kind !== "end" && sheet.question
      ? [
          {
            lines: linesOf(sheet.question),
            bold: (sheet.kind === "answers" || sheet.kind === "prompt") && sheet.boldQuestion,
          },
        ]
      : []),
  ];
  return items.filter((b) => !("lines" in b) || b.lines.length > 0);
}

/**
 * When the beats from `from` on show (as progress values), starting at `at` seconds: lines type
 * back to back, a card is followed QUESTION_GAP later, and the sheet comes up as the last word
 * lands. Stops at a gated card — the rest waits until it's opened.
 */
function beatTimes(turn: PlayedTurn, from: number, at: number): [number, number][] {
  const steps: [number, number][] = [];
  let t = at;
  for (let k = from; k < turn.beats.length; k++) {
    const beat = turn.beats[k];
    steps.push([t, k + 2]);
    if ("card" in beat) {
      if (GATED_CARDS.has(beat.card)) return steps;
      t += QUESTION_GAP;
    } else {
      const next = turn.beats[k + 1];
      t += typeLines(beat.lines).total + (next ? ("card" in next ? CARD_GAP : LINE_GAP) : 0);
    }
  }
  steps.push([t, sheetProgress(turn)]);
  return steps;
}

/** Lines typed back to back, each starting once the one before has typed (plus LINE_GAP). */
function TypedLines({ lines, bold = false, note = false }: { lines: string[]; bold?: boolean; note?: boolean }) {
  const { starts } = typeLines(lines);
  const variant = note ? "note" : bold ? "threadBold" : "thread";
  return lines.map((line, i) => (
    <TypedLine key={i} text={line} age={0} stayVisible variant={variant} delay={starts[i]} />
  ));
}
