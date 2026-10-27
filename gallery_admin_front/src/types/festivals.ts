import type { CommentResponse } from "./comments";

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
