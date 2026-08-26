"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

const CtaSection = () => {
  const { isAuthenticated, setAuthMode } = useAuthStore();
  if (isAuthenticated) return null;
  return (
    <section className="w-full wrapper pb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/90 to-accent p-8 text-primary-foreground sm:p-14">
        <div className="w-full flex flex-col items-start gap-4 text-left">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Skillora</h2>
          <p className="max-w-md text-sm opacity-90 sm:text-base">
            Access top-tier freelance services right at your fingertips and grow your business faster
          </p>
          <div className="pt-2">
            <Link
              href="/auth"
              onClick={() => setAuthMode("signup")}
              className="inline-block rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105 hover:opacity-90"
            >
              Join Skillora
            </Link>
          </div>
        </div>
        <ul className="w-full grid grid-cols-1 gap-3 sm:grid-cols-2">
          {["Vetted freelancers", "Dedicated manager", "Payment protection", "Advanced analytics"].map((f) => (
            <li key={f} className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4 backdrop-blur">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-foreground/20 text-xs">
                <FaCheck />
              </span>
              <span className="text-sm font-medium">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CtaSection;
