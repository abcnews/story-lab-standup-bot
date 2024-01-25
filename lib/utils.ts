function isMonday() {
  const today = new Date();
  return today.getDay() === 1;
}

export function getJoinNowLink() {
  const mondayLinkText =
    "<https://teams.microsoft.com/l/meetup-join/19%3ameeting_YjA0NzcxMTItNzY4NS00MDY4LTk5ZGQtODZkNTQ5MjliOTJj%40thread.v2/0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";
  const notMondayLinkText =
    "<https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjljMTMyMzQtMTc3OC00YjBkLTg0YjEtMmQxOTNkZWVjNjIy%40thread.v2/0?context=%7b%22Tid%22%3a%2297c1409a-7078-47e7-bb94-d1e53503e012%22%2c%22Oid%22%3a%22c13a27fd-6b00-48ab-a0ad-d7dfb7667cb0%22%7d|Click to join>";

  return isMonday() ? mondayLinkText : notMondayLinkText;
}

export function shuffle(array) {
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

export function formatList(list) {
  const newList = list.map((item, index) => {
    return `${index + 1}. ${item}`;
  });

  let listString = "";
  newList.forEach((item, index) => {
    listString = listString + item + (index < newList.length - 1 ? ", " : "");
  });

  return listString;
}
