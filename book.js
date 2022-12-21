let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

function display() {
    const library = document.getElementById('library');
    while (library.hasChildNodes()) {
        library.removeChild(library.firstChild);
    }

    myLibrary.forEach((element, index) => {
        let books = document.createElement('div');
        books.classList.add('book');
        books.setAttribute("index", index);
        const book_index = books.getAttribute('index');
        
        let title = document.createElement('div');
        title.classList.add('title');

        let author = document.createElement('div');
        author.classList.add('author');

        let pages = document.createElement('div');
        pages.classList.add('pages');

        let read = document.createElement('div');
        read.classList.add('read');

        if (element.read == "read") {
            read.style.backgroundColor = "#32de84";
        } else {
            read.style.backgroundColor = "#fd5c63";
        }

        read.addEventListener("click", () => {
            if (element.read == "read") {
                element.read = "not read"
                read.style.backgroundColor = "#fd5c63"
            } else {
                element.read = "read" ;
                read.style.backgroundColor = "#32de84";
            }
        });

        let remove = document.createElement('button');
        remove.classList.add('remove');
        remove.addEventListener("click", () => {
            myLibrary.splice(book_index, 1);
            display();
        });

        library.appendChild(books);

        books.appendChild(title);
        books.appendChild(author);
        books.appendChild(pages);
        books.appendChild(read);
        books.appendChild(remove);

        title.innerHTML = element.title;
        author.innerHTML = element.author;
        pages.innerHTML = element.pages + " pages";
        read.innerHTML = element.read;
        remove.innerHTML = "Remove";
    })
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
  }
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", closeForm);

const addBook = document.querySelector('#add');
addBook.addEventListener("click", openForm);

book_title = document.getElementById("book_title");
book_author = document.getElementById("book_author");
book_pages = document.getElementById("book_pages")
book_read = document.getElementById("book_read");
const submit = document.querySelector(".submit");

submit.addEventListener("click", (event) => {
    if (book_title.value.length > 0 && book_author.value.length > 0 && book_pages.value.length > 0) {
        event.preventDefault();
        let is_book_read = "";
        if (book_read.checked == true) {
            is_book_read = "read";
        } else if (book_read.checked == false){
            is_book_read = "not read";
        }
        let new_Book = new Book(book_title.value, book_author.value, book_pages.value, is_book_read);
        myLibrary.push(new_Book);
        closeForm();
        display();
    }
})

display();
