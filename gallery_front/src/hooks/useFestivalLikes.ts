import { useEffect, useState } from "react";
import { useAuth } from "../common/AuthContext";
import { getMyLikes, postLike, deleteLike, getLikeCounts } from "../apis/likeApi";
import type { LikeCount, LikeResponse } from "../types/like";

export const useFestivalLikes = () => {
  const { isLoggedIn, currentUserId } = useAuth();

  const [likes, setLikes] = useState<LikeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [likeCounts, setLikeCounts] = useState<LikeCount[] | null>(null);

  // 전체 좋아요 개수는 로그인하지 않아도 조회
  useEffect(() => {
    let ignore = false;

    const fetchCounts = async () => {
      try {
        const data = await getLikeCounts();
        if (!ignore) setLikeCounts(data);
      } catch (error) {
        console.error("좋아요 개수 조회 실패:", error);
      }
    };

    fetchCounts();

    return () => {
      ignore = true;
    };
  }, []);

  // 좋아요 목록 조회
  useEffect(() => {
    let ignore = false;

    const fetchLikes = async () => {
      setLoading(true);
      setErrorMessage("");
      setLikes([]);

      if (!isLoggedIn || currentUserId === null) {
        setErrorMessage("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyLikes();

        if (!ignore) {
          setLikes(data);
        }
      } catch (error) {
        console.error("좋아요 목록 조회 실패:", error);

        if (!ignore) {
          setErrorMessage("좋아요 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchLikes();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, currentUserId]);

  // 좋아요한 축제 ID 목록
  const likedIds = likes.map((like) => like.festival_id);

  // 좋아요 등록 및 취소
  const toggleLike = async (festivalId: number) => {
    if (!isLoggedIn || currentUserId === null) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    if (loading) {
      return;
    }

    const existingLike = likes.find((like) => like.festival_id === festivalId);

    try {
      if (existingLike) {
        await deleteLike(existingLike.like_id);
      } else {
        await postLike(festivalId);
      }

      // 서버에서 최신 좋아요 목록 다시 조회
      const data = await getMyLikes();
      setLikes(data);
      const counts = await getLikeCounts();
      setLikeCounts(counts);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  return {
    likes,
    loading,
    errorMessage,
    likedIds,
    toggleLike,
    likeCounts,
  };
};
