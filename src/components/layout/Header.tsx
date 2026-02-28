import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export function Header() {
  const { walletConnected, walletAddress, usdhBalance, connectWallet, disconnectWallet } = useAppStore();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Markets' },
    { to: '/create', label: 'Create' },
    { to: '/foil-pool', label: 'Foil Pool' },
    { to: '/leaderboard', label: 'Ranks' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '2px solid var(--border)',
      padding: '0 32px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18, color: 'var(--accent-gold)' }}>◉</span>
        <span style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 14,
          color: 'var(--text)',
          letterSpacing: 1,
        }}>
          PACKDEX
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link${location.pathname === link.to ? ' nav-link--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {walletConnected && (
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
            {usdhBalance.toLocaleString()} USDH
          </span>
        )}
        {walletConnected ? (
          <button
            onClick={disconnectWallet}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 16px',
              border: '2px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text)',
              borderRadius: 6,
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              textTransform: 'uppercase',
            }}
          >
            {walletAddress}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 16px',
              border: '2px solid var(--border)',
              background: 'var(--accent-gold)',
              color: '#000',
              borderRadius: 6,
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              textTransform: 'uppercase',
            }}
          >
            CONNECT
          </button>
        )}
      </div>
    </header>
  );
}
