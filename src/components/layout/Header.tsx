"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

const Header = () => {
  const { theme, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

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
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-accent/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 14c3-6 13-6 16 0" strokeLinecap="round" />
              <circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" />
            </svg>
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
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-full border border-border bg-card px-4 py-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search for any service…"
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="ml-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-accent">
                Explore
              </Link>
              <Link href="/" className="hover:text-accent">
                Become a seller
              </Link>
            </nav>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground hover:border-accent cursor-pointer"
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <Link
              href="/auth"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow shadow-accent/20 hover:opacity-90"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
