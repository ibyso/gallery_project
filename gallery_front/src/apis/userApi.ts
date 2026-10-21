import axiosInstance from "./axios";
import type {
  UserLogin,
  UserLoginResponse,
  UserSignupRequest,
  UserSignupResponse,
  UserResponse,
} from "../types/user";

export const signup = async (data: UserSignupRequest): Promise<UserSignupResponse> => {
  const response = await axiosInstance.post<UserSignupResponse>("/users/signup", data);

  return response.data;
};

export const signin = async (data: UserLogin): Promise<UserLoginResponse> => {
  const response = await axiosInstance.post<UserLoginResponse>("/users/signin", data);

  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>("/users/me");
  return response.data;
};
