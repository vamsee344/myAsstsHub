import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  notificationCount: number;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotificationCount: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  notificationCount: 0,
  setTheme: (theme) => set({ theme }),
  setNotificationCount: (notificationCount) => set({ notificationCount }),
}));
