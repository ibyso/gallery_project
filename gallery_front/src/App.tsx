import { useEffect } from "react";
import Header from "./components/Header";
import { getFestivals } from "./apis/festivalApi";
import PostGrid from "./components/PostGrid";
import Pagination from "./components/Pagination";
import PostModal from "./components/PostModal";
import { usePosts } from "./hooks/usePosts";

interface AppProps {
  currentUserId?: string | number | null;
}

function App({ currentUserId = null }: AppProps) {
  // 한국관광공사 축제 API 테스트
  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const data = await getFestivals();

        console.log("축제 API 데이터:", data);
      } catch (error) {
        console.error("축제 API 오류:", error);
      }
    };

    fetchFestivals();
  }, []);

  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    setSelectedId,
    selectedPost,
    comment,
    setComment,
    addComment,
    updateComment,
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
        <h2 className="mb-3 text-3xl font-semibold">일상의 장면을 모으다</h2>

        <p className="mb-10 text-sm text-gray-500">
          잠시 머물고 싶은 순간들, 사진을 열어 함께 이야기를 나눠보세요.
        </p>

        {/* 사진 갤러리 */}
        <PostGrid posts={currentPosts} onSelectPost={setSelectedId} />

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
          selectedPost={selectedPost}
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          updateComment={updateComment}
          isLoggedIn={isLoggedIn}
          canEditComment={canEditComment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
