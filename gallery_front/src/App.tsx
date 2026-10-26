import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import PostModal from "./components/PostModal";
import WeeklyWeather from "./components/WeeklyWeather";
import { usePosts } from "./hooks/usePosts";
import { useAuth } from "./common/AuthContext";
import useFestivalLikes from "./hooks/useFestivalLikes";

function App() {
  const { currentUserId } = useAuth();
  const { likedIds, toggleLike } = useFestivalLikes();

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    setSelectedId,
    selectedPost,
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
  } = usePosts(currentUserId);

  return (
    <div className="min-h-screen text-[#292c28]">
      {/* 헤더 */}
      <Header search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} />
      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* 서울 7일 날씨 */}
        <WeeklyWeather />

        <h2 className="mb-3 text-3xl font-semibold">일상의 장면을 모으다</h2>

        <p className="mb-10 text-sm text-gray-500">
          잠시 머물고 싶은 순간들, 사진을 열어 함께 이야기를 나눠보세요.
        </p>

        {/* 사진 갤러리 */}
        <PostGrid
          posts={currentPosts}
          onSelectPost={setSelectedId}
          likedIds={likedIds}
          toggleLike={toggleLike}
        />

        {/* 페이지 이동 버튼 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>

      {/* 모달 */}
      {selectedPost && (
        <PostModal
          key={`${selectedPost.id}:${currentUserId}`}
          selectedPost={selectedPost}
          isLiked={likedIds.includes(selectedPost.id)}
          toggleLike={toggleLike}
          comments={comments}
          commentsLoading={commentsLoading}
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          updateComment={updateComment}
          removeComment={removeComment}
          isLoggedIn={isLoggedIn}
          canEditComment={canEditComment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
