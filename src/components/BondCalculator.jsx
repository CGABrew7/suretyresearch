import { useState } from 'react';
import data from '../data/bonds.json';

export default function BondCalculator() {
  const [bondType, setBondType] = useState('');
  const [bondAmount, setBondAmount] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [showResult, setShowResult] = useState(false);

  const bond = data.types.find((t) => t.id === bondType);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bondType && bondAmount && creditScore) setShowResult(true);
  };

  const getRate = () => {
    if (creditScore === 'excellent') return { low: 1, high: 2.5, label: 'Excellent (720+)' };
    if (creditScore === 'good') return { low: 2, high: 4, label: 'Good (680–719)' };
    if (creditScore === 'fair') return { low: 4, high: 8, label: 'Fair (600–679)' };
    if (creditScore === 'poor') return { low: 8, high: 15, label: 'Below 600' };
    return { low: 0, high: 0, label: '' };
  };

  const rate = getRate();
  const amt = parseInt(bondAmount, 10) || 0;
  const annualLow = Math.round((amt * rate.low) / 100);
  const annualHigh = Math.round((amt * rate.high) / 100);

  return (
    <div className="calc-wrap" id="calculator">
      <div className="calc-card">
        <h3>Premium sketch</h3>
        <p className="calc-sub">Three questions. An industry-average band a licensed desk can confirm.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>1. Bond form</label>
            <select
              value={bondType}
              onChange={(e) => {
                setBondType(e.target.value);
                setShowResult(false);
              }}
            >
              <option value="">Choose a form…</option>
              {data.types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>2. Face amount</label>
            <select
              value={bondAmount}
              onChange={(e) => {
                setBondAmount(e.target.value);
                setShowResult(false);
              }}
            >
              <option value="">Select face…</option>
              {['5000', '10000', '15000', '25000', '50000', '75000', '100000', '250000', '500000', '1000000'].map(
                (n) => (
                  <option key={n} value={n}>
                    ${Number(n).toLocaleString()}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="form-group">
            <label>3. Credit band</label>
            <select
              value={creditScore}
              onChange={(e) => {
                setCreditScore(e.target.value);
                setShowResult(false);
              }}
            >
              <option value="">Select credit…</option>
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (680–719)</option>
              <option value="fair">Fair (600–679)</option>
              <option value="poor">Below 600</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Sketch the premium
          </button>
        </form>

        {showResult && bond && (
          <div className="calc-result">
            <div className="calc-result-big">
              ${annualLow.toLocaleString()} – ${annualHigh.toLocaleString()}
            </div>
            <div className="calc-result-label">Estimated annual premium · {bond.name}</div>
            <div className="result-details">
              <div className="rd-item">
                <div className="rd-label">Face</div>
                <div className="rd-value">${amt.toLocaleString()}</div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Credit</div>
                <div className="rd-value">{rate.label}</div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Rate band</div>
                <div className="rd-value">
                  {rate.low}% – {rate.high}%
                </div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Monthly-ish</div>
                <div className="rd-value">
                  ${Math.round(annualLow / 12).toLocaleString()} – ${Math.round(annualHigh / 12).toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#3c4452', marginBottom: 14 }}>
              Industry-average sketch. Underwriting, the state form, and financials set the final figure.
            </p>
            <a className="btn btn-brass" href="/agencies/integrity-first-insurance/">
              Talk to the desk
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
