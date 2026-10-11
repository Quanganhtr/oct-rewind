import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface PillCardProps {
  label: string;
  title: string;
  pills: string[];
  /** Full-card gradient (3:4, top-anchored). */
  gradient: string;
  /** Optional artwork, bottom-anchored. */
  art?: ReactNode;
  shareTone: "light" | "dark";
  /** Count up the numbers in the pills too (amounts, not "Top 1"-style ranks). */
  countPills?: boolean;
}

/** Figma 3:4 card with a heading and frosted pills (Step 9 "64 nơi", Step 14 summary). */
export function PillCard({ label, title, pills, gradient, art, shareTone, countPills = false }: PillCardProps) {
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-x-0 top-0 aspect-[3/4]", gradient)} />
      {art && <div className="absolute inset-x-0 bottom-0 aspect-[2/1] overflow-clip">{art}</div>}

      <div className="relative flex w-full shrink-0 flex-col items-start gap-4 px-4 pt-6 pb-4">
        <div className="flex w-full flex-col items-center justify-center gap-1 text-center text-on-accent">
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-11 font-bold">
            <CountUp value={title} />
          </p>
        </div>
        <ul className="flex w-full flex-col items-start gap-2">
          {pills.map((pill) => (
            <li key={pill} className="flex w-full items-center justify-center rounded-2xl bg-frost px-4 py-3">
              <p className="min-w-px flex-1 text-center text-base leading-5 font-semibold text-on-accent">
                {countPills ? <CountUp value={pill} /> : pill}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <ShareButton tone={shareTone} className="relative justify-center px-4 pt-4 pb-5" />
    </div>
  );
}
