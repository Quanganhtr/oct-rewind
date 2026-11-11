import { asset } from "@/lib/asset";
import { GlassSheet, SheetRow } from "./GlassSheet";
import { useTier } from "./TierContext";

interface AnswerPanelProps {
  answers: string[];
  onSelect?: (answer: string) => void;
}

/** Figma Step 5 "Bottom": quiz answers with radio buttons. */
export function AnswerPanel({ answers, onSelect }: AnswerPanelProps) {
  return (
    // px-[17px] py-[9px] = Figma's px-4 py-2 + 1px stroke
    <GlassSheet className="px-[17px] py-[9px]">
      <ul className="flex w-full flex-col items-start">
        {answers.map((answer, i) => (
          <li key={answer} className="w-full">
            <SheetRow divider={i < answers.length - 1} onPress={() => onSelect?.(answer)}>
              <span className="text-base leading-5 font-semibold whitespace-nowrap text-text-primary">
                {answer}
              </span>
              <Radio />
            </SheetRow>
          </li>
        ))}
      </ul>
    </GlassSheet>
  );
}

/**
 * Figma "Radio" (unselected): 20px cream circle with a 29% outline, 12px inner dot, in a 24px box.
 * A tier can swap in its own (Priority's has a gradient ring).
 */
function Radio() {
  const { radioIcon } = useTier();
  if (radioIcon) return <img alt="" src={asset(radioIcon)} className="block size-6 shrink-0" />;
  return (
    <span aria-hidden className="relative flex size-6 shrink-0 items-center justify-center">
      <span className="flex size-5 items-center justify-center rounded-full border border-stroke/29 bg-radio">
        <span className="size-3 rounded-full bg-radio" />
      </span>
    </span>
  );
}
