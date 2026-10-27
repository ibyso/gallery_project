import { useCallback, useEffect, useState } from "react";
import type { CommentPageRespoonse, CommentSearchParams } from "../types/comments";
import { useSearchParams } from "react-router-dom";
import { getCommentLists } from "../apis/commentApi";
import { isCommentSearchCategory } from "../constants/comment";

export const initialPage: CommentPageRespoonse = {
  items: [],
  total: 0,
  page: 1,
  size: 10,
  total_pages: 0,
};

const parseSearchParams = (params: URLSearchParams): CommentSearchParams => {
  const criteria = params.get("criteria");
  const keyword = params.get("keyword")?.trim();

  const start_date = params.get("start_date");
  const end_date = params.get("end_date");

  const page = Number(params.get("page"));
  const size = Number(params.get("size"));

  return {
    ...(keyword && {
      criteria: criteria && isCommentSearchCategory(criteria) ? criteria : "",
      keyword,
    }),

    ...(start_date && { start_date }),
    ...(end_date && { end_date }),

    // 페이지네이션 기본값
    page: Number.isInteger(page) && page > 0 ? page : 1,
    size: Number.isInteger(size) && size > 0 ? size : 10,
  };
};

const useComment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<CommentPageRespoonse>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // 서버로 데이터 요청
      const params = parseSearchParams(searchParams);
      const serverData = await getCommentLists(params);
      setData(serverData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return { data, loading, searchParams, setSearchParams, fetchData };
};

export default useComment;
