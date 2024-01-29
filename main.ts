import axios from "npm:axios";
import { to as wrap } from "npm:await-to-js";
// import retry from "npm:async-retry";
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
const env = await load();

import { getJoinNowLink, shuffle, formatList, isMonday } from "./lib/utils.ts";
import { people } from "./lib/people.ts";

// Production
const CRON_EXPRESSION = "30 23 * * SUN,MON,TUE,WED,THU";
const URL = env["SLACK_URL"] ? env["SLACK_URL"] : Deno.env.get("SLACK_URL");

// Testing
// const CRON_EXPRESSION = "* * * * SUN,MON,TUE,WED,THU";
// const URL = env["SLACK_URL_TEST"]
//   ? env["SLACK_URL_TEST"]
//   : Deno.env.get("SLACK_URL_TEST");

const main = async () => {
  if (!URL) throw new Error("No SLACK_URL env variable set");

  // Bail out if Monday
  if (isMonday()) {
    console.log("It's Monday, not running standup");
    return;
  }

  const shuffledPeople: string[] = shuffle(people);
  const orderText: string = formatList(shuffledPeople);
  const text = `*Morning standup time* 🎉 Who's running the meeting?\n${orderText}\n👉 ${getJoinNowLink()}`;
  const output = { text };

  const [postError, response] = await wrap(axios.post(URL, output));
  if (postError) throw postError;
  if (response) console.log(response.statusText);
};

Deno.cron(
  "Run main",
  CRON_EXPRESSION,
  () => {
    main();
  },
  {
    backoffSchedule: [1000, 5000, 10000],
  }
);

Deno.serve(() => new Response("{ status: 'ok'}"));
