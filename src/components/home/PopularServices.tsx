import { gigService } from "@/services/gig.service";
import Link from "next/link";
import GigCard from "../gig/GigCard";

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
          <GigCard key={g.id} gig={g} />
        ))}
      </div>
    </section>
  );
};

export default PopularServices;
