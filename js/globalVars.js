"use strict";

//to increase performance just get the html document once.
export const htmlDocument = document;
export const siteName = htmlDocument.getElementById("siteName");
export const siteUrl = htmlDocument.getElementById("siteUrl");
export const btnSubmit = htmlDocument.getElementById("btnSubmit");
export const updateModal = htmlDocument.getElementById("updateModal");
export const deleteModal = htmlDocument.getElementById("deleteModal");
export const bookmarksContainer = htmlDocument.getElementById("bookmarksData");
export const btnConfirmDelete = htmlDocument.getElementById("btnConfirmDelete");
export const updateName = document.getElementById("updateName");
export const updateUrl = document.getElementById("updateUrl");
export const btnConfirmUpdate = document.getElementById("btnConfirmUpdate");
export const btnCloseUpdate = document.getElementById("btnCloseUpdate");
export const btnCloseDelete = document.getElementById("btnCloseDelete");
export const btnCancelDelete = document.getElementById("btnCancel");
export const searchInput = document.getElementById("searchInput");
