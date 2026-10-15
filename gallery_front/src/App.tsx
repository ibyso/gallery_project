import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFestivals } from "./apis/festivalApi";

interface Post {
  id: number;
  title: string;
  image: string;
  comments: string[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: "안개가 머무는 숲",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
    comments: ["정말 아름다운 풍경이에요.", "분위기가 좋아요."],
  },
  {
    id: 2,
    title: "햇살이 쉬어가는 자리",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200",
    comments: ["따뜻한 느낌이네요."],
  },
  {
    id: 3,
    title: "파도가 남긴 선",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    comments: [],
  },
  {
    id: 4,
    title: "골목의 느린 오후",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200",
    comments: [],
  },
  {
    id: 5,
    title: "초록 사이로",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    comments: [],
  },
  {
    id: 6,
    title: "하루의 끝에서",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200",
    comments: [],
  },
  {
    id: 7,
    title: "안개가 머무는 숲",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
    comments: ["정말 아름다운 풍경이에요.", "분위기가 좋아요."],
  },
  {
    id: 8,
    title: "햇살이 쉬어가는 자리",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200",
    comments: ["따뜻한 느낌이네요."],
  },
  {
    id: 9,
    title: "파도가 남긴 선",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    comments: [],
  },
  {
    id: 10,
    title: "골목의 느린 오후",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200",
    comments: [],
  },
  {
    id: 11,
    title: "초록 사이로",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    comments: [],
  },
  {
    id: 12,
    title: "하루의 끝에서",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200",
    comments: [],
  },
  {
    id: 13,
    title: "안개가 머무는 숲",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
    comments: ["정말 아름다운 풍경이에요.", "분위기가 좋아요."],
  },
  {
    id: 14,
    title: "햇살이 쉬어가는 자리",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200",
    comments: ["따뜻한 느낌이네요."],
  },
  {
    id: 15,
    title: "파도가 남긴 선",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    comments: [],
  },
  {
    id: 16,
    title: "골목의 느린 오후",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200",
    comments: [],
  },
  {
    id: 17,
    title: "초록 사이로",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    comments: [],
  },
  {
    id: 18,
    title: "하루의 끝에서",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200",
    comments: [],
  },
];

function App() {
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

  // 1. 상태 변수
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 2. 페이지당 게시물 수
  const postsPerPage = 12;

  // 3. 선택한 게시물
  const selectedPost = posts.find((post) => post.id === selectedId);

  // 4. 검색 결과
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 5. 전체 페이지 수
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 6. 시작 위치
  const startIndex = (currentPage - 1) * postsPerPage;

  // 7. 현재 페이지 게시물
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // 8. 모달 관련 useEffect
  useEffect(() => {
    if (selectedId === null) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const addComment = () => {
    if (!comment.trim() || selectedId === null) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === selectedId ? { ...post, comments: [...post.comments, comment.trim()] } : post,
      ),
    );

    setComment("");
  };

  const closeModal = () => {
    setSelectedId(null);
    setComment("");
  };

  return (
    <div className="min-h-screen text-[#292c28]">
      {/* 헤더 */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <h1 className="text-xl font-bold">▣ HOME</h1>

          <input
            type="text"
            placeholder="장소, 장면, 키워드로 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-gray-400"
          />

          <Link
            to="/users/signin"
            className="rounded-full bg-[#edf0e9] px-5 py-2 text-sm hover:bg-[#dfe5d8]"
          >
            로그인
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-3 text-3xl font-semibold">일상의 장면을 모으다</h2>

        <p className="mb-10 text-sm text-gray-500">
          잠시 머물고 싶은 순간들, 사진을 열어 함께 이야기를 나눠보세요.
        </p>

        {/* 사진 갤러리 */}
        <section className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {currentPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className="group cursor-pointer text-left"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-3 text-sm font-medium">{post.title}</h3>
            </button>
          ))}
        </section>

        {/* 페이지 이동 버튼 - 여기부터 추가 */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            {/* 이전 페이지 */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded border px-4 py-2 disabled:opacity-30"
            >
              이전
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`rounded px-4 py-2 ${
                  currentPage === index + 1 ? "bg-[#58654f] text-white" : "bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* 다음 페이지 */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded border px-4 py-2 disabled:opacity-30"
            >
              다음
            </button>
          </div>
        )}
        {/* 페이지 이동 버튼 - 여기까지 추가 */}
      </main>

      {/* 모달 */}
      {selectedPost && (
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
      )}
    </div>
  );
}

export default App;
