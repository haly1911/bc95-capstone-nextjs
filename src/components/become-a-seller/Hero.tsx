"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaStar } from "react-icons/fa6";

const Hero = () => {
  const { setAuthMode } = useAuthStore();
  return (
    <section className="relative overflow-hidden py-20 border-b border-border/60 bg-card/40">
      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            <FaStar className="text-accent" /> Start your freelance journey
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Work Your Way. <br />
            <span className="text-accent">Your terms.</span> Your timeline.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Turn your talent into a thriving business. Join Skillora to connect with global clients and take full
            control of your career.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/auth"
              onClick={() => setAuthMode("signup")}
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:opacity-90 flex items-center gap-2"
            >
              Create your profile <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl overflow-hidden">
            <div className="grid place-items-center w-full h-90">
              <Image
                src="/seller-hero.jpg"
                alt="Freelancer working"
                width={500}
                height={200}
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Active Freelancers</p>
                <p className="text-xs text-muted-foreground">Building their dream career</p>
              </div>
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-cols place-items-center text-xs font-bold border-2 border-background">
                  SK
                </div>
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-cols place-items-center text-xs font-bold border-2 border-background">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
