import { asset } from "@/lib/asset";
import { SUMMARY_CARD } from "@/data/rewind";
import { PillCard } from "./PillCard";

/** Figma Step 14 "Card": the reader's spending persona and highlights, over the shopping artwork. */
export function SummaryCard() {
  const { label, title, highlights } = SUMMARY_CARD;
  return (
    <PillCard
      label={label}
      title={title}
      rows={highlights}
      gradient="bg-[linear-gradient(180deg,var(--color-spend-1)_0%,var(--color-spend-2)_24.038%,var(--color-spend-3)_53.365%,var(--color-spend-4)_100%)]"
      art={
        <img
          alt=""
          src={asset("/rewind/summarize.png")}
          className="absolute bottom-0 left-1/2 block h-[172px] w-[343px] max-w-none -translate-x-1/2 object-bottom"
        />
      }
      shareTone="light"
      countPills
    />
  );
}
