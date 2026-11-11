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
    average: { before: "Trung bình ", value: "3.8", unit: " củ khoai", after: " mỗi tháng" },
  },
  question: "Nếu phải gọi tên phong cách tiêu tiền đó, bạn nghĩ mình sẽ là…?",
  answers: ["Cao thủ chắt chiu", "Bậc thầy kế hoạch", "Chiến thần chốt đơn"],
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
  title: "12 brand khác nhau",
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
  lines: [`Người ${USER_NAME} ưu ái nhất`, "Chuyển tiền 124 lần", "Trong 120 ngày"],
};

/** Figma "Chuyện thương ai - 5": the three names that keep turning up on the reader's statement. */
export const TOP_PEOPLE_CARD = {
  label: `Gặp gỡ hội chuyển tiền của ${USER_NAME}`,
  title: "Top 3 “cốt iu”",
  names: ["Mai Tai Phen", "Johny Dang", "Ho Ngoc Ha"],
};

/** Figma "Chuyện thương ai - 6": birthday wishes the reader received through Techcombank. */
export const BIRTHDAY_CARD = {
  title: "7 lời chúc\nsinh nhật",
  subtitle: `${USER_NAME} nhận riêng qua\nTechcombank thôi`,
};

/** Figma "Chuyện thương ai - 7": what the reader looks after in their own name. */
export const FAMILY_CARD = {
  label: "Năm 2026,",
  title: `${USER_NAME} vun vén`,
  pills: ["1 nhóm gia đình", "3 quỹ nhóm", "4 gói bảo hiểm"],
};

/** Figma "Chuyện thương ai - 8": U-Point given to Quỹ Chạm Yêu Thương, and the projects it joined. */
export const DONATION_CARD = {
  stats: [
    { label: "Quyên góp", value: "1.2 Tr", unit: "điểm U-Point" },
    { label: "Đồng hành", value: "13", unit: "dự án" },
  ],
};

/** Figma "Chuyện sinh nhai": the reader's shops, first one first. */
const SHOPS = ["Cà phơ Hồ Điệp", "Pinochio", "Bún riêu Ba Bát"];

/** Figma "Chuyện sinh nhai - 1": how often the shop's speaker rang, and what it brought in. */
export const SOUNDBOX_CARD = {
  label: "Loa bán hàng ting ting",
  value: "8,420 lần",
  note: "mang về VND 546,000,000",
};

/** Figma "Chuyện sinh nhai - 3": how many customers came, and how many came back. */
export const GUESTS_CARD = {
  stats: [
    { value: "1,400\nkhách", label: "Tổng cộng" },
    { value: "400\nfan ruột", label: "Quay lại trên 2 lần" },
  ],
};

/** Figma "Chuyện sinh nhai - 5": the regular who came back most. */
export const FAN_CARD = {
  rows: [
    { label: `Top 1 fan ruột sốp ${USER_NAME}`, value: "Nguyen Van An" },
    { label: "Ghé chơi", value: "89 lần" },
    { label: "Tất tay", value: "VND 23,600,000" },
  ],
};

/** Figma "Chuyện sinh nhai - 7": the shop's best day. */
export const PEAK_DAY_CARD = {
  rows: [
    { label: "Ngày doanh thu gấp 3 bình thường", value: "14 Tháng 2", fixed: true },
    { label: "312 lượt thanh toán", value: "VND 18,430,000" },
  ],
};

/** Figma "Chuyện sinh nhai - 9": revenue against last year. */
export const GROWTH_CARD = {
  label: "So với 2025,\ndoanh thu tăng",
  value: "48%",
  rank: "Top 12%",
  rankNote: "hộ cùng ngành",
};

/** Figma "Chuyện tiền tài - 2": total assets against last year. */
export const ASSETS_CARD = {
  label: "Tổng tài sản 2026",
  value: "86 Tr",
  rank: "+32%",
  rankNote: "so với 2025",
};

/** Figma "Chuyện tiền tài - 4": the reader's best month for income. */
export const INCOME_CARD = {
  label: `Tháng 9 bùng nổ, ${USER_NAME} thu về`,
  value: "VND 34,000,000",
};

