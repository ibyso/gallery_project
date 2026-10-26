import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../common/AuthContext";
import { useFestivalLikes } from "../hooks/useFestivalLikes";
import { useLikedFestivalDetail } from "../hooks/useLikedFestivalDetail";
import { usePostModal } from "../hooks/usePostModal";
import useFestivalComments from "../hooks/useFestivalComments";
import { useComments } from "../hooks/useComments";
import PostModal from "../components/PostModal";

const FestivalLike = () => {
  // 좋아요 목록 조회
  const { likes, loading, errorMessage, likedIds, toggleLike } = useFestivalLikes();

  // 로그인한 사용자 정보
  const { currentUserId } = useAuth();

  // 댓글 입력 상태
  const [comment, setComment] = useState("");

  // 모달 관리
  const { selectedId, setSelectedId, closeModal } = usePostModal(setComment);

  // 좋아요한 축제의 상세 정보
  const { selectedPost, setSelectedPost, handleFestivalClick } =
    useLikedFestivalDetail(setSelectedId);

  // 댓글 조회
  const commentData = useFestivalComments(selectedId);

  // 댓글 작성, 수정, 삭제
  const commentActions = useComments(
    selectedId,
    commentData.comments,
    currentUserId,
    comment,
    setComment,
    commentData.refresh,
  );

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292c28]">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <Link to="/" className="text-xl font-bold">
            ▣ HOME
          </Link>

          <h1 className="text-lg font-semibold">좋아요 목록</h1>

          <Link to="/users/mypage" className="text-lg font-semibold">
            MY PAGE
          </Link>
        </header>

        {/* 페이지 제목 */}
        <section className="mt-12">
          <p className="mb-3 text-sm font-medium text-[#58654f]">나의 관심 축제</p>

          <h2 className="text-3xl font-bold">내가 좋아요한 축제</h2>

          <p className="mt-4 text-sm text-gray-500">관심 있는 축제들을 모아볼 수 있어요.</p>
        </section>

        {/* 좋아요 목록 */}
        <section className="mt-12 pb-12">
          {loading ? (
            <p className="text-sm text-gray-500">좋아요 목록을 불러오는 중입니다.</p>
          ) : errorMessage ? (
            <p className="text-sm text-red-500">{errorMessage}</p>
          ) : likes.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">아직 좋아요를 누른 축제가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {likes.map((festival) => (
                <button
                  key={festival.festival_id}
                  type="button"
                  onClick={() => handleFestivalClick(festival.festival_id)}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-colors hover:border-[#58654f]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fde9e3]">
                    <svg className="h-7 w-7 text-[#dc624b]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21s-9-5.7-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.3-9 12-9 12Z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{festival.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">좋아요한 축제</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 축제 상세 모달 */}
        {selectedPost && selectedId !== null && (
          <PostModal
            key={`${selectedPost.id}:${currentUserId}`}
            selectedPost={selectedPost}
            isLiked={likedIds.includes(selectedPost.id)}
            toggleLike={toggleLike}
            comments={commentData.comments}
            commentsLoading={commentData.loading}
            comment={comment}
            setComment={setComment}
            addComment={commentActions.addComment}
            updateComment={commentActions.updateComment}
            removeComment={commentActions.removeComment}
            isLoggedIn={commentActions.isLoggedIn}
            canEditComment={commentActions.canEditComment}
            closeModal={() => {
              closeModal();
              setSelectedPost(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FestivalLike;
