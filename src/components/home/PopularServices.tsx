import { gigService } from "@/services/gig.service";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import UserAvatar from "../common/UserAvatar";
import Image from "next/image";

const PopularServices = async () => {
  const response = await gigService.getTopGigs();
  const topGigs = response.content || [];
  if (!topGigs || topGigs.length === 0) return null;
  return (
    <section className="wrapper pb-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">Most popular services</h2>
        <Link href="/gigs" className="text-sm font-medium text-accent hover:underline">
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topGigs.map((g) => (
          <Link
            key={g.id}
            href={`/gigs/${g.id}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="aspect-video overflow-hidden bg-muted relative">
              <Image
                src={g.hinhAnh}
                alt={g.tenCongViec || "Popular service thumbnail"}
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <UserAvatar src={g.user?.avatar} name={g.user?.name} size={24} />
                <span className="text-xs font-medium truncate max-w-35">{g.user?.name || `User #${g.nguoiTao}`}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-foreground group-hover:text-accent">{g.tenCongViec}</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className="text-accent">
                  <FaStar />
                </span>
                <span className="font-semibold">{g.saoCongViec}</span>
                <span className="text-muted-foreground">({g.danhGia})</span>
              </div>
              <div className="mt-3 border-t border-border/60 pt-3 text-right">
                <span className="text-xs text-muted-foreground">from </span>
                <span className="text-sm font-bold">${g.giaTien}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularServices;
