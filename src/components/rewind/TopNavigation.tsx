import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";

interface TopNavigationProps {
  /** Background the bar sits on — picks the matching icon set and label color. */
  tone: "dark" | "light";
  onClose?: () => void;
  className?: string;
}

export function TopNavigation({ tone, onClose, className }: TopNavigationProps) {
  const icon = (name: string) => asset(`/rewind/${name}-${tone}-bg.svg`);
  const label = tone === "dark" ? "text-on-accent" : "text-text-primary";

  return (
    <div className={cn("relative flex w-full shrink-0 flex-col items-start", className)}>
      {/* Status Bar - iPhone */}
      <div className="flex h-[50px] w-full shrink-0 flex-col items-start pt-[21px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-px flex-1 items-center justify-center pr-1.5 pl-4">
            <p
              className={cn(
                "font-sf text-[17px] leading-[22px] font-semibold whitespace-nowrap",
                tone === "dark" ? "text-on-accent" : "text-brand-primary",
              )}
            >
              9:41
            </p>
          </div>
          <div className="h-2.5 w-[124px] shrink-0" />
          <div className="flex min-w-px flex-1 items-center justify-center gap-[7px] pr-4 pl-1.5">
            <img alt="" src={icon("cellular")} className="block h-[12.226px] w-[19.2px]" />
            <img alt="" src={icon("wifi")} className="block h-[12.328px] w-[17.142px]" />
            <img alt="" src={icon("battery")} className="block h-[13px] w-[27.328px]" />
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-start px-4 py-2.5">
          <div className="flex items-center justify-center gap-3">
            <img alt="" src={icon("logo")} className="block size-7" />
            <p className={cn("text-xs leading-5 font-semibold whitespace-nowrap", label)}>
              Techcombank Rewind
            </p>
          </div>
        </div>
        <div className="flex min-w-px flex-1 items-center justify-end gap-4 px-4 py-2.5">
          <button type="button" aria-label="Âm thanh" className="size-7">
            <img alt="" src={icon("sound")} className="block size-7" />
          </button>
          <button type="button" aria-label="Đóng" onClick={onClose} className="size-7">
            <img alt="" src={icon("close")} className="block size-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
