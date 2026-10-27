import axiosInstance from "./axios";
import type { UserSearchParams } from "../types/users";

const SERVER_URL = "http://localhost:8000/admin/member";

// 회원 목록
export const getMemberLists = async (data: UserSearchParams) => {
  const response = await axiosInstance.get(`${SERVER_URL}`, { params: data });
  return response.data;
};

// 회원 공개여부 변경
export const patchMemberAllows = async (key: string, user_id: number) => {
  const response = await axiosInstance.patch(`${SERVER_URL}/${user_id}/${key}`);
  return response.data;
};
