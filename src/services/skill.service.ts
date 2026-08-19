import { axiosClient } from "@/lib/axiosClient";
import { BaseApiResponse } from "@/types/common";
import { ApiSkill } from "@/types/skill";

export const skillService = {
  getSkillList: async (): Promise<BaseApiResponse<ApiSkill[]>> => {
    const { data } = await axiosClient.get("/skill");
    return data;
  },
};
