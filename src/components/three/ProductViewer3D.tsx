import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import type { Market } from '../../data/mockMarkets';
import { SealedBox } from './SealedBox';
import { boxStyleForMarket } from './boxStyles';

export default function ProductViewer3D({ market }: { market: Market }) {
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const style = boxStyleForMarket(market);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.25, 3.3], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.3} />
      <pointLight position={[-3, 1.5, -2]} intensity={26} color="#ffd700" />

      <Suspense fallback={null}>
        <Center>
          <SealedBox
            title={market.setName}
            subtitle={`$${market.targetPrice.toLocaleString()} TARGET`}
            colors={style.colors}
            sideColor={style.side}
          />
        </Center>

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2} position={[2, 3, 4]} scale={[6, 6, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[-3, 1, 2]} scale={[4, 4, 1]} color="#ffe7a3" />
          <Lightformer form="circle" intensity={1.2} position={[0, -2, 3]} scale={[3, 3, 1]} color="#a3c7ff" />
        </Environment>

        <ContactShadows position={[0, -0.74, 0]} opacity={0.45} scale={6} blur={2.6} far={2} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={1.6}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  );
}
