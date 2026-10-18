# SuretyResearch

A **surety-bond agency directory** for licensed professionals (mortgage, insurance, contractors), plus bond-type research. Static Astro site. Built for Cloudflare Pages.

Every agency and carrier, including Integrity First Insurance (the Cornerstone Network Preferred Partner), is ordered by the public-signal score: BBB letter grade, AM Best when sourced, years, coverage, bond-category breadth, and Treasury Circular 570. The partner label stays on the card. The score sets the rank.

Byline: SuretyResearch.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build    # writes ./dist
npm run preview  # serves the build
```

Node 20+ recommended.

## Cloudflare Pages

1. Dash → Workers & Pages → Create → Connect `CGABrew7/suretyresearch`.
2. Framework preset: **Astro**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Root: `/`
6. Attach `suretyresearch.com` after the first green deploy.

No environment variables are required for the static register.

## How ranking works

Implemented in `src/lib/ranking.ts`, disclosed on `/methodology/`.

1. **One score.** Every record, including `preferredPartner: true` (IFI), is scored from cited public signals and sorted by that score. Ties break by older founding year, then name. The partner is labeled, not pinned.
2. **Points.** Points from verified-or-cited signals only:
   - BBB letter grade (A+ / A / A− / B-band)
   - AM Best (only if we cited a page)
   - Years since founding (capped)
   - Nationwide vs. known states
   - Number of bond series listed
   - Treasury / Circular 570 mention
3. **Sources.** Figures that come from a statute, an insurance department, Treasury Circular 570, or the Surety & Fidelity Association of America are linked. Carriers usually need an appointed agent. Integrity First Insurance is the Cornerstone network placement desk, and its rank is that same public-signal score.

Agency source data lives in `src/data/agencies.ts`. Bond cost bands remain in `src/data/bonds.json`.

## Product map

| Path | What |
| --- | --- |
| `/` | Register hero, scored files, series, state picker, premium sketch |
| `/agencies/` | Full ranked list + filters |
| `/agencies/[slug]/` | Per-desk file, signals, sources, CTA |
| `/bonds/` and `/bonds/[id]/` | Series explainers + form cost bands |
| `/states/[slug]/` | Same register, state heading |
| `/methodology/` | Ranking disclosure |

## Compliance line

Informational only. Bonds are issued by licensed agents and admitted sureties. Not legal advice.

Content rules for every new or edited page: [CONTENT_RULES.md](CONTENT_RULES.md).
