import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiUser } from "@/types/user";

export const userService = {
  getUserList: async (): Promise<BaseApiResponse<ApiUser[]>> => {
    try {
      const { data } = await axiosClient.get("/users");
      return data;
    } catch (error) {
      console.error("Failed to fetch user list:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
  getUserDetail: async (userId: number): Promise<BaseApiResponse<ApiUser>> => {
    try {
      const { data } = await axiosClient.get(`/users/${userId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch user detail:", userId, error);
      throw error;
    }
  },
  updateUser: async (userId: number, userData: Partial<ApiUser>): Promise<BaseApiResponse<ApiUser>> => {
    try {
      const { data } = await axiosClient.put(`/users/${userId}`, userData);
      return data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  },
  uploadAvatar: async (file: File): Promise<BaseApiResponse<{ avatar: string }>> => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const { data } = await axiosClient.post("/users/upload-avatar", formData);
      return data;
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      throw error;
    }
  },
};
