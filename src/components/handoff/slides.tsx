"use client";

import type { ReactNode } from "react";
import { INTRO_LINES, LINE_OPACITY, START_GREETING, THREAD, type ThreadTurn } from "@/data/rewind";
import { easeInCubic, easeInOutCubic, easeInOutSine, easeOutExpo, easeOutQuint } from "@/lib/motion";
import {
  ANSWERS_EXIT,
  BUBBLE_ENTER,
  CARD_ENTER,
  CARD_GAP,
  END_GAP,
  FINALE_DURATION,
  FIRST_BUBBLE_AT,
  INTRO_EXIT,
  INTRO_EXIT_Y,
  lineStepMs,
  MENU_EXIT,
  NEXT_BUBBLE_AT,
  ORB_EXIT,
  ORB_FINAL_LIFT,
  ORB_GROW,
  ORB_SHRINK,
  ORB_TYPING_SCALE,
  QUESTION_GAP,
  REPLY_GAP,
  SCROLL_DURATION,
  TOP_INSET,
} from "@/components/rewind/ChatScreen";
import {
  DOME_EXIT_DURATION,
  LOADING_DURATION,
  LOADING_FADE,
  SETTLE_DURATION,
  START_CONTENT_EXIT,
} from "@/components/rewind/IntroScreen";
import { BLEND_IN, BLEND_OUT } from "@/components/rewind/BlobGradient";
import { COUNT_DELAY, COUNT_DURATION } from "@/components/rewind/CountUp";
import { SCREEN_FADE } from "@/components/rewind/RewindFlow";
import {
  DIM_DELAY,
  DIM_DURATION,
  THREAD_WORD_INTERVAL,
  typeDuration,
  WORD_COLOR,
  WORD_INTERVAL,
  WORD_REVEAL,
} from "@/components/rewind/TypedLine";
import {
  CardEntranceDemo,
  CardGallery,
  DomeDemo,
  FlowDemo,
  GreetingDemo,
  IntroDemo,
  OrbDemo,
  SheetGallery,
  TypedPromptDemo,
  TypingDemo,
} from "./demos";
import { type Beat, Callout, EaseCurve, PartCover, Rules, sec, Slide, Specs, Swatch, Timeline, V } from "./kit";

export type DeckSlide = { id: string; part: 0 | 1 | 2 | 3 | 4; title: string; render: () => ReactNode };

export const PARTS = [
  { n: 1, name: "Intro", range: "Loading → Start" },
  { n: 2, name: "Warm-up", range: "Start → topic menu" },
  { n: 3, name: "Topic detail", range: "Topic → data cards" },
  { n: 4, name: "Wrap-up", range: "All topics done → summary" },
] as const;

const LAST_STEP = INTRO_LINES.length - 1;

/* ───────────── Timings derived from the prototype's constants ───────────── */

const thread = (text: string) => typeDuration(text, THREAD_WORD_INTERVAL);
const questionOf = (turn: ThreadTurn) =>
  turn.next.kind === "answers" || turn.next.kind === "topics" ? turn.next.question : undefined;

/** The beats of one thread turn, measured from the tap that starts it. */
function turnBeats(turn: ThreadTurn, first: boolean) {
  const bubbleAt = first ? FIRST_BUBBLE_AT : NEXT_BUBBLE_AT;
  const replyAt = bubbleAt + REPLY_GAP;
  const replyDur = thread(turn.reply);
  const replyDone = replyAt + replyDur + CARD_GAP;
  const cardAt = turn.card ? replyDone : null;
  const questionAt = cardAt !== null ? cardAt + QUESTION_GAP : replyDone;
  const question = questionOf(turn);
  const questionDur = question ? thread(question) : 0;
  const sheetAt = questionAt + questionDur;
  return { bubbleAt, replyAt, replyDur, cardAt, questionAt, question, questionDur, sheetAt };
}

const greetingWords = START_GREETING.join(" ");
const introStarts = INTRO_LINES.map((_, i) =>
  INTRO_LINES.slice(0, i).reduce((t, line) => t + lineStepMs(line) / 1000, 0),
);
const lastLineTyped = introStarts[LAST_STEP] + typeDuration(INTRO_LINES[LAST_STEP]);
/** A line has fully dimmed once its last word has: start + (n-1)·interval + reveal + hold + fade. */
const dimSpan = (i: number) => {
  const start = introStarts[i] + WORD_REVEAL + DIM_DELAY;
  return { at: start, dur: typeDuration(INTRO_LINES[i]) - WORD_REVEAL + DIM_DURATION };
};

const first = turnBeats(THREAD[0], true);
const second = turnBeats(THREAD[1], false);
const promptTurn = turnBeats(THREAD[2], false);
const closingTurn = turnBeats(THREAD[6], false);
const summaryTurn = turnBeats(THREAD[7], false);
const PROMPT_TYPE_DELAY = 0.5;

const ceilTo = (n: number, step = 0.5) => Math.ceil(n / step) * step;

/* ───────────── Slides ───────────── */

