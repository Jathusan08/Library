//  MOdal
const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".add-book-btn");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");

addBookBtn.addEventListener("click", () => {
  modal.showModal();
});
