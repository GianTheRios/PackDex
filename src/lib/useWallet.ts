import { useAccount, useBalance, useConnect, useConnectors, useDisconnect } from 'wagmi';
import { formatUnits } from 'viem';

// Single source of truth for wallet UI state. Wraps wagmi's hooks so Header and
// BetInterface share one connect/disconnect/format implementation instead of
// each re-deriving it (and so wallet state lives in wagmi, not duplicated in the store).
export function useWallet() {
  const { address, isConnected } = useAccount();
  const connectors = useConnectors();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  // No `token` arg → native HYPE balance on Hyperliquid testnet (USDH token TBD).
  const { data: balance } = useBalance({ address });

  const addressShort = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  // wagmi v3's balance data is { value, decimals, symbol } — no preformatted string.
  const balanceLabel = balance
    ? `${Number(formatUnits(balance.value, balance.decimals)).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${balance.symbol}`
    : '';

  function connectInjected() {
    // injected() covers MetaMask/Rabby/any EIP-1193 browser wallet.
    const injected = connectors.find((c) => c.type === 'injected') ?? connectors[0];
    if (injected) connect({ connector: injected });
  }

  return {
    address,
    addressShort,
    isConnected,
    isConnecting: isPending,
    balance,
    balanceLabel,
    connect: connectInjected,
    disconnect,
  };
}
