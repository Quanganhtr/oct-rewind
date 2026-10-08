export const USER_NAME = "Quang";

/** Chat lines per step (Figma "Step 1–3"). Earlier lines dim as new ones arrive. */
export const INTRO_STEPS: string[][] = [
  ["Ơ, tới rùi hỏ. Tech Tech đợi bạn nãy giờ 👀"],
  [
    "Ơ, tới rùi hỏ. Tech Tech đợi bạn nãy giờ 👀",
    `Cảm ơn ${USER_NAME} vì nguyên 2026 đi đâu cũng mang mình theo. Mình thay ${USER_NAME} ghi nhớ kha khá chuyện á.`,
  ],
  [
    "Ơ, tới rùi hỏ.\nTech Tech đợi nãy giờ 👀",
    `Cảm ơn ${USER_NAME} vì nguyên 2026 đi đâu cũng mang mình theo. Mình thay ${USER_NAME} ghi nhớ kha khá chuyện á.`,
    `Giờ mình kể ${USER_NAME} nghe nhé. Muốn chuyện gì trước nào?`,
  ],
];

/** Opacity by distance from the newest line: newest, previous, older. */
export const LINE_OPACITY = [1, 0.3, 0.1];
