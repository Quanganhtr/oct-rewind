import { readdirSync } from "node:fs";
import { join } from "node:path";

/** Every image under public/<dir>, as public paths — read at build time so Loading can preload them. */
export function listImages(dir: string) {
  return readdirSync(join(process.cwd(), "public", dir), { recursive: true, encoding: "utf8" })
    .filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
    .map((file) => `/${dir}/${file.split("\\").join("/")}`)
    .sort();
}
