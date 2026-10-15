import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import { initialPosts } from "../data/initialPosts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 댓글 입력 상태
  const [comment, setComment] = useState("");

  const selectedPost = posts.find((post) => post.id === selectedId);

  const addComment = () => {
    if (!comment.trim() || selectedId === null) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === selectedId
          ? {
              ...post,
              comments: [...post.comments, comment.trim()],
            }
          : post,
      ),
    );

    setComment("");
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedId(null);
    setComment("");
  };

  useEffect(() => {
    if (selectedId === null) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 페이지당 게시물 수
  const postsPerPage = 12;

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 현재 페이지의 시작 위치
  const startIndex = (currentPage - 1) * postsPerPage;

  // 현재 페이지에 표시할 게시물
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    posts,
    setPosts,
    search,
    setSearch,
    filteredPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    selectedId,
    setSelectedId,
    selectedPost,
    comment,
    setComment,
    addComment,
    closeModal,
  };
}
