import type { Metadata } from "next";
import { RewindFlow } from "@/components/rewind/RewindFlow";
import { listImages } from "@/lib/listImages";

export const metadata: Metadata = {
  title: "Rewind 2026 · Priority",
  description: "iPhone 16 prototype of the 2026 year-in-review chat, Priority tier",
};

/** The tier's own images, plus the stars and loader dots it shares with the base flow. */
const IMAGES = [...listImages("priority"), ...listImages("rewind/stars"), "/rewind/track-dot.svg"];

export default function Priority() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-stage">
      <RewindFlow tier="priority" images={IMAGES} />
    </main>
  );
}
