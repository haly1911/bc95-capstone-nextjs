import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiSkill } from "@/types/skill";

export const skillService = {
  getSkillList: async (): Promise<BaseApiResponse<ApiSkill[]>> => {
    try {
      const { data } = await axiosClient.get("/skill");
      return data;
    } catch (error) {
      console.error("Failed to fetch skill list:", error);
      return { statusCode: 500, message: "Error", content: [] };
    }
  },
};
