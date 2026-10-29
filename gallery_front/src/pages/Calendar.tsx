import { Link } from "react-router-dom";
import FestivalCalendar from "../components/FestivalCalendar";
import { useLikedFestivalDetail } from "../hooks/useLikedFestivalDetail";
import { usePostModal } from "../hooks/usePostModal";
import { useState } from "react";
import { useAuth } from "../common/AuthContext";
import { useFestivalLikes } from "../hooks/useFestivalLikes";
import useFestivalComments from "../hooks/useFestivalComments";
import { useComments } from "../hooks/useComments";
import PostModal from "../components/PostModal";
import Logo from "../components/Logo";

const Calendar = () => {
  const [comment, setComment] = useState("");

  const { selectedId, setSelectedId, closeModal } = usePostModal(setComment);
  const { currentUserId } = useAuth();

  const { selectedPost, setSelectedPost, handleFestivalClick } = useLikedFestivalDetail(
    setSelectedId,
    currentUserId,
  );

  const { likedIds, toggleLike } = useFestivalLikes();

  const commentData = useFestivalComments(selectedId);

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
        <header className="flex items-center justify-between border-b border-gray-200 pb-5">
          <Logo />

          <h1 className="text-lg font-semibold">캘린더</h1>

          <Link to="/users/mypage" className="text-lg font-semibold">
            MY PAGE
          </Link>
        </header>

        <section className="mt-12">
          <p className="mb-3 text-sm font-medium text-[#58654f]">나의 축제 일정</p>

          <h2 className="text-3xl font-bold">좋아요한 축제 캘린더</h2>

          <p className="mt-4 text-sm text-gray-500">관심 있는 축제의 개최 일정을 확인해 보세요.</p>

          <FestivalCalendar onFestivalClick={handleFestivalClick} />
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

export default Calendar;
