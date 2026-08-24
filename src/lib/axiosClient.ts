import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

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
    if ((error.response && error.response.status === 401) || error.response.status === 403) {
      if (typeof window !== "undefined") {
        useAuthStore.getState().signout();
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  },
);
