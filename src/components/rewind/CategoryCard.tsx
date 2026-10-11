import { asset } from "@/lib/asset";
import { FASHION_CARD } from "@/data/rewind";
import { ShareButton } from "./ShareButton";

/** Figma Step 7 "Card": top spending category over a dark-to-amber gradient. Fills the chat width (4:3). */
export function CategoryCard() {
  const { title, caption } = FASHION_CARD;

  return (
    <div className="relative flex aspect-[4/3] max-h-[276px] w-full max-w-[368px] shrink-0 items-start overflow-clip rounded-card bg-page-light">
      <div className="absolute inset-x-0 bottom-0 aspect-[400/300] bg-[linear-gradient(180deg,var(--color-fashion-1)_0.18%,var(--color-fashion-2)_40.46%,var(--color-fashion-3)_62.4%,var(--color-fashion-4)_80.88%,var(--color-fashion-5)_100%)]" />
      <div className="absolute top-0 right-0 bottom-0 flex w-[184px] flex-col items-end justify-center overflow-clip">
        <img
          alt=""
          src={asset("/rewind/fashion-bag.png")}
          className="block h-[271px] w-[184px] max-w-none shrink-0 object-cover"
        />
      </div>

      <div className="relative flex h-full min-w-px flex-1 flex-col items-start">
        <div className="flex min-h-px w-full flex-1 flex-col items-start gap-2 px-4 pt-6 pb-4">
          <div className="flex min-h-px w-full flex-1 flex-col items-center gap-1 text-on-accent">
            <p className="w-full text-[32px] leading-11 font-bold">{title}</p>
            <p className="w-full text-sm leading-5 font-medium whitespace-pre-line">{caption}</p>
          </div>
        </div>
        <ShareButton tone="dark" className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
}
