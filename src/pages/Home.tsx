import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockMarkets } from '../data/mockMarkets';
import { MarketCard } from '../components/market/MarketCard';

const TABS = ['HOT', 'NEW', 'ENDING SOON', 'YOUR BETS'] as const;

function formatTotalVol(markets: typeof mockMarkets): string {
  const total = markets.reduce((sum, m) => sum + m.volume, 0);
  if (total >= 1000) return `$${(total / 1000).toFixed(1)}K`;
  return `$${total}`;
}

export function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('HOT');

  const sortedMarkets = [...mockMarkets].sort((a, b) => {
    if (activeTab === 'HOT') return b.volume - a.volume;
    if (activeTab === 'NEW') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (activeTab === 'ENDING SOON') return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    return 0;
  });

  const activeCount = mockMarkets.filter(m => new Date(m.endDate).getTime() > Date.now()).length;

  return (
    <div style={{ flex: 1, padding: '24px 16px', maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
          PREDICTION MARKETS
        </h1>

        {/* Stats strip */}
        <div className="stats-strip" style={{ marginBottom: 16 }}>
          <span>Total Vol: <strong style={{ color: 'var(--text)' }}>{formatTotalVol(mockMarkets)}</strong></span>
          <span style={{ color: 'var(--border-light)' }}>|</span>
          <span>Foil Pool APY: <strong style={{ color: 'var(--text)' }}>12.4%</strong></span>
          <span style={{ color: 'var(--border-light)' }}>|</span>
          <span>Markets: <strong style={{ color: 'var(--text)' }}>{activeCount} active</strong></span>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="filter-pills">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`filter-pill${activeTab === tab ? ' filter-pill--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/create')}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '3px 3px 0 #1a1a1a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '2px 2px 0 #1a1a1a';
            }}
            style={{
              background: '#FFD700',
              color: 'black',
              border: '2px solid #1a1a1a',
              borderRadius: 20,
              boxShadow: '2px 2px 0 #1a1a1a',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 18px',
              cursor: 'pointer',
            }}
          >
            + CREATE MARKET
          </button>
        </div>
      </div>

      <div className="market-grid">
        {sortedMarkets.map(m => (
          <MarketCard key={m.id} market={m} />
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{
        background: 'white',
        border: '2px solid black',
        borderRadius: 8,
        boxShadow: '3px 3px 0 #1a1a1a',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
      }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: 'black' }}>
            Have a prediction? Put it on chain.
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#666660', marginTop: 4 }}>
            Stake 15 USDH to propose a market. Earn 25% of fees if it goes live.
          </div>
        </div>
        <Link
          to="/create"
          style={{
            background: '#FFD700',
            color: 'black',
            border: '2px solid black',
            boxShadow: '3px 3px 0 #1a1a1a',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            padding: '12px 24px',
            borderRadius: 6,
            textDecoration: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Propose a Market →
        </Link>
      </div>

    </div>
  );
}
