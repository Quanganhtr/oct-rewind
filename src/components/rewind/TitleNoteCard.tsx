import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { ShareButton } from "./ShareButton";

/** A line under the title: plain text, or Bold and/or left still (a "Top 2%" rank shouldn't count). */
export type NoteLine = string | { text: string; bold?: boolean; fixed?: boolean };

interface TitleNoteCardProps {
  label: string;
  title: string;
  /** Count up the number in the title ("Tăng 18%"). */
  countTitle?: boolean;
  /** Line(s) under the title; numbers in them count up unless `fixed`. None: just label and title. */
  notes?: NoteLine[];
  /** Every note in Bold instead of Medium. */
  boldNotes?: boolean;
  image: string;
  /** Figma flips some artwork left to right. */
  mirrorImage?: boolean;
  /** A 50% white wash between the grey base and the art. */
  wash?: boolean;
  /** "light": white text. "cream": Priority's cream text. */
  tone?: "light" | "cream";
  /** Share label colour: cream (default) or the text colour ("ink", for light art). */
  shareTone?: "cream" | "ink";
}

/** Figma 4:3 card over full-card art: small label, 32px title, a note or two, share at the foot. */
export function TitleNoteCard({
  label,
  title,
  countTitle = false,
  notes = [],
  boldNotes = false,
  image,
  mirrorImage = false,
  wash = false,
  tone = "light",
  shareTone = "cream",
}: TitleNoteCardProps) {
  return (
    <div className="relative flex aspect-[4/3] w-full shrink-0 overflow-clip rounded-card bg-card-base">
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
          <p className="w-full text-[32px] leading-10 font-bold">{countTitle ? <CountUp value={title} /> : title}</p>
          {notes.length > 0 && (
            <p className="w-full text-sm leading-5 font-medium">
              {notes.map((note) => {
                const { text, bold = boldNotes, fixed = false } = typeof note === "string" ? { text: note } : note;
                return (
                  <span key={text} className={cn("block", bold && "font-bold")}>
                    {fixed ? text : <CountUp value={text} />}
                  </span>
                );
              })}
            </p>
          )}
        </div>
        <ShareButton tone={shareTone} className="px-4 pt-4 pb-6" />
      </div>
    </div>
  );
}
