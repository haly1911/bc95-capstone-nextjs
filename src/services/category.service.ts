import { axiosClient } from "@/lib/axiosClient";
import { ApiCategory } from "@/types/category";
import { BaseApiResponse } from "@/types/common";

export const categoryService = {
  getCategories: async (): Promise<BaseApiResponse<ApiCategory[]>> => {
    const { data } = await axiosClient.get("/loai-cong-viec");
    return data;
  },
};
