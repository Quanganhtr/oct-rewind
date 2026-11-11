import { RewindFlow } from "@/components/rewind/RewindFlow";
import { listImages } from "@/lib/listImages";

/** Every image under public/rewind, so Loading can preload them all. */
const IMAGES = listImages("rewind");

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-stage">
      <RewindFlow images={IMAGES} />
    </main>
  );
}
