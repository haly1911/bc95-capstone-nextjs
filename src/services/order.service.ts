import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiOrder } from "@/types/order";

export const orderService = {
  getOrderHistory: async (token: string): Promise<BaseApiResponse<ApiOrder[]>> => {
    const { data } = await axiosClient.get("/thue-cong-viec/lay-danh-sach-da-thue", {
      headers: {
        token: token,
      },
    });
    return data;
  },
};
