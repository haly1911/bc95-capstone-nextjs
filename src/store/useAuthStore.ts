import { clearSession, getSession } from "@/lib/session";
import { ApiUser } from "@/types/user";
import { toast } from "react-toastify";
import { create } from "zustand";

type AuthState = {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: ApiUser | null, token?: string | null) => void;
  initializeAuth: () => void;
  signout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user, token = null) =>
    set((state) => ({
      user,
      token: token !== null ? token : state.token,
      isAuthenticated: !!user,
    })),
  initializeAuth: () => {
    const session = getSession();
    if (session?.content?.user) {
      set({
        user: session.content.user,
        token: session.content.token,
        isAuthenticated: true,
      });
    }
  },
  signout: () => {
    clearSession();
    set({ user: null, token: null, isAuthenticated: false });
    toast.info("Signed out successfully!");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
}));
