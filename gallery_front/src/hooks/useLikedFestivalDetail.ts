import { useState } from "react";
import { getFestivals, postFestivalView } from "../apis/festivalApi";
import type { Post } from "../types/post";

export const useLikedFestivalDetail = (
  setSelectedId: (id: number) => void,
  currentUserId: number | null,
) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 좋아요 목록에서 축제 클릭 시 상세 정보 조회
  const handleFestivalClick = async (festivalId: number) => {
    try {
      const festivals = await getFestivals();

      const festival = festivals.find((item) => item.id === festivalId);

      if (!festival) {
        window.alert("해당 축제를 찾을 수 없습니다.");
        return;
      }

      const post: Post = {
        id: festival.id,
        title: festival.title,
        image: festival.thumbnail ?? "",
        startdate: festival.startdate,
        enddate: festival.enddate,
        program: festival.program,
        views: festival.views,
        comments: [],
      };

      if (currentUserId !== null) {
        try {
          const result = await postFestivalView(festivalId);
          post.views = result.views;
        } catch (error) {
          console.error("조회수 증가 실패:", error);
        }
      }

      setSelectedPost(post);
      setSelectedId(festivalId);
    } catch (error) {
      console.error("축제 상세 조회 실패:", error);
      window.alert("축제 정보를 불러오지 못했습니다.");
    }
  };

  return {
    selectedPost,
    setSelectedPost,
    handleFestivalClick,
  };
};
