import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

export interface StatRow {
  /** May break over several lines ("\n"); a one-line label keeps Figma's 24px row. */
  label: string;
  value: string;
  /** Leave the value still (a date, say, shouldn't count up). */
  fixed?: boolean;
}

interface StatStackCardProps {
  rows: StatRow[];
  /** Full-card gradient behind the image. */
  gradient: string;
  /** Artwork that fills the whole card. */
  image: string;
  /** Figma flips some artwork upside down. */
  flipImage?: boolean;
  /** "light": white text. "cream": Priority's cream text. */
  tone?: "light" | "cream";
  /** Share label: cream (default), or the text colour on Private's lighter art. */
  shareTone?: "cream" | "ink";
}

/** Figma 3:4 card with label/value pairs stacked on the left, over full-card artwork ("Chuyện sinh nhai"). */
export function StatStackCard({
  rows,
  gradient,
  image,
  flipImage = false,
  tone = "light",
  shareTone = "cream",
}: StatStackCardProps) {
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-0", gradient)} />
      <img
        alt=""
        src={image}
        className={cn("absolute inset-0 block size-full max-w-none object-cover", flipImage && "-scale-y-100")}
      />

      <div
        className={cn(
          "relative flex min-h-px w-full flex-1 flex-col items-start gap-4 px-4 pt-6 pb-4",
          tone === "cream" ? "text-cream" : "text-on-accent",
        )}
      >
        {rows.map(({ label, value, fixed }) => (
          <div key={label} className="flex w-full flex-col items-center justify-center gap-1">
            <p className="min-h-6 w-full text-sm leading-5 font-medium whitespace-pre-line">{label}</p>
            <p className="w-full text-[32px] leading-10 font-bold">{fixed ? value : <CountUp value={value} />}</p>
          </div>
        ))}
      </div>

      <ShareButton tone={shareTone} className="relative px-4 pt-4 pb-5" />
    </div>
  );
}
