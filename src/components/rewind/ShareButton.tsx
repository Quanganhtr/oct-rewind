import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { useTier } from "./TierContext";

interface ShareButtonProps {
  /**
   * "light": white circle + white label (on dark art). "dark": black circle + black label.
   * "cream": white circle + cream label. "ink": white circle + text-colour label (Private's light art).
   * A tier can swap the white circle and its icon (Private: a cream circle).
   */
  tone: "light" | "dark" | "cream" | "ink";
  className?: string;
}

/** Figma card "Button": 32px icon circle + "Chia sẻ ngay" (iOS Caption 1 Emphasized). */
export function ShareButton({ tone, className }: ShareButtonProps) {
  const { shareCircle } = useTier();
  const dark = tone === "dark";
  return (
    <button
      type="button"
      onClick={(e) => e.stopPropagation()}
      className={cn("flex w-full shrink-0 items-center gap-2", className)}
    >
      <span
        className={cn(
          "relative size-8 shrink-0 rounded-[150px]",
          dark ? "bg-brand-primary" : (shareCircle?.className ?? "bg-page-light backdrop-blur-[50px]"),
        )}
      >
        <span className="absolute top-2 left-2 size-4">
          <span className="absolute inset-[8.63%_12.5%_15.12%_12.5%]">
            <span className="absolute inset-[-6.15%_-6.25%]">
              <img
                alt=""
                src={asset(dark ? "/rewind/share-light.svg" : (shareCircle?.icon ?? "/rewind/share.svg"))}
                className="block size-full max-w-none"
              />
            </span>
          </span>
        </span>
      </span>
      <span
        className={cn(
          "font-sf text-[13px] leading-[18px] font-semibold tracking-[-0.08px] whitespace-nowrap",
          tone === "light" && "text-on-accent",
          dark && "text-brand-primary",
          tone === "cream" && "text-cream",
          tone === "ink" && "text-text-primary",
        )}
      >
        Chia sẻ ngay
      </span>
    </button>
  );
}
