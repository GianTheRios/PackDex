import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  baselineY: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const startY = baselineY - (lines.length - 1) * lineHeight;
  lines.forEach((ln, i) => ctx.fillText(ln, x, startY + i * lineHeight));
}

// Draw a stylized booster-box front label as a canvas texture — no asset files needed.
function makeLabelTexture(title: string, subtitle: string, c1: string, c2: string): THREE.CanvasTexture {
  const w = 512;
  const h = 660;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, c1);
  bg.addColorStop(1, c2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // holographic diagonal sheen
  const sheen = ctx.createLinearGradient(0, 0, w, h);
  sheen.addColorStop(0.0, 'rgba(255,255,255,0)');
  sheen.addColorStop(0.42, 'rgba(255,255,255,0.10)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.45)');
  sheen.addColorStop(0.58, 'rgba(255,255,255,0.10)');
  sheen.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);

  // brand band
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(0, 0, w, 96);
  ctx.fillStyle = '#ffd700';
  ctx.textAlign = 'center';
  ctx.font = '800 36px Inter, system-ui, sans-serif';
  ctx.fillText('POKÉMON TCG', w / 2, 62);

  // art frame
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 150, w - 72, h - 330);

  // title
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 46px Inter, system-ui, sans-serif';
  wrapText(ctx, title.toUpperCase(), w / 2, h - 118, w - 90, 50);

  // subtitle
  if (subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '700 26px Inter, system-ui, sans-serif';
    ctx.fillText(subtitle, w / 2, h - 54);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export interface SealedBoxProps {
  title: string;
  subtitle?: string;
  colors: [string, string];
  sideColor: string;
  /** Radians/sec of idle Y-spin (0 = static; the hero uses OrbitControls instead). */
  spinSpeed?: number;
  scale?: number;
  hoverable?: boolean;
  onClick?: () => void;
}

// Proportions of a sealed booster box standing upright.
const W = 1.0;
const H = 1.36;
const D = 0.62;

export function SealedBox({
  title,
  subtitle = '',
  colors,
  sideColor,
  spinSpeed = 0,
  scale = 1,
  hoverable = false,
  onClick,
}: SealedBoxProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const materials = useMemo(() => {
    const label = makeLabelTexture(title, subtitle, colors[0], colors[1]);
    const front = new THREE.MeshPhysicalMaterial({ map: label, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.18 });
    const side = new THREE.MeshPhysicalMaterial({ color: sideColor, roughness: 0.36, clearcoat: 1, clearcoatRoughness: 0.25 });
    const cap = new THREE.MeshPhysicalMaterial({ color: sideColor, roughness: 0.45, clearcoat: 0.7 });
    // BoxGeometry face order: [px, nx, py, ny, pz(front), nz(back)]
    return [side, side, cap, cap, front, front];
  }, [title, subtitle, colors, sideColor]);

  useFrame((_, delta) => {
    if (ref.current && spinSpeed) ref.current.rotation.y += delta * spinSpeed;
  });

  const s = scale * (hovered ? 1.08 : 1);

  return (
    <group
      ref={ref}
      scale={[s, s, s]}
      rotation={[0.05, 0.5, 0]}
      onClick={onClick}
      onPointerOver={hoverable ? () => setHovered(true) : undefined}
      onPointerOut={hoverable ? () => setHovered(false) : undefined}
    >
      <mesh material={materials}>
        <boxGeometry args={[W, H, D]} />
      </mesh>
    </group>
  );
}
