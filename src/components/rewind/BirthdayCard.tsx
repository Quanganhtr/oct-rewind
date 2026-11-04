import { asset } from "@/lib/asset";
import { BIRTHDAY_CARD } from "@/data/rewind";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** Figma "Chuyện thương ai" card: birthday wishes received through Techcombank. */
export function BirthdayCard() {
  const { title, subtitle } = BIRTHDAY_CARD;
  return (
    <div className="relative flex aspect-[4/3] max-h-[276px] w-full max-w-[368px] shrink-0 overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-market-1)_0%,var(--color-market-2)_22.04%,var(--color-market-3)_49.93%,var(--color-market-4)_71.56%,var(--color-market-5)_99.93%)]" />
      <img
        alt=""
        src={asset("/rewind/love/birthday-full.png")}
        className="absolute inset-0 block size-full max-w-none object-cover"
      />

      <div className="relative flex min-w-px flex-1 flex-col">
        <div className="flex min-h-px w-full flex-1 flex-col gap-1 px-4 pt-6 pb-4 text-on-accent">
          <p className="w-full text-[32px] leading-10 font-bold whitespace-pre-line">
            <CountUp value={title} />
          </p>
          <p className="w-full text-sm leading-5 font-medium whitespace-pre-line">{subtitle}</p>
        </div>
        <ShareButton tone="cream" className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
}
