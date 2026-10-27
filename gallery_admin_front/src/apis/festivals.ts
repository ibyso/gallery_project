import axiosInstance from "./axios";
import type { FestivalSearchParams } from "../types/festivals";

const SERVER_URL = "http://localhost:8000/admin/festivals";

// 게시글 목록
export const getFestivalLists = async (data: FestivalSearchParams) => {
  const response = await axiosInstance.get(`${SERVER_URL}/`, { params: data });
  return response.data;
};

// 게시글 공개여부 변경
export const patchFestivalPublic = async (key: string, id: number) => {
  const response = await axiosInstance.patch(`${SERVER_URL}/${id}/${key}`);
  return response.data;
};
