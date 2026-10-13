import { readdirSync } from "node:fs";
import { join } from "node:path";
import { RewindFlow } from "@/components/rewind/RewindFlow";

/** Every image under public/rewind, listed at build time so Loading can preload them all. */
const IMAGES = readdirSync(join(process.cwd(), "public/rewind"), { recursive: true, encoding: "utf8" })
  .filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
  .map((file) => `/rewind/${file.split("\\").join("/")}`)
  .sort();

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-stage">
      <RewindFlow images={IMAGES} />
    </main>
  );
}
