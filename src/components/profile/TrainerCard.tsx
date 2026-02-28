import type { UserProfile } from '../../data/mockUser';

export function TrainerCard({ user }: { user: UserProfile }) {
  return (
    <div className="retro-panel" style={{ maxWidth: 420 }}>
      <div className="title-bar">
        <span>🎴 TRAINER CARD</span>
        <span style={{ fontSize: 8, color: 'var(--text-secondary)' }}>■ □ ×</span>
      </div>
      <div style={{
        padding: 16,
        background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-secondary) 100%)',
        border: '2px solid var(--accent-gold)',
        margin: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: 4 }}>{user.displayName}</h2>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{user.handle}</div>
          </div>
          <div style={{ fontSize: 32 }}>👤</div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4 }}>
          {user.address}
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12,
          padding: 8, background: 'var(--bg-primary)', border: '1px solid var(--border)',
        }}>
          <StatItem label="MARKETS" value={String(user.marketsCreated)} />
          <StatItem label="WIN RATE" value={`${user.winRate}%`} color="var(--accent-green)" />
          <StatItem label="WAGERED" value={`$${user.totalWagered.toLocaleString()}`} />
          <StatItem label="P&L" value={`${user.pnl >= 0 ? '+' : ''}$${user.pnl.toLocaleString()}`}
            color={user.pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'} />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--text-secondary)', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, color: color || 'var(--accent-gold)' }}>
        {value}
      </div>
    </div>
  );
}
