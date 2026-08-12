import { gigService } from "@/services/gig.service";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const PopularServices = async () => {
  const response = await gigService.getTopGigs();
  const topGigs = response.content || [];
  if (!topGigs || topGigs.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">Most popular services</h2>
        <Link href="/explore" className="text-sm font-medium text-accent hover:underline">
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topGigs.map((g) => (
          <Link
            key={g.id}
            href="/"
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img src={g.hinhAnh} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                {g.user?.avatar ? (
                  <img src={g.user.avatar} alt={g.user.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-linear-to-br from-primary to-accent" />
                )}
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
