import { useState } from "react";
import type { Post } from "../types/post";

interface PostModalProps {
  selectedPost: Post;
  comment: string;
  setComment: (value: string) => void;
  addComment: () => void;
  updateComment: (commentIndex: number, updatedComment: string) => void;
  isLoggedIn: boolean;
  canEditComment: (commentIndex: number) => boolean;
  closeModal: () => void;
}

function PostModal({
  selectedPost,
  comment,
  setComment,
  addComment,
  updateComment,
  isLoggedIn,
  canEditComment,
  closeModal,
}: PostModalProps) {
  // 어떤 댓글을 수정하고 있는지와 수정 입력값을 따로 보관
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState("");

  const startEdit = (index: number, text: string) => {
    if (!canEditComment(index)) return;
    setEditingIndex(index);
    setEditingComment(text);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingComment("");
  };

  const saveEdit = () => {
    if (editingIndex === null || !canEditComment(editingIndex)) return;

    const trimmedText = editingComment.trim();
    if (!trimmedText) return;

    updateComment(editingIndex, trimmedText);
    cancelEdit();
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

        {/* 댓글 패널 */}
        <div className="flex h-72 w-full shrink-0 flex-col md:h-full md:w-80">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h3 className="font-semibold">{selectedPost.title}</h3>
              <p className="mt-2 text-xs text-gray-400">
                댓글 {selectedPost.comments.length}
              </p>
            </div>

            <button
              onClick={closeModal}
              aria-label="닫기"
              className="cursor-pointer rounded-full bg-gray-100 px-3 py-2"
            >
              ✕
            </button>
          </div>

          {/* 댓글 목록 */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
            {selectedPost.comments.map((text, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf0e9] text-xs">
                  익
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold">익명</p>
                    {editingIndex !== index && canEditComment(index) && (
                      <button
                        type="button"
                        onClick={() => startEdit(index, text)}
                        className="cursor-pointer text-xs text-gray-500 hover:text-[#58654f]"
                      >
                        수정
                      </button>
                    )}
                  </div>

                  {editingIndex === index && canEditComment(index) ? (
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
                              !editingComment.trim() ||
                              editingComment.trim() === text
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
                      {text}
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
                disabled={!comment.trim() || !isLoggedIn}
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
