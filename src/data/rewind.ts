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
  userMessage: "Kể mình nghe “Chuyện tiêu xài” đi",
  reply: "Rồi, chuyện tiêu xài. Có vài đoạn hơi giật mình đấy, chuẩn bị tinh thần nha.",
  card: {
    label: `Năm nay ${USER_NAME} chi hết`,
    amount: "VND 45,678,000",
    average: { before: "Trung bình ", value: "3.8", after: " củ mỗi tháng" },
  },
  question: "Nếu phải gọi tên phong cách tiêu tiền đó, bạn nghĩ mình sẽ là…?",
  answers: ["Em út nết na", "Anh ba kế hoạch", "Bà cả tiêu xài"],
};

/** Figma "Step 7": the category card shown after the first quiz answer. */
export const FASHION_CARD = {
  title: "Thời trang",
  caption: [`${USER_NAME} đầu tư hẳn`, "VND 15,456,050"],
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
  title: "64 brand khác nhau",
  top: ["Yêu nhất Zara", "18 lần ghé", "VND 43,400,000"],
};

/** Figma "Chuyện tiêu xài" (node 333:5631): the splurge month vs the thrifty one. */
export const MONTHS_CARD = {
  rows: [
    { label: "Tháng 3 phá gia", value: "VND 34,000,000" },
    { label: "Tháng 6 nền nã", value: "VND 2,300,000" },
  ],
};

