import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { injected } from 'wagmi/connectors';

// Hyperliquid EVM testnet — see WALLET_CONTEXT.md.
// Chain id 998, native gas token HYPE, USDH stablecoin for markets.
export const hyperliquidTestnet = defineChain({
  id: 998,
  name: 'Hyperliquid Testnet',
  nativeCurrency: { name: 'Hyperliquid', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] },
  },
  testnet: true,
});

export const wagmiConfig = createConfig({
  chains: [hyperliquidTestnet],
  // injected() covers MetaMask, Rabby, and any EIP-1193 browser wallet.
  connectors: [injected()],
  transports: {
    [hyperliquidTestnet.id]: http(),
  },
});

// Make wagmi hooks strongly typed against this config.
declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
