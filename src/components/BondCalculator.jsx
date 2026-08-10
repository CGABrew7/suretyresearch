import { useState } from 'react';
import data from '../data/bonds.json';

export default function BondCalculator() {
  const [bondType, setBondType] = useState('');
  const [bondAmount, setBondAmount] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bond = data.types.find(t => t.id === bondType);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bondType && bondAmount && creditScore) setShowResult(true);
  };

  const handleLead = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Estimate premium rate based on credit score
  const getRate = () => {
    if (!creditScore) return { low: 0, high: 0, label: '' };
    if (creditScore === 'excellent') return { low: 1, high: 2.5, label: 'Excellent (720+)' };
    if (creditScore === 'good') return { low: 2, high: 4, label: 'Good (680-719)' };
    if (creditScore === 'fair') return { low: 4, high: 8, label: 'Fair (600-679)' };
    return { low: 8, high: 15, label: 'Below 600' };
  };

  const rate = getRate();
  const amt = parseInt(bondAmount) || 0;
  const annualLow = Math.round(amt * rate.low / 100);
  const annualHigh = Math.round(amt * rate.high / 100);

  return (
    <div className="calc-wrap" id="calculator">
      <div className="calc-card">
        <h3>Bond Cost Calculator</h3>
        <p className="calc-sub">Estimate your annual bond premium in 30 seconds.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>1. What type of bond?</label>
            <select value={bondType} onChange={e => { setBondType(e.target.value); setShowResult(false); }}>
              <option value="">Choose bond type...</option>
              {data.types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>2. Required bond amount ($)</label>
            <select value={bondAmount} onChange={e => { setBondAmount(e.target.value); setShowResult(false); }}>
              <option value="">Select bond amount...</option>
              <option value="5000">$5,000</option>
              <option value="10000">$10,000</option>
              <option value="15000">$15,000</option>
              <option value="25000">$25,000</option>
              <option value="50000">$50,000</option>
              <option value="75000">$75,000</option>
              <option value="100000">$100,000</option>
              <option value="250000">$250,000</option>
              <option value="500000">$500,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>

          <div className="form-group">
            <label>3. Your credit score range</label>
            <select value={creditScore} onChange={e => { setCreditScore(e.target.value); setShowResult(false); }}>
              <option value="">Select credit range...</option>
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (680-719)</option>
              <option value="fair">Fair (600-679)</option>
              <option value="poor">Below 600</option>
            </select>
          </div>

          <button type="submit" className="btn">Calculate My Cost</button>
        </form>

        {showResult && bond && (
          <div className="calc-result">
            <div className="calc-result-big">
              ${annualLow.toLocaleString()} – ${annualHigh.toLocaleString()}
            </div>
            <div className="calc-result-label">
              Estimated annual premium for {bond.name}
            </div>

            <div className="result-details">
              <div className="rd-item">
                <div className="rd-label">Bond Amount</div>
                <div className="rd-value">${amt.toLocaleString()}</div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Credit Range</div>
                <div className="rd-value">{rate.label}</div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Premium Rate</div>
                <div className="rd-value">{rate.low}% – {rate.high}%</div>
              </div>
              <div className="rd-item">
                <div className="rd-label">Monthly Equivalent</div>
                <div className="rd-value">${Math.round(annualLow / 12).toLocaleString()} – ${Math.round(annualHigh / 12).toLocaleString()}/mo</div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '12px' }}>
              This is an estimate based on industry averages. Your actual premium depends on your full credit profile, business financials, and state requirements.
            </p>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn"
                style={{ marginTop: '16px' }}
              >
                Get an Exact Quote (Free)
              </button>
            ) : !submitted ? (
              <form onSubmit={handleLead} style={{ marginTop: '20px', textAlign: 'left' }}>
                <div className="form-group">
                  <label style={{ color: '#475569' }}>Your name</label>
                  <input type="text" placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label style={{ color: '#475569' }}>Email</label>
                  <input type="email" placeholder="you@company.com" required />
                </div>
                <div className="form-group">
                  <label style={{ color: '#475569' }}>Phone (optional)</label>
                  <input type="tel" placeholder="(555) 123-4567" />
                </div>
                <button type="submit" className="btn">
                  Get My Free Quote
                </button>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', textAlign: 'center', marginTop: '8px' }}>
                  A bond specialist will provide your exact rate within 1 business day. No obligation.
                </p>
              </form>
            ) : (
              <div style={{ padding: '24px 0 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginBottom: '8px' }}>Quote request submitted</div>
                <p style={{ color: '#64748B', fontSize: '0.88rem' }}>
                  A bond specialist will contact you within 1 business day with your exact premium rate.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
