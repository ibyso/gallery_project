import { useEffect, useState } from "react";
import { useAuth } from "../common/AuthContext";
import { getMyLikes, postLike, deleteLike } from "../apis/likeApi";
import type { LikeResponse } from "../types/like";

// 카드와 모달이 같은 좋아요 목록과 변경 함수를 사용
const useFestivalLikes = () => {
  const { isLoggedIn, currentUserId } = useAuth();
  const [likes, setLikes] = useState<{
    userId: number | null;
    items: LikeResponse[];
  }>({ userId: null, items: [] });

  useEffect(() => {
    if (!isLoggedIn || currentUserId === null) return;

    let ignore = false;

    const fetchLikes = async () => {
      try {
        const serverData = await getMyLikes();
        if (!ignore) {
          setLikes({ userId: currentUserId, items: serverData });
        }
      } catch (error) {
        console.error("좋아요 조회 실패:", error);
      }
    };

    fetchLikes();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, currentUserId]);

  const myLikes =
    isLoggedIn && likes.userId === currentUserId ? likes.items : [];
  const likedIds = myLikes.map((like) => like.festival_id);

  const toggleLike = async (festivalId: number) => {
    if (!isLoggedIn) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    if (currentUserId === null || likes.userId !== currentUserId) {
      alert("좋아요 목록을 불러온 후 다시 시도해주세요.");
      return;
    }

    const existingLike = myLikes.find(
      (like) => like.festival_id === festivalId,
    );
    const token = sessionStorage.getItem("access_token");

    try {
      if (existingLike) {
        await deleteLike(existingLike.like_id);
      } else {
        await postLike(festivalId);
      }

      // 계정이 바뀌었다면 이전 요청 결과를 반영하지 않음
      if (sessionStorage.getItem("access_token") !== token) return;
      const serverData = await getMyLikes();
      if (sessionStorage.getItem("access_token") === token) {
        setLikes({ userId: currentUserId, items: serverData });
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다. 새로고침 후 목록을 확인해주세요.");
    }
  };

  return { likedIds, toggleLike };
};

export default useFestivalLikes;
