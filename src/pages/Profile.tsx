import { mockUser } from '../data/mockUser';

const font = (size: number, weight: number) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: size,
  fontWeight: weight,
});

const sectionHeader: React.CSSProperties = {
  ...font(13, 700),
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#1a1a1a',
  marginBottom: 12,
};

const cardBox: React.CSSProperties = {
  background: '#fff',
  border: '2px solid #1a1a1a',
  borderRadius: 8,
  boxShadow: '3px 3px 0 #1a1a1a',
};

const tableHeaderCell: React.CSSProperties = {
  ...font(11, 700),
  textTransform: 'uppercase',
  color: '#999',
  padding: '10px 14px',
  textAlign: 'left',
  background: '#F0F0EB',
};

const tableCell: React.CSSProperties = {
  ...font(14, 400),
  color: '#1a1a1a',
  padding: '10px 14px',
  borderBottom: '1px solid #E0E0D8',
};

export function Profile() {
  const active = mockUser.bets.filter(b => !b.settled);
  const settled = mockUser.bets.filter(b => b.settled);
  const totalPnl = settled.reduce((sum, b) => sum + (b.pnl ?? 0), 0);

  return (
    <div style={{
      background: '#F5F5F0',
      minHeight: '100vh',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '32px 24px',
    }}>
      <h1 style={{
        ...font(24, 800),
        color: '#1a1a1a',
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
            boxShadow: '4px 4px 0 #1a1a1a',
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
                background: '#FFD700',
                border: '2px solid #1a1a1a',
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
                <div style={{ ...font(16, 800), color: '#1a1a1a' }}>{mockUser.displayName}</div>
                <div style={{ ...font(12, 500), color: '#888' }}>{mockUser.handle}</div>
                <div style={{ ...font(10, 500), color: '#aaa', marginTop: 2 }}>{mockUser.address}</div>
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
                color={mockUser.pnl >= 0 ? '#FFD700' : '#FF6B6B'}
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
                    background: '#fff',
                    border: '2px solid #1a1a1a',
                    borderRadius: 20,
                    boxShadow: '2px 2px 0 #1a1a1a',
                    padding: '8px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#1a1a1a',
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
                      onMouseEnter={e => (e.currentTarget.style.background = '#F5F5F0')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
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
                        onMouseEnter={e => (e.currentTarget.style.background = '#F5F5F0')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                      >
                        <td style={{ ...tableCell, ...font(14, 600) }}>{b.marketName}</td>
                        <td style={tableCell}>
                          <SidePill side={b.side} />
                        </td>
                        <td style={tableCell}>${b.amount}</td>
                        <td style={{
                          ...tableCell,
                          ...font(14, 600),
                          color: pnl >= 0 ? '#FFD700' : '#FF6B6B',
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
                      color: totalPnl >= 0 ? '#FFD700' : '#FF6B6B',
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
        color: '#999',
        marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        ...font(22, 800),
        color: color || '#1a1a1a',
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
      background: isYes ? '#FFD700' : '#FF6B6B',
      color: isYes ? '#1a1a1a' : '#fff',
      padding: '3px 10px',
      borderRadius: 12,
      display: 'inline-block',
    }}>
      {side}
    </span>
  );
}
