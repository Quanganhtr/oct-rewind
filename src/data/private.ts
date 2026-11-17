import { ANY_ANSWER, type ThreadTurn } from "./rewind";

/** Figma "Opening" (Private, node 512:13542): the Priority look with its own copy. */
export const PRIVATE_USER_NAME = "Tran Anh Minh";

/** Figma "Step 57–60": the intro lines. */
export const PRIVATE_INTRO_LINES = [
  "Bính Ngọ khép lại, một năm vó ngựa dặm dài.",
  "Trân trọng cảm ơn Quý khách vì 1,235 ngày tin tưởng đồng hành.",
  "Cùng Techcombank nhìn lại hành trình 2026 dựng di sản, dưỡng tương lai.",
];

/** Figma "Step 59": a single topic to start with. */
export const PRIVATE_TOPICS = ["Rất sẵn lòng"];
export const PRIVATE_TOPICS_PROMPT = "Kể tôi nghe chuyện";

/** Figma "Dashboard" (node 525:19417): the New Year card "Mở thiệp chúc mừng" opens at the end. */
export const PRIVATE_GREETING_CARD = {
  // Figma 561:37518: the same 16px greeting over a 28px wish as Priority's card
  lines: ["Xuân Đinh Mùi gõ cửa, kính chúc", `Quý khách ${PRIVATE_USER_NAME}`],
  wish: "“Tam dương khai thái\nPhúc lộc song toàn”",
  image: "/private/greeting-full.png",
  linesClass: "text-base leading-6",
  wishClass: "text-[28px] leading-9",
};

/*
 * "Rất sẵn lòng" (Figma section 579:15297). Every card has cream text over its own art; the 3:4
 * cards' lighter art takes a dark share label.
 */

/** How the reader's business grew, and its rank among peers (4:3). */
export const PRIVATE_REVENUE_CARD = {
  label: "Doanh thu",
  title: "Tăng 18%",
  notes: [{ text: "Top 2%", bold: true, fixed: true }, "doanh nghiệp dẫn đầu"],
};

/** The Private events attended (4:3). */
export const PRIVATE_EVENTS_CARD = {
  label: "Tiếp mạch tinh hoa cùng",
  title: "3+ sự kiện Private",
};

/** Private perks used this year. */
export const PRIVATE_MOMENTS_CARD = {
  label: "Với đặc quyền Private, Quý khách có thêm",
  title: "18 trải nghiệm\ný vị",
  pills: ["8 lượt chơi golf", "5 lần mua sắm cao cấp", "5 lần sử dụng phòng chờ"],
};

/** Favourite destinations. */
export const PRIVATE_COUNTRIES_CARD = {
  label: "Huy hiệu “Điểm đến yêu thích” thuộc về",
  title: "Top 3 quốc gia",
  pills: ["Nhật Bản", "Hàn Quốc", "Pháp"],
};

/** Insurance policies held with TCLife (square). */
export const PRIVATE_SHIELDS_CARD = {
  label: "2026 an yên khi có thêm",
  value: "3 khiên vàng kiên cố",
};

/** The family group the reader set up (4:3). */
export const PRIVATE_FAMILY_CARD = {
  label: "Nhóm gia đình",
  title: "Gia tộc họ Tô",
  notes: ["Tiếp bước danh hiệu", "“Trường Tồn\""],
};

const COUNTRY_ANSWERS = ["Dưới 5 quốc gia", "5-10 quốc gia", "Trên 10 quốc gia"];

