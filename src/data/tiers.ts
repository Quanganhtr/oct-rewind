import {
  INTRO_LINES,
  STANDARD_TOPIC_SET,
  START_GREETING,
  type ThreadTurn,
  TOPIC_THREADS,
  TOPICS,
  TOPICS_PROMPT,
  type TopicSet,
} from "./rewind";
import {
  PRIORITY_ENDING,
  PRIORITY_GREETING_CARD,
  PRIORITY_THREADS,
  PRIORITY_TOPICS,
  PRIORITY_TOPICS_PROMPT,
  PRIORITY_USER_NAME,
} from "./priority";
import {
  PRIVATE_GREETING_CARD,
  PRIVATE_INTRO_LINES,
  PRIVATE_THREADS,
  PRIVATE_TOPICS,
  PRIVATE_TOPICS_PROMPT,
  PRIVATE_USER_NAME,
} from "./private";

/**
 * A customer tier: the same flow and motion, with its own palette, assets and copy.
 * The palette lives in globals.css as a class that re-points the color tokens.
 */
export interface Tier {
  /** Palette class from globals.css (none = the base tokens). */
  themeClass?: string;
  /** Folder under /public for the tier's icons: nav, arrow, caret, send. */
  assetDir: string;
  /** The line over the Loading 2026 ("Nhìn lại"), and its weight. */
  eyebrow: string;
  eyebrowClass: string;
  /** The 2026 mark: cream on Loading, then grown and cross-faded to the Start version. */
  yearMark: {
    loading: string;
    start: string;
    loadingSize: string;
    startSize: string;
    /** Where the Start mark sits inside the box (Figma insets it slightly on the base tier). */
    startInset: string;
  };
  /** Figma "Start": lines under the 2026 mark. */
  greeting: string[];
  /** Figma "Step 1–3": step n shows the first n + 1 lines. */
  introLines: string[];
  /** Figma "Step 4": heading and topics of the first menu, with each topic's icon. */
  topicsPrompt: string;
  topics: string[];
  topicIcons: Record<string, string>;
  /** Each topic's conversation; a topic without one isn't playable yet. */
  threads: Record<string, ThreadTurn[]>;
  /** What follows a finished topic: the topics left, then the summary (if any). */
  topicSet: TopicSet;
  /** Answer sheet radio as an icon (Figma Priority's gradient ring); unset, the drawn cream one. */
  radioIcon?: string;
  /** Size of the prompt sheet's send button. */
  sendButtonClass: string;
  /** The dome's "Bắt đầu" key, when the tier restyles it: label size, and an icon after the label. */
  startKey?: { labelClass: string; icon: string };
  /** Whether the stage shows the "Dev handoff" link (the deck documents the base tier). */
  handoff: boolean;
  /**
   * Step 4 as a send sheet that types the first topic in, instead of the topic list; sending it
   * starts that topic (Figma Private "Step 61").
   */
  openWithPrompt?: boolean;
  /** The cards' share circle and icon, when not the base white circle with a black icon. */
  shareCircle?: { className: string; icon: string };
  /**
   * How far (px, negative = up) the orb rises from its docked spot (centre on the screen's bottom
   * edge) to rest under the Step 4 sheet. Unset: ChatScreen's ORB_FINAL_LIFT.
   */
  menuOrbLift?: number;
  /** The full-screen card a "greeting" sheet opens at the end: greeting lines, the wish, the art. */
  greetingCard?: {
    lines: string[];
    wish: string;
    image: string;
    /** Size overrides for the greeting lines and the wish (Private's 24px both by default). */
    linesClass?: string;
    wishClass?: string;
  };
}

export type TierId = "standard" | "priority" | "private";

