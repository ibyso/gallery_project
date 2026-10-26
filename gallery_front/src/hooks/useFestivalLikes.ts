import { useEffect, useState } from "react";
import { getMyLikes, type LikedFestival } from "../apis/userLikes";

export const useFestivalLikes = () => {
  const [likes, setLikes] = useState<LikedFestival[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLikes = async () => {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        setErrorMessage("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyLikes(token);
        setLikes(data);
      } catch {
        setErrorMessage("좋아요 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return {
    likes,
    loading,
    errorMessage,
  };
};
