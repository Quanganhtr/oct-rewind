import type { Metadata } from "next";
import { RewindFlow } from "@/components/rewind/RewindFlow";
import { listImages } from "@/lib/listImages";

export const metadata: Metadata = {
  title: "Rewind 2026 · Private",
  description: "iPhone 16 prototype of the 2026 year-in-review chat, Private tier",
};

/**
 * Private borrows Priority's icons, year marks and some card art: preload those (not all of
 * Priority's art), its own art, and the stars and loader dots it shares with the base flow.
 */
const IMAGES = [
  ...listImages("priority").filter((path) => /^\/priority\/[^/]+\.svg$/.test(path)),
  "/priority/satin-full.png",
  "/priority/experience/haze-full.png",
  "/priority/experience/brand-full.png",
  ...listImages("private"),
  ...listImages("rewind/stars"),
  "/rewind/track-dot.svg",
];

export default function Private() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-stage">
      <RewindFlow tier="private" images={IMAGES} />
    </main>
  );
}
