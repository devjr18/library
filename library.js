
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleIsRead = function() {
    this.isRead = !this.isRead
}


function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayBook() {
      const libraryContainer = document.querySelector(".library-container");
      libraryContainer.innerHTML = '';

      myLibrary.forEach((book) => {
        const newBook = document.createElement('DIV');
        newBook.dataset.id = book.id;
        newBook.classList.add('newBook');

        const title = document.createElement('H3');
        title.textContent = book.title
        newBook.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        newBook.append(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        newBook.append(pages);

        const isRead = document.createElement('BUTTON');
        isRead.textContent = book.isRead ? "Read" : "Not Yet Read";
        if(book.isRead) {
          isRead.classList.add('clicked');
        }

        isRead.addEventListener('click', () => {
          book.toggleIsRead();
          isRead.textContent = book.isRead ? "Read" : "Not Yet Read";
          isRead.classList.toggle('clicked');
        });

        newBook.appendChild(isRead);

        const deleteBook = document.createElement('BUTTON');
        deleteBook.textContent = "del";
        deleteBook.addEventListener('click', () => {
        myLibrary.forEach((book, index) => {
          if(newBook.dataset.id === book.id) {
            myLibrary.splice(index, 1);
          }
        })
          displayBook();
        });
        newBook.appendChild(deleteBook);
        libraryContainer.appendChild(newBook);
      });
};

addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
displayBook();

const addBookBtn = document.querySelector(".add-book-btn");
const dialogBox = document.querySelector("dialog");
const submitBook = document.querySelector("#submit-book");
const closeDialogBox = document.querySelector("#cancel-dialog");


addBookBtn.addEventListener('click', () => {
  dialogBox.show();
})

submitBook.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const isRead = document.querySelector('#read').checked;

  addBookToLibrary(title, author, pages, isRead);
  displayBook();
  dialogBox.close();
  document.querySelector('#new-book-form').reset();
});


closeDialogBox.addEventListener('click', () => {
  dialogBox.close();
})