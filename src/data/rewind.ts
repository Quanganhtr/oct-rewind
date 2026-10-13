export const USER_NAME = "Quang";

/** Figma "Start": greeting under the 2026 mark. */
export const START_GREETING = [`${USER_NAME} ơi,`, "cùng trò chuyện đôi lời"];

/** Tech Tech's intro lines (Figma "Step 1–3"); step n shows the first n + 1 lines. */
export const INTRO_LINES = [
  "Ơ, tới rùi hỏ.\nTech Tech đợi nãy giờ 👀",
  `Cảm ơn ${USER_NAME} vì 2026 đi đâu cũng mang mình theo.`,
  `Kỷ niệm 2026 này, mình kể ${USER_NAME} nghe nhé. Thích chuyện gì trước nào?`,
];

/** Opacity by line age: newest, previous, older. */
export const LINE_OPACITY = [1, 0.3, 0.1];

/** Figma "Step 4": topics offered once the intro finishes. */
export const TOPICS_PROMPT = "Kể mình nghe";
export const TOPICS = ["Chuyện tiêu xài", "Chuyện tiền tài", "Chuyện thương ai", "Chuyện sinh nhai"];

/** Figma "Step 5": the spending thread, opened by the first topic. */
export const SPENDING = {
  topic: TOPICS[0],
  userMessage: "Kể mình nghe chuyện tiêu xài đi",
  reply: "Rồi, chuyện tiêu xài. Có vài đoạn hơi giật mình đấy, chuẩn bị tinh thần nha.",
  card: {
    label: "Năm nay bạn quẹt thẻ hết",
    amount: "VND 45,678,000",
    average: { before: "Trung bình ", value: "3.8 triệu VND", after: " mỗi tháng" },
  },
  question: "Nếu phải gọi tên phong cách tiêu tiền đó, bạn nghĩ mình sẽ là…?",
  answers: ["Em út nết na", "Anh ba kế hoạch", "Bà cả tiêu xài"],
};

/** Figma "Step 7": the category card shown after the first quiz answer. */
export const FASHION_CARD = {
  title: "Thời trang",
  caption: "là khoản đầu tư\ncó lời nhất",
};

/** Figma "Step 8": year-over-year spending card. */
export const COMPARE_CARD = {
  label: "2026, bạn chi ít hơn",
  amount: "VND 12,300,000",
  note: "so với 2025",
};

/** Figma "Step 9": places visited this year. */
export const BRANDS_CARD = {
  label: `${USER_NAME} ghé`,
  title: "64 nơi khác nhau",
  top: ["Top 1: Winmart", "Top 2: Pizza 4P's", "Top 3: Cà phơ Hồ Điệp"],
};

/** Figma "Step 14": the closing summary. */
export const SUMMARY_CARD = {
  label: "Gọi bạn là",
  title: "Anh hai tiêu xài",
  highlights: [
    { label: "Du lịch", value: "VND 26,485,500" },
    { label: "U-Point tích được", value: "5,670,000" },
    { label: "Khách sộp tại", value: "Winmart" },
  ],
};

/** Figma "Step 10": supermarket habit. */
export const SUPERMARKET_CARD = {
  stats: [
    { value: "28 ngày", label: "Đi Winmart" },
    { value: "12.4Tr", label: "Tổng chi" },
  ],
};

/**
 * One exchange in the thread: the reader's message, Tech Tech's reply and (optionally) a card, then
 * what comes next in the bottom sheet:
 *  • answers — a question types in the chat, then answer options
 *  • prompt  — the next question sits in the sheet with a send button (sending it starts the next turn)
 *  • topics  — (optionally) a closing line types in the chat, then the topics left to explore
 *  • end     — the end of the flow: nothing more in the sheet
 */
