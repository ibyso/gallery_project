import type { FestivalRespoonse } from "./festivals";
import type { UserRespoonse } from "./users";

export type CommentSearchCategory = "name" | "body" | "user_id" | "festival_id" | "";

export type CommentSearchFilters = {
  criteria?: CommentSearchCategory;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  //   is_delete?: string;
};

export type CommentSearchParams = CommentSearchFilters & { page?: number; size?: number };

export type CommentResponse = {
  comment_id: number;
  body: string;
  user_id: number;
  user: UserRespoonse;
  festivals: FestivalRespoonse;
  content_id: number;
  created_at: string;
  updated_at: string;
  is_delete: string;
};

export type CommentPageRespoonse = {
  items: CommentResponse[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  criteria?: string;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  is_delete?: boolean;
};
