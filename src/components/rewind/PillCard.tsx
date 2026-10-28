import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

export interface CardRow {
  label: string;
  value: string;
}

interface PillCardProps {
  /** Small line above the title… */
  label?: string;
  title: string;
  /** …or below it (Figma "Top 3 cái tên"). */
  subtitle?: string;
  /** Frosted pills under the title… */
  pills?: string[];
  /** …or label/value rows split by hairlines (Step 14 summary). */
  rows?: CardRow[];
  /** Full-card gradient (3:4, top-anchored). */
  gradient: string;
  /** Optional artwork, bottom-anchored. */
  art?: ReactNode;
  shareTone: "light" | "dark";
  /** Title and pill text: white (default) or dark, for light gradients (Figma "Quang vun vén"). */
  textTone?: "light" | "dark";
  /** Count up the numbers in the pills/rows too (amounts, not "Top 1"-style ranks). */
  countPills?: boolean;
}

/** Figma 3:4 card with a heading over pills (Step 9 "64 nơi") or rows (Step 14 summary). */
export function PillCard({
  label,
  title,
  subtitle,
  pills,
  rows,
  gradient,
  art,
  shareTone,
  textTone = "light",
  countPills = false,
}: PillCardProps) {
  const text = textTone === "dark" ? "text-text-primary" : "text-on-accent";
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-x-0 top-0 aspect-[3/4]", gradient)} />
      {art && <div className="absolute inset-x-0 bottom-0 aspect-[2/1] overflow-clip">{art}</div>}

      <div className="relative flex w-full shrink-0 flex-col items-start gap-4 px-4 pt-6 pb-4">
        <div className={cn("flex w-full flex-col items-center justify-center gap-1 text-center", text)}>
          {label && <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>}
          {/* Figma sets the title at 40px line height over pills, 44px over the summary's rows */}
          <p className={cn("w-full text-[32px] font-bold", rows ? "leading-11" : "leading-10")}>
            <CountUp value={title} />
          </p>
          {subtitle && <p className="w-full text-sm leading-5 font-medium">{subtitle}</p>}
        </div>
        {pills && (
          <ul className="flex w-full flex-col items-start gap-2">
            {pills.map((pill) => (
              <li
                key={pill}
                className="flex w-full items-center justify-center rounded-2xl bg-frost px-4 py-3 backdrop-blur-[15px]"
              >
                <p className={cn("min-w-px flex-1 text-center text-base leading-5 font-semibold", text)}>
                  {countPills ? <CountUp value={pill} /> : pill}
                </p>
              </li>
            ))}
          </ul>
        )}
        {rows && (
          <dl className="flex w-full flex-col text-on-accent">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex w-full items-center justify-between gap-4 border-b-[0.5px] border-row-line py-3 leading-5 whitespace-nowrap last:border-b-0"
              >
                <dt className="text-sm font-medium">{row.label}</dt>
                <dd className="text-base font-semibold">{countPills ? <CountUp value={row.value} /> : row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <ShareButton tone={shareTone} className="relative justify-center px-4 pt-4 pb-5" />
    </div>
  );
}
