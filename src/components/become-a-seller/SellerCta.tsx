"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const SellerCta = () => {
  const { setAuthMode } = useAuthStore();
  return (
    <section className="py-20 bg-linear-to-br from-accent to-primary text-accent-foreground text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Ready to start earning?</h2>
        <p className="text-accent-foreground/90 max-w-xl mx-auto text-sm lg:text-base">
          Join thousands of successful sellers transforming their skills into revenue today.
        </p>
        <div>
          <Link
            href="/auth"
            onClick={() => setAuthMode("signup")}
            className="inline-block rounded-full bg-background text-foreground px-8 py-3.5 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SellerCta;
