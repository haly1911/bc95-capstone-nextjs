import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiOrder, ApiOrderHistory, ApiOrderWithDetails } from "@/types/order";
import { attachDetailsToOrder } from "@/utils/attachDetailsToOrder";

export const orderService = {
  getOrderHistory: async (token: string): Promise<BaseApiResponse<ApiOrderHistory[]>> => {
    try {
      const { data } = await axiosClient.get("/thue-cong-viec/lay-danh-sach-da-thue", {
        headers: {
          token: token,
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch order history:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getSellerOrders: async (sellerId: number): Promise<BaseApiResponse<ApiOrderWithDetails[]>> => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch seller orders:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  orderGig: async (payload: Partial<ApiOrder>): Promise<BaseApiResponse<ApiOrder>> => {
    try {
      const { data } = await axiosClient.post("/thue-cong-viec", payload);
      return data;
    } catch (error) {
      console.error("Failed to order gig:", error);
      throw error;
    }
  },
  completeOrder: async (orderId: number): Promise<BaseApiResponse<ApiOrder>> => {
    try {
      const { data } = await axiosClient.post(`/thue-cong-viec/hoan-thanh-cong-viec/${orderId}`);
      return data;
    } catch (error) {
      console.error("Failed to complete order:", error);
      throw error;
    }
  },
};
