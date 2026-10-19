import { useState } from "react";

export function usePostPagination<T extends { title: string }>(posts: T[]) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    search,
    setSearch,
    filteredPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
  };
}
