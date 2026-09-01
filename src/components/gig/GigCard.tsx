import { ApiGigWithUser } from "@/types/gig";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import UserAvatar from "../common/UserAvatar";
import Image from "next/image";

interface GigCardProps {
  gig: ApiGigWithUser;
}

const GigCard = ({ gig }: GigCardProps) => {
  return (
    <Link
      key={gig.id}
      href={`/gigs/${gig.id}`}
      className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="aspect-video overflow-hidden bg-muted relative">
        <Image
          src={gig.hinhAnh}
          alt={gig.tenCongViec || "Gig thumbnail"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2">
          <UserAvatar src={gig.user?.avatar} name={gig.user?.name} size={24} />
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
