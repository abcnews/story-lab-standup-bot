import axios from "axios";
import { to as wrap } from "await-to-js";
import { load } from "@std/dotenv";
import {
  getJoinNowLink,
  shuffle,
  formatList,
  getRandomQuote,
} from "./lib/utils.ts";
import { people } from "~/lib/people.ts";

const env = await load();

const SHOULD_INCLUDE_QUOTE = false;

/**
 * Production (set time) - offset by GMT
 * NOTE: Looks like we're no longer doing Monday (BNE Time) standups
 */
// const CRON_EXPRESSION = "30 23 * * MON,TUE,WED,THU";

// Development (every minute)
const CRON_EXPRESSION = "* * * * MON,TUE,WED,THU";

const URL = env["SLACK_URL"] ? env["SLACK_URL"] : Deno.env.get("SLACK_URL");

const main = async () => {
  if (!URL) throw new Error("No SLACK_URL env variable set");

  const shuffledPeople: string[] = shuffle(people);
  const orderText: string = formatList(shuffledPeople);

  const [quoteError, quote]: [Error | null, string | undefined] = await wrap(
    getRandomQuote()
  );
  if (quoteError) console.error("Failed to fetch quote:", quoteError);

  const quoteSection = SHOULD_INCLUDE_QUOTE && quote ? `\n${quote}` : "";
  const text = `*Morning standup time* 🎉 Who's running the meeting?\n${orderText}${quoteSection}\n👉 ${getJoinNowLink()}`;
  const output = { text };

  const [postError, response]: [
    Error | null,
    { statusText: string } | undefined
  ] = await wrap(axios.post(URL, output));
  if (postError) throw postError;
  if (response) console.log(response.statusText);
};

Deno.cron("Run main", CRON_EXPRESSION, () => {
  main();
});
