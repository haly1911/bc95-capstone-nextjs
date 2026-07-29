import { axiosClient } from "@/lib/axiosClient";
import { ApiSignInPayload, ApiSignInResponse, ApiSignUpPayload, ApiSignUpResponse } from "@/types/auth";

export const authService = {
  signIn: async (payload: ApiSignInPayload): Promise<ApiSignInResponse> => {
    const { data } = await axiosClient.post("/auth/signin", payload, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return data;
  },

  signUp: async (payload: ApiSignUpPayload): Promise<ApiSignUpResponse> => {
    const { data } = await axiosClient.post("/auth/signup", payload, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return data;
  },
};
