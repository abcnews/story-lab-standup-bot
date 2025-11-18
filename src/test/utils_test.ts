import { getJoinNowLink } from "~/src/lib/utils.ts";
import { assertEquals } from "@std/assert";

Deno.test("Testing getJoinNowLink with a date override", () => {
  const expected =
    "<https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjljMTMyMzQtMTc3OC00YjBkLTg0YjEtMmQxOTNkZWVjNjIy%40thread.v2/0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";

  assertEquals(
    getJoinNowLink({
      dateOverride: new Date("2024-10-15T00:00:00Z"),
      offsetHours: 0,
    }),
    expected,
  );
});
