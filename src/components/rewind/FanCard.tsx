import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { FAN_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện sinh nhai - 9" card: the reader's most loyal customer — who, how often, how much. */
export function FanCard() {
  return (
    <div className="relative flex aspect-[3/4] w-full shrink-0 flex-col items-center overflow-clip rounded-card bg-page-light">
      {/* Pale at the top, deepening to navy at the bottom */}
      <div className="absolute inset-x-0 top-0 aspect-[3/4] bg-[linear-gradient(180deg,var(--color-brands-5)_0%,var(--color-brands-4)_24.04%,var(--color-brands-3)_53.37%,var(--color-brands-2)_77.4%,var(--color-brands-1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 aspect-[2/1] overflow-clip">
        <img
          alt=""
          src={asset("/rewind/livelihood/fan-crown.png")}
          className="absolute top-0 left-0 block h-[180.5px] w-[361px] max-w-none object-cover"
        />
      </div>

      <div className="relative flex min-h-px w-full flex-1 flex-col items-start gap-4 px-4 pt-6 pb-4">
        {FAN_CARD.rows.map(({ label, value }, i) => (
          // The first row sits on the pale top of the gradient, so it's dark; the rest are white
          <div
            key={label}
            className={cn("flex w-full flex-col gap-1", i === 0 ? "text-text-primary" : "text-on-accent")}
          >
            <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
            <p className="w-full text-[32px] leading-10 font-bold">
              <CountUp value={value} />
            </p>
          </div>
        ))}
      </div>

      <ShareButton tone="dark" className="relative px-4 pt-4 pb-5" />
    </div>
  );
}
