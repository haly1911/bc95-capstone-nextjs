"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaMoon, FaRegSun, FaStackExchange, FaSun } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const Header = () => {
  const { theme, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { isAuthenticated, user, initializeAuth, signout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return null;
    router.push(`/gigs?keyword=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  };

  useEffect(() => {
    setIsMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 475) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              showSearch
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none hidden"
            }`}
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-full border border-border bg-card px-4 py-2"
            >
              <FaMagnifyingGlass className="text-muted-foreground" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for any service…"
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm font-medium">
              <Link href="/gigs" className="hover:text-accent">
                Explore
              </Link>
              <Link href="/" className="hover:text-accent">
                Become a seller
              </Link>
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
                  {!!user.avatar ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative flex items-center justify-center hover:scale-105">
                      <Image
                        loading="eager"
                        src={user.avatar}
                        alt="user-avatar"
                        width={36}
                        height={36}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="h-9 w-9 grid place-items-center rounded-full bg-linear-to-br from-primary to-accent text-xs font-bold text-primary-foreground ring-offset-2 ring-offset-background hover:ring-2 hover:ring-accent">
                      <span>{user.name[0].toUpperCase()}</span>
                    </div>
                  )}
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
