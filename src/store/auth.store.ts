import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types/api.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  rehydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (token, user) => {
    try {
      await SecureStore.setItemAsync('auth_token', token);
    } catch (e) {}
    set({ token, user, isAuthenticated: true, isLoading: false });
  },
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
    } catch (e) {}
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },
  rehydrate: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        // Mocking user profile load for verification
        set({
          token,
          isAuthenticated: true,
          user: {
            id: 5,
            fname: 'Alex',
            lname: 'Carter',
            uname: 'alexcarter',
            email: 'mah5@gmail.com',
            kyc_status: 'verified'
          },
          isLoading: false
        });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      set({ isLoading: false });
    }
  }
}));
