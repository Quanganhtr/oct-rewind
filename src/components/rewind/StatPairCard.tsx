import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface StatPairCardProps {
  stats: { value: string; label: string }[];
  /** Bottom-anchored gradient, with its aspect ratio. */
  gradient: string;
  /** Artwork that fills the whole card. */
  image: string;
}

/** Figma square card with two figures side by side, low down, under full-card artwork. */
export function StatPairCard({ stats, gradient, image }: StatPairCardProps) {
  return (
    <div className="relative flex aspect-square max-h-[368px] w-full max-w-[368px] shrink-0 flex-col items-center justify-center overflow-clip rounded-card bg-page-light">
      <div className={cn("absolute inset-x-0 bottom-0", gradient)} />
      <img alt="" src={image} className="absolute inset-0 block size-full max-w-none object-cover" />

      <div className="relative flex min-h-px w-full flex-1 items-end gap-2 px-4 pt-4 text-center text-on-accent">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex min-w-px flex-1 flex-col items-center gap-1">
            <p className="w-full text-[32px] leading-10 font-bold whitespace-pre-line">
              <CountUp value={value} />
            </p>
            <p className="w-full text-sm leading-5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <ShareButton tone="cream" className="relative justify-center px-4 pt-4 pb-6" />
    </div>
  );
}
