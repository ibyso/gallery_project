import { useCallback, useEffect, useState } from "react";
import { getAdminLists } from "../apis/userApi";
import type { UserPageRespoonse, UserSearchParams } from "../types/users";
import { useSearchParams } from "react-router-dom";

export const initialAdminPage: UserPageRespoonse = {
  items: [],
  total: 0,
  page: 1,
  size: 10,
  total_pages: 0,
  //   criteria: "",
  //   keyword: "",
  //   start_date: "",
  //   end_date: "",
  //   isAllow: ""
};

const parseSearchParams = (params: URLSearchParams): UserSearchParams => {
  const criteria = params.get("criteria");
  const keyword = params.get("keyword")?.trim();
  const isAllow = params.get("isAllow");

  const start_date = params.get("start_date");
  const end_date = params.get("end_date");

  const page = Number(params.get("page"));
  const size = Number(params.get("size"));

  return {
    ...(keyword && {
      criteria: criteria === "email" ? ("email" as const) : criteria === "name" ? ("name" as const) : ("" as const),
      keyword,
    }),

    ...((isAllow === "Approved" || isAllow === "Pending" || isAllow === "Rejected") && {
      isAllow: isAllow,
    }),

    ...(start_date && { start_date }),
    ...(end_date && { end_date }),

    // 페이지네이션 기본값
    page: Number.isInteger(page) && page > 0 ? page : 1,
    size: Number.isInteger(size) && size > 0 ? size : 10,
  };
};

// const useAdmins = ({ page, size, criteria, keyword, start_date, end_date, isAllow }: UserSearchParams) => {
const useAdmins = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<UserPageRespoonse>(initialAdminPage);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // 서버로 데이터 요청
      const params = parseSearchParams(searchParams);
      const serverData = await getAdminLists(params);
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

export default useAdmins;
