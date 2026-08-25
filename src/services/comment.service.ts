import { axiosClient } from "@/lib/axiosClient";
import { ApiComment, CommentPayload } from "@/types/comment";
import { BaseApiResponse } from "@/types/common";
import { parseDateToTimestamp } from "@/utils/date";

export const commentService = {
  getCommentsByGig: async (gigId: number): Promise<BaseApiResponse<ApiComment[]>> => {
    try {
      const { data } = await axiosClient.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${gigId}`);
      if (Array.isArray(data?.content)) {
        data.content.sort(
          (a: ApiComment, b: ApiComment) => parseDateToTimestamp(b.ngayBinhLuan) - parseDateToTimestamp(a.ngayBinhLuan),
        );
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch comments for gig:", gigId, error);
      return { statusCode: 500, message: "Error", content: [] };
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
