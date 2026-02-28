export interface Market {
  id: string;
  productName: string;
  setName: string;
  targetPrice: number;
  currentYes: number;
  endDate: string;
  volume: number;
  creator: string;
  createdAt: string;
  description: string;
  settlementSource: string;
  imageEmoji: string;
  priceHistory: { date: string; price: number }[];
  comments: { user: string; text: string; time: string }[];
}

const makePriceHistory = (base: number, days = 7): { date: string; price: number }[] => {
  const history: { date: string; price: number }[] = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const noise = (Math.random() - 0.5) * 20;
    history.push({
      date: d.toISOString().slice(0, 10),
      price: Math.round((base + noise) * 100) / 100,
    });
  }
  return history;
};

export const mockMarkets: Market[] = [
  {
    id: 'sv-booster',
    productName: 'Scarlet & Violet Booster Box',
    setName: 'Scarlet & Violet',
    targetPrice: 160,
    currentYes: 72,
    endDate: '2026-04-01',
    volume: 24500,
    creator: '@foil_flipper',
    createdAt: '2026-02-10',
    description: 'Will the Scarlet & Violet base set booster box exceed $160 by April 1st, 2026?',
    settlementSource: 'TCGPlayer Market Price',
    imageEmoji: '🔥',
    priceHistory: makePriceHistory(72),
    comments: [
      { user: '@trainer_red', text: 'Definitely going above $160 with the new meta.', time: '2h ago' },
      { user: '@packrat_99', text: 'Overrated set tbh. Selling NO.', time: '5h ago' },
    ],
  },
  {
    id: 'prismatic-etb',
    productName: 'Prismatic Evolutions ETB',
    setName: 'Prismatic Evolutions',
    targetPrice: 250,
    currentYes: 45,
    endDate: '2026-05-15',
    volume: 48200,
    creator: '@trainer_red',
    createdAt: '2026-01-20',
    description: 'Will the Prismatic Evolutions Elite Trainer Box exceed $250 by May 15th, 2026?',
    settlementSource: 'TCGPlayer Market Price',
    imageEmoji: '✨',
    priceHistory: makePriceHistory(45),
    comments: [
      { user: '@foil_flipper', text: 'The eeveelutions hype is real.', time: '1h ago' },
    ],
  },
  {
    id: 'base-set-bb',
    productName: 'Base Set Booster Box',
    setName: 'Base Set (1999)',
    targetPrice: 15000,
    currentYes: 31,
    endDate: '2026-12-31',
    volume: 12800,
    creator: '@vintage_vault',
    createdAt: '2026-02-01',
    description: 'Will a sealed Base Set Unlimited booster box exceed $15,000 by end of 2026?',
    settlementSource: 'Heritage Auctions',
    imageEmoji: '🏛️',
    priceHistory: makePriceHistory(31),
    comments: [
      { user: '@packrat_99', text: 'Vintage is dead money rn.', time: '1d ago' },
      { user: '@vintage_vault', text: 'Patience. These only go up long term.', time: '20h ago' },
    ],
  },
  {
    id: 'surging-sparks',
    productName: 'Surging Sparks Booster Box',
    setName: 'Surging Sparks',
    targetPrice: 180,
    currentYes: 88,
    endDate: '2026-03-15',
    volume: 31400,
    creator: '@zap_collector',
    createdAt: '2026-02-05',
    description: 'Will Surging Sparks booster box exceed $180 by March 15th, 2026?',
    settlementSource: 'TCGPlayer Market Price',
    imageEmoji: '⚡',
    priceHistory: makePriceHistory(88),
    comments: [
      { user: '@trainer_red', text: 'Pikachu alt art carrying this set.', time: '3h ago' },
    ],
  },
  {
    id: '151-etb',
    productName: '151 Elite Trainer Box',
    setName: 'Pokémon 151',
    targetPrice: 200,
    currentYes: 62,
    endDate: '2026-06-01',
    volume: 19700,
    creator: '@packrat_99',
    createdAt: '2026-01-28',
    description: 'Will the 151 ETB exceed $200 by June 2026?',
    settlementSource: 'TCGPlayer Market Price',
    imageEmoji: '🎴',
    priceHistory: makePriceHistory(62),
    comments: [],
  },
  {
    id: 'crown-zenith',
    productName: 'Crown Zenith Booster Box',
    setName: 'Crown Zenith',
    targetPrice: 300,
    currentYes: 19,
    endDate: '2026-09-01',
    volume: 8600,
    creator: '@foil_flipper',
    createdAt: '2026-02-15',
    description: 'Will Crown Zenith booster box exceed $300 by September 2026?',
    settlementSource: 'TCGPlayer Market Price',
    imageEmoji: '👑',
    priceHistory: makePriceHistory(19),
    comments: [
      { user: '@zap_collector', text: 'No chance lol.', time: '6h ago' },
    ],
  },
];
