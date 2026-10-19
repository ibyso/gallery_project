import { useCallback, useState } from "react";
import { useFestivals } from "./useFestivals";
import { useComments } from "./useComments";
import { usePostPagination } from "./usePostPagination";
import { usePostModal } from "./usePostModal";

export function usePosts(currentUserId: number | string | null) {
  const { posts, setPosts } = useFestivals();
  const [comment, setComment] = useState("");
  const resetComment = useCallback(() => setComment(""), []);
  const modal = usePostModal(resetComment);
  const selectedPost = posts.find((post) => post.id === modal.selectedId);
  const comments = useComments(
    modal.selectedId,
    selectedPost,
    currentUserId,
    comment,
    setComment,
    setPosts,
  );
  const pagination = usePostPagination(posts);

  return {
    posts,
    setPosts,
    selectedPost,
    ...modal,
    ...comments,
    ...pagination,
  };
}
