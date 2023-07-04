"use strict";

import {
  siteName,
  siteUrl,
  updateName,
  successModal,
  updateUrl,
} from "./globalVars.js";
import { bookmarksArrayList, displayBookmarks } from "./crudOperations.js";
import { bookmarksContainer } from "./globalVars.js";
import {
  isNameExist,
  isUrlExist,
  nameValidation,
  urlValidation,
} from "./validation.js";

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
export function createElemBookmark(bookmark, index) {
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
  visitLink.href = bookmark.url;
  visitLink.target = "_blank";
  visitLink.className = "visit-link";
  visitLink.title = "go to link";
  actionsCell.appendChild(visitLink);

  const visitIcon = document.createElement("i");
  visitIcon.className = "fa-solid fa-eye";
  visitLink.appendChild(visitIcon);

  const updateButton = document.createElement("button");
  updateButton.className = "btn-update btnShowUpdateModal";
  updateButton.title = "update bookmark";
  actionsCell.appendChild(updateButton);

  const updateIcon = document.createElement("i");
  updateIcon.className = "fa-solid fa-pen-to-square";
  updateButton.appendChild(updateIcon);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btnShowDeleteModal btn-delete";
  deleteButton.title = "delete bookmark";
  actionsCell.appendChild(deleteButton);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";
  deleteButton.appendChild(deleteIcon);
  updateButton.dataset.index = index;
  deleteButton.dataset.index = index;
  bookmarksContainer.appendChild(row);
}

function hideElement(element, displayType = "d-flex") {
  element.classList.replace(displayType, "d-none");
}
function showElement(element, displayType = "d-flex") {
  element.classList.replace("d-none", displayType);
}

export function showModal(modal) {
  console.log("yes");
  modal.classList.add("show-modal");
}

export function hideModal(modal) {
  modal.classList.remove("show-modal");
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

export function clearErrors(nameErrorField, urlErrorField) {
  if (nameErrorField.classList.contains("d-block"))
    hideElement(nameErrorField, "d-block");

  if (urlErrorField.classList.contains("d-block"))
    hideElement(urlErrorField, "d-block");
}

export function checkValidation({ name, url, nameError, urlError }) {
  clearErrors(nameError, urlError);

  if (isNameExist(name) && name !== updateName.value) {
    nameError.innerHTML = "Sorry this name is already exists";
    showElement(nameError, "d-block");
    return false;
  }
  if (isUrlExist(url) && url !== updateUrl.value) {
    urlError.innerHTML = "Sorry this url is already exists";
    showElement(urlError, "d-block");
    return false;
  }

  if (!nameValidation(name)) {
    nameError.innerHTML = "Please enter a valid name";
    showElement(nameError, "d-block");
    return false;
  }
  if (!urlValidation(url)) {
    urlError.innerHTML = "Please enter a valid URL";
    showElement(urlError, "d-block");
    return false;
  }

  return true;
}

export function successModalCall(msg) {
  showModal(successModal);
  const pTag = successModal.getElementsByTagName("p")[0];
  pTag.textContent = msg;
  setTimeout(() => {
    hideModal(successModal);
  }, 3000);
}
