import axios from "axios";
import type {
  CommentCreate,
  CommentResponse,
  CommentUpdate,
} from "../types/festivalComment";

const url = "http://127.0.0.1:8000/comments";

export const postComment = async (comment: CommentCreate) => {
  const response = await axios.post(`${url}`, comment);
  return response.data;
};

export const getComments = async (contentId: number) => {
  const response = await axios.get<CommentResponse[]>(url, {
    params: { content_id: contentId },
  });

  return response.data;
};

export const putComment = async (
  comment_id: number,
  comment: CommentUpdate,
) => {
  const response = await axios.put(`${url}/${comment_id}`, comment);
  return response.data;
};

export const deleteComment = async (comment_id: number) => {
  const response = await axios.delete(`${url}/${comment_id}`);
  return response.data;
};
