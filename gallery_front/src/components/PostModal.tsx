import type { Post } from "../types/post";

interface PostModalProps {
  selectedPost: Post;
  comment: string;
  setComment: (value: string) => void;
  addComment: () => void;
  closeModal: () => void;
}

function PostModal({ selectedPost, comment, setComment, addComment, closeModal }: PostModalProps) {
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
              <p className="mt-2 text-xs text-gray-400">댓글 {selectedPost.comments.length}</p>
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

                <div>
                  <p className="text-xs font-semibold">익명</p>
                  <p className="mt-1 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 댓글 작성 */}
          <div className="border-t p-4">
            <textarea
              placeholder="이 장면에 대한 생각을 남겨주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              className="h-20 w-full resize-none rounded border border-gray-200 p-3 text-sm outline-none"
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">{comment.length} / 500</span>

              <button
                onClick={addComment}
                disabled={!comment.trim()}
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
