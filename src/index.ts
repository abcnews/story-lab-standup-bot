import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import axios from "axios"
import { people } from "./people";

console.log(axios)

const URL = process.env.SLACK_URL;

const main = async () => {
  const shuffledPeople: string[] = shuffle(people);
  const orderText: string = formatList(shuffledPeople);

  const text = "Who should run standup?: " + orderText;

  const output = { text };

  console.log(output);

  axios.post(URL, output)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};

main().catch((error) => {
  console.error(error);
});

// -- Functions

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
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

function postMessage(url: string, body: string) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}
