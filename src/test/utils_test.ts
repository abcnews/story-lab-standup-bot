import { fetchQuotes, getJoinNowLink } from "~/src/lib/utils.ts";
import { assertEquals } from "@std/assert";

const QUOTES_SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQoUhnrBaWZCsG16Fj4Kx7Q4_JC3WP3VokhT9EwpPxlGldvoq-B0jCExV3G0UEteOXes7qAe86E9ZWA/pub?output=csv";

Deno.test("Get join now link", () => {
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

Deno.test("Fetch quotes", async () => {
  const result = await fetchQuotes(QUOTES_SPREADSHEET_URL);
  assertEquals(result.data.length > 1, true);
});
