import { axiosClient } from "@/lib/axiosClient";
import { ApiComment, CommentPayload } from "@/types/comment";
import { BaseApiResponse } from "@/types/common";
import { parseDateToTimestamp } from "@/utils/date";

export const commentService = {
  getCommentsByGig: async (gigId: number): Promise<BaseApiResponse<ApiComment[]>> => {
    try {
      const [gigCommentsRes, allCommentsRes] = await Promise.all([
        axiosClient.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${gigId}`),
        axiosClient.get(`/binh-luan`),
      ]);

      const gigComments = gigCommentsRes.data?.content || [];
      const allComments = allCommentsRes.data?.content || [];

      const commentUserMap = new Map<number, number>();
      if (Array.isArray(allComments)) {
        allComments.forEach((item: any) => {
          commentUserMap.set(item.id, item.maNguoiBinhLuan);
        });
      }
      const mergedComments = gigComments.map((c: any) => ({
        ...c,
        maNguoiBinhLuan: commentUserMap.get(c.id) || 0,
      }));

      if (Array.isArray(mergedComments)) {
        mergedComments.sort(
          (a: ApiComment, b: ApiComment) => parseDateToTimestamp(b.ngayBinhLuan) - parseDateToTimestamp(a.ngayBinhLuan),
        );
      }
      return {
        ...gigCommentsRes.data,
        content: mergedComments,
      };
    } catch (error) {
      console.error("Failed to fetch comments for gig:", gigId, error);
      throw error;
    }
  },
  createComment: async (payload: CommentPayload): Promise<BaseApiResponse<ApiComment>> => {
    try {
      const { data } = await axiosClient.post("/binh-luan", payload);
      return data;
    } catch (error) {
      console.error("Failed to create comment:", error);
      throw error;
    }
  },
  updateComment: async (commentId: number, payload: Partial<CommentPayload>): Promise<BaseApiResponse<ApiComment>> => {
    try {
      const { data } = await axiosClient.put(`/binh-luan/${commentId}`, payload);
      return data;
    } catch (error) {
      console.error("Failed to update comment:", error);
      throw error;
    }
  },
  deleteComment: async (commentId: number): Promise<BaseApiResponse<ApiComment>> => {
    try {
      const { data } = await axiosClient.delete(`/binh-luan/${commentId}`);
      return data;
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error;
    }
  },
};
