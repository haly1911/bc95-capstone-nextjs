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
  createGig: async (gigData: Partial<ApiGig>): Promise<BaseApiResponse<ApiGig>> => {
    const { data } = await axiosClient.post("/cong-viec", gigData);
    return data;
  },
  updateGig: async (gigId: number, gigData: ApiGig): Promise<BaseApiResponse<ApiGig>> => {
    const { data } = await axiosClient.put(`/cong-viec/${gigId}`, gigData);
    return data;
  },
  deleteGig: async (gigId: number): Promise<BaseApiResponse<ApiGig>> => {
    const { data } = await axiosClient.delete(`/cong-viec/${gigId}`);
    return data;
  },
  uploadGigImage: async (gigId: number, file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);
    const { data } = await axiosClient.post(`/cong-viec/upload-hinh-cong-viec/${gigId}`, formData);
    return data;
  },
};
