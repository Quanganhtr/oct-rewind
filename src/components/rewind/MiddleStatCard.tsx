import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface MiddleStatCardProps {
  label: string;
  value: string;
  note: string;
  image: string;
  /** "light": white text. "cream": Priority/Private cream text. */
  tone?: "light" | "cream";
}

/**
 * Figma square card with one figure in the middle and the share button 24px under it, over
 * full-card art (Private "3 khiên vàng kiên cố").
 */
export function MiddleStatCard({ label, value, note, image, tone = "light" }: MiddleStatCardProps) {
  return (
    <div className="relative flex aspect-square w-full shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-card-base">
      <img alt="" src={asset(image)} className="absolute inset-0 block size-full max-w-none object-cover" />

      <div className="relative flex min-h-px w-full flex-1 flex-col items-center justify-center gap-6 px-4 pt-6 pb-4">
        <div
          className={cn(
            "flex w-full flex-col items-center gap-1 text-center",
            tone === "cream" ? "text-cream" : "text-on-accent",
          )}
        >
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-10 font-bold">
            <CountUp value={value} />
          </p>
          <p className="w-full text-sm leading-5 font-medium">{note}</p>
        </div>
        <ShareButton tone="cream" className="justify-center" />
      </div>
    </div>
  );
}
