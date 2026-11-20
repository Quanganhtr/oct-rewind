/** Figma "Opening" (section 592:5335): the same sample customer as Priority and Private. */
export const FULL_NAME = "Tran Anh Minh";

/** Figma "Start": greeting under the 2026 mark. */
export const START_GREETING = [`${FULL_NAME} ơi,`, "cùng trò chuyện đôi lời"];

/**
 * Tek Tek's intro lines (Figma "Step 1–3"); step n shows the first n + 1 lines. (Figma also has a
 * case for readers with no tenure on record: "Cảm ơn bạn vì năm qua đi đâu cũng mang mình theo.")
 */
export const INTRO_LINES = [
  "Ơ, tới rùi hỏ. Tek Tek đợi nãy giờ 👀",
  "Cảm ơn bạn vì 1,524 ngày đi đâu cũng mang mình theo.",
  "Kỷ niệm 2026 này, Tek Tek kể bạn nghe nhé. Thích chuyện gì trước nào?",
];

/** Opacity by line age: newest, previous, older. */
export const LINE_OPACITY = [1, 0.3, 0.1];

/** Figma "Step 4": topics offered once the intro finishes ("Chuyện sinh nhai" is dropped). */
export const TOPICS_PROMPT = "Kể mình nghe";
export const TOPIC_SPENDING = "Chuyện tiêu xài";
export const TOPIC_MONEY = "Chuyện tiền tài";
export const TOPIC_LOVE = "Chuyện thương ai";
export const TOPICS = [TOPIC_SPENDING, TOPIC_MONEY, TOPIC_LOVE];

/** Figma "Step 5": the spending thread, opened by the first topic. */
export const SPENDING = {
  topic: TOPIC_SPENDING,
  userMessage: "Kể mình nghe “Chuyện tiêu xài” đi",
  reply: "Rồi, chuyện tiêu xài. Có vài đoạn hơi giật mình đấy, chuẩn bị tinh thần nha.",
  card: {
    label: "Năm nay bạn chi hết",
    amount: "VND 45,678,000",
    average: { before: "Trung bình ", value: "3.8", unit: " củ khoai", after: " mỗi tháng" },
  },
  question: "Nếu phải gọi tên phong cách tiêu tiền đó, bạn nghĩ mình sẽ là…?",
  answers: ["Cao thủ chắt chiu", "Bậc thầy kế hoạch", "Chiến thần chốt đơn"],
};

/** Figma "Step 7": the category card shown after the first quiz answer. */
export const FASHION_CARD = {
  title: "Thời trang",
  caption: ["Bạn đầu tư hẳn", "VND 15,456,050"],
};

/** Figma "Step 8": year-over-year spending card. */
export const COMPARE_CARD = {
  label: "2026, bạn chi ít hơn",
  amount: "VND 12,300,000",
  note: "so với 2025",
};

/** Figma "Step 9": places visited this year. */
export const BRANDS_CARD = {
  label: "Bạn ghé",
  title: "30 sốp khác nhau",
  top: ["Yêu nhất Zara", "18 lần ghé", "Chi VND 43,400,000"],
};

