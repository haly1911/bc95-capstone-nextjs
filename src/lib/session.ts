"use client";

import { ApiSignInResponse } from "@/types/auth";
import { ApiUser } from "@/types/user";

export const setSession = (session: ApiSignInResponse) => {
  localStorage.setItem("user", JSON.stringify(session));
  document.cookie = `token=${session.content.token}; path=/; max-age=604800`;
  document.cookie = `userId=${session.content.user.id}; path=/; max-age=604800`;
};

export const clearSession = (): void => {
  localStorage.removeItem("user");
  document.cookie = `token=; path=/; max-age=0`;
};

export const getSession = (): ApiSignInResponse | null => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("user");
  if (!session) return null;
  return JSON.parse(session);
};

export const updateSession = (user: ApiUser): ApiSignInResponse | null => {
  const session = getSession();
  if (!session) return null;
  const updated: ApiSignInResponse = {
    ...session,
    content: {
      ...session.content,
      user,
    },
  };
  setSession(updated);
  return updated;
};
