"use strict";

import { bookmarksContainer } from "./globalVars.js";
import {
  setLocalStorage,
  createElemBookmark,
  getLocalStorage,
  getUpdates,
  clearInput,
} from "./utilities.js";

export let bookmarksArrayList = [];
/* Start Crud Operations*/

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
    createElemBookmark(bookmark);
  }
  getUpdates();
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

export function onstart() {
  if (getLocalStorage() !== null) {
    bookmarksArrayList = getLocalStorage();
    displayBookmarks();
  }
}

/* End Crud Operations */
