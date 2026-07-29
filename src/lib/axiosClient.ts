import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    tokenCybersoft: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT || "",
  },
});
