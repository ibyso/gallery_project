import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, postComment, putComment } from "../apis/commentApi";
import { initialPosts } from "../data/initialPosts";
import type { CommentCreate } from "../types/festivalComment";
import type { FestivalResponse, Post } from "../types/post";
import { getFestival } from "../apis/festivalApi";

export const initialFestival: FestivalResponse = {
  id: 0,
  title: "",
  contents: "",
  user_id: 0,
  created_at: "",
  comments: [],
  user: {
    user_id: 0,
    name: "",
  },
};

export function usePosts(currentUserId: number | string | null) {
  const { id } = useParams();

  const [posts, setPosts] = useState<(Post & { commentOwners?: (string | null)[] })[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 댓글 입력 상태
  const [comment, setComment] = useState("");

  const selectedPost = posts.find((post) => post.id === selectedId);

  const [festival, setFestival] = useState<FestivalResponse>(initialFestival);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = currentUserId !== null;

  const canEditComment = (index: number) =>
    isLoggedIn &&
    selectedPost?.commentOwners?.[index] === String(currentUserId);

  const addComment = () => {
    const body = comment.trim();
    if (!selectedPost || !isLoggedIn || !body || body.length > 500) return;

    setPosts((previous) => previous.map((post) =>
      post.id === selectedId
        ? {
            ...post,
            comments: [...post.comments, body],
            commentOwners: [
              ...(post.commentOwners ?? post.comments.map(() => null)),
              String(currentUserId),
            ],
          }
        : post,
    ));
    setComment("");
  };

  const updateComment = (index: number, value: string) => {
    const body = value.trim();
    if (!canEditComment(index) || !body || body.length > 500) return;

    setPosts((previous) => previous.map((post) =>
      post.id === selectedId
        ? { ...post, comments: post.comments.map((text, i) => i === index ? body : text) }
        : post,
    ));
  };

  const removeComment = (index: number) => {
    if (!canEditComment(index) || !window.confirm("댓글을 삭제하시겠습니까?")) return false;

    setPosts((previous) => previous.map((post) =>
      post.id === selectedId
        ? {
            ...post,
            comments: post.comments.filter((_, i) => i !== index),
            commentOwners: post.commentOwners?.filter((_, i) => i !== index),
          }
        : post,
    ));
    return true;
  };

  const fetchData = async () => {
    try {
      // id가 없는경우
      if (!id) return;

      // 서버로 데이터 요청
      const serverData = await getFestival(Number(id));
      setFestival(serverData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 등록
  const handleCommentSubmit = async (commentContent: string) => {
    // id 가 undefined 라면
    if (!id || currentUserId === null || !commentContent.trim()) {
      return;
    }

    try {
      const comment: CommentCreate = {
        user_id: Number(currentUserId),
        content_id: Number(id),
        body: commentContent.trim(),
      };
      const result = await postComment(comment);
      console.log(result);
      await fetchData();
    } catch (error) {
      console.error("댓글 처리 실패:", error);
    }
  };

  // 댓글 수정
  const handleCommentEdit = async (commentId: number, editContent: string) => {
    try {
      const result = await putComment(commentId, { body: editContent });
      console.log(result);
      await fetchData();
    } catch (error) {
      console.error("댓글 처리 실패:", error);
    }
  };

  // 댓글 삭제
  const handleCommentRemove = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const result = await deleteComment(commentId);
      console.log(result);
      // 현재 게시물 댓글 읽어오기
      await fetchData();
    } catch (error) {
      console.log(error);
    }
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
        setComment("");
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
    isLoggedIn,
    canEditComment,
    addComment,
    updateComment,
    removeComment,
    festival,
    loading,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentRemove,
    closeModal,
  };
}
