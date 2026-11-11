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

/** Figma "Private - 01": how the reader's business grew. */
export const PRIVATE_REVENUE_CARD = {
  label: "Doanh thu",
  value: "Tăng 18%",
  note: "Top 12% doanh nghiệp dẫn đầu",
};

/** Figma "Private - 03": the Private events attended. */
export const PRIVATE_EVENTS_CARD = {
  rows: [
    { label: "Kết nối cùng", value: "8 sự kiện Private" },
    { label: "Trọn vẹn", value: "124 giờ" },
  ],
};

/** Figma "Private - 05": Private perks used this year. */
export const PRIVATE_MOMENTS_CARD = {
  label: "Với đặc quyền Private, Quý khách có thêm",
  title: "18 khoảnh khắc\nan nhiên",
  pills: ["8 lượt chơi golf", "5 lần mua sắm cao cấp", "5 lần sử dụng phòng chờ"],
};

/** Figma "Private - 07": favourite destinations. */
export const PRIVATE_COUNTRIES_CARD = {
  label: "Huy hiệu “Điểm đến yêu thích” thuộc về",
  title: "Top 3 quốc gia",
  pills: ["Nhật Bản", "Hàn Quốc", "Pháp"],
};

/** Figma "Private - 09": insurance policies held with TCGI. */
export const PRIVATE_SHIELDS_CARD = {
  label: "2026 an yên khi có thêm",
  value: "3 khiên vàng kiên cố",
  note: "TCGi cảm ơn Quý khách đã trao gửi niềm tin",
};

/** Figma "Private - 11": the family group the reader set up. */
export const PRIVATE_FAMILY_CARD = {
  label: "Nhóm gia đình",
  title: "Gia tộc họ Tô",
  notes: ["Tiếp bước danh hiệu “Trường Tồn\""],
};

// Figma "Private" (section 513:14080)
const LEGACY_THREAD: ThreadTurn[] = [
  {
    trigger: PRIVATE_TOPICS[0],
    userMessage: PRIVATE_TOPICS[0],
    reply: [
      "“Tùng xanh rễ chắc bám sâu\nBốn mùa vững chãi, dãi dầu chẳng phai.”",
      "Từ nền móng vững vàng ấy, năm 2026, doanh nghiệp của Quý khách đã vươn mình rực rỡ.",
    ],
    card: "privateRevenue",
    after: [
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
      "{sự kiện 1}\n{sự kiện 2}\n...\n{sự kiện 8}\n\nMỗi cuộc gặp gỡ là mỗi lần truyền cảm hứng, để giá trị mãi sinh sôi.",
    ],
    next: {
      kind: "prompt",
      question: "Giữa những bộn bề ấy, Quý khách luôn giữ được những khoảng lặng cho riêng mình.",
      prompt: "Khoảng lặng nào?",
      action: "Gửi",
    },
  },
  {
    trigger: "Khoảng lặng nào?",
    userMessage: "Khoảng lặng nào?",
    reply: "Khoảng lặng của những phút giây thư thái và nuôi dưỡng tâm hồn.",
    card: "privateMoments",
    next: {
      kind: "answers",
      question: "Còn nhớ năm Ngọ dặm xa, Quý khách đi qua bao nhiêu quốc gia?",
      boldQuestion: true,
      answers: ["3 tháng", "6 tháng", "12 tháng"],
    },
  },
  {
    // Only "6 tháng" is designed; the other answers play it too, with their own bubble
    trigger: ANY_ANSWER,
    userMessage: "",
    reply: "Gần 12 tháng, không dưới 8 quốc gia.",
    card: "privateCountries",
    next: {
      kind: "prompt",
      question: "Trong đó, Pháp là quốc gia Quý khách trao trọn tin yêu.",
      prompt: "Xuôi ngược cả năm",
      action: "Gửi",
    },
  },
  {
    trigger: "Xuôi ngược cả năm",
    userMessage: "Xuôi ngược cả năm",
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
      "Xuân Đinh Mùi gõ cửa, Techcombank kính chúc quý khách:\n”Tam dương khai thái\nPhúc lộc song toàn”",
    ],
    // The only topic: the flow ends here
    next: { kind: "continue" },
  },
];

/** Each Private topic's conversation. */
export const PRIVATE_THREADS: Record<string, ThreadTurn[]> = {
  [PRIVATE_TOPICS[0]]: LEGACY_THREAD,
};
