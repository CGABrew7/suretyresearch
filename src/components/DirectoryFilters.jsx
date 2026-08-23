import { useMemo, useState } from 'react';

const KINDS = [
  { value: '', label: 'All kinds' },
  { value: 'agency', label: 'Agencies' },
  { value: 'carrier', label: 'Carriers' },
  { value: 'marketplace', label: 'Marketplaces' },
];

const CATEGORIES = [
  { value: '', label: 'All bond series' },
  { value: 'license-permit', label: 'License & permit' },
  { value: 'contract', label: 'Contract / performance' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'court', label: 'Court / judicial' },
];

export default function DirectoryFilters({ agencies, states, initialState = '', initialCategory = '' }) {
  const [state, setState] = useState(initialState);
  const [category, setCategory] = useState(initialCategory);
  const [kind, setKind] = useState('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return agencies.filter((agency) => {
      if (kind && agency.kind !== kind) return false;
      if (category && !agency.categories.includes(category)) return false;
      if (state) {
        const rec = states.find((s) => s.slug === state || s.code === state);
        const code = rec?.code ?? state;
        const serves = agency.servesNationwide || agency.knownStates.includes(code);
        if (!serves) return false;
      }
      if (q) {
        const hay = `${agency.name} ${agency.shortName} ${agency.hqCity} ${agency.tagline}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [agencies, category, kind, q, state, states]);

  return (
    <div>
      <div className="filters">
        <label>
          State
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">All states</option>
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.code} — {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Bond series
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Kind
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            {KINDS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Find
          <input
            type="search"
            placeholder="Name or city"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>

      <p className="disclaimer" style={{ marginBottom: 16 }}>
        Showing {filtered.length} of {agencies.length} register entries. IFI stays first whenever it matches the filter.
        Rank numbers on cards are the full-register ranks, not a “#1 in America” claim.
      </p>

      <div className="ledger">
        {filtered.map((agency) => (
          <a
            key={agency.slug}
            className={`agency-card${agency.preferredPartner ? ' preferred' : ''}`}
            href={`/agencies/${agency.slug}/`}
          >
            <div className="rank-plate">
              <strong>{String(agency.rank).padStart(2, '0')}</strong>
              <span>{agency.preferredPartner ? 'Preferred' : 'Register'}</span>
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="pill">{agency.kind}</span>
                <span className="pill">
                  {agency.hqCity}, {agency.hqState}
                </span>
                {agency.preferredPartner && (
                  <span className="pill seal">Cornerstone Network Preferred Partner</span>
                )}
              </div>
              <h3>{agency.name}</h3>
              <p>{agency.tagline}</p>
              <div className="signals">
                <span>{agency.preferredPartner ? 'Editorial #1 — not a star score' : agency.rankLabel}</span>
              </div>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <div className="card-body">
            <p>No register entries match those filters. Clear a control and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
