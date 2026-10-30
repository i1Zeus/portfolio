// Renders the 1200×630 share cards into public/og/ with a real browser (Arabic needs proper text shaping):
//   home-en.jpg, home-ar.jpg and <slug>-en.jpg / <slug>-ar.jpg for every project in content/projects/.
// Run after adding or renaming a project: `npm run og`. Needs network access for Google Fonts.
// Uses Playwright's Chromium if installed (`npx playwright install chromium`), otherwise Microsoft Edge.
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const OUT = "public/og";
const PROJECTS = "content/projects";
mkdirSync(OUT, { recursive: true });

// Project files only use `import type`, so Node's built-in type stripping can load them directly.
const projects = [];
for (const file of readdirSync(PROJECTS)) {
  if (!file.endsWith(".ts") || ["index.ts", "types.ts"].includes(file)) continue;
  projects.push((await import(pathToFileURL(join(PROJECTS, file)).href)).default);
}
projects.sort((a, b) => a.order - b.order);

const dataUri = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const logo = dataUri("app/icon.png", "image/png");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Geist+Mono:wght@400;500&family=Geist:wght@400;500&family=Cairo:wght@400;600;700&display=block" rel="stylesheet">`;
const css = `*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;background:#050505;color:#f2f2ee;overflow:hidden}
body{position:relative;font-family:Geist,sans-serif}
[dir=rtl] body,[dir=rtl] .label{font-family:Cairo,sans-serif;letter-spacing:0;text-transform:none}
.frame{position:absolute;inset:14px;border:1px solid rgba(242,242,238,.28)}
.grain{position:absolute;inset:0;opacity:.08;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.label{font-family:'Geist Mono',monospace;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:rgba(242,242,238,.65)}
[dir=rtl] .label{font-size:24px}
.display{font-family:'Big Shoulders',sans-serif;font-weight:300;text-transform:uppercase;line-height:.84;letter-spacing:-.01em}
[dir=rtl] .display{font-family:Cairo,sans-serif;font-weight:600;line-height:1.2;text-transform:none;letter-spacing:0}
.dots{position:absolute;background-image:radial-gradient(rgba(242,242,238,.55) 1.2px,transparent 1.6px);background-size:9px 9px;-webkit-mask-image:radial-gradient(circle at center,#000 25%,transparent 70%)}
.chip{display:inline-block;border:1px solid rgba(242,242,238,.28);padding:7px 12px;font-family:'Geist Mono',monospace;font-size:17px;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,242,238,.75);margin:0 0 8px;margin-inline-end:8px}
.logo{width:64px;height:64px;filter:invert(1)}`;
const page = (dir, body) =>
  `<!doctype html><html dir="${dir}"><head>${fonts}<style>${css}</style></head><body>${body}<div class="grain"></div><div class="frame"></div></body></html>`;
const chips = (tags) => tags.slice(0, 5).map((t) => `<span class="chip" dir="ltr">${esc(t)}</span>`).join("");

const home = (locale) => {
  const ar = locale === "ar";
  return page(
    ar ? "rtl" : "ltr",
    `<div class="dots" style="width:760px;height:760px;${ar ? "left" : "right"}:-170px;top:-110px"></div>
<div style="position:absolute;inset:56px 64px;display:flex;flex-direction:column;justify-content:space-between">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <img class="logo" src="${logo}"><span class="label" dir="ltr">hussein-najah.com</span>
  </div>
  <div>
    <div class="label" style="margin-bottom:22px">${ar ? "مهندس برمجيات · ويب متكامل · البصرة، العراق" : "Full-stack software engineer · Basra, Iraq"}</div>
    <div class="display" style="font-size:${ar ? 140 : 176}px">${ar ? "حسين نجاح" : "Hussein<br>Najah"}</div>
    <div style="margin-top:30px">${chips(["Next.js", "React", "TypeScript", "NestJS", "ERP"])}</div>
  </div>
</div>`
  );
};

const project = (p, locale) => {
  const ar = locale === "ar";
  const title = p.title[locale];
  const subtitle = p.subtitle?.[locale];
  const size = title.length > 16 ? (ar ? 84 : 112) : ar ? 110 : 150;
  const side = ar ? "left" : "right";
  return page(
    ar ? "rtl" : "ltr",
    `<div style="position:absolute;${side}:-60px;top:70px;width:640px;height:470px;border:1px solid rgba(242,242,238,.28);background:#0b0b0b url('${dataUri(join("public", p.cover), "image/webp")}') top center/cover"></div>
<div style="position:absolute;${side}:-60px;top:70px;width:640px;height:470px;background:linear-gradient(${ar ? 270 : 90}deg,#050505 0%,rgba(5,5,5,.15) 30%,transparent 60%)"></div>
<div style="position:absolute;top:56px;bottom:56px;${ar ? "right" : "left"}:64px;width:560px;display:flex;flex-direction:column;justify-content:space-between">
  <div style="display:flex;align-items:center;gap:20px"><img class="logo" src="${logo}" style="width:56px;height:56px"><span class="label">${ar ? "دراسة حالة" : "Case study"}</span></div>
  <div>
    <div class="display" style="font-size:${size}px">${esc(title)}</div>
    ${subtitle ? `<div class="label" style="margin-top:18px;color:rgba(242,242,238,.8)">${esc(subtitle)}</div>` : ""}
    <div style="margin-top:28px">${chips(p.tags)}</div>
  </div>
  <span class="label">${ar ? "حسين نجاح" : "Hussein Najah"} — <span dir="ltr">hussein-najah.com</span></span>
</div>`
  );
};

const browser = await chromium.launch().catch(() => chromium.launch({ channel: "msedge" }));
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const shoot = async (html, file) => {
  await tab.setContent(html, { waitUntil: "load", timeout: 90_000 });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: join(OUT, file), type: "jpeg", quality: 86 });
  console.log(`${OUT}/${file}`);
};
for (const locale of ["en", "ar"]) {
  await shoot(home(locale), `home-${locale}.jpg`);
  for (const p of projects) await shoot(project(p, locale), `${p.slug}-${locale}.jpg`);
}
await browser.close();
