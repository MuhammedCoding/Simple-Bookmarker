"use strict";

import {
  bookmarksContainer,
  siteName,
  siteUrl,
  updateName,
  updateUrl,
} from "./globalVars.js";
import {
  setLocalStorage,
  createElemBookmark,
  getLocalStorage,
  clearInput,
} from "./utilities.js";
import { nameValidation, urlValidation } from "./validation.js";

export let bookmarksArrayList = [];

/*Start Crud Operations*/
export function createBookmark() {
  let bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  bookmarksArrayList.push(bookmark);
  setLocalStorage();
  displayBookmarks();
  clearInput();
}

export function displayBookmarks(bookmarksArray = bookmarksArrayList) {
  bookmarksContainer.innerHTML = "";
  for (let i = 0; i < bookmarksArray.length; i++) {
    const bookmark = bookmarksArray[i];
    createElemBookmark(bookmark, i);
  }
}

export function deleteBookmark(deleteIndex) {
  bookmarksArrayList.splice(deleteIndex, 1);
  setLocalStorage();
  displayBookmarks();
}

export function updateBookmark(index) {
  bookmarksArrayList[index].name = updateName.value;
  bookmarksArrayList[index].url = updateUrl.value;
  setLocalStorage();
  displayBookmarks();
}
/* End Crud Operations */

export function onstart() {
  if (getLocalStorage() !== null) {
    bookmarksArrayList = getLocalStorage();
    displayBookmarks();
  }
}
