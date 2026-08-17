import { clearSession, getSession } from "@/lib/session";
import { ApiUser } from "@/types/user";
import { toast } from "react-toastify";
import { create } from "zustand";

type AuthState = {
  user: ApiUser | null;
  isAuthenticated: boolean;
  setUser: (user: ApiUser | null) => void;
  initializeAuth: () => void;
  signout: () => void;
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
  signout: () => {
    clearSession();
    set({ user: null, isAuthenticated: false });
    toast.info("Signed out successfully!");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
}));
