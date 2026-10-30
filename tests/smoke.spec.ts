import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { projects } from "@/content/projects";

const pages = [
  "/en",
  "/ar",
  "/en/cv",
  "/ar/cv",
  "/en/nfc",
  "/ar/qr",
  ...projects.flatMap((p) => [`/en/project/${p.slug}`, `/ar/project/${p.slug}`]),
];

/** Collects console errors and uncaught exceptions for the lifetime of a page. */
const trackErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // Browsers log blocked navigator.vibrate before a user gesture; not an app error.
    if (m.type() === "error" && !m.text().includes("navigator.vibrate")) errors.push(m.text());
  });
  return errors;
};

test.describe("every page", () => {
  for (const path of pages) {
    test(`${path} renders cleanly`, async ({ page }) => {
      const errors = trackErrors(page);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const ar = path.startsWith("/ar");
      await expect(page.locator("html")).toHaveAttribute("lang", ar ? "ar" : "en");
      await expect(page.locator("html")).toHaveAttribute("dir", ar ? "rtl" : "ltr");
      await expect(page.locator("h1")).toHaveCount(1);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "no horizontal scroll").toBeLessThanOrEqual(0);

      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }
});

test.describe("SEO tags", () => {
  test.skip(({ isMobile }) => isMobile, "markup is the same on mobile");

  for (const path of pages) {
    test(`${path} has canonical, hreflang, share image and valid JSON-LD`, async ({ page, request }) => {
      await page.goto(path);
      const head = page.locator("head");

      const canonical = await head.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toMatch(/^https:\/\//);
      for (const lang of ["en", "ar", "x-default"]) {
        await expect(head.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1);
      }
      await expect(head.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);

      const ogImage = await head.locator('meta[property="og:image"]').getAttribute("content");
      const imagePath = new URL(ogImage!).pathname;
      expect((await request.get(imagePath)).status(), `og:image ${imagePath}`).toBe(200);

      for (const script of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(script)).not.toThrow();
      }
    });
  }
});

test.describe("accessibility", () => {
  test.skip(({ isMobile }) => isMobile, "run once per page");

  for (const path of ["/en", "/ar", "/en/cv", "/en/nfc", `/en/project/${projects[0].slug}`]) {
    test(`${path} has no serious axe violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      // Reveal animations start hidden; jump to the final state so axe checks what users end up seeing.
      await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
      await page.evaluate(() => document.querySelectorAll(".reveal, .split").forEach((el) => el.setAttribute("data-in", "")));
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.nodes.length}× ${v.nodes[0]?.target.join(" ")}`);
      expect(serious).toEqual([]);
    });
  }
});

test.describe("keyboard", () => {
  test.skip(({ isMobile }) => isMobile, "the sideways Work track is desktop only");

  for (const locale of ["en", "ar"]) {
    test(`focusing the last project card in /${locale} scrolls it into view`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const lastCard = page.locator("#work article").last().getByRole("link").first();
      await lastCard.focus();
      await expect(lastCard).toBeInViewport();
    });
  }
});

test.describe("routing and server", () => {
  test.skip(({ isMobile }) => isMobile, "server behaviour is device independent");

  test("legacy numeric project URLs redirect permanently", async ({ request }) => {
    const res = await request.get("/en/project/6", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/en\/project\/ima-portal$/);
  });

  test("root redirects by Accept-Language", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "ar-IQ,ar;q=0.9" } });
    expect(res.status()).toBe(307);
    expect(res.headers().location).toMatch(/\/ar$/);
  });

  test("unknown pages return 404", async ({ request }) => {
    expect((await request.get("/en/project/does-not-exist")).status()).toBe(404);
    expect((await request.get("/en/nothing-here")).status()).toBe(404);
  });

  test("security headers are set", async ({ request }) => {
    const headers = (await request.get("/en")).headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("sitemap, robots and manifest are valid and every sitemap URL resolves", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    expect((await request.get("/manifest.webmanifest")).status()).toBe(200);
    const xml = await (await request.get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<(?:loc|image:loc)>([^<]+)</g)].map((m) => new URL(m[1]).pathname);
    expect(urls.length).toBeGreaterThan(20);
    for (const url of urls) expect((await request.get(url)).status(), url).toBe(200);
  });
});
