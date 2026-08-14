"use client";

import { ApiGigWithUser } from "@/types/gig";
import { useMemo, useState } from "react";
import GigCard from "../gig/GigCard";
import Pagination from "../common/Pagination";

interface CategoryDetailListProps {
  groups: any[];
  gigList: ApiGigWithUser[];
}

const CategoryDetailList = ({ groups, gigList }: CategoryDetailListProps) => {
  const [selectedSubDetail, setSelectedSubDetail] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const ITEMS_PER_PAGE = 12;

  const filteredGigs = useMemo(() => {
    if (selectedSubDetail === "all") return gigList;
    return gigList.filter(
      (gig: any) =>
        gig.tenChiTietLoaiCongViec === selectedSubDetail ||
        gig.moTa?.toLowerCase().includes(selectedSubDetail.toLowerCase()),
    );
  }, [gigList, selectedSubDetail]);

  const sortedGigs = useMemo(() => {
    let list = [...filteredGigs];
    if (sortBy === "price-low") list.sort((a, b) => a.giaTien - b.giaTien);
    else if (sortBy === "price-high") list.sort((a, b) => b.giaTien - a.giaTien);
    else if (sortBy === "rating") list.sort((a, b) => b.saoCongViec - a.saoCongViec);
    return list;
  }, [filteredGigs, sortBy]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGigs = sortedGigs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedGigs.length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
        <button
          onClick={() => {
            setSelectedSubDetail("all");
            setCurrentPage(1);
          }}
          className={`rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer ${
            selectedSubDetail === "all"
              ? "bg-accent text-accent-foreground"
              : "border border-border bg-card hover:border-accent"
          }`}
        >
          All
        </button>
        {groups.map((group) =>
          group.dsChiTietLoai?.map((sub: any) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubDetail(sub.tenChiTiet);
                setCurrentPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer ${
                selectedSubDetail === sub.tenChiTiet
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-card hover:border-accent"
              }`}
            >
              {sub.tenChiTiet}
            </button>
          )),
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{sortedGigs.length} services available</p>
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
          <option value="price-low">Price: Low to High 💲</option>
          <option value="price-high">Price: High to Low 💲</option>
        </select>
      </div>
      {sortedGigs.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">No services found in this category</div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetailList;
