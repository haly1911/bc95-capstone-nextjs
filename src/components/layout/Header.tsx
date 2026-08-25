"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaMoon, FaRegSun, FaStackExchange, FaSun } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import SearchInput from "../common/SearchInput";
import UserAvatar from "../common/UserAvatar";

const Header = () => {
  const { theme, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, initializeAuth, signout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      if (window.scrollY > 475) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const shouldShowSearch = !isHome || showSearch;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="wrapper flex items-center gap-4 py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-accent/20">
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
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm font-medium">
              <Link href="/gigs" className="hover:text-accent">
                Explore
              </Link>
              {isMounted && isAuthenticated && user && (
                <Link href="/seller-dashboard" className="hover:text-accent">
                  Switch to Selling
                </Link>
              )}
            </nav>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground hover:border-accent hover:text-accent cursor-pointer"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            {isMounted && isAuthenticated && user ? (
              <div className="flex items-center gap-6">
                <Link href="/profile">
                  <UserAvatar src={user.avatar} name={user.name} size={36} className="hover:scale-105" />
                </Link>
                <button
                  onClick={signout}
                  className="rounded-full border border-border px-6 py-3 text-xs font-semibold bg-card text-foreground hover:border-accent hover:text-accent cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow shadow-accent/20 hover:opacity-90"
              >
                Join
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
