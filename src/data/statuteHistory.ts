/**
 * Bond statutes verified in the Global Law submodules pinned by
 * https://github.com/lexifina/global-law (commit 937e01dab4978e25a678a202728a65335de37257).
 * Each `commit` is that pin. Each `path` was opened in the submodule and
 * read before it was listed here. Titles 1, 3, 4, 9, 11, 13, 17, 35, and 39
 * are the only United States Code titles in the corpus. This site's federal
 * citations are 40 U.S.C. § 3131 and 49 CFR § 387.307, which are not in it.
 */

export interface StatuteFile {
  /** Citation and subject taken from the statute file that was read. */
  label: string;
  path: string;
}

export interface StatuteHistoryRecord {
  slug: string;
  repo: string;
  commit: string;
  /** First sentence of the attribution, from that submodule's LICENSE.md. */
  attribution: string;
  statutes: StatuteFile[];
}

export const STATUTE_HISTORY: StatuteHistoryRecord[] = [
  {
    slug: "california",
    repo: "united-states-california-law",
    commit: "8063f4e02d4be86046bd76582d5a618976ecbff0",
    attribution:
      "The California code text is in the public domain under Government Code section 10248.5.",
    statutes: [
      {
        label: "Business and Professions Code § 7071.6, contractor's bond",
        path: "bpc/7071.6.md",
      },
      {
        label: "Financial Code § 50205, residential mortgage lender or servicer surety bond",
        path: "fin/50205.md",
      },
      {
        label: "Vehicle Code § 11710, dealer's bond",
        path: "veh/11710.md",
      },
      {
        label: "Public Contract Code § 10221, performance and payment bonds",
        path: "pcc/10221.md",
      },
    ],
  },
  {
    slug: "district-of-columbia",
    repo: "united-states-district-of-columbia-law",
    commit: "dd1fc3d82cd99755f0bedb4ceab9783cb4682fb3",
    attribution:
      "The Council of the District of Columbia states that the codes and laws on its code website are in the public domain.",
    statutes: [
      {
        label: "D.C. Code § 2-357.02, contract performance and payment bonds",
        path: "title-2/2-357.02.md",
      },
      {
        label: "D.C. Code § 50-603, bonding of automobile dealers",
        path: "title-50/50-603.md",
      },
      {
        label: "D.C. Code § 47-2883.01, bonding of home improvement businesses",
        path: "title-47/47-2883.01.md",
      },
    ],
  },
  {
    slug: "indiana",
    repo: "united-states-indiana-law",
    commit: "be5bfc582f1b21511920327d4510343137e246d6",
    attribution:
      "The Indiana Code text is not subject to copyright (Georgia v. Public.Resource.Org, Inc., 590 U.S. 255 (2020)).",
    statutes: [
      {
        label: "IC 5-30-8-4, performance and payment bonds required",
        path: "title-5/5-30-8/5-30-8-4.md",
      },
      {
        label: "IC 23-2.5-4-12, loan broker electronic surety bond",
        path: "title-23/23-2.5-4/23-2.5-4-12.md",
      },
      {
        label: "IC 25-11-1-3, collection agency surety bond",
        path: "title-25/25-11-1/25-11-1-3.md",
      },
    ],
  },
  {
    slug: "new-jersey",
    repo: "united-states-new-jersey-law",
    commit: "a0c7df477de60e4400ddf6c9bbc0989d24def4a5",
    attribution:
      "New Jersey claims no copyright in its statutes, and the text of the law is not subject to copyright.",
    statutes: [
      {
        label: "N.J.S. 17:11C-63, blanket bond for a residential mortgage lender or broker",
        path: "title-17/11C-63.md",
      },
      {
        label: "N.J.S. 45:5A-19, bond of an electrical contractor",
        path: "title-45/5A-19.md",
      },
      {
        label: "N.J.S. 45:16A-23, bond required from an HVACR contractor",
        path: "title-45/16A-23.md",
      },
      {
        label: "N.J.S. 2A:44-143, payment and performance bond on public works",
        path: "title-2A/44-143.md",
      },
      {
        label: "N.J.S. 17:15C-8, surety bond for a money transmitter",
        path: "title-17/15C-8.md",
      },
    ],
  },
  {
    slug: "utah",
    repo: "united-states-utah-law",
    commit: "d998a25251cfbbd20eece4b4b02be3432345ad6a",
    attribution: "The State of Utah claims no copyright in the Utah Code.",
    statutes: [
      {
        label: "Utah Code § 58-55-306, financial responsibility of a contractor",
        path: "title-58/58-55-306.md",
      },
      {
        label: "Utah Code § 70D-3-205, surety bond for a residential mortgage loan originator",
        path: "title-70D/70D-3-205.md",
      },
      {
        label: "Utah Code § 41-3-205, bonds required for a dealer license",
        path: "title-41/41-3-205.md",
      },
    ],
  },
];

export function statuteHistoryFor(slug: string) {
  return STATUTE_HISTORY.find((record) => record.slug === slug);
}

export function blameUrl(record: StatuteHistoryRecord, path: string) {
  return `https://github.com/lexifina/${record.repo}/blame/${record.commit}/${path}`;
}

export function licenseUrl(record: StatuteHistoryRecord) {
  return `https://github.com/lexifina/${record.repo}/blob/${record.commit}/LICENSE.md`;
}
