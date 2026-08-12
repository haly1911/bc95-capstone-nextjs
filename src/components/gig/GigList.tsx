"use client";

import { ApiGigWithUser } from "@/types/gig";
import { useMemo, useState } from "react";
import GigCard from "./GigCard";
import Pagination from "../common/Pagination";
import Link from "next/link";

interface GigListProps {
  gigList: ApiGigWithUser[];
  searchKeyword?: string;
}

const GigList = ({ gigList, searchKeyword }: GigListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const ITEMS_PER_PAGE = 12;

  const sortedGigs = useMemo(() => {
    let list = [...gigList];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.giaTien - b.giaTien);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.giaTien - a.giaTien);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.saoCongViec - a.saoCongViec);
    }
    return list;
  }, [gigList, sortBy]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGigs = sortedGigs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedGigs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span> / </span>
        <Link href="/gigs" className="hover:text-accent">
          Explore
        </Link>
        {searchKeyword && (
          <>
            <span> / </span>
            <span className="text-foreground font-medium">Search: "{searchKeyword}"</span>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {searchKeyword ? `Results for "${searchKeyword}"` : "All gigs"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{sortedGigs.length} gigs available</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium hover:border-accent focus:outline-none cursor-pointer"
        >
          <option value="recommended">Sort: Recommended</option>
          <option value="rating">Highest Rated ⭐</option>
          <option value="price-low">Price: Low to High💲</option>
          <option value="price-high">Price: High to Low💲</option>
        </select>
      </div>
      {sortedGigs.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          No gigs found matching the keyword "{searchKeyword}".
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default GigList;
