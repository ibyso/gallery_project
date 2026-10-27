import { useState } from "react";

export function usePostPagination<T extends { title: string; addr1?: string | null }>(posts: T[]) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter((post) => {
    const keyword = search.trim().toLowerCase();

    const titleMatch = post.title.toLowerCase().includes(keyword);

    const addressMatch = (post.addr1 ?? "").toLowerCase().includes(keyword);

    return titleMatch || addressMatch;
  });

  const postsPerPage = 12;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;

  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

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
