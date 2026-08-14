import { axiosClient } from "@/lib/axiosClient";
import { ApiCategory, ApiCategoryDetailGroup } from "@/types/category";
import { BaseApiResponse } from "@/types/common";
import { gigService } from "./gig.service";
import { createSlug } from "@/utils/slugify";

export const categoryService = {
  getCategories: async (): Promise<BaseApiResponse<ApiCategory[]>> => {
    const { data } = await axiosClient.get("/loai-cong-viec");
    return data;
  },
  getCategoryDetails: async (slug: string) => {
    const [categoryRes, detailRes, gigRes] = await Promise.all([
      axiosClient.get("/loai-cong-viec"),
      axiosClient.get("/chi-tiet-loai-cong-viec"),
      gigService.getGigList(),
    ]);
    const categories = categoryRes.data.content || [];
    const allDetails = detailRes.data.content || [];
    const allGigs = gigRes.content || [];

    const currentCategory = categories.find((c: any) => createSlug(c.tenLoaiCongViec) === slug);
    if (!currentCategory) return null;
    const categoryGroups = allDetails.filter((group: any) => group.maLoaiCongviec === currentCategory.id);
    const subDetailIds = categoryGroups.flatMap((group: any) => group.dsChiTietLoai?.map((sub: any) => sub.id));
    const categoryGigs = allGigs.filter((gig: any) => {
      return gig.maChiTietLoaiCongViec === currentCategory.id || subDetailIds.includes(gig.maChiTietLoaiCongViec);
    });
    return {
      currentCategory,
      categoryGroups,
      gigs: categoryGigs,
    };
  },
};
