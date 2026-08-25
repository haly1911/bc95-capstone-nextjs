import { axiosClient } from "@/lib/axiosClient";
import { ApiCategory, ApiCategoryDetailGroup } from "@/types/category";
import { BaseApiResponse } from "@/types/common";
import { gigService } from "./gig.service";
import { createSlug } from "@/utils/slugify";

export const categoryService = {
  getCategories: async (): Promise<BaseApiResponse<ApiCategory[]>> => {
    try {
      const { data } = await axiosClient.get("/loai-cong-viec");
      return data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getCategoryWithDetailGroups: async () => {
    try {
      const [categoryRes, detailRes] = await Promise.all([
        axiosClient.get("/loai-cong-viec"),
        axiosClient.get("/chi-tiet-loai-cong-viec"),
      ]);
      return {
        categories: categoryRes.data.content || [],
        subcategories: detailRes.data.content || [],
      };
    } catch (error) {
      console.error("Failed to fetch category detail groups:", error);
      return { categories: [], subcategories: [] };
    }
  },
  getCategoryDetails: async (slug: string) => {
    try {
      const [categoryData, gigRes] = await Promise.all([
        categoryService.getCategoryWithDetailGroups(),
        gigService.getGigList(),
      ]);
      const categories = categoryData.categories;
      const allDetails = categoryData.subcategories;
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
    } catch (error) {
      console.error("Failed to fetch category details for slug:", slug, error);
      return null;
    }
  },
};
