import { useEffect, useState } from "react";
import { getFestivals } from "../apis/festivalApi";
import type { Post } from "../types/post";

export type GalleryPost = Post & {
  commentOwners?: (string | null)[];
};

export function useFestivals() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);

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

        const ongoingFestivals = festivals
          .filter((festival) => {
            const { startdate, enddate } = festival;

            if (
              !startdate ||
              !enddate ||
              !/^\d{8}$/.test(startdate) ||
              !/^\d{8}$/.test(enddate)
            ) {
              return false;
            }

            return startdate <= today && today <= enddate;
          })
          .sort(
            (a, b) => b.startdate!.localeCompare(a.startdate!) || a.id - b.id,
          );

        const serverPosts: Post[] = ongoingFestivals.map((festival) => ({
          id: festival.id,
          title: festival.title,
          image: festival.thumbnail!,
          startdate: festival.startdate,
          enddate: festival.enddate,
          comments: [],
        }));

        setPosts(serverPosts);
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
  }, []);

  return { posts, setPosts };
}
