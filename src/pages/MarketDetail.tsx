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
    <div className="app-content" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Link to="/" style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--text-secondary)', display: 'block', marginBottom: 12 }}>
        ← BACK TO MARKETS
      </Link>

      <div className="retro-panel" style={{ marginBottom: 12 }}>
        <div className="title-bar">
          <span>{market.imageEmoji} {market.setName}</span>
        </div>
        <div style={{ padding: 16 }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: 8 }}>{market.productName}</h2>
          <p style={{ fontSize: 13, marginBottom: 12 }}>{market.description}</p>
          <ProgressBar yes={market.currentYes} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-pixel)', fontSize: 10 }}>
              YES {market.currentYes}%
            </span>
            <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-pixel)', fontSize: 10 }}>
              NO {100 - market.currentYes}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <MarketChart data={market.priceHistory} />

        <BetInterface currentYes={market.currentYes} marketName={market.description} />

        <RetroCard title="📋 MARKET INFO">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
            <div><span className="text-muted">Creator:</span></div>
            <div>{market.creator}</div>
            <div><span className="text-muted">Created:</span></div>
            <div>{market.createdAt}</div>
            <div><span className="text-muted">End Date:</span></div>
            <div>{market.endDate}</div>
            <div><span className="text-muted">Source:</span></div>
            <div>{market.settlementSource}</div>
            <div><span className="text-muted">Volume:</span></div>
            <div className="text-gold">${market.volume.toLocaleString()} USDH</div>
          </div>
        </RetroCard>

        <RetroCard title="💬 COMMENTS">
          {market.comments.length === 0 ? (
            <div className="text-muted" style={{ fontSize: 11 }}>No comments yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {market.comments.map((c, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--accent-blue)' }}>{c.user}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12 }}>{c.text}</div>
                </div>
              ))}
            </div>
          )}
        </RetroCard>
      </div>
    </div>
  );
}
