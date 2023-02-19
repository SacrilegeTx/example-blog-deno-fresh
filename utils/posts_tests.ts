import { assertEquals } from "$std/testing/asserts.ts";
import { loadPost } from "./posts.ts";

Deno.test("loadPost() return nulls if the post does not exists", async function () {
  const post = await loadPost("non-existent");
  assertEquals(post, null);
});

Deno.test("loadPost() return a post object if the post does exists", async function () {
  const post = await loadPost("hello-world");
  assertEquals(post?.id, "hello-world");
  assertEquals(post?.title, "Hello World");
});
