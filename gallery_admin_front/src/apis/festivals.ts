import axiosInstance from "./axios";
import type { FestivalSearchParams } from "../types/festivals";

const SERVER_URL = "http://localhost:8000/admin/festivals";

// 관리자 목록
export const getFestivalLists = async (data: FestivalSearchParams) => {
  const response = await axiosInstance.get(`${SERVER_URL}/`, { params: data });
  console.log("getFestivalLists :", response.data);
  return response.data;
};

// 관리자 권한 변경
export const patchFestivalPublic = async (key: string, id: number) => {
  const response = await axiosInstance.patch(`${SERVER_URL}/${id}/${key}`);
  return response.data;
};
