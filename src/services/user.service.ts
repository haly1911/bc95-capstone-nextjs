import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiUser } from "@/types/user";

export const userService = {
  getUserList: async (): Promise<BaseApiResponse<ApiUser[]>> => {
    const { data } = await axiosClient.get("/users");
    return data;
  },
  getUserDetail: async (userId: number): Promise<BaseApiResponse<ApiUser>> => {
    const { data } = await axiosClient.get(`/users/${userId}`);
    return data;
  },
  updateUser: async (userId: number, userData: Partial<ApiUser>): Promise<BaseApiResponse<ApiUser>> => {
    const { data } = await axiosClient.put(`/users/${userId}`, userData);
    return data;
  },
  uploadAvatar: async (file: File): Promise<BaseApiResponse<{ avatar: string }>> => {
    const formData = new FormData();
    formData.append("formFile", file);
    const { data } = await axiosClient.post("/users/upload-avatar", formData);
    return data;
  },
};
