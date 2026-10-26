import { useState } from "react";
import { useAuth } from "../common/AuthContext";
import type { Post } from "../types/post";
import { FiHeart } from "react-icons/fi";

interface PostGridProps {
  posts: Post[];
  onSelectPost: (id: number) => void;
}

function formatDate(date?: string | null) {
  if (!date || !/^\d{8}$/.test(date)) return null;

  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
}

function PostGrid({ posts, onSelectPost }: PostGridProps) {
  const { isLoggedIn } = useAuth();
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    if (!isLoggedIn) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    if (likedIds.includes(postId)) {
      setLikedIds(likedIds.filter((id) => id !== postId));
    } else {
      setLikedIds([...likedIds, postId]);
    }
  };

  return (
    <section className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => {
        const isLiked = likedIds.includes(post.id);

        return (
          <article key={post.id} className="min-w-0">
            {/* 포스터 클릭: 모달 열기 */}
            <button
              type="button"
              onClick={() => onSelectPost(post.id)}
              aria-label={`${post.title} 상세 보기`}
              className="flex aspect-3/4 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[#edf0e9]"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-contain"
              />
            </button>

            <span className="mt-3 inline-flex rounded-full bg-[#edf0e9] px-1.5 py-0.5 text-xs font-medium leading-tight text-[#58654f]">
              진행 중
            </span>

            {/* 축제명, 하트*/}
            <div className="mt-2 flex items-start gap-2">
              <h3 className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onSelectPost(post.id)}
                  className="line-clamp-2 h-10 w-full cursor-pointer break-words text-left text-sm font-medium leading-5"
                >
                  {post.title}
                </button>
              </h3>

              <button
                type="button"
                onClick={() => toggleLike(post.id)}
                aria-label={`${post.title} 좋아요`}
                aria-pressed={isLiked}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
              >
                <FiHeart
                  aria-hidden="true"
                  className={
                    isLiked
                      ? "h-5 w-5 fill-red-500 text-red-500"
                      : "h-5 w-5 text-gray-400"
                  }
                />
              </button>
            </div>

            <p className="mt-2 min-h-8 text-xs leading-4 text-gray-500">
              {formatDate(post.startdate) && formatDate(post.enddate) ? (
                <>
                  <span className="whitespace-nowrap">
                    {formatDate(post.startdate)}
                  </span>
                  {" — "}
                  <span className="whitespace-nowrap">
                    {formatDate(post.enddate)}
                  </span>
                </>
              ) : (
                "일정 미정"
              )}
            </p>
          </article>
        );
      })}
    </section>
  );
}

export default PostGrid;
