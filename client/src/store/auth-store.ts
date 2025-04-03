import { create } from 'zustand';
import { Animal } from "@/types/animal";

interface AuthState {
  user: Animal | null;
  isAuthenticated: boolean;
  setUser: (user: Animal) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