const LEGACY_THREAD: ThreadTurn[] = [
  {
    trigger: PRIVATE_TOPICS[0],
    userMessage: PRIVATE_TOPICS[0],
    reply: [
      "“Tùng ngay vững giữa đất trời\nThân cao đón gió, xanh ngời cành vươn.”",
      "Năm 2026 thịnh vượng, doanh nghiệp của Quý khách vươn mình rực rỡ.",
    ],
    card: "privateRevenue",
    after: [
      // Figma 526:19738: 12px footnote at 50%, wrapping on its own
      { note: "*Dữ liệu khách hàng doanh nghiệp vừa và nhỏ thuộc cùng nhóm ngành" },
      "Tâm nơi việc lớn, Quý khách vẫn không quên che chở cho những điều mình trân quý.",
    ],
    next: { kind: "prompt", prompt: "Tôi đã che chở như thế nào?", action: "Gửi" },
  },
  {
    trigger: "Tôi đã che chở như thế nào?",
    userMessage: "Tôi đã che chở như thế nào?",
    reply: "Không nói thương nhưng đâu đâu cũng là thương. Quý khách gửi gắm yêu thương qua từng món quà bảo hiểm.",
    card: "privateShields",
    next: {
      kind: "prompt",
      question: "Thêm một năm ân cần vun vén cho tổ ấm, và cả tương lai của những người thân yêu.",
      prompt: "Gia đạo bình an, vạn sự hanh thông mà",
      action: "Gửi",
    },
  },
  {
    trigger: "Gia đạo bình an, vạn sự hanh thông mà",
    userMessage: "Gia đạo bình an, vạn sự hanh thông mà",
    reply: "Cảm ơn Quý khách đã lựa chọn Nhóm gia đình trên hành trình kiến tạo gia sản, tiếp mạch tinh hoa ấy.",
    card: "privateFamily",
    next: {
      kind: "prompt",
      question:
        "Techcombank vinh dự được góp thêm phần nhỏ, cùng Quý khách kết nối và lan toả giá trị qua các sự kiện tinh hoa.",
      prompt: "Đó là những sự kiện nào?",
      action: "Gửi",
    },
  },
  // Straight to the card
  {
    trigger: "Đó là những sự kiện nào?",
    userMessage: "Đó là những sự kiện nào?",
    card: "privateEvents",
    after: [
      "Hội nghị Đầu tư Techcombank 2026\nHòa nhạc Florilèges Français\nChương trình The NextX by Techcombank\n...\n\nMỗi cuộc gặp gỡ là mỗi lần kết nối và truyền cảm hứng, để giá trị mãi sinh sôi.",
    ],
    next: {
      kind: "prompt",
      question: "2026 trăm sự song hành, trân quý biết bao khi Quý khách luôn giữ cho mình những phút giây tự tại.",
      prompt: "Kể tôi nghe những phút giây ấy",
      action: "Gửi",
    },
  },
  {
    trigger: "Kể tôi nghe những phút giây ấy",
    userMessage: "Kể tôi nghe những phút giây ấy",
    reply: "Những phút giây thưởng thức cuộc sống, để tâm hồn thêm đủ đầy.",
    card: "privateMoments",
    after: ["Và cả những phút giây ngao du lý thú, hướng về những miền đất xa."],
    next: {
      kind: "answers",
      question: "Năm Ngọ này, Quý khách có nhớ đã đi qua bao nhiêu quốc gia?",
      boldQuestion: true,
      answers: COUNTRY_ANSWERS,
    },
  },
  {
    // Figma plays "Dưới 5 quốc gia"; every guess gets the real number, with its own bubble
    trigger: ANY_ANSWER,
    userMessage: "Tôi nhớ là {answer}",
    answerBubbles: {
      [COUNTRY_ANSWERS[0]]: "Tôi nhớ là dưới 5 quốc gia",
      [COUNTRY_ANSWERS[2]]: "Tôi nhớ là trên 10 quốc gia",
    },
    reply: "Gần 12 tháng, Quý khách đặt chân tới 8 quốc gia trên bản đồ thế giới.",
    card: "privateCountries",
    after: [
      "Có lẽ Nhật Bản là quốc gia Quý khách trao trọn niềm yêu.\n...",
      "Mai nở báo xuân về, lộc non vươn mình trên cành cũ.",
      "Techcombank kính gửi Quý khách tấm thiệp mừng năm mới cát tường…",
    ],
    // Figma "End" (583:17173): the only topic, so it closes on the greeting card
    next: { kind: "greeting", action: "Mở thiệp ngay" },
  },
];

/** Each Private topic's conversation. */
export const PRIVATE_THREADS: Record<string, ThreadTurn[]> = {
  [PRIVATE_TOPICS[0]]: LEGACY_THREAD,
};
