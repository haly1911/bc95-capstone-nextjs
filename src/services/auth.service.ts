import { axiosClient } from "@/lib/axiosClient";
import { ApiSignInPayload, ApiSignInResponse, ApiSignUpPayload, ApiSignUpResponse } from "@/types/auth";

export const authService = {
  signIn: async (payload: ApiSignInPayload): Promise<ApiSignInResponse> => {
    try {
      const { data } = await axiosClient.post("/auth/signin", payload, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw error;
    }
  },

  signUp: async (payload: ApiSignUpPayload): Promise<ApiSignUpResponse> => {
    try {
      const { data } = await axiosClient.post("/auth/signup", payload, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to sign up:", error);
      throw error;
    }
  },
};
