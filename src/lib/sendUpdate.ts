import axios from "axios";
import { to as wrap } from "await-to-js";
import {
  formatList,
  getJoinNowLink,
  getRandomMessage,
  shuffle,
} from "~/src/lib/utils.ts";
import { people } from "~/src/lib/people.ts";

import { SHOULD_INCLUDE_CUSTOM_MESSAGE, SLACK_URL } from "~/src/lib/constants.ts";

export const sendUpdate = async () => {
  if (!SLACK_URL) throw new Error("No SLACK_URL env variable set");

  const shuffledPeople: string[] = shuffle(people);
  const orderText: string = formatList(shuffledPeople);

  const [messageError, message]: [Error | null, string | undefined] = await wrap(
    getRandomMessage(),
  );
  if (messageError) console.error("Failed to fetch message:", messageError);

  const customMessage = SHOULD_INCLUDE_CUSTOM_MESSAGE && message ? `\n${message}` : "";
  const text = `*Morning standup time* 🎉 Who's running the meeting?\n${orderText}\n👉 ${getJoinNowLink()}${customMessage}`;

  const output = { text };

  const [postError, response]: [
    Error | null,
    { statusText: string } | undefined,
  ] = await wrap(axios.post(SLACK_URL, output));
  if (postError) throw postError;
  if (response) {
    console.log(response.statusText, `Posted to Slack at ${new Date()}`);
  }
};
