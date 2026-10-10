# SuretyResearch

A **surety-bond agency directory** for licensed professionals (mortgage, insurance, contractors), plus bond-type research. Static Astro site. Built for Cloudflare Pages.

SuretyResearch is affiliated with Cornerstone Licensing and Integrity First. Names are listed A to Z. Cards show cited public signals (BBB letter grade, AM Best when sourced, years, coverage, bond-category breadth, Treasury-list mention). Missing data is omitted. The site does not publish a score or a rank.

Owner: Hanok Ventures.

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

## How the register is built

Implemented in `src/lib/ranking.ts`, disclosed on `/methodology/`.

Names are sorted A to Z. A card shows a signal only when the file cites a source. Carriers usually need an appointed agent. Integrity First Insurance is the Alpharetta desk for this register.

Agency source data lives in `src/data/agencies.ts`. Bond cost bands remain in `src/data/bonds.json`.

## Product map

| Path | What |
| --- | --- |
| `/` | Register hero, IFI #1, series, state picker, premium sketch |
| `/agencies/` | Full A to Z list + filters |
| `/agencies/[slug]/` | Per-desk file, signals, sources, CTA |
| `/bonds/` and `/bonds/[id]/` | Series explainers + form cost bands |
| `/states/[slug]/` | Same register, state heading |
| `/methodology/` | How the files are built |

## Compliance line

Informational only. Bonds are issued by licensed agents and admitted sureties. Not legal advice.
