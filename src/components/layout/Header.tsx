"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { FaBars, FaMoon, FaStackExchange, FaSun } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import SearchInput from "../common/SearchInput";
import UserAvatar from "../common/UserAvatar";
import CategoryDropdown from "./CategoryDropdown";
import { ApiCategory, ApiSubcategory } from "@/types/category";

interface HeaderProps {
  categories: ApiCategory[];
  subcategories: ApiSubcategory[];
  onOpenMobileSidebar: () => void;
}

const Header = ({ categories, subcategories, onOpenMobileSidebar }: HeaderProps) => {
  const { theme, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, initializeAuth, signout, setAuthMode } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 475) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      if (scrollY > 1100) {
        setShowCategory(true);
      } else {
        setShowCategory(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const shouldShowSearch = !isHome || showSearch;
  const shouldShowCategory = !isHome || showCategory;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="wrapper flex items-center gap-4 py-4">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open Menu"
          className="lg:hidden text-foreground bg-card border border-border p-2.5 rounded-xl hover:text-accent transition-colors cursor-pointer shrink-0"
        >
          <FaBars />
        </button>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="logo-icon">
            <FaStackExchange />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Skill<span className="text-accent">ora</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-6">
          <div
            className={`transition-all duration-300 ease-in-out hidden lg:block w-100 ${
              shouldShowSearch
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none hidden"
            }`}
          >
            <SearchInput
              placeholder="Search for any service…"
              onSearch={(keyword) => {
                if (!keyword) return;
                router.push(`/gigs?keyword=${encodeURIComponent(keyword)}`);
              }}
            />
          </div>
          <div className="flex items-center gap-2 lg:gap-8">
            <nav className="hidden lg:flex items-center gap-2 lg:gap-8 text-sm font-medium">
              <Link href="/gigs" className="hover:text-accent">
                Explore
              </Link>
              {isMounted && isAuthenticated && user ? (
                <Link href="/seller-dashboard" className="hover:text-accent">
                  Switch to Selling
                </Link>
              ) : (
                <Link href="/become-a-seller" className="hover:text-accent">
                  Become a Seller
                </Link>
              )}
            </nav>
            <button onClick={toggle} aria-label="Toggle theme" className="dark-mode-icon">
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            {isMounted && isAuthenticated && user ? (
              <div className="flex items-center gap-2 lg:gap-8">
                <Link href="/profile">
                  <UserAvatar src={user.avatar} name={user.name} size={36} className="hover:scale-105" />
                </Link>
                <button
                  onClick={signout}
                  className="rounded-full border border-border px-4 py-2 sm:px-6 sm:py-3 text-xs font-semibold bg-card text-foreground hover:border-accent hover:text-accent cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setAuthMode("signin")}
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow shadow-accent/20 hover:opacity-90"
              >
                Join
              </Link>
            )}
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          shouldShowCategory
            ? "opacity-100 translate-y-0 pointer-events-auto max-h-20"
            : "opacity-0 -translate-y-2 pointer-events-none max-h-0 overflow-hidden"
        }`}
      >
        <CategoryDropdown categories={categories} subcategories={subcategories} />
      </div>
    </header>
  );
};

export default Header;
