import { Days, isit } from "@phocks/isit";
import axios from "axios";
import { to as wrap } from "await-to-js";
import { parseCsv } from "~/src/lib/papa.ts";
import { type ParseError, type ParseResult } from "papaparse";

interface GetJoinNowLinkOptions {
  dateOverride?: Date;
  offsetHours?: number;
}

export function getJoinNowLink(
  { dateOverride, offsetHours }: GetJoinNowLinkOptions = {
    dateOverride: new Date(),
    offsetHours: 10,
  },
) {
  const mondayLinkText = "<https://teams.microsoft.com/l/meetup-join/" +
    "19%3ameeting_YjA0NzcxMTItNzY4NS00MDY4LTk5ZGQtODZkNTQ5MjliOTJj%40thread.v2/" +
    "0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd" +
    "-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";
  const notMondayLinkText = "<https://teams.microsoft.com/l/meetup-join/" +
    "19%3ameeting_MjljMTMyMzQtMTc3OC00YjBkLTg0YjEtMmQxOTNkZWVjNjIy%40thread.v2/" +
    "0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd" +
    "-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";

  return isit(Days.Monday, { offsetHours: offsetHours, when: dateOverride })
    ? mondayLinkText
    : notMondayLinkText;
}

export function shuffle(array: string[]): string[] {
  let currentIndex: number = array.length;
  let randomIndex: number;

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

export function formatList(list: string[]) {
  const newList = list.map((item, index) => {
    return `${index + 1}. ${item}`;
  });

  let listString = "";
  newList.forEach((item, index) => {
    listString = listString + item + (index < newList.length - 1 ? ", " : "");
  });

  return listString;
}

// const QUOTES = [
//   "The best way to get started is to quit talking and begin doing. — Walt Disney",
//   "Success is not final, failure is not fatal. — Winston Churchill",
//   "The only way to do great work is to love what you do. — Steve Jobs",
//   "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
//   "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
// ];

// export const getRandomQuote = (): string => {
//   const randomIndex = Math.floor(Math.random() * QUOTES.length);
//   return `_${QUOTES[randomIndex]}_`;
// };

export const getRandomQuote = async (): Promise<string> => {
  const [error, response]: [
    Error | null,
    { data: Array<{ q: string; a: string }> } | undefined,
  ] = await wrap(axios.get("https://zenquotes.io/api/random"));

  if (error || !response) return "";

  const randomIndex = Math.floor(Math.random() * response.data.length);

  if (error || !response?.data?.[randomIndex]) return "";

  const { q, a } = response.data[randomIndex];
  return `_"${q}" — ${a}_`;
};

export const fetchQuotes = async (
  spreadsheetUrl: string,
): Promise<{ data: Array<{ QUOTE: string; AUTHOR: string }> }> => {
  const result = await parseCsv(spreadsheetUrl);
  return result;
};
