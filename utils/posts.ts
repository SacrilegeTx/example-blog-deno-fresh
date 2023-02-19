import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "$gfm/mod.ts";
import { Post } from "../types.d.ts";

export async function loadPost(id: string) {
  let raw: string;

  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch (error) {
    console.log(error);
    return null;
  }

  if (!raw) return;

  const { attrs, body } = extract(raw);

  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  // TODO: separar el renderizado de loadPost()
  const promises = [];
  for await (const dirEntry of Deno.readDir("./content/posts")) {
    const { name } = dirEntry;
    const [id] = name.split(".");
    if (id) promises.push(loadPost(id))
  }

  const posts = await Promise.all(promises) as Post[]

  posts.sort((a,b) => {
    return b.date.getTime() - a.date.getTime()
  })

  return posts;
}

export async function listPostsSequentally(): Promise<Post[]> {
  // Esto esta mal ya que el for itera de forma secuencial así sea async
  const posts = [];
  for await (const dirEntry of Deno.readDir("./content/posts")) {
    const { name } = dirEntry;
    const [id] = name.split(".");
    const post = await loadPost(id);
    if (!post) continue;
    posts.push(post);
  }

  return posts;
}
