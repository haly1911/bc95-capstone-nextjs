import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    tokenCybersoft: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT || "",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.token = token;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        useAuthStore.getState().signout();
        window.location.href = "/auth";
      }
      if (error.response?.status === 403) {
        toast.error(
          error.response?.data?.message || "Access denied: You do not have permission to perform this action",
        );
      }
    }
    return Promise.reject(error);
  },
);
