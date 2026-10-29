import { useEffect, useState } from "react";
import { getFestivals } from "../apis/festivalApi";
import type { Post } from "../types/post";

export type FestivalPost = Post;

export function useFestivals() {
  const [posts, setPosts] = useState<FestivalPost[]>([]);
  const [festivalStatus, setFestivalStatus] = useState<boolean>(true);

  // 한국 날짜 기준으로 진행 중인 축제만 최근 시작한 순서로 표시
  useEffect(() => {
    let ignore = false;

    const loadFestivals = async () => {
      try {
        const festivals = await getFestivals();

        if (ignore) return;

        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).formatToParts(new Date());

        const year = parts.find((part) => part.type === "year")!.value;
        const month = parts.find((part) => part.type === "month")!.value;
        const day = parts.find((part) => part.type === "day")!.value;
        const today = `${year}${month}${day}`;

        if (festivalStatus == true) {
          const ongoingFestivals = festivals
            .filter((festival) => {
              const { startdate, enddate } = festival;

              if (!startdate || !enddate || !/^\d{8}$/.test(startdate) || !/^\d{8}$/.test(enddate)) {
                return false;
              }

              return startdate <= today && today <= enddate;
            })
            .sort((a, b) => b.startdate!.localeCompare(a.startdate!) || a.id - b.id);

          const serverPosts: Post[] = ongoingFestivals.map((festival) => ({
            id: festival.id,
            title: festival.title,
            addr1: festival.addr1,
            image: festival.thumbnail!,
            startdate: festival.startdate,
            enddate: festival.enddate,
            program: festival.program,
            views: festival.views,
            comments: [],
          }));

          setPosts(serverPosts);
        }

        if (festivalStatus == false) {
          const pastFestivals = festivals
            .filter((festival) => {
              const { startdate, enddate } = festival;

              if (!startdate || !enddate || !/^\d{8}$/.test(startdate) || !/^\d{8}$/.test(enddate)) {
                return false;
              }

              return enddate < today;
            })
            .sort((a, b) => b.enddate!.localeCompare(a.enddate!) || a.id - b.id);

          const serverPosts_paste: Post[] = pastFestivals.map((festival) => ({
            id: festival.id,
            title: festival.title,
            addr1: festival.addr1,
            image: festival.thumbnail!,
            startdate: festival.startdate,
            enddate: festival.enddate,
            program: festival.program,
            views: festival.views,
            comments: [],
          }));

          setPosts(serverPosts_paste);
        }
      } catch (error) {
        if (!ignore) {
          console.error("축제 목록 조회 실패:", error);
        }
      }
    };

    void loadFestivals();

    return () => {
      ignore = true;
    };
  }, [festivalStatus]);

  return { posts, setPosts, festivalStatus, setFestivalStatus };
}
