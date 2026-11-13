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
  title: "Năm nay tậu thêm",
  pills: ["Nhà mới", "Xe mới"],
};

/** Figma "Tài chính an vững - 5": savings accounts opened this year. */
export const FINANCE_SAVINGS_CARD = {
  label: "2026, Quý khách giữ nhịp",
  value: "3 khoản tiết kiệm",
  total: "VND 234,000,000",
  goals: "5 mục tiêu",
};

/** Figma "Tài chính an vững - 7": what Sinh lời tự động earned, and its best month. */
export const FINANCE_RETURNS_CARD = {
  label: "256 ngày, Sinh lời mang tới",
  value: "VND 1,200,520",
  note: "Tháng 7 lợi suất kịch nóc 8,9%",
};

/** Top to bottom, as Figma "Tài chính an vững - 1" stacks them. */
const FINANCE_ANSWERS = ["🎢 Tàu lượn", "🚀 Tên lửa", "🐢 Chú rùa"];

/** Figma "Tài chính an vững - 4": the longest saving streak, top to bottom. */
const FINANCE_SAVING_ANSWERS = ["3 tháng", "9 tháng", "12 tháng"];

// Figma "Tài chính an vững - Priority thường" (section 533:20624). Prompts send themselves as the
// bubble, except "Còn chuyện gì nữa?", which sends the fuller "Còn chuyện gì nữa thế?".
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
      question: "Với Quý khách, năm tài chính 2026 gói gọn trong biểu tượng nào?",
      boldQuestion: true,
      answers: FINANCE_ANSWERS,
    },
  },
  {
    // Only the turtle's follow-up is designed; the other answers play it too, with their own bubble
    trigger: ANY_ANSWER,
    userMessage: "Tôi nghĩ là {answer}",
    reply: "Kiên trì đều bước, đúng gu người vững vàng.",
    card: "priorityGrowth",
    after: ["Tài chính an vững là nhờ Quý khách chăm chỉ nỗ lực mỗi ngày."],
    next: {
      kind: "prompt",
      question: "Xin vía phát tài, chuyện vui chưa dừng lại...",
      prompt: "Còn chuyện gì nữa?",
      action: "Gửi",
    },
  },
  {
    trigger: "Còn chuyện gì nữa?",
    userMessage: "Còn chuyện gì nữa thế?",
    reply: "Chúc mừng Quý khách năm Ngọ chinh phục thành tựu lớn.",
    card: "priorityNewAssets",
    next: {
      kind: "answers",
      question: "Quý khách có nhớ thời gian dài nhất mình kiên trì tích luỹ?",
      boldQuestion: true,
      answers: FINANCE_SAVING_ANSWERS,
    },
  },
  {
    // Figma "Tài chính an vững - 4/5": the "9 tháng" bubble reads "Chắc là 9 tháng"; every guess
    // gets the real answer, in its own words
    trigger: ANY_ANSWER,
    userMessage: "Chắc là {answer}",
    reply: "Gần 12 tháng bên bỉ, tích tiểu thành đại.",
    card: "prioritySavings",
    next: {
      kind: "prompt",
      question: "Tất cả vì tương lai gia sản vững bền. Techcombank biết Quý khách sẽ làm được.",
      prompt: "Có công mài sắt, có ngày nên kim",
      action: "Gửi",
    },
  },
  {
    trigger: "Có công mài sắt, có ngày nên kim",
    userMessage: "Có công mài sắt, có ngày nên kim",
    reply: "Góp chút sức nhỏ, Sinh lời tự động sẽ cùng Quý khách đi tới tương lai đó.",
    card: "priorityReturns",
    next: { kind: "prompt", prompt: "Vậy cùng nhau đi tiếp thôi", action: "Gửi" },
  },
  {
    trigger: "Vậy cùng nhau đi tiếp thôi",
    userMessage: "Vậy cùng nhau đi tiếp thôi",
    reply: [
      "Kiên trì nuôi dưỡng tài chính, không vội vàng, cũng không lùi bước.",
      "Giữ vững tinh thần ấy, 2027 sẽ là một năm phú quý cát tường 😉",
    ],
    next: { kind: "continue" },
  },
];

