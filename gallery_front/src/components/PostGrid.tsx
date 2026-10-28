import type { Post } from "../types/post";
import { FiHeart } from "react-icons/fi";
import type { LikeCount } from "../types/like";

interface PostGridProps {
  posts: Post[];
  onSelectPost: (id: number) => void;
  likedIds: number[];
  likeCounts: LikeCount[] | null;
  toggleLike: (festivalId: number) => Promise<void>;
}

function formatDate(date?: string | null) {
  if (!date || !/^\d{8}$/.test(date)) return null;

  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
}

function PostGrid({
  posts,
  onSelectPost,
  likedIds,
  likeCounts,
  toggleLike,
}: PostGridProps) {
  return (
    <section className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => {
        const isLiked = likedIds.includes(post.id);
        const likeCount = likeCounts?.find(
          (item) => item.festival_id === post.id,
        )?.like_count;

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

              <div className="flex shrink-0 flex-col items-end">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    aria-label={`${post.title} ${isLiked ? "좋아요 취소" : "좋아요"}`}
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
                  <span
                    aria-label="좋아요 개수"
                    aria-live="polite"
                    className="text-xs tabular-nums text-gray-500"
                  >
                    {likeCounts === null ? "…" : (likeCount ?? 0)}
                  </span>
                </div>
                <span
                  aria-label="조회수"
                  aria-live="polite"
                  className="mt-1 whitespace-nowrap text-xs tabular-nums text-gray-400"
                >
                  조회 {post.views ?? "…"}
                </span>
              </div>
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