/** Figma "Chuyện tiền tài - 6": U-Point earned and cashback received. */
export const REWARDS_CARD = {
  stats: [
    { value: "3.2 Tr", label: "Điểm U-Point" },
    { value: "4.6 Tr", label: "Tiền hoàn" },
  ],
};

/** Figma "Chuyện tiền tài - 8": the big things bought this year. */
export const GOODS_CARD = {
  label: "4 mùa nắng mưa",
  title: `${USER_NAME} đã tậu được`,
  pills: ["Nhà mới", "Xe mới"],
};

/** Figma "Chuyện tiền tài - 10": what the reader saved, across how many goals. */
export const SAVINGS_CARD = {
  label: `2026, ${USER_NAME} gửi tiết kiệm`,
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
  | "peakDay"
  | "growth"
  | "assets"
  | "income"
  | "rewards"
  | "goods"
  | "savings"
  | "months"
  | "concert"
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
  | "priorityDining"
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
  /** The reader's bubble; empty for an ANY_ANSWER turn, which shows the answer itself. */
  userMessage: string;
  reply?: Lines;
  /** A gift ("gift", "priorityGift") waits for the reader to open it before the turn carries on. */
  card?: CardKind;
  /** More beats after the card, before `next`: line(s) to type, or another card. */
  after?: (Lines | { card: CardKind })[];
  /** Emoji that rains down the screen as the reply starts typing. */
  reaction?: string;
  next:
    | { kind: "answers"; question: Lines; boldQuestion?: boolean; answers: string[] }
    | { kind: "prompt"; question?: Lines; boldQuestion?: boolean; prompt: string; action: string; typed?: boolean }
    /** `ask` is added to the closing line only while there are topics left to offer. */
    | { kind: "continue"; question?: Lines; ask?: string }
    | { kind: "end" };
};

/** What the sheet shows once a turn's `continue` is worked out. */
export type SheetNext =
  | Exclude<ThreadTurn["next"], { kind: "continue" }>
  | { kind: "topics"; question?: Lines; prompt: string; topics: string[] };

/** Cards the reader has to tap open before the turn goes on. */
export const GATED_CARDS: ReadonlySet<CardKind | undefined> = new Set(["gift", "priorityGift"]);

