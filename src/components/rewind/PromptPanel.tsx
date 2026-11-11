import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { GlassSheet } from "./GlassSheet";
import { useTier } from "./TierContext";
import { TypedLine } from "./TypedLine";

interface PromptPanelProps {
  prompt: string;
  action: string;
  /** Type the prompt into the sheet word by word (the closing "Tổng kết lại cho mình nha"). */
  typed?: boolean;
  onAction?: () => void;
}

/** Figma Step 8 "Bottom": Tech Tech's next question inside the sheet, with a send button. */
export function PromptPanel({ prompt, action, typed = false, onAction }: PromptPanelProps) {
  const { assetDir, sendButtonClass } = useTier();
  return (
    // p-[17px] = Figma's 16px + 1px stroke
    <GlassSheet className="p-[17px]">
      {typed ? (
        // Starts once the sheet has mostly slid in
        <TypedLine text={prompt} age={0} stayVisible variant="prompt" delay={0.5} />
      ) : (
        <p className="w-full text-base leading-6 text-text-primary">{prompt}</p>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAction?.();
        }}
        className={cn("flex shrink-0 items-center justify-center gap-2.5 rounded-rounded bg-brand-primary", sendButtonClass)}
      >
        <span className="text-base leading-6 font-medium whitespace-nowrap text-on-brand">{action}</span>
        <img alt="" src={asset(`${assetDir}/send.svg`)} className="block size-6" />
      </button>
    </GlassSheet>
  );
}
