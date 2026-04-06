import { useParams, Link } from 'react-router-dom';
import { mockMarkets } from '../data/mockMarkets';
import { MarketChart } from '../components/market/MarketChart';
import { BetInterface } from '../components/market/BetInterface';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RetroCard } from '../components/ui/RetroCard';

export function MarketDetail() {
  const { id } = useParams();
  const market = mockMarkets.find(m => m.id === id);

  if (!market) {
    return (
      <div className="app-content" style={{ padding: 32, textAlign: 'center' }}>
        <h2>MARKET NOT FOUND</h2>
        <Link to="/" className="retro-btn retro-btn--primary" style={{ marginTop: 16, display: 'inline-block' }}>
          BACK TO MARKETS
        </Link>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: '24px 16px', maxWidth: 1080, margin: '0 auto', width: '100%' }}>

      {/* Back link */}
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-muted)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
          textDecoration: 'none',
        }}
      >
        ← BACK TO MARKETS
      </Link>

      {/* Market header */}
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--border)',
        borderRadius: 10,
        boxShadow: 'var(--shadow)',
        padding: '20px 24px',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 6 }}>
              {market.imageEmoji} {market.setName}
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 10, lineHeight: 1.3 }}>
              {market.description}
            </h1>
            <ProgressBar yes={market.currentYes} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent-green)' }}>
                YES {market.currentYes}%
              </span>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent-red)' }}>
                NO {100 - market.currentYes}%
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Volume</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-gold)' }}>${market.volume.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Ends</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{market.endDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-column body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 20,
        alignItems: 'start',
      }}
        className="market-detail-grid"
      >
        {/* LEFT: Chart + Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <MarketChart data={market.priceHistory} />

          <RetroCard title="💬 COMMENTS">
            {market.comments.length === 0 ? (
              <div className="text-muted" style={{ fontSize: 12 }}>No comments yet. Be the first to weigh in.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {market.comments.map((c, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{c.user}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text)' }}>{c.text}</div>
                  </div>
                ))}
              </div>
            )}
          </RetroCard>
        </div>

        {/* RIGHT: Bet panel + Market info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BetInterface currentYes={market.currentYes} marketName={market.description} />

          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border)',
            borderRadius: 8,
            boxShadow: 'var(--shadow)',
            overflow: 'hidden',
          }}>
            <div style={{
              background: 'var(--border)',
              padding: '8px 14px',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'white',
              letterSpacing: '0.08em',
            }}>
              📋 Market Info
            </div>
            <div style={{ padding: 14 }}>
              {[
                { label: 'Creator', value: market.creator },
                { label: 'Created', value: market.createdAt },
                { label: 'End Date', value: market.endDate },
                { label: 'Settlement', value: market.settlementSource },
                { label: 'Volume', value: `$${market.volume.toLocaleString()} USDH`, gold: true },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--border-light)',
                  fontSize: 12,
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{row.label}</span>
                  <span style={{ color: row.gold ? 'var(--accent-gold)' : 'var(--text)', fontWeight: row.gold ? 700 : 400 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
