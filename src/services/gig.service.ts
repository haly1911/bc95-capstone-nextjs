import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiGig, ApiGigWithUser } from "@/types/gig";
import { attachUserToGig } from "@/utils/attachUserToGig";
import { da } from "zod/locales";

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
};
