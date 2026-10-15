import type { Post } from "../types/post";

interface PostGridProps {
  posts: Post[];
  onSelectPost: (id: number) => void;
}

function PostGrid({ posts, onSelectPost }: PostGridProps) {
  return (
    <section className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <button
          key={post.id}
          onClick={() => onSelectPost(post.id)}
          className="group cursor-pointer text-left"
        >
          <div className="aspect-3/4 overflow-hidden rounded-md">
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
  );
}

export default PostGrid;
