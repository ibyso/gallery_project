import { useState } from "react";
import { useFestivals } from "./useFestivals";
import { useComments } from "./useComments";
import { usePostPagination } from "./usePostPagination";
import { usePostModal } from "./usePostModal";
import useFestivalComments from "./useFestivalComments";
import { postFestivalView } from "../apis/festivalApi";

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

  const openPost = async (festivalId: number) => {
    modal.setSelectedId(festivalId);
    if (currentUserId === null) return;

    try {
      const result = await postFestivalView(festivalId);
      // 여러 축제의 요청이 겹쳐도 최신 목록의 다른 조회수를 보존
      setPosts((currentPosts) => currentPosts.map((post) =>
        post.id === festivalId
          ? { ...post, views: Math.max(post.views ?? 0, result.views) }
          : post,
      ));
    } catch (error) {
      console.error("조회수 증가 실패:", error);
    }
  };

  return {
    posts,
    setPosts,
    selectedPost,
    openPost,
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