/** Figma "Yêu thương trọn tâm - 03": what the reader looks after in their own name. */
export const LOVE_FAMILY_CARD = {
  label: "Năm 2026, Quý khách",
  title: "Trọn tâm vun vén",
  pills: ["1 nhóm gia đình", "3 quỹ nhóm", "4 gói bảo hiểm"],
};

/** Figma "Yêu thương trọn tâm - 05": U-Point given to Quỹ Chạm Yêu Thương, and the projects it joined. */
export const LOVE_DONATION_CARD = {
  stats: [
    { label: "Quyên góp", value: "1.2 Tr", unit: "Điểm U-Point" },
    { label: "Đồng hành", value: "13", unit: "Dự án" },
  ],
};

/** Figma "Yêu thương trọn tâm" (533:23609): the person paid most often, shown straight away (no gift). */
export const LOVE_PERSON_CARD = {
  title: "Do Mai Linh",
  subtitle: "Người Quý khách ưu ái nhất\nChuyển tiền 124 lần\nTrong 120 ngày",
};

/** Figma "Yêu thương trọn tâm - 09": birthday wishes received through Techcombank. */
export const LOVE_BIRTHDAY_CARD = {
  title: "7 lời chúc\nsinh nhật",
  subtitle: "Quý khách nhận riêng qua\nTechcombank thôi",
};

