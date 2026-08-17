"use client";

import { ApiComment } from "@/types/comment";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Pagination from "../common/Pagination";
import { formatDate, parseDateToTimestamp } from "@/utils/date";
import { usePagination } from "@/hooks/usePagination";

interface GigCommentProps {
  gigComments: ApiComment[];
}

const GigComment = ({ gigComments }: GigCommentProps) => {
  const [sortBy, setSortBy] = useState<string>("latest");
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const sortedComments = useMemo(() => {
    let list = [...gigComments];
    if (sortBy === "rating-low") {
      list.sort((a, b) => a.saoBinhLuan - b.saoBinhLuan);
    } else if (sortBy === "rating-high") {
      list.sort((a, b) => b.saoBinhLuan - a.saoBinhLuan);
    } else if (sortBy === "latest") {
      list.sort((a, b) => parseDateToTimestamp(b.ngayBinhLuan) - parseDateToTimestamp(a.ngayBinhLuan));
    }
    return list;
  }, [gigComments, sortBy]);

  const {
    currentPage,
    currentData: currentComments,
    totalPages,
    handlePageChange,
    resetPage,
  } = usePagination({ data: sortedComments, itemsPerPage: 5, scrollToRef: commentSectionRef });
  return (
    <div ref={commentSectionRef} className="scroll-mt-10 pb-20">
      <div className=" flex items-center justify-between">
        <h2 className="mt-10 text-lg font-bold">Reviews · {sortedComments.length}</h2>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            resetPage();
          }}
          className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium hover:border-accent focus:outline-none cursor-pointer"
        >
          <option value="latest">Latest ⏳</option>
          <option value="rating-high">Highest Rated ⭐</option>
          <option value="rating-low">Lowest Rated ⭐</option>
        </select>
      </div>
      <div className="mt-4 space-y-4">
        {currentComments.map((c) => (
          <div key={c.id}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                {!!c.avatar ? (
                  <Image
                    loading="eager"
                    src={c.avatar}
                    alt="user-avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-linear-to-br from-primary to-accent" />
                )}
                <div>
                  <p className="text-sm font-semibold">{c.tenNguoiBinhLuan}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(c.ngayBinhLuan)}</p>
                </div>
                <span className="ml-auto text-accent">{"★".repeat(c.saoBinhLuan)}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.noiDung}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default GigComment;
