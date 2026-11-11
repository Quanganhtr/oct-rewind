import { ANY_ANSWER, type ThreadTurn } from "./rewind";

/** Figma "Opening" (Priority, node 495:5822). */
export const PRIORITY_USER_NAME = "Tran Anh Minh";

export const PRIORITY_TOPICS = ["Tài chính an vững", "Yêu thương trọn tâm", "Trải nghiệm xứng tầm"];
/** Heading of the topic list, on Step 4 and after each topic. */
export const PRIORITY_TOPICS_PROMPT = "Kể tôi nghe chuyện";

/** Figma "Tài chính an vững - 2": how far the reader's assets grew. */
export const FINANCE_GROWTH_CARD = {
  label: "Giá trị tài sản 2026",
  value: "18%",
  rank: "Top 12%",
  rankNote: "khách Priority\ntiến xa nhất",
};

/** Figma "Tài chính an vững - 3": the big purchases this year. */
export const FINANCE_NEW_ASSETS_CARD = {
  label: "Mã đáo thành công",
  title: "Mừng anh tậu thêm",
  pills: ["Nhà mới", "Xe mới"],
};

/** Figma "Tài chính an vững - 5": savings accounts opened this year. */
export const FINANCE_SAVINGS_CARD = {
  label: "2026, anh có thêm",
  value: "3 khoản tiết kiệm",
  total: "VND 234,000,000",
  goals: "5 mục tiêu",
};

/** Figma "Tài chính an vững - 7": what Sinh lời tự động earned. */
export const FINANCE_RETURNS_CARD = {
  label: "256 ngày nắng mưa\nSinh lời mang tới",
  value: "22 Tr",
  rank: "Tháng 7 lợi suất kịch nóc 8,9%",
  rankNote: "",
};

const FINANCE_ANSWERS = ["Tôi nghĩ là 🐢 chú rùa", "Tôi nghĩ là 🚀 tên lửa", "Tôi nghĩ là 🎢 tàu lượn"];

// Figma "Tài chính an vững - Priority thường" (section 499:6522)
const FINANCE_THREAD: ThreadTurn[] = [
  {
    trigger: PRIORITY_TOPICS[0],
    userMessage: `Kể tôi nghe “${PRIORITY_TOPICS[0]}” đi`,
    reply: [
      "“Một năm vun vén đủ đầy\nVững vàng tài chính, mai đây vươn mình.”",
      "Bắt đầu câu chuyện bằng một câu hỏi triệu đô:",
    ],
    next: {
      kind: "answers",
      question: "Với anh, năm tài chính 2026 gói gọn trong biểu tượng nào?",
      boldQuestion: true,
      answers: FINANCE_ANSWERS,
    },
  },
  {
    // Only the turtle's follow-up is designed; the other answers play it too, with their own bubble
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Kiên trì đều bước, đúng gu người vững vàng.",
    card: "priorityGrowth",
    after: ["Tài chính an vững là nhờ anh chăm chỉ nỗ lực mỗi ngày."],
    next: {
      kind: "prompt",
      question: "Xin vía phát tài, chuyện vui chưa dừng lại...",
      prompt: "Còn chuyện gì nữa?",
      action: "Gửi",
    },
  },
  {
    trigger: "Còn chuyện gì nữa?",
    userMessage: "Còn chuyện gì nữa?",
    reply: "Chúc mừng anh năm Ngọ chinh phục thành tựu lớn.",
    card: "priorityNewAssets",
    next: {
      kind: "prompt",
      question: "Anh có nhớ thời gian dài nhất mình kiên trì tích luỹ?",
      boldQuestion: true,
      prompt: "Chắc là 9 tháng",
      action: "Gửi",
    },
  },
  {
    trigger: "Chắc là 9 tháng",
    userMessage: "Chắc là 9 tháng",
    reply: "Gần 12 tháng bên bỉ, tích tiểu thành đại.",
    card: "prioritySavings",
    next: {
      kind: "prompt",
      question: "Tất cả vì tương lai gia sản vững bền. Techcombank biết anh sẽ làm được.",
      prompt: "Chắc chắn rồi",
      action: "Gửi",
    },
  },
  {
    trigger: "Chắc chắn rồi",
    userMessage: "Chắc chắn rồi",
    reply: "Góp chút sức nhỏ, Sinh lời tự động sẽ cùng anh đi tới tương lai đó.",
    card: "priorityReturns",
    next: { kind: "prompt", prompt: "Hứa nhé", action: "Gửi" },
  },
  {
    trigger: "Hứa nhé",
    userMessage: "Hứa nhé",
    reply: [
      "Kiên trì nuôi dưỡng tài chính, không vội vàng, cũng không lùi bước.",
      "Giữ vững tinh thần đó, 2027 của anh sẽ là một năm phú quý cát tường 😉",
    ],
    next: { kind: "continue" },
  },
];

