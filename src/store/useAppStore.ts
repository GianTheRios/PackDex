import { create } from 'zustand';

interface AppState {
  walletConnected: boolean;
  walletAddress: string;
  usdhBalance: number;
  activeTab: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  walletConnected: false,
  walletAddress: '0x1a2B...9f4E',
  usdhBalance: 2450.00,
  activeTab: 'HOT',
  connectWallet: () => set({ walletConnected: true }),
  disconnectWallet: () => set({ walletConnected: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
