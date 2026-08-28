"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaBars, FaMoon, FaSun } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import { useTheme } from "../layout/ThemeProvider";
import UserAvatar from "../common/UserAvatar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signout, user, initializeAuth } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  const displayName = user?.name || "Administrator";

  return (
    <div className="min-h-screen flex bg-background text-foreground relative overflow-x-hidden">
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <header className="bg-card/50 border-b border-border px-4 sm:px-8 py-4 flex items-center justify-between shrink-0 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar"
              className="lg:hidden text-foreground bg-card border border-border p-2.5 rounded-xl hover:text-accent transition-colors cursor-pointer"
            >
              <FaBars className="text-base" />
            </button>
            <h1 className="text-foreground font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
              Administration System
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-foreground text-sm font-bold tracking-wide">{displayName}</p>
              <p className="text-accent text-xs font-medium opacity-90">Administrator</p>
            </div>
            <UserAvatar src={user?.avatar} name={user?.name} size={36} />
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground hover:border-accent hover:text-accent cursor-pointer"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={signout}
              className="rounded-full border border-border px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold bg-card text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8 overflow-auto bg-card/20">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
