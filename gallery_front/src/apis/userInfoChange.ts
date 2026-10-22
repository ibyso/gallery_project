import type { UserUpdateRequest, UserUpdateResponse } from "../types/user";
import axios from "axios";
import axiosInstance from "./axios";

export const updateUser = async (data: UserUpdateRequest): Promise<UserUpdateResponse> => {
  try {
    const response = await axiosInstance.patch<UserUpdateResponse>("/users/me", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail;

      throw new Error(
        typeof detail === "string"
          ? detail
          : `회원정보 변경 요청 실패 (${error.response?.status ?? "알 수 없음"})`,
      );
    }

    throw error;
  }
};
