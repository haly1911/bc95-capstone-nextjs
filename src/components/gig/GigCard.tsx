import { ApiGigWithUser } from "@/types/gig";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

interface GigCardProps {
  gig: ApiGigWithUser;
}

const GigCard = ({ gig }: GigCardProps) => {
  return (
    <Link
      key={gig.id}
      href={`/gigs/${gig.id}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img src={gig.hinhAnh} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          {gig.user?.avatar ? (
            <img src={gig.user.avatar} alt={gig.user.name} className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <div className="h-6 w-6 rounded-full bg-linear-to-br from-primary to-accent" />
          )}
          <span className="text-xs font-medium truncate max-w-35">{gig.user?.name || `User #${gig.nguoiTao}`}</span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm group-hover:text-accent">{gig.tenCongViec}</p>
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span className="text-accent">
            <FaStar />
          </span>
          <span className="font-semibold">{gig.saoCongViec}</span>
          <span className="text-muted-foreground">({gig.danhGia})</span>
        </div>
        <div className="mt-3 border-t border-border/60 pt-3 text-right">
          <span className="text-xs text-muted-foreground">from </span>
          <span className="text-sm font-bold">${gig.giaTien}</span>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
