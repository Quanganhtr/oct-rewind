import { SUMMARY_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma Step 14 "Card": the reader's spending persona and highlights. */
export function SummaryCard() {
  const { label, title, highlights } = SUMMARY_CARD;
  return (
    <PillCard
      label={label}
      title={title}
      pills={highlights}
      gradient="bg-[linear-gradient(180deg,var(--color-spend-4)_0%,var(--color-spend-3)_46.64%,var(--color-spend-2)_75.96%,var(--color-spend-1)_100%)]"
      shareTone="light"
      countPills
    />
  );
}
