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
import { PRIORITY_THREADS, PRIORITY_TOPICS, PRIORITY_TOPICS_PROMPT, PRIORITY_USER_NAME } from "./priority";
import {
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
  /** "Nhìn lại" over the Loading 2026. */
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
  /** Whether the stage shows the "Dev handoff" link (the deck documents the base tier). */
  handoff: boolean;
  /**
   * Step 4 as a send sheet that types the first topic in, instead of the topic list; sending it
   * starts that topic (Figma Private "Step 61").
   */
  openWithPrompt?: boolean;
}

export type TierId = "standard" | "priority" | "private";

const STANDARD: Tier = {
  assetDir: "/rewind",
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
    `Thân gửi anh ${PRIORITY_USER_NAME},`,
    "Cảm ơn anh vì 1,534 ngày cùng nhau vững bước.",
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
  topicSet: { topics: PRIORITY_TOPICS, moreTopicsPrompt: PRIORITY_TOPICS_PROMPT },
  radioIcon: "/priority/radio.svg",
  sendButtonClass: "min-w-24 px-5 py-3",
  handoff: false,
};

/** Figma "Opening" (Private, node 512:13542): Priority's palette, marks and icons, with its own copy. */
const PRIVATE: Tier = {
  ...PRIORITY,
  greeting: [PRIVATE_USER_NAME, "Một năm gói lại đôi lời"],
  introLines: PRIVATE_INTRO_LINES,
  topicsPrompt: PRIVATE_TOPICS_PROMPT,
  topics: PRIVATE_TOPICS,
  topicIcons: {},
  threads: PRIVATE_THREADS,
  topicSet: { topics: PRIVATE_TOPICS, moreTopicsPrompt: PRIVATE_TOPICS_PROMPT },
  // Figma "Step 61": "Rất sẵn lòng" types into a send sheet
  openWithPrompt: true,
};

export const TIERS: Record<TierId, Tier> = { standard: STANDARD, priority: PRIORITY, private: PRIVATE };
