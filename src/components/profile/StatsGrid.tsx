import type { UserBet } from '../../data/mockUser';
import { Link } from 'react-router-dom';

export function StatsGrid({ bets }: { bets: UserBet[] }) {
  const active = bets.filter(b => !b.settled);
  const settled = bets.filter(b => b.settled);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
      <div className="retro-panel">
        <div className="title-bar"><span>📊 ACTIVE BETS</span></div>
        <div style={{ padding: 0 }}>
          <table className="retro-table">
            <thead>
              <tr>
                <th>MARKET</th>
                <th>SIDE</th>
                <th>AMOUNT</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {active.map(b => (
                <tr key={b.marketId}>
                  <td><Link to={`/market/${b.marketId}`}>{b.marketName}</Link></td>
                  <td style={{ color: b.side === 'YES' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{b.side}</td>
                  <td>${b.amount}</td>
                  <td>${b.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="retro-panel">
        <div className="title-bar"><span>📜 SETTLED</span></div>
        <div style={{ padding: 0 }}>
          <table className="retro-table">
            <thead>
              <tr>
                <th>MARKET</th>
                <th>SIDE</th>
                <th>AMOUNT</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {settled.map(b => (
                <tr key={b.marketId}>
                  <td><Link to={`/market/${b.marketId}`}>{b.marketName}</Link></td>
                  <td style={{ color: b.side === 'YES' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{b.side}</td>
                  <td>${b.amount}</td>
                  <td style={{ color: (b.pnl ?? 0) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {(b.pnl ?? 0) >= 0 ? '+' : ''}${b.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
