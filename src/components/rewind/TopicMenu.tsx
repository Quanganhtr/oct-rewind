import { asset } from "@/lib/asset";
import { GlassSheet, SheetRow } from "./GlassSheet";
import { useTier } from "./TierContext";

interface TopicMenuProps {
  /** Heading above the list — Step 4's (the tier's), later "Kể mình nghe tiếp". */
  prompt?: string;
  topics?: string[];
  onSelect?: (topic: string) => void;
}

/** Figma Step 4 "Bottom": the topics Tech Tech can talk about (the tier's, unless given). */
export function TopicMenu({ prompt, topics, onSelect }: TopicMenuProps) {
  const tier = useTier();
  return (
    // p-[17px] = Figma's 16px + 1px stroke
    <GlassSheet className="p-[17px]">
      <p className="w-full text-sm leading-5 text-text-primary">{prompt ?? tier.topicsPrompt}</p>
      <ul className="flex w-full flex-col items-start">
        {(topics ?? tier.topics).map((topic, i, list) => (
          <li key={topic} className="w-full">
            <SheetRow divider={i < list.length - 1} onPress={() => onSelect?.(topic)}>
              <span className="flex items-center gap-3">
                <span className="flex items-center justify-center overflow-clip rounded-lg bg-cream p-1">
                  <img alt="" src={asset(tier.topicIcons[topic])} className="block size-6" />
                </span>
                <span className="text-base leading-5 font-semibold whitespace-nowrap text-text-primary">{topic}</span>
              </span>
              <img alt="" src={asset(`${tier.assetDir}/arrow-right.svg`)} className="block size-6" />
            </SheetRow>
          </li>
        ))}
      </ul>
    </GlassSheet>
  );
}
