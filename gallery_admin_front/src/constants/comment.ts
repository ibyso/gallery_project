import type { CommentSearchCategory } from "../types/comments";

const COMMENT_SEARCH_CATEGORIES = [
  "name",
  "body",
  "user_id",
  "festival_id",
  "",
] as const satisfies readonly CommentSearchCategory[];

export const isCommentSearchCategory = (value: string | null): value is CommentSearchCategory => {
  return value !== null && (COMMENT_SEARCH_CATEGORIES as readonly string[]).includes(value);
};
