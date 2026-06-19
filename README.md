# PackDex

> A retro-styled **prediction market for sealed Pokémon TCG products**, built on Hyperliquid.

PackDex lets users create and bet on prediction markets for sealed Pokémon booster-box prices —
e.g. *"Will a Prismatic Evolutions ETB exceed $90 by Dec 1?"* — settled on **Hyperliquid HIP-4
(Outcome Trading)**. The UI is **"Retro_OS"**: a Windows 95/98-inspired aesthetic with TCG-gold
accents, available in both light and dark themes.

---

## Status — June 2026

**v0: a working mock-data prototype.** All six screens are built and routed, the design system is
unified with a light/dark toggle, and a real Hyperliquid-testnet wallet connection is wired in.
The Market Detail page also has an **experimental 3D product viewer** (POC). Market/user data is
still mock; no on-chain transactions yet.

### Screens (all currently mock data)

| Screen | Route | Status |
|---|---|---|
| Home / Market Feed | `/` | ✅ built · _YOUR BETS tab + desktop Sidebar still TODO_ |
| Market Detail | `/market/:id` | ✅ complete · 🧪 experimental **3D viewer** (see below) |
| Create Market | `/create` | ✅ complete · _submit is a mock alert_ |
| Foil Pool | `/foil-pool` | ✅ complete · _deposit/withdraw is a mock alert_ |
| Profile / Trainer Card | `/profile` | ✅ complete |
| Leaderboard | `/leaderboard` | ✅ built · _WEEKLY/ALL-TIME toggle not yet wired_ |

### What works today

- All six screens, client-side routing, responsive layout.
- **Light/dark theme toggle** (🌙/☀️ in the header) — persisted to `localStorage`, no-flash on load, smooth cross-fade.
- **Wallet connect** via injected wallet (MetaMask / Rabby) on **Hyperliquid testnet (chain 998)**, with live native (HYPE) balance — see `src/lib/wagmi.ts` and `src/lib/useWallet.ts`.

### 🧪 Experimental: 3D product viewer (POC)

On the **Market Detail** page, the sealed product renders as an interactive **3D box** (react-three-fiber):
a drag-to-spin hero with a glossy "shrink-wrap" look, sitting beside the odds + bet panel, plus a bottom
**roster of the other markets as mini 3D boxes** you can click to open. The 3D chunk is **lazy-loaded**
(three.js stays off every other route) with a 2D emoji fallback. Code in `src/components/three/`.

_POC limitations:_ box textures are **procedural placeholders** (not real art); **every product uses the
same proportions** (booster box vs ETB vs pack vs tin should each get their own size + camera framing —
parked for later); and the roster uses one small WebGL canvas per box (fine at this scale, worth
consolidating into a single canvas eventually).

### Known caveat

- As of **2026-06-18**, Hyperliquid's testnet **EVM RPC** (`rpc.hyperliquid-testnet.xyz/evm`) is
  returning broken TLS (server-side outage) — so the live wallet handshake can't be completed yet.
  Mainnet RPC and the testnet INFO API are unaffected. The integration is correct and ready; it just
  needs the endpoint back.

---

## Tech stack

- **Vite + React 19 + TypeScript**
- **react-router-dom** (routing) · **Zustand** (UI state) · **Recharts** (charts)
- **wagmi v3 + viem** (Hyperliquid testnet wallet)
- **three.js + react-three-fiber + drei** — experimental 3D product viewer (lazy-loaded on the market route)
- **Hand-written CSS with design tokens** in `src/styles/retro.css` (light/dark via `[data-theme]`).
  _Note: there is no Tailwind, despite what older notes in `CONTEXT.md` say._

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

## Wallet / Hyperliquid testnet

To test wallet connect, add the network to Rabby/MetaMask and import the dev wallet:

| Field | Value |
|---|---|
| Network name | Hyperliquid Testnet |
| RPC URL | `https://rpc.hyperliquid-testnet.xyz/evm` |
| Chain ID | `998` |
| Currency | `HYPE` |

The dev wallet's private key lives in `.dev-wallet.json` (git-ignored; a **testnet throwaway**).
Import it into your wallet, then click **CONNECT** in the header.

---

## Roadmap — what to work on next

1. **Finish the wallet flow** — complete the live connect test once the testnet RPC recovers, then
   display the **USDH** (ERC-20) balance instead of just native HYPE (needs the USDH token address).
2. **Quick wins** — implement Home's "YOUR BETS" filter; make the Leaderboard WEEKLY/ALL-TIME toggle
   switch real data; mount the built-but-unused `Sidebar` on Home; add a 404 route.
3. **Make it interactive** — move mock data into Zustand and add mock write-actions (`placeBet`,
   `addMarket`, `deposit/withdraw`) so CTAs mutate state instead of firing `alert()`s.
4. **Go on-chain** — real HIP-4 market creation/settlement and USDH transactions (replaces mock).
5. **Housekeeping** — adopt or delete the orphaned components (`ui/Badge`, `ui/TitleBar`,
   `profile/*`); build or drop `layout/Footer`.
6. **3D product viewer** (experimental) — give each product its real **dimensions + camera framing**
   (booster box vs ETB vs pack vs tin), swap procedural textures for **real box art**, optionally extend
   the 3D boxes to the Home market cards, and consolidate the roster into one shared canvas.

## Project structure

```
src/
  components/   layout (Header), market (MarketCard, MarketChart, BetInterface), three (3D viewer), ui, profile
  pages/        Home, MarketDetail, CreateMarket, FoilPool, Profile, Leaderboard
  lib/          wagmi.ts (chain+config), useWallet.ts, useTheme.ts
  store/        useAppStore.ts (Zustand — UI state)
  data/         mockMarkets.ts, mockUser.ts
  styles/       retro.css (design tokens + components, light/dark)
```

## Related docs

- [`CONTEXT.md`](./CONTEXT.md) — original v0 design spec & Retro_OS design system.
- [`WALLET_CONTEXT.md`](./WALLET_CONTEXT.md) — Hyperliquid wallet integration plan.