/** A turn `trigger` that any of the previous turn's answers starts (for answers whose follow-ups aren't designed). */
export const ANY_ANSWER = "*";

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
      next: { kind: "answers", question: SPENDING.question, boldQuestion: true, answers: SPENDING.answers },
    },
    // Figma "Chuyện tiêu xài" (section 371:2744)
    {
      trigger: SPENDING.answers[0],
      userMessage: "Cao thủ chắt chiu?",
      reply: "Cao thủ chắt chiu này cái nết cũng cũng á.",
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
      reply: `2026 có 4 mùa, còn ${USER_NAME} chỉ có mùa chi đậm và mùa chi li thôiii.`,
      card: "months",
      next: {
        kind: "prompt",
        question: `Tháng 6 ${USER_NAME} chỉ chi 15% thu nhập. Tự hỏi lòng thắt lưng buộc bụng là vì ai 🥹`,
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
          `Thôi thì 2027 Tek Tek chúc ${USER_NAME}:\n“Chi tiêu thong thả mỗi ngày\nCuối năm nhìn lại, ví dày hơn xưa”`,
        ],
      },
    },
  ],
  // Figma "Chuyện tiền tài" (section 379:9371)
  [TOPICS[1]]: [
    {
      trigger: TOPICS[1],
      userMessage: "Kể mình nghe “Chuyện tiền tài” đi",
      reply: "Chuyện tiền bạc hơi nhạy cảm, nên mình nói nhỏ thôi nha 🤫",
      next: {
        kind: "answers",
        question: `Câu hỏi trước nè. Với ${USER_NAME}, năm tài chính 2026 gói gọn trong biểu tượng nào?`,
        boldQuestion: true,
        answers: ["🚀 Phóng ngang tên lửa", "🐢 Chậm như rùa bò", "🎢 Tàu lượn siêu tốc"],
      },
    },
    // Figma only designs the turtle: its reply wouldn't fit the other two
    {
      trigger: "🐢 Chậm như rùa bò",
      userMessage: "🐢 Chậm như rùa bò",
      reply: "Rùa gì mà rùa, rùa gắn động cơ phản lực à 😂",
      card: "assets",
      next: { kind: "prompt", prompt: "Thật không đó...", action: "Gửi" },
    },
    {
      trigger: "Thật không đó...",
      userMessage: "Thật không đó...",
      reply: `Đã biết dối ai bao giờ đâu. ${USER_NAME} như này mình phải xin vía cực mạnh rồi.`,
      card: "income",
      next: {
        kind: "prompt",
        question: `Ai gặp ${USER_NAME} Tháng 9 chắc cũng thấy ${USER_NAME} cười tươi hơn thường ngày 😆`,
        prompt: "Hehe",
        action: "Gửi",
      },
    },
    {
      trigger: "Hehe",
      userMessage: "Hehe",
      reply: `Thật ra không nhất thiết phải khoe đâu. Ví dụ chuyện Techcombank là kim chủ giấu mặt của ${USER_NAME} ấy.`,
      card: "rewards",
      next: {
        kind: "prompt",
        question: `Thêm 234 voucher giúp ${USER_NAME} tiết kiệm VND 1,234,000.\n\nTất cả vì nụ cười của ${USER_NAME} đó 💕`,
        prompt: "Cảm ơn kim chủ nhé",
        action: "Gửi",
      },
    },
    {
      trigger: "Cảm ơn kim chủ nhé",
      userMessage: "Cảm ơn kim chủ nhé",
      reply: `Nói vậy thôi, 12 tháng thời gian ${USER_NAME} không ngừng phấn đấu.`,
      card: "goods",
      next: {
        kind: "prompt",
        question: `Kiên trì, bền bỉ và mạnh mẽ là ${USER_NAME} mà Tek Tek biết 😊`,
        prompt: "Vì saooo?",
        action: "Gửi",
      },
    },
    {
      trigger: "Vì saooo?",
      userMessage: "Vì saooo?",
      reply: `Vì ${USER_NAME} luôn chăm chỉ nuôi dưỡng những dự định và ước mơ.`,
      card: "savings",
      next: {
        kind: "prompt",
        question: `Cứ thế thôiii. Tek Tek tin ${USER_NAME} sẽ thăng hạng Priority trong năm tới.`,
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
        question: `Chắc là ngoại lệ của ${USER_NAME} rồi, mình không hỏi thêm đâu 🤭`,
        prompt: "Tào lao khôngg",
        action: "Gửi",
      },
    },
    {
      trigger: "Tào lao khôngg",
      userMessage: "Tào lao khôngg",
      reply: `😂 Đâu chỉ 1 người. Năm nay ${USER_NAME} có bộ sưu tập hội chuyển tiền chân ái.`,
      card: "topPeople",
      next: {
        kind: "answers",
        question: `Keo sơn cỡ đó. Đoán thử bao nhiêu người gửi ${USER_NAME} lời chúc sinh nhật qua Techcombank?`,
        boldQuestion: true,
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
        question: `Cảm giác được nhớ tới là món quà ngừi thân iu dành tặng ${USER_NAME} đó.`,
        prompt: "🥹🥹🥹",
        action: "Gửi",
      },
    },
    {
      trigger: "🥹🥹🥹",
      userMessage: "🥹🥹🥹",
      reply: `Hy vọng 2027 của ${USER_NAME} sẽ có thêm thật nhiều yêu thương, nhiều như cách ${USER_NAME} yêu thương và quan tâm tới mọi người.`,
      next: { kind: "continue" },
    },
  ],
  // Figma "Chuyện sinh nhai" (section 375:6982)
  [TOPICS[3]]: [
    {
      trigger: TOPICS[3],
      userMessage: "Kể mình nghe “Chuyện sinh nhai” đi",
      reply: [
        `Mới hồi nào ${SHOPS[0]} mà giờ đã thêm ${SHOPS.slice(1).join(", ")}.`,
        `Tính ra loa bán hàng Techcombank đã bên ${USER_NAME} 234 ngày rùii.`,
      ],
      card: "soundbox",
      after: [`2027, loa nhỏ nguyện ý bên ${USER_NAME} trọn đườngg 💕`],
      next: {
        kind: "answers",
        question: `${USER_NAME} có nhớ năm nay bao nhiêu khách ghé hàng?`,
        boldQuestion: true,
        answers: ["Dưới 500", "500 - 2,000", "Trên 2,000", "Thôi nói mình nghe đi"],
      },
    },
    // Every guess gets the real numbers
    {
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: "Khiêm tốn quáa, khách biết là dỗi đó nhaa.",
      card: "guests",
      next: {
        kind: "prompt",
        question: [
          "Người ghé một lần, người ghé rồi lại ghé.",
          `Trong số fan ruột sốp ${USER_NAME}, có một người mình vẫn luôn ghi nhớ.`,
        ],
        prompt: "Ai thế?",
        action: "Gửi",
      },
    },
    // Straight to the card
    {
      trigger: "Ai thế?",
      userMessage: "Ai thế?",
      card: "fan",
      after: ["Cỡ này chắc thành người quen rồi 🥹"],
      next: {
        kind: "prompt",
        question: `${USER_NAME} để ý không, ngày có doanh thu cao nhất là ngày nào?`,
        boldQuestion: true,
        prompt: "Ngày nào thế?",
        action: "Gửi",
      },
    },
    {
      trigger: "Ngày nào thế?",
      userMessage: "Ngày nào thế?",
      card: "peakDay",
      after: ["Ngày nào cũng được như hôm ấy thì vui nhỉ."],
      next: {
        kind: "answers",
        question: `Một năm hối hả, doanh thu sốp ${USER_NAME} 2026 có thể nói là...`,
        boldQuestion: true,
        answers: ["Xuôi chèo mát mái", "Chép vượt vũ môn", "Lùi 1 bước, tiến 3 bước"],
      },
    },
    {
      trigger: ANY_ANSWER,
      userMessage: "",
      reply: "Biết mình biết ta, trăm đơn trăm chốt 😎",
      card: "growth",
      next: {
        kind: "prompt",
        question: `Một năm đi lên cùng ${SHOPS.map((shop) => `@${shop}`).join(", ")} 🎉`,
        prompt: "😅😅😅",
        action: "Gửi",
      },
    },
    {
      trigger: "😅😅😅",
      userMessage: "😅😅😅",
      reply: `Sổ 2026 chốt xong. Tek Tek chúc ${USER_NAME} năm 2027 buôn may bán đắt, chốt đơn thoăn thoắt, ting ting suốt ngày nhé.`,
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
}

/** The base tier's topics, closing on the summary. */
export const STANDARD_TOPIC_SET: TopicSet = {
  topics: TOPICS,
  moreTopicsPrompt: MORE_TOPICS_PROMPT,
  summary: SUMMARY_TURN,
};

/** Works out a turn's sheet: a topic that ends offers the topics left, or the summary once none are. */
export function resolveNext(turn: ThreadTurn, visited: readonly string[], set = STANDARD_TOPIC_SET): SheetNext {
  const { next } = turn;
  if (next.kind !== "continue") return next;
  const closing = linesOf(next.question);
  const left = set.topics.filter((topic) => !visited.includes(topic));
  if (!left.length) {
    return set.summary
      ? { kind: "prompt", question: closing, prompt: set.summary.trigger, action: "Gửi", typed: true }
      : { kind: "end" };
  }
  const question = next.ask
    ? [...closing.slice(0, -1), [closing.at(-1), next.ask].filter(Boolean).join("\n")]
    : closing;
  return { kind: "topics", question, prompt: set.moreTopicsPrompt, topics: left };
}

/** Every turn in the default topic order, then the summary (for the handoff deck). */
export const THREAD: ThreadTurn[] = [...TOPICS.flatMap((topic) => TOPIC_THREADS[topic]), SUMMARY_TURN];
