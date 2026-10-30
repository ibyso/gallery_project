import { deleteComment, postComment, putComment } from "../apis/commentApi";
import type { CommentResponse } from "../types/festivalComment";

export const useComments = (
  contentId: number | null,
  comments: CommentResponse[],
  currentUserId: number | string | null,
  comment: string,
  setComment: (value: string) => void,
  refresh: () => void,
) => {
  const isLoggedIn = currentUserId !== null;

  // 본인이 작성한 댓글인지 확인
  const canEditComment = (commentId: number) => {
    const target = comments.find((item) => item.comment_id === commentId);
    if (!isLoggedIn || !target) return false;

    const authorId = target.user_id ?? target.user?.user_id;
    return String(authorId) === String(currentUserId);
  };

  // 댓글 작성
  const addComment = async () => {
    const body = comment.trim();
    if (
      contentId === null ||
      currentUserId === null ||
      !body ||
      body.length > 150
    )
      return;

    try {
      await postComment({
        content_id: contentId,
        user_id: Number(currentUserId),
        body,
      });
      setComment("");
      await refresh();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      window.alert("댓글을 작성하지 못했습니다.");
    }
  };

  // 댓글 수정
  const updateComment = async (commentId: number, value: string) => {
    const body = value.trim();
    if (!canEditComment(commentId) || !body || body.length > 500) {
      return false;
    }

    try {
      await putComment(commentId, { body });
      await refresh();
      return true;
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      window.alert("댓글을 수정하지 못했습니다.");
      return false;
    }
  };

  // 댓글 삭제
  const removeComment = async (commentId: number) => {
    if (!canEditComment(commentId)) return false;
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return false;

    try {
      await deleteComment(commentId);
      await refresh();
      return true;
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      window.alert("댓글을 삭제하지 못했습니다.");
      return false;
    }
  };

  return {
    isLoggedIn,
    canEditComment,
    addComment,
    updateComment,
    removeComment,
  };
};
