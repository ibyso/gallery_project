import type { CommentResponse } from "./festivalComment";
import type { UserResponse } from "./user";

export interface Post {
  id: number;
  title: string;
  image: string;
  comments: string[];
}

export type FestivalResponse = {
  id: number;
  title: string;
  contents: string;
  user_id: number;
  created_at: string;
  user: UserResponse;
  comments: CommentResponse[];
};