/** Figma "Chuyện tiêu xài" (node 333:5631): the splurge month vs the thrifty one. */
export const MONTHS_CARD = {
  rows: [
    { label: "Tháng 3 phá gia", value: "VND 34,000,000" },
    { label: "Tháng 6 nền nã", value: "VND 2,300,000" },
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
  lines: ["Người bạn ưu ái nhất", "Chuyển tiền 124 lần", "Trong 120 ngày"],
};

/** Figma "Chuyện thương ai - 5": the three names that keep turning up on the reader's statement. */
export const TOP_PEOPLE_CARD = {
  label: "Gặp gỡ hội chuyển tiền của bạn",
  title: "Top 3 “cốt iu”",
  names: ["Mai Tai Phen", "Johny Dang", "Ho Ngoc Ha"],
};

/** Figma "Chuyện thương ai - 6": birthday wishes the reader received through Techcombank. */
export const BIRTHDAY_CARD = {
  title: "7 lời chúc\nsinh nhật",
  subtitle: "Bạn nhận riêng qua\nTechcombank thôi",
};

/** Figma "Chuyện thương ai - 7": what the reader looks after in their own name. */
export const FAMILY_CARD = {
  label: "Năm 2026,",
  title: "Bạn vun vén",
  pills: ["1 nhóm gia đình", "3 quỹ nhóm", "4 gói bảo hiểm"],
};

/** Figma "Chuyện thương ai - 8": U-Point given to Quỹ Chạm Yêu Thương, and the projects it joined. */
export const DONATION_CARD = {
  stats: [
    { label: "Quyên góp", value: "1.2 Tr", unit: "điểm U-Point" },
    { label: "Đồng hành", value: "13", unit: "dự án" },
  ],
};

/** Figma "Chuyện tiền tài - 2" (section 592:5796): total assets against last year. */
export const ASSETS_CARD = {
  label: "Tổng tài sản 2026",
  value: "86 Tr",
  rank: "+32%",
  rankNote: "so với 2025",
};

/** Figma "Chuyện tiền tài - 4": the reader's best month for income. */
export const INCOME_CARD = {
  label: "Tháng 9 bùng nổ, thu về",
  value: "VND 34,000,000",
};

/** Figma "Chuyện tiền tài - 16": what Sinh lời tự động earned, and its best month. */
export const RETURNS_CARD = {
  label: "256 ngày, Sinh lời mang tới",
  value: "VND 1,200,520",
  note: "Tháng 7 lợi suất kịch nóc 8,9%",
};

/** Figma "Chuyện tiền tài - 8": U-Point earned and cashback received. */
export const REWARDS_CARD = {
  stats: [
    { value: "3.2 Tr", label: "Điểm U-Point" },
    { value: "4.6 Tr", label: "Tiền hoàn" },
  ],
};

/** Figma "Chuyện tiền tài - 10": the big things bought this year. */
export const GOODS_CARD = {
  label: "Năm Ngọ vững vó",
  title: "Mừng bạn tậu thêm",
  pills: ["Nhà mới", "Xe mới"],
};

/** Figma "Chuyện tiền tài - 12": what the reader saved, across how many goals. */
export const SAVINGS_CARD = {
  label: "2026, bạn gửi tiết kiệm",
  value: "VND 234,000,000",
  note: "Cùng 5 mục tiêu tích luỹ",
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
 * then what comes next in the bottom sheet — each kind can first type a line ("question") in the chat:
 *  • answers  — answer options
 *  • prompt   — the next question sits in the sheet with a send button (sending it starts the next turn)
 *  • continue — the topic is over: the topics not yet visited, or (once all are done) the summary prompt
 *    or the tier's ending
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
  | "assets"
  | "income"
  | "returns"
  | "rewards"
  | "goods"
  | "savings"
  | "months"
  | "summary"
  // Priority tier, "Tài chính an vững"
  | "priorityGrowth"
  | "priorityNewAssets"
  | "prioritySavings"
  | "priorityReturns"
  // Priority tier, "Yêu thương trọn tâm"
  | "priorityFamily"
  | "priorityDonation"
  | "priorityGift"
  | "priorityBirthday"
  // Priority tier, "Trải nghiệm xứng tầm"
  | "priorityPerks"
  | "priorityCategory"
  | "priorityBrand"
  | "priorityCountries"
  | "priorityRewards"
  // Private tier, "Rất sẵn lòng"
  | "privateRevenue"
  | "privateEvents"
  | "privateMoments"
  | "privateCountries"
  | "privateShields"
  | "privateFamily";

export type ThreadTurn = {
  /** Answer, topic or sent prompt that starts this turn — ANY_ANSWER takes whichever answer was picked. */
  trigger: string;
  /**
   * The reader's bubble. An ANY_ANSWER turn leaves it empty to show the answer itself, or wraps the
   * answer with "{answer}" ("Tôi nhớ là khoảng {answer}").
   */
  userMessage: string;
  /**
   * An ANY_ANSWER turn's bubble for particular answers, used as-is instead of "userMessage" (an
   * opt-out like "Nói tôi nghe đi" shouldn't become "Nói tôi nghe đi đó").
   */
  answerBubbles?: Record<string, string>;
  /** An ANY_ANSWER turn's reply for particular answers, in place of "reply" (Priority's 🐢 / 🚀 / 🎢). */
  answerReplies?: Record<string, Lines>;
  reply?: Lines;
  /** A gift ("gift") waits for the reader to open it before the turn carries on. */
  card?: CardKind;
  /** More beats after the card, before "next": line(s) to type, another card, or a small faded footnote. */
  after?: (Lines | { card: CardKind } | { note: string })[];
  /** Emoji that rains down the screen as the reply starts typing. */
  reaction?: string;
  next:
    | { kind: "answers"; question: Lines; boldQuestion?: boolean; answers: string[] }
    | { kind: "prompt"; question?: Lines; boldQuestion?: boolean; prompt: string; action: string; typed?: boolean }
    /** "ask" is added to the closing line only while there are topics left to offer. */
    | { kind: "continue"; question?: Lines; ask?: string }
    /** One wide button that opens the tier's full-screen greeting card (Private's ending). */
    | { kind: "greeting"; question?: Lines; action: string }
    | { kind: "end" };
};

/** What the sheet shows once a turn's "continue" is worked out. */
export type SheetNext =
  | Exclude<ThreadTurn["next"], { kind: "continue" }>
  | { kind: "topics"; question?: Lines; prompt: string; topics: string[] };

/** Cards the reader has to tap open before the turn goes on. */
export const GATED_CARDS: ReadonlySet<CardKind | undefined> = new Set(["gift", "priorityGift"]);

/** A turn "trigger" that any of the previous turn's answers starts (for answers whose follow-ups aren't designed). */
export const ANY_ANSWER = "*";

/** Heading of the topic list offered after a topic ends. */
export const MORE_TOPICS_PROMPT = "Kể mình nghe tiếp";
/** Typed into the sheet once every topic has been visited; sending it plays the summary. */
export const SUMMARY_PROMPT = "Tổng kết lại cho mình nha";

/** "Chuyện tiền tài" quiz picks, top to bottom. */
const MONEY_ANSWERS = ["🚀 Phóng ngang tên lửa", "🐢 Chậm như rùa bò", "🎢 Tàu lượn siêu tốc"];

/** Each topic's own conversation, started from any topic list, in any order. */
export const TOPIC_THREADS: Record<string, ThreadTurn[]> = {
  [TOPIC_SPENDING]: [
    {
      trigger: SPENDING.topic,
      userMessage: SPENDING.userMessage,
      reply: SPENDING.reply,
      card: "spending",
      next: { kind: "answers", question: SPENDING.question, boldQuestion: true, answers: SPENDING.answers },
    },
    // Figma "Chuyện tiêu xài" (section 371:2744) designs "Cao thủ chắt chiu"; the other two picks play
    // the same turn, their own name in the bubble and the reply
    {
      trigger: ANY_ANSWER,
      userMessage: "{answer}?",
      reply: `${SPENDING.answers[0]} này cái nết cũng cũng á.`,
      answerReplies: Object.fromEntries(SPENDING.answers.map((answer) => [answer, `${answer} này cái nết cũng cũng á.`])),
      card: "fashion",
      next: {
        kind: "prompt",
        question: "Chịu chơi hơn năm ngoái VND 2,356,000 luôn.",
        prompt: "Nhớ mình ghé bao nhiêu sốp không?",
        action: "Gửi",
      },
    },
    {
      trigger: "Nhớ mình ghé bao nhiêu sốp không?",
      userMessage: "Nhớ mình ghé bao nhiêu sốp không?",
      reply: "Tất nhiên rồi. Đọc bạn như đọc 1 cuốn sách.",
      card: "brands",
      next: {
        kind: "prompt",
        question: "Zara giờ phải gọi bạn bằng điện thoại 😆",
        prompt: "Sai sai mà lại đung đúng",
        action: "Gửi",
      },
    },
    {
      trigger: "Sai sai mà lại đung đúng",
      userMessage: "Sai sai mà lại đung đúng",
      reply: "2026 có 4 mùa, còn bạn chỉ có mùa chi đậm và mùa chi li thôiii.",
      card: "months",
      // The concert card is gone: the topic closes on the wish straight after
      next: {
        kind: "continue",
        question: [
          "Tháng 6 bạn chỉ chi 15% thu nhập. Tự hỏi lòng thắt lưng buộc bụng là vì ai 🥹",
          "Thôi thì 2027 Tek Tek chúc bạn:\n“Chi tiêu thong thả mỗi ngày\nCuối năm nhìn lại, ví dày hơn xưa”",
        ],
      },
    },
  ],
  // Figma "Chuyện tiền tài" (section 592:5796)
  [TOPIC_MONEY]: [
    {
      trigger: TOPIC_MONEY,
      userMessage: "Kể mình nghe tiếp “Chuyện tiền tài”",
      reply: "Chuyện tiền bạc hơi nhạy cảm, nên Tek Tek nói nhỏ thôi nha 🤫",
      next: {
        kind: "answers",
        question: "Câu hỏi trước nè. Với bạn, năm tài chính 2026 gói gọn trong biểu tượng nào?",
        boldQuestion: true,
        answers: MONEY_ANSWERS,
      },
    },
    {
      // Each pick has its own comeback (Figma "Case" 592:5855), then the same card
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: "Rùa gì mà rùa, rùa gắn động cơ phản lực à 😂",
      answerReplies: {
        [MONEY_ANSWERS[0]]: "Phóng thật chứ đùa, tên lửa chính hiệu luôn 😎",
        [MONEY_ANSWERS[2]]: "Lên xuống thì có, mà cuối cùng vẫn đi lên nha 😆",
      },
      card: "assets",
      next: { kind: "prompt", prompt: "Thật không đó...", action: "Gửi" },
    },
    {
      trigger: "Thật không đó...",
      userMessage: "Thật không đó...",
      reply: "Đã biết dối ai bao giờ đâu. Bạn như này Tek Tek phải xin vía cực mạnh rồi.",
      card: "income",
      next: {
        kind: "prompt",
        question: "Ai gặp bạn Tháng 9 chắc cũng thấy bạn cười tươi hơn thường ngày 😆",
        prompt: "Hẹ hẹ hẹ",
        action: "Gửi",
      },
    },
    {
      trigger: "Hẹ hẹ hẹ",
      userMessage: "Hẹ hẹ hẹ",
      reply: "Có Sinh lời tự động cạnh bên, tiền nhàn rỗi thay bạn “đi làm” mỗi ngày.",
      card: "returns",
      next: { kind: "prompt", prompt: "Oki, mình biết rồi", action: "Gửi" },
    },
    {
      trigger: "Oki, mình biết rồi",
      userMessage: "Oki, mình biết rồi",
      reply: "Thật ra không nhất thiết phải khoe đâu. Ví dụ chuyện Techcombank là kim chủ giấu mặt của bạn ấy.",
      card: "rewards",
      next: {
        kind: "prompt",
        // Figma "User có sử dụng voucher"; a reader with no vouchers gets only the last line
        question: "Thêm 234 voucher, giúp bạn tiết kiệm VND 1,234,000.\n\nTất cả vì nụ cười của bạn đó 💕",
        prompt: "Vậy luôn? Cảm ơn kim chủ nhé 😆",
        action: "Gửi",
      },
    },
    {
      trigger: "Vậy luôn? Cảm ơn kim chủ nhé 😆",
      userMessage: "Vậy luôn? Cảm ơn kim chủ nhé 😆",
      reply: "Nói vậy thôi, 12 tháng thời gian bạn không ngừng phấn đấu.",
      card: "goods",
      next: {
        kind: "prompt",
        question: "Kiên trì, bền bỉ và mạnh mẽ là bạn mà Tek Tek biết 😊",
        prompt: "Là saooo?",
        action: "Gửi",
      },
    },
    {
      trigger: "Là saooo?",
      userMessage: "Là saooo?",
      reply: "Là vì bạn luôn chăm chỉ nuôi dưỡng những dự định và ước mơ.",
      card: "savings",
      next: {
        kind: "prompt",
        question: "Cứ thế thôiii. Tek Tek tin bạn sẽ thăng hạng Priority trong năm tới.",
        prompt: "Chờ mình nha 😎",
        action: "Gửi",
      },
    },
    {
      trigger: "Chờ mình nha 😎",
      userMessage: "Chờ mình nha 😎",
      reply: "Chuyện tiền tài tới đây là hết, năm sau chắc phải đổi tên thành chuyện tiền tỷ rồi 😆",
      next: { kind: "continue" },
    },
  ],
  // Figma "Chuyện thương ai" (section 373:4680)
  [TOPIC_LOVE]: [
    {
      trigger: TOPIC_LOVE,
      userMessage: "Kể mình nghe “Chuyện thương ai” đi",
      reply: [
        "Yêu ai chẳng nói lê thê,\nVì bạn đã có sao kê giãi bày.",
        "Tặng bạn câu thơ vì cách bạn yêu thương thật thi vị 😆",
      ],
      next: { kind: "prompt", prompt: "Kể đi nàooo", action: "Gửi" },
    },
    {
      trigger: "Kể đi nàooo",
      userMessage: "Kể đi nàooo",
      reply: "Bạn đó, không nói thương nhưng đâu đâu cũng là thương.",
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
      reply: "Nhắc tới yêu thương... Chạm Yêu Thương cảm ơn bạn thật nhiều.",
      card: "donation",
      next: {
        kind: "prompt",
        question: [
          "Rung động lắm khi biết bạn luôn chọn cách cho đi.",
          "2026 bạn có nhớ 1 người đặc biệt?",
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
        question: "Chắc là ngoại lệ của bạn rồi, mình không hỏi thêm đâu 🤭",
        prompt: "Tào lao khôngg",
        action: "Gửi",
      },
    },
    {
      trigger: "Tào lao khôngg",
      userMessage: "Tào lao khôngg",
      reply: "😂 Đâu chỉ 1 người. Năm nay bạn có bộ sưu tập hội chuyển tiền chân ái.",
      card: "topPeople",
      next: {
        kind: "answers",
        question: "Keo sơn cỡ đó. Đoán thử bao nhiêu người gửi bạn lời chúc sinh nhật qua Techcombank?",
        boldQuestion: true,
        answers: ["1–3 thôi", "4–7 chăng", "Trên 7", "Ai mà nhớ..."],
      },
    },
    // Every guess gets the real number
    {
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: "Sao nhớ hay vậyyy. Mấy ai được như bạn.",
      card: "birthday",
      next: {
        kind: "prompt",
        question: "Cảm giác được nhớ tới là món quà ngừi thân iu dành tặng bạn đó.",
        prompt: "🥹🥹🥹",
        action: "Gửi",
      },
    },
    {
      trigger: "🥹🥹🥹",
      userMessage: "🥹🥹🥹",
      reply: "Hy vọng 2027 của bạn sẽ có thêm thật nhiều yêu thương, nhiều như cách bạn yêu thương và quan tâm tới mọi người.",
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

/** A tier's topics, as far as working out what follows a finished topic goes. */
export interface TopicSet {
  topics: string[];
  /** Heading of the topic list offered after a topic ends. */
  moreTopicsPrompt: string;
  /** Played once every topic is done; without one, the flow just ends there. */
  summary?: ThreadTurn;
  /**
   * Or, once every topic is done: closing lines, then one wide button that opens the tier's
   * full-screen greeting card (Priority's ending).
   */
  ending?: { lines: string[]; action: string };
}

/** Figma "Ending" (section 592:5897, frame "End"): the closing lines once every topic is told. */
export const STANDARD_ENDING = {
  lines: ["Thêm 1 năm tài chính đi qua...", "Con số nào đại diện cho bạn năm 2026? Nghe thầy Tek Tek phán nè 😎"],
  action: "Phán đi thầy",
};

/** Figma "Ending" frame "Dashboard" (592:5898): the reader's year in one full-screen card. */
export const STANDARD_SUMMARY_CARD = {
  lines: [`2026, ${FULL_NAME} là`],
  wish: "Cao thủ chắt chiu",
  image: "/rewind/ending/summary-full.png",
  linesClass: "text-left",
  wishClass: "text-left text-[40px] leading-12",
  stats: [
    { label: "Tổng chi Thời trang", value: "VND 15,456,050" },
    { label: "U-Point tích được", value: "3,200,000" },
    { label: "Khách sộp nhà", value: "Zara" },
  ],
  share: true,
  // The art is pale at the top: the header stays black over it
  darkHeader: true,
};

/** The base tier's topics, closing on the year summary card ("Phán đi thầy"). */
export const STANDARD_TOPIC_SET: TopicSet = {
  topics: TOPICS,
  moreTopicsPrompt: MORE_TOPICS_PROMPT,
  ending: STANDARD_ENDING,
};

/** Works out a turn's sheet: a topic that ends offers the topics left, or the summary once none are. */
export function resolveNext(turn: ThreadTurn, visited: readonly string[], set = STANDARD_TOPIC_SET): SheetNext {
  const { next } = turn;
  if (next.kind !== "continue") return next;
  const closing = linesOf(next.question);
  const left = set.topics.filter((topic) => !visited.includes(topic));
  if (!left.length) {
    if (set.summary) {
      return { kind: "prompt", question: closing, prompt: set.summary.trigger, action: "Gửi", typed: true };
    }
    if (set.ending) return { kind: "greeting", question: [...closing, ...set.ending.lines], action: set.ending.action };
    return { kind: "end" };
  }
  const question = next.ask
    ? [...closing.slice(0, -1), [closing.at(-1), next.ask].filter(Boolean).join("\n")]
    : closing;
  return { kind: "topics", question, prompt: set.moreTopicsPrompt, topics: left };
}

/** Every turn in the default topic order, then the summary (for the handoff deck). */
export const THREAD: ThreadTurn[] = [...TOPICS.flatMap((topic) => TOPIC_THREADS[topic]), SUMMARY_TURN];
