import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiOrder, ApiOrderHistory, ApiOrderWithDetails } from "@/types/order";
import { attachDetailsToOrder } from "@/utils/attachDetailsToOrder";
import { attachUserToGig } from "@/utils/attachUserToGig";

export const orderService = {
  getAllOrdersWithDetails: async (): Promise<BaseApiResponse<ApiOrderWithDetails[]>> => {
    try {
      const [orderRes, gigRes, userRes] = await Promise.all([
        axiosClient.get("thue-cong-viec"),
        axiosClient.get("/cong-viec"),
        axiosClient.get("/users"),
      ]);
      const allOrders = orderRes.data.content || [];
      const allGigs = gigRes.data.content || [];
      const allUsers = userRes.data.content || [];
      const gigsWithCreatorName = attachUserToGig(allGigs, allUsers);
      const detailedOrders = attachDetailsToOrder(allOrders, gigsWithCreatorName, allUsers);
      return {
        ...orderRes.data,
        content: detailedOrders,
      };
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
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
      const res = await orderService.getAllOrdersWithDetails();

      const sellerOrders = res.content.filter((order: ApiOrderWithDetails) => {
        const creatorId = order.congViec?.nguoiTao;
        return Number(creatorId) === Number(sellerId);
      });
      return {
        ...res,
        content: sellerOrders,
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
  deleteOrder: async (orderId: number): Promise<BaseApiResponse<ApiOrder>> => {
    try {
      const { data } = await axiosClient.delete(`/thue-cong-viec/${orderId}`);
      return data;
    } catch (error) {
      console.error("Failed to delete order:", error);
      throw error;
    }
  },
};
