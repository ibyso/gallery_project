import type { UserRespoonse } from "./users";

export type SearchCategory = "title" | "addr" | "";

export type FestivalSearchFilters = {
  criteria?: SearchCategory;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  is_public?: string;
  is_delete?: string;
};

export type FestivalSearchParams = FestivalSearchFilters & { page?: number; size?: number };

export type CommentResponse = {
  id: number;
  body: string;
  user_id: number;
  user: UserRespoonse;
  content_id: number;
  created_at: string;
  updated_at: string;
};

export type FestivalRespoonse = {
  id: number;
  title: string;
  addr1: string;
  addr2?: string;
  startdate?: string;
  enddate?: string;
  thumbnail?: string;
  tel?: string;
  zipcode?: number;
  homepage: string;
  overview: string;
  playtime: string;
  eventplace?: string;
  posted_at?: string;
  program?: string;
  comments?: CommentResponse[];
  is_public?: boolean;
  is_delete?: boolean;
};

export type FestivalPageRespoonse = {
  items: FestivalRespoonse[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  criteria?: string;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  is_public?: boolean;
  is_delete?: boolean;
};
