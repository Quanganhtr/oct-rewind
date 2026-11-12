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
  lines: ["Kính chúc Quý khách", PRIVATE_USER_NAME],
  wish: "“Tam dương khai thái\nPhúc lộc song toàn”",
  image: "/private/greeting-full.png",
};

/*
 * "Rất sẵn lòng" (Figma section 519:16350). Every card has cream text over its own art; the 3:4
 * cards' lighter art takes a dark share label.
 */

/** How the reader's business grew, and its rank among peers (4:3). */
export const PRIVATE_REVENUE_CARD = {
  label: "Doanh thu",
  title: "Tăng 18%",
  notes: [{ text: "Top 2%", bold: true, fixed: true }, "doanh nghiệp dẫn đầu"],
};

/** The Private events attended (4:3, Figma "Tài chính an vững - 52", node 525:19114). */
export const PRIVATE_EVENTS_CARD = {
  label: "Kết nối cùng",
  title: "8 sự kiện Private",
};

/** Private perks used this year. */
export const PRIVATE_MOMENTS_CARD = {
  label: "Với đặc quyền Private, Quý khách có thêm",
  title: "18 khoảnh khắc\nthư thái",
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
  note: "TCLife cảm ơn Quý khách đã trao gửi niềm tin",
};

/** The family group the reader set up (4:3). */
export const PRIVATE_FAMILY_CARD = {
  label: "Nhóm gia đình",
  title: "Gia tộc họ Tô",
  notes: ["Tiếp bước danh hiệu", "“Trường Tồn\""],
};

const LEGACY_THREAD: ThreadTurn[] = [
  {
    trigger: PRIVATE_TOPICS[0],
    userMessage: PRIVATE_TOPICS[0],
    reply: [
      "“Tùng ngay vững giữa đất trời\nThân cao đón gió, xanh ngời cành vươn.”",
      "Năm 2026, doanh nghiệp của Quý khách vươn mình rực rỡ.",
    ],
    card: "privateRevenue",
    after: [
      // Figma 526:19738: 12px footnote at 50%, wrapping on its own
      { note: "*Dữ liệu khách hàng doanh nghiệp vừa và nhỏ thuộc cùng nhóm ngành" },
      "Techcombank vinh dự được góp mặt trên hành trình đó. Cùng Quý khách kiến tạo di sản và lan toả các giá trị vượt thời.",
    ],
    next: { kind: "prompt", prompt: "Nhìn lại khoảnh khắc lan toả giá trị", action: "Gửi" },
  },
  // Straight to the card
  {
    trigger: "Nhìn lại khoảnh khắc lan toả giá trị",
    userMessage: "Nhìn lại khoảnh khắc lan toả giá trị",
    card: "privateEvents",
    // "{sự kiện n}" are Figma's own placeholders for the events' names
    after: [
      "{sự kiện 1}\n{sự kiện 2}\n{sự kiện 3}\n...\n\nMỗi cuộc gặp gỡ là mỗi lần kết nối và truyền cảm hứng, để giá trị mãi sinh sôi.",
    ],
    next: {
      kind: "prompt",
      question: "Và giữa những phồn hoa ấy, Quý khách vẫn luôn giữ cho mình những khoảng lặng riêng.",
      prompt: "Khoảng lặng nào?",
      action: "Gửi",
    },
  },
  {
    trigger: "Khoảng lặng nào?",
    userMessage: "Khoảng lặng nào?",
    reply: "Khoảng lặng của những giây phút an lạc và nuôi dưỡng tâm hồn.",
    card: "privateMoments",
    next: {
      kind: "answers",
      question: "Năm Ngọ viễn du, Quý khách có nhớ đã đi qua bao nhiêu quốc gia?",
      boldQuestion: true,
      answers: ["3 quốc gia", "6 quốc gia", "12 quốc gia"],
    },
  },
  {
    // Figma's bubble for "6 quốc gia" reads "Tôi nhớ là khoảng 6 quốc gia"; every guess gets the real number
    trigger: ANY_ANSWER,
    userMessage: "Tôi nhớ là khoảng {answer}",
    reply: "Gần 12 tháng, không dưới 8 quốc gia.",
    card: "privateCountries",
    next: {
      kind: "prompt",
      question: "Trong đó, Pháp là quốc gia Quý khách trao trọn niềm yêu.",
      prompt: "Một năm đi ngược về xuôi",
      action: "Gửi",
    },
  },
  {
    trigger: "Một năm đi ngược về xuôi",
    userMessage: "Một năm đi ngược về xuôi",
    reply: "Vậy nhưng Quý khách không quên che chở cho những điều mình trân quý.",
    card: "privateShields",
    next: { kind: "prompt", prompt: "Còn gì nữa không?", action: "Gửi" },
  },
  {
    trigger: "Còn gì nữa không?",
    userMessage: "Còn gì nữa không?",
    reply: [
      "Mai nở báo xuân về, lộc non vươn mình trên cành cũ.",
      "Gửi gắm di sản chân truyền qua nhiều thế hệ, cảm ơn Quý khách đã lựa chọn Nhóm gia đình.",
    ],
    card: "privateFamily",
    after: [
      "Giữ giá trị mãi sinh sôi để tài sản nảy lộc vượt thời.",
      "Xuân Đinh Mùi gõ cửa, Techcombank gửi tới Quý khách lời chúc năm mới cát tường...",
    ],
    // Figma "End" (node 525:19433): the only topic, so it closes on the greeting card
    next: { kind: "greeting", action: "Mở thiệp chúc mừng" },
  },
];

/** Each Private topic's conversation. */
export const PRIVATE_THREADS: Record<string, ThreadTurn[]> = {
  [PRIVATE_TOPICS[0]]: LEGACY_THREAD,
};
