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
  bookmarksContainer,
  siteName,
  siteUrl,
  nameError,
  urlError,
  updateNameError,
  updateUrlError,
  successModal,
} from "./globalVars.js";
import {
  checkValidation,
  searchBookmark,
  clearErrors,
  showModal,
  hideModal,
  successModalCall,
} from "./utilities.js";

let updateIndex = 0;
let deleteIndex;

//mechanism that happen on clicking on add bookmark button
btnSubmit.addEventListener("click", function () {
  const validationObject = {
    name: siteName.value,
    url: siteUrl.value,
    nameError: nameError,
    urlError: urlError,
  };

  if (checkValidation(validationObject)) {
    createBookmark();
    successModalCall("Bookmark has been added successfully!! 🎉");
  }
});

//mechanism happen on deleting a bookmark
bookmarksContainer.addEventListener("click", function (e) {
  let target = e.target;
  while (target != null) {
    if (target.matches(".btnShowDeleteModal")) {
      showModal(deleteModal);
      deleteIndex = target.dataset.index;
      break;
    }
    target = target.parentElement;
  }
});

btnConfirmDelete.addEventListener("click", function () {
  deleteBookmark(deleteIndex);
  hideModal(deleteModal);
  successModalCall("Bookmark deleted successfully!");
});

//mechanism happen on updating a bookmark
bookmarksContainer.addEventListener("click", function (e) {
  let target = e.target;
  while (target != null) {
    if (target.matches(".btnShowUpdateModal")) {
      showModal(updateModal);
      clearErrors(updateNameError, updateUrlError);
      updateIndex = target.dataset.index;
      updateName.value = bookmarksArrayList[updateIndex].name;
      updateUrl.value = bookmarksArrayList[updateIndex].url;
      break;
    }
    target = target.parentElement;
  }
});

btnConfirmUpdate.addEventListener("click", function () {
  const validationObject = {
    name: updateName.value,
    url: updateUrl.value,
    nameError: updateNameError,
    urlError: updateUrlError,
  };

  if (checkValidation(validationObject)) {
    hideModal(updateModal);
    updateBookmark(updateIndex);
    successModalCall("Bookmark updated successfully!");
  }
});

// mechanism for pressing on modals icons of update and delete

//on clicking on close updateModal button
btnCloseUpdate.addEventListener("click", function () {
  hideModal(updateModal);
});

//on pressing escape btn
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (updateModal.classList.contains("show-modal")) hideModal(updateModal);
    else if (deleteModal.classList.contains("show-modal"))
      hideModal(deleteModal);
  }
});

//on pressing outside of updateModal container
updateModal.addEventListener("click", function (e) {
  if (
    updateModal.classList.contains("show-modal") &&
    e.target.classList.contains("update-modal")
  )
    hideModal(updateModal);
});

//on pressing outside of deleteModal container
deleteModal.addEventListener("click", function (e) {
  if (
    deleteModal.classList.contains("show-modal") &&
    e.target.classList.contains("delete-modal")
  )
    hideModal(deleteModal);
});

//on clicking on close DeleteModal button
btnCloseDelete.addEventListener("click", function () {
  hideModal(deleteModal);
});

// on clicking on cancel delete button
btnCancelDelete.addEventListener("click", function () {
  hideModal(deleteModal);
});

// finish events happen on clicking on modals

//real-time search for bookmarks data
searchInput.addEventListener("input", function () {
  searchBookmark(this.value);
});
