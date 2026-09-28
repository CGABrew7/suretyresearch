import { AGENCIES } from "../data/agencies";
import { STATES } from "../data/states";
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
  "/about/",
  "/contact/",
  "/faq/",
  "/privacy/",
];

export function GET() {
  const urls = [
    ...staticPaths,
    ...AGENCIES.map((a) => `/agencies/${a.slug}/`),
    ...STATES.map((s) => `/states/${s.slug}/`),
    ...BOND_CATEGORIES.map((c) => `/bonds/${c.id}/`),
    ...data.types.map((t) => `/bonds/${t.id}/`),
  ];
  const unique = [...new Set(urls)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (path) => `  <url><loc>https://suretyresearch.com${path}</loc></url>`,
  )
  .join("\n")}
</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
