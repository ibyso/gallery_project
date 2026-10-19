import type { Post } from "../types/post";

interface PostGridProps {
  posts: Post[];
  onSelectPost: (id: number) => void;
}

function formatDate(date?: string | null) {
  if (!date || !/^\d{8}$/.test(date)) return null;

  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
}

function PostGrid({ posts, onSelectPost }: PostGridProps) {
  return (
    <section className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <button
          type="button"
          key={post.id}
          onClick={() => onSelectPost(post.id)}
          className="group flex min-w-0 cursor-pointer flex-col text-left"
        >
          <div className="flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-md bg-[#edf0e9]">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="mt-3 inline-flex self-start items-center rounded-full bg-[#edf0e9] px-1.5 py-0.5 text-xs font-medium leading-tight text-[#58654f]">
            진행 중
          </span>
          <h3 className="mt-2 line-clamp-2 h-10 w-full break-words text-sm font-medium leading-5">
            {post.title}
          </h3>
          <p className="mt-2 min-h-8 w-full text-xs leading-4 text-gray-500">
            {formatDate(post.startdate) && formatDate(post.enddate) ? (
              <>
                <span className="whitespace-nowrap">{formatDate(post.startdate)}</span>
                {" — "}
                <span className="whitespace-nowrap">{formatDate(post.enddate)}</span>
              </>
            ) : (
              "일정 미정"
            )}
          </p>
        </button>
      ))}
    </section>
  );
}

export default PostGrid;
