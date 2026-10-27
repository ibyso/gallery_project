import { useEffect, useState } from "react";
import { getFestivals } from "../apis/festivalApi";
import { useFestivalLikes } from "./useFestivalLikes";
import type { FestivalListItem } from "../types/post";

export const useCalendarFestivals = () => {
  const { likedIds, loading: likesLoading, errorMessage } = useFestivalLikes();

  const [festivals, setFestivals] = useState<FestivalListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [festivalError, setFestivalError] = useState("");

  // 전체 축제 목록 가져오기
  useEffect(() => {
    let ignore = false;

    const fetchFestivals = async () => {
      try {
        const data = await getFestivals();

        if (!ignore) {
          setFestivals(data);
        }
      } catch (error) {
        console.error("축제 목록 조회 실패:", error);

        if (!ignore) {
          setFestivalError("축제 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchFestivals();

    return () => {
      ignore = true;
    };
  }, []);

  // 좋아요한 축제만 선택
  const likedFestivals = festivals.filter((festival) => likedIds.includes(festival.id));

  // 시작일과 종료일이 있는 축제만 선택
  const calendarFestivals = likedFestivals.filter(
    (festival) => festival.startdate && festival.enddate,
  );

  return {
    calendarFestivals,
    loading: loading || likesLoading,
    errorMessage: errorMessage || festivalError,
  };
};
