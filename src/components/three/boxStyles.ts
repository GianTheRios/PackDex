import type { Market } from '../../data/mockMarkets';

export interface BoxStyle {
  /** Front-face gradient (top → bottom). */
  colors: [string, string];
  /** Side / cap color. */
  side: string;
}

// A distinct sealed-box colorway per market, so the roster reads as different products.
const BY_ID: Record<string, BoxStyle> = {
  'sv-booster': { colors: ['#e23b2e', '#7a1216'], side: '#3a0d0f' },
  'prismatic-etb': { colors: ['#8b5cf6', '#3b1d8f'], side: '#241252' },
  'base-set-bb': { colors: ['#1f8a8a', '#0b3a4a'], side: '#07232e' },
  'surging-sparks': { colors: ['#f4c430', '#b8730a'], side: '#6e4406' },
  '151-etb': { colors: ['#e23b2e', '#b01f4f'], side: '#5e0f2a' },
  'crown-zenith': { colors: ['#d4af37', '#5a4a1a'], side: '#2e2710' },
};

const FALLBACK: BoxStyle = { colors: ['#4a4a6a', '#1a1a2e'], side: '#14142a' };

export function boxStyleForMarket(market: Market): BoxStyle {
  return BY_ID[market.id] ?? FALLBACK;
}
