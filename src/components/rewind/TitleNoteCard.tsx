import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

interface TitleNoteCardProps {
  label: string;
  title: string;
  /** Line(s) under the title; numbers in them count up. */
  notes: string[];
  /** Notes in Bold instead of Medium. */
  boldNotes?: boolean;
  image: string;
  /** Figma flips some artwork left to right. */
  mirrorImage?: boolean;
  /** A 50% white wash between the grey base and the art. */
  wash?: boolean;
  /** "light": white text. "cream": Priority's cream text. */
  tone?: "light" | "cream";
}

/** Figma 4:3 card over full-card art: small label, 32px title, a note or two, share at the foot. */
export function TitleNoteCard({
  label,
  title,
  notes,
  boldNotes = false,
  image,
  mirrorImage = false,
  wash = false,
  tone = "light",
}: TitleNoteCardProps) {
  return (
    <div className="relative flex aspect-[4/3] max-h-[276px] w-full max-w-[368px] shrink-0 overflow-clip rounded-card bg-card-base">
      {wash && <div className="absolute inset-0 bg-page-light/50" />}
      <img
        alt=""
        src={asset(image)}
        className={cn("absolute inset-0 block size-full max-w-none object-cover", mirrorImage && "-scale-x-100")}
      />

      <div className="relative flex min-w-px flex-1 flex-col">
        <div
          className={cn(
            "flex min-h-px w-full flex-1 flex-col gap-1 px-4 pt-6 pb-4",
            tone === "cream" ? "text-cream" : "text-on-accent",
          )}
        >
          <p className="h-6 w-full text-sm leading-5 font-medium">{label}</p>
          <p className="w-full text-[32px] leading-10 font-bold">{title}</p>
          <p className={cn("w-full text-sm leading-5", boldNotes ? "font-bold" : "font-medium")}>
            {notes.map((line) => (
              <span key={line} className="block">
                <CountUp value={line} />
              </span>
            ))}
          </p>
        </div>
        <ShareButton tone="cream" className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
}
