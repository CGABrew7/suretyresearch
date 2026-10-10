import { AGENCIES, type AgencyRecord } from "../data/agencies";
import { STATES } from "../data/states";
import type { BondCategoryId } from "../data/categories";

export function directory(list: AgencyRecord[] = AGENCIES): AgencyRecord[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
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
  return directory().filter((agency) => {
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
