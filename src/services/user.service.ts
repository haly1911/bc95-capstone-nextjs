import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiUser } from "@/types/user";
import axios from "axios";

export const userService = {
  getUserList: async (): Promise<BaseApiResponse<ApiUser[]>> => {
    const { data } = await axiosClient.get("/users");
    return data;
  },
  getUserDetail: async (userId: number): Promise<BaseApiResponse<ApiUser>> => {
    const { data } = await axiosClient.get(`/users/${userId}`);
    return data;
  },
};
