import { asset } from "@/lib/asset";
import { TOPICS, TOPICS_PROMPT } from "@/data/rewind";
import { GlassSheet, SheetRow } from "./GlassSheet";

interface TopicMenuProps {
  /** Heading above the list — Step 4 "Kể mình nghe", later "Kể mình nghe tiếp". */
  prompt?: string;
  topics?: string[];
  onSelect?: (topic: string) => void;
}

/** Figma Step 4 topic icons: bag, wallet, chat-heart. */
const TOPIC_ICONS: Record<string, string> = {
  [TOPICS[0]]: "/rewind/topic-spending.svg",
  [TOPICS[1]]: "/rewind/topic-money.svg",
  [TOPICS[2]]: "/rewind/topic-love.svg",
};

/** Figma Step 4 "Bottom": the topics Tech Tech can talk about. */
export function TopicMenu({ prompt = TOPICS_PROMPT, topics = TOPICS, onSelect }: TopicMenuProps) {
  return (
    // p-[17px] = Figma's 16px + 1px stroke
    <GlassSheet className="p-[17px]">
      <p className="w-full text-sm leading-5 text-text-primary">{prompt}</p>
      <ul className="flex w-full flex-col items-start">
        {topics.map((topic, i) => (
          <li key={topic} className="w-full">
            <SheetRow divider={i < topics.length - 1} onPress={() => onSelect?.(topic)}>
              <span className="flex items-center gap-3">
                <span className="flex items-center justify-center overflow-clip rounded-lg bg-cream p-1">
                  <img alt="" src={asset(TOPIC_ICONS[topic])} className="block size-6" />
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
