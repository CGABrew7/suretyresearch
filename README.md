# SuretyResearch

A **surety-bond agency directory** for licensed professionals (mortgage, insurance, contractors), plus bond-type research. Static Astro site. Built for Cloudflare Pages.

Integrity First Insurance (IFI) is **always rank #1**. That is an editorial **Cornerstone Network Preferred Partner** placement — not a fabricated star score and not a claim that IFI is “#1 in America.” Other agencies and carriers are ordered by cited public signals (BBB letter grade, AM Best when sourced, years, coverage, bond-category breadth, Treasury-list mention). Missing data is omitted.

Owner: Jeff Brewer / Hanok.

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

1. **Preferred partner.** Any record with `preferredPartner: true` (IFI) is forced to rank 01 with the printed editorial reason.
2. **Scored names.** Points from verified-or-cited signals only:
   - BBB letter grade (A+ / A / A− / B-band)
   - AM Best (only if we cited a page)
   - Years since founding (capped)
   - Nationwide vs. known states
   - Number of bond series listed
   - Treasury / Circular 570 mention
3. **Honesty.** No invented Google or BBB numbers. No fake testimonials. Carriers usually need an appointed agent — IFI is the desk this site introduces first.

Agency source data lives in `src/data/agencies.ts`. Bond cost bands remain in `src/data/bonds.json`.

## Product map

| Path | What |
| --- | --- |
| `/` | Register hero, IFI #1, series, state picker, premium sketch |
| `/agencies/` | Full ranked list + filters |
| `/agencies/[slug]/` | Per-desk file, signals, sources, CTA |
| `/bonds/` and `/bonds/[id]/` | Series explainers + form cost bands |
| `/states/[slug]/` | Same register, state heading |
| `/methodology/` | Ranking disclosure |

## Compliance line

Informational only. Bonds are issued by licensed agents and admitted sureties. Not legal advice.
