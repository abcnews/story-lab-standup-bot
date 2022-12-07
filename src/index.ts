import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { to as wrap } from "await-to-js";
import retry from "async-retry";

import { people } from "./people";

const URL = process.env.SLACK_URL;

const main = async () => {
  const shuffledPeople: string[] = shuffle(people);
  const orderText: string = formatList(shuffledPeople);
  const text = "Who should run standup?: " + orderText;
  const output = { text };

  const [postError, response] = await wrap(
    retry(
      async bail => {
        return axios.post(URL, output);
      },
      { retries: 3 }
    )
  );
  if (postError) console.error(postError);
  if (response) console.log(response.statusText);
};

main().catch(error => {
  console.error(error);
});

// -- Functions

function shuffle(array) {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function formatList(list) {
  const newList = list.map((item, index) => {
    return `${index + 1}. ${item}`;
  });

  let listString = "";
  newList.forEach((item, index) => {
    listString = listString + item + (index < newList.length - 1 ? ", " : "");
  });

  return listString;
}
