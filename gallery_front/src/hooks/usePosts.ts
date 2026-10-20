import { useState } from "react";
import { useFestivals } from "./useFestivals";
import { useComments } from "./useComments";
import { usePostPagination } from "./usePostPagination";
import { usePostModal } from "./usePostModal";
import useFestivalComments from "./useFestivalComments";

export function usePosts(currentUserId: number | string | null) {
  const { posts, setPosts } = useFestivals();
  const [comment, setComment] = useState("");
  const modal = usePostModal(setComment);
  const selectedPost = posts.find((post) => post.id === modal.selectedId);
  const commentData = useFestivalComments(modal.selectedId);
  const commentActions = useComments(
    modal.selectedId,
    commentData.comments,
    currentUserId,
    comment,
    setComment,
    commentData.refresh,
  );
  const pagination = usePostPagination(posts);

  return {
    posts,
    setPosts,
    selectedPost,
    ...modal,
    comment,
    setComment,
    comments: commentData.comments,
    commentsLoading: commentData.loading,
    refreshComments: commentData.refresh,
    ...commentActions,
    ...pagination,
  };
}
