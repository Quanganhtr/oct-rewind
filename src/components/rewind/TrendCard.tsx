import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface TrendCardProps {
  label: string;
  value: string;
  /** Bold start of the line under the value… */
  rank: string;
  /** …and the rest of it. */
  rankNote: string;
  /** Full-card gradient behind the image. */
  gradient: string;
  /** Artwork that fills the whole card. */
  image: string;
  /** Figma flips some artwork left to right. */
  mirrorImage?: boolean;
  /** "light": white text. "cream": Priority's cream text, with the note in Regular. */
  tone?: "light" | "cream";
  /** The ▲ in front of the value, in the text's color. */
  caret?: string;
}

/** Figma 4:3 card with a big rising number: ▲ value, and how it compares. */
export function TrendCard({
  label,
  value,
  rank,
  rankNote,
  gradient,
  image,
  mirrorImage = false,
  tone = "light",
  caret = "/rewind/caret-up.svg",
}: TrendCardProps) {
  return (
    <div className="relative flex aspect-[4/3] max-h-[276px] w-full max-w-[368px] shrink-0 overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-0", gradient)} />
      <img
        alt=""
        src={image}
        className={cn("absolute inset-0 block size-full max-w-none object-cover", mirrorImage && "-scale-x-100")}
      />

      <div className="relative flex min-w-px flex-1 flex-col">
        <div
          className={cn(
            "flex min-h-px w-full flex-1 flex-col items-start gap-1 px-4 pt-6 pb-4",
            tone === "cream" ? "text-cream" : "text-on-accent",
          )}
        >
          <p className="w-full text-sm leading-5 font-medium whitespace-pre-line">{label}</p>
          <div className="flex w-full items-center">
            <img alt="" src={asset(caret)} className="block size-8 shrink-0" />
            <p className="min-w-px flex-1 text-[48px] leading-14 font-bold">
              <CountUp value={value} />
            </p>
          </div>
          <p className={cn("w-full text-sm leading-5 whitespace-pre-line", tone === "cream" ? "font-normal" : "font-medium")}>
            <span className="font-bold">{rank}</span> {rankNote}
          </p>
        </div>
        <ShareButton tone="cream" className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
}
