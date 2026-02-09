import { Days, isit } from "@phocks/isit";
import { to as wrap } from "await-to-js";
import { parseCsv } from "~/src/lib/papa.ts";

const QUOTES_SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQoUhnrBaWZCsG16Fj4Kx7Q4_JC3WP3VokhT9EwpPxlGldvoq-B0jCExV3G0UEteOXes7qAe86E9ZWA/pub?output=csv";

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
  // Note, these are both identical now due to team changes
  const mondayLinkText =
    "<https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjljMTMyMzQtMTc3OC00YjBkLTg0YjEtMmQxOTNkZWVjNjIy%40thread.v2/0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";
  const notMondayLinkText =
    "<https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjljMTMyMzQtMTc3OC00YjBkLTg0YjEtMmQxOTNkZWVjNjIy%40thread.v2/0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";

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

export const fetchMessages = async (
  spreadsheetUrl: string,
): Promise<{ data: Array<{ MESSAGE: string }> }> => {
  const result = await parseCsv(spreadsheetUrl);
  return result;
};

export const getRandomMessage = async (): Promise<string> => {
  const [error, response]: [
    Error | null,
    { data: Array<{ MESSAGE: string }> } | undefined,
  ] = await wrap(fetchMessages(QUOTES_SPREADSHEET_URL));
  if (error || !response) return "";

  const randomIndex = Math.floor(Math.random() * response.data.length);
  if (error || !response?.data?.[randomIndex]) return "";

  const { MESSAGE } = response.data[randomIndex];
  return MESSAGE;
};
