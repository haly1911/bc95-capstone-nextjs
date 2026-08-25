import { axiosClient } from "@/lib/axiosClient";
import { ApiComment, CommentPayload } from "@/types/comment";
import { BaseApiResponse } from "@/types/common";
import { parseDateToTimestamp } from "@/utils/date";

export const commentService = {
  getCommentsByGig: async (gigId: number): Promise<BaseApiResponse<ApiComment[]>> => {
    const { data } = await axiosClient.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${gigId}`);
    if (Array.isArray(data?.content)) {
      data.content.sort(
        (a: ApiComment, b: ApiComment) => parseDateToTimestamp(b.ngayBinhLuan) - parseDateToTimestamp(a.ngayBinhLuan),
      );
    }
    return data;
  },
  createComment: async (payload: CommentPayload): Promise<BaseApiResponse<ApiComment>> => {
    const { data } = await axiosClient.post("/binh-luan", payload);
    return data;
  },
  deleteComment: async (commentId: number): Promise<BaseApiResponse<ApiComment>> => {
    const { data } = await axiosClient.delete(`/binh-luan/${commentId}`);
    return data;
  },
};
