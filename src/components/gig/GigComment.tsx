"use client";

import { ApiComment } from "@/types/comment";
import React, { useMemo, useRef, useState } from "react";
import Pagination from "../common/Pagination";
import { formatDate, parseDateToTimestamp } from "@/utils/date";
import { usePagination } from "@/hooks/usePagination";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { commentService } from "@/services/comment.service";
import UserAvatar from "../common/UserAvatar";

interface GigCommentProps {
  gigComments: ApiComment[];
  gigId: number;
  gigCreatorId: number;
}

const GigComment = ({ gigComments, gigId, gigCreatorId }: GigCommentProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>("latest");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
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

  const isOwner = user && user.id === gigCreatorId;

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast("Please sign in to leave a review");
      router.push("/auth");
      return;
    }
    if (isOwner) {
      toast.error("You cannot review your own gig!");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Please enter your review content");
      return;
    }
    try {
      setSubmitting(true);
      await commentService.createComment({
        maCongViec: gigId,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: new Date().toISOString(),
        noiDung: commentText.trim(),
        saoBinhLuan: rating,
      });
      toast.success("Review posted successfully");
      setCommentText("");
      setRating(5);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to post review!");
    } finally {
      setSubmitting(false);
    }
  };

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
      <form onSubmit={handleSubmitComment} className="mt-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <UserAvatar src={user?.avatar} name={user?.name} size={36} />
          <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isAuthenticated ? "Write a review about this gig..." : "Please sign in to write a review..."
                }
                className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-3 lg:border-t-0 lg:pt-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground mr-1">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`text-lg transition-colors cursor-pointer ${
                      (hoverRating || rating) >= star ? "text-accent" : "text-muted-foreground/30"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-1 text-xs font-semibold text-accent">{rating}.0</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-accent px-5 py-2 text-xs font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {submitting ? "Posting..." : "Post Review"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 space-y-4">
        {currentComments.map((c) => (
          <div key={c.id}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <UserAvatar src={c.avatar} name={c.tenNguoiBinhLuan} size={36} />
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
