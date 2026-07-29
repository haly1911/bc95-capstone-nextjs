import { ApiUser } from "./user";

export type AuthMode = "signin" | "signup";

export interface ApiSignInResponse {
  statusCode: number;
  content: {
    user: ApiUser;
    token: string;
  };
  dateTime: string;
}

export interface ApiSignInPayload {
  email: string;
  password: string;
}

export interface ApiSignUpResponse {
  statusCode: number;
  content: ApiUser;
  dateTime: string;
}

export interface ApiSignUpPayload {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}
