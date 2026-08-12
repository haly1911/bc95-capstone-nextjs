"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/gigs?keyword=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <section>
      <div className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-accent),transparent_60%)]/25 lg:hidden" />
        <div className="absolute mx-auto max-w-7xl inset-0 -z-10 hidden lg:block overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute h-full w-full object-cover">
            <source src="/hero-bg-vid.mp4" type="video/mp4" />
            Your browser does not support the video tag
          </video>
          <div className="absolute inset-0 bg-background/30" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:pt-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" /> Trusted by 2M+ businesses
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Find the perfect{" "}
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">freelance</span>
            <br />
            service, instantly.
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground lg:text-foreground sm:text-lg">
            Skillora connects you with vetted talent in design, code, marketing and more — from quick tasks to long-term
            projects.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex items-center rounded-2xl border border-border bg-card p-2 shadow-lg shadow-accent/5"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Try 'brand logo design' or 'React developer'"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
            >
              Search
            </button>
          </form>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground lg:text-foreground">
            <span>Popular:</span>
            {["Logo Design", "Website Design", "Articles & Blog Posts", "Short Video Ads", "Video Editing"].map((t) => (
              <span
                key={t}
                onClick={() => router.push(`/gigs/${encodeURIComponent(t)}`)}
                className="rounded-full border border-border lg:border-foreground px-3 py-1.5 hover:border-accent hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 text-xs uppercase tracking-widest text-muted-foreground sm:px-6 lg:px-8">
          <span>Trusted by teams at</span>
          {["Meta", "Netflix", "P&G", "PayPal", "Google", "Shopify"].map((b) => (
            <span key={b} className="text-base font-bold italic text-foreground/70">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
