import { AGENCIES, type AgencyRecord } from "../data/agencies";
import { STATES } from "../data/states";
import type { BondCategoryId } from "../data/categories";

export interface RankedAgency extends AgencyRecord {
  rank: number;
  score: number;
  scoreBreakdown: { label: string; points: number }[];
  rankLabel: string;
}

function bbbPoints(agency: AgencyRecord): number {
  const signal = agency.signals.find((s) => s.key === "bbb");
  if (!signal) return 0;
  const v = signal.value.toUpperCase();
  if (v.startsWith("A+")) return 22;
  if (v.startsWith("A-")) return 14;
  if (v.startsWith("A")) return 18;
  if (v.startsWith("B")) return 8;
  return 4;
}

function amBestPoints(agency: AgencyRecord): number {
  const signal = agency.signals.find((s) => s.key === "amBest");
  if (!signal) return 0;
  const v = signal.value.toUpperCase();
  if (v.includes("A++")) return 20;
  if (v.includes("A+")) return 16;
  if (v.includes("A−") || v.includes("A-")) return 10;
  if (v.includes("A (")) return 13;
  if (v.startsWith("A")) return 13;
  return 6;
}

function yearsPoints(agency: AgencyRecord): number {
  if (!agency.foundedYear) return 0;
  const years = Math.max(0, 2026 - agency.foundedYear);
  return Math.min(24, Math.round(years * 0.35));
}

function coveragePoints(agency: AgencyRecord): number {
  if (agency.servesNationwide) return 18;
  return Math.min(18, agency.knownStates.length * 2);
}

function categoryPoints(agency: AgencyRecord): number {
  return agency.categories.length * 4;
}

function treasuryPoints(agency: AgencyRecord): number {
  return agency.signals.some((s) => s.key === "treasury") ? 8 : 0;
}

export function scoreAgency(agency: AgencyRecord) {
  const breakdown = [
    { label: "BBB letter grade (if verified)", points: bbbPoints(agency) },
    { label: "AM Best (if cited)", points: amBestPoints(agency) },
    { label: "Years since founding (capped)", points: yearsPoints(agency) },
    { label: "Geographic coverage", points: coveragePoints(agency) },
    { label: "Bond-category breadth", points: categoryPoints(agency) },
    { label: "Treasury / Circular 570 mention", points: treasuryPoints(agency) },
  ];
  const score = breakdown.reduce((sum, row) => sum + row.points, 0);
  return { score, breakdown };
}

export function rankAgencies(list: AgencyRecord[] = AGENCIES): RankedAgency[] {
  // Every entry, including the Cornerstone Network Preferred Partner, is scored
  // on the same public signals and sorted by that score. The partner keeps its
  // disclosure label; it does not get a pinned position.
  return list
    .map((agency) => {
      const { score, breakdown } = scoreAgency(agency);
      return { agency, score, breakdown };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ay = a.agency.foundedYear ?? 9999;
      const by = b.agency.foundedYear ?? 9999;
      if (ay !== by) return ay - by;
      return a.agency.name.localeCompare(b.agency.name);
    })
    .map((row, i) => ({
      ...row.agency,
      rank: i + 1,
      score: row.score,
      scoreBreakdown: row.breakdown,
      rankLabel: `Public-signal score ${row.score}`,
    }));
}

export function rankedDirectory() {
  return rankAgencies();
}

export function agencyServesState(agency: AgencyRecord, code: string) {
  if (agency.servesNationwide) return true;
  return agency.knownStates.includes(code);
}

export function filterAgencies(opts: {
  state?: string;
  category?: BondCategoryId | "";
  kind?: AgencyRecord["kind"] | "";
}) {
  return rankedDirectory().filter((agency) => {
    if (opts.state) {
      const rec = STATES.find((s) => s.slug === opts.state || s.code === opts.state);
      const code = rec?.code ?? opts.state;
      if (!agencyServesState(agency, code)) return false;
    }
    if (opts.category && !agency.categories.includes(opts.category)) return false;
    if (opts.kind && agency.kind !== opts.kind) return false;
    return true;
  });
}

export function kindLabel(kind: AgencyRecord["kind"]) {
  if (kind === "carrier") return "Carrier";
  if (kind === "marketplace") return "Marketplace";
  return "Agency";
}
