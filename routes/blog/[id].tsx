import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";
import Button from "../../islands/Button.tsx";
import { loadPost } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const { id } = _ctx.params;
    const post = await loadPost(id);
    return _ctx.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data;
  return (
    <article class="p-4">
      <header>
        <h1 class="text-2xl font-bold">{post.title}</h1>
        <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      </header>
      <Button />
      <style
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: CSS }}
      />
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
