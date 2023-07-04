import { bookmarksArrayList } from "./crudOperations.js";

export function isUrlExist(url) {
  for (let i = 0; i < bookmarksArrayList.length; i++)
    if (url === bookmarksArrayList[i].url) return true;
  return false;
}

export function isNameExist(name) {
  for (let i = 0; i < bookmarksArrayList.length; i++)
    if (name === bookmarksArrayList[i].name) return true;
  return false;
}

export function urlValidation(url) {
  const regex = new RegExp("^(https?:\\/\\/)");
  return regex.test(url);
}
export function nameValidation(name) {
  const regex = new RegExp("^[^\\s][\\s\\S]{1,14}$");
  return regex.test(name);
}
