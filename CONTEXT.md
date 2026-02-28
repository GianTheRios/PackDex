# Packdex — Build Context

## What We're Building
A TCG sealed product prediction market web app built on Hyperliquid HIP-4 (Outcome Trading).
Users create and bet on prediction markets for sealed Pokémon booster box prices.

## Tech Stack
- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS with custom Retro_OS design tokens (dark mode)
- **Routing:** React Router v6
- **Charts:** Recharts
- **State:** Zustand
- **Wallet:** Hyperliquid wallet connect (mock for now)

## Design System: Retro_OS Dark Mode
Inspired by Windows 95/98 UI but dark-themed with TCG gold accents.

### Color Tokens
```
--bg-primary: #1a1a2e        (dark navy background)
--bg-secondary: #16213e      (slightly lighter panels)
--bg-panel: #0f3460          (panel/card backgrounds)
--border: #4a4a6a            (panel borders — 1px solid)
--border-accent: #e94560     (red alert borders)
--text-primary: #eaeaea      (main text)
--text-secondary: #9999bb    (muted text)
--accent-gold: #ffd700       (primary accent — TCG gold)
--accent-blue: #007bff       (secondary — info/links)
--accent-green: #00ff88      (positive / up)
--accent-red: #ff4455        (negative / down / alert)
--shadow: 2px 2px 0px #000  (hard pixel shadow)
```

### Typography
- Font: 'Press Start 2P' (pixel font) for headers/labels
- Font: 'Inter' or system-ui for body/data text (readability)
- H1: 16px, H2: 14px, H3: 12px, body: 13px, small: 11px

### Component Rules
- 1px solid borders (never rounded more than 2px)
- Hard drop shadows (2px 2px 0 #000) — no blur
- Window-style panel headers with title bar
- Buttons have pressed state (inset shadow on click)
- All caps labels for section headers

## Core Screens to Build

### 1. Home / Market Feed (`/`)
- Header: PACKDEX logo + wallet connect button + USDH balance
- Market cards grid: each card shows product name, current odds, volume, time left
- Filter tabs: HOT | NEW | ENDING SOON | YOUR BETS
- Sidebar (desktop): Top markets leaderboard + Foil Pool APY display

### 2. Market Detail (`/market/:id`)
- Product image + title + description
- Price chart (Recharts line chart — 7-day TWAP)
- YES/NO bet interface with USDH input
- Order book / bet distribution bar
- Market info: creator, creation date, settlement source, end date
- Comments section (mock)

### 3. Create Market (`/create`)
- Template selector: pick a market template
- Form: product search, target price, date, source
- $15 USDH stake requirement display
- Preview of market card before submitting
- Submit → goes to 24hr community vote

### 4. Foil Pool (`/foil-pool`)
- Total pool size + current APY
- Deposit/withdraw USDH interface
- Your position + earnings
- How it works explainer

### 5. Profile / Trader Card (`/profile`)
- Pokémon Trainer Card style layout
- Stats: Markets Created, Win Rate, Total Wagered, P&L
- Active bets table
- Settled markets history
- "Badges" row (earned for milestones)

### 6. Leaderboard (`/leaderboard`)
- Top traders by P&L
- Top market creators by volume
- Weekly / All-time toggle

## Market Card Component
Each market card displays:
- Product name + set name
- "Will [product] exceed $[X] by [date]?"
- YES%/NO% bar
- Volume (USDH)
- Time remaining
- Creator handle

## Mock Data
Use realistic mock data for all screens:
- Products: Pokémon Scarlet & Violet Booster Box, Prismatic Evolutions ETB, Base Set Booster Box, etc.
- Prices: $150–$800 range
- Volumes: $500–$50,000 USDH
- Usernames: @trainer_red, @foil_flipper, @packrat_99, etc.

## Key UX Notes
- Mobile-first but desktop has sidebar layout
- Dark mode only (no light toggle needed)
- All prices in USDH (stablecoin)
- Wallet connect is mocked (show address like 0x1234...5678)
- No real blockchain calls — all mock/static data for v0

## File Structure
```
src/
  components/
    layout/       Header, Sidebar, Footer
    ui/            Button, Card, Badge, ProgressBar, TitleBar
    market/        MarketCard, MarketChart, BetInterface
    profile/       TrainerCard, BadgeRow, StatsGrid
  pages/
    Home.tsx
    MarketDetail.tsx
    CreateMarket.tsx
    FoilPool.tsx
    Profile.tsx
    Leaderboard.tsx
  data/
    mockMarkets.ts
    mockUser.ts
  store/
    useAppStore.ts
  styles/
    retro.css      (global design tokens + base styles)
  App.tsx
  main.tsx
```

## When Done
Run: openclaw system event --text "Done: Packdex v0 scaffolded — all 6 screens built" --mode now