const STANDARD: Tier = {
  assetDir: "/rewind",
  eyebrow: "Nhìn lại",
  eyebrowClass: "font-light",
  yearMark: {
    loading: "/rewind/year-2026-cream.svg",
    start: "/rewind/year-2026-dark.svg",
    loadingSize: "h-[55px] w-[189px]",
    startSize: "h-[90.74px] w-[311px]",
    startInset: "inset-[0_0_0_0.71%]",
  },
  greeting: START_GREETING,
  introLines: INTRO_LINES,
  topicsPrompt: TOPICS_PROMPT,
  topics: TOPICS,
  /** Figma Step 4 topic icons: bag, wallet, chat-heart, briefcase. */
  topicIcons: {
    [TOPICS[0]]: "/rewind/topic-spending.svg",
    [TOPICS[1]]: "/rewind/topic-money.svg",
    [TOPICS[2]]: "/rewind/topic-love.svg",
    [TOPICS[3]]: "/rewind/topic-livelihood.svg",
  },
  threads: TOPIC_THREADS,
  topicSet: STANDARD_TOPIC_SET,
  sendButtonClass: "px-6 py-4",
  handoff: true,
};

/** Figma "Opening" (Priority, node 495:5822) and its topic sections. */
const PRIORITY: Tier = {
  themeClass: "tier-priority",
  assetDir: "/priority",
  // Figma "Loading" (section 538:25421)
  eyebrow: "Câu chuyện kết năm",
  eyebrowClass: "font-medium",
  yearMark: {
    loading: "/priority/year-2026-cream.svg",
    start: "/priority/year-2026-gradient.svg",
    loadingSize: "h-16 w-[199.245px]",
    startSize: "h-[99.897px] w-[311px]",
    startInset: "inset-0",
  },
  greeting: [PRIORITY_USER_NAME, "Một năm gói lại đôi lời"],
  introLines: [
    // Figma "Step 1–3" (section 538:25421)
    `Thân gửi Quý khách ${PRIORITY_USER_NAME},`,
    "Cảm ơn Quý khách vì 1,534 ngày cùng nhau vững bước.",
    "2027 sắp tới, nghỉ tay nghe Techcombank kể chuyện năm nay...",
  ],
  topicsPrompt: PRIORITY_TOPICS_PROMPT,
  topics: PRIORITY_TOPICS,
  /** Figma Step 4 topic icons: wallet, chat-heart, suitcase. */
  topicIcons: {
    [PRIORITY_TOPICS[0]]: "/priority/topic-finance.svg",
    [PRIORITY_TOPICS[1]]: "/priority/topic-love.svg",
    [PRIORITY_TOPICS[2]]: "/priority/topic-experience.svg",
  },
  threads: PRIORITY_THREADS,
  // Figma "Ending" (section 537:25337): once all three topics are told, the New Year card
  topicSet: { topics: PRIORITY_TOPICS, moreTopicsPrompt: PRIORITY_TOPICS_PROMPT, ending: PRIORITY_ENDING },
  greetingCard: PRIORITY_GREETING_CARD,
  radioIcon: "/priority/radio.svg",
  sendButtonClass: "min-w-24 px-5 py-3",
  // Figma "Start" (node 526:20372): 16px label + 16px arrow-up
  startKey: { labelClass: "text-base leading-7", icon: "/priority/arrow-up.svg" },
  handoff: false,
};

/** Figma "Opening" (Private, node 512:13542): Priority's palette, marks and icons, with its own copy. */
const PRIVATE: Tier = {
  ...PRIORITY,
  eyebrow: "Nhìn lại",
  greeting: [PRIVATE_USER_NAME, "Một năm gói lại đôi lời"],
  introLines: PRIVATE_INTRO_LINES,
  topicsPrompt: PRIVATE_TOPICS_PROMPT,
  topics: PRIVATE_TOPICS,
  topicIcons: {},
  threads: PRIVATE_THREADS,
  topicSet: { topics: PRIVATE_TOPICS, moreTopicsPrompt: PRIVATE_TOPICS_PROMPT },
  // Figma "Step 61": "Rất sẵn lòng" types into a send sheet
  openWithPrompt: true,
  // Figma Private cards: cream share circle, #0F0F0F icon
  shareCircle: { className: "bg-cream", icon: "/private/share.svg" },
  // Figma "Step 62" (node 525:19363): orb centre at 50% + 396px, just 10px above the docked 50% + 406px
  menuOrbLift: -10,
  greetingCard: PRIVATE_GREETING_CARD,
};

export const TIERS: Record<TierId, Tier> = { standard: STANDARD, priority: PRIORITY, private: PRIVATE };
