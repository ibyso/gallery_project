import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getComments } from "../apis/commentApi";
import type { GalleryPost } from "./useFestivals";

export function useComments(
  selectedId: number | null,
  selectedPost: GalleryPost | undefined,
  currentUserId: number | string | null,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  setPosts: Dispatch<SetStateAction<GalleryPost[]>>,
) {
  // 모달을 열면 선택한 게시물의 DB 댓글을 조회
  useEffect(() => {
    if (selectedId === null) return;

    let ignore = false;
    const contentId = selectedId;

    const loadComments = async () => {
      try {
        const comments = await getComments(contentId);

        if (ignore) return;

        setPosts((previous) =>
          previous.map((post) => {
            if (post.id !== contentId) return post;

            return {
              ...post,
              comments: comments.map((comment) => comment.body),
              commentOwners: comments.map((comment) => String(comment.user_id)),
            };
          }),
        );
      } catch (error) {
        if (!ignore) {
          console.error("댓글 조회 실패:", error);
        }
      }
    };

    void loadComments();

    return () => {
      ignore = true;
    };
  }, [selectedId, setPosts]);

  const isLoggedIn = currentUserId !== null;

  const canEditComment = (index: number) =>
    isLoggedIn &&
    selectedPost?.commentOwners?.[index] === String(currentUserId);

  const addComment = () => {
    const body = comment.trim();
    if (!selectedPost || !isLoggedIn || !body || body.length > 500) return;

    setPosts((previous) =>
      previous.map((post) =>
        post.id === selectedId
          ? {
              ...post,
              comments: [...post.comments, body],
              commentOwners: [
                ...(post.commentOwners ?? post.comments.map(() => null)),
                String(currentUserId),
              ],
            }
          : post,
      ),
    );
    setComment("");
  };

  const updateComment = (index: number, value: string) => {
    const body = value.trim();
    if (!canEditComment(index) || !body || body.length > 500) return;

    setPosts((previous) =>
      previous.map((post) =>
        post.id === selectedId
          ? {
              ...post,
              comments: post.comments.map((text, i) =>
                i === index ? body : text,
              ),
            }
          : post,
      ),
    );
  };

  const removeComment = (index: number) => {
    if (!canEditComment(index) || !window.confirm("댓글을 삭제하시겠습니까?"))
      return false;

    setPosts((previous) =>
      previous.map((post) =>
        post.id === selectedId
          ? {
              ...post,
              comments: post.comments.filter((_, i) => i !== index),
              commentOwners: post.commentOwners?.filter((_, i) => i !== index),
            }
          : post,
      ),
    );
    return true;
  };

  return {
    comment,
    setComment,
    isLoggedIn,
    canEditComment,
    addComment,
    updateComment,
    removeComment,
  };
}
