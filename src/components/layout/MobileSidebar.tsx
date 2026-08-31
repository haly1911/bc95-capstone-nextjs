"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import { useTheme } from "./ThemeProvider";
import SearchInput from "../common/SearchInput";
import UserAvatar from "../common/UserAvatar";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const { isAuthenticated, user, signout, setAuthMode } = useAuthStore();

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`sidebar-bg ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <aside
        className={`sidebar lg:translate-x-0 w-72 max-w-[80vw] h-dvh ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-extrabold tracking-tight">
            Skill<span className="text-accent">ora</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-foreground hover:text-accent cursor-pointer"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>
        <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
          <div>
            <SearchInput
              placeholder="Search..."
              onSearch={(keyword) => {
                if (!keyword) return;
                router.push(`/gigs?keyword=${encodeURIComponent(keyword)}`);
                setIsOpen(false);
              }}
            />
          </div>
          <nav className="space-y-2">
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest px-2 mb-2">Menu</p>
            <Link
              href="/gigs"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/gigs" ? "bg-accent/10 text-accent" : "hover:bg-card/80 text-foreground"
              }`}
            >
              Explore
            </Link>
            {isAuthenticated && user ? (
              <Link
                href="/seller-dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-card/80 text-foreground"
              >
                Switch to Selling
              </Link>
            ) : (
              <Link
                href="/become-a-seller"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-card/80 text-foreground"
              >
                Become a Seller
              </Link>
            )}
          </nav>
        </div>
        <div className="px-6 py-4 border-t border-border space-y-4 bg-background/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Appearance</span>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:border-accent hover:text-accent cursor-pointer"
            >
              {theme === "dark" ? (
                <>
                  <FaSun /> Light Mode
                </>
              ) : (
                <>
                  <FaMoon /> Dark Mode
                </>
              )}
            </button>
          </div>
          {isAuthenticated && user ? (
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <UserAvatar src={user.avatar} name={user.name} size={36} />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">{user.name}</p>
                </div>
              </Link>
              <button
                onClick={() => {
                  signout();
                  setIsOpen(false);
                }}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold bg-card text-foreground hover:border-accent hover:text-accent cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              onClick={() => {
                setAuthMode("signin");
                setIsOpen(false);
              }}
              className="block w-full text-center rounded-full bg-accent py-2.5 text-sm font-semibold text-accent-foreground shadow shadow-accent/20 hover:opacity-90"
            >
              Join
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
