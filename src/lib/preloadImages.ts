import { asset } from "./asset";

/** Never hold the Start screen longer than this, even if a request hangs. */
const GIVE_UP_AFTER = 20_000;

/**
 * Downloads and decodes every image (plus the web fonts) so nothing pops in after Loading.
 * Reports progress 0 → 1; a failed image still counts as done so one bad file can't stall it.
 * Returns a cancel function.
 */
export function preloadImages(paths: string[], onProgress: (fraction: number) => void) {
  let cancelled = false;
  let done = 0;
  const total = paths.length + 1; // + fonts
  const report = () => !cancelled && onProgress(Math.min(1, done / total));
  const tick = () => {
    done += 1;
    report();
  };

  // Kept in this closure so the browser can't drop them before they finish
  const images = paths.map((path) => {
    const img = new Image();
    img.decoding = "async";
    img.src = asset(path);
    img.decode().then(tick, tick);
    return img;
  });
  document.fonts.ready.then(tick, tick);

  const giveUp = setTimeout(() => {
    done = total;
    report();
  }, GIVE_UP_AFTER);

  return () => {
    cancelled = true;
    clearTimeout(giveUp);
    images.length = 0;
  };
}
