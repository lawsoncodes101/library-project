const dialog = document.querySelector("dialog");
const openDialog = document.querySelector(".openDialog");
const addLibraryBtn = document.querySelector("button[type='submit']");
const library = document.querySelector(".library");
const myLibrary = [];
loadFromLocalStorage();

function loadFromLocalStorage() {
    const stored = JSON.parse(localStorage.getItem("myLibrary")) || [];
    if (stored.length < 1) return false;

    // Recreate Protoype Chain
    myLibrary.length = 0;
    for (const obj of stored) {
        const book = new Book(obj.id, obj.title, obj.author, obj.pages);
        book.hasRead = !!obj.hasRead; // Ensures Boolean type conversion
        myLibrary.push(book);
        displayInHTML(book.id, book.title, book.author, book.pages);
    }
}

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
    const parentDiv = document.createElement("div");
    const titleDisplay = document.createElement("span");
    const authorDisplay = document.createElement("span");
    const pagesDisplay = document.createElement("span");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    const buttonContainer = document.createElement("div");

    parentDiv.classList.add("book");
    parentDiv.setAttribute("data-id", dataId);
    titleDisplay.textContent = title;
    authorDisplay.textContent = author;
    pagesDisplay.textContent = pages;
    readBtn.textContent = "Read";
    removeBtn.textContent = "Remove";

    readBtn.addEventListener("click", function () {
        const index = myLibrary.findIndex(x => x.id === dataId);
        if (index === -1) return;
        myLibrary[index].toggleRead();
        updateLocalStorage();
        console.log(myLibrary[index].hasRead);
    });
    removeBtn.addEventListener("click", function () {
        removeFromLibrary(dataId, removeBtn.parentElement);
    });

    buttonContainer.append(readBtn, removeBtn);
    parentDiv.append(titleDisplay, authorDisplay, pagesDisplay, buttonContainer);
    library.append(parentDiv);
}

function removeFromLibrary(dataId, element) {
    let parentElement = element.parentElement;
    parentElement.removeChild(element);

    const index = myLibrary.findIndex(x => x.id === dataId);
    if (index !== -1) myLibrary.splice(index, 1);
    updateLocalStorage();
}

addLibraryBtn.addEventListener("click", function () {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);

    if (pages < 1 && pages > 1000) return false;

    addBookToLibrary(title, author, pages);
    dialog.close();
});

openDialog.addEventListener("click", function () {
    dialog.show();
});
