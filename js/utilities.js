"use strict";

import { siteName, siteUrl } from "./globalVars.js";
import { bookmarksArrayList, displayBookmarks } from "./crudOperations.js";
import { bookmarksContainer } from "./globalVars.js";
import { deleteClick, updateClick } from "./events.js";

// setters and getters for local storage
export function setLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksArrayList));
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bookmarks"));
}

//clear input values
export function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

//DOM elements creation
export function createElemBookmark(bookmark) {
  const row = document.createElement("div");
  row.className = "row";
  const nameCell = document.createElement("div");
  nameCell.className = "table-cell";
  nameCell.textContent = bookmark.name;
  row.appendChild(nameCell);

  const urlCell = document.createElement("div");
  urlCell.className = "table-cell";
  urlCell.textContent = bookmark.url;
  row.appendChild(urlCell);

  const actionsCell = document.createElement("div");
  actionsCell.className = "table-cell";
  row.appendChild(actionsCell);

  const visitLink = document.createElement("a");
  visitLink.href = bookmark.siteUrl;
  visitLink.className = "visit-link";
  actionsCell.appendChild(visitLink);

  const visitIcon = document.createElement("i");
  visitIcon.className = "fa-solid fa-eye";
  visitLink.appendChild(visitIcon);

  const updateButton = document.createElement("button");
  updateButton.className = "btn-update btnShowUpdateModal";
  actionsCell.appendChild(updateButton);

  const updateIcon = document.createElement("i");
  updateIcon.className = "fa-solid fa-pen-to-square";
  updateButton.appendChild(updateIcon);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btnShowDeleteModal btn-delete";
  actionsCell.appendChild(deleteButton);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";
  deleteButton.appendChild(deleteIcon);

  bookmarksContainer.appendChild(row);
}

export function getUpdates() {
  const btnShowDeleteModal = document.querySelectorAll(".btnShowDeleteModal");
  const btnShowUpdateModal = document.querySelectorAll(".btnShowUpdateModal");
  deleteClick(btnShowDeleteModal);
  updateClick(btnShowUpdateModal);
}

export function closeModal(modal) {
  modal.classList.replace("d-flex", "d-none");
}

export function searchBookmark(bookmarkName) {
  let matchedBookmarksArrayList = [];
  for (let i = 0; i < bookmarksArrayList.length; i++) {
    if (
      bookmarksArrayList[i].name
        .toLowerCase()
        .includes(bookmarkName.toLowerCase())
    )
      matchedBookmarksArrayList.push(bookmarksArrayList[i]);
  }
  displayBookmarks(matchedBookmarksArrayList);
}
