import { useState } from 'react';
import { RetroButton } from '../ui/RetroButton';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  currentYes: number;
  marketName: string;
}

export function BetInterface({ currentYes, marketName }: Props) {
  const [side, setSide] = useState<'YES' | 'NO'>('YES');
  const [amount, setAmount] = useState('');
  const { walletConnected, connectWallet } = useAppStore();

  const price = side === 'YES' ? currentYes / 100 : (100 - currentYes) / 100;
  const payout = amount ? (parseFloat(amount) / price).toFixed(2) : '0.00';

  return (
    <div className="retro-panel">
      <div className="title-bar">
        <span>🎰 PLACE BET</span>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 8 }}>{marketName}</div>

        <div style={{ display: 'flex', gap: 0, marginBottom: 12 }}>
          <button
            className={`retro-btn ${side === 'YES' ? '' : ''}`}
            style={{
              flex: 1,
              background: side === 'YES' ? 'var(--accent-green)' : 'var(--bg-primary)',
              color: side === 'YES' ? '#000' : 'var(--text-secondary)',
              borderColor: side === 'YES' ? 'var(--accent-green)' : 'var(--border)',
            }}
            onClick={() => setSide('YES')}
          >
            YES {currentYes}¢
          </button>
          <button
            className="retro-btn"
            style={{
              flex: 1,
              background: side === 'NO' ? 'var(--accent-red)' : 'var(--bg-primary)',
              color: side === 'NO' ? '#fff' : 'var(--text-secondary)',
              borderColor: side === 'NO' ? 'var(--accent-red)' : 'var(--border)',
            }}
            onClick={() => setSide('NO')}
          >
            NO {100 - currentYes}¢
          </button>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
            AMOUNT (USDH)
          </label>
          <input
            className="retro-input"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4, color: 'var(--text-secondary)' }}>
          <span>Price per share:</span>
          <span className="text-gold">${price.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 12, color: 'var(--text-secondary)' }}>
          <span>Potential payout:</span>
          <span className="text-green">${payout}</span>
        </div>

        {walletConnected ? (
          <RetroButton variant="primary" style={{ width: '100%' }}
            onClick={() => alert(`Mock bet: ${side} $${amount} on "${marketName}"`)}>
            BET {side}
          </RetroButton>
        ) : (
          <RetroButton variant="primary" style={{ width: '100%' }} onClick={connectWallet}>
            CONNECT WALLET
          </RetroButton>
        )}
      </div>
    </div>
  );
}
