import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface CenterStatCardProps {
  label: string;
  value: string;
  /** Line(s) under the value; Figma keeps its space even when there's none. */
  note?: ReactNode;
  /** 32px value under a taller label, instead of 20px. */
  large?: boolean;
  /** Full-card gradient behind the image. */
  gradient: string;
  /** Artwork that fills the whole card. */
  image: string;
  /** "light": white text. "cream": Priority's cream text. */
  tone?: "light" | "cream";
}

/** Figma square card with one centred figure low down, under full-card artwork ("Chuyện tiền tài"). */
export function CenterStatCard({
  label,
  value,
  note,
  large = false,
  gradient,
  image,
  tone = "light",
}: CenterStatCardProps) {
  return (
    <div className="relative flex aspect-square w-full shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-0", gradient)} />
      <img alt="" src={image} className="absolute inset-0 block size-full max-w-none object-cover" />

      <div
        className={cn(
          "relative flex min-h-px w-full flex-1 items-end px-4 pt-4 text-center",
          tone === "cream" ? "text-cream" : "text-on-accent",
        )}
      >
        <div className="flex min-w-px flex-1 flex-col items-center gap-1">
          <p className={cn("w-full text-sm leading-5 font-medium", large && "h-6")}>{label}</p>
          <p className={cn("w-full font-bold", large ? "text-[32px] leading-10" : "text-xl leading-7")}>
            <CountUp value={value} />
          </p>
          <p className="min-h-5 w-full text-sm leading-5 font-medium">{note}</p>
        </div>
      </div>

      <ShareButton tone="cream" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
