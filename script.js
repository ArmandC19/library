let myLibrary = [];
let readIndicators = {0 : "haven't read yet", 1 : "read"};
let toggle = 0;

function Book(title, author, pages, read ){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.myInfo = function (){
  return "<p>" + this.title + "</p> " +
    "<p>" + this.author + "</p> " +
    "<p>" + this.pages + "</p> " +
    "<p>" + readIndicators[this.read] + "</p>";
}

function addBookToLibrary (title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function render () {
  let display = document.querySelector('.display');

  while (display.firstChild) {
      display.removeChild(display.firstChild);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let bookPost = document.createElement('div');
    let deleteButton = document.createElement('button');
    let readToggle = document.createElement('button');
    deleteButton.id = 'd' + i;
    deleteButton.addEventListener('click', deleteBook);
    readToggle.id = i;
    readToggle.addEventListener('click', toggleRead);
    
    bookPost.classList.add('book');

    bookPost.innerHTML = myLibrary[i].myInfo();

    bookPost.appendChild(deleteButton);
    bookPost.appendChild(readToggle);
    display.appendChild(bookPost);
   
  }
}

function deleteBook (e) {
  myLibrary.pop(Number(e.target.id[1]));
  render();
}

function toggleRead (e) {
  myLibrary[Number(e.target.id)].read = 1 -myLibrary[Number(e.target.id)].read;
  render();
}

function populateLibrary(num){
  for (let i = 0; i < num; i++) {
    myLibrary.push(new Book("Book" + i, "Author" + i, 300, 0));
  }
}

function toggleOverlay(e){
  let newBookButton = document.querySelector(".new-book");
  let overlay = document.querySelector('.overlay');
  if (toggle == 0) {
    overlay.style.display = "grid";
    newBookButton.style.display = "none";
    toggle = 1;
  } else {
    overlay.style.display = "none";
    newBookButton.style.display = "grid";
    toggle = 0;
  }
}

function submit(e){
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").value;

  toggleOverlay();

  let newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  render();
}

function addEventListeners(){
  let newBookButton = document.querySelector(".new-book");
  newBookButton.addEventListener("click", toggleOverlay);

  let closeFormButton = document.querySelector("#close-form");
  closeFormButton.addEventListener("click", toggleOverlay);

  let submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", submit);
}

addEventListeners();
populateLibrary(3);
render();

