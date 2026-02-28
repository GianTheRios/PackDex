import { Link } from 'react-router-dom';
import { mockMarkets } from '../../data/mockMarkets';
import { RetroCard } from '../ui/RetroCard';

export function Sidebar() {
  const topMarkets = [...mockMarkets].sort((a, b) => b.volume - a.volume).slice(0, 4);

  return (
    <aside className="app-sidebar">
      <RetroCard title="🔥 TOP MARKETS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {topMarkets.map((m, i) => (
            <Link to={`/market/${m.id}`} key={m.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none',
            }}>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-pixel)', fontSize: 8 }}>
                {i + 1}. {m.productName.slice(0, 18)}
              </span>
              <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-pixel)', fontSize: 8 }}>
                ${(m.volume / 1000).toFixed(1)}K
              </span>
            </Link>
          ))}
        </div>
      </RetroCard>

      <div style={{ marginTop: 12 }}>
        <RetroCard title="💎 FOIL POOL">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 20, color: 'var(--accent-gold)' }}>12.4%</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>CURRENT APY</div>
            <div style={{ marginTop: 8, fontSize: 12 }}>Total Pool: <span className="text-gold">$145,200 USDH</span></div>
            <Link to="/foil-pool" className="retro-btn retro-btn--primary" style={{
              display: 'inline-block', marginTop: 8, fontSize: 8, padding: '6px 12px',
            }}>
              DEPOSIT
            </Link>
          </div>
        </RetroCard>
      </div>
    </aside>
  );
}
