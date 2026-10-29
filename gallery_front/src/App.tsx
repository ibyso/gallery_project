import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import PostModal from "./components/PostModal";
import WeeklyWeather from "./components/WeeklyWeather";
import { usePosts } from "./hooks/usePosts";
import { useAuth } from "./common/AuthContext";
import { useFestivalLikes } from "./hooks/useFestivalLikes";
import { useState } from "react";

function App() {
  const { currentUserId } = useAuth();
  const { likedIds, toggleLike, likeCounts } = useFestivalLikes();

  const {
    search,
    setSearch,
    setFestivalStatus,
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

  type FestivalTab = "ongoing" | "past";
  const [activeTab, setActiveTab] = useState<FestivalTab>("ongoing");

  const handleTabChange = (tab: FestivalTab) => {
    if (tab == "ongoing") {
      setFestivalStatus(true);
    } else if (tab == "past") {
      setFestivalStatus(false);
    }
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 이동
  };

  return (
    <div className="min-h-screen text-[#292c28]">
      {/* 헤더 */}
      <Header search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} />
      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* 서울 7일 날씨 */}
        <WeeklyWeather
          onSelectRegion={(region) => {
            setSearch(region);
            setCurrentPage(1);
          }}
        />

        {/* <h2 className="mb-3 text-3xl font-semibold">현재 진행중인 축제</h2> */}
        <div className="mb-6 flex gap-8 border-b border-gray-200">
          <button
            type="button"
            onClick={() => handleTabChange("ongoing")}
            className={`cursor-pointer border-b-2 pb-3 text-2xl font-semibold transition-colors ${
              activeTab === "ongoing"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            현재 진행중인 축제
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("past")}
            className={`cursor-pointer border-b-2 pb-3 text-2xl font-semibold transition-colors ${
              activeTab === "past"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            지난 축제
          </button>
        </div>

        {/* 사진 갤러리 */}
        <PostGrid
          posts={currentPosts}
          onSelectPost={openPost}
          likedIds={likedIds}
          likeCounts={likeCounts}
          toggleLike={toggleLike}
        />

        {/* 페이지 이동 버튼 */}
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
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
              : (likeCounts.find((item) => item.festival_id === selectedPost.id)?.like_count ?? 0)
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
