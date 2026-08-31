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
import { FaPencil, FaTrash } from "react-icons/fa6";
import ConfirmModal from "../modals/ConfirmModal";
import { MAX_COMMENT_LENGTH } from "@/utils/constants";

interface GigCommentProps {
  gigComments: ApiComment[];
  gigId: number;
  gigCreatorId: number;
  userId: number;
}

const GigComment = ({ gigComments, gigId, gigCreatorId, userId }: GigCommentProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
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

  const isOwner = userId === gigCreatorId;
  const isAdmin = user?.role === "ADMIN";

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !userId) {
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
        maNguoiBinhLuan: userId,
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

  const confirmDeleteComment = (e: React.MouseEvent, commentId: number) => {
    e.stopPropagation();
    setSelectedCommentId(commentId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteComment = async () => {
    if (!selectedCommentId) return;
    try {
      await commentService.deleteComment(selectedCommentId);
      toast.success("Review deleted successfully");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to delete review:", error);
      toast.error(error?.response?.data?.message || "Failed to delete review!");
    }
  };

  const handleStartEdit = (c: ApiComment) => {
    setEditingId(c.id);
    setEditText(c.noiDung);
    setEditRating(c.saoBinhLuan);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editText.trim()) {
      toast.error("Review content cannot be empty");
      return;
    }
    try {
      await commentService.updateComment(commentId, {
        maCongViec: gigId,
        maNguoiBinhLuan: userId,
        ngayBinhLuan: new Date().toISOString(),
        noiDung: editText.trim(),
        saoBinhLuan: editRating,
      });
      toast.success("Review updated successfully");
      setEditingId(null);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update review!");
    }
  };

  return (
    <div ref={commentSectionRef} className="scroll-mt-10 pb-20">
      <div className=" flex items-end justify-between">
        <h2 className="mt-10 text-lg font-bold">Reviews · {sortedComments.length}</h2>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            resetPage();
          }}
          className="filter-btn"
        >
          <option value="latest">Latest ⏳</option>
          <option value="rating-high">Highest Rated ⭐</option>
          <option value="rating-low">Lowest Rated ⭐</option>
        </select>
      </div>
      <form onSubmit={handleSubmitComment} className="mt-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <UserAvatar src={user?.avatar} name={user?.name} size={36} />
          <div className="flex flex-1 min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex-1 min-w-0 relative">
              <input
                type="text"
                maxLength={MAX_COMMENT_LENGTH}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isAuthenticated ? "Write a review about this gig..." : "Please sign in to write a review..."
                }
                className="w-full rounded-full border border-border bg-background px-4 py-2 pr-14 text-sm focus:border-accent focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none">
                {commentText.length}/{MAX_COMMENT_LENGTH}
              </span>
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
                className="rounded-full bg-accent px-2 py-1 sm:px-5 sm:py-2 text-xs font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {submitting ? "Posting..." : "Post Review"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 space-y-4">
        {currentComments.map((c) => {
          const canEdit = isAdmin && userId === c.maNguoiBinhLuan;
          const canDelete = isAdmin;
          const isEditing = editingId === c.id;

          return (
            <div key={c.id} className="relative rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <UserAvatar src={c.avatar} name={c.tenNguoiBinhLuan} size={36} />
                <div>
                  <p className="text-sm font-semibold">{c.tenNguoiBinhLuan}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(c.ngayBinhLuan)}</p>
                </div>
                {!isEditing && <span className="ml-auto text-accent">{"★".repeat(c.saoBinhLuan)}</span>}
              </div>

              {isEditing ? (
                <div className="mt-3 space-y-3">
                  <div className="relative">
                    <textarea
                      maxLength={MAX_COMMENT_LENGTH}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 pb-6 text-sm focus:border-accent focus:outline-none"
                      rows={3}
                    />
                    <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground pointer-events-none">
                      {editText.length}/{MAX_COMMENT_LENGTH}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={`text-base cursor-pointer ${editRating >= star ? "text-accent" : "text-muted-foreground/30"}`}
                          onClick={() => setEditRating(star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-full px-3 py-1 text-xs border border-border cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateComment(c.id)}
                        className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-3 pb-6 text-sm text-muted-foreground">{c.noiDung}</p>
                  {(canEdit || canDelete) && (
                    <div className="absolute bottom-4 right-5 flex items-center gap-2">
                      {canEdit && (
                        <button
                          onClick={() => handleStartEdit(c)}
                          className="admin-edit-icon"
                          title="Edit review"
                        >
                          <FaPencil className="w-4 h-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={(e) => confirmDeleteComment(e, c.id)}
                          className="admin-trash-icon"
                          title="Delete review"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteComment}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GigComment;
