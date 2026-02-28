import { useState } from 'react';
import { mockLeaderboard, mockTopCreators } from '../data/mockUser';
import { RetroCard } from '../components/ui/RetroCard';

export function Leaderboard() {
  const [period, setPeriod] = useState<'weekly' | 'all'>('all');
  const [view, setView] = useState<'traders' | 'creators'>('traders');

  return (
    <div className="app-content" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ color: 'var(--accent-gold)', marginBottom: 16 }}>🏆 LEADERBOARD</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className={`retro-btn ${view === 'traders' ? 'retro-btn--primary' : ''}`}
          onClick={() => setView('traders')}>TOP TRADERS</button>
        <button className={`retro-btn ${view === 'creators' ? 'retro-btn--primary' : ''}`}
          onClick={() => setView('creators')}>TOP CREATORS</button>
        <div style={{ flex: 1 }} />
        <button className={`retro-btn ${period === 'weekly' ? 'retro-btn--primary' : ''}`}
          onClick={() => setPeriod('weekly')} style={{ fontSize: 8, padding: '4px 8px' }}>WEEKLY</button>
        <button className={`retro-btn ${period === 'all' ? 'retro-btn--primary' : ''}`}
          onClick={() => setPeriod('all')} style={{ fontSize: 8, padding: '4px 8px' }}>ALL TIME</button>
      </div>

      {view === 'traders' ? (
        <RetroCard title="📊 TOP TRADERS BY P&L">
          <table className="retro-table">
            <thead>
              <tr>
                <th>#</th>
                <th>TRADER</th>
                <th>P&L</th>
                <th>WIN RATE</th>
                <th>VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map(e => (
                <tr key={e.rank}>
                  <td style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: e.rank <= 3 ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                    {e.rank <= 3 ? ['🥇', '🥈', '🥉'][e.rank - 1] : e.rank}
                  </td>
                  <td style={{ fontFamily: 'var(--font-pixel)', fontSize: 9 }}>{e.handle}</td>
                  <td style={{ color: e.pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', fontFamily: 'var(--font-pixel)', fontSize: 9 }}>
                    {e.pnl >= 0 ? '+' : ''}${e.pnl.toLocaleString()}
                  </td>
                  <td>{e.winRate}%</td>
                  <td>${(e.totalVolume / 1000).toFixed(1)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RetroCard>
      ) : (
        <RetroCard title="🏗️ TOP CREATORS BY VOLUME">
          <table className="retro-table">
            <thead>
              <tr>
                <th>#</th>
                <th>CREATOR</th>
                <th>MARKETS</th>
                <th>TOTAL VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {mockTopCreators.map(e => (
                <tr key={e.rank}>
                  <td style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: e.rank <= 3 ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                    {e.rank <= 3 ? ['🥇', '🥈', '🥉'][e.rank - 1] : e.rank}
                  </td>
                  <td style={{ fontFamily: 'var(--font-pixel)', fontSize: 9 }}>{e.handle}</td>
                  <td>{e.marketsCreated}</td>
                  <td className="text-gold">${(e.totalVolume / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RetroCard>
      )}
    </div>
  );
}
