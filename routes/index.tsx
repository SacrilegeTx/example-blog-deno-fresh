import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { listPosts } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = await listPosts();
    return _ctx.render({ posts });
  },
};

export default function Home(props: PageProps) {
  console.log({ props });
  const { data } = props;
  if (!data) return
  const { posts } = data;
  return (
    <main class="p-4">
      <h1 class="text-2xl font-bold">Mi Blog!</h1>
      {posts.map((post: Post) => (
        <article class="p-4">
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600" href={`/blog/${post.id}`}>{post.title}</a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
