import type { UserBadge } from '../../data/mockUser';

export function BadgeRow({ badges }: { badges: UserBadge[] }) {
  return (
    <div className="retro-panel" style={{ marginTop: 12 }}>
      <div className="title-bar"><span>🏅 BADGES</span></div>
      <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {badges.map(b => (
          <div key={b.name} className="badge" title={b.description}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px' }}>
            <span>{b.icon}</span>
            <span>{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
