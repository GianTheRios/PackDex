# Packdex — Wallet + Testnet Integration Context

## Goal
Wire real Hyperliquid testnet wallet connection into the existing Packdex UI (which is currently all mock data).

## Hyperliquid Testnet Specs
- Chain ID: 998
- RPC: https://rpc.hyperliquid-testnet.xyz/evm
- API: https://api.hyperliquid-testnet.xyz
- Native gas token: HYPE
- Stablecoin: USDH

## What Needs to Be Built

### 1. Install Dependencies
```
npm install wagmi viem @tanstack/react-query
```
wagmi v2 + viem is the standard for EVM wallet connections.

### 2. Wagmi Config (`src/lib/wagmi.ts`)
Define the Hyperliquid testnet chain and create wagmi config:
- Chain: id=998, name="Hyperliquid Testnet", rpc=https://rpc.hyperliquid-testnet.xyz/evm
- Connectors: injected() — this covers MetaMask, Rabby, and any injected wallet
- Transport: http()

### 3. Wrap App with Providers (`src/main.tsx`)
Wrap the app with WagmiProvider + QueryClientProvider.

### 4. Update Header Component (`src/components/layout/Header.tsx`)
Replace the mock wallet connect button with real wagmi hooks:
- useConnect() — connect wallet
- useDisconnect() — disconnect
- useAccount() — get address + connection status
- useBalance() — fetch USDH balance (or HYPE for now)
- Show: truncated address (0x1234...5678) when connected
- Show: "Connect Wallet" button when disconnected
- On connect: trigger injected() connector (Rabby)

### 5. Update App Store (`src/store/useAppStore.ts`)
Add wallet state: address, isConnected, balance — sync from wagmi hooks.

### 6. Dev Wallet Info
Address: 0x2b701AB376f6Ac2b777187c041104987f866D07b
This is the dev wallet for testing. Ruto will import it into Rabby.

## What NOT to Touch Yet
- All market data stays mock for now
- No real on-chain transactions yet
- No HIP-4 contract calls yet
- Just wallet connection + balance display

## Design System Reminder
Keep all Retro_OS dark mode styles intact. The wallet button in the header should match existing button styles (1px border, hard shadow, gold accent on connect).

## When Done
Run: openclaw system event --text "Done: Packdex wallet connect wired to Hyperliquid testnet" --mode now
