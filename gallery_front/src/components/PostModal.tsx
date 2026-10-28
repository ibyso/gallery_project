import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import type { CommentResponse } from "../types/festivalComment";
import type { Post } from "../types/post";

interface PostModalProps {
  selectedPost: Post;
  isLiked: boolean;
  likeCount?: number;
  toggleLike: (festivalId: number) => Promise<void>;
  comments: CommentResponse[];
  commentsLoading: boolean;
  comment: string;
  setComment: (value: string) => void;
  addComment: () => Promise<void>;
  updateComment: (
    commentId: number,
    updatedComment: string,
  ) => Promise<boolean>;
  removeComment: (commentId: number) => Promise<boolean>;
  isLoggedIn: boolean;
  canEditComment: (commentId: number) => boolean;
  closeModal: () => void;
}

function PostModal({
  selectedPost,
  isLiked,
  likeCount,
  toggleLike,
  comments,
  commentsLoading,
  comment,
  setComment,
  addComment,
  updateComment,
  removeComment,
  isLoggedIn,
  canEditComment,
  closeModal,
}: PostModalProps) {
  // 어떤 댓글을 수정하고 있는지와 수정 입력값을 따로 보관
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState("");

  const startEdit = (commentId: number, text: string) => {
    if (!canEditComment(commentId)) return;
    setEditingId(commentId);
    setEditingComment(text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingComment("");
  };

  const saveEdit = async () => {
    if (editingId === null || !canEditComment(editingId)) return;

    const trimmedText = editingComment.trim();
    if (!trimmedText) return;

    if (await updateComment(editingId, trimmedText)) {
      cancelEdit();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={selectedPost.title}
        className="flex h-[80vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 큰 사진 */}
        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#222b27]">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* 축제 상세 정보와 댓글 패널 */}
        <div className="flex h-72 w-full shrink-0 flex-col md:h-full md:w-80">
          <div className="flex items-start justify-between gap-3 border-b p-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <h3 className="min-w-0 flex-1 break-words font-semibold">
                  {selectedPost.title}
                </h3>

              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                <p>
                  {commentsLoading
                    ? "댓글 불러오는 중…"
                    : `댓글 ${comments.length}`}
                </p>
                <span aria-label="조회수" aria-live="polite" className="whitespace-nowrap tabular-nums">
                  조회 {selectedPost.views ?? "…"}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleLike(selectedPost.id)}
                    aria-label={`${selectedPost.title} ${isLiked ? "좋아요 취소" : "좋아요"}`}
                    aria-pressed={isLiked}
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    <FiHeart
                      aria-hidden="true"
                      className={
                        isLiked
                          ? "h-5 w-5 fill-red-500 text-red-500"
                          : "h-5 w-5 text-gray-400"
                      }
                    />
                  </button>
                  <span
                    aria-label="좋아요 개수"
                    aria-live="polite"
                    className="text-xs tabular-nums text-gray-500"
                  >
                    {likeCount ?? "…"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="닫기"
              className="shrink-0 cursor-pointer rounded-full bg-gray-100 px-3 py-2"
            >
              ✕
            </button>
          </div>

          {/* 축제 상세 정보와 댓글 목록 */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
            <details className="group border-b border-gray-200 pb-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                축제 상세 정보
                <span
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-180"
                >
                  ▼
                </span>
              </summary>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                {selectedPost.program?.trim()
                  ? selectedPost.program.replace(/<br\s*\/?>/gi, "\n")
                  : "등록된 프로그램 정보가 없습니다."}
              </p>
            </details>

            {commentsLoading && (
              <p role="status" className="text-sm text-gray-500">
                댓글을 불러오는 중입니다.
              </p>
            )}
            {!commentsLoading && comments.length === 0 && (
              <p className="text-sm text-gray-500">첫 댓글을 남겨보세요.</p>
            )}
            {comments.map((item) => (
              <div key={item.comment_id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf0e9] text-xs">
                  {item.user?.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold">
                      {item.user?.name ?? "익명"}
                    </p>
                    {editingId !== item.comment_id &&
                      canEditComment(item.comment_id) && (
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(item.comment_id, item.body)
                            }
                            disabled={commentsLoading}
                            className="cursor-pointer text-xs text-gray-500 hover:text-[#58654f]"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (await removeComment(item.comment_id))
                                cancelEdit();
                            }}
                            disabled={commentsLoading}
                            className="cursor-pointer text-xs text-red-500 hover:text-red-700"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                  </div>

                  {editingId === item.comment_id &&
                  canEditComment(item.comment_id) ? (
                    <div className="mt-2">
                      <textarea
                        aria-label="댓글 수정 내용"
                        value={editingComment}
                        onChange={(e) => setEditingComment(e.target.value)}
                        maxLength={500}
                        className="h-24 w-full resize-none rounded border border-gray-200 p-3 text-sm outline-none focus:border-[#58654f]"
                      />
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-400">
                          {editingComment.length} / 500
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="cursor-pointer rounded border border-gray-200 px-3 py-2 text-xs text-gray-600"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={saveEdit}
                            disabled={
                              commentsLoading ||
                              !editingComment.trim() ||
                              editingComment.trim() === item.body
                            }
                            className="cursor-pointer rounded bg-[#58654f] px-3 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            수정 완료
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed">
                      {item.body}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 댓글 작성 */}
          <div className="border-t p-4">
            <textarea
              placeholder={
                isLoggedIn
                  ? "이 장면에 대한 생각을 남겨주세요."
                  : "로그인 후 댓글을 작성할 수 있습니다."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              className="h-20 w-full resize-none rounded border border-gray-200 p-3 text-sm outline-none"
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {comment.length} / 500
              </span>

              <button
                type="button"
                onClick={addComment}
                disabled={!comment.trim() || !isLoggedIn || commentsLoading}
                className="cursor-pointer rounded bg-[#58654f] px-4 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                댓글 남기기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