/** Figma "Yêu thương trọn tâm - 03": what the reader looks after in their own name. */
export const LOVE_FAMILY_CARD = {
  label: "Năm 2026,",
  title: "Anh vun vén",
  pills: ["1 nhóm gia đình", "3 quỹ nhóm", "4 gói bảo hiểm"],
};

/** Figma "Yêu thương trọn tâm - 05": U-Point given to Quỹ Chạm Yêu Thương, and the projects it joined. */
export const LOVE_DONATION_CARD = {
  stats: [
    { label: "Quyên góp", value: "1.2 Tr", unit: "Điểm U-Point" },
    { label: "Đồng hành", value: "13", unit: "Dự án" },
  ],
};

/** Figma "Yêu thương trọn tâm - 07/08": a wrapped gift that opens onto the person paid most often. */
export const LOVE_GIFT_CARD = {
  teaser: "Người ấy là ai?",
  action: "Coi nào",
  name: "Do Mai Linh",
  lines: ["Người anh ưu ái nhất", "Chuyển tiền 124 lần", "Trong 120 ngày"],
};

/** Figma "Yêu thương trọn tâm - 09": birthday wishes received through Techcombank. */
export const LOVE_BIRTHDAY_CARD = {
  title: "7 lời chúc\nsinh nhật",
  subtitle: "Anh nhận riêng qua\nTechcombank thôi",
};

// Figma "Yêu thương trọn tâm" (section 504:8568)
const LOVE_THREAD: ThreadTurn[] = [
  {
    trigger: PRIORITY_TOPICS[1],
    userMessage: `Kể tôi nghe “${PRIORITY_TOPICS[1]}” đi`,
    reply: [
      "Yêu thương trọn tâm, chở che âm thầm.",
      "Có những tình cảm không cần nói thành lời, chỉ cần nhìn và cảm nhận thôi.",
    ],
    next: { kind: "prompt", prompt: "Ý là thế nào?", action: "Gửi" },
  },
  {
    trigger: "Ý là thế nào?",
    userMessage: "Ý là thế nào?",
    reply: "Ý là anh đó, không nói thương nhưng đâu đâu cũng là thương.",
    card: "priorityFamily",
    next: {
      kind: "prompt",
      question: "Chu toàn đến vậy, 2027 chừa thêm thật nhiều yêu thương cho bản thân nữa nha.",
      prompt: "Dĩ nhiên rồi",
      action: "Gửi",
    },
  },
  {
    trigger: "Dĩ nhiên rồi",
    userMessage: "Dĩ nhiên rồi",
    reply: "Nhắc tới yêu thương... Chạm Yêu Thương cảm ơn anh thật nhiều.",
    card: "priorityDonation",
    after: ["Rung động lắm khi biết anh luôn chọn cách cho đi."],
    next: {
      kind: "prompt",
      question: "2026, anh có thấy 1 người đặc biệt?",
      boldQuestion: true,
      prompt: "Người nào cơ?",
      action: "Gửi",
    },
  },
  // Straight to the gift: tapping it uncovers the person card, then the turn carries on
  {
    trigger: "Người nào cơ?",
    userMessage: "Người nào cơ?",
    card: "priorityGift",
    after: ["Người ấy chắc hẳn là ngoại lệ có một không hai."],
    next: {
      kind: "answers",
      question: "Yêu thương như thế, anh có nhớ đã nhận bao nhiêu lời chúc sinh nhật qua Techcombank?",
      boldQuestion: true,
      answers: ["1–3 thôi", "4–7 chăng", "Trên 7", "Ai mà nhớ..."],
    },
  },
  {
    // Only "Trên 7" is designed; the other guesses play it too, with their own bubble
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Chính xác quá rồi.",
    card: "priorityBirthday",
    next: {
      kind: "prompt",
      question: "Cảm giác được nhớ tới đó có lẽ là món quà đáng quý nhất ngày.",
      prompt: "🥹🥹🥹",
      action: "Gửi",
    },
  },
  {
    trigger: "🥹🥹🥹",
    userMessage: "🥹🥹🥹",
    reply:
      "Năm sau và nhiều năm sau nữa, hy vọng anh sẽ luôn được bao bọc trong tình yêu và sự quan tâm của mọi người 🩷",
    next: { kind: "continue" },
  },
];

/** Figma "Trải nghiệm xứng tầm - 03": the Priority perks used this year. */
export const EXPERIENCE_PERKS_CARD = {
  label: "Sống đậm chất Priority cùng",
  title: "3 đặc quyền\ncao cấp",
  pills: ["8 lượt chơi golf", "4 lượt phòng chờ"],
};

/** Figma "Trải nghiệm xứng tầm - 05": the category the reader spent most on. */
export const EXPERIENCE_DINING_CARD = {
  label: "2026, anh yêu nhất",
  title: "Ẩm thực",
  notes: ["Chi VND 2,503,456,000", "34% tổng chi tiêu"],
};

