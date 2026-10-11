import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { TOPICS, TOPICS_PROMPT } from "@/data/rewind";
import { GlassSheet, SheetRow } from "./GlassSheet";

interface TopicMenuProps {
  /** Heading above the list — Step 4 "Kể mình nghe", later "Kể mình nghe tiếp". */
  prompt?: string;
  topics?: string[];
  /** Icon tile fill: cream in Figma Step 4, white in the Step 10 "Kể mình nghe tiếp" menu. */
  tile?: "cream" | "white";
  onSelect?: (topic: string) => void;
}

/** Figma Step 4 "Bottom": the topics Tech Tech can talk about. */
export function TopicMenu({ prompt = TOPICS_PROMPT, topics = TOPICS, tile = "cream", onSelect }: TopicMenuProps) {
  return (
    // p-[17px] = Figma's 16px + 1px stroke
    <GlassSheet className="p-[17px]">
      <p className="w-full text-sm leading-5 text-text-primary">{prompt}</p>
      <ul className="flex w-full flex-col items-start">
        {topics.map((topic, i) => (
          <li key={topic} className="w-full">
            <SheetRow divider={i < topics.length - 1} onPress={() => onSelect?.(topic)}>
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex items-center justify-center overflow-clip rounded-lg p-1",
                    tile === "cream" ? "bg-cream" : "bg-page-light",
                  )}
                >
                  <DiamondIcon />
                </span>
                <span className="text-sm leading-5 font-semibold whitespace-nowrap text-text-primary">
                  {topic}
                </span>
              </span>
              <img alt="" src={asset("/rewind/arrow-right.svg")} className="block size-6" />
            </SheetRow>
          </li>
        ))}
      </ul>
    </GlassSheet>
  );
}

/** 12px outlined square turned 45° (Figma icon placeholder). */
function DiamondIcon() {
  return (
    <span className="relative block size-6 overflow-clip">
      <span className="absolute top-1/2 left-1/2 flex size-[16.971px] -translate-1/2 items-center justify-center">
        <span className="block size-3 flex-none -rotate-45 rounded-[2px] border-2 border-brand-primary" />
      </span>
    </span>
  );
}