/** Figma "Chuyện tiêu xài" (node 333:5642): concert tickets. */
export const CONCERT_CARD = {
  stats: [
    { value: "12.5 Tr", label: "Tiền mua vé" },
    { value: "2 lần", label: "Cháy hết mình" },
  ],
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

/** Figma "Chuyện thương ai": a wrapped gift that opens onto the person paid most often. */
export const LOVE_CARD = {
  teaser: "Người ấy là ai?",
  action: "Coi nào",
  name: "Do Mai Linh",
  lines: [`${USER_NAME} chuyển tận`, "124 giao dịch", "trong 120 ngày"],
};

/** Figma "Chuyện thương ai - 5": the three names that keep turning up on the reader's statement. */
export const TOP_PEOPLE_CARD = {
  title: "Top 3 cái tên",
  subtitle: `Xuất hiện nhiều nhất trên sao kê của ${USER_NAME}`,
  names: ["Mai Tai Phen", "Johny Dang", "Ho Ngoc Ha"],
};

/** Figma "Chuyện thương ai - 6": birthday wishes the reader received through Tech Tech. */
export const BIRTHDAY_CARD = {
  title: "7 lời chúc\nsinh nhật",
  subtitle: `${USER_NAME} nhận riêng qua\nTek Tek thôi`,
};

/** Figma "Chuyện thương ai - 7": what the reader looks after in their own name. */
export const FAMILY_CARD = {
  title: `${USER_NAME} vun vén`,
  pills: ["1 nhóm gia đình", "3 quỹ nhóm", "4 gói bảo hiểm"],
};

/** Figma "Chuyện thương ai - 8": U-Point given to Quỹ Chạm Yêu Thương, and the children it helped. */
export const DONATION_CARD = {
  stats: [
    { label: "Quyên góp", value: "1.2 Tr", unit: "điểm U-Point" },
    { label: "Nâng đỡ", value: "33", unit: "em nhỏ" },
  ],
};

/** Figma "Chuyện sinh nhai - 1": how often the reader's shop soundbox rang. */
export const SOUNDBOX_CARD = {
  label: `Loa bán hàng nhà ${USER_NAME} ting ting`,
  value: "8,420 lần",
  note: "trong năm 2026",
};

/** Figma "Chuyện sinh nhai - 7": how many customers came, and how many came back. */
export const GUESTS_CARD = {
  stats: [
    { value: "1,400 khách", label: "Tổng cộng" },
    { value: "400 khách", label: "Quay lại lần nữa" },
  ],
};

/** Figma "Chuyện sinh nhai - 9": the regular who came back most. */
export const FAN_CARD = {
  rows: [
    { label: `Fan cứng số 1 sốp ${USER_NAME}`, value: "Nguyen Van An" },
    { label: "Ghé chơi", value: "89 lần" },
    { label: "Để lại", value: "23.6 triệu VND" },
  ],
};

/** Figma "Step 10": supermarket habit. */
export const SUPERMARKET_CARD = {
  stats: [
    { value: "28 ngày", label: "Đi Winmart" },
    { value: "12.4Tr", label: "Tổng chi" },
  ],
};

/** One line Tech Tech types, or several typed one after another. */
export type Lines = string | string[];
export const linesOf = (lines?: Lines): string[] => (lines === undefined ? [] : Array.isArray(lines) ? lines : [lines]);

/**
 * One exchange in a topic: the reader's message, Tech Tech's reply (optional) and card (optional),
 * then what comes next in the bottom sheet — each kind can first type a line (`question`) in the chat:
 *  • answers  — answer options
 *  • prompt   — the next question sits in the sheet with a send button (sending it starts the next turn)
 *  • continue — the topic is over: the topics not yet visited, or (once all are done) the summary prompt
 *  • end      — the end of the flow: nothing more in the sheet
 */
export type CardKind =
  | "spending"
  | "fashion"
  | "compare"
  | "brands"
  | "supermarket"
  | "gift"
  | "topPeople"
  | "birthday"
  | "family"
  | "donation"
  | "soundbox"
  | "guests"
  | "fan"
  | "months"
  | "concert"
  | "summary";

export type ThreadTurn = {
  /** Answer, topic or sent prompt that starts this turn — ANY_ANSWER takes whichever answer was picked. */
  trigger: string;
  /** The reader's bubble; empty for an ANY_ANSWER turn, which shows the answer itself. */
  userMessage: string;
  reply?: Lines;
  /** "gift" waits for the reader to open it before the turn carries on. */
  card?: CardKind;
  /** More beats after the card, before `next`: line(s) to type, or another card. */
  after?: (Lines | { card: CardKind })[];
  /** Emoji that rains down the screen as the reply starts typing. */
  reaction?: string;
  next:
    | { kind: "answers"; question: Lines; answers: string[] }
    | { kind: "prompt"; question?: Lines; prompt: string; action: string; typed?: boolean }
    /** `ask` is added to the closing line only while there are topics left to offer. */
    | { kind: "continue"; question?: Lines; ask?: string }
    | { kind: "end" };
};

/** What the sheet shows once a turn's `continue` is worked out. */
export type SheetNext =
  | Exclude<ThreadTurn["next"], { kind: "continue" }>
  | { kind: "topics"; question?: Lines; prompt: string; topics: string[] };

/** Cards the reader has to tap open before the turn goes on. */
export const GATED_CARDS: ReadonlySet<CardKind | undefined> = new Set(["gift"]);

/** A turn `trigger` that any of the previous turn's answers starts (for answers whose follow-ups aren't designed). */
export const ANY_ANSWER = "*";

/** Placeholder reply for the topics whose conversations aren't designed yet. */
const PLACEHOLDER_REPLY = "To be updated";

/** Heading of the topic list offered after a topic ends. */
export const MORE_TOPICS_PROMPT = "Kể mình nghe tiếp";
/** Typed into the sheet once every topic has been visited; sending it plays the summary. */
export const SUMMARY_PROMPT = "Tổng kết lại cho mình nha";

/** Each topic's own conversation, started from any topic list, in any order. */
export const TOPIC_THREADS: Record<string, ThreadTurn[]> = {
  [TOPICS[0]]: [
    {
      trigger: SPENDING.topic,
      userMessage: SPENDING.userMessage,
      reply: SPENDING.reply,
      card: "spending",
      next: { kind: "answers", question: SPENDING.question, answers: SPENDING.answers },
    },
    // Figma "Chuyện tiêu xài" (section 333:5584)
    {
      trigger: SPENDING.answers[0],
      userMessage: "Em út nết na?",
      reply: "Em út này cái nết cũng cũng á",
      card: "fashion",
      next: {
        kind: "prompt",
        question: "Chịu chơi hơn năm ngoái VND 2,356,000 luôn",
        prompt: "Nhớ mình ghé bao nhiêu brand không?",
        action: "Gửi",
      },
    },
    {
      trigger: "Nhớ mình ghé bao nhiêu brand không?",
      userMessage: "Nhớ mình ghé bao nhiêu brand không?",
      reply: `Tất nhiên rồi. Đọc ${USER_NAME} như đọc 1 cuốn sách.`,
      card: "brands",
      next: {
        kind: "prompt",
        question: `Ít khi nào thấy tủ lạnh nhà ${USER_NAME} trống 😆`,
        prompt: "Sai sai mà lại đung đúng",
        action: "Gửi",
      },
    },
    {
      trigger: "Sai sai mà lại đung đúng",
      userMessage: "Sai sai mà lại đung đúng",
      reply: `2026 có 4 mùa, còn ${USER_NAME} chỉ có mùa chi đậm và mùa chi li thôiii`,
      card: "months",
      next: {
        kind: "prompt",
        question: `Tháng 3 ${USER_NAME} chỉ chi 15% thu nhập. Tự hỏi lòng thắt lưng buộc bụng là vì ai 🥹`,
        prompt: "Vi ai do?",
        action: "Gửi",
      },
    },
    {
      trigger: "Vi ai do?",
      userMessage: "Vi ai do?",
      // "Quang Gai Con" is a pun in the copy, kept as written
      reply: "Vì ai đồ... Quang Gai Con, RIZER, V.I.P hay con dân nhà ai đấyy?",
      card: "concert",
      next: {
        kind: "continue",
        question: [
          "Nhiễu điều phủ lấy giá gương, người trong 1 nước phải đu ai đồ ✨",
          `Thanh xuân rực rỡ biết bao. ${USER_NAME} của 10 năm sau chắc chắn sẽ cảm ơn ${USER_NAME} 27 tuổi thật nhiều.`,
        ],
      },
    },
  ],
  [TOPICS[1]]: [
    {
      trigger: TOPICS[1],
      userMessage: "Kể mình nghe chuyện tiền tài đi",
      reply: PLACEHOLDER_REPLY,
      next: { kind: "continue" },
    },
  ],
  // Figma "Chuyện thương ai" (node 227:11250)
  // Figma "Chuyện thương ai" (section 333:5694)
  [TOPICS[2]]: [
    {
      trigger: TOPICS[2],
      userMessage: "Kể mình nghe “Chuyện thương ai” đi",
      reply: [
        `Yêu ai chẳng nói lê thê,\nVì ${USER_NAME} đã có sao kê giãi bày.`,
        `Tặng ${USER_NAME} câu thơ vì cách ${USER_NAME} yêu thương thật thi vị 😆`,
      ],
      next: { kind: "prompt", prompt: "Kể đi nàooo", action: "Gửi" },
    },
    {
      trigger: "Kể đi nàooo",
      userMessage: "Kể đi nàooo",
      reply: `${USER_NAME} đó, không nói thương nhưng đâu đâu cũng là thương.`,
      card: "family",
      next: {
        kind: "prompt",
        question: "Chu toàn đến vậy. 2027 chừa thêm thật nhiều tình yêu cho bản thân nữa nha.",
        prompt: "Yêu thương 🥹",
        action: "Gửi",
      },
    },
    {
      trigger: "Yêu thương 🥹",
      userMessage: "Yêu thương 🥹",
      reply: `Nhắc tới yêu thương... Chạm Yêu Thương cảm ơn ${USER_NAME} thật nhiều.`,
      card: "donation",
      next: {
        kind: "prompt",
        question: [
          `Rung động lắm khi biết ${USER_NAME} luôn chọn cách cho đi.`,
          `2026 ${USER_NAME} có nhớ 1 người đặc biệt?`,
        ],
        prompt: "Người nào cơ?",
        action: "Gửi",
      },
    },
    // Straight to the gift: tapping it uncovers the person card
    {
      trigger: "Người nào cơ?",
      userMessage: "Người nào cơ?",
      card: "gift",
      next: {
        kind: "prompt",
        question: "Bạch nguyệt quang, nốt chu sa hay là… Liễu Như Yên đấyyy",
        prompt: "Tào lao khôngg",
        action: "Gửi",
      },
    },
    {
      trigger: "Tào lao khôngg",
      userMessage: "Tào lao khôngg",
      reply: `😂 Đâu chỉ 1 người. Năm nay ${USER_NAME} có bộ sưu tập các “cục zàng”, “chân ái”`,
      card: "topPeople",
      next: {
        kind: "answers",
        question: `Keo sơn cỡ đó. Đoán thử coi ${USER_NAME} nhận bao nhiêu lời chúc sinh nhật qua Tek Tek?`,
        answers: ["1–3 thôi", "4–7 chăng", "Trên 7", "Ai mà nhớ..."],
      },
    },
    // Every guess gets the real number
    {
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: `Sao nhớ hay vậyyy. Mấy ai được như ${USER_NAME}.`,
      card: "birthday",
      next: {
        kind: "prompt",
        question: `Cảm giác được nhớ tới là món quà ngừi thân iu dành tặng ${USER_NAME} đó`,
        prompt: "🥹🥹🥹",
        action: "Gửi",
      },
    },
    {
      trigger: "🥹🥹🥹",
      userMessage: "🥹🥹🥹",
      reply: `Năm 2026 năm của những yêu thương. Hy vọng 2027 sẽ nhẹ nhàng với ${USER_NAME}, như cách ${USER_NAME} chia sẻ yêu thương và quan tâm tới mọi người.`,
      next: { kind: "continue" },
    },
  ],
  [TOPICS[3]]: [
    {
      trigger: TOPICS[3],
      userMessage: "Kể mình nghe chuyện sinh nhai đi",
      reply: `Được thôi! Tech Tech giúp ${USER_NAME} chốt sổ nha.`,
      card: "soundbox",
      next: {
        kind: "answers",
        question: [
          "Kỷ niệm 234 ngày bên nhau, tổng 564 triệu VND, loa nhỏ ting ting vẫn chăm chỉ đón khách.",
          `${USER_NAME} có nhớ năm nay bao nhiêu khách ghé hàng?`,
        ],
        // Figma "Chuyện sinh nhai - 2" (node 265:4811)
        answers: ["Dưới 500", "500–2,000", "Trên 2,000", "Thôi nói mình nghe đi"],
      },
    },
    // Figma "Chuyện sinh nhai - 7" (node 276:2627): every guess gets the real numbers
    {
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: "Khiêm tốn quáaa, khách biết là dỗi đó nha",
      card: "guests",
      // Figma "Chuyện sinh nhai - 8" (node 276:2651)
      next: {
        kind: "prompt",
        question: [
          "Có người ghé một lần. Có người ghé rồi lại ghé.",
          "Trong số khách quay lại, có một người mình phải ghi riêng một trang.",
        ],
        prompt: "Ai thế?",
        action: "Gửi",
      },
    },
    // Figma "Chuyện sinh nhai - 9" (node 276:2675): straight to the card
    {
      trigger: "Ai thế?",
      userMessage: "Ai thế?",
      card: "fan",
      // Figma "Chuyện sinh nhai - 6" (node 276:2709)
      next: {
        kind: "prompt",
        question: ["Cỡ này chắc thành người quen rồi 🥹", "Có một ngày khách ghé nhiều hơn hẳn mọi hôm."],
        prompt: "Hôm nào hàng mình đông nhất thế?",
        action: "Gửi",
      },
    },
    // Not designed yet after that: the topic ends here for now
    {
      trigger: "Hôm nào hàng mình đông nhất thế?",
      userMessage: "Hôm nào hàng mình đông nhất thế?",
      reply: PLACEHOLDER_REPLY,
      next: { kind: "continue" },
    },
  ],
};

/** Figma "Step 14": played once all four topics are done. */
export const SUMMARY_TURN: ThreadTurn = {
  trigger: SUMMARY_PROMPT,
  userMessage: SUMMARY_PROMPT,
  reply: "Cảm ơn bạn đã cùng thế hệ “Why not?” tiên phong dẫn lối.",
  card: "summary",
  next: { kind: "end" },
};

/** Works out a turn's sheet: a topic that ends offers the topics left, or the summary once none are. */
export function resolveNext(turn: ThreadTurn, visited: readonly string[]): SheetNext {
  const { next } = turn;
  if (next.kind !== "continue") return next;
  const closing = linesOf(next.question);
  const left = TOPICS.filter((topic) => !visited.includes(topic));
  if (!left.length) {
    return { kind: "prompt", question: closing, prompt: SUMMARY_PROMPT, action: "Gửi", typed: true };
  }
  const question = next.ask
    ? [...closing.slice(0, -1), [closing.at(-1), next.ask].filter(Boolean).join("\n")]
    : closing;
  return { kind: "topics", question, prompt: MORE_TOPICS_PROMPT, topics: left };
}

/** Every turn in the default topic order, then the summary (for the handoff deck). */
export const THREAD: ThreadTurn[] = [...TOPICS.flatMap((topic) => TOPIC_THREADS[topic]), SUMMARY_TURN];