export type ThreadTurn = {
  /** Answer, topic or sent prompt that starts this turn. */
  trigger: string;
  userMessage: string;
  reply: string;
  card?: "spending" | "fashion" | "compare" | "brands" | "supermarket" | "summary";
  /** Emoji that rains down the screen as the reply starts typing. */
  reaction?: string;
  next:
    | { kind: "answers"; question: string; answers: string[] }
    | { kind: "prompt"; prompt: string; action: string; typed?: boolean }
    | { kind: "topics"; question?: string; prompt: string; topics: string[] }
    | { kind: "end" };
};

/** Placeholder reply for the topics whose conversations aren't designed yet. */
const PLACEHOLDER_REPLY = "To be updated";

export const THREAD: ThreadTurn[] = [
  {
    trigger: SPENDING.topic,
    userMessage: SPENDING.userMessage,
    reply: SPENDING.reply,
    card: "spending",
    next: { kind: "answers", question: SPENDING.question, answers: SPENDING.answers },
  },
  {
    trigger: SPENDING.answers[0],
    userMessage: "Em út nết na?",
    reply: "Chuẩn. Mình hiểu nhau quá rồiii.",
    card: "fashion",
    next: {
      kind: "answers",
      question: "Câu hỏi khó nè: “So với năm ngoái, bạn nghĩ mình chi nhiều hay ít hơn?”",
      answers: ["Nhiều hơn chứ", "Chắc ít hơn", "Chịu, không đoán nổi"],
    },
  },
  {
    trigger: "Nhiều hơn chứ",
    userMessage: "Nhiều hơn chứ",
    reply: "Bất ngờ chưa. Mình cũng hơi bất ngờ.",
    reaction: "😮",
    card: "compare",
    next: { kind: "prompt", prompt: "Năm nay mình ghé bao nhiêu brand bạn biết không?", action: "Gửi" },
  },
  {
    trigger: "Năm nay mình ghé bao nhiêu brand bạn biết không?",
    userMessage: "Năm nay mình ghé bao nhiêu brand bạn biết không?",
    reply: `Tất nhiên rồi. Đọc ${USER_NAME} như đọc 1 cuốn sách.`,
    card: "brands",
    next: { kind: "prompt", prompt: "Sốc! Mình chi bao nhiêu cho Winmart vậy???", action: "Gửi" },
  },
  {
    trigger: "Sốc! Mình chi bao nhiêu cho Winmart vậy???",
    userMessage: "Sốc! Mình chi bao nhiêu cho Winmart vậy???",
    reply: `Một năm có 365 ngày thì 28 ngày ${USER_NAME} dành để đi Winmart`,
    card: "supermarket",
    next: {
      kind: "topics",
      question: "Một năm có nhịp đấy chứ.\nBạn muốn nghe tiếp chuyện nào nè?",
      prompt: "Kể mình nghe tiếp",
      topics: [TOPICS[1], TOPICS[2], TOPICS[3]],
    },
  },
  // Figma "Step 12–14": the other topics are placeholders for now, then the summary
  {
    trigger: TOPICS[1],
    userMessage: "Kể mình nghe chuyện tiền tài đi",
    reply: PLACEHOLDER_REPLY,
    next: { kind: "topics", prompt: "Kể mình nghe tiếp", topics: [TOPICS[2], TOPICS[3]] },
  },
  {
    trigger: TOPICS[2],
    userMessage: "Kể mình nghe chuyện thương ai đi",
    reply: PLACEHOLDER_REPLY,
    next: { kind: "topics", prompt: "Kể mình nghe tiếp", topics: [TOPICS[3]] },
  },
  {
    trigger: TOPICS[3],
    userMessage: "Kể mình nghe chuyện sinh nhai đi",
    reply: PLACEHOLDER_REPLY,
    next: { kind: "prompt", prompt: "Tổng kết lại cho mình nha", action: "Gửi", typed: true },
  },
  {
    trigger: "Tổng kết lại cho mình nha",
    userMessage: "Tổng kết lại cho mình nha",
    reply: "Cảm ơn bạn đã cùng thế hệ “Why not?” tiên phong dẫn lối.",
    card: "summary",
    next: { kind: "end" },
  },
];
