import { clearSession, getSession } from "@/lib/session";
import { ApiUser } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: ApiUser | null;
  isAuthenticated: boolean;
  setUser: (user: ApiUser | null) => void;
  initializeAuth: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  initializeAuth: () => {
    const session = getSession();
    if (session?.content?.user) {
      set({
        user: session.content.user,
        isAuthenticated: true,
      });
    }
  },
  logout: () => {
    clearSession();
    set({ user: null, isAuthenticated: false });
  },
}));
