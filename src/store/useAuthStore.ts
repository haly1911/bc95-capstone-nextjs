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

const hasCookie = (name: string) => {
  if (typeof window === "undefined") return false;
  return document.cookie.split("; ").some((item) => item.trim().startsWith(`${name}=`));
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
    const hasToken = hasCookie("token");
    const session = getSession();
    if (session?.content?.user && !hasToken) {
      clearSession();
      set({ user: null, token: null, isAuthenticated: false });
      const hasShownToast = sessionStorage.getItem("session_expired_toast");
      if (!hasShownToast) {
        toast.error("Your session has expired. Please sign in again.");
        sessionStorage.setItem("session_expired_toast", "true");
      }
      return;
    }
    if (hasToken) {
      sessionStorage.removeItem("session_expired_toast");
    }
    if (session?.content?.user && hasToken) {
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
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  },
}));
