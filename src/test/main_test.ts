import { assertEquals } from "@std/assert";

Deno.test("A simple, sample test", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});