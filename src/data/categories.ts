export type BondCategoryId = "license-permit" | "contract" | "commercial" | "court";

export interface BondCategory {
  id: BondCategoryId;
  name: string;
  ledger: string;
  headline: string;
  summary: string;
  whoNeeds: string;
  typicalRange: string;
  examples: string[];
  bondTypeIds: string[];
}

export const BOND_CATEGORIES: BondCategory[] = [
  {
    id: "license-permit",
    name: "License & Permit",
    ledger: "Series A",
    headline: "The bond that unlocks a license",
    summary:
      "Most regulated businesses post a license or permit bond before a state will issue or renew the license. The bond guarantees compliance with the statute — it is not insurance for the principal.",
    whoNeeds:
      "Contractors, mortgage brokers, money transmitters, auto dealers, collection agencies, freight brokers, and other licensed operators.",
    typicalRange: "$5,000 – $2,000,000 face; premiums often 1–15% of face",
    examples: [
      "Contractor license bonds",
      "Mortgage broker / NMLS surety",
      "Money transmitter bonds",
      "Auto dealer bonds",
      "Collection agency bonds",
      "BMC-84 freight broker bonds",
    ],
    bondTypeIds: [
      "license-permit",
      "contractor",
      "mortgage-broker",
      "money-transmitter",
      "auto-dealer",
      "collection-agency",
      "freight-broker",
    ],
  },
  {
    id: "contract",
    name: "Contract / Performance",
    ledger: "Series B",
    headline: "Bid, performance, and payment",
    summary:
      "Construction and public-works contracts ask the contractor to guarantee the bid, the work, and the subcontractors. These are underwritten on financials and experience, not just a credit score.",
    whoNeeds:
      "General contractors, specialty trades, and developers bidding public or large private work.",
    typicalRange: "Often 1–3% of contract value; face amounts from tens of thousands to tens of millions",
    examples: ["Bid bonds", "Performance bonds", "Payment bonds", "Maintenance bonds", "Subdivision / site improvement bonds"],
    bondTypeIds: ["performance", "contractor"],
  },
  {
    id: "commercial",
    name: "Commercial",
    ledger: "Series C",
    headline: "Fidelity, public official, and miscellaneous",
    summary:
      "Commercial surety covers the bonds that sit beside a license or a jobsite: employee dishonesty, public official, lost-instrument, and a long tail of miscellaneous forms.",
    whoNeeds:
      "Property managers, financial-services firms, public officials, and businesses whose clients require a fidelity or miscellaneous bond.",
    typicalRange: "Wide — many forms start under $500/year; large fidelity schedules scale with exposure",
    examples: ["Fidelity / employee dishonesty", "Public official bonds", "Lost instrument bonds", "Customs bonds", "ERISA bonds"],
    bondTypeIds: ["fidelity", "license-permit"],
  },
  {
    id: "court",
    name: "Court / Judicial",
    ledger: "Series D",
    headline: "Appeal, probate, and injunction",
    summary:
      "Courts require bonds so a judgment, estate, or injunction has a solvent backstop. These are often collateral-heavy and time-sensitive.",
    whoNeeds:
      "Appellants, fiduciaries, executors, and litigants ordered to post security.",
    typicalRange: "Face set by the court; premiums commonly 1–5%, sometimes with collateral",
    examples: ["Appeal / supersedeas bonds", "Probate and fiduciary bonds", "Injunction and attachment bonds", "Replevin bonds"],
    bondTypeIds: ["court"],
  },
];

export function getCategory(id: string) {
  return BOND_CATEGORIES.find((c) => c.id === id);
}
