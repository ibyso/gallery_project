import { useEffect, useState } from "react";
import { getComments } from "../apis/commentApi";
import type { CommentResponse } from "../types/festivalComment";

const useFestivalComments = (contentId: number | null) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (contentId === null) return;

    setLoading(true);

    try {
      const serverData = await getComments(contentId);
      setComments(serverData);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [contentId]);

  return { comments, loading, refresh: fetchComments };
};

export default useFestivalComments;
