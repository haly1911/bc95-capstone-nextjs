import { axiosClient } from "@/lib/axiosClient";
import { ApiComment } from "@/types/comment";
import { BaseApiResponse } from "@/types/common";
import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { ApiUser } from "@/types/user";
import { attachUserToGig } from "@/utils/attachUserToGig";
import { parseDateToTimestamp } from "@/utils/date";

export const gigService = {
  getGigList: async (): Promise<BaseApiResponse<ApiGigWithUser[]>> => {
    const [gigRes, userRes] = await Promise.all([axiosClient.get("/cong-viec"), axiosClient.get("/users")]);
    const gigsWithUser = attachUserToGig(gigRes.data.content, userRes.data.content);
    return {
      ...gigRes.data,
      content: gigsWithUser,
    };
  },
  getTopGigs: async (): Promise<BaseApiResponse<ApiGigWithUser[]>> => {
    const [gigRes, userRes] = await Promise.all([axiosClient.get("/cong-viec"), axiosClient.get("/users")]);
    const sortedGigs = gigRes.data.content.sort(
      (a: ApiGigWithUser, b: ApiGigWithUser) => b.saoCongViec - a.saoCongViec,
    );
    const topGigs = sortedGigs.slice(0, 8);
    const topGigsWithUser = attachUserToGig(topGigs, userRes.data.content);
    return {
      ...gigRes.data,
      content: topGigsWithUser,
    };
  },
  getGigByCreator: async (userId: number): Promise<BaseApiResponse<ApiGig[]>> => {
    const { data } = await axiosClient.get("/cong-viec");
    const userGigs = data.content.filter((gig: ApiGig) => gig.nguoiTao === userId);
    return {
      ...data,
      content: userGigs,
    };
  },
  getGigDetail: async (gigId: number): Promise<BaseApiResponse<ApiGigWithUser>> => {
    const [gigDetailRes, userRes] = await Promise.all([
      axiosClient.get(`/cong-viec/${gigId}`),
      axiosClient.get("/users"),
    ]);
    const gig: ApiGigWithUser = gigDetailRes.data.content;
    const users: ApiUser[] = userRes.data.content;
    const creator = users.find((user) => user.id === gig.nguoiTao);
    return {
      ...gigDetailRes.data,
      content: {
        ...gig,
        user: creator,
      },
    };
  },
  getGigComment: async (gigId: number): Promise<BaseApiResponse<ApiComment[]>> => {
    const { data } = await axiosClient.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${gigId}`);
    if (Array.isArray(data?.content)) {
      data.content.sort(
        (a: ApiComment, b: ApiComment) => parseDateToTimestamp(b.ngayBinhLuan) - parseDateToTimestamp(a.ngayBinhLuan),
      );
    }
    return data;
  },
};
