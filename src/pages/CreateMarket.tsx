import { useState } from 'react';

const TEMPLATES = [
  { label: 'BOOSTER BOX PRICE', desc: 'Will a booster box exceed $X by date?' },
  { label: 'ETB PRICE', desc: 'Will an ETB exceed $X by date?' },
  { label: 'SINGLE CARD PRICE', desc: 'Will a specific card exceed $X?' },
  { label: 'SET REPRINT', desc: 'Will a set get reprinted by date?' },
];

const SOURCES = [
  'TCGPlayer Market Price',
  'eBay Sold Comps (30-day avg)',
  'PSA Population Report',
];

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '2px solid #1a1a1a',
  borderRadius: 8,
  boxShadow: '3px 3px 0 #1a1a1a',
  padding: 24,
  marginBottom: 20,
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#1a1a1a',
  letterSpacing: '0.08em',
  marginBottom: 16,
};

const inputLabel: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#666660',
  letterSpacing: '0.06em',
  marginBottom: 6,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  border: '2px solid #1a1a1a',
  borderRadius: 6,
  padding: '10px 14px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  background: '#fff',
};

export function CreateMarket() {
  const [template, setTemplate] = useState(0);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState(SOURCES[0]);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);

  const hasFilled = product && price;
  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 24px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Page Header */}
      <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 28,
        fontWeight: 800,
        color: '#1a1a1a',
        margin: 0,
      }}>
        CREATE A MARKET
      </h1>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: '#666660',
        marginTop: 4,
        marginBottom: 32,
      }}>
        Propose a prediction market. Stake 15 USDH. Earn 25% of fees if it goes live.
      </p>

      {/* 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: 24,
        alignItems: 'start',
      }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Template Selector */}
          <div style={cardStyle}>
            <div style={sectionTitle}>SELECT TEMPLATE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTemplate(i)}
                  style={{
                    background: template === i ? '#FFD700' : '#fff',
                    border: '2px solid #1a1a1a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: template === i ? '2px 2px 0 #1a1a1a' : 'none',
                    transition: 'background 0.15s, box-shadow 0.15s',
                  }}
                >
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                  }}>
                    {t.label}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11,
                    color: '#666660',
                    marginTop: 2,
                  }}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Market Details */}
          <div style={cardStyle}>
            <div style={{ ...sectionTitle, marginBottom: 20 }}>MARKET DETAILS</div>

            <div style={{ marginBottom: 16 }}>
              <label style={inputLabel}>PRODUCT NAME</label>
              <input
                style={inputStyle}
                placeholder="e.g. Scarlet & Violet Booster Box"
                value={product}
                onChange={e => setProduct(e.target.value)}
                onFocus={e => { e.target.style.outline = '2px solid #FFD700'; e.target.style.outlineOffset = '1px'; }}
                onBlur={e => { e.target.style.outline = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={inputLabel}>TARGET PRICE (USD)</label>
              <input
                style={inputStyle}
                type="number"
                placeholder="e.g. 160"
                value={price}
                onChange={e => setPrice(e.target.value)}
                onFocus={e => { e.target.style.outline = '2px solid #FFD700'; e.target.style.outlineOffset = '1px'; }}
                onBlur={e => { e.target.style.outline = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={inputLabel}>END DATE</label>
              <input
                style={inputStyle}
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                onFocus={e => { e.target.style.outline = '2px solid #FFD700'; e.target.style.outlineOffset = '1px'; }}
                onBlur={e => { e.target.style.outline = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={inputLabel}>SETTLEMENT SOURCE</label>
              <select
                style={{ ...inputStyle, appearance: 'auto' }}
                value={source}
                onChange={e => setSource(e.target.value)}
                onFocus={e => { e.target.style.outline = '2px solid #FFD700'; e.target.style.outlineOffset = '1px'; }}
                onBlur={e => { e.target.style.outline = 'none'; }}
              >
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Live Preview */}
          <div style={cardStyle}>
            <div style={sectionTitle}>MARKET PREVIEW</div>
            {!hasFilled ? (
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: '#666660',
                textAlign: 'center',
                padding: '32px 0',
              }}>
                Fill in the form to see your market preview
              </div>
            ) : (
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#666660',
                  letterSpacing: '0.06em',
                  marginBottom: 8,
                }}>
                  PREVIEW
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: 16,
                  lineHeight: 1.4,
                }}>
                  Will {product} exceed ${price}{date ? ` by ${formattedDate}` : ''}?
                </div>

                {/* YES/NO bar */}
                <div style={{
                  display: 'flex',
                  height: 10,
                  borderRadius: 5,
                  overflow: 'hidden',
                  marginBottom: 6,
                }}>
                  <div style={{ flex: 1, background: '#FFD700' }} />
                  <div style={{ flex: 1, background: '#FF6B6B' }} />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: 16,
                }}>
                  <span>50% YES</span>
                  <span>50% NO</span>
                </div>

                {/* Bottom row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  color: '#666660',
                }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#FFD700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 11,
                    color: '#1a1a1a',
                  }}>
                    Y
                  </div>
                  <span>@you</span>
                  <span style={{ marginLeft: 'auto' }}>Vol: 0 USDH</span>
                  {date && <span>{formattedDate}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Stake & Submit */}
          <div style={cardStyle}>
            <div style={sectionTitle}>CREATION STAKE</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              color: '#FFD700',
              marginBottom: 4,
            }}>
              15 USDH
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              color: '#666660',
              marginBottom: 20,
            }}>
              Refunded if market is not approved (&lt; 10 upvotes in 24h)
            </div>
            <button
              onClick={() => alert('Mock: Market submitted for 24hr community vote!')}
              onMouseEnter={() => setHoveredSubmit(true)}
              onMouseLeave={() => setHoveredSubmit(false)}
              style={{
                width: '100%',
                background: '#FFD700',
                color: '#1a1a1a',
                border: '2px solid #1a1a1a',
                borderRadius: 6,
                boxShadow: hoveredSubmit ? '4px 4px 0 #1a1a1a' : '3px 3px 0 #1a1a1a',
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                padding: 14,
                cursor: 'pointer',
                transform: hoveredSubmit ? 'translate(-1px, -1px)' : 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              SUBMIT MARKET
            </button>
          </div>

          {/* How It Works */}
          <div style={cardStyle}>
            <div style={sectionTitle}>WHAT HAPPENS NEXT</div>
            {[
              { num: 1, title: 'Community Vote', desc: 'Your market goes live for 24 hours of community upvoting.' },
              { num: 2, title: 'Goes Live', desc: "Top voted markets go live. You're locked out of betting for 48 hours." },
              { num: 3, title: 'Earn Fees', desc: 'You earn 25% of all settlement fees on markets you created.' },
            ].map(step => (
              <div key={step.num} style={{
                display: 'flex',
                gap: 14,
                marginBottom: step.num < 3 ? 18 : 0,
                alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#1a1a1a',
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: 2,
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: '#666660',
                    lineHeight: 1.5,
                  }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
