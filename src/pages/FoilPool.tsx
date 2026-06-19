import { useState } from 'react';
import { mockUser } from '../data/mockUser';

const card: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '2px solid var(--border)',
  borderRadius: 8,
  boxShadow: '3px 3px 0 #000',
  padding: 24,
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-muted)',
  marginBottom: 8,
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: 'var(--text)',
  marginBottom: 16,
};

const activities = [
  { text: '💰 @packrat_99 deposited 1,200 USDH', time: '15m ago' },
  { text: '📈 SV Booster Box settled — 86 USDH distributed', time: '2h ago' },
  { text: '💰 @trainer_red deposited 500 USDH', time: '5h ago' },
  { text: '📈 Prismatic ETB settled — 124 USDH distributed', time: '1d ago' },
];

const steps = [
  { title: 'Deposit USDH', desc: 'Add USDH to the pool to start earning. Minimum deposit: 10 USDH.' },
  { title: 'Earn Settlement Fees', desc: 'The pool earns 40% of all market settlement fees, distributed pro-rata to depositors.' },
  { title: 'Withdraw Anytime', desc: 'No lockup period. Withdraw your USDH plus earned fees at any time.' },
];

export function FoilPool() {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const setPercent = (pct: number) => {
    const available = mockUser.usdh;
    setAmount((available * pct / 100).toString());
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 24px',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--text)',
          margin: 0,
        }}>FOIL POOL</h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-muted)',
          margin: '6px 0 0',
        }}>Earn yield from every market settlement.</p>
      </div>

      {/* 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: 24,
        alignItems: 'start',
      }}>
        {/* Left column */}
        <div>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {/* Pool Size */}
            <div style={card}>
              <div style={labelStyle}>POOL SIZE</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>
                $145,200 <span style={{ fontSize: 14, fontWeight: 700 }}>USDH</span>
              </div>
            </div>
            {/* Current APY */}
            <div style={card}>
              <div style={labelStyle}>CURRENT APY</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 28, fontWeight: 800, color: 'var(--accent-gold)' }}>
                12.4%
              </div>
            </div>
            {/* Your Position */}
            <div style={card}>
              <div style={labelStyle}>YOUR POSITION</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>
                ${mockUser.foilPoolDeposit.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--accent-green)', marginTop: 2 }}>
                +${mockUser.foilPoolEarnings.toFixed(2)} earned
              </div>
            </div>
          </div>

          {/* Deposit/Withdraw form */}
          <div style={{ ...card, marginTop: 20 }}>
            <div style={{ ...sectionTitle, marginBottom: 16 }}>DEPOSIT / WITHDRAW</div>

            {/* Tab toggle */}
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <button
                onClick={() => setMode('deposit')}
                style={{
                  flex: 1,
                  padding: 10,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 700,
                  border: '2px solid var(--border)',
                  borderRadius: '6px 0 0 6px',
                  background: mode === 'deposit' ? 'var(--bg-panel)' : 'var(--bg-card)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >DEPOSIT</button>
              <button
                onClick={() => setMode('withdraw')}
                style={{
                  flex: 1,
                  padding: 10,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 700,
                  border: '2px solid var(--border)',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  background: mode === 'withdraw' ? 'var(--bg-panel)' : 'var(--bg-card)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >WITHDRAW</button>
            </div>

            {/* Amount input */}
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 6,
            }}>AMOUNT (USDH)</div>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: '2px solid var(--border)',
                borderRadius: 6,
                padding: '12px 16px',
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'var(--text)',
                outline: 'none',
                background: 'var(--bg-card)',
              }}
            />
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--text-muted)',
              marginTop: 6,
              marginBottom: 12,
            }}>
              Available: {mockUser.usdh.toLocaleString()} USDH
            </div>

            {/* Quick amount buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[{ label: '25%', pct: 25 }, { label: '50%', pct: 50 }, { label: 'MAX', pct: 100 }].map(b => (
                <button
                  key={b.label}
                  onClick={() => setPercent(b.pct)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '2px solid var(--border)',
                    borderRadius: 12,
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    boxShadow: '1px 1px 0 #000',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                >{b.label}</button>
              ))}
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => alert(`Mock: ${mode} $${amount} USDH`)}
                style={{
                  minWidth: 180,
                  padding: '12px 32px',
                  background: 'var(--accent-gold)',
                  color: '#000',
                  border: '2px solid var(--border)',
                  borderRadius: 6,
                  boxShadow: '3px 3px 0 #000',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >{mode === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}</button>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: 12,
              marginBottom: 0,
            }}>
              Funds are used as liquidity across all active markets. No lockup period.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* How It Works */}
          <div style={card}>
            <div style={{ ...sectionTitle, marginBottom: 20 }}>HOW IT WORKS</div>
            {steps.map((step, i) => (
              <div key={i}>
                {i > 0 && (
                  <div style={{ borderTop: '1px dashed var(--border-light)', margin: '16px 0' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--accent-gold)',
                    border: '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#000',
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginLeft: 12,
                  }}>{step.title}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  marginLeft: 36,
                }}>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Pool Activity */}
          <div style={{ ...card, marginTop: 20 }}>
            <div style={sectionTitle}>RECENT ACTIVITY</div>
            {activities.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < activities.length - 1 ? '1px solid var(--border-light)' : 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                }}
              >
                <span style={{ color: 'var(--text)' }}>{a.text}</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 12, flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
