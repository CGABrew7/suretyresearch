import { AGENCIES } from "../data/agencies";
import { BOND_CATEGORIES } from "../data/categories";
import data from "../data/bonds.json";

const staticPaths = [
  "/",
  "/agencies/",
  "/methodology/",
  "/bonds/",
  "/states/",
  "/guides/",
  "/guides/how-to-find-a-surety-bond-agency/",
  "/guides/how-surety-bonds-work/",
  "/guides/credit-score-impact/",
  "/guides/bond-vs-insurance/",
  "/guides/best-surety-bond-companies/",
  "/about/",
  "/contact/",
  "/faq/",
  "/privacy/",
  "/terms/",
];

export function GET() {
  const urls = [
    ...staticPaths,
    ...AGENCIES.map((a) => `/agencies/${a.slug}/`),
    // Per-state pages stay out of the sitemap until each one has sourced bond requirements.
    // Arizona and Nebraska are listed below because those pages now cite their statutes.
    ...BOND_CATEGORIES.map((c) => `/bonds/${c.id}/`),
    ...data.types.map((t) => `/bonds/${t.id}/`),
    // Arizona and Nebraska carry sourced bond requirements. Other state pages stay out.
    "/states/arizona/",
    "/states/nebraska/",
  ];
  const lastmodByPath: Record<string, string> = {
    "/guides/best-surety-bond-companies/": "2026-10-13",
    "/privacy/": "2026-10-19",
    "/terms/": "2026-10-19",
    "/bonds/contract/": "2026-11-07",
    "/states/arizona/": "2026-11-07",
    "/states/nebraska/": "2026-11-07",
  };
  const unique = [...new Set(urls)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map((path) => {
    const lastmod = lastmodByPath[path];
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
    return `  <url><loc>https://suretyresearch.com${path}</loc>${lastmodTag}</url>`;
  })
  .join("\n")}
</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
