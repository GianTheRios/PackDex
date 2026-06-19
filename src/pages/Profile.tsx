import { mockUser } from '../data/mockUser';

const font = (size: number, weight: number) => ({
  fontFamily: 'var(--font-body)',
  fontSize: size,
  fontWeight: weight,
});

const sectionHeader: React.CSSProperties = {
  ...font(13, 700),
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text)',
  marginBottom: 12,
};

const cardBox: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '2px solid var(--border)',
  borderRadius: 8,
  boxShadow: '3px 3px 0 #000',
};

const tableHeaderCell: React.CSSProperties = {
  ...font(11, 700),
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  padding: '10px 14px',
  textAlign: 'left',
  background: 'var(--bg-panel)',
};

const tableCell: React.CSSProperties = {
  ...font(14, 400),
  color: 'var(--text)',
  padding: '10px 14px',
  borderBottom: '1px solid var(--border-light)',
};

export function Profile() {
  const active = mockUser.bets.filter(b => !b.settled);
  const settled = mockUser.bets.filter(b => b.settled);
  const totalPnl = settled.reduce((sum, b) => sum + (b.pnl ?? 0), 0);

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '32px 24px',
    }}>
      <h1 style={{
        ...font(24, 800),
        color: 'var(--text)',
        marginBottom: 24,
        marginTop: 0,
      }}>
        PROFILE
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        gap: 24,
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* TRAINER CARD */}
          <div style={{
            ...cardBox,
            boxShadow: '4px 4px 0 #000',
            padding: 24,
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}>
            {/* Avatar + identity */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 100 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...font(28, 700),
                color: '#1a1a1a',
                flexShrink: 0,
              }}>
                TR
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...font(16, 800), color: 'var(--text)' }}>{mockUser.displayName}</div>
                <div style={{ ...font(12, 500), color: 'var(--text-muted)' }}>{mockUser.handle}</div>
                <div style={{ ...font(10, 500), color: 'var(--text-muted)', marginTop: 2 }}>{mockUser.address}</div>
              </div>
            </div>

            {/* Stats 2x2 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              flex: 1,
            }}>
              <StatBlock label="MARKETS" value={String(mockUser.marketsCreated)} />
              <StatBlock label="WIN RATE" value={`${mockUser.winRate}%`} />
              <StatBlock label="WAGERED" value={`$${mockUser.totalWagered.toLocaleString()}`} />
              <StatBlock
                label="P&L"
                value={`${mockUser.pnl >= 0 ? '+' : ''}$${mockUser.pnl.toLocaleString()}`}
                color={mockUser.pnl >= 0 ? 'var(--accent-gold)' : 'var(--accent-red)'}
              />
            </div>
          </div>

          {/* BADGES */}
          <div>
            <div style={sectionHeader}>BADGES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {mockUser.badges.map(b => (
                <span
                  key={b.name}
                  title={b.description}
                  style={{
                    ...font(12, 600),
                    background: 'var(--bg-card)',
                    border: '2px solid var(--border)',
                    borderRadius: 20,
                    boxShadow: '2px 2px 0 #000',
                    padding: '8px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--text)',
                  }}
                >
                  <span>{b.icon}</span>
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* ACTIVE BETS */}
          <div>
            <div style={sectionHeader}>ACTIVE BETS</div>
            <div style={cardBox}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...tableHeaderCell, borderRadius: '8px 0 0 0' }}>Market</th>
                    <th style={tableHeaderCell}>Side</th>
                    <th style={tableHeaderCell}>Amount</th>
                    <th style={{ ...tableHeaderCell, borderRadius: '0 8px 0 0' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {active.map(b => (
                    <tr
                      key={b.marketId}
                      style={{ cursor: 'default' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                    >
                      <td style={{ ...tableCell, ...font(14, 600) }}>{b.marketName}</td>
                      <td style={tableCell}>
                        <SidePill side={b.side} />
                      </td>
                      <td style={tableCell}>${b.amount}</td>
                      <td style={tableCell}>${b.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SETTLED MARKETS */}
          <div>
            <div style={sectionHeader}>SETTLED MARKETS</div>
            <div style={cardBox}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...tableHeaderCell, borderRadius: '8px 0 0 0' }}>Market</th>
                    <th style={tableHeaderCell}>Side</th>
                    <th style={tableHeaderCell}>Amount</th>
                    <th style={{ ...tableHeaderCell, borderRadius: '0 8px 0 0' }}>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {settled.map(b => {
                    const pnl = b.pnl ?? 0;
                    return (
                      <tr
                        key={b.marketId}
                        style={{ cursor: 'default' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                      >
                        <td style={{ ...tableCell, ...font(14, 600) }}>{b.marketName}</td>
                        <td style={tableCell}>
                          <SidePill side={b.side} />
                        </td>
                        <td style={tableCell}>${b.amount}</td>
                        <td style={{
                          ...tableCell,
                          ...font(14, 600),
                          color: pnl >= 0 ? 'var(--accent-gold)' : 'var(--accent-red)',
                        }}>
                          {pnl >= 0 ? '+' : ''}${pnl}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{
                      ...tableCell,
                      ...font(14, 700),
                      borderBottom: 'none',
                      textAlign: 'right',
                      paddingRight: 8,
                    }}>
                      Total P&L:
                    </td>
                    <td style={{
                      ...tableCell,
                      ...font(14, 700),
                      borderBottom: 'none',
                      color: totalPnl >= 0 ? 'var(--accent-gold)' : 'var(--accent-red)',
                    }}>
                      {totalPnl >= 0 ? '+' : ''}${totalPnl}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        ...font(11, 700),
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        ...font(22, 800),
        color: color || 'var(--text)',
      }}>
        {value}
      </div>
    </div>
  );
}

function SidePill({ side }: { side: 'YES' | 'NO' }) {
  const isYes = side === 'YES';
  return (
    <span style={{
      ...font(11, 700),
      background: isYes ? 'var(--accent-gold)' : 'var(--accent-red)',
      color: isYes ? '#1a1a1a' : '#fff',
      padding: '3px 10px',
      borderRadius: 12,
      display: 'inline-block',
    }}>
      {side}
    </span>
  );
}
