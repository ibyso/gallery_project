import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import PostModal from "./components/PostModal";
import WeeklyWeather from "./components/WeeklyWeather";
import { usePosts } from "./hooks/usePosts";
import { useAuth } from "./common/AuthContext";
import { useFestivalLikes } from "./hooks/useFestivalLikes";

function App() {
  const { currentUserId } = useAuth();
  const { likedIds, toggleLike, likeCounts } = useFestivalLikes();

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    openPost,
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
      <Header
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />
      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* 서울 7일 날씨 */}
        <WeeklyWeather
          onSelectRegion={(region) => {
            setSearch(region);
            setCurrentPage(1);
          }}
        />

        <h2 className="mb-3 text-3xl font-semibold">현재 진행중인 축제</h2>

        {/* 사진 갤러리 */}
        <PostGrid
          posts={currentPosts}
          onSelectPost={openPost}
          likedIds={likedIds}
          likeCounts={likeCounts}
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
          likeCount={
            likeCounts === null
              ? undefined
              : (likeCounts.find((item) => item.festival_id === selectedPost.id)
                  ?.like_count ?? 0)
          }
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
