import type { UserResponse } from "./user";

export type CommentResponse = {
  comment_id: number;
  body: string;
  user_id: number;
  user?: UserResponse;
  content_id: number;
  created_at: string;
};

export type CommentCreate = {
  body: string;
  user_id: number;
  content_id: number;
};

export type CommentUpdate = {
  body: string;
};
