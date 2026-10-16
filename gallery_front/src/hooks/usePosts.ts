import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import { initialPosts } from "../data/initialPosts";

export function usePosts(currentUserId: number | string | null) {
  const loggedInUserId = currentUserId == null ? null : String(currentUserId);

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 댓글 입력 상태
  const [comment, setComment] = useState("");

  const [commentOwner, setCommentOwner] = useState<
    Record<number, Record<number, string>>
  >({});

  const selectedPost = posts.find((post) => post.id === selectedId);

  const addComment = () => {
    // 로그인한 사용자만 댓글을 등록할 수 있도록 검사
    if (!comment.trim() || selectedId === null || loggedInUserId === null)
      return;

    // 새 댓글의 작성자를 기록하기 위해 등록 전 index를 확인
    const targetPost = posts.find((post) => post.id === selectedId);
    if (!targetPost) return;
    const newCommentIndex = targetPost.comments.length;

    // 기존 댓글 등록 로직 유지
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

    // 댓글 등록 시 로그인한 사용자 ID를 작성자로 저장
    setCommentOwner((prev) => ({
      ...prev,
      [selectedId]: {
        ...prev[selectedId],
        [newCommentIndex]: loggedInUserId,
      },
    }));

    setComment("");
  };

  // 현재 로그인한 사용자와 댓글 작성자가 같은지 확인
  const canEditComment = (commentIndex: number): boolean => {
    if (selectedId === null || loggedInUserId === null) return false;
    return commentOwner[selectedId]?.[commentIndex] === loggedInUserId;
  };

  // 댓글 수정
  const updateComment = (commentIndex: number, updatedText: string) => {
    // UI 버튼 숨김과 별도로 수정 함수에서도 댓글 소유자를 검사
    // 권한 없는 수정, 공백 댓글, 500자를 넘는 댓글은 거부
    if (
      selectedId === null ||
      !canEditComment(commentIndex) ||
      !updatedText.trim() ||
      updatedText.trim().length > 500
    )
      return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === selectedId
          ? {
              ...post,
              comments: post.comments.map((text, index) =>
                index === commentIndex ? updatedText.trim() : text,
              ),
            }
          : post,
      ),
    );
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
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

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
    updateComment,
    isLoggedIn: loggedInUserId !== null,
    canEditComment,
    closeModal,
  };
}
