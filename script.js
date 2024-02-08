//  MOdal
const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".add-book-btn");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");

// user input fields
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const radioButtons = document.querySelectorAll('input[name="readingStatus"]');
const customValueInput = document.getElementById("customValue");

// Error labels
const titleError = document.querySelector(".title > .error");
const authorError = document.querySelector(".author > .error");
const pageNumError = document.querySelector(".pages > .error");
const userInputPageNumberError = document.querySelector(
  ".pageNumberInput > .error"
);

const myLibrary = [];

function Book(title, author, pages, status) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(newBook) {
  myLibrary.push(
    new Book(newBook.title, newBook.author, newBook.pages, newBook.status)
  );
  console.log("Book added to library");
}

addBookBtn.addEventListener("click", () => {
  modal.showModal();
});

const showorHideCustomRadioButton = (boolean1, boolean2) => {
  document.getElementById("customRadio").disabled = boolean1;
  customValueInput.disabled = boolean2;
};

showorHideCustomRadioButton(true, true);

const userInputTextValidation = (inputType, errorLabel, errorMessage) => {
  if (inputType.value === "" || inputType.value.trim() === "") {
    errorLabel.textContent = errorMessage;
    errorLabel.style.color = "red";
    return false;
  } else {
    errorLabel.textContent = "✓";
    errorLabel.style.color = "green";
    return true;
  }
};

titleInput.addEventListener("input", () => {
  userInputTextValidation(titleInput, titleError, "Book title required");
});

authorInput.addEventListener("input", () => {
  userInputTextValidation(authorInput, authorError, "Author name required");
});

const userInputBookNumberPageValidation = () => {
  console.log(`page number: ${pagesInput.value === ""}`);
  if (pagesInput.value === "") {
    console.log(`page number: ${pagesInput.value === ""}`);
    pageNumError.textContent = "Page number required";
    pageNumError.style.color = "red";
    showorHideCustomRadioButton(true, true);
    return false;
  } else if (pagesInput.value === "0") {
    pageNumError.textContent = "Page number cannot be equal to 0";
    pageNumError.style.color = "red";
    showorHideCustomRadioButton(true, true);
    return false;
  } else {
    console.log(typeof pagesInput.value);
    pageNumError.textContent = "✓";
    pageNumError.style.color = "green";
    showorHideCustomRadioButton(false, true);
    return true;
  }
};

pagesInput.addEventListener("input", userInputBookNumberPageValidation);

radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    // Check if the radio button is checked
    if (radioButton.checked) {
      console.log(radioButton.value);
      if (
        radioButton.value === "reading" ||
        radioButton.value === "unread" ||
        radioButton.value === "completed"
      ) {
        customValueInput.value = "";
        customValueInput.disabled = true;
        userInputPageNumberError.textContent = "";
      } else if (radioButton.value === "customValue") {
        showorHideCustomRadioButton(false, false);
      }
    }
  });
});

const userInputPageReadValidation = () => {
  if (customValueInput.value === "") {
    userInputPageNumberError.textContent = "Number of pages read required";
    userInputPageNumberError.style.color = "red";
    return false;
  } else if (
    customValueInput.value === "0" ||
    Number(customValueInput.value) < 0
  ) {
    userInputPageNumberError.textContent =
      "Number of pages read cannot be equal to 0 or less than 0";
    userInputPageNumberError.style.color = "red";
    return false;
  } else if (Number(customValueInput.value) > Number(pagesInput.value)) {
    userInputPageNumberError.textContent =
      "Number of pages read cannot be greater than total pages of the book";
    userInputPageNumberError.style.fontSize = "0.5rem";
    userInputPageNumberError.style.color = "red";
    return false;
  } else if (Number(customValueInput.value) <= Number(pagesInput.value)) {
    userInputPageNumberError.textContent = "✓";
    userInputPageNumberError.style.color = "green";
    return true;
  }
};

customValueInput.addEventListener("input", userInputPageReadValidation);

const clearValues = () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  customValueInput.value = "";
  document.getElementById("unread").checked = true;
  titleError.textContent = "";
  authorError.textContent = "";
  pageNumError.textContent = "";
  userInputPageNumberError.textContent = "";
  showorHideCustomRadioButton(true, true);
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const selectedRadioButton = document.querySelector(
    'input[name="readingStatus"]:checked'
  );

  if (
    userInputTextValidation(titleInput, titleError, "Book title required") &&
    userInputTextValidation(authorInput, authorError, "Author name required") &&
    userInputBookNumberPageValidation() &&
    (selectedRadioButton.value != "customValue" ||
      (selectedRadioButton.value === "customValue" &&
        userInputPageReadValidation()))
  ) {
    const newBook = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      selectedRadioButton.value === "customValue"
        ? customValueInput.value
        : selectedRadioButton.value
    );

    addBookToLibrary(newBook);
    modal.close(newBook);
    clearValues();
  } else {
    console.log("ERROR");
    /// Show validation  or error messages
  }
});

const getStatusColor = (book) => {
  let statusColor;

  if (book.status === "unread") {
    statusColor = "#ff0000";
  } else if (book.status === "reading") {
    statusColor = "#ffbf00";
  } else if (book.status === "completed") {
    statusColor = "#4caf50";
  } else {
    statusColor = "#ffffff";
  }
  return statusColor;
};