/** Figma "Trải nghiệm xứng tầm - 07": the luxury brand the reader kept going back to. */
export const EXPERIENCE_BRAND_CARD = {
  rows: [
    { label: "Anh là khách sộp nhà", value: "Hermes", fixed: true },
    { label: "8 lần ghé", value: "VND 1,890,430,000" },
  ],
};

/** Figma "Trải nghiệm xứng tầm - 09": countries visited this year. */
export const EXPERIENCE_COUNTRIES_CARD = {
  label: "Những chuyến đi quý giá, anh vi vu qua",
  title: "5 quốc gia",
  pills: ["Nhật Bản", "Hàn Quốc", "Pháp"],
};

/** Figma "Trải nghiệm xứng tầm - 11": U-Point earned and cashback (the heading rides on the first label). */
export const EXPERIENCE_REWARDS_CARD = {
  rows: [
    { label: "2026, anh tích luỹ\n\nTổng U-Point", value: "54,200,000" },
    { label: "Tổng tiền hoàn", value: "VND 37,450,000" },
  ],
};

// Figma "Trải nghiệm xứng tầm" (section 504:10351)
const EXPERIENCE_THREAD: ThreadTurn[] = [
  {
    trigger: PRIORITY_TOPICS[2],
    userMessage: `Kể tôi nghe “${PRIORITY_TOPICS[2]}” đi`,
    reply: "Miêu tả trải nghiệm 2026 của anh bằng một từ, Techcombank sẽ chọn từ “cao”.",
    next: { kind: "prompt", prompt: "Vì sao?", action: "Gửi" },
  },
  {
    trigger: "Vì sao?",
    userMessage: "Vì sao?",
    reply: "Vì năm nay anh ưu tiên khám phá những trải nghiệm xứng tầm",
    card: "priorityPerks",
    // "<tên sự kiện>" is Figma's own placeholder for the event's name
    after: ["Techcombank cảm ơn anh đến với <tên sự kiện>. Có anh góp mặt là niềm vui thêm tròn."],
    next: {
      kind: "answers",
      question: "Ngoài những khoảnh khắc này, đâu là lĩnh vực anh đầu tư trải nghiệm nhất 2026?",
      boldQuestion: true,
      // Figma names only the first answer ("---" for the rest); the other two are stand-ins
      answers: ["Ẩm thực", "Du lịch", "Mua sắm"],
    },
  },
  {
    // Only "Ẩm thực" is designed; the other answers play it too, with their own bubble
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Hiểu mình tường tận, chọn gì cũng chuẩn.",
    card: "priorityDining",
    after: ["Chung thuỷ mà chịu chi hơn năm ngoái VND 131,000,000."],
    next: {
      kind: "answers",
      question: "Anh có để ý thương hiệu cao cấp nào mình đặt trọn niềm yêu năm nay?",
      boldQuestion: true,
      // Figma names only "Hermes"; the other two are stand-ins
      answers: ["Hermes", "Chanel", "Louis Vuitton"],
    },
  },
  {
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Đúng gu người sành điệu lại biết chiều bản thân.",
    card: "priorityBrand",
    next: {
      kind: "prompt",
      question: "Trải nghiệm xứng tầm đâu chỉ là chi tiêu cao cấp, mà là cả những chuyến đi...",
      prompt: "Chuyến đi nào cơ?",
      action: "Gửi",
    },
  },
  // Straight to the card
  {
    trigger: "Chuyến đi nào cơ?",
    userMessage: "Chuyến đi nào cơ?",
    card: "priorityCountries",
    after: ["Năm con ngựa mà, đứng yên một chỗ mới là lạ."],
    next: {
      kind: "prompt",
      // Figma counts "1, 2, 3" before answering its own question
      question: "Còn nhớ quốc gia nào khiến anh xiêu lòng, xiêu cả hầu bao?\n\n1\n2\n3\nChắc chắn là Hàn Quốc rồi.",
      prompt: "🤭🤭🤭",
      action: "Gửi",
    },
  },
  {
    trigger: "🤭🤭🤭",
    userMessage: "🤭🤭🤭",
    reply: "Rộng tay chi tiêu, khéo tay giữ lộc.",
    card: "priorityRewards",
    after: [
      "Năm Ngọ qua, năm Mùi tới. Techcombank chúc anh sẽ đi thật xa, chạm thật cao và trải nghiệm thật tròn 🥂",
    ],
    next: { kind: "continue" },
  },
];

/** Each Priority topic's conversation. Topics not built yet have none. */
export const PRIORITY_THREADS: Record<string, ThreadTurn[]> = {
  [PRIORITY_TOPICS[0]]: FINANCE_THREAD,
  [PRIORITY_TOPICS[1]]: LOVE_THREAD,
  [PRIORITY_TOPICS[2]]: EXPERIENCE_THREAD,
};
