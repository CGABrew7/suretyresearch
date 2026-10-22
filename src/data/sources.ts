/** Primary sources checked against the publishing body. Do not add a figure that is not on the linked page. */
export const PRIMARY_SOURCES = [
  {
    id: "sfaa",
    label: "Surety & Fidelity Association of America — What is a surety bond?",
    url: "https://surety.org/surety-fidelity/what-is-surety/",
  },
  {
    id: "miller",
    label: "40 U.S.C. § 3131 — Bonds of contractors of public buildings or works",
    url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title40-section3131&num=0&edition=prelim",
  },
  {
    id: "bmc",
    label: "49 CFR § 387.307 — Property broker surety bond or trust fund",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-C/section-387.307",
  },
  {
    id: "c570-list",
    label: "U.S. Treasury Circular 570 — list of certified companies, effective August 1, 2026",
    url: "https://fiscal.treasury.gov/about-us/doing-business-with-fiscal-service/surety-bonds/list-certified-companies",
  },
  {
    id: "c570",
    label: "U.S. Treasury Department Circular 570",
    url: "https://fiscal.treasury.gov/about-us/doing-business-with-fiscal-service/surety-bonds/circular-570",
  },
  {
    id: "tdi",
    label: "Texas Department of Insurance — surety company contacts",
    url: "https://www.tdi.texas.gov/commercial/pcbondsurety.html",
  },
  {
    id: "jet-mortgage",
    label: "Jet Insurance Company, mortgage license bond pricing",
    url: "https://jetsurety.com/mortgage-license-bonds",
  },
  {
    id: "lance-il-mortgage",
    label: "Lance Surety Bonds, Illinois residential mortgage broker bond",
    url: "https://www.lancesuretybonds.com/bonds-by-state/illinois/mortgage-broker-bonds",
  },
  {
    id: "lance-oh-mortgage",
    label: "Lance Surety Bonds, Ohio mortgage broker bond",
    url: "https://www.lancesuretybonds.com/bonds-by-state/ohio/mortgage-broker-bonds",
  },
  {
    id: "bryant-mortgage",
    label: "Bryant Surety Bonds, mortgage broker bond cost",
    url: "https://www.bryantsuretybonds.com/license-permit-bonds/mortgage-broker-bonds",
  },
  {
    id: "bryant-rates",
    label: "Bryant Surety Bonds, example rates by surety bond type",
    url: "https://www.bryantsuretybonds.com/learn-surety/surety-bond-cost",
  },
  {
    id: "bryant-ohio-mortgage",
    label: "Bryant Surety Bonds, Ohio mortgage broker bond cost",
    url: "https://www.bryantsuretybonds.com/surety-bonds-by-state/ohio/mortgage-broker-bonds",
  },
  {
    id: "groupleader-mortgage",
    label: "GroupLeader, mortgage broker bond rates",
    url: "https://www.groupleader.com/mortgage-broker-bonds/",
  },
] as const;

export type PrimarySourceId = (typeof PRIMARY_SOURCES)[number]["id"];

export function sourcesById(ids: PrimarySourceId[]) {
  return ids.flatMap((id) => {
    const source = PRIMARY_SOURCES.find((item) => item.id === id);
    return source ? [source] : [];
  });
}
