"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaMoon, FaRegSun, FaStackExchange, FaSun } from "react-icons/fa6";

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
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-full border border-border bg-card px-4 py-2"
            >
              <FaMagnifyingGlass className="text-muted-foreground" />
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
              {theme === "dark" ? <FaSun /> : <FaMoon />}
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
