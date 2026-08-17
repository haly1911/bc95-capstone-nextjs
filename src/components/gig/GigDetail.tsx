"use client";

import { ApiGigWithUser } from "@/types/gig";
import Image from "next/image";
import Link from "next/link";

interface GigDetailProps {
  gig: ApiGigWithUser;
}

const packages = [
  {
    name: "Basic",
    price: 45,
    delivery: "3 days",
    revisions: 1,
    features: ["1 concept", "Logo transparency", "Vector file"],
  },
  {
    name: "Standard",
    price: 95,
    delivery: "5 days",
    revisions: 3,
    features: ["3 concepts", "Source file", "Social kit", "Vector file"],
  },
  {
    name: "Premium",
    price: 220,
    delivery: "7 days",
    revisions: "Unlimited",
    features: ["5 concepts", "Full brand kit", "Stationery", "Social kit", "Source + vector"],
  },
];

const GigDetail = ({ gig }: GigDetailProps) => {
  return (
    <main>
      <div className="wrapper py-10">
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{gig.tenCongViec}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <Link href="/seller/$username" className="flex items-center gap-3 hover:text-accent">
                {!!gig.user?.avatar ? (
                  <Image
                    loading="eager"
                    src={gig.user?.avatar}
                    alt="user-avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-accent" />
                )}
                <p className="font-semibold">{gig.user?.name}</p>
              </Link>
              <span className="text-xs">
                ★ <b>{gig.saoCongViec}</b> <span className="text-muted-foreground">({gig.danhGia})</span>
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                loading="eager"
                src={gig.hinhAnh}
                alt="gig-img"
                width={200}
                height={100}
                className="w-full object-cover"
              />
            </div>
          </div>
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold border-b pb-3">About this gig</h2>
              <p className="mt-3 text-sm leading-relaxed text-justify text-muted-foreground">{gig.moTa}</p>
              <div className="p-6">
                <button className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer">
                  Continue (${gig.giaTien})
                </button>
                <button className="mt-2 w-full rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:border-accent cursor-pointer">
                  Contact seller
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default GigDetail;
