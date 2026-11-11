import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassSheetProps {
  children: ReactNode;
  /** Card padding — Figma uses p-4 for the topic menu, px-4 py-2 for answers (+1px for the stroke). */
  className?: string;
}

/** Figma "Bottom": frosted card over a fade-to-white, with room for the home indicator. */
export function GlassSheet({ children, className }: GlassSheetProps) {
  return (
    <div className="flex w-full flex-col items-start bg-linear-to-b from-cream/0 to-cream">
      <div className="flex w-full flex-col items-center justify-center px-4 pt-4">
        {/* 1px outline, top → bottom sheet-edge colors (#303030 29% → 0% on the base tier): a gradient
            ring masked to the edge, since border-image can't follow rounded corners. */}
        <div
          className={cn(
            "relative flex w-full flex-col items-end gap-3 overflow-clip rounded-card bg-glass backdrop-blur-[50px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-sheet-edge-top before:to-sheet-edge-bottom before:p-px before:content-[''] before:[mask:linear-gradient(black_0_0)_content-box_exclude,linear-gradient(black_0_0)]",
            className,
          )}
        >
          {children}
        </div>
      </div>
      {/* Room for the home indicator, which floats above this */}
      <div className="h-[34px] w-full shrink-0" />
    </div>
  );
}

interface SheetRowProps {
  children: ReactNode;
  divider: boolean;
  onPress?: () => void;
}

/** A tappable list row with Figma's 16px vertical padding and hairline divider. */
export function SheetRow({ children, divider, onPress }: SheetRowProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
      className={cn("flex w-full items-center justify-between py-4", divider && "border-b border-divider")}
    >
      {children}
    </button>
  );
}
