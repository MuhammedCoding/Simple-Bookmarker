"use strict";

import {
  bookmarksArrayList,
  deleteBookmark,
  updateBookmark,
  createBookmark,
} from "./crudOperations.js";
import {
  updateName,
  updateUrl,
  deleteModal,
  updateModal,
  btnConfirmDelete,
  btnConfirmUpdate,
  btnSubmit,
  btnCloseUpdate,
  btnCloseDelete,
  btnCancelDelete,
  searchInput,
} from "./globalVars.js";
import { closeModal, searchBookmark } from "./utilities.js";

let updateIndex = 0;

//mechanism that happen on clicking on add bookmark button
btnSubmit.addEventListener("click", createBookmark);
let deleteListeners = [];
let deleteIndex;

export function deleteClick(btnShowDeleteModal) {
  // Remove old listeners
  for (let i = 0; i < btnShowDeleteModal.length; i++) {
    const oldListener = deleteListeners[i];
    if (oldListener) {
      btnShowDeleteModal[i].removeEventListener("click", oldListener);
    }
  }

  // Reset the listeners array
  deleteListeners = [];

  // Add new listeners
  for (let i = 0; i < btnShowDeleteModal.length; i++) {
    const newListener = function (e) {
      deleteModal.classList.replace("d-none", "d-flex");
      const bookmarkName =
        btnShowDeleteModal[i].parentElement.parentElement.firstChild
          .textContent;
      const bookMarkIndex = bookmarksArrayList.findIndex(
        (bookmark) => bookmark.name === bookmarkName
      );
      deleteIndex = bookMarkIndex;
    };
    btnShowDeleteModal[i].addEventListener("click", newListener);

    // Store the new listener so it can be removed later
    deleteListeners.push(newListener);
  }
}

btnConfirmDelete.addEventListener("click", function () {
  console.log(deleteIndex);
  deleteBookmark(deleteIndex);
  deleteModal.classList.replace("d-flex", "d-none");
});

// mechanism that happen on clicking on update icon
export function updateClick(btnShowUpdateModal) {
  for (let i = 0; i < btnShowUpdateModal.length; i++) {
    btnShowUpdateModal[i].addEventListener("click", function (e) {
      updateModal.classList.replace("d-none", "d-flex");

      const bookmarkName =
        btnShowUpdateModal[i].parentElement.parentElement.firstChild
          .textContent;
      const bookMarkIndex = bookmarksArrayList.findIndex(
        (bookmark) => bookmark.name === bookmarkName
      );

      updateName.value = bookmarksArrayList[bookMarkIndex].name;
      updateUrl.value = bookmarksArrayList[bookMarkIndex].url;
      updateIndex = bookMarkIndex;
    });
  }
  btnConfirmUpdate.addEventListener("click", function () {
    updateBookmark(updateIndex);
    updateModal.classList.replace("d-flex", "d-none");
  });
}

// mechanism for pressing on modals of update and delete
btnCloseUpdate.addEventListener("click", function () {
  closeModal(updateModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!updateModal.classList.contains("d-none")) closeModal(updateModal);
    else if (!deleteModal.classList.contains("d-none")) closeModal(deleteModal);
  }
});

updateModal.addEventListener("click", function (e) {
  if (
    !updateModal.classList.contains("d-none") &&
    e.target.classList.contains("update-modal")
  )
    closeModal(updateModal);
});

deleteModal.addEventListener("click", function (e) {
  //console.log(e.target);
  if (
    !deleteModal.classList.contains("d-none") &&
    e.target.classList.contains("delete-modal")
  )
    closeModal(deleteModal);
});

btnCloseDelete.addEventListener("click", function () {
  closeModal(deleteModal);
});

btnCancelDelete.addEventListener("click", function () {
  closeModal(deleteModal);
});

searchInput.addEventListener("input", function () {
  searchBookmark(this.value);
  console.log(this.value);
});
