import { create } from 'zustand';

interface GlobalState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  theme: 'light' | 'dark';
  setUser: (user: GlobalState['user']) => void;
  toggleTheme: () => void;
  clearUser: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  clearUser: () => set({ user: null }),
}));
