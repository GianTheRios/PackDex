export interface UserBet {
  marketId: string;
  marketName: string;
  side: 'YES' | 'NO';
  amount: number;
  price: number;
  timestamp: string;
  settled: boolean;
  pnl?: number;
}

export interface UserBadge {
  name: string;
  icon: string;
  description: string;
}

export interface UserProfile {
  address: string;
  displayName: string;
  handle: string;
  usdh: number;
  marketsCreated: number;
  winRate: number;
  totalWagered: number;
  pnl: number;
  foilPoolDeposit: number;
  foilPoolEarnings: number;
  bets: UserBet[];
  badges: UserBadge[];
}

export const mockUser: UserProfile = {
  address: '0x1a2B...9f4E',
  displayName: 'TRAINER RED',
  handle: '@trainer_red',
  usdh: 2450.00,
  marketsCreated: 8,
  winRate: 67,
  totalWagered: 12400,
  pnl: 3200,
  foilPoolDeposit: 1000,
  foilPoolEarnings: 45.20,
  bets: [
    { marketId: 'sv-booster', marketName: 'SV Booster Box > $160', side: 'YES', amount: 500, price: 0.72, timestamp: '2026-02-20', settled: false },
    { marketId: 'prismatic-etb', marketName: 'Prismatic ETB > $250', side: 'NO', amount: 300, price: 0.55, timestamp: '2026-02-18', settled: false },
    { marketId: 'surging-sparks', marketName: 'Surging Sparks > $180', side: 'YES', amount: 800, price: 0.85, timestamp: '2026-02-12', settled: false },
    { marketId: '151-etb', marketName: '151 ETB > $200', side: 'YES', amount: 200, price: 0.60, timestamp: '2026-01-30', settled: true, pnl: 140 },
    { marketId: 'crown-zenith', marketName: 'Crown Zenith > $300', side: 'NO', amount: 400, price: 0.80, timestamp: '2026-01-25', settled: true, pnl: 320 },
  ],
  badges: [
    { name: 'FIRST BET', icon: '🎯', description: 'Placed your first prediction' },
    { name: 'CREATOR', icon: '🏗️', description: 'Created 5+ markets' },
    { name: 'STREAK', icon: '🔥', description: 'Won 5 bets in a row' },
    { name: 'WHALE', icon: '🐋', description: 'Wagered over 10,000 USDH' },
    { name: 'OG', icon: '👾', description: 'Joined in the first month' },
  ],
};

export interface LeaderboardEntry {
  rank: number;
  handle: string;
  pnl: number;
  winRate: number;
  totalVolume: number;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, handle: '@foil_flipper', pnl: 8420, winRate: 74, totalVolume: 52000 },
  { rank: 2, handle: '@trainer_red', pnl: 3200, winRate: 67, totalVolume: 12400 },
  { rank: 3, handle: '@packrat_99', pnl: 2100, winRate: 61, totalVolume: 18500 },
  { rank: 4, handle: '@vintage_vault', pnl: 1850, winRate: 58, totalVolume: 9200 },
  { rank: 5, handle: '@zap_collector', pnl: 1200, winRate: 55, totalVolume: 7800 },
  { rank: 6, handle: '@shiny_hunter', pnl: 980, winRate: 52, totalVolume: 6100 },
  { rank: 7, handle: '@booster_baron', pnl: 750, winRate: 50, totalVolume: 5400 },
  { rank: 8, handle: '@sealed_sage', pnl: 420, winRate: 48, totalVolume: 4200 },
  { rank: 9, handle: '@rip_n_ship', pnl: -200, winRate: 42, totalVolume: 3800 },
  { rank: 10, handle: '@box_breaker', pnl: -680, winRate: 38, totalVolume: 2900 },
];

export interface TopCreator {
  rank: number;
  handle: string;
  marketsCreated: number;
  totalVolume: number;
}

export const mockTopCreators: TopCreator[] = [
  { rank: 1, handle: '@foil_flipper', marketsCreated: 15, totalVolume: 89000 },
  { rank: 2, handle: '@packrat_99', marketsCreated: 12, totalVolume: 64000 },
  { rank: 3, handle: '@trainer_red', marketsCreated: 8, totalVolume: 42000 },
  { rank: 4, handle: '@vintage_vault', marketsCreated: 6, totalVolume: 28000 },
  { rank: 5, handle: '@zap_collector', marketsCreated: 5, totalVolume: 19000 },
];
