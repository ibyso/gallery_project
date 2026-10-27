import axiosInstance from "./axios";
import type { CommentSearchParams } from "../types/comments";

const SERVER_URL = "http://localhost:8000/admin/comments";

// 댓글 목록
export const getCommentLists = async (data: CommentSearchParams) => {
  const response = await axiosInstance.get(`${SERVER_URL}`, { params: data });
  return response.data;
};

// 댓글 삭제/취소
export const DeleteComment = async (comment_id: number) => {
  const response = await axiosInstance.patch(`${SERVER_URL}/${comment_id}`);
  return response.data;
};