export const SLIDES: DeckSlide[] = [
  {
    id: "cover",
    part: 0,
    title: "Cover",
    render: () => (
      <div className="flex size-full flex-col justify-between px-24 py-16">
        <p className="font-mono text-sm tracking-[0.3em] text-glow-1 uppercase">
          Dev refinement · motion & interaction spec
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-[88px] leading-[96px] font-bold text-cream">Rewind 2026</h1>
          <p className="max-w-[760px] text-xl leading-8 text-on-accent/70">
            Everything that moves in the prototype, what triggers it, and the exact numbers: typing pace, colours,
            durations, easing, and when the bottom sheet shows.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {PARTS.map((p) => (
            <div key={p.n} className="flex flex-col gap-1 rounded-2xl border border-on-accent/10 bg-on-accent/5 p-5">
              <p className="font-mono text-xs text-glow-1">0{p.n}</p>
              <p className="text-xl font-semibold text-on-accent">{p.name}</p>
              <p className="text-sm text-on-accent/55">{p.range}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "basics",
    part: 0,
    title: "Ground rules",
    render: () => (
      <Slide
        eyebrow="Applies to every screen"
        title="Ground rules"
        lead="Build at 1× on a 393 × 852 iPhone 16 frame. All timings below are in seconds and come straight from the prototype code."
        aside={
          <div className="flex w-[470px] flex-col gap-2">
            <EaseCurve
              name="Ease out (quint)"
              curve={easeOutQuint}
              use="Anything entering: bubbles, cards, sheets sliding up."
            />
            <EaseCurve
              name="Ease in (cubic)"
              curve={easeInCubic}
              use="Anything leaving: sheets dropping, intro lines, orb exit."
            />
            <EaseCurve
              name="Ease in-out (sine)"
              curve={easeInOutSine}
              use="Loading bar + the Loading → Start settle."
            />
            <EaseCurve
              name="Ease in-out (cubic)"
              curve={easeInOutCubic}
              use="Big moves: dome exit, chat scroll glides."
            />
            <EaseCurve name="Ease out (expo)" curve={easeOutExpo} use="Number count-ups on the cards." />
          </div>
        }
      >
        <Specs
          rows={[
            [
              "Frame",
              <>
                iPhone 16 · <V>393 × 852</V> · design at 1×
              </>,
            ],
            ["Font", <>Plus Jakarta Sans (Vietnamese subset) · SF Pro only for the status bar and the dome label</>],
            [
              "Background",
              <>
                Loading <V>#000000</V> · everything after <V>#FFEEDD</V> (cream)
              </>,
            ],
            [
              "Loops",
              <>
                Every ambient loop shares one <V>2s</V> cycle (the light sweep is <V>2.6s</V>)
              </>,
            ],
            [
              "Reduced motion",
              <>
                Durations go to <V>0</V>: text shows at once, sheets appear without sliding
              </>,
            ],
          ]}
        />
        <Rules
          items={[
            <>
              Things <b>entering</b> ease out (fast, then settle). Things <b>leaving</b> ease in (slow, then gone).
            </>,
            <>Text never appears all at once. It types word by word with the same rule everywhere (Part 2).</>,
            <>The bottom sheet never covers text that is still typing. It shows only after the last word lands.</>,
            <>The chat is a real scroll area. Content scrolls under the floating sheet and the header.</>,
          ]}
        />
      </Slide>
    ),
  },

  /* ───────── Part 1: Intro ───────── */
  {
    id: "p1",
    part: 1,
    title: "Part 1 · Intro",
    render: () => (
      <PartCover
        n="01"
        name="Intro"
        range="Loading → Start"
        points={[
          "Loading screen and its progress bar",
          "The dome and its 4 ambient loops",
          "The Loading → Start transition (one shared 1.4s settle)",
          "The Start greeting typing in",
        ]}
      />
    ),
  },
  {
    id: "loading",
    part: 1,
    title: "Loading screen",
    render: () => (
      <Slide
        eyebrow="Part 1 · Intro"
        title="Loading screen"
        lead="No tap needed. The bar shows real loading progress; when loading finishes, the screen settles into Start on its own."
        aside={<IntroDemo />}
      >
        <Specs
          rows={[
            [
              "Background",
              <>
                <V>#000000</V> with the dropping-star field (5 layers, <V>2s</V> loop)
              </>,
            ],
            [
              "Eyebrow",
              <>
                “Nhìn lại” · 24/32 Light · cream <V>#FFEEDD</V>
              </>,
            ],
            [
              "2026 mark",
              <>
                Cream SVG · <V>189 × 55</V>
              </>,
            ],
            [
              "Progress track",
              <>
                <V>124px</V> wide · 1px padding · white 30% · fully rounded
              </>,
            ],
            [
              "Progress fill",
              <>
                <V>2px</V> tall · cream · fill width follows real loading progress, <V>0 → 100%</V>
              </>,
            ],
            [
              "Duration",
              <>
                Unknown: depends on real loading. The prototype fakes it with <V>{sec(LOADING_DURATION)}</V>, which is
                not a spec.
              </>,
            ],
            [
              "Dome",
              <>
                1000px pill · gradient <V>#B81F14</V> (to 50%) → <V>#FFB165</V> · inner glow
              </>,
            ],
            [
              "Dome label",
              <>
                “Đang tải” · SF Pro Semibold 20/28 · <V>#1A1A1A</V> · not tappable
              </>,
            ],
          ]}
        />
        <Callout>
          When loading reaches 100%, go straight to Start. Everything on the next slide is timed from that moment,
          however long loading took.
        </Callout>
      </Slide>
    ),
  },
  {
    id: "dome",
    part: 1,
    title: "The dome · ambient loops",
    render: () => (
      <Slide
        eyebrow="Part 1 · Intro"
        title="The dome: four loops, always running"
        lead="These run from Loading until the dome leaves the screen. They never start or stop, so there is nothing to sync."
        aside={<DomeDemo />}
      >
        <Specs
          labelWidth="w-[120px]"
          rows={[
            [
              "Orb",
              <>
                7 blurred pills stacked from <V>#B81F14</V> (outside) to <V>#FFB165</V> (centre). Each spins{" "}
                <V>−180°</V> and breathes scale <V>1 → 1.2 → 1</V> every <V>2s</V>, linear.
              </>,
            ],
            [
              "Track dots",
              <>
                44 dots (1px) tracing a pill around the label. A bright dot runs the lap once per <V>2s</V>: scale{" "}
                <V>4 → 3 → 2 → 1</V> as a trail.
              </>,
            ],
            [
              "Light sweep",
              <>
                White bar <V>678 × 96</V>, blur <V>24</V>, tilted <V>−30°</V>, overlay blend. Travels top → bottom over{" "}
                <V>2.6s</V> ease in-out, repeat. It starts and ends <b>outside</b> the dome, so the restart is never
                seen.
              </>,
            ],
            [
              "Dropping stars",
              <>
                5 star layers drift down 50–75px and fade, staggered, on the shared <V>2s</V> loop.
              </>,
            ],
          ]}
        />
        <Callout>Light sweep: never let it pop in at a corner. It must enter and leave fully off the dome.</Callout>
      </Slide>
    ),
  },
  {
    id: "settle",
    part: 1,
    title: "Loading → Start",
    render: () => {
      // t = 0 is the moment loading completes (its real duration varies)
      const L = 0;
      const S = SETTLE_DURATION;
      const beats: Beat[] = [
        { label: "“Nhìn lại” + bar fade out", at: L, dur: LOADING_FADE, kind: "exit" },
        { label: "Background black → cream", at: L, dur: S, kind: "enter" },
        { label: "2026 grows + glides up", at: L, dur: S, kind: "move" },
        { label: "2026 cream → black", at: L, dur: S, kind: "enter" },
        { label: "Status bar → dark icons", at: L, dur: S, kind: "enter" },
        { label: "Stars fade out", at: L, dur: S, kind: "exit" },
        { label: "Dome rises to Start spot", at: L, dur: S, kind: "move" },
        { label: "Label Đang tải → Bắt đầu", at: L, dur: 0.4, kind: "enter" },
        { label: "Greeting types", at: L + S, dur: typeDuration(greetingWords), kind: "type" },
      ];
      return (
        <Slide
          eyebrow="Part 1 · Intro"
          title="Loading → Start: one settle, everything together"
          lead={
            <>
              Everything that moves shares <b>one</b> transition: <V>{sec(S)}</V>, ease in-out sine. <b>0s</b> is the
              moment loading completes, however long that takes. Nothing is staggered, and that keeps it calm.
            </>
          }
        >
          <Timeline beats={beats} total={ceilTo(L + S + typeDuration(greetingWords))} />
          <Specs
            rows={[
              [
                "2026 size",
                <>
                  <V>189 × 55</V> → <V>311 × 90.74</V>, cream SVG crossfades to the black SVG
                </>,
              ],
              [
                "Fade-outs",
                <>
                  “Nhìn lại” and the bar just fade (<V>{sec(LOADING_FADE)}</V>), no movement
                </>,
              ],
              [
                "Label",
                <>
                  Crossfade <V>0.2s</V> out + <V>0.2s</V> in. “Bắt đầu” becomes the tap target.
                </>,
              ],
            ]}
          />
        </Slide>
      );
    },
  },
  {
    id: "greeting",
    part: 1,
    title: "Start greeting",
    render: () => (
      <Slide
        eyebrow="Part 1 · Intro"
        title="Start greeting types in after the 2026 lands"
        lead={
          <>
            “Chuyện trò chút nhé / Quang ơi” uses the same word-by-word typing as the chat (full rule in Part 2). It
            waits for the settle to finish (<V>{sec(SETTLE_DURATION)}</V>).
          </>
        }
        aside={<GreetingDemo />}
      >
        <Specs
          rows={[
            ["Style", <>24/32 Medium · black · centred · one line each</>],
            [
              "Pace",
              <>
                One new word every <V>{sec(WORD_INTERVAL)}</V>
              </>,
            ],
            ["Line 2", <>Continues the word count with no pause, so “Quang” starts right after “nhé”</>],
            ["Dimming", <>None: the greeting stays at 100%</>],
            ["Name", <>“Quang” is the user’s name, filled in from data</>],
          ]}
        />
      </Slide>
    ),
  },

  /* ───────── Part 2: Warm-up ───────── */
  {
    id: "p2",
    part: 2,
    title: "Part 2 · Warm-up",
    render: () => (
      <PartCover
        n="02"
        name="Warm-up"
        range="Start → topic menu"
        points={[
          "Tapping “Bắt đầu”: dome out, orb in",
          "The typing rule (pace, blur, colour, dimming)",
          "The orb while text types",
          "When the bottom sheet shows, and how it moves",
        ]}
      />
    ),
  },
  {
    id: "tap-start",
    part: 2,
    title: "Tap “Bắt đầu”",
    render: () => {
      const D = DOME_EXIT_DURATION;
      const beats: Beat[] = [
        { label: "Dome slides up and out", at: 0, dur: D, kind: "move" },
        { label: "2026 + greeting vanish", at: 0.49, dur: START_CONTENT_EXIT, kind: "exit", note: "dome-linked" },
        { label: "Chat orb rises from below", at: 0.69, dur: D - 0.69, kind: "enter", note: "dome-linked" },
        { label: "Chat screen fades in", at: D, dur: SCREEN_FADE, kind: "enter" },
        { label: "Orb swells to 1.25", at: D, dur: ORB_GROW, kind: "move" },
        { label: "Line 1 types", at: D, dur: typeDuration(INTRO_LINES[0]), kind: "type" },
      ];
      return (
        <Slide
          eyebrow="Part 2 · Warm-up"
          title="Tap “Bắt đầu”"
          lead="The dome leaves upward, and the chat orb rises from the bottom to take its place."
          aside={<FlowDemo initial={{ name: "start" }} hint="Tap “Bắt đầu”" />}
        >
          <Timeline beats={beats} total={ceilTo(D + typeDuration(INTRO_LINES[0]))} />
          <Rules
            items={[
              <>
                Dome: moves up until its <b>bottom edge passes the top</b> of the screen. <V>{sec(D)}</V>, ease in-out
                cubic.
              </>,
              <>
                2026 mark + greeting: vanish (<V>{sec(START_CONTENT_EXIT)}</V> fade) the moment the dome’s{" "}
                <b>top edge reaches the top</b> of the screen.
              </>,
              <>
                Orb: starts rising when the dome’s bottom edge reaches <b>mid-screen</b>, and lands as the dome clears.
                Drive it from the dome’s position, not from a timer.
              </>,
              <>
                Orb resting spot: <V>640px</V> circle centred on the screen’s bottom edge (x <V>−124</V>, half below the
                fold).
              </>,
              <>
                Chat fades in over <V>{sec(SCREEN_FADE)}</V> while Start stays fully opaque underneath. Fading both at
                once shows a grey flash.
              </>,
            ]}
          />
        </Slide>
      );
    },
  },
  {
    id: "typing",
    part: 2,
    title: "The typing rule",
    render: () => (
      <Slide
        eyebrow="Part 2 · Warm-up · used everywhere"
        title="The typing rule"
        lead="Split the text on spaces. Each word is its own element and starts at a fixed pace, whatever the line length."
        aside={<TypingDemo />}
      >
        <Specs
          labelWidth="w-[130px]"
          rows={[
            [
              "Pace",
              <>
                A new word appears every <V>{sec(WORD_INTERVAL)}</V> (24px lines) or every{" "}
                <V>{sec(THREAD_WORD_INTERVAL)}</V> (14px chat text). At {sec(WORD_INTERVAL)}: word 1 at <V>0s</V>, word
                2 at <V>{sec(WORD_INTERVAL)}</V>, word 3 at <V>{sec(WORD_INTERVAL * 2)}</V>…
              </>,
            ],
            [
              "Reveal",
              <>
                Opacity <V>0 → 1</V> and blur <V>8px → 0</V> over <V>{sec(WORD_REVEAL)}</V>, ease out
              </>,
            ],
            [
              "Colour",
              <>
                <span className="inline-flex items-center gap-1 align-middle">
                  <span className="size-3 rounded-sm bg-glow-1" />
                  <V>#FFB165</V>
                </span>{" "}
                →{" "}
                <span className="inline-flex items-center gap-1 align-middle">
                  <span className="size-3 rounded-sm bg-glow-2" />
                  <V>#C43722</V>
                </span>{" "}
                → resting colour over <V>{sec(WORD_COLOR)}</V>, ease in-out. Resting is <V>#000000</V> (24px) or{" "}
                <V>#1A1A1A</V> (14px).
              </>,
            ],
            [
              "Line length",
              <>
                <V>(words − 1) × interval + {sec(WORD_REVEAL)}</V>
              </>,
            ],
            ["Tokens", <>Emoji count as a word. Line breaks stay where they are.</>],
          ]}
        />
        <Callout>
          The pace is per word, not per line. A long line takes longer; it never types faster to fit a duration.
        </Callout>
      </Slide>
    ),
  },
  {
    id: "intro-lines",
    part: 2,
    title: "Intro lines + dimming",
    render: () => {
      const beats: Beat[] = [
        { label: "Line 1 types", at: introStarts[0], dur: typeDuration(INTRO_LINES[0]), kind: "type" },
        { label: `Line 1 dims → ${LINE_OPACITY[1] * 100}%`, ...dimSpan(0), kind: "exit" },
        { label: "Line 2 types", at: introStarts[1], dur: typeDuration(INTRO_LINES[1]), kind: "type" },
        { label: `Line 2 dims → ${LINE_OPACITY[1] * 100}%`, ...dimSpan(1), kind: "exit" },
        { label: `Line 1 → ${LINE_OPACITY[2] * 100}%`, at: introStarts[2], dur: DIM_DURATION, kind: "exit" },
        { label: "Line 3 types (stays 100%)", at: introStarts[2], dur: typeDuration(INTRO_LINES[2]), kind: "type" },
        { label: "Topic sheet slides up", at: lastLineTyped, dur: FINALE_DURATION, kind: "enter" },
        { label: `Orb lifts ${-ORB_FINAL_LIFT}px + shrinks`, at: lastLineTyped, dur: FINALE_DURATION, kind: "move" },
      ];
      return (
        <Slide
          eyebrow="Part 2 · Warm-up"
          title="Intro lines: type, wait, dim"
          lead="Three lines in sequence. Older lines fade back so the newest one reads first."
          aside={<FlowDemo initial={{ name: "chat", step: 0 }} hint="Tap anywhere to skip ahead" />}
        >
          <Timeline beats={beats} total={ceilTo(lastLineTyped + FINALE_DURATION, 1)} step={1} />
          <Rules
            items={[
              <>
                Next line starts when the current one has typed <b>+ {sec(DIM_DELAY)}</b>. A tap anywhere skips to the
                next line.
              </>,
              <>
                Each word holds for <V>{sec(DIM_DELAY)}</V> after it appears, then fades to{" "}
                <V>{LINE_OPACITY[1] * 100}%</V> over <V>{sec(DIM_DURATION)}</V>. Two lines back drops to{" "}
                <V>{LINE_OPACITY[2] * 100}%</V>.
              </>,
              <>
                The last line (“Giờ mình kể Quang nghe nhé…”) <b>never dims</b>.
              </>,
              <>
                Lines: 24/32 Medium black, 16px apart, starting <V>{TOP_INSET}px</V> from the top (98px bar + 16).
              </>,
            ]}
          />
        </Slide>
      );
    },
  },
  {
    id: "orb",
    part: 2,
    title: "The orb while typing",
    render: () => (
      <Slide
        eyebrow="Part 2 · Warm-up"
        title="The orb reacts to typing"
        lead="The orb is the speaker. It swells and swirls only while Tech Tech is typing, and rests between lines."
        aside={<OrbDemo />}
      >
        <Specs
          labelWidth="w-[140px]"
          rows={[
            [
              "Line starts",
              <>
                Scale <V>1 → {ORB_TYPING_SCALE}</V> over <V>{sec(ORB_GROW)}</V>, ease out. Swirl loop blends in over{" "}
                <V>{sec(BLEND_IN)}</V>.
              </>,
            ],
            [
              "While typing",
              <>
                Holds at <V>{ORB_TYPING_SCALE}</V>, swirling: <V>−180°</V> + breathe <V>1 → 1.2 → 1</V> per <V>2s</V>
              </>,
            ],
            [
              "Line finishes",
              <>
                Scale back to <V>1</V> over <V>{sec(ORB_SHRINK)}</V>, ease in-out. Swirl eases to rest over{" "}
                <V>{sec(BLEND_OUT)}</V>, settling on a matching pose (no snap).
              </>,
            ],
            ["Between lines", <>Still. No pulsing while waiting.</>],
            [
              "After last line",
              <>
                Shrinks over <V>{sec(FINALE_DURATION)}</V> (ease out quint) <b>and</b> lifts <V>{-ORB_FINAL_LIFT}px</V>,
                together with the topic sheet rising.
              </>,
            ],
          ]}
        />
        <Callout>Chat orb colours run the other way from the dome: light #FFB165 outside, deep #B81F14 centre.</Callout>
      </Slide>
    ),
  },
  {
    id: "sheet-rules",
    part: 2,
    title: "When the bottom sheet shows",
    render: () => (
      <Slide
        eyebrow="Part 2 · Warm-up · used everywhere"
        title="When the bottom sheet shows"
        lead="The sheet is how the user answers. It appears only when Tech Tech has finished talking."
      >
        <div className="grid grid-cols-2 gap-8">
          <Rules
            items={[
              <>
                <b>Show</b> the sheet only after the <b>last word</b> of Tech Tech’s message has fully appeared.
              </>,
              <>
                <b>Enter:</b> slide up from <V>y 100% → 0</V>, <V>{sec(FINALE_DURATION)}</V>, ease out quint.
              </>,
              <>
                <b>On tap:</b> the sheet slides down at once (<V>{sec(ANSWERS_EXIT)}</V>, ease in cubic) and the user’s
                bubble appears at <V>{sec(NEXT_BUBBLE_AT)}</V>.
              </>,
              <>Only one sheet at a time. The next one comes back with new content after the turn finishes.</>,
              <>
                <b>End of flow:</b> no sheet. The last message rests <V>{END_GAP}px</V> above the screen bottom.
              </>,
            ]}
          />
          <Specs
            labelWidth="w-[120px]"
            rows={[
              ["Position", <>Floats over the chat. Messages scroll on underneath it.</>],
              [
                "Backdrop",
                <>
                  Fade cream 0% → 100% behind the card, plus <V>34px</V> for the home indicator
                </>,
              ],
              [
                "Card",
                <>
                  Cream <V>55%</V> · backdrop blur <V>50</V> · radius <V>24</V> · 16px margin
                </>,
              ],
              [
                "Stroke",
                <>
                  1px gradient <V>#303030</V> 29% (top) → 0% (bottom)
                </>,
              ],
              [
                "Rows",
                <>
                  14/20 Semibold · 16px vertical padding · hairline <V>#303030</V> 10%
                </>,
              ],
              ["Tap", <>Whole row is the target, not just the label</>],
            ]}
          />
        </div>
      </Slide>
    ),
  },
  {
    id: "sheet-kinds",
    part: 2,
    title: "Sheet variants",
    render: () => (
      <Slide
        eyebrow="Part 2 · Warm-up · used everywhere"
        title="Three sheet variants, one container"
        lead="Same glass card and motion every time. Only the content changes, driven by what the turn asks next."
      >
        <SheetGallery />
        <Specs
          labelWidth="w-[120px]"
          rows={[
            [
              "Topic list",
              <>
                Topic icon (24px on a cream #FFEEDD 8px-radius tile) + label + arrow. Icons: bag · wallet · chat-heart.
              </>,
            ],
            [
              "Answers",
              <>
                Label + radio (unselected: 20px <V>#FFF2E7</V>, 29% outline). Tapping a row answers.
              </>,
            ],
            [
              "Prompt",
              <>The next question sits in the sheet with a black “Gửi” pill. Sending it becomes the user’s message.</>,
            ],
          ]}
        />
      </Slide>
    ),
  },

  /* ───────── Part 3: Topic detail ───────── */
  {
    id: "p3",
    part: 3,
    title: "Part 3 · Topic detail",
    render: () => (
      <PartCover
        n="03"
        name="Topic detail"
        range="Topic → data cards"
        points={[
          "Picking a topic: clearing the warm-up",
          "Anatomy of a turn: bubble → reply → card → question → sheet",
          "The scroll rule: park the new message under the top bar",
          "Cards and the number count-up rule",
        ]}
      />
    ),
  },
  {
    id: "pick-topic",
    part: 3,
    title: "Picking a topic",
    render: () => {
      const t = first;
      const beats: Beat[] = [
        { label: "Intro lines slide up + fade", at: 0, dur: INTRO_EXIT, kind: "exit" },
        { label: "Topic sheet slides down", at: 0, dur: MENU_EXIT, kind: "exit" },
        { label: "Orb slides off the bottom", at: 0, dur: ORB_EXIT, kind: "exit" },
        { label: "User bubble enters", at: t.bubbleAt, dur: BUBBLE_ENTER, kind: "enter" },
        { label: "Reply types", at: t.replyAt, dur: t.replyDur, kind: "type" },
        { label: "Card enters", at: t.cardAt!, dur: CARD_ENTER, kind: "enter" },
        { label: "Numbers count up", at: t.cardAt! + COUNT_DELAY, dur: COUNT_DURATION, kind: "count" },
        { label: "Question types", at: t.questionAt, dur: t.questionDur, kind: "type" },
        { label: "Answer sheet slides up", at: t.sheetAt, dur: FINALE_DURATION, kind: "enter" },
      ];
      return (
        <Slide
          eyebrow="Part 3 · Topic detail"
          title="Tap “Chuyện tiêu xài”"
          lead="The warm-up clears in half a second, then the topic’s first turn plays from the top of the screen."
          aside={
            <FlowDemo
              initial={{ name: "chat", step: LAST_STEP, startAt: "menu" }}
              hint="Pick “Chuyện tiêu xài”, then answer"
            />
          }
        >
          <Timeline beats={beats} total={ceilTo(t.sheetAt + FINALE_DURATION, 1)} step={1} />
          <Specs
            labelWidth="w-[120px]"
            rows={[
              [
                "Intro lines",
                <>
                  Move <V>{INTRO_EXIT_Y}px</V> up and fade, <V>{sec(INTRO_EXIT)}</V>, ease in cubic. Then removed, so
                  the chat starts at the top.
                </>,
              ],
              [
                "Orb",
                <>
                  Slides down until fully off-screen (incl. blur), <V>{sec(ORB_EXIT)}</V>, ease in cubic. It does not
                  come back.
                </>,
              ],
              [
                "First bubble",
                <>
                  At <V>{sec(FIRST_BUBBLE_AT)}</V>, as the intro finishes leaving. It sits <V>{TOP_INSET}px</V> from the
                  top.
                </>,
              ],
            ]}
          />
        </Slide>
      );
    },
  },
  {
    id: "turn",
    part: 3,
    title: "Anatomy of a turn",
    render: () => {
      const t = second;
      const beats: Beat[] = [
        { label: "Answer sheet slides down", at: 0, dur: ANSWERS_EXIT, kind: "exit" },
        { label: "User bubble enters", at: t.bubbleAt, dur: BUBBLE_ENTER, kind: "enter" },
        { label: "Chat glides: bubble to top", at: t.bubbleAt, dur: SCROLL_DURATION, kind: "move" },
        { label: "Reply types", at: t.replyAt, dur: t.replyDur, kind: "type" },
        { label: "Card enters", at: t.cardAt!, dur: CARD_ENTER, kind: "enter" },
        { label: "Question types", at: t.questionAt, dur: t.questionDur, kind: "type" },
        { label: "Answer sheet slides up", at: t.sheetAt, dur: FINALE_DURATION, kind: "enter" },
      ];
      return (
        <Slide
          eyebrow="Part 3 · Topic detail"
          title="Anatomy of a turn"
          lead={<>Every exchange is the same five beats. Example: tapping “Em út nết na”.</>}
        >
          <Timeline beats={beats} total={ceilTo(t.sheetAt + FINALE_DURATION, 1)} step={1} />
          <div className="grid grid-cols-2 gap-8">
            <Specs
              labelWidth="w-[96px]"
              rows={[
                [
                  "1 · Bubble",
                  <>
                    <V>{sec(NEXT_BUBBLE_AT)}</V> after the tap. Fade + blur 8→0 + <V>y 16→0</V> + scale <V>0.96→1</V>,{" "}
                    <V>{sec(BUBBLE_ENTER)}</V>
                  </>,
                ],
                [
                  "2 · Reply",
                  <>
                    Bubble + <V>{sec(REPLY_GAP)}</V>. Types at <V>{sec(THREAD_WORD_INTERVAL)}</V>/word, never dims.
                  </>,
                ],
                [
                  "3 · Card",
                  <>
                    Reply typed + <V>{sec(CARD_GAP)}</V>. Fade + blur + <V>y 24→0</V> + scale <V>0.97→1</V>,{" "}
                    <V>{sec(CARD_ENTER)}</V>
                  </>,
                ],
              ]}
            />
            <Specs
              labelWidth="w-[96px]"
              rows={[
                [
                  "4 · Question",
                  <>
                    Card start + <V>{sec(QUESTION_GAP)}</V> (or reply typed + <V>{sec(CARD_GAP)}</V> with no card)
                  </>,
                ],
                [
                  "5 · Sheet",
                  <>
                    The moment the question’s last word lands. Slide up <V>{sec(FINALE_DURATION)}</V>.
                  </>,
                ],
                [
                  "Bubble style",
                  <>
                    Right-aligned, max <V>305px</V>, 1px black border, radius <V>24</V>, padding 16, 14/20 Medium
                  </>,
                ],
              ]}
            />
          </div>
        </Slide>
      );
    },
  },
  {
    id: "scroll",
    part: 3,
    title: "The scroll rule",
    render: () => (
      <Slide
        eyebrow="Part 3 · Topic detail"
        title="The scroll rule: park the new message at the top"
        lead="When the user sends a message, the whole chat pushes up in one smooth glide until that bubble sits 16px under the top bar."
        aside={<ScrollDiagram />}
      >
        <Rules
          items={[
            <>
              Target: bubble top at <V>{TOP_INSET}px</V> (98px top bar + 16). One glide, <V>{sec(SCROLL_DURATION)}</V>,
              ease in-out cubic.
            </>,
            <>
              Glide <b>once</b> to a fixed target. Do not re-glide every time content below grows; that causes the
              stuttering “push in steps”.
            </>,
            <>
              The bubble stays parked while the reply, card and question fill in below it. Reserve empty space at the
              end of the chat so the bubble can reach the top even when there is little content under it.
            </>,
            <>
              When the turn ends, the chat follows its bottom: the last message clears the sheet by 16px. Shrink the
              reserved space <b>after</b> gliding, never before (that would jump).
            </>,
            <>
              If the user scrolls up, stop auto-scrolling. Resume when they are back at the bottom or send the next
              message.
            </>,
          ]}
        />
        <Callout>
          Header: cream, solid for the top 75%, fading to transparent, so messages slide under it softly.
        </Callout>
      </Slide>
    ),
  },
  {
    id: "prompt-turn",
    part: 3,
    title: "Prompt turns",
    render: () => {
      const t = promptTurn;
      const beats: Beat[] = [
        { label: "Answer sheet slides down", at: 0, dur: ANSWERS_EXIT, kind: "exit" },
        { label: "User bubble enters", at: t.bubbleAt, dur: BUBBLE_ENTER, kind: "enter" },
        { label: "Reply types", at: t.replyAt, dur: t.replyDur, kind: "type" },
        { label: "Card enters", at: t.cardAt!, dur: CARD_ENTER, kind: "enter" },
        { label: "Prompt sheet slides up", at: t.sheetAt, dur: FINALE_DURATION, kind: "enter" },
      ];
      return (
        <Slide
          eyebrow="Part 3 · Topic detail"
          title="Turns that end with a prompt"
          lead="Some turns don’t ask a question in the chat. The next question sits in the sheet, and the user sends it."
        >
          <Timeline beats={beats} total={ceilTo(t.sheetAt + FINALE_DURATION, 1)} step={1} />
          <Rules
            items={[
              <>
                No question line, so the sheet comes up <V>{sec(QUESTION_GAP)}</V> after the card starts.
              </>,
              <>Tapping “Gửi” sends the prompt text as the user’s bubble and starts the next turn as usual.</>,
              <>
                After the last card of a topic, the sheet switches to a topic list (“Kể mình nghe tiếp”) with the topics
                not yet visited.
              </>,
            ]}
          />
        </Slide>
      );
    },
  },
  {
    id: "thread-map",
    part: 3,
    title: "Thread map",
    render: () => (
      <Slide
        eyebrow="Part 3 · Topic detail"
        title="The whole thread, as data"
        lead="Each turn is one record: what the user tapped, which card shows, and which sheet comes next. Build the chat from data like this, not hard-coded screens."
      >
        <FlowTable />
        <Callout>
          Turn shape: <V>trigger</V> · <V>userMessage</V> · <V>reply</V> · <V>card?</V> · <V>next</V> where next is{" "}
          <V>answers</V> | <V>prompt</V> | <V>topics</V> | <V>end</V>.
        </Callout>
      </Slide>
    ),
  },
  {
    id: "cards",
    part: 3,
    title: "Cards + count-up",
    render: () => (
      <Slide
        eyebrow="Part 3 · Topic detail"
        title="One rule for every number"
        lead="Every number on a card counts up from 0 when the card appears. Same timing for every card."
        aside={<CardEntranceDemo card="spending" />}
      >
        <Specs
          labelWidth="w-[110px]"
          rows={[
            [
              "Start",
              <>
                <V>{sec(COUNT_DELAY)}</V> after the card starts entering
              </>,
            ],
            [
              "Duration",
              <>
                <V>{sec(COUNT_DURATION)}</V>, ease out expo: fast at first, easing into the final value
              </>,
            ],
            [
              "Format",
              <>
                Keep the final format while counting: thousand separators (<V>45,678,000</V>), decimals (<V>3.8</V>,{" "}
                <V>12.4</V>)
              </>,
            ],
            ["Digits", <>Tabular (fixed-width) digits so centred numbers don’t wobble</>],
            ["Only digits", <>Words and units stay put: “VND”, “triệu”, “ngày”, “Tr”, “nơi khác nhau”</>],
            ["Not counted", <>Ranks like “Top 1”, “Top 2”</>],
          ]}
        />
        <Callout>
          Cards are full chat width (361px), radius 16–24, gradient backgrounds from tokens. See the next slide.
        </Callout>
      </Slide>
    ),
  },
  {
    id: "card-gallery",
    part: 3,
    title: "Card catalogue",
    render: () => (
      <Slide
        eyebrow="Part 3 · Topic detail"
        title="Card catalogue"
        lead="All five topic cards, live. Each number uses the count-up rule."
      >
        <CardGallery />
        <div className="grid grid-cols-5 gap-4">
          {[
            [
              "Spending",
              "spend-1…4",
              "bg-[linear-gradient(0deg,var(--color-spend-1),var(--color-spend-2),var(--color-spend-3),var(--color-spend-4))]",
            ],
            [
              "Fashion",
              "fashion-1…5",
              "bg-[linear-gradient(180deg,var(--color-fashion-1),var(--color-fashion-2),var(--color-fashion-3),var(--color-fashion-4),var(--color-fashion-5))]",
            ],
            [
              "Compare",
              "compare-1…4",
              "bg-[linear-gradient(0deg,var(--color-compare-1),var(--color-compare-2),var(--color-compare-3),var(--color-compare-4))]",
            ],
            [
              "Brands",
              "brands-1…5",
              "bg-[linear-gradient(180deg,var(--color-brands-1),var(--color-brands-2),var(--color-brands-3),var(--color-brands-4),var(--color-brands-5))]",
            ],
            [
              "Supermarket",
              "market-1…5",
              "bg-[linear-gradient(180deg,var(--color-market-1),var(--color-market-2),var(--color-market-3),var(--color-market-4),var(--color-market-5))]",
            ],
          ].map(([name, token, fill]) => (
            <Swatch key={name} fill={fill} name={`${name} gradient`} value={token} />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ───────── Part 4: Wrap-up ───────── */
  {
    id: "p4",
    part: 4,
    title: "Part 4 · Wrap-up",
    render: () => (
      <PartCover
        n="04"
        name="Wrap-up"
        range="All topics done → summary"
        points={[
          "When the summary prompt appears",
          "The prompt typing itself into the sheet",
          "The summary card and how the flow ends",
        ]}
      />
    ),
  },
  {
    id: "summary-prompt",
    part: 4,
    title: "The summary prompt",
    render: () => {
      const t = closingTurn;
      const prompt = THREAD[6].next.kind === "prompt" ? THREAD[6].next.prompt : "";
      const beats: Beat[] = [
        { label: "User bubble enters", at: t.bubbleAt, dur: BUBBLE_ENTER, kind: "enter" },
        { label: "Reply types", at: t.replyAt, dur: t.replyDur, kind: "type" },
        { label: "Prompt sheet slides up", at: t.sheetAt, dur: FINALE_DURATION, kind: "enter" },
        { label: "Prompt types in the sheet", at: t.sheetAt + PROMPT_TYPE_DELAY, dur: thread(prompt), kind: "type" },
      ];
      return (
        <Slide
          eyebrow="Part 4 · Wrap-up"
          title="After the last topic, the sheet suggests the summary"
          lead={
            <>
              Once all three topics are done, the sheet doesn’t offer more topics. It types <b>“{prompt}”</b> into
              itself, with the “Gửi” button.
            </>
          }
          aside={<TypedPromptDemo />}
        >
          <Timeline beats={beats} total={ceilTo(t.sheetAt + PROMPT_TYPE_DELAY + thread(prompt), 1)} step={1} />
          <Rules
            items={[
              <>Trigger: the last topic’s final turn has ended. Topic order doesn’t matter; it is “all visited”.</>,
              <>
                The prompt starts typing <V>{sec(PROMPT_TYPE_DELAY)}</V> after the sheet starts rising, at{" "}
                <V>{sec(THREAD_WORD_INTERVAL)}</V>/word, 14/20 Regular.
              </>,
              <>Tapping “Gửi” plays a normal turn (bubble → reply → card).</>,
            ]}
          />
          <Callout tone="warn">
            Topics 2 and 3 (“Chuyện tiền tài”, “Chuyện thương ai”) are placeholders (“Same chat flow”). They follow
            exactly the Part 3 rules once designed.
          </Callout>
        </Slide>
      );
    },
  },
  {
    id: "summary",
    part: 4,
    title: "Summary + end",
    render: () => {
      const t = summaryTurn;
      const endAt = t.cardAt! + QUESTION_GAP;
      const beats: Beat[] = [
        { label: "Prompt sheet slides down", at: 0, dur: ANSWERS_EXIT, kind: "exit" },
        { label: "User bubble enters", at: t.bubbleAt, dur: BUBBLE_ENTER, kind: "enter" },
        { label: "Reply types", at: t.replyAt, dur: t.replyDur, kind: "type" },
        { label: "Summary card enters", at: t.cardAt!, dur: CARD_ENTER, kind: "enter" },
        { label: "Numbers count up", at: t.cardAt! + COUNT_DELAY, dur: COUNT_DURATION, kind: "count" },
        { label: `Chat settles, ${END_GAP}px gap`, at: endAt, dur: SCROLL_DURATION, kind: "move" },
      ];
      return (
        <Slide
          eyebrow="Part 4 · Wrap-up"
          title="The summary card ends the flow"
          lead="No sheet after the summary. The card is the last thing on screen."
          aside={<CardEntranceDemo card="summary" />}
        >
          <Timeline beats={beats} total={ceilTo(endAt + SCROLL_DURATION, 1)} step={1} />
          <Specs
            labelWidth="w-[110px]"
            rows={[
              ["Reply", <>“{THREAD[7].reply}”</>],
              ["Card", <>3:4 · persona title + 3 frosted pills (white 35%) · “Chia sẻ ngay” share button</>],
              [
                "Counts",
                <>
                  The amounts in the pills count up (same rule): <V>26,485,500</V>, <V>5,670,000</V>
                </>,
              ],
              [
                "End state",
                <>
                  No bottom sheet. The card’s bottom rests <V>{END_GAP}px</V> above the screen bottom.
                </>,
              ],
            ]}
          />
        </Slide>
      );
    },
  },

  /* ───────── Reference ───────── */
  {
    id: "tokens",
    part: 0,
    title: "Colours",
    render: () => (
      <Slide
        eyebrow="Reference"
        title="Colour tokens"
        lead="Use tokens, not raw values. Names match globals.css in the prototype."
      >
        <div className="grid grid-cols-4 gap-x-6 gap-y-4">
          <Swatch fill="bg-brand-primary" name="brand-primary" value="#000000" />
          <Swatch fill="bg-cream" name="cream (screen bg)" value="#FFEEDD" />
          <Swatch fill="bg-text-primary" name="text-primary" value="#1A1A1A" />
          <Swatch fill="bg-on-accent" name="on-accent" value="#FFFFFF" />
          <Swatch fill="bg-glow-1" name="glow-1 (typing)" value="#FFB165" />
          <Swatch fill="bg-glow-2" name="glow-2 (typing)" value="#C43722" />
          <Swatch fill="bg-glass" name="glass (sheet)" value="#FFEEDD · 55%" />
          <Swatch fill="bg-stroke" name="stroke" value="#303030" />
          <Swatch fill="bg-radio" name="radio" value="#FFF2E7" />
          <Swatch fill="bg-frost" name="frost (card pills)" value="#FFFFFF · 35%" />
          <Swatch fill="bg-key-from" name="key-from (dome)" value="#B81F14" />
          <Swatch fill="bg-key-to" name="key-to (dome)" value="#FFB165" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] tracking-wider text-on-accent/50 uppercase">
            Orb layers · ember-1 → ember-7
          </p>
          <div className="flex h-10 overflow-hidden rounded-xl">
            {["bg-ember-1", "bg-ember-2", "bg-ember-3", "bg-ember-4", "bg-ember-5", "bg-ember-6", "bg-ember-7"].map(
              (c) => (
                <div key={c} className="flex-1">
                  <div className={`size-full ${c}`} />
                </div>
              ),
            )}
          </div>
          <p className="font-mono text-[10px] text-on-accent/50">
            #FFB165 · #F39958 · #E7804A · #DC683D · #D0502F · #C43722 · #B81F14
          </p>
        </div>
      </Slide>
    ),
  },
  {
    id: "cheatsheet",
    part: 0,
    title: "Timing cheat sheet",
    render: () => (
      <Slide eyebrow="Reference" title="Timing cheat sheet">
        <div className="grid grid-cols-3 gap-6">
          <Specs
            labelWidth="w-[150px]"
            rows={[
              ["Loading bar", "real progress"],
              ["Loading → Start", sec(SETTLE_DURATION)],
              ["Dome exit", sec(DOME_EXIT_DURATION)],
              ["Screen crossfade", sec(SCREEN_FADE)],
              ["Ambient loop", "2s (light 2.6s)"],
            ]}
          />
          <Specs
            labelWidth="w-[150px]"
            rows={[
              ["Word pace 24px", sec(WORD_INTERVAL)],
              ["Word pace 14px", sec(THREAD_WORD_INTERVAL)],
              ["Word reveal", sec(WORD_REVEAL)],
              ["Word colour", sec(WORD_COLOR)],
              ["Dim after / fade", `${sec(DIM_DELAY)} / ${sec(DIM_DURATION)}`],
              ["Orb grow / shrink", `${sec(ORB_GROW)} / ${sec(ORB_SHRINK)}`],
            ]}
          />
          <Specs
            labelWidth="w-[150px]"
            rows={[
              ["Sheet up / down", `${sec(FINALE_DURATION)} / ${sec(ANSWERS_EXIT)}`],
              ["Bubble at", `${sec(FIRST_BUBBLE_AT)} first · ${sec(NEXT_BUBBLE_AT)} later`],
              ["Reply after bubble", sec(REPLY_GAP)],
              ["Card after reply", sec(CARD_GAP)],
              ["Question after card", sec(QUESTION_GAP)],
              ["Scroll glide", sec(SCROLL_DURATION)],
              ["Count-up", `${sec(COUNT_DELAY)} + ${sec(COUNT_DURATION)}`],
            ]}
          />
        </div>
      </Slide>
    ),
  },
  {
    id: "questions",
    part: 0,
    title: "Open questions",
    render: () => (
      <Slide
        eyebrow="For refinement"
        title="Open questions"
        lead="Not decided in the prototype yet. Worth agreeing on before estimating."
      >
        <Rules
          items={[
            <>
              Wrong answers: the prototype only wires the designed answer (e.g. “Em út nết na”). What do the other
              answers do?
            </>,
            <>Topics 2 and 3 have no content yet (“Same chat flow”). Data and cards needed.</>,
            <>Topic order: can users pick topics in any order? Summary unlocks once all three are visited.</>,
            <>“Chia sẻ ngay” share: what gets shared (image of the card? link?) and through which sheet?</>,
            <>Sound button and close (×) in the top bar: behaviour in the real app.</>,
            <>Name for Part 2 (“Warm-up” is a working title).</>,
          ]}
        />
      </Slide>
    ),
  },
];

/* ───────────── Slide-specific diagrams ───────────── */

/** Where things sit while a turn plays: bar, 16px gap, parked bubble, content, floating sheet. */
function ScrollDiagram() {
  return (
    <div className="relative h-[560px] w-[260px] overflow-hidden rounded-[40px] bg-cream ring-1 ring-on-accent/20">
      <div className="absolute inset-x-0 top-0 flex h-[64px] items-end bg-linear-to-b from-cream from-75% to-cream/0 px-4 pb-2">
        <p className="font-mono text-[9px] text-text-primary/60">top bar · 98px</p>
      </div>
      <div className="absolute top-[64px] right-3 left-3 flex h-[11px] items-center justify-center border-y border-dashed border-glow-2">
        <span className="font-mono text-[8px] text-glow-2">16px</span>
      </div>
      <div className="absolute top-[75px] right-3 left-12 rounded-2xl border border-brand-primary px-3 py-2 text-[10px] text-text-primary">
        Em út nết na?
      </div>
      <div className="absolute top-[120px] right-3 left-3 flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded bg-text-primary/30" />
        <div className="h-[130px] rounded-xl bg-linear-to-b from-fashion-1 to-fashion-4" />
        <div className="h-2 w-full rounded bg-text-primary/30" />
        <div className="h-2 w-3/5 rounded bg-text-primary/30" />
      </div>
      <div className="absolute inset-x-3 top-[330px] bottom-[110px] flex items-center justify-center rounded-xl border border-dashed border-text-primary/30">
        <span className="px-4 text-center font-mono text-[9px] leading-3 text-text-primary/50">
          reserved space
          <br />
          (lets the bubble reach the top)
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col bg-linear-to-b from-cream/0 to-cream px-3 pt-4 pb-5">
        <div className="flex flex-col gap-1.5 rounded-2xl bg-glass p-3 ring-1 ring-stroke/20 backdrop-blur-[50px]">
          <div className="h-2 w-1/2 rounded bg-text-primary/40" />
          <div className="h-2 w-2/3 rounded bg-text-primary/40" />
          <div className="h-2 w-1/3 rounded bg-text-primary/40" />
        </div>
        <p className="pt-1.5 text-center font-mono text-[9px] text-text-primary/60">sheet floats on top</p>
      </div>
      <div className="absolute top-[75px] -right-px flex h-[40px] items-center">
        <span className="rounded-l bg-glow-2 px-1 font-mono text-[8px] text-on-accent">{TOP_INSET}px</span>
      </div>
    </div>
  );
}

/** The whole prototype thread as data: what starts each turn, what it shows, what it asks next. */
function FlowTable() {
  const nextLabel = (turn: ThreadTurn) =>
    turn.next.kind === "answers"
      ? "answers"
      : turn.next.kind === "prompt"
        ? turn.next.typed
          ? "typed prompt"
          : "prompt"
        : turn.next.kind === "topics"
          ? "topic list"
          : "end";
  return (
    <table className="w-full table-fixed text-left text-[13px]">
      <thead>
        <tr className="font-mono text-[10px] tracking-wider text-on-accent/50 uppercase">
          <th className="w-8 py-1.5 font-normal">#</th>
          <th className="w-[340px] py-1.5 pr-4 font-normal">The user taps</th>
          <th className="py-1.5 pr-4 font-normal">Tech Tech replies</th>
          <th className="w-[110px] py-1.5 pr-4 font-normal">Card</th>
          <th className="w-[120px] py-1.5 font-normal">Then the sheet</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-on-accent/10 border-y border-on-accent/10">
        {THREAD.map((turn, i) => (
          <tr key={i} className="text-on-accent/85">
            <td className="py-2 font-mono text-on-accent/50">{i + 1}</td>
            <td className="truncate py-2 pr-4">{turn.trigger}</td>
            <td className="truncate py-2 pr-4 text-on-accent/65">{turn.reply}</td>
            <td className="py-2 pr-4 font-mono text-cream">{turn.card ?? "—"}</td>
            <td className="py-2 font-mono">{nextLabel(turn)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
