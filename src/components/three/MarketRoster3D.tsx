import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import type { Market } from '../../data/mockMarkets';
import { SealedBox } from './SealedBox';
import { boxStyleForMarket } from './boxStyles';

function MiniBox({ market, spin }: { market: Market; spin: number }) {
  const style = boxStyleForMarket(market);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 3.1], fov: 42 }}
      gl={{ alpha: true }}
      style={{ height: 150, width: '100%' }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 3, 2]} intensity={1.5} />
      <pointLight position={[-2, 1, 1]} intensity={14} color="#ffd700" />
      <SealedBox title={market.setName} colors={style.colors} sideColor={style.side} spinSpeed={spin} scale={0.92} />
    </Canvas>
  );
}

export default function MarketRoster3D({ markets }: { markets: Market[] }) {
  const spin = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.5),
    [],
  );

  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
      {markets.map((m) => (
        <Link key={m.id} to={`/market/${m.id}`} style={{ textDecoration: 'none', flex: '0 0 150px' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border)',
              borderRadius: 8,
              boxShadow: 'var(--shadow)',
              overflow: 'hidden',
            }}
          >
            <MiniBox market={m} spin={spin} />
            <div style={{ padding: '8px 10px', borderTop: '1px solid var(--border-light)' }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {m.setName}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', marginTop: 2 }}>
                {m.currentYes}% YES
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
