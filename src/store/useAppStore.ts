import { create } from 'zustand';

// Wallet state now lives in wagmi (see src/lib/useWallet.ts), not here.
interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'HOT',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
