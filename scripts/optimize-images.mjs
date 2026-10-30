// Converts raw screenshots to web-ready WebP.
//   assets/raw/<slug>/<name>.(png|jpg|jpeg|webp)  →  public/project/<slug>/<name>.webp
// Images are capped at 1600px wide. Files whose output is newer than the input are skipped,
// so running it twice is a no-op. assets/raw/ is gitignored; only the WebP output is committed.
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { extname, join, parse } from "node:path";
import sharp from "sharp";

const RAW = "assets/raw";
const OUT = "public/project";
const INPUT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

if (!existsSync(RAW)) {
  console.log(`Nothing to do: put screenshots in ${RAW}/<project-slug>/ first.`);
  process.exit(0);
}

let converted = 0;
let skipped = 0;
for (const slug of readdirSync(RAW)) {
  const dir = join(RAW, slug);
  if (!statSync(dir).isDirectory()) continue;
  mkdirSync(join(OUT, slug), { recursive: true });

  for (const file of readdirSync(dir)) {
    if (!INPUT.has(extname(file).toLowerCase())) continue;
    const input = join(dir, file);
    const output = join(OUT, slug, `${parse(file).name}.webp`);
    if (existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs) {
      skipped++;
      continue;
    }
    const info = await sharp(input)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output);
    const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
    console.log(`${input} (${kb(statSync(input).size)}) → ${output} (${kb(info.size)}, ${info.width}×${info.height})`);
    converted++;
  }
}
console.log(`Done: ${converted} converted, ${skipped} up to date.`);
