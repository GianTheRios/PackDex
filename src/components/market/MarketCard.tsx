import { Link } from 'react-router-dom';
import type { Market } from '../../data/mockMarkets';
import { ProgressBar } from '../ui/ProgressBar';

function timeLeft(endDate: string): { text: string; urgent: boolean } {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { text: 'ENDED', urgent: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 30) return { text: `${Math.floor(days / 30)}mo left`, urgent: false };
  if (days > 7) return { text: `${days}d left`, urgent: false };
  if (days > 0) return { text: `${days}d left`, urgent: true };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return { text: `${hours}h left`, urgent: true };
}

function formatVolume(vol: number): string {
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`;
  return `$${vol}`;
}

export function MarketCard({ market }: { market: Market }) {
  const isHot = market.volume > 30000;
  const tl = timeLeft(market.endDate);
  const noPercent = 100 - market.currentYes;
  const creatorInitial = market.creator.replace('@', '').charAt(0).toUpperCase();

  return (
    <Link to={`/market/${market.id}`} style={{ textDecoration: 'none' }}>
      <div className="market-card">
        {isHot && <span className="hot-badge">🔥 HOT</span>}
        <div className="market-card__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span className="market-card__set">
              {market.setName}
            </span>
            <span style={{
              fontSize: 12,
              color: tl.urgent ? 'var(--accent-red)' : 'var(--text-muted)',
              fontWeight: tl.urgent ? 700 : 400,
            }}>
              {tl.text}
            </span>
          </div>

          <div className="market-card__question">
            Will {market.productName} exceed ${market.targetPrice.toLocaleString()}?
          </div>

          {/* YES/NO percentages */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="market-card__yes-pct">
              {market.currentYes}% YES
            </span>
            <span className="market-card__no-pct">
              {noPercent}% NO
            </span>
          </div>

          <ProgressBar yes={market.currentYes} />

          {/* Footer */}
          <div className="market-card__footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="market-card__avatar">
                {creatorInitial}
              </span>
              <span>{market.creator}</span>
            </div>
            <span>Vol: {formatVolume(market.volume)}</span>
            <span style={{
              color: tl.urgent ? 'var(--accent-red)' : 'var(--text-muted)',
              fontWeight: tl.urgent ? 700 : 400,
            }}>
              {tl.text}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
