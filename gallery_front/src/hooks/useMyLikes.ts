import { useState } from "react";
import { getMyLikes, type LikedFestival } from "../apis/userLikes";

export const useMyLikes = () => {
  const [likes, setLikes] = useState<LikedFestival[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleLikes = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const token = sessionStorage.getItem("access_token");

    if (!token) {
      setErrorMessage("로그인이 필요합니다.");
      setIsOpen(true);
      return;
    }

    setIsOpen(true);
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getMyLikes(token);
      setLikes(data);
    } catch {
      setErrorMessage("좋아요 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    likes,
    isOpen,
    loading,
    errorMessage,
    toggleLikes,
  };
};
