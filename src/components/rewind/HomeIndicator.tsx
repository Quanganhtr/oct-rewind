import { cn } from "@/lib/cn";

/** iPhone home indicator: dark on light screens, light grey over dark art. */
export function HomeIndicator({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="relative h-[34px] w-full shrink-0">
      <div
        className={cn(
          "absolute bottom-2 left-[calc(50%-0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px]",
          tone === "light" ? "bg-indicator-light" : "bg-brand-primary",
        )}
      />
    </div>
  );
}
