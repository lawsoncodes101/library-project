// TODO: Constructor
// Initialize the Book constructor
// Collects 4 args - id, title, author, pages
// Set isRead to false by default
// Use Book.prototype to create toggleFunction();

// TODO: myLibrary
// Initialize myLibrary as localStorage.getItem("myLibrary") || [];

// TODO: updateLocalStorage();
// Update local storage using localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

// TODO: addBookToLibrary();
// Collects 3 args - title, author, pages
// Create dataId with crypto.randomUUID();
// Create the new book with Book(dataId, title, author, pages);
// Run displayInHTML(); with 4 args - dataId, title, author, pages
// Push newBook to myLibrary
// Use updateLocalStorage();

// TODO: displayInHTML();
// Collects 4 args - args - dataId, title, author, pages
// Create parent div
// Create spans for title, author, pages and set textContent
// Create data-id attribute for the div as the data-id arg;
// Create Remove and Read buttons and set event listeners
// Remove Event Listener - Run removeFromLibrary();
// Read Event Listener - Find index of book with that id and run myLibrary[index].toggleRead();
// Append all elements to div
// Append div to library div

// TODO: removeFromLibrary();
// Collect 1 arg - id
// Find the index of book with that id in myLibrary and splice the index
// Run updateLocalStorage();

const library = document.querySelector("#library");
const myLibrary = JSON.parse(localStorage.getItem("myLibrary") || []);

function Book(id, title, author, pages) {
    if (!new.target)
        throw Error("Must use the new operator to call the function");

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = false;
}

Book.prototype.toggleRead = function () {
    this.hasRead = !this.hasRead;
};

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addBookToLibrary(title, author, pages) {
    const dataId = crypto.randomUUID();
    const newBook = new Book(dataId, title, author, pages);

    displayInHTML(dataId, title, author, pages);
    myLibrary.push(newBook);
    updateLocalStorage();
}

function displayInHTML(dataId, title, author, pages) {
    const div = document.createElement("div");
    const titleDisplay = document.createElement("span");
    const authorDisplay = document.createElement("span");
    const pagesDisplay = document.createElement("span");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    div.setAttribute("data-id", dataId);
    titleDisplay.textContent = title;
    authorDisplay.textContent = author;
    pagesDisplay.textContent = pages;
    readBtn.textContent = "Read";
    removeBtn.textContent = "Remove";

    readBtn.addEventListener("click", function () {
        let index = myLibrary.indexOf((x) => x.id === dataId);
        myLibrary[index].toggleRead();
    });
    removeBtn.addEventListener("click", function () {
        removeFromLibrary(dataId);
    });

    div.append(titleDisplay, authorDisplay, pagesDisplay, readBtn, removeBtn);
    library.append(div);
}

function removeFromLibrary(dataId) {
    let index = myLibrary.indexOf((x) => x.id === dataId);
    myLibrary.splice(index, 1);
    updateLocalStorage();
}