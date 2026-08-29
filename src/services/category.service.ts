import { axiosClient } from "@/lib/axiosClient";
import { ApiCategory, ApiSubcategory } from "@/types/category";
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
      const categories: ApiCategory[] = categoryRes.data.content || [];
      const subcategories: ApiSubcategory[] = detailRes.data.content || [];
      const categoriesWithGroups = categories.map((cat) => ({
        ...cat,
        dsNhomChiTietLoai: subcategories.filter((sub) => sub.maLoaiCongviec === cat.id),
      }));
      return {
        categories: categoriesWithGroups,
        subcategories: subcategories,
      };
    } catch (error) {
      console.error("Failed to fetch subcategorys:", error);
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
      const allGigs = gigRes.content || [];

      const currentCategory = categories.find((c: any) => createSlug(c.tenLoaiCongViec) === slug);
      if (!currentCategory) return null;
      const categoryGroups = currentCategory.dsNhomChiTietLoai || [];
      const subDetailIds = categoryGroups.flatMap((group: any) => group.dsChiTietLoai?.map((sub: any) => sub.id) || []);
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
  createCategory: async (categoryData: Partial<ApiCategory>): Promise<BaseApiResponse<ApiCategory>> => {
    try {
      const { data } = await axiosClient.post("/loai-cong-viec", categoryData, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to create category", error);
      throw error;
    }
  },
  createSubcategory: async (subcategoryData: {
    tenChiTiet: string;
    maLoaiCongViec: number;
    danhSachChiTiet: number[];
  }): Promise<BaseApiResponse<ApiSubcategory>> => {
    try {
      const { data } = await axiosClient.post("/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai", subcategoryData, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to create subcategory", error);
      throw error;
    }
  },
  updateCategory: async (
    categoryId: number,
    categoryData: Partial<ApiCategory>,
  ): Promise<BaseApiResponse<ApiCategory>> => {
    try {
      const { data } = await axiosClient.put(`/loai-cong-viec/${categoryId}`, categoryData, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to update category", error);
      throw error;
    }
  },
  updateSubcategory: async (
    subcategoryId: number,
    subcategoryData: Partial<ApiSubcategory>,
  ): Promise<BaseApiResponse<ApiSubcategory>> => {
    try {
      const { data } = await axiosClient.put(
        `/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${subcategoryId}`,
        subcategoryData,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        },
      );
      return data;
    } catch (error) {
      console.error("Failed to update subcategory", error);
      throw error;
    }
  },
  uploadSubcategoryImage: async (subcategoryId: number, file: File): Promise<BaseApiResponse<any>> => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const { data } = await axiosClient.post(
        `/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${subcategoryId}`,
        formData,
      );
      return data;
    } catch (error) {
      console.error("Failed to upload subcategory image", error);
      throw error;
    }
  },
  deleteCategory: async (categoryId: number): Promise<BaseApiResponse<ApiCategory>> => {
    try {
      const { data } = await axiosClient.delete(`/loai-cong-viec/${categoryId}`);
      return data;
    } catch (error) {
      console.error("Failed to delete category", error);
      throw error;
    }
  },
  deleteSubcategory: async (subcategoryId: number): Promise<BaseApiResponse<ApiSubcategory>> => {
    try {
      const { data } = await axiosClient.delete(`/chi-tiet-loai-cong-viec/${subcategoryId}`);
      return data;
    } catch (error) {
      console.error("Failed to delete category", error);
      throw error;
    }
  },
};
