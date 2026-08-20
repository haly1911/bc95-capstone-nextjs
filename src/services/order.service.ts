import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiOrder, ApiOrderWithDetails } from "@/types/order";
import { attachDetailsToOrder } from "@/utils/attachDetailsToOrder";

export const orderService = {
  getOrderHistory: async (token: string): Promise<BaseApiResponse<ApiOrder[]>> => {
    const { data } = await axiosClient.get("/thue-cong-viec/lay-danh-sach-da-thue", {
      headers: {
        token: token,
      },
    });
    return data;
  },
  getSellerOrders: async (sellerId: number): Promise<BaseApiResponse<ApiOrderWithDetails[]>> => {
    const [orderRes, gigRes, userRes] = await Promise.all([
      axiosClient.get("/thue-cong-viec"),
      axiosClient.get("/cong-viec"),
      axiosClient.get("/users"),
    ]);

    const allOrders = orderRes.data.content || [];
    const allGigs = gigRes.data.content || [];
    const allUsers = userRes.data.content || [];

    const myGigs = allGigs.filter((g: any) => Number(g.nguoiTao) === Number(sellerId));
    const myGigIds = myGigs.map((g: any) => g.id);

    const sellerOrders = allOrders.filter((order: any) => myGigIds.includes(order.maCongViec));

    const detailedOrders = attachDetailsToOrder(sellerOrders, allGigs, allUsers);

    return {
      ...orderRes.data,
      content: detailedOrders,
    };
  },
  completeOrder: async (maThueCongViec: number, token: string): Promise<BaseApiResponse<any>> => {
    const { data } = await axiosClient.post(
      `/thue-cong-viec/hoan-thanh-cong-viec/${maThueCongViec}`,
      {},
      {
        headers: {
          token: token,
        },
      },
    );
    return data;
  },
};
