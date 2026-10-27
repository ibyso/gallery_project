import type { CommentResponse } from "./festivalComment";
import type { UserResponse } from "./user";

export type Post = {
  id: number;
  title: string;
  addr1?: string | null;
  image: string;
  startdate?: string | null;
  enddate?: string | null;
  program?: string | null;
  comments: string[];
};

export type FestivalResponse = {
  id: number;
  title: string;
  contents: string;
  user_id: number;
  created_at: string;
  user: UserResponse;
  comments: CommentResponse[];
};

export type FestivalListItem = {
  id: number;
  title: string;
  addr1: string | null;
  thumbnail: string | null;
  startdate: string | null;
  enddate: string | null;
  program: string | null;
};