// Figma "Yêu thương trọn tâm" (section 533:23609)
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
    userMessage: "Ý là sao đó?",
    reply: "Không nói thương nhưng đâu đâu cũng là thương.",
    card: "priorityFamily",
    next: {
      kind: "prompt",
      question: "Chu toàn đến vậy, 2027 nhất định phải yêu bản thân nhiều thật nhiều.",
      prompt: "Dĩ nhiên rồi",
      action: "Gửi",
    },
  },
  {
    trigger: "Dĩ nhiên rồi",
    userMessage: "Chắc chắn sẽ như vậy",
    reply: "Nhắc tới yêu thương... Chạm Yêu Thương cảm ơn Quý khách thật nhiều.",
    card: "priorityDonation",
    after: ["Trân quý lắm khi Quý khách luôn chọn cách cho đi."],
    next: {
      kind: "prompt",
      question: "2026, Quý khách có thấy 1 người đặc biệt?",
      boldQuestion: true,
      prompt: "Người nào cơ?",
      action: "Gửi",
    },
  },
  // Straight to the person's card
  {
    trigger: "Người nào cơ?",
    userMessage: "Người nào cơ?",
    card: "priorityPerson",
    after: ["Người ấy chắc hẳn là ngoại lệ có một không hai."],
    next: {
      kind: "answers",
      question: "Yêu thương như thế, Quý khách có nhớ đã nhận bao nhiêu lời chúc sinh nhật qua Techcombank?",
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
      "Năm sau và nhiều năm sau nữa, hy vọng Quý khách sẽ luôn được bao bọc trong tình yêu và sự quan tâm của mọi người 🩷",
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
export const EXPERIENCE_CATEGORY_CARD = {
  label: "2026, Quý khách yêu nhất",
  title: "Siêu thị",
  notes: ["Chi VND 2,503,456,000", "34% tổng chi tiêu"],
};

/** Figma "Trải nghiệm xứng tầm - 07": the luxury brand the reader kept going back to. */
export const EXPERIENCE_BRAND_CARD = {
  rows: [
    { label: "Quý khách là VIP nhà", value: "Hermes", fixed: true },
    { label: "8 lần ghé", value: "VND 1,890,430,000" },
  ],
};

/** Figma "Trải nghiệm xứng tầm - 09": countries visited this year. */
export const EXPERIENCE_COUNTRIES_CARD = {
  label: "Những chuyến đi quý giá, vi vu qua",
  title: "5 quốc gia",
  pills: ["Nhật Bản", "Hàn Quốc", "Pháp"],
};

/** Figma "Trải nghiệm xứng tầm - 11": U-Point earned and cashback (the heading rides on the first label). */
export const EXPERIENCE_REWARDS_CARD = {
  rows: [
    { label: "2026, Quý khách tích luỹ\n\nTổng U-Point", value: "54,200,000" },
    { label: "Tổng tiền hoàn", value: "VND 37,450,000" },
  ],
};

// Figma "Trải nghiệm xứng tầm - Priority" (section 535:23610)
const EXPERIENCE_THREAD: ThreadTurn[] = [
  {
    trigger: PRIORITY_TOPICS[2],
    userMessage: `Kể tôi nghe “${PRIORITY_TOPICS[2]}” đi`,
    // Frames 1–2 still say "anh … cao"; every later frame says "Quý khách … đẳng cấp"
    reply: "Miêu tả trải nghiệm 2026 của Quý khách bằng một từ, Techcombank sẽ chọn từ “đẳng cấp”.",
    next: { kind: "prompt", prompt: "Vì sao?", action: "Gửi" },
  },
  {
    trigger: "Vì sao?",
    userMessage: "Vì sao?",
    reply: "Vì năm nay Quý khách ưu tiên khám phá những trải nghiệm xứng tầm",
    card: "priorityPerks",
    next: {
      kind: "answers",
      question: "Một năm trọn vẹn, đâu là lĩnh vực Quý khách đầu tư trải nghiệm nhất 2026?",
      boldQuestion: true,
      answers: ["Ẩm thực", "Siêu thị", "Thời Trang"],
    },
  },
  {
    // Figma plays "Siêu thị"; every pick gets the same reply and the real category, with its own bubble
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Hiểu mình tường tận, chọn gì cũng chuẩn.",
    card: "priorityCategory",
    after: ["Chung thuỷ mà chịu chi hơn năm ngoái VND 131,000,000."],
    next: {
      kind: "answers",
      question: "Quý khách có để ý thương hiệu cao cấp mình đặt trọn niềm yêu năm nay?",
      boldQuestion: true,
      answers: ["Hermes", "Dior", "Chanel"],
    },
  },
  {
    // Figma plays "Hermes"; every pick gets the real brand, with its own bubble
    trigger: ANY_ANSWER,
    userMessage: "{answer} đó",
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
      question:
        "Còn nhớ quốc gia nào khiến Quý khách xiêu lòng, xiêu cả hầu bao?\n\n1\n2\n3\nChắc chắn là Hàn Quốc rồi.",
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
      "Tương lai phía trước, Techcombank vẫn sẽ cùng Quý khách đi thật xa, chạm thật cao và trải nghiệm thật tròn 🥂",
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

/** Figma "End" (node 538:31044): the closing lines once every topic is told, and the button. */
export const PRIORITY_ENDING = {
  lines: [
    "Mai nở báo xuân về, lộc non vươn mình trên cành cũ.",
    "Techcombank kính gửi Quý khách tấm thiệp mừng năm mới cát tường…",
  ],
  action: "Mở thiệp ngay",
};

/**
 * Figma "Dashboard" (node 538:31028): the New Year card, a 16px greeting over a 28px wish. (Figma
 * also has a red "2026" layer under the art, fully covered by it, so only the art is shipped.)
 */
export const PRIORITY_GREETING_CARD = {
  lines: ["Xuân Đinh Mùi gõ cửa, kính chúc", `Quý khách ${PRIORITY_USER_NAME}`],
  wish: "“Mã kết vinh quang\nDương khai phú quý”",
  image: "/priority/ending/greeting-full.png",
  linesClass: "text-base leading-6",
  wishClass: "text-[28px] leading-9",
};
