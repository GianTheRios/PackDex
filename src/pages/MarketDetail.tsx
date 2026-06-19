import { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockMarkets, type Market } from '../data/mockMarkets';
import { MarketChart } from '../components/market/MarketChart';
import { BetInterface } from '../components/market/BetInterface';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RetroCard } from '../components/ui/RetroCard';

// Lazy-load the WebGL hero + roster so three.js ships only on this route.
const ProductViewer3D = lazy(() => import('../components/three/ProductViewer3D'));
const MarketRoster3D = lazy(() => import('../components/three/MarketRoster3D'));

function HeroFallback({ market }: { market: Market }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ fontSize: 72 }}>{market.imageEmoji}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading 3D…</div>
    </div>
  );
}

export function MarketDetail() {
  const { id } = useParams();
  const market = mockMarkets.find(m => m.id === id);
  const otherMarkets = mockMarkets.filter(m => m.id !== id);

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

      {/* HERO ROW: 3D box (left) · market summary + bet (right) */}
      <div
        className="market-detail-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'stretch', marginBottom: 20 }}
      >
        {/* Left: 3D hero box (stretches to match the summary+bet column height) */}
        <div style={{
          position: 'relative',
          minHeight: 420,
          borderRadius: 12,
          border: '2px solid var(--border)',
          boxShadow: 'var(--shadow)',
          background: 'radial-gradient(circle at 50% 42%, var(--bg-panel), var(--bg-card) 72%)',
          overflow: 'hidden',
        }}>
          <Suspense fallback={<HeroFallback market={market} />}>
            <ProductViewer3D market={market} />
          </Suspense>
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', pointerEvents: 'none' }}>
            ✋ Drag to spin
          </div>
        </div>

        {/* Right: summary + bet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border)',
            borderRadius: 10,
            boxShadow: 'var(--shadow)',
            padding: '16px 18px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 6 }}>
              {market.imageEmoji} {market.setName}
            </div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>
              {market.description}
            </h1>
            <ProgressBar yes={market.currentYes} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent-green)' }}>YES {market.currentYes}%</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent-red)' }}>NO {100 - market.currentYes}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Volume</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent-gold)' }}>${market.volume.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Ends</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{market.endDate}</div>
              </div>
            </div>
          </div>

          <BetInterface currentYes={market.currentYes} marketName={market.description} />
        </div>
      </div>

      {/* LOWER ROW: chart + comments (left) · market info (right) */}
      <div
        className="market-detail-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}
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

        {/* RIGHT: Market info */}
        <div style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border)',
          borderRadius: 8,
          boxShadow: 'var(--shadow)',
          overflow: 'hidden',
          alignSelf: 'start',
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

      {/* Other markets — 3D roster strip */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Other Markets
        </h2>
        <Suspense fallback={<div className="text-muted" style={{ fontSize: 12 }}>Loading markets…</div>}>
          <MarketRoster3D markets={otherMarkets} />
        </Suspense>
      </div>
    </div>
  );
}
