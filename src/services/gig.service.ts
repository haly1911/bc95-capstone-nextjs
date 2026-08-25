import { axiosClient } from "@/lib/axiosClient";
import { ApiComment } from "@/types/comment";
import { BaseApiResponse } from "@/types/common";
import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { ApiUser } from "@/types/user";
import { attachUserToGig } from "@/utils/attachUserToGig";
import { parseDateToTimestamp } from "@/utils/date";

export const gigService = {
  getGigList: async (): Promise<BaseApiResponse<ApiGigWithUser[]>> => {
    try {
      const [gigRes, userRes] = await Promise.all([axiosClient.get("/cong-viec"), axiosClient.get("/users")]);
      const gigsWithUser = attachUserToGig(gigRes.data.content, userRes.data.content);
      return {
        ...gigRes.data,
        content: gigsWithUser,
      };
    } catch (error) {
      console.error("Failed to fetch gig list:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getTopGigs: async (): Promise<BaseApiResponse<ApiGigWithUser[]>> => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch top gigs:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getGigByCreator: async (userId: number): Promise<BaseApiResponse<ApiGig[]>> => {
    try {
      const { data } = await axiosClient.get("/cong-viec");
      const userGigs = data.content.filter((gig: ApiGig) => gig.nguoiTao === userId);
      return {
        ...data,
        content: userGigs,
      };
    } catch (error) {
      console.error("Failed to fetch gigs by creator:", userId, error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getGigDetail: async (gigId: number): Promise<BaseApiResponse<ApiGigWithUser>> => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch gig detail:", gigId, error);
      throw error;
    }
  },
  createGig: async (gigData: Partial<ApiGig>): Promise<BaseApiResponse<ApiGig>> => {
    try {
      const { data } = await axiosClient.post("/cong-viec", gigData);
      return data;
    } catch (error) {
      console.error("Failed to create gig:", error);
      throw error;
    }
  },
  updateGig: async (gigId: number, gigData: ApiGig): Promise<BaseApiResponse<ApiGig>> => {
    try {
      const { data } = await axiosClient.put(`/cong-viec/${gigId}`, gigData);
      return data;
    } catch (error) {
      console.error("Failed to update gig:", error);
      throw error;
    }
  },
  deleteGig: async (gigId: number): Promise<BaseApiResponse<ApiGig>> => {
    try {
      const { data } = await axiosClient.delete(`/cong-viec/${gigId}`);
      return data;
    } catch (error) {
      console.error("Failed to delete gig:", error);
      throw error;
    }
  },
  uploadGigImage: async (gigId: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const { data } = await axiosClient.post(`/cong-viec/upload-hinh-cong-viec/${gigId}`, formData);
      return data;
    } catch (error) {
      console.error("Failed to upload gig image:", error);
      throw error;
    }
  },
};
