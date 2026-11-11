import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

export interface CardRow {
  label: string;
  value: string;
}

interface PillCardProps {
  /** Small line above the title. */
  label?: string;
  title: string;
  /** 20px title under a shorter label, instead of 32px (Figma "Quang đã tậu được"). */
  compactTitle?: boolean;
  /** Frosted pills under the title… */
  pills?: string[];
  /** …or label/value rows split by hairlines (Step 14 summary). */
  rows?: CardRow[];
  /** Full-card gradient (3:4, top-anchored). */
  gradient: string;
  /** Optional artwork, bottom-anchored… */
  art?: ReactNode;
  /** …or artwork that fills the whole card. */
  fullArt?: boolean;
  shareTone: "light" | "dark" | "cream";
  /** Title and pill text: white (default) or dark, for light gradients (Figma "Quang vun vén"). */
  textTone?: "light" | "dark";
  /** Heading colour when it differs from the pills (Figma "12 brand": dark heading, white pills). */
  headingTone?: "light" | "dark";
  /** Count up the numbers in the pills/rows too (amounts, not "Top 1"-style ranks). */
  countPills?: boolean;
}

/** Figma 3:4 card with a heading over pills (Step 9 "64 nơi") or rows (Step 14 summary). */
export function PillCard({
  label,
  title,
  compactTitle = false,
  pills,
  rows,
  gradient,
  art,
  fullArt = false,
  shareTone,
  textTone = "light",
  headingTone = textTone,
  countPills = false,
}: PillCardProps) {
  const toneClass = (tone: "light" | "dark") => (tone === "dark" ? "text-text-primary" : "text-on-accent");
  const text = toneClass(textTone);
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-x-0 top-0 aspect-[3/4]", gradient)} />
      {art && (
        <div className={cn("absolute overflow-clip", fullArt ? "inset-0" : "inset-x-0 bottom-0 aspect-[2/1]")}>
          {art}
        </div>
      )}

      <div className="relative flex w-full shrink-0 flex-col items-start gap-4 px-4 pt-6 pb-4">
        <div
          className={cn("flex w-full flex-col items-center justify-center gap-1 text-center", toneClass(headingTone))}
        >
          {label && <p className={cn("w-full text-sm leading-5 font-medium", !compactTitle && "h-6")}>{label}</p>}
          {/* Figma sets the title at 40px line height over pills, 44px over the summary's rows */}
          <p
            className={cn(
              "w-full font-bold whitespace-pre-line",
              compactTitle ? "text-xl leading-7" : "text-[32px]",
              !compactTitle && (rows ? "leading-11" : "leading-10"),
            )}
          >
            <CountUp value={title} />
          </p>
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
