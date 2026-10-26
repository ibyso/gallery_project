import { useCallback, useEffect, useState } from "react";
import type { FestivalPageRespoonse, FestivalSearchParams } from "../types/festivals";
import { useSearchParams } from "react-router-dom";
import { getFestivalLists } from "../apis/festivals";

export const initialPage: FestivalPageRespoonse = {
  items: [],
  total: 0,
  page: 1,
  size: 10,
  total_pages: 0,
};

const parseSearchParams = (params: URLSearchParams): FestivalSearchParams => {
  const criteria = params.get("criteria");
  const keyword = params.get("keyword")?.trim();
  const is_delete = params.get("is_delete");
  const is_public = params.get("is_public");

  const start_date = params.get("start_date");
  const end_date = params.get("end_date");

  const page = Number(params.get("page"));
  const size = Number(params.get("size"));

  return {
    ...(keyword && {
      criteria: criteria === "title" ? ("title" as const) : criteria === "addr" ? ("addr" as const) : ("" as const),
      keyword,
    }),

    // ...(is_delete !== "" && is_delete !== undefined && { is_delete: is_delete === "true" }),
    // ...(is_public !== "" && is_public !== undefined && { is_public: is_public === "true" }),
    ...(is_delete && { is_delete }),
    ...(is_public && { is_public }),

    ...(start_date && { start_date }),
    ...(end_date && { end_date }),

    // 페이지네이션 기본값
    page: Number.isInteger(page) && page > 0 ? page : 1,
    size: Number.isInteger(size) && size > 0 ? size : 10,
  };
};

const useFestivals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<FestivalPageRespoonse>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // 서버로 데이터 요청
      const params = parseSearchParams(searchParams);
      const serverData = await getFestivalLists(params);
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

export default useFestivals;
