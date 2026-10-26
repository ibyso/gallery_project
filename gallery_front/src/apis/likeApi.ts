import type { LikeResponse } from "../types/like";
import axiosInstance from "./axios";

// 내 좋아요 목록 조회
export const getMyLikes = async () => {
  const response = await axiosInstance.get<LikeResponse[]>("/likes/me");
  return response.data;
};

// 좋아요 등록: 축제 ID 사용
export const postLike = async (festivalId: number) => {
  const response = await axiosInstance.post(`/likes/${festivalId}`);
  return response.data;
};

// 좋아요 취소: 좋아요 ID 사용
export const deleteLike = async (likeId: number) => {
  const response = await axiosInstance.delete(`/likes/${likeId}`);
  return response.data;
};