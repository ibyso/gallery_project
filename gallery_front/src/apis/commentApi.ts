import axios from "axios";
import type { CommentCreate, CommentResponse, CommentUpdate } from "../types/festivalComment";

const url = "http://127.0.0.1:8000/comments";

export const postComment = async (comment: CommentCreate) => {
  const token = sessionStorage.getItem("access_token");

  const response = await axios.post(url, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getComments = async (contentId: number) => {
  const response = await axios.get<CommentResponse[]>(url, {
    params: { content_id: contentId },
  });

  return response.data;
};

export const putComment = async (comment_id: number, comment: CommentUpdate) => {
  const token = sessionStorage.getItem("access_token");
  const response = await axios.put(`${url}/${comment_id}`, comment,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteComment = async (comment_id: number) => {
  const token = sessionStorage.getItem("access_token");
  const response = await axios.delete(`${url}/${comment_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
